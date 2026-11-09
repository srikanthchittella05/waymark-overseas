-- OPERATOR ONLY. Run after the person has accepted an Auth invitation and
-- verified their email. No public role-granting function exists.
-- psql <dedicated-project-operator-connection> -v email='person@example.com' \
--   -f scripts/db/provision-admin.sql
-- Provisioning does not bypass MFA: administration still requires JWT aal2.
\set ON_ERROR_STOP on
begin;
create temporary table waymark_admin_candidate (id uuid primary key) on commit drop;
insert into waymark_admin_candidate
select p.id from public.profiles p join auth.users u on u.id = p.id
where lower(u.email) = lower(:'email') and u.email_confirmed_at is not null
  and u.deleted_at is null and (u.banned_until is null or u.banned_until <= now())
  and p.status = 'active';
do $$
begin
  if (select count(*) from waymark_admin_candidate) <> 1 then
    raise exception 'Expected exactly one active, verified invited account. No membership changed.';
  end if;
end;
$$;
with invited as (
  insert into public.admin_members (user_id)
  select id from waymark_admin_candidate on conflict (user_id) do nothing returning user_id
)
insert into public.audit_events (action, subject_type, subject_id, details)
select 'admin.provisioned', 'user', user_id::text, '{"provisioned_by":"database_operator"}'::jsonb from invited;
commit;
