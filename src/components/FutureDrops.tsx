import { useInView } from '../hooks/useInView';

export function FutureDrops() {
  const { ref, isInView } = useInView<HTMLElement>({ once: false });

  return (
    <section
      ref={ref}
      className={`signal-scan relative overflow-hidden bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28 ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/figurines/figurine-1.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="cinematic-bg-figure absolute -bottom-20 left-[2vw] h-[360px] w-auto opacity-[0.12] blur-[2px] sm:h-[520px]"
        />
        <img
          src="/figurines/figurine-2.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="cinematic-bg-figure absolute -bottom-24 left-[28vw] hidden h-[420px] w-auto opacity-[0.1] blur-[2px] sm:block"
        />
        <img
          src="/figurines/figurine-3.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="cinematic-bg-figure absolute -bottom-24 right-[22vw] hidden h-[400px] w-auto opacity-[0.1] blur-[2px] sm:block"
        />
        <img
          src="/figurines/figurine-4.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="cinematic-bg-figure absolute -bottom-16 -right-12 h-[340px] w-auto opacity-[0.14] blur-[2px] sm:right-[4vw] sm:h-[500px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/82 to-neutral-950/70" />
      </div>
      <div className="motion-content mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1fr_1fr] sm:items-end">
        <div>
          <p className="motion-reveal mb-4 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Future Drops</p>
          <h2
            className="motion-reveal motion-delay-1 scan-title uppercase"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(56px, 11vw, 170px)',
              lineHeight: 0.88,
            }}
          >
            Next signal loading
          </h2>
        </div>
        <div>
          <p className="motion-reveal motion-delay-2 mb-8 max-w-lg text-lg leading-8 text-white/70">
            New channels will open soon. The first four signals are only the beginning of the TOONHUB universe.
          </p>
          <div className="grid gap-3 text-sm font-bold uppercase tracking-[0.18em] text-white/55">
            {['Follow the broadcast', 'New characters pending', 'Season 02 offline'].map((label, index) => (
              <span key={label} className={`motion-reveal motion-delay-${index + 2}`}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
