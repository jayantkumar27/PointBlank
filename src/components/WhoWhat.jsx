export default function WhoWhat() {
  return (
    <section id="who-what" className="space-y-6">
      <div className="border-brutal-4 bg-[#0a0a0a] text-[#ffdd00] px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-bold tracking-widest uppercase">AUDIT TARGETS &amp; CORE MECHANISM</span>
        <span className="text-xs text-neutral-400 uppercase">SECTION 02</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WHO IS IT FOR */}
        <div className="border-brutal-6 bg-[#f5f5f0] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="bg-[#d91b00] text-white inline-block px-3 py-1 font-bold text-xs uppercase mb-4 border-2 border-black">
              DESIGNATED AUDIENCE
            </div>
            <h2 className="font-serif-heavy text-3xl sm:text-4xl text-black uppercase mb-6 leading-none">
              WHO IS IT FOR
            </h2>
            <div className="space-y-4 font-mono-harsh text-base sm:text-lg text-black leading-snug">
              <p className="border-b-2 border-black pb-3">
                <span className="font-bold text-black bg-[#ffdd00] px-1 mr-2">GROUP 01</span>
                Developers explaining complex technical architectures during high-stakes design reviews.
              </p>
              <p className="border-b-2 border-black pb-3">
                <span className="font-bold text-black bg-[#ffdd00] px-1 mr-2">GROUP 02</span>
                Non-native English speakers fighting hesitation, grammatical doubt, or vocabulary fatigue in executive meetings.
              </p>
              <p className="pb-1">
                <span className="font-bold text-black bg-[#ffdd00] px-1 mr-2">GROUP 03</span>
                Anyone who freezes, loops, qualifiers-stack, or rambles under acute social and professional pressure.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t-4 border-black bg-[#0a0a0a] text-white p-3 text-xs uppercase tracking-wider">
            REQUIREMENT: WILLINGNESS TO HEAR UNFILTERED DIAGNOSTICS.
          </div>
        </div>

        {/* WHAT IT DOES */}
        <div className="border-brutal-6 bg-[#171717] text-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="bg-[#0038ff] text-white inline-block px-3 py-1 font-bold text-xs uppercase mb-4 border-2 border-black">
              EXECUTION ENGINE
            </div>
            <h2 className="font-serif-heavy text-3xl sm:text-4xl text-[#ffdd00] uppercase mb-6 leading-none">
              WHAT IT DOES
            </h2>
            <div className="space-y-4 font-mono-harsh text-base sm:text-lg text-neutral-200 leading-snug">
              <p className="border-b-2 border-neutral-700 pb-3">
                <span className="text-[#ffdd00] font-bold">1. REAL-TIME ACOUSTIC INTAKE:</span>
                PointBlank opens a raw audio stream through your system microphone. No cloud storage; direct packet ingestion.
              </p>
              <p className="border-b-2 border-neutral-700 pb-3">
                <span className="text-[#ffdd00] font-bold">2. LOGICAL STRUCTURE EXTRACTION:</span>
                The evaluator does not care about pleasant tonality. It maps your syntax, argument nodes, thesis defense, and conclusion vectors.
              </p>
              <p className="pb-1">
                <span className="text-[#ffdd00] font-bold">3. INSTANT AUDIT DEPLOYMENT:</span>
                Every detour, filler word, repetitive qualifier, and circular defense is extracted and scored on screen without sugarcoating.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t-4 border-black bg-[#d91b00] text-white p-3 text-xs uppercase font-bold tracking-wider">
            ZERO TOLERANCE FOR FLUFF OR CIRCUMLOCUTION.
          </div>
        </div>
      </div>
    </section>
  );
}
