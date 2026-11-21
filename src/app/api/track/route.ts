import type { NextRequest } from "next/server";
import { isBotUserAgent } from "@/lib/analytics/bot-filter";
import { classifySource } from "@/lib/analytics/traffic-source";
import { recordVisit } from "@/lib/analytics/record-visit";
import { ADMIN_COOKIE, isValidSessionToken } from "@/lib/admin/session";

type TrackPayload = {
  path?: unknown;
  referrer?: unknown;
  utmSource?: unknown;
  landing?: unknown;
};

const MAX_PATH_LENGTH = 200;

function cleanPath(value: unknown): string | null {
  if (typeof value !== "string" || !value.startsWith("/")) return null;
  const path = value.split(/[?#]/)[0].slice(0, MAX_PATH_LENGTH);
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.length < 500 ? value : null;
}

const noContent = () => new Response(null, { status: 204 });

export async function POST(request: NextRequest) {
  if (isBotUserAgent(request.headers.get("user-agent"))) return noContent();
  if (isValidSessionToken(request.cookies.get(ADMIN_COOKIE)?.value)) return noContent();

  let payload: TrackPayload;
  try {
    payload = (await request.json()) as TrackPayload;
  } catch {
    return new Response(null, { status: 400 });
  }

  const path = cleanPath(payload.path);
  if (!path) return new Response(null, { status: 400 });

  const landingSource =
    payload.landing === true
      ? classifySource(
          optionalString(payload.referrer),
          optionalString(payload.utmSource),
          request.nextUrl.hostname,
        )
      : null;

  try {
    await recordVisit({ path, landingSource });
  } catch (error) {
    console.error("[track] failed to record visit", error);
  }
  return noContent();
}
