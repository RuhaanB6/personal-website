"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/projects";

export default function ProjectsWindow({ onClose }: { onClose: () => void }) {
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
          <div className="flex justify-between text-crt-green text-xs tracking-widest">
            <span>INITIALIZING CATALOGUE...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full border border-[#003322] bg-black overflow-hidden relative">
            <div 
              className="h-full bg-crt-green transition-all duration-75 ease-out shadow-[0_0_10px_#05ffa1]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-crt-dim text-[10px] tracking-widest uppercase">
              {progress > 20 ? "> MOUNTING DATA_FILES" : ""}
            </span>
            <span className="text-crt-dim text-[10px] tracking-widest uppercase">
              {progress > 50 ? "> DECRYPTING METADATA" : ""}
            </span>
            <span className="text-crt-dim text-[10px] tracking-widest uppercase">
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
      style={{ 
        background: "rgba(0,0,0,0.96)",
        textShadow: "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 0px 0px 6px rgba(5,255,161,0.4)"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-crt-green flex-shrink-0 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-crt-green text-base sm:text-lg tracking-[0.2em] font-bold">// PROJECTS</span>
          <span className="text-crt-dim text-xs sm:text-sm tracking-widest hidden sm:inline">
            {projects.length} ENTRIES FOUND
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-crt-dim text-[10px] sm:text-xs tracking-[0.2em] hidden md:inline">ESC TO EXIT</span>
          <button
            onClick={onClose}
            className="text-crt-green border border-crt-green px-2 sm:px-3 py-1 text-xs sm:text-sm tracking-widest hover:bg-crt-green hover:text-black transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            [X] CLOSE
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div className="flex-grow overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 sm:gap-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="border border-[#003322] flex flex-col group hover:border-crt-green/50 transition-colors duration-300"
              style={{ background: "rgba(0, 8, 0, 0.6)" }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-4 px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-[#003322] group-hover:border-crt-green/30">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-crt-green text-base sm:text-lg tracking-wider font-bold">
                      {String(index + 1).padStart(2, "0")}. {project.name}
                    </span>
                    {project.still_working && (
                      <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 border border-crt-green text-crt-green tracking-[0.15em] animate-pulse">
                        IN PROGRESS
                      </span>
                    )}
                    {project.private && (
                      <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 border border-crt-dim text-crt-dim tracking-[0.15em]">
                        PRIVATE
                      </span>
                    )}
                  </div>
                  <span className="text-crt-dim text-xs sm:text-sm tracking-wide opacity-90 italic">
                    {project.tagline}
                  </span>
                </div>
                <span className="text-crt-dim text-xs sm:text-sm tracking-[0.2em] font-bold flex-shrink-0 mt-1">
                  {project.year}
                </span>
              </div>

              {/* Demo image */}
              <div
                className="w-full border-b border-[#003322] overflow-hidden bg-black flex items-center justify-center p-2"
                style={{ minHeight: "200px", maxHeight: "450px" }}
              >
                <img
                  src={project.image}
                  alt={`${project.name} demo`}
                  className="max-w-full max-h-full object-contain shadow-[0_0_20px_rgba(5,255,161,0.1)] group-hover:shadow-[0_0_30px_rgba(5,255,161,0.15)] transition-all duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span style="color:#003322;font-size:10px;letter-spacing:0.3em;font-family:monospace" class="uppercase">[ ERROR: PREVIEW_UNAVAILABLE ]</span>`;
                    }
                  }}
                />
              </div>

              {/* Description */}
              <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-[#003322] group-hover:border-crt-green/20 bg-black/20">
                <p className="text-crt-dim text-xs sm:text-sm leading-relaxed tracking-wide">
                  {project.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 px-4 sm:px-5 py-4 flex-wrap bg-black/40">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] sm:text-[11px] tracking-widest px-1.5 sm:px-2 py-0.5 sm:py-1 border border-[#003322] text-crt-dim hover:border-crt-dim hover:text-crt-dim transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 sm:gap-4 flex-wrap">
                  {!project.private && project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none text-center text-crt-dim border border-crt-dim px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs tracking-[0.2em] hover:bg-crt-dim hover:text-black transition-all duration-200 uppercase font-bold"
                    >
                      SOURCE↗
                    </a>
                  ) : (
                    <span className="flex-1 sm:flex-none text-center text-[#003322] border border-[#003322] px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-50">
                      [PRIVATE]
                    </span>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none text-center text-crt-green border border-crt-green px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs tracking-[0.2em] hover:bg-crt-green hover:text-black transition-all duration-200 uppercase font-bold shadow-[0_0_10px_rgba(5,255,161,0.1)]"
                    >
                      DEPLOY↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="py-10 text-center text-[#003322] text-[10px] sm:text-xs tracking-[0.5em] uppercase">
            // END OF CATALOGUE //
          </div>
        </div>
      </div>
    </div>
  );
}
