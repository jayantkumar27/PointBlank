export default function PrepFramework() {
  return (
    <section className="border-brutal-6 bg-[#0a0a0a] text-white p-6 sm:p-10 md:p-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b-4 border-neutral-800">
        <div>
          <span className="bg-[#ffdd00] text-black px-3 py-1 font-bold text-xs uppercase border-2 border-black inline-block mb-2">FOUNDATIONAL DOCTRINE</span>
          <h2 className="font-serif-heavy text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            THE PRINCIPLE: PREP
          </h2>
        </div>
        <div className="text-right font-mono-harsh text-xs sm:text-sm text-[#ffdd00]">
          COGNITIVE REDUCTION PROTOCOL<br />
          FORCE UNYIELDING CLARITY
        </div>
      </div>

      <div className="bg-[#ffdd00] text-black p-4 sm:p-6 border-brutal-4 mb-8 font-mono-harsh text-base sm:text-lg font-bold">
        The PREP Framework strips verbal self-indulgence. By binding your statements into four unbending slots, you eliminate cognitive overload, banish rambling loops, and force structural clarity into every spoken paragraph.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* P: Point */}
        <div className="bg-[#f5f5f0] text-black border-brutal-4 p-6">
          <div className="flex items-start justify-between mb-3 border-b-2 border-black pb-2">
            <span className="text-4xl font-serif-heavy text-black font-black">01 // P</span>
            <span className="bg-[#d91b00] text-white text-xs px-2 py-1 font-bold uppercase border border-black">IMMEDIATE THESIS</span>
          </div>
          <h3 className="font-serif-heavy text-2xl uppercase mb-2">POINT</h3>
          <p className="font-mono-harsh text-sm sm:text-base text-neutral-800 leading-snug">
            State the bottom line in your very first breath. No background warmups, no defensive prologues, and no historical context before the claim is made.
          </p>
        </div>

        {/* R: Reason */}
        <div className="bg-[#f5f5f0] text-black border-brutal-4 p-6">
          <div className="flex items-start justify-between mb-3 border-b-2 border-black pb-2">
            <span className="text-4xl font-serif-heavy text-black font-black">02 // R</span>
            <span className="bg-[#0038ff] text-white text-xs px-2 py-1 font-bold uppercase border border-black">LOGICAL DEFENSE</span>
          </div>
          <h3 className="font-serif-heavy text-2xl uppercase mb-2">REASON</h3>
          <p className="font-mono-harsh text-sm sm:text-base text-neutral-800 leading-snug">
            Give the solitary, decisive argument supporting your point. If you need five reasons, you have none. Deliver the single root cause immediately.
          </p>
        </div>

        {/* E: Example */}
        <div className="bg-[#f5f5f0] text-black border-brutal-4 p-6">
          <div className="flex items-start justify-between mb-3 border-b-2 border-black pb-2">
            <span className="text-4xl font-serif-heavy text-black font-black">03 // E</span>
            <span className="bg-[#ffdd00] text-black text-xs px-2 py-1 font-bold uppercase border border-black">GROUNDED EVIDENCE</span>
          </div>
          <h3 className="font-serif-heavy text-2xl uppercase mb-2">EXAMPLE</h3>
          <p className="font-mono-harsh text-sm sm:text-base text-neutral-800 leading-snug">
            Provide a concrete metric, tangible incident, or verified instance. Vague metaphors are flagged as cognitive drift by the evaluation engine.
          </p>
        </div>

        {/* P: Point */}
        <div className="bg-[#f5f5f0] text-black border-brutal-4 p-6">
          <div className="flex items-start justify-between mb-3 border-b-2 border-black pb-2">
            <span className="text-4xl font-serif-heavy text-black font-black">04 // P</span>
            <span className="bg-[#0a0a0a] text-[#ffdd00] text-xs px-2 py-1 font-bold uppercase border border-black">TERMINAL LOCK</span>
          </div>
          <h3 className="font-serif-heavy text-2xl uppercase mb-2">POINT</h3>
          <p className="font-mono-harsh text-sm sm:text-base text-neutral-800 leading-snug">
            Restate your core point verbatim. Conclude cleanly. Do not trail off with awkward disclaimers like "so yeah, that is basically it."
          </p>
        </div>
      </div>
    </section>
  );
}
