import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calculator, ClipboardList, Layers3, Ruler } from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { SectionIntro } from "../components/ui/SectionIntro";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { projectTypes, specialtyOptions } from "../content/siteContent";
import { cn } from "../lib/cn";
import { plateSpring, revealUp } from "../lib/motion";
import {
  buildLeadRecord,
  calculateEstimate,
  formatCurrency,
  initialQuoteState,
  type LeadRecord,
  type ProjectTypeId,
  type QuoteState,
  type ResultRange,
  type SpecialtyId,
} from "../lib/quote";

type StepId = 1 | 2 | 3 | 4;

const stepLabels = [
  { id: 1, label: "Tipo de obra", icon: Layers3 },
  { id: 2, label: "Especialidad", icon: ClipboardList },
  { id: 3, label: "Metraje", icon: Ruler },
] as const;

type OptionCardProps = {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
};

function OptionCard({ active, description, onClick, title }: OptionCardProps) {
  return (
    <motion.button
      className={cn(
        "flex min-h-[170px] flex-col justify-between border p-5 text-left",
        active ? "border-ink bg-industrial-gold text-ink shadow-plate" : "border-ink/15 bg-white text-ink shadow-plate-sm",
      )}
      onClick={onClick}
      transition={plateSpring}
      type="button"
      whileHover={{ x: -4, y: -4 }}
      whileTap={{ x: 2, y: 2 }}
    >
      <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Auto avance</p>
      <div>
        <h3 className="font-display text-[clamp(1.45rem,2.4vw,2rem)] font-bold leading-[0.98] tracking-[-0.035em]">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-graphite/84">{description}</p>
      </div>
    </motion.button>
  );
}

type QuoteSimulatorProps = {
  onLeadGenerated?: (lead: LeadRecord) => void;
};

export function QuoteSimulator({ onLeadGenerated }: QuoteSimulatorProps) {
  const [step, setStep] = useState<StepId>(1);
  const [quote, setQuote] = useState<QuoteState>(initialQuoteState);
  const [activeSelection, setActiveSelection] = useState<string | null>(null);
  const [result, setResult] = useState<ResultRange | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const queueAdvance = (nextStep: StepId, selection: string, updater: (current: QuoteState) => QuoteState) => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setActiveSelection(selection);
    setResult(null);
    setIsCalculating(false);
    setQuote(updater);

    timerRef.current = window.setTimeout(() => {
      setActiveSelection(null);
      setStep(nextStep);
    }, 300);
  };

  const handleProjectSelect = (projectType: ProjectTypeId) => {
    queueAdvance(2, projectType, (current) => ({
      ...current,
      projectType,
    }));
  };

  const handleSpecialtySelect = (specialty: SpecialtyId) => {
    queueAdvance(3, specialty, (current) => ({
      ...current,
      specialty,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!quote.projectType || !quote.specialty) {
      return;
    }

    const squareMeters = Number(quote.squareMeters);

    if (!Number.isFinite(squareMeters) || squareMeters <= 0) {
      return;
    }

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setStep(4);
    setResult(null);
    setIsCalculating(true);

    timerRef.current = window.setTimeout(() => {
      const nextResult = calculateEstimate(quote.projectType as ProjectTypeId, quote.specialty as SpecialtyId, squareMeters);
      setResult(nextResult);
      onLeadGenerated?.(buildLeadRecord(quote.projectType as ProjectTypeId, quote.specialty as SpecialtyId, squareMeters, nextResult));
      setIsCalculating(false);
    }, 650);
  };

  const handleReset = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setQuote(initialQuoteState);
    setStep(1);
    setActiveSelection(null);
    setResult(null);
    setIsCalculating(false);
  };

  const summaryItems = [
    {
      label: "Tipo de obra",
      value: quote.projectType ? projectTypes.find((item) => item.id === quote.projectType)?.label ?? "Pendiente" : "Pendiente",
    },
    {
      label: "Especialidad",
      value: quote.specialty
        ? specialtyOptions.find((item) => item.id === quote.specialty)?.label ?? "Pendiente"
        : "Pendiente",
    },
    {
      label: "Metraje",
      value: quote.squareMeters ? `${quote.squareMeters} m2` : "Pendiente",
    },
  ];

  return (
    <section className="border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="cotizador">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            aside={<PrimaryButton href="mailto:contacto@bcaingenieria.com">Enviar informacion del proyecto</PrimaryButton>}
            description="El cotizador no reemplaza la revision tecnica, pero ayuda a iniciar la conversacion con una banda preliminar de inversion y una captura ordenada."
            eyebrow="Simulador de cotizacion"
            title="Un modulo de conversion claro, sobrio y util para abrir una propuesta tecnica."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
          <SurfaceCard className="overflow-hidden">
            <div className="border-b border-ink/10 bg-ink px-5 py-4 text-white">
              <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Panel de captura</p>
              <p className="mt-2 text-sm leading-6 text-white/84">Avance automatico y resumen de variables activas.</p>
            </div>

            <div className="space-y-6 bg-surface p-5">
              <div className="space-y-3">
                {stepLabels.map(({ icon: Icon, id, label }) => {
                  const active = step === id || (id === 3 && step === 4);
                  const done = step > id;

                  return (
                    <div
                      className={cn(
                        "flex items-center gap-3 border px-3 py-3",
                        active || done
                          ? "border-ink bg-industrial-gold text-ink shadow-plate-sm"
                          : "border-ink/15 bg-white text-graphite",
                      )}
                      key={label}
                    >
                      <div className="flex h-10 w-10 items-center justify-center border border-ink/15 bg-white text-ink">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/70">Paso 0{id}</p>
                        <p className="mt-1 text-sm font-medium">{label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4 border-t border-ink/10 pt-5">
                {summaryItems.map((item) => (
                  <div className="flex items-start justify-between gap-4" key={item.label}>
                    <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/62">{item.label}</p>
                    <p className="text-right text-sm font-medium text-ink">{item.value}</p>
                  </div>
                ))}
              </div>

              <button
                className="w-full border border-ink/15 bg-white px-4 py-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan shadow-plate-sm"
                onClick={handleReset}
                type="button"
              >
                Reiniciar simulador
              </button>
            </div>
          </SurfaceCard>

          <SurfaceCard className="overflow-hidden">
            <div className="grid gap-px bg-concrete sm:grid-cols-3">
              <div className="bg-ink px-5 py-4 text-white">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Captura</p>
                <p className="mt-2 text-sm">Flujo corporativo de 3 pasos</p>
              </div>
              <div className="bg-white px-5 py-4">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Auto avance</p>
                <p className="mt-2 text-sm text-ink">300 ms al seleccionar</p>
              </div>
              <div className="bg-white px-5 py-4">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Resultado</p>
                <p className="mt-2 text-sm text-ink">Banda preliminar en MXN</p>
              </div>
            </div>

            <div className="bg-terminal-grid bg-[length:22px_22px] p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                    exit={{ opacity: 0, y: -18 }}
                    initial={{ opacity: 0, y: 18 }}
                    key="step-1"
                    transition={plateSpring}
                  >
                    <div>
                      <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">01 / Tipo de obra</p>
                      <h3 className="mt-4 font-display text-[clamp(1.85rem,3.6vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                        Defina el tipo de activo o frente principal.
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite/84 sm:text-base">
                        Esto nos ayuda a estimar criticidad operativa, complejidad y el rango base del proyecto.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {projectTypes.map((item) => (
                        <OptionCard
                          active={activeSelection === item.id || quote.projectType === item.id}
                          description={item.description}
                          key={item.id}
                          onClick={() => handleProjectSelect(item.id)}
                          title={item.label}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                    exit={{ opacity: 0, y: -18 }}
                    initial={{ opacity: 0, y: 18 }}
                    key="step-2"
                    transition={plateSpring}
                  >
                    <div>
                      <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">02 / Especialidad</p>
                      <h3 className="mt-4 font-display text-[clamp(1.85rem,3.6vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                        Seleccione la especialidad que requiere prioridad.
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite/84 sm:text-base">
                        La especialidad define el criterio de instalacion, supervision, prueba y entrega documental.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {specialtyOptions.map((item) => (
                        <OptionCard
                          active={activeSelection === item.id || quote.specialty === item.id}
                          description={item.description}
                          key={item.id}
                          onClick={() => handleSpecialtySelect(item.id)}
                          title={item.label}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                    exit={{ opacity: 0, y: -18 }}
                    initial={{ opacity: 0, y: 18 }}
                    key="step-3"
                    transition={plateSpring}
                  >
                    <div>
                      <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">03 / Metraje</p>
                      <h3 className="mt-4 font-display text-[clamp(1.85rem,3.6vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                        Capture el metraje estimado de intervencion.
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite/84 sm:text-base">
                        Este valor se cruza con el tipo de obra y la especialidad para arrojar una banda inicial.
                      </p>
                    </div>

                    <form className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto]" onSubmit={handleSubmit}>
                      <label className="space-y-3">
                        <span className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-graphite/62">Metraje estimado</span>
                        <div className="flex items-center border border-ink bg-white shadow-plate">
                          <input
                            className="w-full border-0 bg-transparent px-5 py-5 text-2xl font-semibold text-ink outline-none placeholder:text-graphite/35"
                            inputMode="numeric"
                            min="1"
                            onChange={(event) =>
                              setQuote((current) => ({
                                ...current,
                                squareMeters: event.target.value,
                              }))
                            }
                            placeholder="Ej. 180"
                            type="number"
                            value={quote.squareMeters}
                          />
                          <span className="border-l border-ink/10 px-5 py-5 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">
                            m2
                          </span>
                        </div>
                      </label>

                      <PrimaryButton className="px-6 py-5" type="submit">
                        Calcular rango
                      </PrimaryButton>
                    </form>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                    exit={{ opacity: 0, y: -18 }}
                    initial={{ opacity: 0, y: 18 }}
                    key="step-4"
                    transition={plateSpring}
                  >
                    {isCalculating ? (
                      <div className="space-y-5">
                        <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Procesando variables</p>
                        <h3 className="font-display text-[clamp(1.85rem,3.6vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                          Generando banda preliminar de inversion.
                        </h3>
                        <div className="border border-ink/15 bg-white p-4 shadow-plate-sm">
                          <motion.div
                            animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)"] }}
                            className="h-3 bg-industrial-gold"
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Resultado preliminar</p>
                          <h3 className="mt-4 font-display text-[clamp(1.85rem,3.6vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                            Rango inicial para abrir revision tecnica.
                          </h3>
                        </div>

                        <div className="border border-ink bg-white p-6 shadow-plate sm:p-8">
                          <div className="flex items-center justify-between gap-4">
                            <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-graphite/62">Banda estimada</p>
                            <Calculator className="h-5 w-5 text-hydro-cyan" />
                          </div>

                          <p className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[0.92] tracking-[-0.05em] text-ink">
                            {result ? `${formatCurrency(result.minimum)} - ${formatCurrency(result.maximum)}` : "Sin resultado"}
                          </p>

                          <div className="mt-6 grid gap-4 border-t border-ink/10 pt-6 sm:grid-cols-3">
                            {summaryItems.map((item) => (
                              <div key={item.label}>
                                <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/60">{item.label}</p>
                                <p className="mt-2 text-sm leading-6 text-ink">{item.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <p className="border border-ink/15 bg-white px-5 py-4 text-sm leading-7 text-graphite/84 shadow-plate-sm">
                          Calculo algoritmico preliminar. Nuestro equipo tecnico validara el levantamiento en sitio para una
                          cotizacion vinculante.
                        </p>

                        <div className="flex flex-wrap gap-4">
                          <PrimaryButton href="#modulos" variant="secondary">
                            Ver flujo operativo BCA
                            <ArrowRight className="h-4 w-4 text-hydro-cyan" />
                          </PrimaryButton>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </section>
  );
}
