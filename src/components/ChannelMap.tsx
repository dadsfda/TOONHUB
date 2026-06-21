import type { ToonhubCharacter } from '../data/toonhub';
import { useInView } from '../hooks/useInView';

type ChannelMapProps = {
  characters: ToonhubCharacter[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ChannelMap({ characters, activeIndex, onSelect }: ChannelMapProps) {
  const { ref, isInView } = useInView<HTMLElement>({ once: false });

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden bg-white px-5 py-20 text-neutral-950 sm:px-10 sm:py-28 ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(120deg,rgba(244,132,95,0.08),transparent_34%,rgba(110,181,255,0.09))]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-end">
          <div>
            <p className="motion-reveal mb-3 text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">Channel Map</p>
            <h2
              className="motion-reveal motion-delay-1 uppercase"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(48px, 8vw, 112px)',
                lineHeight: 0.92,
              }}
            >
              Signal network
            </h2>
          </div>
          <p className="motion-reveal motion-delay-2 max-w-xl text-base leading-8 text-neutral-600">
            The first TOONHUB universe is mapped as four color frequencies. Select a field to tune into its character.
          </p>
        </div>
        <div className="motion-reveal motion-delay-3 grid min-h-[520px] overflow-hidden rounded-[8px] border border-neutral-200 sm:grid-cols-2">
          {characters.map((character, index) => (
            <button
              key={character.code}
              type="button"
              onClick={() => onSelect(index)}
              className={`cinematic-field signal-field relative min-h-[220px] overflow-hidden p-6 text-left text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 ${
                activeIndex === index ? 'signal-pulse' : ''
              }`}
              style={{ backgroundColor: character.bg }}
            >
              <img
                src={character.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute -bottom-14 right-[-34px] z-0 h-[250px] w-auto opacity-[0.2] blur-[1px] saturate-125 sm:h-[300px]"
              />
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/4 via-transparent to-black/10" />
              <div className="motion-content flex h-full min-h-[172px] flex-col justify-between gap-8">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-white/70">{character.channel}</p>
                  <h3
                    className="max-w-[9ch] uppercase"
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(42px, 6.4vw, 86px)',
                      lineHeight: 0.9,
                    }}
                  >
                    {character.signal}
                  </h3>
                </div>
                <div className="flex items-end justify-between gap-5">
                  <p className="max-w-xs text-sm leading-6 text-white/78">{character.origin}</p>
                  {activeIndex === index && (
                    <span className="shrink-0 rounded-full border border-white/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                      Tuned
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
