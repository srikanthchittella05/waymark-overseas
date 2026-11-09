# Accounts and administration

## Scope

Waymark is an independent product. Its implementation, assets and product decisions
come from this repository and the providers' official documentation only.

- Public landing and sample planner remain available without an account.
- Cloud saving requires login. Support Google and verified email/password accounts.
- One site and one deployment: administration lives under `/admin`.
- Admins manage users, guides, deadlines and in-app announcements. No bulk email
  delivery, billing, file uploads or account impersonation in this release.
- Invite-only administrator membership, TOTP MFA, server-side authorization and
  database row-level security. Public signup never accepts a role.
- No hosted Supabase project exists yet. Local checks are not hosted auth proof.

## Delivery order

1. Database contracts, migrations, catalog seed and real PostgreSQL isolation tests.
2. Server-only authentication, recovery, OAuth callback and MFA step-up.
3. Per-user/per-intake persistence and reviewed import of old browser progress.
4. Admin workflows, validated draft/publish content, impact previews and audit log.
5. Browser/security regression, CI and setup documentation.
6. Provision a dedicated Waymark Supabase project, configure email/Google and verify
   real auth, database policies and delivery before deployment.

## Data boundaries

- Never accept an owner id or admin role from a browser write request.
- Scope all progress to a plan owned by the current authenticated user. A plan is
  unique for a user, country and intake. Selecting another intake restores its own
  progress, never copies ticks from the previous intake.
- Treat the existing `waymark.profile.v1` and `waymark.done.v1` as untrusted legacy
  data. Import only after review of the destination/intake. Do not silently merge
  or erase the originals; retain existing cloud completions.
- Return only public catalog data to guests. Do not cache user responses publicly.
- Replace misleading local-only privacy copy when cloud saving is introduced.
- Keep the pure planner and the existing landing artwork/motion. Authentication
  and admin screens use Waymark's existing palette and typography, without the
  landing-page cinematic.

## Content changes

Published guide revisions use the existing guide schema and canonical section ids.
Deadline revisions may target one intake or the country-wide planning default.
Every change records its source, verification date, author, reason and publication
time. Preview affected plans before publishing. Publishing is transactional and
creates a relevant in-app notice without deleting completed steps. Rollback creates
a new revision from history instead of erasing the audit trail.

## Release gates

- Anonymous, cross-user, suspended-user, non-admin and admin-without-MFA writes fail.
- User metadata cannot grant administrator access.
- Concurrent progress/content edits cannot silently overwrite newer changes.
- Unconfigured/unavailable auth fails closed; never invent a signed-in session.
- Auth redirects are same-origin allowlisted paths; credentials never enter URLs.
- Verify signup, verification, recovery, Google OAuth, logout and MFA on a dedicated
  hosted staging project before calling the implementation production-ready.
- Configure provider rate limits, email delivery, callback allowlists, HTTPS,
  backups and a tested restore procedure before launch.

## Remaining live prerequisites

Provider-issued project URL/key, Google OAuth configuration and email delivery
settings must come from the dedicated Waymark project dashboards. Do not reuse
another project's settings and do not generate provider-issued credentials locally.
