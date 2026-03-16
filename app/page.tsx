import Catalogue from "@/components/Catalogue";
import Terminal from "@/components/Terminal";
import TopStrip from "@/components/TopStrip";
import BottomStrip from "@/components/BottomStrip";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-black overflow-hidden select-none relative flex flex-col p-2">
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay" />

      {/* Outer Data Terminal Frame */}
      <div className="flex-grow flex flex-col border border-crt-green screen-glow relative m-1">
        
        {/* Unicode Corner Brackets */}
        <div className="absolute -top-[11px] -left-[1px] text-crt-green text-xl leading-none z-10">╔</div>
        <div className="absolute -top-[11px] -right-[1px] text-crt-green text-xl leading-none z-10">╗</div>
        <div className="absolute -bottom-[11px] -left-[1px] text-crt-green text-xl leading-none z-10">╚</div>
        <div className="absolute -bottom-[11px] -right-[1px] text-crt-green text-xl leading-none z-10">╝</div>

        {/* Measurement Ticks (┤ ├) */}
        <div className="absolute top-1/4 -left-[6px] text-crt-green text-[10px]">├</div>
        <div className="absolute top-1/2 -left-[6px] text-crt-green text-[10px]">├</div>
        <div className="absolute top-3/4 -left-[6px] text-crt-green text-[10px]">├</div>
        <div className="absolute top-1/4 -right-[6px] text-crt-green text-[10px]">┤</div>
        <div className="absolute top-1/2 -right-[6px] text-crt-green text-[10px]">┤</div>
        <div className="absolute top-3/4 -right-[6px] text-crt-green text-[10px]">┤</div>

        {/* Top Data Strip */}
        <TopStrip />
        
        {/* Top Divider */}
        <div className="w-full h-[1px] bg-crt-green opacity-50 flex overflow-hidden">
          {Array.from({ length: 200 }).map((_, i) => (
            <span key={i} className="text-[10px] leading-[1px]">═</span>
          ))}
        </div>

        {/* Main Interface Content */}
        <div className="flex-grow flex w-full overflow-hidden">
          {/* Left Panel */}
          <aside className="w-[30%] h-full">
            <Catalogue />
          </aside>

          {/* Right Panel */}
          <section className="w-[70%] h-full">
            <Terminal />
          </section>
        </div>

        {/* Bottom Divider */}
        <div className="w-full h-[1px] bg-crt-green opacity-50 flex overflow-hidden">
          {Array.from({ length: 200 }).map((_, i) => (
            <span key={i} className="text-[10px] leading-[1px]">═</span>
          ))}
        </div>

        {/* Bottom Data Strip */}
        <BottomStrip />
      </div>

      {/* Edge Tick Marks */}
      <div className="absolute top-0 left-1/4 w-[1px] h-2 bg-crt-green" />
      <div className="absolute top-0 left-1/2 w-[1px] h-2 bg-crt-green" />
      <div className="absolute top-0 left-3/4 w-[1px] h-2 bg-crt-green" />
      <div className="absolute bottom-0 left-1/4 w-[1px] h-2 bg-crt-green" />
      <div className="absolute bottom-0 left-1/2 w-[1px] h-2 bg-crt-green" />
      <div className="absolute bottom-0 left-3/4 w-[1px] h-2 bg-crt-green" />
    </main>
  );
}
