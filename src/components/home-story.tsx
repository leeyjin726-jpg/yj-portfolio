"use client";

import { useState } from "react";
import { HomeStoryContent } from "./home-story-content";

export function HomeStory() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="max-w-[1280px] mx-auto px-[80px] max-md:px-10 py-[120px]">
      <p className="section-label text-softer mb-12">STORY</p>

      <div className={expanded ? "relative" : "relative max-h-[420px] overflow-hidden"}>
        <HomeStoryContent />
        {!expanded && (
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent pointer-events-none" />
        )}
      </div>

      <div className="mt-10">
        {expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="button-outline after:!content-['↑']"
          >
            접기
          </button>
        ) : (
          <button type="button" onClick={() => setExpanded(true)} className="button-outline">
            더보기
          </button>
        )}
      </div>
    </section>
  );
}
