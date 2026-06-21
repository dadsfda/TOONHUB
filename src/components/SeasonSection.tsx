import { useInView } from '../hooks/useInView';

type SeasonSectionProps = {
  title: string;
  copy: string;
};

export function SeasonSection({ title, copy }: SeasonSectionProps) {
  const { ref, isInView } = useInView<HTMLElement>({ once: false });

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden bg-white px-5 py-20 text-neutral-950 sm:px-10 sm:py-28 ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
        <img
          src="/figurines/figurine-2.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="cinematic-bg-figure absolute -left-12 bottom-0 h-[360px] w-auto opacity-[0.24] sm:left-[5vw] sm:h-[520px]"
        />
        <img
          src="/figurines/figurine-3.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="cinematic-bg-figure absolute -right-16 top-4 h-[340px] w-auto opacity-[0.22] sm:right-[8vw] sm:h-[500px]"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_12%_18%,rgba(244,132,95,0.24),transparent_30%),radial-gradient(circle_at_86%_76%,rgba(110,181,255,0.22),transparent_34%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="motion-reveal mb-5 text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">Season File</p>
        <div className="grid gap-8 sm:grid-cols-[0.95fr_1.05fr] sm:items-start">
          <h2
            className="motion-reveal motion-delay-1 uppercase"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(54px, 10vw, 150px)',
              lineHeight: 0.9,
            }}
          >
            {title}
          </h2>
          <div>
            <p className="motion-reveal motion-delay-2 max-w-xl text-lg leading-8 text-neutral-600">{copy}</p>
            <div className="motion-reveal motion-delay-3 mt-8 grid grid-cols-4 gap-2">
              {['#F4845F', '#6BBF7A', '#E882B4', '#6EB5FF'].map((color, index) => (
                <span
                  key={color}
                  className="signal-bar h-2 rounded-full"
                  style={{ backgroundColor: color, transitionDelay: `${360 + index * 80}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
