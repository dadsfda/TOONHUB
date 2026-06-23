import { useInView } from '../hooks/useInView';
import { publicAsset } from '../utils/assets';

type UniverseIntroProps = {
  copy: string;
};

export function UniverseIntro({ copy }: UniverseIntroProps) {
  const { ref, isInView } = useInView<HTMLElement>({ once: false });

  return (
    <section
      ref={ref}
      className={`signal-scan relative overflow-hidden bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28 ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <img
        src={publicAsset('/figurines/figurine-1.webp')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="cinematic-bg-figure pointer-events-none absolute -bottom-16 -right-10 z-0 h-[420px] w-auto opacity-[0.34] saturate-125 sm:-bottom-24 sm:right-[6vw] sm:h-[660px]"
      />
      <img
        src={publicAsset('/figurines/figurine-4.webp')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="cinematic-bg-figure pointer-events-none absolute -left-20 top-8 z-0 hidden h-[360px] w-auto opacity-[0.18] blur-[1px] sm:block"
      />
      <div className="motion-content mx-auto grid max-w-6xl gap-10 sm:grid-cols-[0.8fr_1.2fr] sm:items-end">
        <p className="motion-reveal text-xs font-bold uppercase tracking-[0.28em] text-white/50">Universe Signal</p>
        <h2
          className="motion-reveal motion-delay-1 max-w-4xl uppercase"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(44px, 8vw, 120px)',
            lineHeight: 0.95,
          }}
        >
          A broadcast universe for toy-like 3D characters.
        </h2>
        <div className="motion-reveal motion-delay-2 sm:col-start-2">
          <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-xl">{copy}</p>
        </div>
      </div>
    </section>
  );
}
