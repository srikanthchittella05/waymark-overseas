import { z } from "zod";

const email = z.string().trim().max(254).pipe(z.email("Enter a valid email address."));
const password = z.string().min(12, "Use at least 12 characters.").max(72).refine(
  (value) => Array.from(value).length >= 12, "Use at least 12 characters.",
).refine(
  (value) => new TextEncoder().encode(value).length <= 72,
  "Use a password of at most 72 UTF-8 bytes.",
);
const confirmation = z.string().max(72);

export const loginSchema = z.object({ email, password: z.string().min(1, "Enter your password.").max(1024) }).strict();
export const signupSchema = z.object({
  displayName: z.string().trim().min(1, "Enter your name.").max(100), email, password, confirmPassword: confirmation,
}).strict().refine((value) => value.password === value.confirmPassword, { path: ["confirmPassword"], message: "The passwords do not match." });
export const forgotPasswordSchema = z.object({ email }).strict();
export const totpCodeSchema = z.string().regex(/^\d{6}$/, "Enter the six-digit authenticator code.");
export const totpSchema = z.object({ factorId: z.uuid(), code: totpCodeSchema }).strict();
export const factorSchema = z.object({ factorId: z.uuid() }).strict();
export const resetPasswordSchema = z.object({
  password, confirmPassword: confirmation, code: z.union([z.literal(""), totpCodeSchema]),
}).strict().refine((value) => value.password === value.confirmPassword, { path: ["confirmPassword"], message: "The passwords do not match." });
export const tokenSchema = z.string().regex(/^[A-Za-z0-9_.-]{16,1024}$/);
export const flowIdSchema = z.string().regex(/^[A-Za-z0-9_-]{8,64}$/);
export const recoveryProofSchema = z.object({ kind: z.enum(["token_hash", "code"]), value: tokenSchema, flowId: flowIdSchema.optional() }).strict();
export type RecoveryProof = z.infer<typeof recoveryProofSchema>;

// The pinned SDK returns redirectType at runtime (and documents it), but its
// public AuthTokenResponse type omits it. Validate that field rather than cast.
export function isRecoveryExchange(value: unknown): boolean {
  return z.object({ redirectType: z.literal("recovery") }).safeParse(value).success;
}

export function formValues(form: FormData, names: string[]): Record<string, string> {
  return Object.fromEntries(names.map((name) => {
    const values = form.getAll(name);
    if (values.length > 1 || (values.length === 1 && typeof values[0] !== "string")) {
      throw new z.ZodError([{ code: "custom", path: [name], message: "Submit one text value per field." }]);
    }
    return [name, typeof values[0] === "string" ? values[0] : ""];
  }));
}
