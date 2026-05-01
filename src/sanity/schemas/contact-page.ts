import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "object",
      fields: [
        { name: "ko", type: "string", title: "Korean" },
        { name: "en", type: "string", title: "English" },
      ],
    }),
    defineField({
      name: "subtext",
      title: "Subtext",
      type: "object",
      fields: [
        { name: "ko", type: "text", title: "Korean" },
        { name: "en", type: "text", title: "English" },
      ],
    }),
  ],
});
