import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Layers3,
  MessageSquareMore,
  Ruler,
  ShieldCheck,
  UserRound,
  Workflow,
} from "lucide-react";

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
  type LeadContact,
  type LeadRecord,
  type ProjectTypeId,
  type QuoteState,
  type ResultRange,
  type SpecialtyId,
} from "../lib/quote";

type StepId = 1 | 2 | 3 | 4 | 5;

const initialContactState: LeadContact = {
  contactName: "",
  company: "",
  phone: "",
  email: "",
  location: "",
  notes: "",
};

const stepLabels = [
  { id: 1, label: "Tipo de obra", icon: Layers3 },
  { id: 2, label: "Especialidad", icon: ClipboardList },
  { id: 3, label: "Metraje", icon: Ruler },
  { id: 4, label: "Contacto", icon: UserRound },
] as const;

type OptionCardProps = {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
};

type QuoteSimulatorProps = {
  onLeadGenerated?: (lead: LeadRecord) => void;
  onOpenAdmin?: () => void;
  onDownloadPdf?: (lead: LeadRecord) => void;
  onSimulateWhatsapp?: (lead: LeadRecord) => void;
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
      <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Seleccion</p>
      <div>
        <h3 className="font-display text-[clamp(1.45rem,2.4vw,2rem)] font-bold leading-[0.98] tracking-[-0.035em]">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-graphite/84">{description}</p>
      </div>
    </motion.button>
  );
}

function Field({
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = "text",
  value,
}: {
  label: string;
  name: keyof LeadContact;
  onChange: (name: keyof LeadContact, value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string | undefined;
}) {
  return (
    <label className="space-y-2">
      <span className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite/68">
        {label}
      </span>
      <input
        className="w-full border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none shadow-plate-sm placeholder:text-graphite/35"
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value ?? ""}
      />
    </label>
  );
}

export function QuoteSimulator({
  onDownloadPdf,
  onLeadGenerated,
  onOpenAdmin,
  onSimulateWhatsapp,
}: QuoteSimulatorProps) {
  const [step, setStep] = useState<StepId>(1);
  const [quote, setQuote] = useState<QuoteState>(initialQuoteState);
  const [contact, setContact] = useState<LeadContact>(initialContactState);
  const [activeSelection, setActiveSelection] = useState<string | null>(null);
  const [result, setResult] = useState<ResultRange | null>(null);
  const [latestLead, setLatestLead] = useState<LeadRecord | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [contactError, setContactError] = useState("");
  const [whatsappTriggered, setWhatsappTriggered] = useState(false);
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
    setLatestLead(null);
    setWhatsappTriggered(false);
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

  const handleContactChange = (name: keyof LeadContact, value: string) => {
    setContact((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleMeterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const squareMeters = Number(quote.squareMeters);

    if (!Number.isFinite(squareMeters) || squareMeters <= 0) {
      return;
    }

    setStep(4);
  };

  const handleLeadSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!quote.projectType || !quote.specialty) {
      return;
    }

    if (!contact.contactName || !contact.company || !contact.phone || !contact.email || !contact.location) {
      setContactError("Completa los datos principales para continuar.");
      return;
    }

    setContactError("");
    setStep(5);
    setResult(null);
    setLatestLead(null);
    setWhatsappTriggered(false);
    setIsCalculating(true);

    const squareMeters = Number(quote.squareMeters);

    timerRef.current = window.setTimeout(() => {
      const nextResult = calculateEstimate(quote.projectType as ProjectTypeId, quote.specialty as SpecialtyId, squareMeters);
      const nextLead = buildLeadRecord(
        quote.projectType as ProjectTypeId,
        quote.specialty as SpecialtyId,
        squareMeters,
        nextResult,
        contact,
      );

      setResult(nextResult);
      setLatestLead(nextLead);
      setIsCalculating(false);
      onLeadGenerated?.(nextLead);
    }, 650);
  };

  const handleReset = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    setQuote(initialQuoteState);
    setContact(initialContactState);
    setStep(1);
    setActiveSelection(null);
    setResult(null);
    setLatestLead(null);
    setIsCalculating(false);
    setContactError("");
    setWhatsappTriggered(false);
  };

  const triggerWhatsapp = () => {
    if (!latestLead) {
      return;
    }

    setWhatsappTriggered(true);
    onSimulateWhatsapp?.(latestLead);
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
    {
      label: "Empresa",
      value: contact.company || "Pendiente",
    },
  ];

  return (
    <section className="border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="cotizador">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            aside={<PrimaryButton href="mailto:contacto@bcaingenieria.com">Enviar proyecto</PrimaryButton>}
            description="BCA puede recibir mejor una solicitud inicial, filtrar el proyecto y devolver una referencia preliminar con una presentacion mas formal."
            eyebrow="Cotizacion preliminar"
            title="Cotiza tu proyecto y recibe una referencia inicial."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
          <SurfaceCard className="overflow-hidden">
            <div className="border-b border-ink/10 bg-ink px-5 py-4 text-white">
              <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Resumen de solicitud</p>
              <p className="mt-2 text-sm leading-6 text-white/84">Informacion clave para perfilar mejor el proyecto desde el inicio.</p>
            </div>

            <div className="space-y-6 bg-surface p-5">
              <div className="space-y-3">
                {stepLabels.map(({ icon: Icon, id, label }) => {
                  const active = step === id || (id === 4 && step === 5);
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

              <div className="border-t border-ink/10 pt-5">
                <div className="flex items-start gap-3 border border-ink/15 bg-white px-4 py-4 shadow-plate-sm">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-hydro-cyan" />
                  <p className="text-sm leading-7 text-graphite/82">
                    El resultado es preliminar y sirve como base para validar mejor el proyecto antes de una cotizacion definitiva.
                  </p>
                </div>
              </div>

              <button
                className="w-full border border-ink/15 bg-white px-4 py-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan shadow-plate-sm"
                onClick={handleReset}
                type="button"
              >
                Reiniciar terminal
              </button>
            </div>
          </SurfaceCard>

          <SurfaceCard className="overflow-hidden">
            <div className="grid gap-px bg-concrete sm:grid-cols-4">
              <div className="bg-ink px-5 py-4 text-white">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Solicitud</p>
                <p className="mt-2 text-sm">Datos mejor perfilados</p>
              </div>
              <div className="bg-white px-5 py-4">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Confirmacion</p>
                <p className="mt-2 text-sm text-ink">Respuesta mas inmediata</p>
              </div>
              <div className="bg-white px-5 py-4">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Pre-cotizacion</p>
                <p className="mt-2 text-sm text-ink">Lista para enviar</p>
              </div>
              <div className="bg-white px-5 py-4">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Seguimiento</p>
                <p className="mt-2 text-sm text-ink">Atencion mas ordenada</p>
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
                        Selecciona el tipo de proyecto.
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite/84 sm:text-base">
                        Esto ayuda a ordenar mejor la referencia inicial y el contexto del servicio.
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
                        Selecciona la especialidad principal.
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite/84 sm:text-base">
                        El cotizador toma esta base para perfilar mejor la respuesta preliminar.
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
                        Captura el metraje estimado.
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite/84 sm:text-base">
                        Una referencia simple es suficiente para abrir una banda preliminar de inversion.
                      </p>
                    </div>

                    <form className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto]" onSubmit={handleMeterSubmit}>
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
                            required
                            type="number"
                            value={quote.squareMeters}
                          />
                          <span className="border-l border-ink/10 px-5 py-5 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">
                            m2
                          </span>
                        </div>
                      </label>

                      <PrimaryButton className="px-6 py-5" type="submit">
                        Continuar expediente
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
                    <div>
                      <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">04 / Contacto y empresa</p>
                      <h3 className="mt-4 font-display text-[clamp(1.85rem,3.6vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                        Deja lista la solicitud.
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite/84 sm:text-base">
                        Estos datos ayudan a responder con mas orden y mejor presentacion desde el primer contacto.
                      </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleLeadSubmit}>
                      <div className="grid gap-5 md:grid-cols-2">
                        <Field
                          label="Nombre de contacto"
                          name="contactName"
                          onChange={handleContactChange}
                          placeholder="Ej. Luis Herrera"
                          required
                          value={contact.contactName}
                        />
                        <Field
                          label="Empresa"
                          name="company"
                          onChange={handleContactChange}
                          placeholder="Ej. Grupo Delta"
                          required
                          value={contact.company}
                        />
                        <Field
                          label="Telefono"
                          name="phone"
                          onChange={handleContactChange}
                          placeholder="Ej. +52 81 1234 5678"
                          required
                          value={contact.phone}
                        />
                        <Field
                          label="Correo"
                          name="email"
                          onChange={handleContactChange}
                          placeholder="Ej. operaciones@grupodelta.mx"
                          required
                          type="email"
                          value={contact.email}
                        />
                        <Field
                          label="Ubicacion del proyecto"
                          name="location"
                          onChange={handleContactChange}
                          placeholder="Ej. Monterrey / Santa Catarina"
                          required
                          value={contact.location}
                        />
                        <Field
                          label="Observacion breve"
                          name="notes"
                          onChange={handleContactChange}
                          placeholder="Ej. Frente activo, requiere continuidad operativa"
                          value={contact.notes}
                        />
                      </div>

                      {contactError ? (
                        <p className="border border-[#d9b4b4] bg-[#fff1f1] px-4 py-3 text-sm leading-6 text-[#8f2d2d]">
                          {contactError}
                        </p>
                      ) : null}

                      <PrimaryButton className="px-6 py-4" type="submit">
                        Generar referencia preliminar
                      </PrimaryButton>
                    </form>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                    exit={{ opacity: 0, y: -18 }}
                    initial={{ opacity: 0, y: 18 }}
                    key="step-5"
                    transition={plateSpring}
                  >
                    {isCalculating ? (
                      <div className="space-y-5">
                        <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Procesando expediente</p>
                        <h3 className="font-display text-[clamp(1.85rem,3.6vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                          Preparando referencia preliminar.
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
                          <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Solicitud registrada</p>
                          <h3 className="mt-4 font-display text-[clamp(1.85rem,3.6vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                            BCA ya tiene una base preliminar para continuar.
                          </h3>
                        </div>

                        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_320px]">
                          <div className="border border-ink bg-white p-6 shadow-plate sm:p-8">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-graphite/62">
                                  Banda preliminar
                                </p>
                                <p className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[0.92] tracking-[-0.05em] text-ink">
                                  {result ? `${formatCurrency(result.minimum)} - ${formatCurrency(result.maximum)}` : "Sin resultado"}
                                </p>
                              </div>
                              <Calculator className="h-6 w-6 text-hydro-cyan" />
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                              <span className="inline-flex items-center gap-2 border border-ink/15 bg-surface px-3 py-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">
                                <CheckCircle2 className="h-4 w-4 text-hydro-cyan" />
                                Solicitud completa
                              </span>
                              <span className="inline-flex items-center gap-2 border border-ink/15 bg-surface px-3 py-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">
                                <Workflow className="h-4 w-4 text-industrial-gold" />
                                Seguimiento listo
                              </span>
                            </div>

                            <div className="mt-6 grid gap-4 border-t border-ink/10 pt-6 sm:grid-cols-2">
                              <div>
                                <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/60">Folio</p>
                                <p className="mt-2 text-sm leading-6 text-ink">{latestLead?.id ?? "Sin folio"}</p>
                              </div>
                              <div>
                                <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/60">Empresa</p>
                                <p className="mt-2 text-sm leading-6 text-ink">{latestLead?.company ?? "Pendiente"}</p>
                              </div>
                              <div>
                                <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/60">Contacto</p>
                                <p className="mt-2 text-sm leading-6 text-ink">{latestLead?.contactName ?? "Pendiente"}</p>
                              </div>
                              <div>
                                <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/60">Ubicacion</p>
                                <p className="mt-2 text-sm leading-6 text-ink">{latestLead?.location ?? "Pendiente"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid gap-4">
                            <div className="border border-ink/15 bg-white p-4 shadow-plate-sm">
                              <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-4 w-4 text-hydro-cyan" />
                                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                                  Confirmacion inmediata
                                </p>
                              </div>
                              <p className="mt-3 text-sm leading-7 text-ink">
                                {whatsappTriggered
                                  ? `Enviado a ${latestLead?.phone}. La recepcion del proyecto ya quedo confirmada.`
                                  : "Lista para enviarse con mejor presentacion desde el primer contacto."}
                              </p>
                            </div>

                            <div className="border border-ink/15 bg-white p-4 shadow-plate-sm">
                              <div className="flex items-center gap-3">
                                <MessageSquareMore className="h-4 w-4 text-industrial-gold" />
                                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                                  Continuidad comercial
                                </p>
                              </div>
                              <p className="mt-3 text-sm leading-7 text-ink">
                                {whatsappTriggered
                                  ? "La solicitud ya puede pasar a seguimiento interno con mas orden."
                                  : "Descarga la pre-cotizacion o abre la vista interna para continuar."}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <PrimaryButton
                            onClick={() => {
                              if (latestLead) {
                                onDownloadPdf?.(latestLead);
                              }
                            }}
                            type="button"
                            variant="secondary"
                          >
                            Descargar pre-cotizacion
                          </PrimaryButton>

                          <PrimaryButton
                            onClick={triggerWhatsapp}
                            type="button"
                            variant="secondary"
                          >
                            Confirmar por WhatsApp
                          </PrimaryButton>

                          <PrimaryButton
                            onClick={onOpenAdmin}
                            type="button"
                          >
                            Ver seguimiento interno
                            <ArrowRight className="h-4 w-4" />
                          </PrimaryButton>
                        </div>

                        <p className="border border-ink/15 bg-white px-5 py-4 text-sm leading-7 text-graphite/84 shadow-plate-sm">
                          Rango preliminar sujeto a levantamiento y validacion tecnica en sitio.
                        </p>
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
