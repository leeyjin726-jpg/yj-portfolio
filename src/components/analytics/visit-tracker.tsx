"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_FLAG = "ttiyong:landed";

function hasLanded(): boolean {
  try {
    return sessionStorage.getItem(SESSION_FLAG) === "1";
  } catch {
    return false;
  }
}

function markLanded() {
  try {
    sessionStorage.setItem(SESSION_FLAG, "1");
  } catch {
    // Storage blocked (private mode): every pageview counts as a landing.
  }
}

function send(body: string) {
  const blob = new Blob([body], { type: "application/json" });
  if (navigator.sendBeacon?.("/api/track", blob)) return;
  fetch("/api/track", { method: "POST", body, keepalive: true }).catch(() => {});
}

/** Reports one pageview per route change. Only the first one carries a source. */
export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const landing = !hasLanded();
    const utmSource = new URLSearchParams(window.location.search).get("utm_source");
    send(
      JSON.stringify({
        path: pathname,
        landing,
        referrer: landing ? document.referrer : null,
        utmSource: landing ? utmSource : null,
      }),
    );
    if (landing) markLanded();
  }, [pathname]);

  return null;
}
