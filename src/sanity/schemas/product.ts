import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Shop",
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
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "ko", type: "text", title: "Korean" },
        { name: "en", type: "text", title: "English" },
      ],
    }),
    defineField({ name: "price", title: "Price", type: "number" }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      options: {
        list: [
          { title: "KRW (원)", value: "KRW" },
          { title: "USD ($)", value: "USD" },
        ],
      },
      initialValue: "KRW",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalUrl",
      title: "External Purchase URL",
      type: "url",
      description: "Link to external store (e.g., Smart Store, Gumroad, Teachable)",
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "title.ko", media: "image" },
  },
});
