"use client";

import { useState } from "react";
// Adding the speed thingie to check speed on vercel
import { SpeedInsights } from "@vercel/speed-insights/next"
import dynamic from "next/dynamic";
import Catalogue from "@/components/Catalogue";
import Terminal from "@/components/Terminal";
import TopStrip from "@/components/TopStrip";
import BottomStrip from "@/components/BottomStrip";
import ProjectsWindow from "@/components/ProjectsWindow";
import AboutWindow from "@/components/AboutWindow";
import ResumeWindow from "@/components/ResumeWindow";
import PhotosWindow from "@/components/PhotosWindow";
import BlogWindow from "@/components/BlogWindow";

const BlackHole = dynamic(() => import("@/components/BlackHole"), {
  ssr: false,
});

export default function Home() {
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  return (
    <main
      className="h-screen w-screen bg-black flex flex-col overflow-hidden relative font-mono"
      style={{
        border: "1px solid #00ff88",
        boxShadow: "0 0 0 4px #000, 0 0 0 5px #00ff88, 0 0 40px rgba(0,255,136,0.15)",
      }}
    >
      {/* Unicode corner characters */}
      <span className="absolute top-[3px] left-[3px] text-[#00ff88] text-xs leading-none z-50 pointer-events-none">╔</span>
      <span className="absolute top-[3px] right-[3px] text-[#00ff88] text-xs leading-none z-50 pointer-events-none">╗</span>
      <span className="absolute bottom-[3px] left-[3px] text-[#00ff88] text-xs leading-none z-50 pointer-events-none">╚</span>
      <span className="absolute bottom-[3px] right-[3px] text-[#00ff88] text-xs leading-none z-50 pointer-events-none">╝</span>

      {/* Scanline overlay */}
      <div className="crt-overlay" />

      {/* Top data strip */}
      <TopStrip />

      {/* Main panels container */}
      <div className="flex flex-grow overflow-hidden border-t border-[#00ff88] relative">
        {/* Animated Black Hole Background */}
        <BlackHole />

        <aside className="w-[30%] border-r border-[#00ff88] relative z-10 bg-transparent">
          <Catalogue onNavigate={setActiveWindow} />
        </aside>
        <section className="w-[70%] relative z-10 bg-transparent">
          <Terminal onNavigate={setActiveWindow} />
          {activeWindow === "projects" && (
            <ProjectsWindow onClose={() => setActiveWindow(null)} />
          )}
          {activeWindow === "about" && (
            <AboutWindow onClose={() => setActiveWindow(null)} />
          )}
          {activeWindow === "resume" && (
            <ResumeWindow onClose={() => setActiveWindow(null)} />
          )}
          {activeWindow === "photography" && (
            <PhotosWindow onClose={() => setActiveWindow(null)} />
          )}
          {activeWindow === "blog" && (
            <BlogWindow onClose={() => setActiveWindow(null)} />
          )}
        </section>
      </div>

      {/* Bottom data strip */}
      <BottomStrip />
    </main>
  );
}
