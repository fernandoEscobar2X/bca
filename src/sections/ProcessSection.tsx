import { motion } from "framer-motion";

import { processSteps } from "../content/siteContent";
import { revealUp } from "../lib/motion";

export function ProcessSection() {
  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="metodologia">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] xl:items-start">
          <motion.div className="space-y-5 xl:pt-2" {...revealUp}>
            <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan">
              Metodo de trabajo
            </p>
            <h2 className="max-w-[12ch] font-display text-[clamp(2.2rem,3.8vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.045em] text-ink">
              Una ejecucion clara tambien mejora la percepcion de la empresa.
            </h2>
            <p className="max-w-md text-sm leading-7 text-graphite/84 sm:text-base">
              BCA no solo cotiza mejor. Tambien proyecta mejor como se diagnostica, se ejecuta y se entrega un frente
              tecnico.
            </p>
          </motion.div>

          <div className="grid gap-5">
            {processSteps.map((step, index) => (
              <motion.article
                className="grid gap-px overflow-hidden border border-ink bg-concrete shadow-plate"
                initial={{ opacity: 0, y: 22 }}
                key={step.title}
                transition={{ delay: index * 0.07, duration: 0.45 }}
                viewport={{ once: true, amount: 0.18 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="grid gap-px bg-concrete md:grid-cols-[140px_minmax(0,1fr)_220px]">
                  <div className={index === 1 ? "bg-industrial-gold px-5 py-6" : "bg-hydro-cyan px-5 py-6"}>
                    <p className="font-display text-[2.2rem] font-bold leading-none tracking-[-0.05em] text-ink">
                      {step.index}
                    </p>
                  </div>
                  <div className="bg-white px-5 py-6 sm:px-6">
                    <h3 className="text-[clamp(1.55rem,2.3vw,2.4rem)] font-semibold leading-tight text-ink">{step.title}</h3>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite/84 sm:text-base">{step.description}</p>
                  </div>
                  <div className="bg-surface px-5 py-6">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                      Resultado
                    </p>
                    <p className="mt-3 text-sm leading-7 text-ink">
                      {index === 0
                        ? "Diagnostico mas claro antes de presupuestar."
                        : index === 1
                          ? "Mejor control de obra y coordinacion."
                          : "Entrega verificable y mejor cierre tecnico."}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
