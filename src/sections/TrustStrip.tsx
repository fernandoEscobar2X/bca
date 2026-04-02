import { motion } from "framer-motion";

import { trustItems } from "../content/siteContent";
import { revealUp } from "../lib/motion";

export function TrustStrip() {
  return (
    <section
      aria-label="Indicadores BCA"
      className="border-b border-ink/10 bg-ink scroll-mt-20 md:scroll-mt-24 xl:scroll-mt-28"
      id="resumen"
    >
      <div className="mx-auto max-w-[88rem] px-5 py-4 sm:px-6 sm:py-5 lg:px-8">
        <motion.div
          className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)] xl:items-center"
          {...revealUp}
        >
          <div className="hidden border border-white/10 bg-[#161a1f] px-5 py-4 xl:block">
            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-industrial-gold">
              BCA Ingeniería
            </p>
            <p className="mt-2 text-sm leading-6 text-white/90">
              Presencia técnica más clara para captar y atender mejor cada proyecto.
            </p>
          </div>

          <div className="xl:hidden">
            <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-industrial-gold">
              BCA IngenierÃ­a
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/10 xl:grid-cols-4">
            {trustItems.map((item, index) => (
              <motion.div
                className="bg-ink px-4 py-4 sm:px-5"
                initial={{ opacity: 0, y: 14 }}
                key={item}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span
                  className={
                    index % 2 === 0 ? "mb-3 block h-1 w-14 bg-industrial-gold" : "mb-3 block h-1 w-14 bg-hydro-cyan"
                  }
                />
                <p className="text-[0.72rem] font-semibold leading-5 text-white sm:font-sans sm:text-[0.74rem] sm:uppercase sm:tracking-[0.16em]">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
