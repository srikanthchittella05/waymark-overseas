-- TEST CLUSTER ONLY. These are schema/claim stand-ins, not Supabase Auth.
-- No JWT signing, Google OAuth, password hashing, MFA verification or HTTP gateway
-- is emulated. SET ROLE below still exercises REAL PostgreSQL grants and RLS.
create role anon nologin;
create role authenticated nologin;
create schema auth;
create table auth.users (
  id uuid primary key,
  email text,
  email_confirmed_at timestamptz,
  banned_until timestamptz,
  deleted_at timestamptz,
  raw_user_meta_data jsonb not null default '{}'
);
create table auth.sessions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz,
  updated_at timestamptz,
  not_after timestamptz
);
create function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb;
$$;
create function auth.uid() returns uuid language sql stable as $$
  select nullif(auth.jwt()->>'sub', '')::uuid;
$$;
grant usage on schema auth to anon, authenticated;
grant execute on function auth.uid(), auth.jwt() to anon, authenticated;
revoke all on auth.users, auth.sessions from public, anon, authenticated;
