import { X } from 'lucide-react';
import type { ToonhubCharacter } from '../data/toonhub';

type CharacterDetailModalProps = {
  character: ToonhubCharacter;
  onClose: () => void;
};

export function CharacterDetailModal({ character, onClose }: CharacterDetailModalProps) {
  return (
    <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center sm:p-8" style={{ zIndex: 80 }}>
      <button
        type="button"
        aria-label="Close detail backdrop"
        onClick={onClose}
        className="absolute inset-0 border-0 bg-black/24"
      />
      <section
        aria-label={`${character.name} artwork details`}
        className="relative grid min-h-0 w-full max-w-5xl overflow-hidden rounded-[8px] bg-white text-neutral-950 shadow-2xl sm:grid-cols-[0.88fr_1.12fr]"
        style={{ height: 'min(92vh, 820px)' }}
      >
        <div className="relative hidden min-h-0 overflow-hidden sm:block" style={{ backgroundColor: character.panel }}>
          <div className="absolute left-6 top-6 text-xs font-bold uppercase tracking-[0.24em] text-white/80">
            {character.code}
          </div>
          <img
            src={character.src}
            alt=""
            className="absolute bottom-0 left-1/2 h-[88%] -translate-x-1/2 object-contain"
          />
        </div>
        <div className="min-h-0 overflow-y-auto p-6 pb-10 sm:p-9 sm:pb-12">
          <div className="mb-7 flex items-start justify-between gap-5">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                {character.code} / {character.channel} / {character.signal}
              </p>
              <h2
                className="uppercase"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(42px, 8vw, 92px)',
                  lineHeight: 0.9,
                }}
              >
                {character.name}
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close artwork details"
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-neutral-300 bg-white text-neutral-950 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
            >
              <X size={20} />
            </button>
          </div>
          <p className="mb-7 max-w-xl text-base leading-7 text-neutral-700">{character.concept}</p>

          <div className="mb-8 grid grid-cols-1 border-y border-neutral-200 sm:grid-cols-2">
            {[
              ['Channel', `${character.channel} / ${character.signal}`],
              ['Origin', character.origin],
              ['Role', character.role],
              ['Medium', character.medium],
              ['Palette', character.palette],
              ['Finish', character.finish],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-neutral-200 py-4 sm:odd:border-r sm:px-4 sm:first:pl-0 sm:[&:nth-child(5)]:pl-0"
              >
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">{label}</p>
                <p className="text-sm font-semibold leading-6 text-neutral-900">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">Design Notes</p>
            <div className="grid gap-3">
              {character.notes.map((note, index) => (
                <div key={note} className="grid grid-cols-[34px_1fr] gap-3 border-t border-neutral-200 pt-3">
                  <span
                    className="text-xl uppercase text-neutral-950"
                    style={{ fontFamily: "'Anton', sans-serif", lineHeight: 1 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-6 text-neutral-700">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="mt-8 border-l-4 border-neutral-950 pl-5 text-xl font-semibold leading-8 text-neutral-950">
            "{character.quote}"
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-2">
            {character.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-neutral-700"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
