import Header from '../components/Header';
import Hero from '../components/Hero';
import WhoWhat from '../components/WhoWhat';
import PrepFramework from '../components/PrepFramework';
import HowItHelps from '../components/HowItHelps';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="bg-[#e2dbce] text-[#0a0a0a] min-h-screen flex flex-col">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12 flex-grow w-full">
        <Hero />
        <WhoWhat />
        <PrepFramework />
        <HowItHelps />
      </main>
      <Footer />
    </div>
  );
}
