-- Waymark accounts and administration. Apply as the project's postgres operator.
-- No service-role client is used by the application. Never expose private in the
-- PostgREST schema list. All SECURITY DEFINER functions have an empty search_path;
-- every application relation/function reference is explicitly schema-qualified.
--
-- Auth compatibility checked against official Supabase documentation/source:
-- https://supabase.com/docs/guides/auth/sessions
-- https://github.com/supabase/auth/blob/master/migrations/20220811173540_add_sessions_table.up.sql
-- https://github.com/supabase/auth/blob/master/migrations/20221114143122_add_session_not_after_column.up.sql
-- https://github.com/supabase/auth/blob/master/migrations/20210710035447_alter_users.up.sql
-- https://github.com/supabase/auth/blob/master/migrations/20220114185340_add_banned_until.up.sql
-- https://github.com/supabase/auth/blob/master/migrations/20230116124412_add_deleted_at.up.sql
-- https://github.com/supabase/auth/blob/master/internal/models/sessions.go
-- Verified 2026-10-20: JWT session_id identifies auth.sessions.id; refresh updates
-- refreshed_at/updated_at, NOT created_at. Sign-out removes the session row.
-- We only READ id/user_id/created_at/not_after from sessions and verified-email,
-- ban/deletion fields from users. We never write Supabase internal tables (apart
-- from installing an AFTER users trigger). A profile's revocation watermark is
-- compared with SESSION CREATION, not JWT iat: refreshing an old session cannot
-- regain access. A newly authenticated session created after the watermark can.
-- Missing sessions/claims/created_at fail closed. Existing JWTs also lose access
-- after provider sign-out. not_after is checked immediately; provider-configured
-- inactivity/timebox limits are otherwise enforced by Auth at refresh, not here.
-- JWT signature/issuer/audience validation remains the Auth/PostgREST gateway's
-- responsibility. Local tests emulate Auth claims/tables, NOT that gateway.

begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
revoke create on schema public from public, anon, authenticated;

-- Small, strict validation primitives are shared by RPC and table triggers so an
-- operator seed cannot accidentally create content the application cannot parse.
create function private.check_input(p_ok boolean, p_message text) returns void
language plpgsql immutable set search_path = '' as $$
begin
  if p_ok is not true then
    raise exception using errcode = '22023', message = p_message;
  end if;
end;
$$;

create function private.object_shape(p_value jsonb, p_required text[], p_optional text[] default '{}')
returns void language plpgsql immutable set search_path = '' as $$
begin
  perform private.check_input(jsonb_typeof(p_value) = 'object', 'Expected an object.');
  perform private.check_input(p_value ?& p_required, 'Required fields are missing.');
  perform private.check_input(not exists (
    select 1 from jsonb_object_keys(p_value) as k(key)
    where not (k.key = any(p_required || p_optional))
  ), 'Unknown fields are not allowed.');
end;
$$;

create function private.text_value(p_value jsonb, p_max integer) returns void
language plpgsql immutable set search_path = '' as $$
begin
  perform private.check_input(jsonb_typeof(p_value) = 'string', 'Expected text.');
  perform private.check_input(char_length(btrim(p_value #>> '{}')) between 1 and p_max,
    'Text is empty or too long.');
end;
$$;

create function private.calendar_date(p_value jsonb) returns void
language plpgsql immutable set search_path = '' as $$
declare v_text text;
begin
  perform private.text_value(p_value, 10);
  v_text := p_value #>> '{}';
  perform private.check_input(v_text ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', 'Use YYYY-MM-DD.');
  perform private.check_input(to_char(v_text::date, 'YYYY-MM-DD') = v_text, 'Use a real calendar date.');
exception when datetime_field_overflow or invalid_datetime_format then
  raise exception using errcode = '22023', message = 'Use a real calendar date.';
end;
$$;

create function private.https_url(p_value jsonb) returns void
language plpgsql immutable set search_path = '' as $$
declare v_text text; v_authority text; v_port text;
begin
  perform private.text_value(p_value, 2048);
  v_text := p_value #>> '{}';
  -- Deliberately accept canonical HTTPS URLs only. No userinfo, backslashes,
  -- whitespace/control characters or percent-encoded authority ambiguity.
  perform private.check_input(v_text !~ '[[:space:][:cntrl:]\\]' and v_text ~ '^https://',
    'Use a complete HTTPS URL without credentials.');
  v_authority := substring(v_text from '^https://([^/?#]+)');
  perform private.check_input(v_authority ~ '^([A-Za-z0-9]([A-Za-z0-9.-]*[A-Za-z0-9])?|\[[0-9A-Fa-f:.]+\])(:[0-9]{1,5})?$',
    'Use a complete HTTPS URL without credentials.');
  perform private.check_input(v_authority !~ '\.\.', 'Invalid URL host.');
  v_port := substring(v_authority from ':([0-9]+)$');
  if v_port is not null then
    perform private.check_input(v_port::integer between 1 and 65535, 'Invalid URL port.');
  end if;
end;
$$;

create function private.text_array(p_value jsonb, p_max_items integer, p_max_text integer, p_min_items integer default 0)
returns void language plpgsql immutable set search_path = '' as $$
declare v_item jsonb;
begin
  perform private.check_input(jsonb_typeof(p_value) = 'array', 'Expected an array.');
  perform private.check_input(jsonb_array_length(p_value) between p_min_items and p_max_items,
    'Invalid array length.');
  for v_item in select value from jsonb_array_elements(p_value) loop
    perform private.text_value(v_item, p_max_text);
  end loop;
end;
$$;

create table private.guide_archetypes (
  archetype text primary key,
  section_ids text[] not null
);
insert into private.guide_archetypes values
  ('language-test', array['exams','timing','inside','roadmap','resources']),
  ('standardised-test', array['choose','format','roadmap','resources']),
  ('university-shortlist', array['method','criteria','traps','tools']),
  ('application', array['routes','timeline','checklist','essays','traps','resources']),
  ('personal-statement', array['brief','structure','pitfalls','examples']),
  ('references', array['who','brief','dossier','traps']),
  ('documents-profile', array['inventory','formats','translation','expiry']),
  ('scholarship-funding', array['schemes','amounts','windows','strategy','resources']),
  ('offer-enrolment', array['offer','conditions','money','decide','checklist']),
  ('visa', array['route','documents','appointments','money','rules','timing','resources']),
  ('housing', array['options','timing','money','viewing','resources']),
  ('pre-departure', array['checklist','health','travel','firstweek','resources']),
  ('research-contact', array['find','approach','dossier','timing']);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  display_name text not null default '' check (char_length(display_name) <= 200),
  status text not null default 'active' check (status in ('active','suspended')),
  active_plan_id uuid,
  sessions_revoked_before timestamptz not null default '-infinity',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.admin_members (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);
comment on table public.admin_members is
  'Invite-only: operator SQL only. Never grant membership from Auth metadata or a public RPC.';

create table public.catalog_countries (
  code text primary key check (code ~ '^[A-Z]{2}$'),
  name text not null check (char_length(btrim(name)) between 1 and 200),
  admission text not null check (admission in ('rolling','fixed')),
  notes text not null check (char_length(btrim(notes)) between 1 and 40000)
);
create table public.catalog_intakes (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]{0,99}$'),
  country_code text not null references public.catalog_countries(code),
  label text not null check (char_length(btrim(label)) between 1 and 200),
  start_date date not null check (start_date between date '0001-01-01' and date '9999-12-31'),
  check (id like lower(country_code) || '-%'),
  unique (id, country_code)
);
create table public.catalog_milestones (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]{0,99}$'),
  country_code text not null references public.catalog_countries(code),
  definition jsonb not null,
  archetype text not null references private.guide_archetypes(archetype),
  section_ids text[] not null,
  unique (id, country_code)
);

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  country_code text not null references public.catalog_countries(code),
  intake_id text not null,
  stage text not null check (stage in ('exploring','shortlisting','testing','applying','visa')),
  version integer not null default 0 check (version >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (intake_id, country_code) references public.catalog_intakes(id, country_code),
  unique (user_id, country_code, intake_id),
  unique (id, user_id)
);
alter table public.profiles add constraint profiles_owned_active_plan
  foreign key (active_plan_id, id) references public.plans(id, user_id)
  on delete set null (active_plan_id);
create table public.step_progress (
  plan_id uuid not null references public.plans(id) on delete cascade,
  milestone_id text not null references public.catalog_milestones(id),
  done boolean not null,
  updated_at timestamptz not null default now(),
  primary key (plan_id, milestone_id)
);
create table public.legacy_imports (
  user_id uuid not null references public.profiles(id) on delete cascade,
  import_key text not null check (import_key ~ '^[A-Za-z0-9][A-Za-z0-9:._-]{7,199}$'),
  plan_id uuid not null,
  input_fingerprint text not null check (input_fingerprint ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  primary key (user_id, import_key),
  foreign key (plan_id, user_id) references public.plans(id, user_id) on delete cascade
);

create table public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  sequence bigint generated always as identity unique,
  kind text not null check (kind in ('guide','deadline')),
  milestone_id text not null references public.catalog_milestones(id),
  intake_id text references public.catalog_intakes(id),
  payload jsonb not null,
  state text not null default 'draft' check (state in ('draft','published','archived')),
  reason text not null check (char_length(btrim(reason)) between 8 and 2000),
  created_by uuid,
  created_at timestamptz not null default now(),
  published_by uuid,
  published_at timestamptz,
  check ((state = 'draft' and published_at is null and published_by is null)
    or (state in ('published','archived') and published_at is not null))
);
create unique index content_one_publication on public.content_revisions
  (kind, milestone_id, coalesce(intake_id, '')) where state = 'published';
create index content_scope_latest on public.content_revisions
  (kind, milestone_id, coalesce(intake_id, ''), sequence desc);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) between 1 and 200),
  body text not null check (char_length(btrim(body)) between 1 and 10000),
  country_code text references public.catalog_countries(code),
  target_user_id uuid references public.profiles(id) on delete cascade,
  created_by uuid,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  archived_at timestamptz,
  check (title !~ '<[^>]*>' and body !~ '<[^>]*>')
);
-- Intake scope is internal: the public announcement contract stays unchanged.
-- Country notices match any of the viewer's saved plans, not just the active one.
create table private.announcement_intakes (
  announcement_id uuid primary key references public.announcements(id) on delete cascade,
  intake_id text not null references public.catalog_intakes(id)
);
create table public.notification_reads (
  user_id uuid not null references public.profiles(id) on delete cascade,
  announcement_id uuid not null references public.announcements(id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (user_id, announcement_id)
);
create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  action text not null,
  subject_type text not null,
  subject_id text not null,
  details jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index audit_events_created on public.audit_events (created_at desc, id);
create index announcements_audience on public.announcements (country_code, target_user_id)
  where archived_at is null;
create index plans_country_intake on public.plans (country_code, intake_id);

create function private.sync_profile() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  -- Metadata is untrusted. Only an optional display label is copied; all role,
  -- status, owner and MFA claims in raw_user_meta_data are deliberately ignored.
  insert into public.profiles (id, email, display_name)
  values (new.id, coalesce(new.email, ''),
    case when jsonb_typeof(new.raw_user_meta_data->'full_name') = 'string'
      then left(btrim(new.raw_user_meta_data->>'full_name'), 200) else '' end)
  on conflict (id) do update set email = excluded.email, updated_at = now();
  return new;
end;
$$;
create trigger waymark_sync_profile after insert or update of email on auth.users
  for each row execute function private.sync_profile();
-- Safe if the dedicated project already contains accounts at migration time.
insert into public.profiles (id, email)
select id, coalesce(email, '') from auth.users on conflict (id) do nothing;

create function private.active_user_id() returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid; v_claims jsonb; v_session uuid; v_exp numeric;
begin
  v_uid := auth.uid();
  v_claims := auth.jwt();
  if v_uid is null or v_claims->>'role' is distinct from 'authenticated' then return null; end if;
  begin
    v_session := (v_claims->>'session_id')::uuid;
    v_exp := (v_claims->>'exp')::numeric;
  exception when invalid_text_representation or numeric_value_out_of_range then
    return null;
  end;
  if v_session is null or v_exp is null or v_exp::text in ('NaN','Infinity','-Infinity')
    or v_exp <= extract(epoch from statement_timestamp()) then return null; end if;
  return (select p.id from public.profiles p
    join auth.users u on u.id = p.id
    join auth.sessions s on s.id = v_session and s.user_id = p.id
    where p.id = v_uid and p.status = 'active'
      and u.email_confirmed_at is not null and coalesce(u.email, '') <> ''
      and u.deleted_at is null and (u.banned_until is null or u.banned_until <= statement_timestamp())
      and s.created_at is not null and s.created_at > p.sessions_revoked_before
      and (s.not_after is null or s.not_after > statement_timestamp()));
end;
$$;

create function private.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce(auth.jwt()->>'aal' = 'aal2', false)
    and exists (select 1 from public.admin_members m where m.user_id = private.active_user_id());
$$;

create function private.require_user() returns uuid
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid;
begin
  -- Serialize mutations with suspension/revocation. Check access AFTER acquiring
  -- the profile lock so a waiting writer sees the freshly committed status.
  v_uid := auth.uid();
  perform 1 from public.profiles where id = v_uid for update;
  if v_uid is null or private.active_user_id() is distinct from v_uid then
    raise exception using errcode = '42501', message = 'An active verified account is required.';
  end if;
  return v_uid;
end;
$$;

create function private.require_admin() returns uuid
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid;
begin
  v_uid := private.require_user();
  if not private.is_admin() then
    raise exception using errcode = '42501', message = 'Administrator access with MFA is required.';
  end if;
  return v_uid;
end;
$$;

create function private.guide_node(p_value jsonb, p_kind text) returns void
language plpgsql immutable set search_path = '' as $$
declare v_key text; v_item jsonb; v_max integer; v_child text;
begin
  case p_kind
    when 'resource' then perform private.object_shape(p_value, array['title','kind','why','verifiedOn'], array['url','free','cost']);
    when 'exam' then perform private.object_shape(p_value, array['name','accepted','verifiedOn'], array['requiredScore','note','validity','howToBook','leadTime','cost','url']);
    when 'subsection' then perform private.object_shape(p_value, array['title'], array['what','format','score','topics','tip','resources']);
    when 'roadmap' then perform private.object_shape(p_value, array['label','title','goal','focus'], array['hours','checkpoint','resources']);
    when 'callout' then perform private.object_shape(p_value, array['tone','title','body']);
    when 'section' then perform private.object_shape(p_value, '{}', array['body','points','exams','subsections','roadmap','resources','callout']);
    else raise exception using errcode = '22023', message = 'Unknown guide content kind.';
  end case;
  for v_key, v_item in select key, value from jsonb_each(p_value) loop
    if v_key in ('accepted','free') then
      perform private.check_input(jsonb_typeof(v_item) = 'boolean', 'Expected a boolean.');
    elsif v_key = 'url' then perform private.https_url(v_item);
    elsif v_key = 'verifiedOn' then perform private.calendar_date(v_item);
    elsif v_key in ('kind','tone') then
      perform private.text_value(v_item, 30);
      perform private.check_input(case v_key
        when 'kind' then v_item #>> '{}' = any(array['official','book','video','channel','practice','site','app','tool','cost'])
        else v_item #>> '{}' = any(array['watch','good']) end, 'Invalid content category.');
    elsif v_key in ('points','topics','focus') then
      perform private.text_array(v_item, 100, case when v_key = 'topics' then 4000 else 12000 end,
        case when v_key = 'focus' then 1 else 0 end);
    elsif v_key = 'callout' then perform private.guide_node(v_item, 'callout');
    elsif v_key in ('exams','subsections','roadmap','resources') then
      perform private.check_input(jsonb_typeof(v_item) = 'array', 'Expected an array.');
      v_max := case when v_key = 'exams' then 50 when v_key = 'resources' and p_kind = 'section' then 200 else 100 end;
      perform private.check_input(jsonb_array_length(v_item) <= v_max, 'Too many content entries.');
      v_child := case v_key when 'exams' then 'exam' when 'subsections' then 'subsection'
        when 'roadmap' then 'roadmap' else 'resource' end;
      for v_item in select value from jsonb_array_elements(v_item) loop
        perform private.guide_node(v_item, v_child);
      end loop;
    else
      v_max := case when v_key in ('title','name','label') then 300
        when v_key = 'why' then 8000
        when v_key = 'body' and p_kind = 'section' then 40000
        when v_key in ('note','howToBook','what','format','score','tip','goal','checkpoint','body') then 12000
        else 4000 end;
      perform private.text_value(v_item, v_max);
    end if;
  end loop;
  if p_kind = 'section' then
    perform private.check_input(exists (select 1 from jsonb_each(p_value) e where
      (jsonb_typeof(e.value) = 'string' and char_length(btrim(e.value #>> '{}')) > 0)
      or (jsonb_typeof(e.value) = 'array' and e.value <> '[]'::jsonb)
      or (e.key = 'callout' and jsonb_typeof(e.value) = 'object')),
      'Every guide section must contain useful content.');
  end if;
end;
$$;

create function private.validate_revision(p_kind text, p_milestone_id text, p_intake_id text, p_payload jsonb)
returns void language plpgsql stable set search_path = '' as $$
declare v_m public.catalog_milestones; v_section text; v_offset numeric;
begin
  perform private.check_input(p_kind in ('guide','deadline'), 'Unknown revision kind.');
  select * into v_m from public.catalog_milestones where id = p_milestone_id;
  perform private.check_input(found, 'Unknown milestone.');
  if p_intake_id is not null then
    perform private.check_input(exists (select 1 from public.catalog_intakes
      where id = p_intake_id and country_code = v_m.country_code), 'Intake does not belong to the milestone country.');
  end if;
  perform private.check_input(p_payload is not null and octet_length(p_payload::text) <= 2097152, 'Content is missing or too large.');
  if p_kind = 'guide' then
    perform private.check_input(p_intake_id is null, 'Guides are not intake-specific.');
    perform private.object_shape(p_payload, array['archetype','intro','sections']);
    perform private.check_input(p_payload->>'archetype' = v_m.archetype, 'Incorrect guide archetype.');
    perform private.text_value(p_payload->'intro', 16000);
    perform private.object_shape(p_payload->'sections', v_m.section_ids);
    foreach v_section in array v_m.section_ids loop
      perform private.guide_node(p_payload->'sections'->v_section, 'section');
    end loop;
  else
    perform private.object_shape(p_payload, array['offsetDays','hardDeadline','source','confidence','verifiedOn'], array['dueDate']);
    perform private.check_input(jsonb_typeof(p_payload->'offsetDays') = 'number', 'Offset must be an integer.');
    v_offset := (p_payload->>'offsetDays')::numeric;
    perform private.check_input(v_offset between -365 and 1460 and trunc(v_offset) = v_offset, 'Offset is outside the supported range.');
    perform private.check_input(jsonb_typeof(p_payload->'hardDeadline') = 'boolean', 'Expected a boolean.');
    perform private.https_url(p_payload->'source');
    perform private.check_input(p_payload->>'confidence' in ('verified','typical','estimate'), 'Invalid confidence.');
    perform private.calendar_date(p_payload->'verifiedOn');
    if p_payload ? 'dueDate' then
      perform private.check_input(p_intake_id is not null, 'An exact deadline requires a specific intake.');
      perform private.calendar_date(p_payload->'dueDate');
    end if;
  end if;
end;
$$;

create function private.check_catalog_milestone() returns trigger
language plpgsql set search_path = '' as $$
declare v_d jsonb := new.definition; v_ids text[]; v_offset numeric;
begin
  if tg_op = 'UPDATE' then
    perform private.check_input(new.id = old.id and new.country_code = old.country_code
      and new.archetype = old.archetype and new.section_ids = old.section_ids,
      'Catalog identities and guide sections require a dedicated structural migration.');
  end if;
  perform private.object_shape(v_d, array['id','phase','title','summary','offsetDays','hardDeadline','dependsOn','tasks','source','confidence']);
  perform private.check_input(v_d->>'id' = new.id and new.id like lower(new.country_code) || '-%', 'Milestone identifier does not match its country.');
  perform private.check_input(v_d->>'phase' = any(array['Profile & Documents','English Proficiency','Standardised Tests','University Shortlist',
    'Personal Statement','Recommendations','Application Submission','Scholarships & Funding','Offer & Enrolment','Visa & Permits','Housing','Pre-Departure']), 'Invalid milestone phase.');
  perform private.text_value(v_d->'title', 300);
  perform private.text_value(v_d->'summary', 12000);
  perform private.check_input(jsonb_typeof(v_d->'offsetDays') = 'number', 'Offset must be an integer.');
  v_offset := (v_d->>'offsetDays')::numeric;
  perform private.check_input(v_offset between -365 and 1460 and trunc(v_offset) = v_offset, 'Invalid milestone offset.');
  perform private.check_input(jsonb_typeof(v_d->'hardDeadline') = 'boolean', 'Expected a boolean.');
  perform private.text_array(v_d->'dependsOn', 104, 100);
  perform private.check_input((select count(*) = count(distinct value) from jsonb_array_elements(v_d->'dependsOn')),
    'Duplicate milestone dependencies.');
  perform private.text_array(v_d->'tasks', 100, 12000, 1);
  perform private.https_url(v_d->'source');
  perform private.check_input(v_d->>'confidence' in ('verified','typical','estimate'), 'Invalid confidence.');
  select section_ids into v_ids from private.guide_archetypes where archetype = new.archetype;
  perform private.check_input(v_ids is not null and new.section_ids = v_ids, 'Use canonical guide sections.');
  return new;
end;
$$;
create trigger validate_catalog_milestone before insert or update on public.catalog_milestones
  for each row execute function private.check_catalog_milestone();

create function private.check_catalog_dependencies() returns trigger
language plpgsql set search_path = '' as $$
begin
  perform private.check_input(not exists (
    select 1 from public.catalog_milestones m
    cross join lateral jsonb_array_elements_text(m.definition->'dependsOn') d(id)
    left join public.catalog_milestones dependency on dependency.id = d.id
    where dependency.id is null or dependency.country_code <> m.country_code or d.id = m.id
  ), 'Dependencies must be valid steps in the same country.');
  perform private.check_input(not exists (
    with recursive walk as (
      select id, id as root, array[id] as path, false as cycle from public.catalog_milestones
      union all
      select d.id, w.root, w.path || d.id, d.id = any(w.path)
      from walk w join public.catalog_milestones m on m.id = w.id
      cross join lateral jsonb_array_elements_text(m.definition->'dependsOn') d(id)
      where not w.cycle
    ) select 1 from walk where cycle
  ), 'Milestone dependencies cannot contain cycles.');
  return null;
end;
$$;
create constraint trigger validate_catalog_dependencies after insert or update or delete on public.catalog_milestones
  deferrable initially deferred for each row execute function private.check_catalog_dependencies();

create function private.check_progress_scope() returns trigger
language plpgsql set search_path = '' as $$
begin
  perform private.check_input(exists (select 1 from public.plans p
    join public.catalog_milestones m on m.country_code = p.country_code
    where p.id = new.plan_id and m.id = new.milestone_id), 'Milestone does not belong to this plan.');
  return new;
end;
$$;
create trigger validate_progress_scope before insert or update on public.step_progress
  for each row execute function private.check_progress_scope();

create function private.check_revision_row() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'DELETE' then raise exception using errcode = '42501', message = 'Revision history cannot be deleted.'; end if;
  if tg_op = 'UPDATE' then
    if (to_jsonb(new) - array['state','published_by','published_at'])
      is distinct from (to_jsonb(old) - array['state','published_by','published_at'])
      or not ((old.state = 'draft' and new.state = 'published')
        or (old.state = 'published' and new.state = 'archived'
          and new.published_at = old.published_at and new.published_by is not distinct from old.published_by)) then
      raise exception using errcode = '42501', message = 'Revisions are immutable; append a new draft.';
    end if;
  end if;
  perform private.validate_revision(new.kind, new.milestone_id, new.intake_id, new.payload);
  return new;
end;
$$;
create trigger validate_revision_row before insert or update or delete on public.content_revisions
  for each row execute function private.check_revision_row();

create function private.prevent_revision_truncate() returns trigger
language plpgsql set search_path = '' as $$
begin
  raise exception using errcode = '42501', message = 'Revision history cannot be truncated.';
end;
$$;
create trigger immutable_revision_history before truncate on public.content_revisions
  for each statement execute function private.prevent_revision_truncate();

create function private.append_only_audit() returns trigger
language plpgsql set search_path = '' as $$
begin
  raise exception using errcode = '42501', message = 'Audit history is append-only.';
end;
$$;
create trigger immutable_audit before update or delete or truncate on public.audit_events
  for each statement execute function private.append_only_audit();

create function private.audit(p_actor uuid, p_action text, p_type text, p_id text, p_details jsonb) returns void
language sql set search_path = '' as $$
  insert into public.audit_events (actor_id, action, subject_type, subject_id, details)
  values (p_actor, p_action, p_type, p_id, p_details);
$$;

create function private.validate_target(p_country_code text, p_intake_id text, p_stage text) returns void
language plpgsql stable set search_path = '' as $$
begin
  perform private.check_input(p_stage in ('exploring','shortlisting','testing','applying','visa'), 'Invalid planning stage.');
  perform private.check_input(exists (select 1 from public.catalog_intakes
    where id = p_intake_id and country_code = p_country_code), 'Choose an intake belonging to this country.');
end;
$$;

create function public.get_access() returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare v_p public.profiles; v_active boolean;
begin
  if auth.jwt()->>'role' is distinct from 'authenticated' then return null; end if;
  select p.* into v_p from public.profiles p join auth.users u on u.id = p.id
    where p.id = auth.uid() and u.email_confirmed_at is not null and coalesce(u.email, '') <> ''
      and u.deleted_at is null and (u.banned_until is null or u.banned_until <= statement_timestamp());
  if not found then return null; end if;
  v_active := private.active_user_id() = v_p.id;
  -- status may additionally be 'revoked' in this access envelope (not in the
  -- profile table). Callers MUST require status='active'; is_admin is membership
  -- at aal1 too, so an invited administrator can reach the MFA enrollment page.
  return jsonb_build_object('user_id', v_p.id, 'email', v_p.email, 'display_name', v_p.display_name,
    'status', case when v_p.status = 'suspended' then 'suspended' when v_active then 'active' else 'revoked' end,
    'is_admin', coalesce(v_active, false) and exists (select 1 from public.admin_members where user_id = v_p.id),
    'aal', case when auth.jwt()->>'aal' = 'aal2' then 'aal2' else 'aal1' end);
end;
$$;

create function public.select_plan(p_country_code text, p_intake_id text, p_stage text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid; v_plan public.plans;
begin
  v_uid := private.require_user();
  perform private.validate_target(p_country_code, p_intake_id, p_stage);
  insert into public.plans (user_id, country_code, intake_id, stage)
  values (v_uid, p_country_code, p_intake_id, p_stage)
  on conflict (user_id, country_code, intake_id) do nothing;
  select * into strict v_plan from public.plans
    where user_id = v_uid and country_code = p_country_code and intake_id = p_intake_id for update;
  if v_plan.stage <> p_stage then
    update public.plans set stage = p_stage, version = version + 1, updated_at = clock_timestamp()
      where id = v_plan.id returning * into v_plan;
  end if;
  update public.profiles set active_plan_id = v_plan.id, updated_at = clock_timestamp()
    where id = v_uid and active_plan_id is distinct from v_plan.id;
  return to_jsonb(v_plan);
end;
$$;

create function private.lock_owned_plan(p_user_id uuid, p_plan_id uuid, p_expected_version integer)
returns public.plans language plpgsql set search_path = '' as $$
declare v_plan public.plans;
begin
  select * into v_plan from public.plans where id = p_plan_id and user_id = p_user_id for update;
  if not found then raise exception using errcode = '42501', message = 'Plan is not accessible.'; end if;
  perform private.check_input(p_expected_version is not null and p_expected_version >= 0, 'A nonnegative version is required.');
  if v_plan.version <> p_expected_version then
    raise exception using errcode = '40001', message = 'Plan changed; reload before saving.';
  end if;
  return v_plan;
end;
$$;

create function public.set_step(p_plan_id uuid, p_milestone_id text, p_done boolean, p_expected_version integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_uid uuid; v_plan public.plans;
begin
  v_uid := private.require_user();
  v_plan := private.lock_owned_plan(v_uid, p_plan_id, p_expected_version);
  perform private.check_input(p_done is not null, 'Completion must be a boolean.');
  perform private.check_input(exists (select 1 from public.catalog_milestones
    where id = p_milestone_id and country_code = v_plan.country_code), 'Milestone does not belong to this plan.');
  insert into public.step_progress (plan_id, milestone_id, done)
    values (v_plan.id, p_milestone_id, p_done)
    on conflict (plan_id, milestone_id) do update set done = excluded.done, updated_at = clock_timestamp();
  update public.plans set version = version + 1, updated_at = clock_timestamp()
    where id = v_plan.id returning * into v_plan;
  return to_jsonb(v_plan);
end;
$$;

create function public.reset_plan(p_plan_id uuid, p_expected_version integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid; v_plan public.plans;
begin
  v_uid := private.require_user();
  v_plan := private.lock_owned_plan(v_uid, p_plan_id, p_expected_version);
  delete from public.step_progress where plan_id = v_plan.id;
  update public.plans set version = version + 1, updated_at = clock_timestamp()
    where id = v_plan.id returning * into v_plan;
  return to_jsonb(v_plan);
end;
$$;

create function public.import_legacy_plan(p_country_code text, p_intake_id text, p_stage text,
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
  -- The RPC is the reviewed destination boundary. The HTTP layer separately
  -- requires confirmed:true; a caller cannot attest historical intake ownership.
  perform public.select_plan(p_country_code, p_intake_id, p_stage);
  select * into strict v_plan from public.plans
    where user_id = v_uid and country_code = p_country_code and intake_id = p_intake_id for update;
  insert into public.step_progress (plan_id, milestone_id, done)
    select v_plan.id, id, true from unnest(v_ids) i(id)
    on conflict (plan_id, milestone_id) do update set done = true, updated_at = clock_timestamp()
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

create function private.announcement_visible(p_announcement_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.announcements a
    left join private.announcement_intakes scope on scope.announcement_id = a.id
    where a.id = p_announcement_id and a.archived_at is null and a.published_at <= statement_timestamp()
      and private.active_user_id() is not null
      and (a.target_user_id is null or a.target_user_id = private.active_user_id())
      and ((a.country_code is null and scope.intake_id is null) or exists (
        select 1 from public.plans p where p.user_id = private.active_user_id()
          and (a.country_code is null or p.country_code = a.country_code)
          and (scope.intake_id is null or p.intake_id = scope.intake_id))));
$$;

create function public.mark_notification_read(p_announcement_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid;
begin
  v_uid := private.require_user();
  -- Share-lock prevents an archive racing between visibility check and insert.
  perform 1 from public.announcements where id = p_announcement_id for share;
  if not private.announcement_visible(p_announcement_id) then
    raise exception using errcode = '42501', message = 'Notification is not accessible.';
  end if;
  insert into public.notification_reads (user_id, announcement_id) values (v_uid, p_announcement_id)
    on conflict (user_id, announcement_id) do nothing;
end;
$$;

create function public.admin_set_user_status(p_user_id uuid, p_status text, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare v_actor uuid; v_old text;
begin
  v_actor := private.require_admin();
  perform private.check_input(p_status in ('active','suspended'), 'Invalid account status.');
  perform private.text_value(to_jsonb(p_reason), 2000);
  perform private.check_input(char_length(btrim(p_reason)) >= 8, 'Explain the administrative action.');
  select status into v_old from public.profiles where id = p_user_id for update;
  perform private.check_input(found, 'Unknown account.');
  if p_status = 'suspended' and (p_user_id = v_actor or exists (select 1 from public.admin_members where user_id = p_user_id)) then
    raise exception using errcode = '42501', message = 'Cannot suspend yourself or another administrator.';
  end if;
  -- Suspension also invalidates existing app sessions. Unsuspending cannot
  -- revive those sessions; the account must authenticate afresh.
  update public.profiles set status = p_status, updated_at = clock_timestamp(),
    sessions_revoked_before = case when p_status = 'suspended'
      then greatest(sessions_revoked_before, clock_timestamp()) else sessions_revoked_before end
    where id = p_user_id;
  perform private.audit(v_actor, 'user.status_changed', 'user', p_user_id::text,
    jsonb_build_object('before', v_old, 'after', p_status, 'reason', btrim(p_reason)));
end;
$$;

create function public.admin_revoke_sessions(p_user_id uuid, p_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare v_actor uuid;
begin
  v_actor := private.require_admin();
  perform private.text_value(to_jsonb(p_reason), 2000);
  perform private.check_input(char_length(btrim(p_reason)) >= 8, 'Explain the administrative action.');
  update public.profiles set sessions_revoked_before = greatest(sessions_revoked_before, clock_timestamp()),
    updated_at = clock_timestamp() where id = p_user_id;
  perform private.check_input(found, 'Unknown account.');
  perform private.audit(v_actor, 'user.sessions_revoked', 'user', p_user_id::text,
    jsonb_build_object('reason', btrim(p_reason), 'scope', 'waymark_existing_sessions'));
end;
$$;

create function private.lock_revision_scope(p_kind text, p_milestone_id text, p_intake_id text) returns void
language sql set search_path = '' as $$
  select pg_advisory_xact_lock(hashtextextended(jsonb_build_array(p_kind, p_milestone_id, p_intake_id)::text, 0));
$$;

create function public.admin_save_revision(p_kind text, p_milestone_id text, p_intake_id text,
  p_payload jsonb, p_reason text, p_expected_latest_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_actor uuid; v_latest uuid; v_revision public.content_revisions;
begin
  v_actor := private.require_admin();
  perform private.validate_revision(p_kind, p_milestone_id, p_intake_id, p_payload);
  perform private.text_value(to_jsonb(p_reason), 2000);
  perform private.check_input(char_length(btrim(p_reason)) >= 8, 'Explain the content change.');
  perform private.lock_revision_scope(p_kind, p_milestone_id, p_intake_id);
  select id into v_latest from public.content_revisions where kind = p_kind and milestone_id = p_milestone_id
    and intake_id is not distinct from p_intake_id order by sequence desc limit 1;
  if v_latest is distinct from p_expected_latest_id then
    raise exception using errcode = '40001', message = 'Content changed; reload the latest revision.';
  end if;
  insert into public.content_revisions (kind, milestone_id, intake_id, payload, reason, created_by)
    values (p_kind, p_milestone_id, p_intake_id, p_payload, btrim(p_reason), v_actor)
    returning * into v_revision;
  perform private.audit(v_actor, 'content.draft_saved', 'revision', v_revision.id::text,
    jsonb_build_object('kind', p_kind, 'milestone_id', p_milestone_id, 'intake_id', p_intake_id, 'reason', btrim(p_reason)));
  return to_jsonb(v_revision);
end;
$$;

create function public.admin_publish_revision(p_revision_id uuid, p_expected_latest_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare v_actor uuid; v_revision public.content_revisions; v_latest uuid; v_country text; v_notice uuid;
begin
  v_actor := private.require_admin();
  select * into v_revision from public.content_revisions where id = p_revision_id;
  perform private.check_input(found, 'Unknown content revision.');
  perform private.lock_revision_scope(v_revision.kind, v_revision.milestone_id, v_revision.intake_id);
  -- Re-read after the scope lock; another publisher may have changed state.
  select * into strict v_revision from public.content_revisions where id = p_revision_id for update;
  select id into v_latest from public.content_revisions where kind = v_revision.kind and milestone_id = v_revision.milestone_id
    and intake_id is not distinct from v_revision.intake_id order by sequence desc limit 1;
  if v_latest is distinct from p_expected_latest_id or v_latest is distinct from p_revision_id or v_revision.state <> 'draft' then
    raise exception using errcode = '40001', message = 'Only the latest unchanged draft can be published.';
  end if;
  perform private.validate_revision(v_revision.kind, v_revision.milestone_id, v_revision.intake_id, v_revision.payload);
  update public.content_revisions set state = 'archived'
    where kind = v_revision.kind and milestone_id = v_revision.milestone_id
      and intake_id is not distinct from v_revision.intake_id and state = 'published';
  update public.content_revisions set state = 'published', published_by = v_actor, published_at = clock_timestamp()
    where id = p_revision_id;
  select country_code into strict v_country from public.catalog_milestones where id = v_revision.milestone_id;
  insert into public.announcements (title, body, country_code, created_by)
    values (case when v_revision.kind = 'guide' then 'Guide updated' else 'Planning deadline updated' end,
      'Updated ' || v_revision.milestone_id || '. Review the published information and its sources. Your completed steps have been kept.',
      v_country, v_actor) returning id into v_notice;
  if v_revision.intake_id is not null then
    insert into private.announcement_intakes (announcement_id, intake_id) values (v_notice, v_revision.intake_id);
  end if;
  perform private.audit(v_actor, 'content.published', 'revision', p_revision_id::text,
    jsonb_build_object('kind', v_revision.kind, 'milestone_id', v_revision.milestone_id,
      'intake_id', v_revision.intake_id, 'announcement_id', v_notice, 'reason', v_revision.reason));
end;
$$;

create function public.admin_publish_announcement(p_title text, p_body text, p_country_code text, p_target_user_id uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_actor uuid; v_announcement public.announcements;
begin
  v_actor := private.require_admin();
  perform private.text_value(to_jsonb(p_title), 200);
  perform private.text_value(to_jsonb(p_body), 10000);
  perform private.check_input(p_title !~ '<[^>]*>' and p_body !~ '<[^>]*>', 'Announcements must be plain text, not HTML.');
  perform private.check_input(p_country_code is null or exists (select 1 from public.catalog_countries where code = p_country_code), 'Unknown audience country.');
  perform private.check_input(p_target_user_id is null or exists (select 1 from public.profiles where id = p_target_user_id), 'Unknown audience account.');
  insert into public.announcements (title, body, country_code, target_user_id, created_by)
    values (btrim(p_title), btrim(p_body), p_country_code, p_target_user_id, v_actor) returning * into v_announcement;
  perform private.audit(v_actor, 'announcement.published', 'announcement', v_announcement.id::text,
    jsonb_build_object('country_code', p_country_code, 'target_user_id', p_target_user_id));
  return to_jsonb(v_announcement);
end;
$$;

create function public.admin_archive_announcement(p_announcement_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare v_actor uuid; v_archived timestamptz;
begin
  v_actor := private.require_admin();
  select archived_at into v_archived from public.announcements where id = p_announcement_id for update;
  perform private.check_input(found, 'Unknown announcement.');
  if v_archived is not null then return; end if;
  update public.announcements set archived_at = clock_timestamp() where id = p_announcement_id;
  perform private.audit(v_actor, 'announcement.archived', 'announcement', p_announcement_id::text, '{}');
end;
$$;

-- RLS reads and grants: no business-table INSERT/UPDATE/DELETE privileges for
-- anon/authenticated, even for admins. No private-user-data exception for admins.
alter table public.profiles enable row level security;
alter table public.admin_members enable row level security;
alter table public.catalog_countries enable row level security;
alter table public.catalog_intakes enable row level security;
alter table public.catalog_milestones enable row level security;
alter table public.plans enable row level security;
alter table public.step_progress enable row level security;
alter table public.legacy_imports enable row level security;
alter table public.content_revisions enable row level security;
alter table public.announcements enable row level security;
alter table public.notification_reads enable row level security;
alter table public.audit_events enable row level security;

create policy profiles_read on public.profiles for select to authenticated
  using (id = (select private.active_user_id()) or (select private.is_admin()));
create policy members_read on public.admin_members for select to authenticated
  using ((select private.is_admin()));
create policy countries_public on public.catalog_countries for select to anon, authenticated using (true);
create policy intakes_public on public.catalog_intakes for select to anon, authenticated using (true);
create policy milestones_public on public.catalog_milestones for select to anon, authenticated using (true);
create policy plans_owned on public.plans for select to authenticated
  using (user_id = (select private.active_user_id()));
create policy progress_owned on public.step_progress for select to authenticated
  using (exists (select 1 from public.plans p where p.id = plan_id and p.user_id = (select private.active_user_id())));
create policy imports_owned on public.legacy_imports for select to authenticated
  using (user_id = (select private.active_user_id()));
create policy revisions_public on public.content_revisions for select to anon, authenticated using (state = 'published');
create policy revisions_admin on public.content_revisions for select to authenticated using ((select private.is_admin()));
create policy announcements_read on public.announcements for select to authenticated
  using ((select private.is_admin()) or private.announcement_visible(id));
create policy notification_reads_owned on public.notification_reads for select to authenticated
  using (user_id = (select private.active_user_id()) and private.announcement_visible(announcement_id));
create policy audit_admin on public.audit_events for select to authenticated using ((select private.is_admin()));

-- Published rows (including editorial reason and author UUID attribution) are
-- public; they never contain profile emails or user-plan data. Unpublished
-- drafts/history require aal2. Keep private information out of editorial reasons.
revoke all on public.profiles, public.admin_members, public.catalog_countries,
  public.catalog_intakes, public.catalog_milestones, public.plans, public.step_progress,
  public.legacy_imports, public.content_revisions, public.announcements,
  public.notification_reads, public.audit_events from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.catalog_countries, public.catalog_intakes, public.catalog_milestones,
  public.content_revisions to anon, authenticated;
grant select on public.profiles, public.admin_members, public.plans, public.step_progress,
  public.legacy_imports, public.announcements, public.notification_reads, public.audit_events to authenticated;
revoke all on all tables in schema private from public, anon, authenticated;
revoke all on all sequences in schema private from public, anon, authenticated;
revoke all on sequence public.content_revisions_sequence_seq from public, anon, authenticated;

-- PostgreSQL grants EXECUTE to PUBLIC on new functions unless explicitly revoked.
-- Restrict this migration's functions only; do not change unrelated extensions.
revoke all on all functions in schema private from public, anon, authenticated;
grant usage on schema private to anon, authenticated;
grant execute on function private.active_user_id(), private.is_admin(), private.announcement_visible(uuid) to authenticated;
revoke all on function public.get_access(), public.select_plan(text,text,text),
  public.set_step(uuid,text,boolean,integer), public.reset_plan(uuid,integer),
  public.import_legacy_plan(text,text,text,text[],text), public.mark_notification_read(uuid),
  public.admin_set_user_status(uuid,text,text), public.admin_revoke_sessions(uuid,text),
  public.admin_save_revision(text,text,text,jsonb,text,uuid), public.admin_publish_revision(uuid,uuid),
  public.admin_publish_announcement(text,text,text,uuid), public.admin_archive_announcement(uuid)
  from public, anon, authenticated;
grant execute on function public.get_access() to anon, authenticated;
grant execute on function public.select_plan(text,text,text), public.set_step(uuid,text,boolean,integer),
  public.reset_plan(uuid,integer), public.import_legacy_plan(text,text,text,text[],text),
  public.mark_notification_read(uuid), public.admin_set_user_status(uuid,text,text),
  public.admin_revoke_sessions(uuid,text), public.admin_save_revision(text,text,text,jsonb,text,uuid),
  public.admin_publish_revision(uuid,uuid), public.admin_publish_announcement(text,text,text,uuid),
  public.admin_archive_announcement(uuid) to authenticated;

commit;
