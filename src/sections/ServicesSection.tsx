import { motion } from "framer-motion";

import { SectionIntro } from "../components/ui/SectionIntro";
import { services } from "../content/siteContent";
import { cn } from "../lib/cn";
import { revealUp } from "../lib/motion";

export function ServicesSection() {
  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="especialidades">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            aside={
              <div className="inline-flex border border-ink/15 bg-surface px-4 py-2 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-graphite shadow-plate-sm">
                Residencial, comercial e industrial
              </div>
            }
            description="Los servicios reales de BCA se presentan con una estructura mas clara y mas alineada a clientes que valoran criterio tecnico, formalidad y capacidad de ejecucion."
            eyebrow="Especialidades tecnicas"
            title="Diseno, instalaciones y pruebas para proyectos que exigen una empresa mejor presentada."
          />
        </motion.div>

        <motion.div className="mt-12 overflow-hidden border border-ink/15 bg-white shadow-plate" {...revealUp}>
          {services.map((service, index) => (
            <article
              className="grid gap-px border-b border-ink/10 bg-concrete last:border-b-0 lg:grid-cols-[120px_minmax(0,1fr)_300px]"
              key={service.code}
            >
              <div className="bg-surface px-5 py-6">
                <div className={cn("mb-5 h-2 w-full border border-ink", service.accent === "gold" ? "bg-industrial-gold" : "bg-hydro-cyan")} />
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Servicio {index + 1}</p>
                <p className="mt-3 font-display text-[1.55rem] font-bold leading-none tracking-[-0.04em] text-ink">{service.code}</p>
              </div>

              <div className="bg-white px-5 py-6 sm:px-6">
                <h3 className="text-[clamp(1.45rem,2.2vw,2.25rem)] font-semibold leading-tight text-ink">{service.title}</h3>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite/84">{service.description}</p>
              </div>

              <div className="bg-surface px-5 py-6">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Alcance</p>
                <div className="mt-4 space-y-3">
                  {service.bullets.map((bullet) => (
                    <div className="border-b border-ink/10 pb-3 last:border-b-0 last:pb-0" key={bullet}>
                      <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
