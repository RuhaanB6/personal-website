export default function Terminal() {
  return (
    <div className="flex flex-col h-full p-4 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-crt-green font-mono text-sm tracking-wider opacity-80">
          // TERMINAL
        </h2>
      </div>
      <div className="flex-grow font-mono text-crt-green">
        <div className="inline-block w-3 h-5 bg-crt-green cursor-blink"></div>
      </div>
    </div>
  );
}
