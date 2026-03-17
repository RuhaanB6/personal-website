"use client";

import { useEffect } from "react";
import Image from "next/image";
import { photos } from "@/data/photos";

export default function PhotosWindow({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-40 flex flex-col font-mono animate-in fade-in zoom-in-95 duration-500 bg-black/95">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#00ff88] flex-shrink-0 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-[#00ff88] text-lg tracking-[0.2em] font-bold">
            // PHOTOGRAPHY_FEED
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[#00ff88] border border-[#00ff88] px-3 py-1 text-sm tracking-widest hover:bg-[#00ff88] hover:text-black transition-all duration-200"
        >
          [X] CLOSE
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto custom-scrollbar p-6">
        {photos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-[#006633] gap-4">
            <span className="text-sm tracking-[0.3em] animate-pulse">NO_MEDIA_FOUND.EXE</span>
            <span className="text-[10px] opacity-60 uppercase">Add files to /public/photography/ and update data/photos.ts</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-24">
            {photos.map((photo) => (
              <div 
                key={photo.id}
                className="group relative aspect-square border border-[#003322] hover:border-[#00ff88] transition-all duration-300 bg-black/40 overflow-hidden"
              >
                <Image
                  src={photo.url}
                  alt={photo.title || `Photo ${photo.id}`}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {photo.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 border-t border-[#003322] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[#00ff88] text-[10px] tracking-widest uppercase truncate block">
                      {photo.title}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Strip with Instagram Link */}
      <div className="mt-auto border-t border-[#003322] bg-black/80 p-6 flex flex-col items-center gap-4 backdrop-blur-md">
        <div className="text-[#006633] text-[10px] tracking-[0.4em] uppercase">
          Transmission complete. Full archives available externally.
        </div>
        <a
          href="https://instagram.com/your-username" // Replace with your actual username
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00ff88] border border-[#00ff88] px-8 py-3 text-xs tracking-[0.3em] font-bold hover:bg-[#00ff88] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,136,0.1)] hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
        >
          [ ACCESS_INSTAGRAM_DATABASE ]
        </a>
      </div>
    </div>
  );
}
