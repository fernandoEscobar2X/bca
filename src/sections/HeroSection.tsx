import { ArrowRight, CalendarDays, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { revealUp } from "../lib/motion";

const proofItems = [
  { label: "15+ anos", value: "operacion continua" },
  { label: "NOM / NFPA", value: "criterio tecnico" },
  { label: "24h", value: "respuesta preliminar" },
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="inicio">
      <div className="absolute inset-y-0 right-0 hidden w-[46vw] min-w-[520px] lg:block">
        <img
          alt="Ingeniero inspeccionando equipo industrial"
          className="h-full w-full object-cover object-center"
          src="/assets/hero-industrial.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-ink/25 via-transparent to-surface" />
        <div className="absolute inset-0 bg-blueprint-grid bg-[length:28px_28px] opacity-20" />

        <div className="absolute inset-x-8 bottom-8">
          <div className="max-w-sm border border-ink bg-white p-5 shadow-plate">
            <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Lectura de campo</p>
            <p className="mt-3 text-sm leading-7 text-ink">
              Imagen de referencia para transmitir supervision, control tecnico y operacion real en sitio.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-5 pb-12 pt-40 sm:px-6 sm:pt-44 lg:px-8 lg:pb-16 lg:pt-56 xl:pt-52">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
          <motion.div className="relative z-10 space-y-8 lg:pr-10" {...revealUp}>
            <div className="inline-flex items-center border border-ink/15 bg-white px-4 py-2 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan shadow-plate-sm">
              BCA Ingenieria | Proyectos y construccion
            </div>

            <div className="space-y-5">
              <p className="font-sans text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                Ingenieria, supervision y entrega normativa para activos que no pueden improvisar.
              </p>

              <h1 className="max-w-[8.9ch] font-display text-[clamp(3.45rem,7.2vw,6.15rem)] font-bold leading-[0.9] tracking-[-0.055em] text-ink">
                SEGURIDAD TECNICA PARA OBRAS Y PROYECTOS
              </h1>

              <p className="max-w-xl text-base leading-8 text-graphite/84 sm:text-lg">
                Proyectos ejecutivos, instalacion, pruebas y liberacion documental con una presencia comercial seria,
                clara y corporativa desde el primer contacto.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <PrimaryButton href="#cotizador">
                Solicitar Cotizacion
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>

              <PrimaryButton href="tel:+528100000000" variant="secondary">
                Llamar Ahora
                <PhoneCall className="h-4 w-4 text-hydro-cyan" />
              </PrimaryButton>

              <PrimaryButton href="mailto:contacto@bcaingenieria.com" variant="secondary">
                Enviar Brief
                <CalendarDays className="h-4 w-4 text-hydro-cyan" />
              </PrimaryButton>
            </div>

            <dl className="flex flex-wrap gap-x-10 gap-y-5 border-t border-ink/10 pt-6">
              {proofItems.map((item) => (
                <div key={item.label}>
                  <dt className="font-display text-[clamp(1.2rem,1.8vw,1.6rem)] font-bold leading-none tracking-[-0.03em] text-ink">
                    {item.label}
                  </dt>
                  <dd className="mt-2 font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/68">{item.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div className="relative lg:hidden" {...revealUp}>
            <div className="overflow-hidden border border-ink bg-white shadow-plate">
              <div className="relative aspect-[4/5]">
                <img
                  alt="Ingeniero inspeccionando equipo industrial"
                  className="h-full w-full object-cover object-center"
                  src="/assets/hero-industrial.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              </div>
              <div className="bg-white px-5 py-4">
                <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Lectura de campo</p>
                <p className="mt-2 text-sm leading-7 text-ink">
                  Imagen de referencia para supervision, control tecnico y operacion real en sitio.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
