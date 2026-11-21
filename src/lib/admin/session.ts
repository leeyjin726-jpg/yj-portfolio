import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "ttiyong_admin";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 24 * 30;

function adminPassword(): string | null {
  const value = process.env.ADMIN_PASSWORD?.trim();
  return value ? value : null;
}

/**
 * Session token = HMAC(password, "admin-session"). Changing ADMIN_PASSWORD
 * invalidates every issued cookie, which doubles as "log out everywhere".
 */
export function createSessionToken(): string | null {
  const password = adminPassword();
  if (!password) return null;
  return createHmac("sha256", password).update("admin-session").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function isValidSessionToken(token: string | undefined): boolean {
  const expected = createSessionToken();
  return Boolean(token && expected && safeEqual(token, expected));
}

export function isCorrectPassword(input: string): boolean {
  const password = adminPassword();
  return Boolean(password && safeEqual(input, password));
}
