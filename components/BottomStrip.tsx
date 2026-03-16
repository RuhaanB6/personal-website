"use client";

import { useEffect, useState } from "react";

export default function BottomStrip() {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      setDate(now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short"
      }).toUpperCase());
    };
    updateDate();
    const timer = setInterval(updateDate, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-8 flex items-center justify-between px-6 text-xs-data text-crt-green font-mono whitespace-nowrap overflow-hidden">
      <div className="flex items-center gap-6">
        <span>V:1.0.0</span>
        <span className="opacity-50">══</span>
        <span>CS+MATH@PURDUE</span>
        <span className="opacity-50">══</span>
        <span>[SECURE_CONN]</span>
      </div>
      <div className="flex items-center gap-6">
        <span>{date || "LOADING..." }</span>
        <span className="opacity-50">══</span>
        <div className="flex items-center gap-2">
          <span>STATUS:OK</span>
          <div className="w-2 h-2 rounded-full bg-crt-green dot-pulse shadow-[0_0_8px_#00ff88]"></div>
        </div>
      </div>
    </div>
  );
}
