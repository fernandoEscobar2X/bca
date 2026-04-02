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
  "Residencial, comercial e industrial",
  "Hidrosanitario y gas",
  "Bombeo, suavizacion y pruebas",
  "Cotizacion preliminar en linea",
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
              Ingenieria | Proyectos | Construccion
            </div>

            <div className="space-y-5">
              <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                BCA Ingenieria
              </p>
              <h1 className="max-w-[9.5ch] font-display text-[clamp(3.2rem,7vw,6.15rem)] font-bold leading-[0.9] tracking-[-0.055em] text-ink">
                INGENIERIA HIDROSANITARIA Y GAS CON MEJOR PRESENTACION DESDE EL PRIMER CONTACTO.
              </h1>
              <p className="max-w-xl text-base leading-8 text-graphite/84 sm:text-lg">
                BCA proyecta una presencia mas seria y mas clara para proyectos que exigen criterio tecnico, mejor
                respuesta comercial y seguimiento mas ordenado desde la solicitud inicial.
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

              <PrimaryButton onClick={onOpenAdmin} type="button" variant="secondary">
                Acceso interno
                <LockKeyhole className="h-4 w-4 text-hydro-cyan" />
              </PrimaryButton>
            </div>
          </motion.div>

          <motion.div className="xl:pl-4" {...revealUp}>
            <div className="overflow-hidden border border-ink bg-white shadow-plate">
              <div className="grid gap-px border-b border-ink/10 bg-concrete md:grid-cols-[minmax(0,1fr)_260px]">
                <div className="bg-white px-5 py-5 sm:px-6">
                  <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Presencia digital BCA
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                    Una experiencia que refuerza formalidad, orden y capacidad real de atencion.
                  </h2>
                </div>
                <div className="bg-industrial-gold px-5 py-5">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">Respuesta inicial</p>
                  <p className="mt-3 text-sm leading-7 text-ink">
                    Cotizacion preliminar, mejor presentacion y continuidad de seguimiento.
                  </p>
                </div>
              </div>

              <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="bg-surface p-5 sm:p-6">
                  <div className="overflow-hidden border border-ink bg-white shadow-plate-sm">
                    <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">
                        Visual tecnico
                      </p>
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite/62">Ingenieria BCA</p>
                    </div>
                    <div className="h-[320px] bg-surface">
                      <Suspense
                        fallback={
                          <div className="flex h-full items-center justify-center bg-blueprint-grid bg-[length:28px_28px] px-6 text-center text-sm leading-7 text-graphite/72">
                            Cargando visual tecnico...
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
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Especialidades</p>
                    <p className="mt-3 text-sm leading-7 text-ink">
                      Diseno, instalaciones, bombeo, suavizacion y pruebas para proyectos que requieren seriedad.
                    </p>
                  </div>
                  <div className="bg-white px-5 py-5">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Cotizacion preliminar</p>
                    <p className="mt-3 text-sm leading-7 text-ink">
                      Una forma mas clara de captar proyectos y presentar mejor una respuesta inicial.
                    </p>
                  </div>
                  <div className="bg-white px-5 py-5">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Seguimiento</p>
                    <p className="mt-3 text-sm leading-7 text-ink">
                      Confirmacion inmediata, mejor orden interno y una percepcion mas profesional para el cliente.
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
