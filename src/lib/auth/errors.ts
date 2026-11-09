const messages: Record<string, string> = {
  unconfigured: "Account services are not configured yet. You can still explore the public planner.",
  unavailable: "Account services are temporarily unavailable. No account change was confirmed. Please try again.",
  unauthorized: "Sign in to continue.",
  forbidden: "This account does not have access to this area.",
  suspended: "This account is suspended. Contact the Waymark administrator for help.",
  revoked: "This session no longer has access. Sign out, then sign in again.",
  email_unverified: "Confirm your email before signing in.",
  mfa_required: "Verify your authenticator code to continue.",
  rate_limited: "Too many attempts. Please wait a few minutes before trying again.",
  invalid_credentials: "We could not sign you in. Check your details and confirm your email, or request a password reset.",
  invalid_link: "This link is invalid, expired or already used. Request a new link and try again.",
  invalid_input: "Check the submitted fields and try again.",
};

export class AuthError extends Error {
  constructor(public readonly status: number, public readonly code: string, message?: string) {
    super(message ?? messages[code] ?? "The request could not be completed.");
    this.name = "AuthError";
  }
}

export function errorDetails(error: unknown): { code: string; name: string; status: number } {
  if (!error || typeof error !== "object") return { code: "", name: "", status: 0 };
  const value = error as { code?: unknown; name?: unknown; status?: unknown };
  return {
    code: typeof value.code === "string" ? value.code : "",
    name: typeof value.name === "string" ? value.name : "",
    status: typeof value.status === "number" ? value.status : 0,
  };
}

export function providerActionError(error: unknown, fallback: "invalid_credentials" | "invalid_link" | "invalid_input" = "invalid_input"): AuthError {
  if (error instanceof AuthError) return error;
  const { status, code } = errorDetails(error);
  if (status === 429 || ["over_request_rate_limit", "over_email_send_rate_limit", "over_sms_send_rate_limit"].includes(code)) return new AuthError(429, "rate_limited");
  if (!status || status >= 500) return new AuthError(503, "unavailable");
  return new AuthError(400, fallback);
}
