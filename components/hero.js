'use client';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative sm:mt-24 md:mt-0 mx-auto grid min-h-[70vh] w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-8 md:min-h-[80vh] md:grid-cols-2 md:px-8 lg:px-16">
      <div className="order-1 md:order-1">
        <h1 className="text-left text-4xl font-normal leading-tight text-black md:text-6xl lg:text-7xl" style={{ fontFamily: 'Instrument Serif, var(--font-instrument-serif), serif' }}>
          All your kadi jokes in one place
        </h1>
        <p className="mt-4 max-w-xl text-left text-base text-zinc-700 md:text-lg" style={{ fontFamily: 'Coolvetica, var(--font-geist-sans), system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
          Laughs guaranteed. Curated by the community, updated often, and delivered with a smile.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <a href="#contribute" className="rounded-full border border-[#32cd32] px-3 py-1  md:px-6 md:py-3 text-[#1f7a1f] transition hover:bg-[#eaffea]">
            Contribute
          </a>
        </div>
      </div>

      <div className="order-2 flex items-center justify-center md:order-2">
        <div className="relative h-96 w-96 md:h-96 md:w-96">
          <Image src="/olo.gif" alt="Parrot green smiley" fill priority className="object-contain" />
        </div>
      </div>

      <div className="pointer-events-none absolute -left-20 top-10 h-40 w-40 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle at 30% 30%, #7CFC00 0%, rgba(124,252,0,0.0) 60%)' }} />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-48 w-48 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle at 70% 70%, #32CD32 0%, rgba(50,205,50,0,0.0) 60%)' }} />
    </section>
  );
}
