import { lazy, Suspense } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { revealUp } from "../lib/motion";

const TechnicalScene = lazy(async () => {
  const module = await import("../components/TechnicalScene");
  return { default: module.TechnicalScene };
});

const heroTags = [
  "Sucursal digital premium",
  "Lead Terminal",
  "WhatsApp automatico",
  "PDF corporativo",
] as const;

type HeroSectionProps = {
  onOpenAdmin: () => void;
};

export function HeroSection({ onOpenAdmin }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="inicio">
      <div className="mx-auto max-w-[88rem] px-5 pb-16 pt-40 sm:px-6 sm:pt-44 lg:px-8 lg:pb-24 xl:pt-48">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-end">
          <motion.div className="space-y-8 xl:pr-10" {...revealUp}>
            <div className="inline-flex items-center border border-ink/15 bg-white px-4 py-2 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan shadow-plate-sm">
              Sucursal digital de alta conversion
            </div>

            <div className="space-y-5">
              <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                BCA Ingenieria | Demo comercial del sistema final
              </p>
              <h1 className="max-w-[9.5ch] font-display text-[clamp(3.2rem,7vw,6.15rem)] font-bold leading-[0.9] tracking-[-0.055em] text-ink">
                BCA SE VE MAS SERIA CUANDO SU CAPTACION YA OPERA COMO SISTEMA.
              </h1>
              <p className="max-w-xl text-base leading-8 text-graphite/84 sm:text-lg">
                Esta demo proyecta una plataforma pensada para atraer mejores prospectos, responder con mas formalidad y
                organizar el seguimiento comercial con una presencia digital de otro nivel.
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
                Probar Lead Terminal
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>

              <PrimaryButton onClick={onOpenAdmin} type="button" variant="secondary">
                Ver panel privado
                <LockKeyhole className="h-4 w-4 text-hydro-cyan" />
              </PrimaryButton>
            </div>
          </motion.div>

          <motion.div className="xl:pl-4" {...revealUp}>
            <div className="overflow-hidden border border-ink bg-white shadow-plate">
              <div className="grid gap-px border-b border-ink/10 bg-concrete md:grid-cols-[minmax(0,1fr)_260px]">
                <div className="bg-white px-5 py-5 sm:px-6">
                  <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Presencia digital premium
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                    Una plataforma que transmite orden, rigor y capacidad real de seguimiento.
                  </h2>
                </div>
                <div className="bg-industrial-gold px-5 py-5">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">Incluye</p>
                  <p className="mt-3 text-sm leading-7 text-ink">Especialidades, cotizador, panel, WhatsApp y PDF.</p>
                </div>
              </div>

              <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="bg-surface p-5 sm:p-6">
                  <div className="overflow-hidden border border-ink bg-white shadow-plate-sm">
                    <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Visual tecnico 3D</p>
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite/62">WebGL</p>
                    </div>
                    <div className="h-[320px] bg-surface">
                      <Suspense
                        fallback={
                          <div className="flex h-full items-center justify-center bg-blueprint-grid bg-[length:28px_28px] px-6 text-center text-sm leading-7 text-graphite/72">
                            Cargando visual 3D...
                          </div>
                        }
                      >
                        <TechnicalScene />
                      </Suspense>
                    </div>
                  </div>
                </div>

                <div className="grid gap-px bg-concrete">
                  <div className="bg-white px-5 py-5">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Lead Terminal</p>
                    <p className="mt-3 text-sm leading-7 text-ink">
                      Cotizador guiado para captar tipo de obra, especialidad y metraje con mas formalidad.
                    </p>
                  </div>
                  <div className="bg-white px-5 py-5">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Panel privado</p>
                    <p className="mt-3 text-sm leading-7 text-ink">
                      Seguimiento claro para saber a quien contactar, que estado mover y que sigue.
                    </p>
                  </div>
                  <div className="bg-white px-5 py-5">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Respuesta automatizada</p>
                    <p className="mt-3 text-sm leading-7 text-ink">
                      WhatsApp y PDF listos para responder mejor y proyectar una empresa mas estructurada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
