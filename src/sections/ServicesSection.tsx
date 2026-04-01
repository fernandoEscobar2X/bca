import { Droplets, Flame, Gauge, Waves } from "lucide-react";
import { motion } from "framer-motion";

import { SectionIntro } from "../components/ui/SectionIntro";
import { services } from "../content/siteContent";
import { cn } from "../lib/cn";
import { plateSpring, revealUp } from "../lib/motion";

const icons = {
  "HS-01": Droplets,
  "GI-02": Flame,
  "AL-03": Waves,
  "PH-04": Gauge,
} as const;

export function ServicesSection() {
  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="especialidades">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            aside={
              <div className="inline-flex border border-ink/15 bg-surface px-4 py-2 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-graphite shadow-plate-sm">
                Especialidades para obras con criterio tecnico
              </div>
            }
            description="BCA presenta sus frentes principales con un lenguaje mas claro, mas serio y mas alineado a clientes que comparan capacidad real."
            eyebrow="Especialidades"
            title="Capacidades tecnicas presentadas con orden y presencia corporativa."
          />
        </motion.div>

        <div className="mt-12 grid gap-8 xl:grid-cols-[260px_minmax(0,1fr)]">
          <motion.div className="space-y-5 xl:sticky xl:top-28 xl:h-fit" {...revealUp}>
            <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Cobertura tecnica</p>
            <h3 className="font-display text-[clamp(1.9rem,2.4vw,2.6rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
              Una presencia digital mas fuerte tambien se construye mostrando mejor lo que BCA sabe ejecutar.
            </h3>
            <p className="text-sm leading-7 text-graphite/82">
              Cada especialidad refuerza seriedad, alcance y criterio tecnico desde el primer contacto.
            </p>
          </motion.div>

          <motion.div className="overflow-hidden border border-ink/15 bg-white shadow-plate" {...revealUp}>
            {services.map((service, index) => {
              const Icon = icons[service.code];
              const accentClass = service.accent === "gold" ? "bg-industrial-gold" : "bg-hydro-cyan";

              return (
                <motion.article
                  className={cn(
                    "grid gap-px border-b border-ink/10 bg-concrete last:border-b-0 lg:grid-cols-[90px_minmax(0,1fr)_260px]",
                    index % 2 === 0 ? "bg-concrete" : "bg-[#ECECEE]",
                  )}
                  key={service.code}
                  transition={{ ...plateSpring, delay: index * 0.04 }}
                  whileHover={{ x: -4, y: -4 }}
                >
                  <div className="flex flex-col items-start justify-between bg-white p-5">
                    <div className={cn("mb-5 h-2 w-full border border-ink", accentClass)} />
                    <div className="flex h-12 w-12 items-center justify-center border border-ink/15 bg-surface text-ink">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-graphite/62">{service.code}</p>
                  </div>

                  <div className="bg-white p-6">
                    <h3 className="font-display text-[clamp(1.7rem,2.5vw,2.5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-graphite/84">{service.description}</p>
                  </div>

                  <div className="flex flex-col justify-center bg-surface p-6">
                    <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Incluye</p>
                    <div className="mt-4 space-y-3">
                      {service.bullets.map((bullet) => (
                        <div className="border-b border-ink/10 pb-3 last:border-b-0 last:pb-0" key={bullet}>
                          <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
