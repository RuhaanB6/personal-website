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
          <div className="flex justify-between text-[#00ff88] text-xs tracking-widest">
            <span>SYNCING_DATABASE...</span>
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
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#00ff88] flex-shrink-0 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-[#00ff88] text-lg tracking-[0.2em] font-bold">
            // LOG_FILES
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

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="flex flex-col gap-6 max-w-md border border-[#003322] p-12 bg-black/40 relative">
          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#00ff88]" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00ff88]" />
          
          <h2 className="text-[#00ff88] text-2xl tracking-[0.3em] font-bold uppercase">
            In Production
          </h2>
          
          <div className="h-px w-full bg-[#003322]" />
          
          <p className="text-[#00aa55] text-sm tracking-widest leading-relaxed uppercase">
            The blog subsystem is currently undergoing maintenance and content decryption. 
            Full archives will be accessible shortly.
          </p>
          
          <div className="mt-4 flex flex-col items-center gap-2">
            <span className="text-[#003322] text-[10px] tracking-[0.5em] uppercase">
              Waiting for uplink...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
