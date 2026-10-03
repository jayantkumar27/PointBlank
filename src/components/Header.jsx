export default function Header() {
  return (
    <>
      <div className="w-full h-4 hazard-stripe border-b-4 border-black"></div>
      <header className="w-full bg-[#0a0a0a] text-[#ffdd00] border-b-4 border-black px-4 py-3 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="bg-[#0038ff] text-white px-3 py-1 text-xl sm:text-2xl font-bold tracking-widest border-2 border-black font-mono-harsh">POINTBLANK</span>
            <span className="text-xs sm:text-sm tracking-wider uppercase text-neutral-300 hidden md:inline">SYSTEM ARCHITECTURE // DIRECT ORAL AUDIT</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#d91b00] text-white px-3 py-1 text-xs sm:text-sm font-bold border-2 border-black uppercase tracking-wider">STATUS: ACTIVE</span>
            <span className="bg-[#ffdd00] text-black px-3 py-1 text-xs sm:text-sm font-bold border-2 border-black uppercase tracking-wider">VERSION 2.4</span>
          </div>
        </div>
      </header>
    </>
  );
}
