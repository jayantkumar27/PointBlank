import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="border-brutal-6 bg-[#ffdd00] p-6 sm:p-10 md:p-14 relative" id="hero">
      <div className="inline-block bg-[#0a0a0a] text-[#ffdd00] px-3 py-1 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 border-2 border-black">
        PROTOCOL 001 // ORAL COMMUNICATION RECONSTRUCTION
      </div>

      <h1 className="font-serif-heavy text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight uppercase text-black mb-6">
        STOP RAMBLING.
      </h1>

      <p className="font-mono-harsh text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-black max-w-3xl mb-10 pb-6 border-b-4 border-black">
        The brutally honest AI speech coach.
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
        <Link to="/coach" className="btn-brutal-massive px-8 py-6 text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight font-serif-heavy text-black border-brutal-6">
          START PRACTICING
        </Link>
        <div className="bg-[#0a0a0a] text-white p-4 border-brutal-4 font-mono-harsh text-xs sm:text-sm flex flex-col justify-center">
          <span className="text-[#ffdd00] font-bold">DIRECT DISPATCH:</span>
          <span>NO SIGNUP. NO ACCOUNTS. RAW MICROPHONE EVALUATION.</span>
        </div>
      </div>
    </section>
  );
}
