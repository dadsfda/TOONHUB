type UniverseIntroProps = {
  copy: string;
};

export function UniverseIntro({ copy }: UniverseIntroProps) {
  return (
    <section className="bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[0.8fr_1.2fr] sm:items-end">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">Universe Signal</p>
        <h2
          className="max-w-4xl uppercase"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(44px, 8vw, 120px)',
            lineHeight: 0.95,
          }}
        >
          A broadcast universe for toy-like 3D characters.
        </h2>
        <div className="sm:col-start-2">
          <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-xl">{copy}</p>
        </div>
      </div>
    </section>
  );
}
