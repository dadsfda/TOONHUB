export function FutureDrops() {
  return (
    <section className="bg-neutral-950 px-5 py-20 text-white sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1fr_1fr] sm:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Future Drops</p>
          <h2
            className="uppercase"
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
          <p className="mb-8 max-w-lg text-lg leading-8 text-white/70">
            New channels will open soon. The first four signals are only the beginning of the TOONHUB universe.
          </p>
          <div className="grid gap-3 text-sm font-bold uppercase tracking-[0.18em] text-white/55">
            <span>Follow the broadcast</span>
            <span>New characters pending</span>
            <span>Season 02 offline</span>
          </div>
        </div>
      </div>
    </section>
  );
}
