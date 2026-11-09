-- Account checkpoints extend step_progress; `done` remains the sole completion
-- truth for existing readers. No historical timestamps or events are inferred.
begin;

alter table public.step_progress
  add column status text not null default 'not_started',
  add column started_at timestamptz,
  add column completed_at timestamptz,
  add column skipped_reason text,
  add column evidence jsonb not null default '[]'::jsonb,
  add column history jsonb not null default '[]'::jsonb;

-- Backfill existing completions only: updated_at is NOT a completion time.
update public.step_progress set status = 'complete' where done;

alter table public.step_progress
  add constraint step_progress_status_consistency check (
    (done and status = 'complete') or
    (not done and status in ('not_started','in_progress','evidence_submitted','skipped_with_reason'))
  ),
  add constraint step_progress_time_reason_consistency check (
    (status = 'complete' or completed_at is null) and
    ((status = 'skipped_with_reason' and skipped_reason is not null and
      char_length(btrim(skipped_reason)) between 1 and 2000 and
      char_length(skipped_reason) <= 2000) or
     (status <> 'skipped_with_reason' and skipped_reason is null))
  );
comment on column public.step_progress.history is
  'Latest 100 checkpoint events per step, oldest evicted; not permanent/audit history. Historical completions have no invented event.';

create function private.validate_checkpoint_evidence(p_value jsonb) returns void
language plpgsql immutable set search_path = '' as $$
declare v_item jsonb;
begin
  perform private.check_input(p_value is not null and jsonb_typeof(p_value) = 'array', 'Evidence must be an array.');
  perform private.check_input(jsonb_array_length(p_value) <= 50 and octet_length(p_value::text) <= 1048576,
    'Evidence is too large.');
  for v_item in select value from jsonb_array_elements(p_value) loop
    perform private.object_shape(v_item, array['title'], array['url','note','verifiedOn']);
    perform private.text_value(v_item->'title', 300);
    perform private.check_input(char_length(v_item->>'title') <= 300, 'Evidence title is too long.');
    if v_item ? 'url' then perform private.https_url(v_item->'url'); end if;
    if v_item ? 'note' then
      perform private.check_input(jsonb_typeof(v_item->'note') = 'string' and
        char_length(v_item->>'note') <= 4000, 'Invalid evidence note.');
    end if;
    if v_item ? 'verifiedOn' then perform private.calendar_date(v_item->'verifiedOn'); end if;
  end loop;
end;
$$;

create function private.validate_checkpoint_history(p_value jsonb) returns void
language plpgsql stable set search_path = '' as $$
declare v_item jsonb; v_at text;
begin
  perform private.check_input(p_value is not null and jsonb_typeof(p_value) = 'array', 'History must be an array.');
  perform private.check_input(jsonb_array_length(p_value) <= 100 and octet_length(p_value::text) <= 1048576,
    'History is too large.');
  for v_item in select value from jsonb_array_elements(p_value) loop
    perform private.object_shape(v_item, array['at','status'], array['note']);
    perform private.check_input(jsonb_typeof(v_item->'at') = 'string', 'Invalid history time.');
    v_at := v_item->>'at';
    perform private.check_input(char_length(v_at) <= 40 and
      v_at ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,6})?(Z|[+-][0-9]{2}:[0-9]{2})$',
      'Invalid history time.');
    -- Check local clock fields independently of the session TimeZone: a valid
    -- event written at +05:30 must remain writable from a UTC session.
    perform private.check_input(to_char(left(v_at, 19)::timestamp, 'YYYY-MM-DD"T"HH24:MI:SS') = left(v_at, 19)
      and v_at::timestamptz is not null, 'Invalid history time.');
    perform private.check_input(jsonb_typeof(v_item->'status') = 'string' and
       v_item->>'status' in ('not_started','in_progress','evidence_submitted','complete','skipped_with_reason'),
      'Invalid history status.');
    if v_item ? 'note' then
      perform private.check_input(jsonb_typeof(v_item->'note') = 'string' and
        char_length(v_item->>'note') <= 4000, 'Invalid history note.');
    end if;
  end loop;
exception when datetime_field_overflow or invalid_datetime_format or sqlstate '22009' then
  raise exception using errcode = '22023', message = 'Invalid history time.';
end;
$$;

create function private.check_checkpoint_progress() returns trigger
language plpgsql set search_path = '' as $$
begin
  perform private.validate_checkpoint_evidence(new.evidence);
  perform private.validate_checkpoint_history(new.history);
  return new;
end;
$$;
create trigger validate_checkpoint_progress before insert or update on public.step_progress
  for each row execute function private.check_checkpoint_progress();

-- Call only after require_user and lock_owned_plan: all progress writers share
-- the same plan lock, so prerequisites cannot change between check and write.
create function private.check_checkpoint_dependencies(p_plan_id uuid, p_milestone_id text, p_complete boolean)
returns void language plpgsql stable set search_path = '' as $$
begin
  if p_complete then
    perform private.check_input(not exists (
      select 1 from public.catalog_milestones m
      cross join lateral jsonb_array_elements_text(m.definition->'dependsOn') d(id)
      left join public.step_progress s on s.plan_id = p_plan_id and s.milestone_id = d.id
      where m.id = p_milestone_id and s.done is distinct from true
    ), 'Complete prerequisite milestones before this step.');
  else
    perform private.check_input(not exists (
      select 1 from public.catalog_milestones m
      join public.step_progress s on s.plan_id = p_plan_id and s.milestone_id = m.id and s.done
      where m.definition->'dependsOn' ? p_milestone_id
    ), 'A completed dependent milestone must be reopened first.');
  end if;
end;
$$;

-- Rolling retention: append an event while discarding anything before the
-- newest 99. It is user-facing recent activity, not permanent audit storage.
create function private.append_checkpoint_history(p_history jsonb, p_at timestamptz, p_status text, p_note text)
returns jsonb language sql immutable set search_path = '' as $$
  select coalesce((select jsonb_agg(e.value order by e.ordinality)
    from jsonb_array_elements(p_history) with ordinality e(value, ordinality)
    where e.ordinality > greatest(jsonb_array_length(p_history) - 99, 0)), '[]'::jsonb)
    || jsonb_build_array(jsonb_strip_nulls(jsonb_build_object(
      'at', p_at, 'status', p_status, 'note', p_note)));
$$;

create function public.set_checkpoint(p_plan_id uuid, p_milestone_id text, p_action text,
  p_evidence jsonb, p_reason text, p_expected_version integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  v_uid uuid; v_plan public.plans; v_previous public.step_progress;
  v_at timestamptz; v_status text; v_started timestamptz; v_completed timestamptz;
  v_reason text; v_note text; v_evidence jsonb; v_history jsonb;
begin
  v_uid := private.require_user();
  v_plan := private.lock_owned_plan(v_uid, p_plan_id, p_expected_version);
  perform private.check_input(exists (select 1 from public.catalog_milestones
    where id = p_milestone_id and country_code = v_plan.country_code), 'Milestone does not belong to this plan.');
  perform private.check_input(p_action in ('start','evidence','complete','skip'), 'Unknown checkpoint action.');
  perform private.check_input((p_action in ('evidence','complete') or p_evidence is null)
    and (p_action <> 'evidence' or p_evidence is not null)
    and (p_action = 'skip' or p_reason is null)
    and (p_action <> 'skip' or p_reason is not null), 'Unexpected or missing checkpoint fields.');
  if p_evidence is not null then
    -- A single evidence object, not a client-supplied array or state envelope.
    perform private.validate_checkpoint_evidence(jsonb_build_array(p_evidence));
  end if;
  if p_action = 'skip' then
    perform private.text_value(to_jsonb(p_reason), 2000);
    v_reason := btrim(p_reason);
  end if;

  select * into v_previous from public.step_progress
    where plan_id = v_plan.id and milestone_id = p_milestone_id;
  v_at := clock_timestamp();
  v_started := v_previous.started_at;
  v_completed := v_previous.completed_at;
  v_evidence := coalesce(v_previous.evidence, '[]'::jsonb);
  if p_evidence is not null then
    perform private.check_input(jsonb_array_length(v_evidence) < 50, 'Too many evidence entries.');
    v_evidence := v_evidence || jsonb_build_array(p_evidence);
    v_note := p_evidence->>'title';
  end if;

  case p_action
    when 'start' then
      if v_previous.done then perform private.check_checkpoint_dependencies(v_plan.id, p_milestone_id, false); end if;
      v_status := 'in_progress';
      v_started := coalesce(v_started, v_at);
      v_completed := null;
    when 'evidence' then
      v_status := case when v_previous.done then 'complete' else 'evidence_submitted' end;
    when 'complete' then
      perform private.check_checkpoint_dependencies(v_plan.id, p_milestone_id, true);
      v_status := 'complete';
      v_completed := v_at;
    when 'skip' then
      if v_previous.done then perform private.check_checkpoint_dependencies(v_plan.id, p_milestone_id, false); end if;
      v_status := 'skipped_with_reason';
      v_completed := null;
      v_note := v_reason;
  end case;
  v_history := private.append_checkpoint_history(coalesce(v_previous.history, '[]'::jsonb), v_at,
    case when p_action = 'evidence' then 'evidence_submitted' else v_status end, v_note);
  insert into public.step_progress (plan_id, milestone_id, done, status, started_at, completed_at,
    skipped_reason, evidence, history, updated_at)
  values (v_plan.id, p_milestone_id, v_status = 'complete', v_status, v_started, v_completed,
    v_reason, v_evidence, v_history, v_at)
  on conflict (plan_id, milestone_id) do update set
    done = excluded.done, status = excluded.status, started_at = excluded.started_at,
    completed_at = excluded.completed_at, skipped_reason = excluded.skipped_reason,
    evidence = excluded.evidence, history = excluded.history, updated_at = excluded.updated_at;
  update public.plans set version = version + 1, updated_at = v_at
    where id = v_plan.id returning * into v_plan;
  return to_jsonb(v_plan);
end;
$$;

-- Keep the old boolean API coherent with the richer row and the same dependency
-- rules; legacy unticks become not_started, not skipped/in_progress.
create or replace function public.set_step(p_plan_id uuid, p_milestone_id text, p_done boolean, p_expected_version integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_uid uuid; v_plan public.plans; v_at timestamptz; v_status text;
begin
  v_uid := private.require_user();
  v_plan := private.lock_owned_plan(v_uid, p_plan_id, p_expected_version);
  perform private.check_input(p_done is not null, 'Completion must be a boolean.');
  perform private.check_input(exists (select 1 from public.catalog_milestones
    where id = p_milestone_id and country_code = v_plan.country_code), 'Milestone does not belong to this plan.');
  perform private.check_checkpoint_dependencies(v_plan.id, p_milestone_id, p_done);
  v_at := clock_timestamp();
  v_status := case when p_done then 'complete' else 'not_started' end;
  insert into public.step_progress (plan_id, milestone_id, done, status, completed_at, history, updated_at)
    values (v_plan.id, p_milestone_id, p_done, v_status, case when p_done then v_at end,
      private.append_checkpoint_history('[]'::jsonb, v_at, v_status, null), v_at)
    on conflict (plan_id, milestone_id) do update set done = excluded.done, status = excluded.status,
      completed_at = excluded.completed_at, skipped_reason = null,
      history = private.append_checkpoint_history(public.step_progress.history, v_at, v_status, null),
      updated_at = v_at;
  update public.plans set version = version + 1, updated_at = v_at
    where id = v_plan.id returning * into v_plan;
  return to_jsonb(v_plan);
end;
$$;

create or replace function public.import_legacy_plan(p_country_code text, p_intake_id text, p_stage text,
  p_completed_ids text[], p_import_key text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid; v_plan public.plans; v_prior public.legacy_imports; v_fingerprint text; v_ids text[]; v_changed integer;
begin
  v_uid := private.require_user();
  perform private.validate_target(p_country_code, p_intake_id, p_stage);
  perform private.check_input(p_import_key ~ '^[A-Za-z0-9][A-Za-z0-9:._-]{7,199}$', 'Invalid import key.');
  perform private.check_input(p_completed_ids is not null and cardinality(p_completed_ids) <= 104
    and (cardinality(p_completed_ids) = 0 or array_ndims(p_completed_ids) = 1), 'Invalid completion list.');
  perform private.check_input(not exists (select 1 from unnest(p_completed_ids) i(id)
    left join public.catalog_milestones m on m.id = i.id and m.country_code = p_country_code
    where m.id is null), 'Only steps belonging to this country can be imported.');
  select coalesce(array_agg(id order by id), '{}'::text[]) into v_ids from unnest(p_completed_ids) i(id);
  perform private.check_input(cardinality(v_ids) = (select count(distinct id) from unnest(v_ids) i(id)), 'Duplicate completions are not allowed.');
  v_fingerprint := encode(sha256(convert_to(jsonb_build_array(p_country_code, p_intake_id, p_stage, to_jsonb(v_ids))::text, 'UTF8')), 'hex');
  select * into v_prior from public.legacy_imports where user_id = v_uid and import_key = p_import_key;
  if found then
    perform private.check_input(v_prior.input_fingerprint = v_fingerprint, 'Import key already used for different data.');
    return (select to_jsonb(p) from public.plans p where p.id = v_prior.plan_id);
  end if;
  -- select_plan creates the reviewed destination and takes the same profile/plan
  -- locks. A rejected import rolls its creation or stage change back atomically.
  perform public.select_plan(p_country_code, p_intake_id, p_stage);
  select * into strict v_plan from public.plans
    where user_id = v_uid and country_code = p_country_code and intake_id = p_intake_id for update;
  perform private.check_input(not exists (
    select 1 from unnest(v_ids) i(id)
    join public.catalog_milestones m on m.id = i.id
    cross join lateral jsonb_array_elements_text(m.definition->'dependsOn') d(id)
    where not (d.id = any(v_ids) or exists (
      select 1 from public.step_progress s where s.plan_id = v_plan.id and s.milestone_id = d.id and s.done))
  ), 'Imported completions must include or already have every prerequisite.');
  -- Historical imports carry no evidence of when completion occurred. Preserve
  -- genuine prior history, but never fabricate a completion event or timestamp.
  insert into public.step_progress (plan_id, milestone_id, done, status)
    select v_plan.id, id, true, 'complete' from unnest(v_ids) i(id)
    on conflict (plan_id, milestone_id) do update set done = true, status = 'complete',
      completed_at = null, skipped_reason = null, updated_at = clock_timestamp()
      where not public.step_progress.done;
  get diagnostics v_changed = row_count;
  if v_changed > 0 then
    update public.plans set version = version + 1, updated_at = clock_timestamp()
      where id = v_plan.id returning * into v_plan;
  end if;
  insert into public.legacy_imports (user_id, import_key, plan_id, input_fingerprint)
    values (v_uid, p_import_key, v_plan.id, v_fingerprint);
  return to_jsonb(v_plan);
end;
$$;

-- All new helpers retain the existing private schema boundary. Replaced RPCs
-- keep their previous grants; this is the only new callable public entry point.
revoke all on function private.validate_checkpoint_evidence(jsonb),
  private.validate_checkpoint_history(jsonb), private.check_checkpoint_progress(),
  private.check_checkpoint_dependencies(uuid,text,boolean),
  private.append_checkpoint_history(jsonb,timestamptz,text,text)
  from public, anon, authenticated;
revoke all on function public.set_checkpoint(uuid,text,text,jsonb,text,integer)
  from public, anon, authenticated;
grant execute on function public.set_checkpoint(uuid,text,text,jsonb,text,integer) to authenticated;

commit;
