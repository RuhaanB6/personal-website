"use client";

import { useEffect, useState } from "react";

export default function ResumeWindow({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Only handle 1 and 2 if not loading
      if (!loading) {
        if (e.key === "1") {
          e.preventDefault();
          window.open("/CS_RESUME.pdf", "_blank");
        } else if (e.key === "2") {
          e.preventDefault();
          window.open("/QUANT_RESUME.pdf", "_blank");
        }
      }
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
  }, [onClose, loading]);

  if (loading) {
    return (
      <div
        className="absolute inset-0 z-40 flex flex-col items-center justify-center font-mono"
        style={{ background: "rgba(0,0,0,0.98)" }}
      >
        <div className="flex flex-col gap-4 w-64">
          <div className="flex justify-between text-[#00ff88] text-xs tracking-widest">
            <span>FETCHING DOCUMENTS...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full border border-[#003322] bg-black overflow-hidden relative">
            <div 
              className="h-full bg-[#00ff88] transition-all duration-75 ease-out shadow-[0_0_10px_#00ff88]"
              style={{ width: `${progress}%` }}
            />
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
            // RESUME_SELECTION
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

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 gap-6 sm:gap-8 overflow-y-auto custom-scrollbar">
        <div className="text-[#00ff88] text-xs sm:text-sm tracking-[0.3em] uppercase opacity-60 mb-2 sm:mb-4 text-center">
          Select document type to access:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 w-full max-w-2xl">
          {/* CS Resume Option */}
          <a
            href="/CS_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-10 border border-[#003322] hover:border-[#00ff88] transition-all duration-300 bg-black/40 relative overflow-hidden"
          >
            {/* Keyboard shortcut indicator */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-[#006633] text-[8px] sm:text-[10px] tracking-widest group-hover:text-[#00ff88] transition-colors">
              [ KEY: 1 ]
            </div>

            <div className="text-[#00ff88] group-hover:scale-110 transition-transform duration-300 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>

            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className="text-[#00ff88] text-lg sm:text-xl tracking-[0.2em] font-bold uppercase text-center">CS_RESUME</span>
              <span className="text-[#006633] text-[8px] sm:text-[10px] tracking-widest uppercase text-center">SWE / Systems / AI</span>
            </div>

            <div className="text-[#00aa55] text-[10px] sm:text-xs tracking-widest border border-[#003322] px-3 sm:px-4 py-1.5 sm:py-2 group-hover:bg-[#00ff88] group-hover:text-black transition-colors duration-200 font-bold">
              [ ACCESS_FILE ]
            </div>
          </a>

          {/* Quant Resume Option */}
          <a
            href="/QUANT_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-10 border border-[#003322] hover:border-[#00ff88] transition-all duration-300 bg-black/40 relative overflow-hidden"
          >
            {/* Keyboard shortcut indicator */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-[#006633] text-[8px] sm:text-[10px] tracking-widest group-hover:text-[#00ff88] transition-colors">
              [ KEY: 2 ]
            </div>

            <div className="text-[#00ff88] group-hover:scale-110 transition-transform duration-300 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>

            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className="text-[#00ff88] text-lg sm:text-xl tracking-[0.2em] font-bold uppercase text-center">QUANT_RESUME</span>
              <span className="text-[#006633] text-[8px] sm:text-[10px] tracking-widest uppercase text-center">Finance / Math / Trading</span>
            </div>

            <div className="text-[#00aa55] text-[10px] sm:text-xs tracking-widest border border-[#003322] px-3 sm:px-4 py-1.5 sm:py-2 group-hover:bg-[#00ff88] group-hover:text-black transition-colors duration-200 font-bold">
              [ ACCESS_FILE ]
            </div>
          </a>
        </div>

        <div className="mt-4 sm:mt-8 text-[#003322] text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-center">
          Waiting for operator selection...
        </div>
      </div>
    </div>
  );
}