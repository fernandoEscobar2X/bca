import { ClipboardCheck, HardHat, MapPinned } from "lucide-react";
import { motion } from "framer-motion";

import { SectionIntro } from "../components/ui/SectionIntro";
import { processSteps } from "../content/siteContent";
import { revealUp } from "../lib/motion";

const icons = [MapPinned, HardHat, ClipboardCheck] as const;

export function ProcessSection() {
  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="metodologia">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            description="La metodologia no necesita cuatro cajas mas. Necesita una lectura simple que explique como se pasa del diagnostico a la entrega."
            eyebrow="Metodologia"
            title="Una secuencia tecnica clara, presentada como flujo y no como un mosaico de cards."
          />
        </motion.div>

        <div className="mt-12 grid gap-8 xl:grid-cols-[240px_minmax(0,1fr)]">
          <motion.div className="space-y-4" {...revealUp}>
            <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Cadena de ejecucion</p>
            <p className="text-sm leading-7 text-graphite/82">
              Primero se revisa el activo, despues se ejecuta con control y finalmente se documenta la entrega.
            </p>
          </motion.div>

          <motion.div className="relative" {...revealUp}>
            <div className="absolute bottom-0 left-[1.45rem] top-0 hidden w-px bg-concrete md:block" />

            <div className="space-y-10">
              {processSteps.map((step, index) => {
                const Icon = icons[index];

                return (
                  <div className="grid gap-5 md:grid-cols-[72px_minmax(0,1fr)_180px]" key={step.title}>
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center border border-ink bg-white shadow-plate-sm">
                      <Icon className="h-5 w-5 text-ink" />
                    </div>

                    <div className="border-b border-ink/10 pb-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                          Paso {step.index}
                        </span>
                        <span className={index === 1 ? "h-2 w-14 border border-ink bg-industrial-gold" : "h-2 w-14 border border-ink bg-hydro-cyan"} />
                      </div>

                      <h3 className="mt-4 font-display text-[clamp(1.65rem,2.6vw,2.5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-graphite/84">{step.description}</p>
                    </div>

                    <div className="md:pt-2">
                      <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/58">
                        Secuencia {step.index} / 03
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
