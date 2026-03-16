"use client";

import { useEffect, useRef, useState } from "react";

const DIVIDER = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";

const WELCOME = [
  DIVIDER,
  "// WELCOME TO RUHAAN_OS",
  "",
  "  This terminal is your interface to",
  "  navigate this portfolio. Use the",
  "  CATALOGUE on the left to browse",
  "  sections, or type commands below.",
  "",
  "// AVAILABLE COMMANDS",
  "",
  "  access [page]   — open a section",
  "  help            — show all commands",
  "  clear           — clear terminal",
  "  whoami          — about the operator",
  "  credits         — how this was built",
  "",
  DIVIDER,
  "  Built by Ruhaan Bhargav using Next.js",
  "  © 2026 RUHAAN_OS. All rights reserved.",
  DIVIDER,
];

const BOOT_LINES = [
  "RUHAAN_OS v1.0 — INITIALIZING...",
  DIVIDER,
  "__LOADING_BAR__",
  "KERNEL LOADED",
  "MOUNTING FILESYSTEMS... OK",
  "LOADING OPERATOR PROFILE...",
  DIVIDER,
  "OPERATOR: RUHAAN BHARGAV",
  "FIELD:    CS + MATHEMATICS",
  "NODE:     PURDUE UNIVERSITY — Y2",
  "CLEARANCE: GRANTED",
  DIVIDER,
  "SYSTEM READY.",
];

const COMMANDS: Record<string, string[]> = {
  help: [
    DIVIDER,
    "// AVAILABLE COMMANDS",
    "",
    "  access [page]   — open a section",
    "  help            — show all commands",
    "  clear           — clear terminal",
    "  whoami          — about the operator",
    "  credits         — how this was built",
    DIVIDER,
  ],
  whoami: [
    DIVIDER,
    "OPERATOR: RUHAAN BHARGAV",
    "FIELD:    CS + MATHEMATICS @ PURDUE",
    "YEAR:     SOPHOMORE (Y2)",
    "INTERESTS: QUANT FINANCE, PHYSICS,",
    "           CHESS, PHOTOGRAPHY",
    "STATUS:   AVAILABLE FOR OPPORTUNITIES",
    DIVIDER,
  ],
  credits: [
    DIVIDER,
    "// HOW THIS WAS BUILT",
    "",
    "  Built from scratch by Ruhaan Bhargav",
    "  Framework:  Next.js 15 (App Router)",
    "  Styling:    Tailwind CSS",
    "  Language:   TypeScript",
    "  Black hole: HTML5 Canvas API",
    "",
    "  AI-assisted development using",
    "  Claude (Anthropic) + Gemini CLI",
    "  for code generation & iteration.",
    "  All design decisions, direction,",
    "  and architecture by Ruhaan.",
    "",
    "  No templates. No themes.",
    "  Every pixel intentional.",
    "",
    "  github.com/RuhaanB6",
    DIVIDER,
  ],
};

const VALID_PAGES = ["about", "projects", "blog", "resume", "photos"];

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [booting, setBooting] = useState(true);
  const [loadingBar, setLoadingBar] = useState(0);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, loadingBar]);

  // Boot sequence
  useEffect(() => {
    let cancelled = false;
    const addLine = (line: string, delay: number) =>
      new Promise<void>((res) =>
        setTimeout(() => {
          if (!cancelled) setLines((prev) => [...prev, line]);
          res();
        }, delay)
      );

    const runBoot = async () => {
      let cursor = 0;
      for (let i = 0; i < BOOT_LINES.length; i++) {
        const line = BOOT_LINES[i];
        if (cancelled) return;
        if (line === "__LOADING_BAR__") {
          // Animate loading bar (middle ground: 30ms instead of 20ms or 40ms)
          await new Promise<void>((res) => {
            let filled = 0;
            const total = 20;
            setLines((prev) => [
              ...prev,
              `[░░░░░░░░░░░░░░░░░░░░] 0%`,
            ]);
            const interval = setInterval(() => {
              if (cancelled) { clearInterval(interval); res(); return; }
              filled++;
              const bar =
                "█".repeat(filled) + "░".repeat(total - filled);
              const pct = Math.round((filled / total) * 100);
              setLines((prev) => [
                ...prev.slice(0, -1),
                `[${bar}] ${pct}%`,
              ]);
              setLoadingBar(pct);
              if (filled === total) {
                clearInterval(interval);
                setTimeout(res, 150); // middle ground
              }
            }, 30);
          });
          cursor += 75; // middle ground
        } else {
          await addLine(line, cursor);
          // Keep first lines same, slightly slower rest (90ms instead of 60ms)
          if (line === "RUHAAN_OS v1.0 — INITIALIZING..." || (line === DIVIDER && i < 2)) {
            cursor = 120;
          } else {
            cursor = 90;
          }
        }
      }
      // Show welcome after boot (middle ground: 450ms instead of 300ms)
      setTimeout(() => {
        if (!cancelled) {
          setLines((prev) => [...prev, "", ...WELCOME]);
          setBooting(false);
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }, 450);
    };

    runBoot();
    return () => { cancelled = true; };
  }, []);

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const echo = `ruhaan@RUHAAN_OS:~$ ${raw}`;

    if (cmd === "clear") {
      setLines([...WELCOME]);
      return;
    }

    if (cmd === "help" || cmd === "whoami" || cmd === "credits") {
      setLines((prev) => [...prev, echo, ...COMMANDS[cmd]]);
      return;
    }

    if (cmd.startsWith("access ")) {
      const page = cmd.slice(7).trim();
      if (VALID_PAGES.includes(page)) {
        setLines((prev) => [
          ...prev,
          echo,
          `> ACCESSING ${page.toUpperCase()}...`,
          `  LOADING SECTION... OK`,
          `  [navigation to ${page} coming soon]`,
          "",
        ]);
      } else {
        setLines((prev) => [
          ...prev,
          echo,
          `> ERROR: unknown target "${page}"`,
          `  valid targets: ${VALID_PAGES.join(", ")}`,
          "",
        ]);
      }
      return;
    }

    setLines((prev) => [
      ...prev,
      echo,
      `> command not recognized: "${cmd}"`,
      `  type "help" for available commands`,
      "",
    ]);
  };

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <div className="p-4 pb-2">
        <h2 className="text-[#00ff88] font-mono text-sm tracking-wider opacity-80">
          // TERMINAL
        </h2>
      </div>

      {/* Output */}
      <div 
        className="flex-grow overflow-y-auto px-4 pb-2 font-mono text-base text-[#00ff88] leading-relaxed"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.trim().startsWith(">") || line.startsWith("  LOADING") || line.includes("[navigation to")
                ? "text-[#00aa55]"
                : "text-[#00ff88]"
            }
          >
            {line === "" ? <br /> : line}
          </div>
        ))}

        {/* Blinking cursor during boot */}
        {booting && (
          <span className="inline-block w-2 h-4 bg-[#00ff88] cursor-blink align-middle ml-1" />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!booting && (
        <div 
          className="px-4 py-3 border-t border-[#003322] flex items-center gap-2 font-mono text-base text-[#00ff88]"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          <span className="opacity-70 whitespace-nowrap">ruhaan@RUHAAN_OS:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(input);
                setInput("");
              }
            }}
            className="flex-1 bg-transparent outline-none border-none text-[#00ff88] caret-[#00ff88] font-mono text-base"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}
