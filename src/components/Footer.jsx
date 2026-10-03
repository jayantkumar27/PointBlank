export default function Footer() {
  return (
    <>
      <footer className="w-full bg-[#0a0a0a] text-neutral-400 border-t-4 border-black px-4 py-8 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono-harsh text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="bg-[#ffdd00] text-black px-2 py-0.5 font-bold border border-black">POINTBLANK</span>
            <span>STRICT NEO-BRUTALISM ORAL COACH RUNTIME</span>
          </div>
          <div className="flex flex-wrap gap-2 text-white">
            <span className="bg-[#171717] px-2 py-1 border border-neutral-700">SHARP 0PX CORNERS</span>
            <span className="bg-[#d91b00] px-2 py-1 border border-black">NO SOFT SHADOWS</span>
            <span className="bg-[#0038ff] px-2 py-1 border border-black">SOLID HIGH CONTRAST</span>
          </div>
        </div>
      </footer>
      <div className="w-full h-4 hazard-stripe border-t-4 border-black"></div>
    </>
  );
}
