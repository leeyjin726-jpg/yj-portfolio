import { defineType, defineField } from "sanity";

export const magazine = defineType({
  name: "magazine",
  title: "Magazine",
  type: "document",
  groups: [
    { name: "basic", title: "기본 정보", default: true },
    { name: "scenes", title: "Scenes (씬)" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      group: "basic",
      fields: [
        {
          name: "ko",
          type: "string",
          title: "Korean",
          description: "한글 제목 · 인덱스 카드에 노출",
          validation: (R) => R.required().max(80),
        },
        {
          name: "en",
          type: "string",
          title: "English",
          description: "영문 제목",
          validation: (R) => R.required().max(80),
        },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      description: "URL 식별자 · 영문 소문자 + 하이픈만",
      options: { source: "title.en", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "seriesLabel",
      title: "Series Label",
      type: "string",
      group: "basic",
      description:
        "상단 좌측에 노출되는 시리즈 라벨 · 예: AI Era · Social Shifts",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "basic",
      description: "발행일 · 상단 우측에 'May. 2026' 형식으로 표시",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "basic",
      description: "인덱스 카드 썸네일 · 4:5 세로 권장",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      group: "basic",
      fields: [
        {
          name: "ko",
          type: "text",
          title: "Korean",
          description: "인덱스 카드용 1-2문장 한글 요약",
          rows: 3,
        },
        {
          name: "en",
          type: "text",
          title: "English",
          description: "1-2 sentence English summary",
          rows: 3,
        },
      ],
    }),

    // ── Scenes ────────────────────────────────────────────
    defineField({
      name: "scenes",
      title: "Scenes",
      type: "array",
      group: "scenes",
      description:
        "스크롤 단위 · 한 섹션 = 한 화면 · 순서가 곧 노출 순서 (drag로 재정렬 가능)",
      of: [
        {
          type: "object",
          name: "scene",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title (한글)",
              description: "큰 제목 · 예: 욕망의 디지털 충족",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "subtitle",
              type: "string",
              title: "Subtitle (영문 이탤릭)",
              description: "예: Sad Ending Scenario",
            }),
            defineField({
              name: "body",
              type: "text",
              title: "Body",
              description: "본문 · 1-3문단 권장",
              rows: 5,
            }),
            defineField({
              name: "tone",
              type: "string",
              title: "Tone (씬 컬러)",
              description:
                "씬별 분위기 색상 · 시리즈 흐름에 맞춰 변주 권장 · 미선택 시 lavender",
              options: {
                list: [
                  { title: "Lavender (라벤더)", value: "lavender" },
                  { title: "Sage (세이지)", value: "sage" },
                  { title: "Sand (모래)", value: "sand" },
                  { title: "Slate (슬레이트)", value: "slate" },
                  { title: "Peach (피치)", value: "peach" },
                ],
                layout: "radio",
              },
              initialValue: "lavender",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "subtitle" },
            prepare({ title, subtitle }) {
              return { title: title || "Untitled scene", subtitle };
            },
          },
        },
      ],
      validation: (R) => R.min(1),
    }),
  ],
  orderings: [
    {
      title: "Published (최신순)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.ko",
      subtitle: "seriesLabel",
      media: "coverImage",
    },
  },
});
