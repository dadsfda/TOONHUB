import type { ToonhubCharacter } from '../data/toonhub';
import { useInView } from '../hooks/useInView';

type CharacterChannelsProps = {
  characters: ToonhubCharacter[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function CharacterChannels({ characters, activeIndex, onSelect }: CharacterChannelsProps) {
  const { ref, isInView } = useInView<HTMLElement>({ once: false });

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28 ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_8%_20%,rgba(244,132,95,0.18),transparent_28%),radial-gradient(circle_at_90%_70%,rgba(110,181,255,0.16),transparent_32%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="motion-reveal mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Character Channels</p>
            <h2
              className="motion-reveal motion-delay-1 uppercase"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(48px, 8vw, 112px)',
                lineHeight: 0.92,
              }}
            >
              Four signals online
            </h2>
          </div>
          <p className="motion-reveal motion-delay-2 max-w-md text-sm leading-7 text-white/58">
            Each channel carries a different color, personality, and role inside the first TOONHUB season.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((character, index) => (
            <button
              key={character.code}
              type="button"
              onClick={() => onSelect(index)}
              className={`cinematic-card motion-reveal group min-h-[310px] rounded-[8px] border p-5 text-left text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                activeIndex === index ? 'signal-pulse border-white/45' : 'border-white/12'
              } relative overflow-hidden`}
              style={{ backgroundColor: character.bg, transitionDelay: `${index * 90}ms` }}
            >
              <img
                src={character.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute -bottom-10 right-[-42px] z-0 h-[220px] w-auto opacity-[0.24] blur-[1px] saturate-125 transition-opacity duration-300 group-hover:opacity-30"
              />
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/8 via-black/0 to-black/20" />
              <div className="relative z-10">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white/75">{character.channel}</p>
                <h3
                  className="mb-4 uppercase text-white"
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(36px, 5vw, 58px)',
                    lineHeight: 0.9,
                  }}
                >
                  {character.name}
                </h3>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-white/80">{character.signal}</p>
                <p className="text-sm leading-6 text-white/82">{character.role}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {character.personality.map((trait) => (
                    <span
                      key={trait}
                      className="rounded-full border border-white/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                {activeIndex === index && (
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">Current signal</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
