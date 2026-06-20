import type { ToonhubCharacter } from '../data/toonhub';

type ChannelMapProps = {
  characters: ToonhubCharacter[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ChannelMap({ characters, activeIndex, onSelect }: ChannelMapProps) {
  return (
    <section className="bg-white px-5 py-20 text-neutral-950 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">Channel Map</p>
            <h2
              className="uppercase"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(48px, 8vw, 112px)',
                lineHeight: 0.92,
              }}
            >
              Signal network
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-neutral-600">
            The first TOONHUB universe is mapped as four color frequencies. Select a field to tune into its character.
          </p>
        </div>
        <div className="grid min-h-[520px] overflow-hidden rounded-[8px] border border-neutral-200 sm:grid-cols-2">
          {characters.map((character, index) => (
            <button
              key={character.code}
              type="button"
              onClick={() => onSelect(index)}
              className="relative min-h-[220px] overflow-hidden p-6 text-left text-white transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
              style={{ backgroundColor: character.bg }}
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-white/70">{character.channel}</p>
              <h3
                className="uppercase"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(42px, 7vw, 92px)',
                  lineHeight: 0.88,
                }}
              >
                {character.signal}
              </h3>
              <p className="absolute bottom-6 left-6 max-w-xs pr-6 text-sm leading-6 text-white/75">
                {character.origin}
              </p>
              {activeIndex === index && (
                <span className="absolute right-6 top-6 rounded-full border border-white/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  Tuned
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
