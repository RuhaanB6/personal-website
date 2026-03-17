"use client";

import { useEffect } from "react";
import { projects } from "@/data/projects";

export default function ProjectsWindow({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col font-mono overflow-hidden"
      style={{ background: "rgba(0,0,0,0.93)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#00ff88] flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[#00ff88] text-sm tracking-widest">// PROJECTS</span>
          <span className="text-[#006633] text-xs tracking-widest">
            {projects.length} ENTRIES FOUND
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#006633] text-xs tracking-widest">ESC TO CLOSE</span>
          <button
            onClick={onClose}
            className="text-[#00aa55] hover:text-[#00ff88] text-xs tracking-widest transition-colors duration-150 cursor-pointer"
          >
            [X] CLOSE
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div className="flex-grow overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-5">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="border border-[#003322] flex flex-col"
              style={{ background: "rgba(0, 5, 0, 0.7)" }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-2 px-3 pt-3 pb-2 border-b border-[#003322]">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#00ff88] text-xs tracking-widest">
                      {String(index + 1).padStart(2, "0")}. {project.name}
                    </span>
                    {project.still_working && (
                      <span className="text-[10px] px-1 py-0.5 border border-[#00ff88] text-[#00ff88] tracking-wider">
                        IN PROGRESS
                      </span>
                    )}
                    {project.private && (
                      <span className="text-[10px] px-1 py-0.5 border border-[#006633] text-[#006633] tracking-wider">
                        PRIVATE
                      </span>
                    )}
                  </div>
                  <span className="text-[#00aa55] text-xs tracking-wide opacity-80">
                    {project.tagline}
                  </span>
                </div>
                <span className="text-[#006633] text-xs tracking-widest flex-shrink-0">
                  {project.year}
                </span>
              </div>

              {/* Demo image */}
              <div
                className="w-full border-b border-[#003322] overflow-hidden bg-black flex items-center justify-center"
                style={{ aspectRatio: "16/9", maxHeight: "220px" }}
              >
                <img
                  src={project.image}
                  alt={`${project.name} demo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span style="color:#003322;font-size:11px;letter-spacing:0.2em;font-family:monospace">[ NO PREVIEW AVAILABLE ]</span>`;
                    }
                  }}
                />
              </div>

              {/* Description */}
              <div className="px-3 py-2 border-b border-[#003322]">
                <p className="text-[#00aa55] text-xs leading-relaxed tracking-wide">
                  {project.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-2 px-3 py-2 flex-wrap">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-wider px-1.5 py-0.5 border border-[#003322] text-[#006633]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  {!project.private && project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00aa55] hover:text-[#00ff88] text-xs tracking-widest transition-colors duration-150"
                    >
                      GH↗
                    </a>
                  ) : (
                    <span className="text-[#003322] text-xs tracking-widest">
                      [PRIVATE]
                    </span>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00aa55] hover:text-[#00ff88] text-xs tracking-widest transition-colors duration-150"
                    >
                      LIVE↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}