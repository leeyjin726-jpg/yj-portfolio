/** Redis key layout. One hash per KST day per dimension. */
export const analyticsKeys = {
  /** hash: path -> pageviews */
  pageviews: (day: string) => `a:pv:${day}`,
  /** hash: source -> landing visits */
  sources: (day: string) => `a:src:${day}`,
  /** hash: `${source}\t${path}` -> landing visits (AI sources only) */
  aiLandings: (day: string) => `a:ai:${day}`,
  /** string: first KST day with any data */
  firstDay: "a:first-day",
};

export const AI_FIELD_SEPARATOR = "\t";
