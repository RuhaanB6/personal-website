"use client";

export default function Catalogue({ onNavigate }: { onNavigate: (page: string) => void }) {
  const items = ["about", "projects", "blog", "resume", "photos"];

  const navItemClass = "group cursor-pointer flex items-center gap-2 border-l-2 border-transparent hover:border-crt-green hover:pl-2 transition-all duration-150";

  return (
    <div className="flex flex-col h-full border-r border-crt-green p-4 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-crt-green font-mono text-sm tracking-wider opacity-80">
          // CATALOGUE
        </h2>
      </div>
      <nav className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item}
            className={navItemClass}
            onClick={() => onNavigate(item)}
          >
            <span className="text-crt-dim group-hover:text-crt-green transition-colors duration-150">
              {">"}
            </span>
            <span className="text-crt-dim group-hover:text-crt-green uppercase tracking-widest text-base transition-colors duration-150">
              {item}
            </span>
          </div>
        ))}
      </nav>

      {/* External Links Section */}
      <div className="mt-8 pt-8 border-t border-[#003322] flex flex-col gap-3">
        <a 
          href="https://github.com/RuhaanB6" 
          target="_blank" 
          rel="noopener noreferrer"
          className={navItemClass}
        >
          <span className="text-crt-dim group-hover:text-crt-green transition-colors duration-150">
            {">"}
          </span>
          <span className="text-crt-dim group-hover:text-crt-green uppercase tracking-widest text-base transition-colors duration-150">
            GITHUB ↗
          </span>
        </a>

        <a 
          href="https://www.linkedin.com/in/ruhaan-bhargav/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={navItemClass}
        >
          <span className="text-crt-dim group-hover:text-crt-green transition-colors duration-150">
            {">"}
          </span>
          <span className="text-crt-dim group-hover:text-crt-green uppercase tracking-widest text-base transition-colors duration-150">
            LINKEDIN ↗
          </span>
        </a>

        <a 
          href="https://www.instagram.com/ruhaan_bhargav/"
          target="_blank" 
          rel="noopener noreferrer"
          className={navItemClass}
        >
          <span className="text-crt-dim group-hover:text-crt-green transition-colors duration-150">
            {">"}
          </span>
          <span className="text-crt-dim group-hover:text-crt-green uppercase tracking-widest text-base transition-colors duration-150">
            INSTAGRAM ↗
          </span>
        </a>
      </div>

      {/* Operator & Interests Section */}
      <div className="mt-8 pt-8 border-t border-[#003322]">
        <div className="mb-6">
          <h2 className="text-crt-green font-mono text-sm tracking-wider opacity-80 mb-2">
            // OPERATOR
          </h2>
          <div className="text-crt-green uppercase tracking-widest text-base leading-relaxed">
            <p>RUHAAN BHARGAV</p>
            <p>CS + MATHEMATICS</p>
            <p>PURDUE UNIVERSITY — Y2</p>
          </div>
        </div>

        <div>
          <h2 className="text-crt-green font-mono text-sm tracking-wider opacity-80 mb-2">
            INTERESTS:
          </h2>
          <div className="text-crt-green uppercase tracking-widest text-base leading-relaxed flex flex-col gap-0.5">
            {["> QUANT FINANCE", "> PHYSICS", "> CHESS", "> PHOTOGRAPHY", "> READING"].map((interest) => (
              <p key={interest}>{interest}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-[#003322]" />
      </div>
      );
      }