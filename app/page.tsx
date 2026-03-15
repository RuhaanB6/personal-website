import Catalogue from "@/components/Catalogue";
import Terminal from "@/components/Terminal";
import Taskbar from "@/components/Taskbar";

export default function Home() {
  return (
    <main className="-screen w-full flex items-center justify-center p-4 bg-black overflow-hidden select-none">
      {/* CRT Monitor Bezel */}
      <div className="relative w-full h-full max-w-[1400px] max-h-[850px] aspect-video bg-[#1a1a1a] rounded-[2rem] p-6 shadow-[0_0_100px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,0.9)] flex items-center justify-center border-t-2 border-white/5 border-l-2">
        
        {/* Screen Area */}
        <div className="relative w-full h-full bg-black rounded-xl overflow-hidden screen-glow border-[12px] border-[#121212] shadow-[inset_0_0_40px_rgba(0,255,136,0.1)] flex flex-col">
          
          {/* Scanline Overlay */}
          <div className="crt-overlay" />

          {/* Main Layout Grid */}
          <div className="flex flex-grow w-full overflow-hidden">
            {/* Left Panel: Catalogue */}
            <aside className="w-[30%] h-full">
              <Catalogue />
            </aside>

            {/* Right Panel: Terminal */}
            <section className="w-[70%] h-full">
              <Terminal />
            </section>
          </div>

          {/* Bottom Taskbar */}
          <Taskbar />
        </div>

        {/* Subtle bezel details */}
        <div className="absolute bottom-1 right-20 flex gap-4 opacity-20">
          <div className="w-2 h-2 rounded-full bg-black" />
          <div className="w-2 h-2 rounded-full bg-black" />
          <div className="w-2 h-2 rounded-full bg-black shadow-[inset_0_0_2px_white]" />
        </div>
      </div>
    </main>
  );
}
