import type { ToonhubCharacter } from '../data/toonhub';

type CharacterChannelsProps = {
  characters: ToonhubCharacter[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function CharacterChannels({ characters, activeIndex, onSelect }: CharacterChannelsProps) {
  return (
    <section className="bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Character Channels</p>
            <h2
              className="uppercase"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(48px, 8vw, 112px)',
                lineHeight: 0.92,
              }}
            >
              Four signals online
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/58">
            Each channel carries a different color, personality, and role inside the first TOONHUB season.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((character, index) => (
            <button
              key={character.code}
              type="button"
              onClick={() => onSelect(index)}
              className="min-h-[310px] rounded-[8px] border border-white/12 p-5 text-left text-white transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ backgroundColor: character.bg }}
            >
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
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
