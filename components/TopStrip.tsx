"use client";

import { useEffect, useState } from "react";

export default function TopStrip() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(3, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const textShadowStyle = { textShadow: "2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 8px rgba(0,255,136,0.5)" };

  return (
    <div 
      className="w-full h-8 flex items-center justify-between px-6 text-xs-data text-crt-green font-mono whitespace-nowrap overflow-hidden"
      style={textShadowStyle}
    >
      <div className="flex items-center gap-4">
        <span>RUHAAN_OS v1.0</span>
        <span className="opacity-50 hidden md:inline">═══</span>
        <span className="hidden md:inline">NODE:PUR-01</span>
        <span className="opacity-50 hidden md:inline">═══</span>
        <span className="hidden md:inline">LAT:40.4259°N LON:86.9081°W</span>
        <span className="opacity-50">═══</span>
        <span>UPTIME:{formatUptime(uptime)}</span>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <span className="opacity-50 text-[8px]">══════════════════</span>
        <span>SIG:[██████░░░░]</span>
      </div>
    </div>
  );
}
