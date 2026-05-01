import { createClient } from "next-sanity";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const projectId = /^[a-z0-9-]+$/.test(rawProjectId) ? rawProjectId : "dummy123";

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-04-19",
  useCdn: process.env.NODE_ENV === "production",
});

// Preview client for draft content (useCdn must be false to bypass cache)
export const previewClient = client.withConfig({
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
