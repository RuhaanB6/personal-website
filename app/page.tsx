import Catalogue from "@/components/Catalogue";
import Terminal from "@/components/Terminal";
import TopStrip from "@/components/TopStrip";
import BottomStrip from "@/components/BottomStrip";

export default function Home() {
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

      {/* Main panels */}
      <div className="flex flex-grow overflow-hidden border-t border-[#00ff88]">
        <aside className="w-[30%] border-r border-[#00ff88]">
          <Catalogue />
        </aside>
        <section className="w-[70%]">
          <Terminal />
        </section>
      </div>

      {/* Bottom data strip */}
      <BottomStrip />
    </main>
  );
}