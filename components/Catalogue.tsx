export default function Catalogue() {
  const items = ["about", "projects", "blog", "resume", "photos"];

  return (
    <div className="flex flex-col h-full border-r border-crt-green p-4 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-crt-green font-mono text-sm tracking-wider opacity-80">
          // CATALOGUE
        </h2>
      </div>
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item}
            className="group cursor-pointer flex items-center gap-2"
          >
            <span className="text-crt-dim group-hover:text-crt-green transition-colors duration-150">
              {">"}
            </span>
            <span className="text-crt-dim group-hover:text-crt-green uppercase tracking-widest text-sm transition-colors duration-150">
              {item}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
}
