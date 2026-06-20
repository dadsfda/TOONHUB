type SeasonSectionProps = {
  title: string;
  copy: string;
};

export function SeasonSection({ title, copy }: SeasonSectionProps) {
  return (
    <section className="bg-white px-5 py-20 text-neutral-950 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-neutral-400">Season File</p>
        <div className="grid gap-8 sm:grid-cols-[0.95fr_1.05fr] sm:items-start">
          <h2
            className="uppercase"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(54px, 10vw, 150px)',
              lineHeight: 0.9,
            }}
          >
            {title}
          </h2>
          <p className="max-w-xl text-lg leading-8 text-neutral-600">{copy}</p>
        </div>
      </div>
    </section>
  );
}
