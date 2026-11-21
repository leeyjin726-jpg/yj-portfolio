"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="caption-category" htmlFor="admin-password">
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        className="h-12 px-4 rounded-[4px] bg-surface border border-line text-foreground text-[15px] outline-none focus:border-accent"
      />
      {state.error && <p className="text-[13px] text-softer">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-[4px] bg-foreground text-canvas text-[14px] font-medium hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50"
      >
        {pending ? "확인 중…" : "들어가기"}
      </button>
    </form>
  );
}
