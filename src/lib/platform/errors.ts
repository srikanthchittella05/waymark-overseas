export class RequestError extends Error {
  constructor(public readonly status: number, public readonly code: string, message: string) {
    super(message);
    this.name = "RequestError";
  }
}

export function databaseError(error: { code?: string } | null): never {
  if (error?.code === "40001" || error?.code === "23505") {
    throw new RequestError(409, "conflict", "This item changed elsewhere. Refresh it before trying again.");
  }
  if (error?.code === "42501" || error?.code === "28000") {
    throw new RequestError(403, "forbidden", "You do not have permission to make this change.");
  }
  if (error?.code === "22023" || error?.code === "23514" || error?.code === "23503" || error?.code === "22P02") {
    throw new RequestError(422, "invalid_input", "The submitted data is not valid for this plan.");
  }
  throw new RequestError(503, "unavailable", "Your data could not be saved. Nothing was confirmed; please try again.");
}
