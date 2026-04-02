import { trustItems } from "../content/siteContent";

export function TrustStrip() {
  return (
    <section className="border-y border-ink bg-ink scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" aria-label="Indicadores BCA" id="resumen">
      <div className="mx-auto grid max-w-[88rem] gap-px bg-[#2D3136] px-5 sm:px-6 lg:grid-cols-[220px_repeat(4,minmax(0,1fr))] lg:px-8">
        <div className="bg-ink px-5 py-4 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-industrial-gold">
          BCA Ingenieria
        </div>

        {trustItems.map((item, index) => (
          <div className="bg-ink px-5 py-4" key={item}>
            <span className={index % 2 === 0 ? "mb-3 block h-1 w-14 bg-industrial-gold" : "mb-3 block h-1 w-14 bg-hydro-cyan"} />
            <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-white">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
