import Catalogue from "@/components/Catalogue";
import Terminal from "@/components/Terminal";
import TopStrip from "@/components/TopStrip";
import BottomStrip from "@/components/BottomStrip";

// Helper to create horizontal borders with ticks
const createHorizontalBorder = (length: number, tickChar: string) => {
  let border = "";
  for (let i = 0; i < length; i++) {
    border += (i > 0 && i % 15 === 0) ? tickChar : "═";
  }
  return border;
};

// Helper to create vertical borders with ticks
const createVerticalBorder = (length: number, tickChar: string) => {
  return Array.from({ length }, (_, i) => (i > 0 && i % 8 === 0) ? tickChar : "║");
};

export default function Home() {
  const horizontalBorderTop = createHorizontalBorder(400, "╤"); // Increased to 400
  const horizontalBorderBottom = createHorizontalBorder(400, "╧"); // Increased to 400
  const verticalBorderLeft = createVerticalBorder(100, "╠"); // Increased to 100
  const verticalBorderRight = createVerticalBorder(100, "╣"); // Increased to 100

  return (
    <main className="h-screen w-screen bg-black overflow-hidden select-none flex flex-col text-[#00ff88] font-mono leading-none">
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay" />

      {/* Top Border Row */}
      <div className="flex w-full whitespace-nowrap overflow-hidden">
        <span>╔</span>
        <div className="flex-grow overflow-hidden">{horizontalBorderTop}</div>
        <span>╗</span>
      </div>

      {/* Middle Section (Body) */}
      <div className="flex-grow flex w-full overflow-hidden">
        {/* Left Vertical Border */}
        <div className="flex flex-col h-full overflow-hidden">
          {verticalBorderLeft.map((char, i) => (
            <span key={i} className="leading-none block h-[1em]">{char}</span>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col h-full overflow-hidden relative">
          
          {/* Top Data Strip */}
          <TopStrip />
          
          {/* Divider */}
          <div className="w-full h-[1px] bg-crt-green opacity-50 flex overflow-hidden whitespace-nowrap">
            {Array.from({ length: 200 }).map((_, i) => (
              <span key={i} className="text-[10px] leading-[1px]">═</span>
            ))}
          </div>

          {/* Main Interface Split */}
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

          {/* Divider */}
          <div className="w-full h-[1px] bg-crt-green opacity-50 flex overflow-hidden whitespace-nowrap">
            {Array.from({ length: 200 }).map((_, i) => (
              <span key={i} className="text-[10px] leading-[1px]">═</span>
            ))}
          </div>

          {/* Bottom Data Strip */}
          <BottomStrip />
        </div>

        {/* Right Vertical Border */}
        <div className="flex flex-col h-full overflow-hidden">
           {verticalBorderRight.map((char, i) => (
            <span key={i} className="leading-none block h-[1em]">{char}</span>
          ))}
        </div>
      </div>

      {/* Bottom Border Row */}
      <div className="flex w-full whitespace-nowrap overflow-hidden">
        <span>╚</span>
        <div className="flex-grow overflow-hidden">{horizontalBorderBottom}</div>
        <span>╝</span>
      </div>
    </main>
  );
}
