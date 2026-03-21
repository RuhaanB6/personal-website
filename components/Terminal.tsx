"use client";

import { useEffect, useRef, useState } from "react";

const DIVIDER = "────────────────────────────────────";

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
  "  access [page]  — open a section",
  "  help           — show all commands",
  "  clear          — clear terminal",
  "  whoami         — about the operator",
  "  credits        — how this was built",
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
  "OPERATOR:  RUHAAN BHARGAV",
  "FIELD:     CS + MATHEMATICS",
  "NODE:      PURDUE UNIVERSITY — Y2",
  "CLEARANCE: GRANTED",
  DIVIDER,
  "SYSTEM READY.",
];

const COMMANDS: Record<string, string[]> = {
  help: [
    DIVIDER,
    "// AVAILABLE COMMANDS",
    "",
    "  access [page]  — open a section",
    "  help           — show all commands",
    "  clear          — clear terminal",
    "  whoami         — about the operator",
    "  credits        — how this was built",
    DIVIDER,
  ],
  whoami: [
    DIVIDER,
    "OPERATOR:  RUHAAN BHARGAV",
    "FIELD:     CS + MATHEMATICS @ PURDUE",
    "YEAR:      SOPHOMORE (Y2)",
    "INTERESTS: QUANT FINANCE, PHYSICS,",
    "           CHESS, PHOTOGRAPHY",
    "STATUS:    AVAILABLE FOR OPPORTUNITIES",
    DIVIDER,
  ],
  credits: [
    DIVIDER,
    "// HOW THIS WAS BUILT",
    "",
    "  Built from scratch by Ruhaan Bhargav",
    "  Framework:   Next.js 15 (App Router)",
    "  Deployment:  Vercel",
    "  Styling:     Tailwind CSS",
    "  Language:    TypeScript",
    "  Black hole:  HTML5 Canvas API",
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

const VALID_PAGES = ["about", "projects", "blog", "resume", "photography"];

export default function Terminal({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [booting, setBooting] = useState(true);
  const [loadingBar, setLoadingBar] = useState(0);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, loadingBar]);

  // Handle focus and return from other windows
  useEffect(() => {
    const focusInput = () => {
      if (!booting) inputRef.current?.focus();
    };

    // Focus on window focus
    window.addEventListener("focus", focusInput);

    // Focus when user starts typing anywhere (if not already focused on an input)
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (booting) return;
      if (
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        e.key.length === 1
      ) {
        focusInput();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);

    // Watch for when other windows (About/Projects) are closed
    // This works by observing when siblings are removed from the parent section
    const observer = new MutationObserver((mutations) => {
      const modalRemoved = mutations.some((m) => m.removedNodes.length > 0);
      if (modalRemoved) {
        // Short delay to ensure DOM is updated and focus isn't trapped
        setTimeout(focusInput, 50);
      }
    });

    if (terminalRef.current?.parentElement) {
      observer.observe(terminalRef.current.parentElement, { childList: true });
    }

    // Initial focus after boot finish
    if (!booting) focusInput();

    return () => {
      window.removeEventListener("focus", focusInput);
      window.removeEventListener("keydown", handleGlobalKeyDown);
      observer.disconnect();
    };
  }, [booting]);

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
          // Animate loading bar (finer middle ground: 35ms)
          await new Promise<void>((res) => {
            let filled = 0;
            const total = 15;
            setLines((prev) => [
              ...prev,
              `[░░░░░░░░░░░░░░░] 0%`,
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
                setTimeout(res, 180); // finer middle ground
              }
            }, 45);
          });
          cursor += 90; // finer middle ground
        } else {
          await addLine(line, cursor);
          // Keep first lines same, slightly slower rest (95ms instead of 90ms)
          if (line === "RUHAAN_OS v1.0 — INITIALIZING..." || (line === DIVIDER && i < 2)) {
            cursor = 120;
          } else {
            cursor = 95;
          }
        }
      }
      // Show welcome after boot (finer middle ground: 530ms)
      setTimeout(() => {
        if (!cancelled) {
          setLines((prev) => [...prev, "", ...WELCOME]);
          setBooting(false);
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }, 530);
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
          "",
        ]);
        onNavigate(page);
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
      ref={terminalRef}
      className="flex flex-col h-full overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <div className="p-4 pb-2">
        <h2 className="text-[#00ff88] font-mono text-xs sm:text-sm tracking-wider opacity-80">
          // TERMINAL
        </h2>
      </div>

      {/* Output */}
      <div 
        className="flex-grow overflow-y-auto px-4 pb-2 font-mono text-sm sm:text-base text-[#00ff88] leading-relaxed custom-scrollbar overflow-x-hidden"
        style={{ 
          textShadow: "2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 8px rgba(0,255,136,0.6)",
          color: "#05ffa1" 
        }}
      >
        {lines.map((line, i) => {
          const isGitHub = line.includes("github.com/RuhaanB6");
          const isCommandOutput = line.trim().startsWith(">") || 
                                  line.startsWith("  LOADING");
          
          return (
            <div
              key={i}
              className={`${isCommandOutput ? "text-[#00cc66]" : "text-[#05ffa1]"} break-words whitespace-pre-wrap`}
              style={{ textShadow: "2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 8px rgba(0,255,136,0.5)" }}
            >
              {line === "" ? (
                <br />
              ) : isGitHub ? (
                <span>
                  {line.split("github.com/RuhaanB6")[0]}
                  <a 
                    href="https://github.com/RuhaanB6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline decoration-[#00ff88] underline-offset-4 cursor-pointer"
                  >
                    github.com/RuhaanB6
                  </a>
                  {line.split("github.com/RuhaanB6")[1]}
                </span>
              ) : (
                line
              )}
            </div>
          );
        })}

        {/* Blinking cursor during boot */}
        {booting && (
          <span className="inline-block w-2 h-4 bg-[#05ffa1] cursor-blink align-middle ml-1 shadow-[0_0_10px_#00ff88]" />
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!booting && (
        <div 
          className="px-4 py-3 border-t border-[#003322] flex items-center gap-2 font-mono text-sm sm:text-base text-[#05ffa1]"
          style={{ textShadow: "2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 8px rgba(0,255,136,0.5)" }}
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
            className="flex-1 bg-transparent outline-none border-none text-[#05ffa1] caret-[#05ffa1] font-mono text-sm sm:text-base"
            autoComplete="off"
            spellCheck={false}
            style={{ textShadow: "2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 8px rgba(0,255,136,0.5)" }}
          />
        </div>
      )}
    </div>
  );
}
