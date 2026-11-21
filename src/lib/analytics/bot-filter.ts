const BOT_PATTERN =
  /bot|crawl|spider|slurp|preview|fetch|monitor|headless|lighthouse|pingdom|vercel|facebookexternalhit|kakaotalk-scrap|yeti|daum(oa)?|python|curl|wget|axios|node-fetch/i;

/** True for crawlers, link-preview fetchers and scripted clients. */
export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true;
  return BOT_PATTERN.test(userAgent);
}
