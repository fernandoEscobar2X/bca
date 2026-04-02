import { motion } from "framer-motion";

import { trustItems } from "../content/siteContent";
import { revealUp } from "../lib/motion";

export function TrustStrip() {
  return (
    <section
      aria-label="Indicadores BCA"
      className="border-b border-ink/10 bg-ink scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32"
      id="resumen"
    >
      <div className="mx-auto max-w-[88rem] px-5 py-5 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)] xl:items-center"
          {...revealUp}
        >
          <div className="border border-white/10 bg-[#161a1f] px-5 py-4">
            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-industrial-gold">
              BCA Ingenieria
            </p>
            <p className="mt-2 text-sm leading-6 text-white/90">
              Presencia tecnica mas clara para captar y atender mejor cada proyecto.
            </p>
          </div>

          <div className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">
            {trustItems.map((item, index) => (
              <motion.div
                className="bg-ink px-5 py-4"
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
                <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
