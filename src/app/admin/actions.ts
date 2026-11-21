"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  createSessionToken,
  isCorrectPassword,
} from "@/lib/admin/session";

export type LoginState = { error: string | null };

const FAILED_LOGIN_DELAY_MS = 1000;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const token = createSessionToken();
  if (!token) return { error: "ADMIN_PASSWORD 환경변수가 설정되지 않았어요." };

  if (!isCorrectPassword(password)) {
    await new Promise((resolve) => setTimeout(resolve, FAILED_LOGIN_DELAY_MS));
    return { error: "비밀번호가 맞지 않아요." };
  }

  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_SECONDS,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
