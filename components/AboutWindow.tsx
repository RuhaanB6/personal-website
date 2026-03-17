"use client";

import { useEffect } from "react";

const ABOUT_SECTIONS = [
  {
    label: "// ORIGIN",
    lines: [
      "Sophomore at Purdue doing CS and Math — two degrees",
      "because I couldn't pick one and honestly they're",
      "the same thing with different notation. Originally",
      "from India, grew up across a few countries, ended",
      "up in West Lafayette which is somehow both freezing",
      "and flat at the same time.",
    ],
  },
  {
    label: "// WHAT I'M INTO",
    lines: [
      "Quant finance because markets are just applied math",
      "with real consequences. Physics because the universe",
      "is suspiciously elegant. Chess because losing to a",
      "computer at 2am is a humbling experience. Photography",
      "because not everything needs to be optimized.",
      "Poetry because sometimes math doesn't cut it and you",
      "need a different kind of precision.",
    ],
  },
  {
    label: "// HONEST BIT",
    lines: [
      "I speak four languages, write code in about eight,",
      "and I'm still figuring out which problems are worth",
      "solving. Right now I'm interested in systems that",
      "move fast — trading engines, embedded firmware,",
      "things where being wrong is expensive. This website",
      "took longer than I'd like to admit.",
    ],
  },
];

export default function AboutWindow({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="absolute inset-0 z-40 flex flex-col font-mono overflow-hidden animate-in fade-in zoom-in-95 duration-500"
      style={{ background: "rgba(0,0,0,0.96)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#00ff88] flex-shrink-0 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-[#00ff88] text-lg tracking-[0.2em] font-bold">
            // ABOUT
          </span>
          <span className="text-[#006633] text-sm tracking-widest hidden sm:inline">
            OPERATOR: RUHAAN BHARGAV
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[#006633] text-xs tracking-[0.2em] hidden md:inline">
            ESC TO EXIT
          </span>
          <button
            onClick={onClose}
            className="text-[#00ff88] border border-[#00ff88] px-3 py-1 text-sm tracking-widest hover:bg-[#00ff88] hover:text-black transition-all duration-200 cursor-pointer"
          >
            [X] CLOSE
          </button>
        </div>
      </div>

      {/* Content — scrollable for smaller screens, matches projects window flow */}
      <div className="flex-grow overflow-y-auto px-6 py-10 custom-scrollbar">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          {/* Top divider */}
          <div className="border-t border-[#003322]" />

          {/* Three sections */}
          {ABOUT_SECTIONS.map((section) => (
            <div key={section.label} className="flex flex-col gap-4">
              <span className="text-[#00ff88] text-xs tracking-[0.25em] opacity-80">
                {section.label}
              </span>
              <div className="flex flex-col gap-1 pl-4 border-l border-[#003322]">
                {section.lines.map((line, i) => (
                  <span
                    key={i}
                    className="text-[#00aa55] text-base md:text-lg tracking-wide leading-relaxed"
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Bottom divider + signature */}
          <div className="border-t border-[#003322] pt-6" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-[#003322] text-xs tracking-[0.3em]">
              RUHAAN_OS v1.0 // OPERATOR_PROFILE
            </span>
            <span className="text-[#003322] text-xs tracking-[0.3em]">
              PURDUE UNIVERSITY — Y2 // CS + MATH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}