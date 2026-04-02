import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { revealUp } from "../lib/motion";

const proofItems = [
  "Residencial, comercial, industrial y hotelero",
  "Gas LP y natural",
  "Pruebas hidrostaticas",
] as const;

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32"
      id="inicio"
    >
      <div className="mx-auto max-w-[88rem] px-5 pb-10 pt-36 sm:px-6 sm:pt-40 lg:px-8 xl:pb-12 xl:pt-40">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:items-center xl:gap-10">
          <motion.div className="space-y-6 xl:max-w-[34rem]" {...revealUp}>
            <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan">
              BCA Ingenieria
            </p>

            <div className="space-y-4">
              <h1 className="max-w-[11.5ch] font-display text-[clamp(2.6rem,5vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
                Instalaciones hidrosanitarias, gas y bombeo para proyectos que exigen control tecnico.
              </h1>

              <p className="max-w-xl text-base leading-8 text-graphite/84 sm:text-lg">
                Diseno, instalacion y pruebas para obra residencial, comercial, industrial y hotelera, con una
                cotizacion preliminar mas clara y una atencion mejor presentada desde el primer contacto.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <PrimaryButton href="#cotizador">
                Cotizar proyecto
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>

              <a
                className="font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-industrial-gold"
                href="#especialidades"
              >
                Ver especialidades
              </a>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-5 text-sm leading-6 text-graphite/76">
              {proofItems.map((item) => (
                <span className="inline-flex items-center gap-2" key={item}>
                  <span aria-hidden className="h-2 w-2 rounded-full bg-hydro-cyan" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative xl:-mr-10 2xl:-mr-14" {...revealUp}>
            <div className="relative overflow-hidden border border-ink bg-concrete shadow-plate">
              <img
                alt="Supervision tecnica en obra para instalaciones hidrosanitarias, gas y bombeo"
                className="h-[360px] w-full object-cover sm:h-[430px] xl:h-[560px]"
                src="/assets/hero-industrial.jpg"
              />

              <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/20 via-transparent to-transparent" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 inline-flex items-center border border-ink bg-industrial-gold px-3 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm sm:left-6 sm:top-6">
                Cotizacion preliminar con validacion en sitio
              </div>

              <div className="absolute bottom-5 left-5 max-w-[30rem] border border-ink bg-white px-5 py-4 shadow-plate sm:bottom-6 sm:left-6 sm:px-6">
                <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                  Diseno, instalacion y pruebas
                </p>
                <p className="mt-2 text-sm leading-6 text-ink sm:text-[0.98rem]">
                  BCA presenta mejor cada proyecto desde la cotizacion inicial hasta la ejecucion tecnica en campo.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
