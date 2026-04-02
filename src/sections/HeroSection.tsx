import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { revealUp } from "../lib/motion";

const heroTags = [
  "Diseno y calculo",
  "Instalacion y pruebas",
  "Gas, bombeo y albercas",
] as const;

const heroDetails = [
  {
    label: "Proyectos",
    value: "Residencial, comercial, industrial y hotelero.",
  },
  {
    label: "Especialidad",
    value: "Hidrosanitarias, gas, bombeo, suavizadores y pruebas.",
  },
  {
    label: "Respuesta",
    value: "Cotizacion preliminar en linea y seguimiento mas claro.",
  },
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="inicio">
      <div className="mx-auto max-w-[88rem] px-5 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8 xl:pt-36">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:items-center">
          <motion.div className="space-y-6 xl:pr-10" {...revealUp}>
            <div className="inline-flex items-center border border-ink/15 bg-white px-4 py-2 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan shadow-plate-sm">
              BCA Ingenieria | Proyectos y construccion
            </div>

            <div className="space-y-4">
              <h1 className="max-w-[13ch] font-display text-[clamp(2.95rem,6vw,5.4rem)] font-bold leading-[0.92] tracking-[-0.05em] text-ink">
                Instalaciones hidrosanitarias, gas y bombeo para proyectos residenciales, comerciales e industriales.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-graphite/84 sm:text-lg">
                BCA Ingenieria desarrolla diseno y calculo, instalacion, puesta en marcha y pruebas para proyectos que
                requieren mejor criterio tecnico, una cotizacion preliminar clara y una atencion mas profesional desde
                el primer contacto.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {heroTags.map((tag) => (
                <span
                  className="inline-flex items-center border border-ink/10 bg-white px-3 py-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <PrimaryButton href="#cotizador">
                Cotizar proyecto
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>

              <PrimaryButton href="#especialidades" variant="secondary">
                Ver especialidades
              </PrimaryButton>
            </div>

            <p className="max-w-xl border-t border-ink/10 pt-4 text-sm leading-7 text-graphite/72">
              Tambien atendemos albercas, equipos suavizadores de agua y pruebas hidrostaticas con mejor presentacion
              comercial y seguimiento mas claro.
            </p>
          </motion.div>

          <motion.div className="xl:pl-4" {...revealUp}>
            <div className="overflow-hidden border border-ink bg-white shadow-plate">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 bg-white px-5 py-3 sm:px-6">
                <div>
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    BCA Ingenieria
                  </p>
                  <p className="mt-1 text-sm text-graphite/72">Atencion mas seria para proyectos que no pueden improvisarse.</p>
                </div>

                <div className="inline-flex items-center border border-ink/10 bg-surface px-3 py-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink">
                  Cotizacion preliminar y seguimiento
                </div>
              </div>

              <div className="relative overflow-hidden">
                <img
                  alt="Supervision tecnica en obra para instalaciones hidrosanitarias y gas"
                  className="h-[320px] w-full object-cover sm:h-[380px] xl:h-[430px]"
                  src="/assets/hero-industrial.jpg"
                />

                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/18 to-transparent" />

                <div className="absolute left-5 top-5 inline-flex items-center border border-white/20 bg-white/92 px-3 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm sm:left-6 sm:top-6">
                  Residencial | Comercial | Industrial
                </div>

                <div className="absolute inset-x-0 bottom-0 grid gap-px border-t border-white/15 bg-white/10 sm:grid-cols-3">
                  {heroDetails.map((item) => (
                    <div className="bg-ink/88 px-5 py-4 text-surface sm:px-6" key={item.label}>
                      <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-surface/90">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
