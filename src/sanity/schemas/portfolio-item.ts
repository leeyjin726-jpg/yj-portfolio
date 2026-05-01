import { defineType, defineField } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio",
  type: "document",
  groups: [
    { name: "basic", title: "기본 정보", default: true },
    { name: "media", title: "이미지" },
    { name: "meta", title: "메타 정보" },
    { name: "case", title: "케이스 스터디" },
  ],
  fields: [
    // ── 기본 정보 ──────────────────────────────────────────
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
          description: "한글 제목 · 예: 작가의 정원",
          validation: (R) => R.required().max(60),
        },
        {
          name: "en",
          type: "string",
          title: "English",
          description: "영문 제목 · 예: Writer's Garden",
          validation: (R) => R.required().max(60),
        },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      description:
        "URL 식별자 · 영문 소문자 + 하이픈만 · 한번 정하면 변경 비추천 · 예: writergarden, suppl-magazine",
      options: { source: "title.en", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "basic",
      description:
        "주 분류 · Design(시각·UI 중심) 또는 Content(콘텐츠·글 중심) 중 하나",
      options: {
        list: [
          { title: "Design", value: "design" },
          { title: "Content", value: "content" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
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
          description: "카드 캡션·SEO에 쓰이는 1-2문장 한글 요약 · 최대 120자 권장",
          rows: 3,
        },
        {
          name: "en",
          type: "text",
          title: "English",
          description: "1-2 sentence English summary · recommended max 160 chars",
          rows: 3,
        },
      ],
    }),

    // ── 이미지 ─────────────────────────────────────────────
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "media",
      description:
        "카드 썸네일 · 4:5 세로 비율 권장 (예: 1200×1500px 이상) · 배경이 정리된 고해상도 이미지 사용",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "대체 텍스트 · 이미지가 안 보일 때 표시될 간단한 설명",
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
          description: "이미지 아래 표시될 짧은 설명 (선택)",
        }),
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      group: "media",
      description:
        "케이스 스터디 SOLUTION 섹션용 · 한 프로젝트 안에서는 비율 통일 (4:5 또는 16:9 하나 선택) · 스토리 순서대로 업로드",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "대체 텍스트 · 이미지가 안 보일 때 표시될 간단한 설명",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
              description: "이미지 아래 표시될 짧은 설명 (선택)",
            }),
          ],
        },
      ],
    }),

    // ── 메타 정보 ──────────────────────────────────────────
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      group: "meta",
      description:
        '클라이언트명 · 개인 작업은 "Personal Project" · 예: Deutsch Motors MINI, 웍스컴바인 × Deutsch Motors MINI',
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "meta",
      description: "작업 연도 · 진행 중이면 범위로 · 예: 2024, 2024-2025",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "meta",
      description:
        "역할·스택·분야 단어 · 태그 입력 후 Enter · 예: Web, Next.js, Editorial, Campaign",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      group: "meta",
      description:
        "포트폴리오 인덱스에서의 노출 순서 · 숫자 작을수록 먼저 · 10 단위 권장 (10, 20, 30) · 중간 삽입 여유 확보",
      validation: (R) => R.required().integer().positive(),
    }),

    // ── 케이스 스터디 ──────────────────────────────────────
    defineField({
      name: "problem",
      title: "01 · Problem (문제)",
      type: "array",
      group: "case",
      description:
        "무엇이 막혀 있었나? · 배경 · 페인 포인트 · 현재 상황 · 2-4 문단 권장",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "hypothesis",
      title: "02 · Hypothesis (가설)",
      type: "array",
      group: "case",
      description:
        "어떻게 풀 수 있을까? · 접근 방향 · 핵심 가정 · 측정 가능한 가설로 · 2-4 문단 권장",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "solution",
      title: "03 · Solution (솔루션)",
      type: "array",
      group: "case",
      description:
        "실제로 무엇을 만들었나? · 실행 과정 · UI · 구조 결정 · 가장 분량 큰 중심 섹션 (전체의 40-50%)",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "대체 텍스트 · 이미지가 안 보일 때 표시될 간단한 설명",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
              description: "이미지 아래 표시될 짧은 설명 (선택)",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "results",
      title: "04 · Results (성과)",
      type: "array",
      group: "case",
      description:
        "무엇이 바뀌었나? · 수치 · 피드백 · 결과물 · 정량 있으면 구체적으로, 없으면 정성 피드백 한 줄이라도",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "learnings",
      title: "05 · Learnings (배운 점)",
      type: "array",
      group: "case",
      description:
        "다음엔 무엇을 다르게? · 통찰 · 회고 · 다음 스텝 · 자기 비판 한 줄 포함하면 설득력 ↑",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [
    {
      title: "Display Order (오름차순)",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
    {
      title: "Year (최신순)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.ko",
      subtitle: "title.en",
      media: "coverImage",
      order: "displayOrder",
    },
    prepare(value) {
      const { title, subtitle, media, order } = value as { title?: string; subtitle?: string; media?: unknown; order?: number };
      return {
        title: order ? `[${order}] ${title ?? "Untitled"}` : (title ?? "Untitled"),
        subtitle,
        media: media as never,
      };
    },
  },
});
