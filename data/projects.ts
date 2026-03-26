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
      "I'm currently building a high-performance matching engine that can process over 10,000 orders per second. I've been benchmarking different data structures, like heaps and sorted lists, to optimize throughput as much as possible. Right now, I'm implementing multivariate Hawkes processes to model self-exciting order flow and capture realistic market volatility. I'm also wiring it up to the Alpaca API to test everything against live SPY data.",
    year: "2025",
    tags: ["Python", "Alpaca API", "NumPy", "Hawkes Process"],
    image: "/projects/work-in-progress.png",
    github: "https://github.com/RuhaanB6/Market_Book_Simulator-Hawkes",
    live: "",
    private: false,
    still_working: true,
  },
  {
    id: "lead-lag",
    name: "LEAD-LAG PAIRS TRADING",
    tagline: "Statistical arbitrage strategy on large-cap tech equities",
    description:
      "I investigated time-lagged correlations between tech leaders like NVDA and mid-cap laggers using three years of price data. I built a pipeline to compute Pearson correlations across various lag windows to see how quickly one stock follows another. Based on that, I designed a strategy that enters positions in lagging stocks when the leaders move, focusing on maximizing returns while accounting for correlation decay.",
    year: "2026",
    tags: ["Python", "pandas", "scipy", "yfinance", "seaborn"],
    image: "/projects/lead-lag-demo.png",
    github: "https://github.com/RuhaanB6/lead-lags-pairs-trading-strategy",
    live: "",
    private: false,
    still_working: false,
  },
  {
    id: "ticketing",
    name: "PURDUE GRAND PRIX TICKETING",
    tagline: "Full-stack ticketing system for a 3,000-attendee event",
    description:
      "I'm currently developing a full-stack ticketing platform for the Purdue Grand Prix, an event with about 3,000 attendees. It's a major upgrade from their old manual processes. I've already built a normalized SQLite backend and a secure auth layer with cryptographic hashing, and right now I'm focused on finalizing the QR-based check-in system and custom ID generation.",
    year: "2025",
    tags: ["Python", "SQLite", "Flask", "QR", "Cryptography", "Unit Testing"],
    image: "/projects/ticketing-demo.png",
    github: "https://github.com/hub-ry/ticketing",
    live: "",
    private: true,
    still_working: true,
  },
  {
    id: "ruhaan-os",
    name: "RUHAAN_OS",
    tagline: "This portfolio — a personal OS built from scratch",
    description:
      "I designed this portfolio as a retro-futurist terminal OS. I built it from scratch without templates, including the black hole background which I rendered using the Canvas API. I used AI assistance during the development process (you can find more about that by running the `credits` command), but all the architectural and design decisions are my own.",
    year: "2026",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API"],
    image: "/projects/ruhaan-os-demo.png",
    github: "https://github.com/RuhaanB6/personal-website",
    live: "https://ruhaan.dev",
    private: false,
    still_working: true,
  },
  {
    id: "gitstagram",
    name: "GITSTAGRAM",
    tagline: "A full-stack social media platform built from scratch in Java",
    description:
      "Working in a team of four, we built a fully functional Instagram clone in Java. It features a custom file-based database and a multithreaded client-server architecture using raw sockets. Dealing with thread-safe blocks to prevent race conditions was a steep learning curve, but it was satisfying to see the project grow from a basic terminal app into a full Java Swing GUI.",
    year: "2024",
    tags: ["Java", "Sockets", "Multithreading", "JUnit", "Swing", "MVC"],
    image: "/projects/gitstagram-demo.png",
    github: "https://github.com/RuhaanB6/CS180_TeamProject",
    live: "",
    private: true,
    still_working: false,
  },
];