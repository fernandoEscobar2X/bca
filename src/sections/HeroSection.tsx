import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { revealUp } from "../lib/motion";

const heroFacts = [
  {
    label: "Sectores",
    value: "Residencial, comercial, industrial y hotelero.",
  },
  {
    label: "Alcance",
    value: "Diseno, instalacion, bombeo, suavizadores y pruebas.",
  },
  {
    label: "Respuesta",
    value: "Cotizacion preliminar clara y seguimiento mas formal.",
  },
] as const;

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32"
      id="inicio"
    >
      <div className="mx-auto max-w-[88rem] px-5 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 xl:pt-32">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.66fr)_minmax(0,1.34fr)] xl:items-center">
          <motion.div className="space-y-6 xl:pr-8" {...revealUp}>
            <div className="inline-flex items-center border border-ink/15 bg-white px-4 py-2 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan shadow-plate-sm">
              BCA Ingenieria | Hidrosanitarias, gas y bombeo
            </div>

            <div className="space-y-4">
              <h1 className="max-w-[11ch] font-display text-[clamp(2.8rem,5.3vw,4.95rem)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
                Instalaciones hidrosanitarias, gas y bombeo con control tecnico real.
              </h1>

              <p className="max-w-xl text-base leading-8 text-graphite/84 sm:text-lg">
                BCA Ingenieria atiende proyectos residenciales, comerciales, industriales y hoteleros con diseno,
                instalacion y pruebas para clientes que necesitan una empresa mejor presentada, mas clara y mas seria
                desde la cotizacion inicial.
              </p>
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

            <div className="grid gap-3 border-t border-ink/10 pt-5 sm:grid-cols-3">
              {heroFacts.map((item) => (
                <div key={item.label}>
                  <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative xl:-mr-8 2xl:-mr-12" {...revealUp}>
            <div className="relative min-h-[360px] overflow-hidden bg-concrete sm:min-h-[420px] xl:min-h-[520px]">
              <img
                alt="Supervision tecnica en obra para instalaciones hidrosanitarias, gas y bombeo"
                className="absolute inset-0 h-full w-full object-cover"
                src="/assets/hero-industrial.jpg"
              />

              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/18 via-transparent to-transparent" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/72 via-ink/12 to-transparent" />

              <div className="absolute left-5 top-5 inline-flex items-center border border-white/20 bg-white/92 px-3 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm sm:left-6 sm:top-6">
                Supervision y ejecucion en campo
              </div>

              <div className="absolute inset-x-0 bottom-0 grid gap-px bg-white/15 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <div className="bg-ink/88 px-5 py-4 text-surface sm:px-6">
                  <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Cobertura BCA
                  </p>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-surface/90">
                    Instalaciones hidrosanitarias, gas LP y natural, bombeo, suavizadores, albercas y pruebas
                    hidrostaticas para obras que requieren mejor control tecnico y continuidad operativa.
                  </p>
                </div>

                <div className="bg-industrial-gold px-5 py-4 text-ink sm:px-6">
                  <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink/72">
                    Respuesta inicial
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink">
                    Cotizacion preliminar, contacto mas ordenado y siguiente paso mas claro para el cliente.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
