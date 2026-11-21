export type TrafficSource =
  | "chatgpt"
  | "claude"
  | "perplexity"
  | "gemini"
  | "copilot"
  | "google"
  | "naver"
  | "daum"
  | "bing"
  | "instagram"
  | "linkedin"
  | "threads"
  | "kakao"
  | "direct"
  | "other";

export const AI_SOURCES: readonly TrafficSource[] = [
  "chatgpt",
  "claude",
  "perplexity",
  "gemini",
  "copilot",
];

export const SOURCE_LABELS: Record<TrafficSource, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  perplexity: "Perplexity",
  gemini: "Gemini",
  copilot: "Copilot",
  google: "Google",
  naver: "Naver",
  daum: "Daum",
  bing: "Bing",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  threads: "Threads",
  kakao: "KakaoTalk",
  direct: "직접 방문",
  other: "기타",
};

/** Ordered: first match wins. Matched against hostname or utm_source. */
const RULES: ReadonlyArray<[TrafficSource, RegExp]> = [
  ["chatgpt", /(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com)$|^chatgpt/],
  ["claude", /(^|\.)claude\.ai$|^claude/],
  ["perplexity", /(^|\.)perplexity\.ai$|^perplexity/],
  ["gemini", /(^|\.)gemini\.google\.com$|^gemini/],
  ["copilot", /(^|\.)copilot\.microsoft\.com$|^copilot/],
  ["google", /(^|\.)google\.[a-z.]+$|^google/],
  ["naver", /(^|\.)naver\.(com|me)$|^naver/],
  ["daum", /(^|\.)(daum\.net|kakao\.com)$|^daum/],
  ["bing", /(^|\.)bing\.com$|^bing/],
  ["instagram", /(^|\.)instagram\.com$|^instagram|^ig$/],
  ["linkedin", /(^|\.)(linkedin\.com|lnkd\.in)$|^linkedin/],
  ["threads", /(^|\.)threads\.(net|com)$|^threads/],
  ["kakao", /(^|\.)kakao(talk)?\.[a-z.]+$|^kakao/],
];

function hostnameOf(referrer: string): string | null {
  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Classify where a landing visit came from. utm_source wins over the
 * referrer because ChatGPT tags outbound links with utm_source=chatgpt.com
 * while in-app browsers often strip the referrer.
 */
export function classifySource(
  referrer: string | null | undefined,
  utmSource: string | null | undefined,
  ownHost: string,
): TrafficSource {
  const utm = utmSource?.trim().toLowerCase();
  if (utm) {
    const hit = RULES.find(([, re]) => re.test(utm));
    if (hit) return hit[0];
  }

  const host = referrer ? hostnameOf(referrer) : null;
  if (!host || host === ownHost || host.endsWith(`.${ownHost}`)) return "direct";

  const hit = RULES.find(([, re]) => re.test(host));
  return hit ? hit[0] : "other";
}

export function isAiSource(source: TrafficSource): boolean {
  return AI_SOURCES.includes(source);
}
