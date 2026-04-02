import { motion } from "framer-motion";

import { services } from "../content/siteContent";
import { cn } from "../lib/cn";
import { plateSpring, revealUp } from "../lib/motion";

export function ServicesSection() {
  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-20 md:scroll-mt-24 xl:scroll-mt-28" id="especialidades">
      <div className="mx-auto max-w-[88rem] px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid gap-8 xl:grid-cols-[380px_minmax(0,1fr)] xl:gap-12">
          <motion.div className="space-y-6 xl:sticky xl:top-32 xl:h-fit" {...revealUp}>
            <div className="space-y-4">
              <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan">
                Especialidades BCA
              </p>
              <h2 className="max-w-sm font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[0.96] tracking-[-0.045em] text-ink">
                Servicios reales con mejor estructura comercial y técnica.
              </h2>
              <p className="max-w-sm text-sm leading-7 text-graphite/84 sm:text-base">
                Hidrosanitarias, gas, bombeo, albercas, suavizadores y pruebas presentados como una empresa seria, no
                como una lista genérica de constructora.
              </p>
            </div>

            <div className="relative overflow-hidden border border-ink bg-concrete shadow-plate">
              <img
                alt="Instalación técnica de tuberías y supervisión de obra"
                className="h-[22rem] w-full object-cover object-center"
                src="/assets/hero-industrial.jpg"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/82 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 grid gap-px bg-white/10 sm:grid-cols-2">
                <div className="bg-ink/90 px-5 py-4 text-white">
                  <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Aplicación
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/86">
                    Residencial, comercial, industrial y hotelero.
                  </p>
                </div>
                <div className="bg-industrial-gold px-5 py-4 text-ink">
                  <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/72">
                    Criterio
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink">
                    Diseño, instalación, puesta en marcha y pruebas.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="border-t border-ink/10 xl:pl-8 2xl:pl-14">
            {services.map((service, index) => (
              <motion.article
                className={cn(
                  "group grid gap-6 border-b border-ink/10 py-7 md:grid-cols-[92px_minmax(0,1fr)_260px] md:items-start",
                  "xl:grid-cols-[92px_minmax(0,1.08fr)_240px]",
                  index % 2 === 1 ? "xl:ml-10 2xl:ml-16" : "xl:mr-10 2xl:mr-16",
                )}
                initial={{ opacity: 0, y: 24 }}
                key={service.code}
                transition={{ ...plateSpring, delay: index * 0.04 }}
                viewport={{ once: true, amount: 0.18 }}
                whileHover={{ x: -4 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="space-y-4">
                  <span
                    className={cn(
                      "block h-2 w-16 border border-ink transition-transform duration-300 group-hover:w-24",
                      service.accent === "gold" ? "bg-industrial-gold" : "bg-hydro-cyan",
                    )}
                  />
                  <p className="font-display text-[1.4rem] font-bold leading-none tracking-[-0.04em] text-ink">{service.code}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="max-w-3xl text-[clamp(1.55rem,2.3vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
                    {service.title}
                  </h3>
                  <p className="max-w-3xl text-sm leading-7 text-graphite/84 sm:text-base">{service.description}</p>
                </div>

                <div className="grid gap-2 md:pt-1">
                  {service.bullets.map((bullet) => (
                    <div
                      className="border border-ink/10 bg-surface px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink"
                      key={bullet}
                    >
                      {bullet}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
