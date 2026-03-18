"use client";

import { useEffect, useState } from "react";

const ABOUT_SECTIONS = [
  {
    label: "// ORIGIN",
    content: "Sophomore at Purdue doing CS and Math — two degrees because I couldn't pick one and honestly they're the same thing with different notation and slightly varied ideas. Originally from India, grew up in India and China, and ended up in West Lafayette because of University... also because I just love corn fields",
  },
  {
    label: "// WHAT I'M INTO",
    content: "Quant finance because markets are applied theoretical math with real consequences. Physics because the universe is suspiciously elegant. Chess because losing to a computer at 2am is a humbling experience. Photography because not everything needs to be processed. Poetry because sometimes math doesn't cut it and you need a different kind of precision.",
  },
  {
    label: "// A BLURB BECAUSE WHY NOT",
    content: "I speak four languages, program in about eight, and I'm still figuring out how to manage my time between tasks. Right now I'm interested in systems that move fast: trading engines, embedded firmware, things where being wrong is expensive. I would also like to add that this website took longer than I'd like to admit.",
  },
];

export default function AboutWindow({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);

    // Loading sequence
    const duration = 400;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const p = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(p);
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 100);
      }
    }, interval);

    return () => {
      window.removeEventListener("keydown", handler);
      clearInterval(timer);
    };
  }, [onClose]);

  if (loading) {
    return (
      <div
        className="absolute inset-0 z-40 flex flex-col items-center justify-center font-mono"
        style={{ background: "rgba(0,0,0,0.98)" }}
      >
        <div className="flex flex-col gap-4 w-64">
          <div className="flex justify-between text-[#00ff88] text-xs tracking-widest">
            <span>INITIALIZING PROFILE...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full border border-[#003322] bg-black overflow-hidden relative">
            <div 
              className="h-full bg-[#00ff88] transition-all duration-75 ease-out shadow-[0_0_10px_#00ff88]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#006633] text-[10px] tracking-widest uppercase">
              {progress > 20 ? "> MOUNTING DATA_FILES" : ""}
            </span>
            <span className="text-[#006633] text-[10px] tracking-widest uppercase">
              {progress > 50 ? "> DECRYPTING METADATA" : ""}
            </span>
            <span className="text-[#006633] text-[10px] tracking-widest uppercase">
              {progress > 85 ? "> RENDER_BUFFER_READY" : ""}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 z-40 flex flex-col font-mono overflow-hidden animate-in fade-in zoom-in-95 duration-500"
      style={{ background: "rgba(0,0,0,0.96)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#00ff88] flex-shrink-0 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-[#00ff88] text-base sm:text-lg tracking-[0.2em] font-bold">
            // ABOUT
          </span>
          <span className="text-[#006633] text-xs sm:text-sm tracking-widest hidden sm:inline">
            OPERATOR: RUHAAN BHARGAV
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-[#006633] text-[10px] sm:text-xs tracking-[0.2em] hidden md:inline">
            ESC TO EXIT
          </span>
          <button
            onClick={onClose}
            className="text-[#00ff88] border border-[#00ff88] px-2 sm:px-3 py-1 text-xs sm:text-sm tracking-widest hover:bg-[#00ff88] hover:text-black transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            [X] CLOSE
          </button>
        </div>
      </div>

      {/* Content — scrollable for smaller screens, matches projects window flow */}
      <div className="flex-grow overflow-y-auto px-4 sm:px-6 py-6 sm:py-10 custom-scrollbar">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 sm:gap-10">
          {/* Top divider */}
          <div className="border-t border-[#003322]" />

          {/* Three sections */}
          {ABOUT_SECTIONS.map((section) => (
            <div key={section.label} className="flex flex-col gap-3 sm:gap-4">
              <span className="text-[#00ff88] text-[10px] sm:text-xs tracking-[0.25em] opacity-80">
                {section.label}
              </span>
              <div className="flex flex-col gap-1 pl-4 border-l border-[#003322]">
                <p className="text-[#00aa55] text-sm sm:text-base md:text-lg tracking-wide leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom divider + signature */}
          <div className="border-t border-[#003322] pt-6" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-[#003322] text-[10px] tracking-[0.3em] uppercase">
              RUHAAN_OS v1.0 // OPERATOR_PROFILE
            </span>
            <span className="text-[#003322] text-[10px] tracking-[0.3em] uppercase">
              PURDUE UNIVERSITY — Y2 // CS + MATH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}