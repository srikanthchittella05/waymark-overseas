import { NextResponse } from "next/server";
import { z } from "zod";
import { RequestError } from "./errors";

export function privateJson(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: {
    "Cache-Control": "private, no-store, max-age=0", "Vary": "Cookie", "X-Content-Type-Options": "nosniff",
  } });
}

export function errorResponse(error: unknown) {
  if (error instanceof z.ZodError) {
    return privateJson({ error: { code: "invalid_input", message: error.issues[0]?.message ?? "Check the submitted fields." } }, 422);
  }
  if (error instanceof RequestError) return privateJson({ error: { code: error.code, message: error.message } }, error.status);
  // Auth errors are deliberately narrowed without serializing provider errors.
  if (error instanceof Error && "status" in error && "code" in error) {
    const status = typeof error.status === "number" && [401, 403, 429, 503].includes(error.status) ? error.status : 503;
    const message = status === 401 ? "Sign in to access your saved plan." : status === 403 ? "This account cannot access the requested data." : "The account service is unavailable. Please try again.";
    return privateJson({ error: { code: status === 401 ? "unauthenticated" : status === 403 ? "forbidden" : "unavailable", message } }, status);
  }
  return privateJson({ error: { code: "unavailable", message: "The service is unavailable. Please try again." } }, 503);
}

export function assertSameOrigin(request: Request, siteUrl: string) {
  const origin = request.headers.get("origin");
  if (origin !== new URL(siteUrl).origin || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new RequestError(403, "invalid_origin", "This change must be submitted from Waymark.");
  }
}

export async function readJsonBody(request: Request, maximumBytes = 64_000): Promise<unknown> {
  if (request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() !== "application/json") {
    throw new RequestError(415, "unsupported_media_type", "Send a JSON request.");
  }
  if (!request.body) throw new RequestError(400, "invalid_json", "The request body is missing.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maximumBytes) {
        await reader.cancel();
        throw new RequestError(413, "payload_too_large", "This request is too large.");
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) as unknown;
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError(400, "invalid_json", "Send valid JSON.");
  } finally {
    reader.releaseLock();
  }
}
