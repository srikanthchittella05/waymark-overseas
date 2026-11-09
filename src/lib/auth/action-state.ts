export type AuthActionState = {
  status: "idle" | "error" | "success";
  message: string;
  fields?: Record<string, string>;
  redirectTo?: string;
  enrollment?: { factorId: string; qrCode: string; secret: string };
};

export const INITIAL_AUTH_STATE: AuthActionState = { status: "idle", message: "" };
export type AuthAction = (previous: AuthActionState, form: FormData) => Promise<AuthActionState>;
