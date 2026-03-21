"use client";

import { useEffect, useState } from "react";

export default function BlogWindow({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);

    // Loading sequence (400ms for consistency)
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
            <span>SYNCING_DATABASE...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full border border-[#003322] bg-black overflow-hidden relative">
            <div 
              className="h-full bg-crt-green transition-all duration-75 ease-out shadow-[0_0_10px_#05ffa1]"
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
      style={{ 
        background: "rgba(0,0,0,0.96)",
        textShadow: "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 0px 0px 6px rgba(5,255,161,0.4)"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-crt-green flex-shrink-0 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-crt-green text-base sm:text-lg tracking-[0.2em] font-bold">
            // LOG_FILES
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-crt-dim text-[10px] sm:text-xs tracking-[0.2em] hidden md:inline">
            ESC TO EXIT
          </span>
          <button
            onClick={onClose}
            className="text-crt-green border border-crt-green px-2 sm:px-3 py-1 text-xs sm:text-sm tracking-widest hover:bg-crt-green hover:text-black transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            [X] CLOSE
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 text-center">
        <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-md border border-[#003322] p-8 sm:p-12 bg-black/40 relative">
          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-crt-green" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-crt-green" />
          
          <h2 className="text-crt-green text-xl sm:text-2xl tracking-[0.3em] font-bold uppercase">
            In Production
          </h2>
          
          <div className="h-px w-full bg-[#003322]" />
          
          <p className="text-crt-dim text-xs sm:text-sm tracking-widest leading-relaxed uppercase">
            The blog subsystem is currently undergoing maintenance and content decryption. 
            Full archives will be accessible shortly.
          </p>
          
          <div className="mt-2 sm:mt-4 flex flex-col items-center gap-2">
            <span className="text-[#003322] text-[8px] sm:text-[10px] tracking-[0.5em] uppercase">
              Waiting for uplink...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
