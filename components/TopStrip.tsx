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

  return (
    <div className="w-full h-8 flex items-center justify-between px-6 text-xs-data text-crt-green font-mono whitespace-nowrap overflow-hidden">
      <div className="flex items-center gap-4">
        <span>RUHAAN_OS v1.0</span>
        <span className="opacity-50">═══</span>
        <span>NODE:PUR-01</span>
        <span className="opacity-50">═══</span>
        <span>LAT:40.4259°N LON:86.9081°W</span>
        <span className="opacity-50">═══</span>
        <span>UPTIME:{formatUptime(uptime)}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="opacity-50 text-[8px]">══════════════════</span>
        <span>SIG:[██████░░░░]</span>
      </div>
    </div>
  );
}
