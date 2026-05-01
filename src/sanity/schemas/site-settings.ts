import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "object",
      fields: [
        { name: "ko", type: "string", title: "Korean" },
        { name: "en", type: "string", title: "English" },
      ],
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "object",
      fields: [
        { name: "ko", type: "text", title: "Korean" },
        { name: "en", type: "text", title: "English" },
      ],
    }),
    defineField({
      name: "aboutContent",
      title: "About Page Content",
      type: "object",
      fields: [
        {
          name: "ko",
          type: "array",
          title: "Korean",
          of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
        },
        {
          name: "en",
          type: "array",
          title: "English",
          of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
        },
      ],
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "github", type: "url", title: "GitHub" },
        { name: "email", type: "string", title: "Email" },
      ],
    }),
  ],
});
