export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  year: string;
  tags: string[];
  image: string;
  github: string;
  live: string;
  private: boolean;
  still_working: boolean;
}

export const projects: Project[] = [
  {
    id: "order-book",
    name: "ORDER BOOK MATCHING ENGINE",
    tagline: "Low-latency order book simulator for equity markets",
    description:
      "Building a high-performance order book simulator processing 10,000+ orders/second with price-time priority matching. Benchmarks heap, sorted list, and deque-based priority queue implementations for throughput optimization. Implements multivariate Hawkes processes to model self-exciting order flow — capturing realistic clustering and volatility dynamics observed in live equity markets. Integrated with Alpaca API for real-time SPY data ingestion to validate simulator accuracy against live conditions.",
    year: "2025",
    tags: ["Python", "Alpaca API", "NumPy", "Hawkes Process"],
    image: "/projects/work-in-progress.png",
    github: "https://github.com/RuhaanB6/Market_Book_Simulator-Hawkes",
    live: "",
    private: false,
    still_working: true,
  },
    {
    id: "ticketing",
    name: "PURDUE GRAND PRIX TICKETING",
    tagline: "Full-stack ticketing system for a 3,000-attendee event",
    description:
      "Working on a Full-stack ticketing platform built for the Purdue Grand Prix — a 3,000-attendee event. Features a normalized SQLite backend, QR code generation for contactless entry, and a secure authentication layer using cryptographic hashing and custom ID generation. Architected for extensibility with planned Stripe payment integration and API-based database scaling. Replacing entirely manual check-in processes.",
    year: "2025",
    tags: ["Python", "SQLite", "Flask", "QR", "Cryptography", "Unit Testing"],
    image: "/projects/ticketing-demo.png",
    github: "https://github.com/hub-ry/ticketing",
    live: "",
    private: true,
    still_working: true,
  },
  {
    id: "lead-lag",
    name: "LEAD-LAG PAIRS TRADING",
    tagline: "Statistical arbitrage strategy on large-cap tech equities",
    description:
      "Investigated time-lagged correlations between large-cap tech leaders (AAPL, MSFT, NVDA) and mid-cap laggers (AMD, INTC, MU) using 3 years of daily price data. Built a statistical pipeline computing Pearson correlations with p-value significance testing across all 9 pairs at lag windows of 1-7 days. Designed a trading strategy that enters positions in lagging stocks upon leader movement, analyzing optimal lag periods and correlation decay to maximize risk-adjusted returns.",
    year: "2026",
    tags: ["Python", "pandas", "scipy", "yfinance", "seaborn"],
    image: "/projects/lead-lag-demo.png",
    github: "https://github.com/RuhaanB6/lead-lags-pairs-trading-strategy",
    live: "",
    private: false,
    still_working: false,
  },
  {
    id: "ruhaan-os",
    name: "RUHAAN_OS",
    tagline: "This portfolio — a personal OS built from scratch",
    description:
      "A personal portfolio designed as a retro-futurist terminal OS. Built entirely from scratch — no templates, no themes. Features an animated black hole rendered purely in HTML5 Canvas API with physically-accurate accretion disk layering, a functional command-line interface with a boot sequence, and a data-panel aesthetic inspired by scientific instrument displays. AI-assisted development using Claude and Gemini CLI, with all design decisions and architecture by Ruhaan.",
    year: "2026",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API"],
    image: "/projects/ruhaan-os-demo.png",
    github: "https://github.com/RuhaanB6/personal-website",
    live: "https://personal-website-three-rosy-41.vercel.app",
    private: false,
    still_working: true,
  },
  {
    id: "gitstagram",
    name: "GITSTAGRAM",
    tagline: "A full-stack social media platform built from scratch in Java",
    description:
      "A fully functional Instagram clone built as a team of 4 for CS180 at Purdue. Features user creation, post management, comments, likes/dislikes, following, and blocking — all persisted via a custom file-based database system. Built on a client-server architecture with socket communication over localhost:8080, supporting multiple concurrent clients via multithreading and synchronized thread-safe blocks to prevent race conditions. Phase 3 added a complete Java Swing GUI client on top of the terminal interface.",
    year: "2024",
    tags: ["Java", "Sockets", "Multithreading", "JUnit", "Swing", "MVC"],
    image: "/projects/gitstagram-demo.png",
    github: "https://github.com/RuhaanB6/CS180_TeamProject",
    live: "",
    private: true,
    still_working: false,
  },
];