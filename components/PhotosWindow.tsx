"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { photos } from "@/data/photos";

function PhotoFrame({ photo }: { photo: any }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group relative aspect-square border border-[#003322] hover:border-crt-green transition-all duration-300 bg-black/40 overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 bg-black">
          <span className="text-crt-dim text-[10px] tracking-[0.2em] animate-pulse">
            LOADING_IMAGE_{photo.id}...
          </span>
          <div className="text-[#003322] text-[8px] font-mono whitespace-pre">
            [████░░░░░░]
          </div>
        </div>
      )}
      <Image
        src={photo.url}
        alt={photo.title || `Photo ${photo.id}`}
        fill
        className={`object-cover transition-all duration-700 ${
          isLoaded ? "opacity-80 group-hover:opacity-100 group-hover:scale-105" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
      {photo.title && isLoaded && (
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-black/80 border-t border-[#003322] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-crt-green text-[8px] sm:text-[10px] tracking-widest uppercase truncate block">
            {photo.title}
          </span>
        </div>
      )}
    </div>
  );
}

export default function PhotosWindow({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);

    // Loading sequence
    const duration = 600;
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
            <span>FETCHING_MEDIA_ASSETS...</span>
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
              {progress > 20 ? "> INITIALIZING_IMAGE_BUFFER" : ""}
            </span>
            <span className="text-crt-dim text-[10px] tracking-widest uppercase">
              {progress > 50 ? "> LOADING_HIGH_RES_ASSETS" : ""}
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
      className="absolute inset-0 z-40 flex flex-col font-mono animate-in fade-in zoom-in-95 duration-500 bg-black/95"
      style={{ 
        textShadow: "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 0px 0px 6px rgba(5,255,161,0.4)"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-crt-green flex-shrink-0 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-crt-green text-base sm:text-lg tracking-[0.2em] font-bold">
            // PHOTOGRAPHY_FEED
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-crt-dim text-[10px] sm:text-xs tracking-[0.2em] hidden md:inline">
            ESC TO EXIT
          </span>
          <button
            onClick={onClose}
            className="text-crt-green border border-crt-green px-2 sm:px-3 py-1 text-xs sm:text-sm tracking-widest hover:bg-crt-green hover:text-black transition-all duration-200 whitespace-nowrap"
          >
            [X] CLOSE
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto custom-scrollbar p-4 sm:p-6">
        {photos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-crt-dim gap-4">
            <span className="text-xs sm:text-sm tracking-[0.3em] animate-pulse">NO_MEDIA_FOUND.EXE</span>
            <span className="text-[8px] sm:text-[10px] opacity-60 uppercase text-center">Add files to /public/photography/ and update data/photos.ts</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto pb-24">
            {photos.map((photo) => (
              <PhotoFrame key={photo.id} photo={photo} />
            ))}
          </div>
        )}
      </div>

      {/* Footer Strip with Instagram Link */}
      <div className="mt-auto border-t border-[#003322] bg-black/80 p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 backdrop-blur-md">
        <div className="text-crt-dim text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-center">
          Transmission complete. Full archives available externally.
        </div>
        <a
          href="https://www.instagram.com/ruhaanb.jpg/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center text-crt-green border border-crt-green px-4 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-xs tracking-[0.3em] font-bold hover:bg-crt-green hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(5,255,161,0.1)] hover:shadow-[0_0_20px_rgba(5,255,161,0.3)]"
        >
          [ ACCESS_INSTAGRAM_DATABASE ]
        </a>
      </div>
    </div>
  );
}
