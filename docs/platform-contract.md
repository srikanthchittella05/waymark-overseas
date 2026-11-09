# Platform implementation contract

All identifiers below are Waymark-owned. This contract coordinates database,
authentication, planner and administration code in this repository.

## Database

Use the `public` API schema and an unexposed `private` helper schema. Enable RLS
on every public table; explicitly grant only necessary read/execute privileges.
No browser or session client has direct insert/update/delete grants on business
tables. Mutations go through narrowly validated, transaction-safe RPCs.

Tables:

- `profiles`: `id` (auth user UUID), `email`, `display_name`, `status`
  (`active|suspended`), `active_plan_id` (nullable), `sessions_revoked_before`,
  `created_at`, `updated_at`. Created by a minimal auth.users trigger. Never infer
  an administrator role from signup metadata.
- `admin_members`: `user_id`, `created_at`. Provisioned only by an operator SQL
  step; no public role-assignment RPC.
- `catalog_countries`: `code`, `name`, `admission`, `notes`.
- `catalog_intakes`: `id`, `country_code`, `label`, `start_date`.
- `catalog_milestones`: `id`, `country_code`, `definition` (existing Milestone
  JSON), `archetype`, `section_ids` (canonical guide section ids).
- `plans`: `id` UUID, `user_id`, `country_code`, `intake_id`, `stage`, `version`
  integer, `created_at`, `updated_at`. Unique `(user_id,country_code,intake_id)`.
- `step_progress`: `plan_id`, `milestone_id`, `done` boolean, `updated_at`;
  primary key `(plan_id,milestone_id)`. Validate milestone country matches plan.
- `legacy_imports`: `(user_id,import_key)`, `plan_id`, `created_at`.
- `content_revisions`: `id` UUID, monotonic `sequence`, `kind` (`guide|deadline`),
  `milestone_id`, nullable `intake_id`, `payload` JSON, `state`
  (`draft|published|archived`), `reason`, `created_by`, `created_at`,
  `published_by`, `published_at`. At most one published revision per
  `(kind,milestone_id,coalesce(intake_id,''))`. No destructive revision deletion.
- `announcements`: `id`, `title`, `body`, nullable `country_code`, nullable
  `target_user_id`, `created_by`, `published_at`, `created_at`, `archived_at`.
  Plain text only. All announcements are created through an audited publish RPC.
- `notification_reads`: `(user_id,announcement_id)`, `read_at`.
- `audit_events`: `id`, `actor_id`, `action`, `subject_type`, `subject_id`,
  `details` JSON, `created_at`. Append-only; never record tokens or passwords.

User RPCs (JSON return values use snake_case database field names):

- `get_access()` -> `{user_id,email,display_name,status,is_admin,aal}` or null.
  Returns verified account access for auth.uid(); no input user id. This must
  identify application-revoked sessions and suspended accounts as not active.
- `select_plan(p_country_code text,p_intake_id text,p_stage text)` -> plan row.
  Owner comes exclusively from auth.uid(). Creates/restores the chosen plan and
  updates profiles.active_plan_id atomically. Restores that plan's own progress.
- `set_step(p_plan_id uuid,p_milestone_id text,p_done boolean,p_expected_version
  integer)` -> plan row. Locks the plan; rejects stale versions with SQLSTATE
  `40001`, wrong owner, invalid milestone and invalid account.
- `reset_plan(p_plan_id uuid,p_expected_version integer)` -> plan row. Clears
  progress for that plan only and increments version, with the same checks.
- `import_legacy_plan(p_country_code text,p_intake_id text,p_stage text,
  p_completed_ids text[],p_import_key text)` -> plan row. Atomic, idempotent,
  checked import. Merge true completions; never erase existing cloud progress.
- `mark_notification_read(p_announcement_id uuid)` -> void. Must verify that the
  announcement is visible to this user, not merely that its UUID exists.

Admin RPCs (all require active DB-owned admin membership AND JWT aal2):

- `admin_set_user_status(p_user_id uuid,p_status text,p_reason text)` -> void.
  Deny suspending self or another administrator; audit the change.
- `admin_revoke_sessions(p_user_id uuid,p_reason text)` -> void. Revoke Waymark
  access for existing sessions, including their refreshed tokens, without writing
  Supabase internal tables; audit the change. New authenticated sessions may log in.
- `admin_save_revision(p_kind text,p_milestone_id text,p_intake_id text,
  p_payload jsonb,p_reason text,p_expected_latest_id uuid)` -> revision row.
  Advisory-lock scope, validate schema and keys, compare latest id (including
  null for first revision), then append a draft. Stale draft edits -> `40001`.
- `admin_publish_revision(p_revision_id uuid,p_expected_latest_id uuid)` -> void.
  Lock scope, require latest draft, validate again, archive prior publication and
  publish atomically. Add relevant in-app notice and audit event. Keep progress.
- `admin_publish_announcement(p_title text,p_body text,p_country_code text,
  p_target_user_id uuid)` -> announcement row. Validate audience and text limits.
- `admin_archive_announcement(p_announcement_id uuid)` -> void. Audit archive.

Catalog/content are public only when published. Authenticated users may read their
own profile, plans, progress, import records and visible notifications. Only aal2
admins may read all profiles, draft/history content and the audit log. Admins have
no general read access to private user plan/progress rows. Suspension and application
session revocation must also deny direct PostgREST requests using an old token.

Guide payload is existing `GuideContent` with its exact archetype/section ids.
Deadline payload is `{offsetDays:number,dueDate?:YYYY-MM-DD,hardDeadline:boolean,
source:httpsUrl,confidence:'verified'|'typical'|'estimate',verifiedOn:YYYY-MM-DD}`.
`dueDate` requires a specific intake; otherwise timing is intake-relative.

## Server authentication exports

`src/lib/supabase/config.ts`: `getSupabaseConfig()` -> `{url,key,siteUrl,
googleEnabled}` or null when unconfigured. Server env names: `SUPABASE_URL`,
`SUPABASE_PUBLISHABLE_KEY`, `WAYMARK_SITE_URL`, `WAYMARK_GOOGLE_AUTH_ENABLED`.
No service-role key is required for normal application operations.

`src/lib/supabase/server.ts`: `createSupabaseServerClient()` -> session-scoped
SupabaseClient; throws when unconfigured. Use only verified provider credentials.
All SDK calls run on the server. HttpOnly, SameSite=Lax, host-only cookies; Secure
on HTTPS. No auth tokens or privileged clients are exposed to Client Components.

`src/lib/auth/session.ts`:

- `AuthError` with `status` and `code` (safe public codes).
- `getAuthContext()` -> `{configured:boolean,client:SupabaseClient|null,
  user:Viewer|null}`; invalid/expired session -> guest, provider/DB outage -> throw
  `AuthError(503,'unavailable')`, suspended/revoked account -> throw 403.
- `requireUser()` -> `{client:SupabaseClient,user:Viewer}` or throw.
- `requireAdmin()` -> same, but check DB membership and aal2 on every call.
- `Viewer` = `{id,email,displayName,isAdmin,aal:'aal1'|'aal2'}`.

Auth pages: `/login`, `/signup`, `/forgot-password`, `/reset-password`,
`/auth/callback`, `/auth/confirm`, `/admin/security`. Admin protected pages live
under `src/app/admin/(protected)/` so MFA enrollment is not caught in a redirect
loop. Do not edit root layout/navigation or /admin pages outside security from
the auth implementation; those have separate owners.

## Ownership during implementation

- Database: `supabase/**`, `scripts/db/**`, `tests/database/**` only.
- Authentication: `src/lib/supabase/**`, `src/lib/auth/**`, `src/app/(auth)/**`,
  `src/app/auth/**`, `src/app/admin/security/**`, `src/components/auth/**`,
  `src/proxy.ts`, `tests/auth/**` only.
- Administration: `src/app/admin/**` EXCEPT `security/**`, `src/lib/admin/**`,
  `src/components/admin/**`, `tests/admin/**` only.
- Integration: shared validators, catalog export, workspace API/store, account UI,
  published content loading, nav/root integration, tooling, CI and documentation.
