import { defineType, defineField } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "ko", type: "string", title: "Korean" },
        { name: "en", type: "string", title: "English" },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.ko", maxLength: 96 },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "object",
      fields: [
        { name: "ko", type: "text", title: "Korean" },
        { name: "en", type: "text", title: "English" },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
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
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
  ],
  orderings: [
    {
      title: "Published Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title.ko", media: "coverImage" },
  },
});
