import { Link } from 'react-router-dom';

export default function HowItHelps() {
  return (
    <section className="border-brutal-6 bg-[#f5f5f0] p-6 sm:p-10 md:p-12">
      <div className="border-b-4 border-black pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="bg-[#d91b00] text-white px-3 py-1 font-bold text-xs uppercase border-2 border-black inline-block mb-2">RETENTION &amp; CONDITIONING</span>
          <h2 className="font-serif-heavy text-4xl sm:text-5xl text-black uppercase tracking-tight">
            HOW IT HELPS
          </h2>
        </div>
        <div className="font-mono-harsh text-xs sm:text-sm font-bold bg-[#ffdd00] border-2 border-black px-3 py-1 self-start sm:self-auto">
          SURGICAL INTERVENTION FOR VERBAL HESITATION
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border-brutal-4 bg-[#171717] text-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-3xl font-serif-heavy text-[#d91b00] uppercase mb-4 pb-2 border-b-2 border-neutral-700">
              01 // RUTHLESS DIRECT FEEDBACK
            </div>
            <p className="font-mono-harsh text-base sm:text-lg text-neutral-200 leading-relaxed mb-6">
              Conventional coaches flatter you to keep subscriptions alive. PointBlank delivers unapologetic critique. If your premise takes 40 seconds to locate, the system issues a failing mark and quotes your exact filler phrases back to you.
            </p>
          </div>
          <div className="bg-[#d91b00] text-white p-3 font-mono-harsh text-xs uppercase font-bold border-2 border-black">
            DIAGNOSTIC CRITERIA: CONCISION, COHERENCE, ZERO HEDGING.
          </div>
        </div>

        <div className="border-brutal-4 bg-[#ffdd00] text-black p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-3xl font-serif-heavy text-black uppercase mb-4 pb-2 border-b-2 border-black">
              02 // DAILY STREAK ENFORCEMENT
            </div>
            <p className="font-mono-harsh text-base sm:text-lg text-neutral-900 leading-relaxed mb-6">
              Verbal precision is a muscle memory discipline, not an innate talent. PointBlank enforces a high-visibility daily streak tracker. Miss a day or submit a ramble that fails the threshold, and your streak count resets to zero on notice.
            </p>
          </div>
          <div className="bg-[#0a0a0a] text-[#ffdd00] p-3 font-mono-harsh text-xs uppercase font-bold border-2 border-black">
            MANDATORY CADENCE: ONE UNBROKEN PITCH ATTEMPT PER 24-HOUR CYCLE.
          </div>
        </div>
      </div>

      <div className="mt-10 border-brutal-6 bg-[#0a0a0a] p-8 text-center text-white">
        <h3 className="font-serif-heavy text-3xl sm:text-5xl text-[#ffdd00] uppercase mb-4">
          READY FOR RAW CRITIQUE?
        </h3>
        <p className="font-mono-harsh text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
          No signups. No accounts. Tap the microphone in the speech lab and deliver your unscripted pitch.
        </p>
        <Link to="/coach" className="btn-brutal-massive px-10 py-5 text-2xl sm:text-3xl font-black uppercase tracking-tight font-serif-heavy text-black border-brutal-6">
          START PRACTICING NOW
        </Link>
      </div>
    </section>
  );
}
