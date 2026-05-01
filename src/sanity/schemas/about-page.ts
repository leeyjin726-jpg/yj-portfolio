import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
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
  ],
});
