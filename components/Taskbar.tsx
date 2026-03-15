"use client";

import { useEffect, useState } from "react";

export default function Taskbar() {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setDate(now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short"
    }).toUpperCase());
  }, []);

  return (
    <footer className="h-8 border-t border-crt-green flex items-center justify-between px-4 text-[10px] tracking-[0.2em] font-mono text-crt-green bg-black/50">
      <div className="flex-1">RUHAAN_OS</div>
      <div className="flex-1 text-center opacity-70">{date || "LOADING..."}</div>
      <div className="flex-1 flex justify-end items-center gap-2">
        <span className="opacity-70">STATUS: OK</span>
        <div className="w-2 h-2 rounded-full bg-crt-green dot-pulse shadow-[0_0_8px_#00ff88]"></div>
      </div>
    </footer>
  );
}
