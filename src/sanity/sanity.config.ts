import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "yj-portfolio",
  title: "TTIYONG.ART",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("About")
              .id("aboutPage")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("singleton-aboutPage")
              ),
            S.listItem()
              .title("Contact")
              .id("contactPage")
              .child(
                S.document()
                  .schemaType("contactPage")
                  .documentId("singleton-contactPage")
              ),
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("singleton-siteSettings")
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["siteSettings", "aboutPage", "contactPage"].includes(item.getId() ?? "")
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
