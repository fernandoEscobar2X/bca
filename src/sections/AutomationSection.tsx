import { motion } from "framer-motion";
import { ArrowRight, BellRing, FileText, LayoutPanelTop } from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { SectionIntro } from "../components/ui/SectionIntro";
import { StatusBadge } from "../components/ui/StatusBadge";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import type { OperationEvent } from "../content/automationContent";
import { cn } from "../lib/cn";
import { plateSpring, revealUp } from "../lib/motion";
import { formatCurrency, type LeadRecord } from "../lib/quote";

type AutomationSectionProps = {
  latestLead: LeadRecord | null;
  leads: LeadRecord[];
  onDownloadPdf: (lead: LeadRecord) => void;
  onOpenAdmin: () => void;
  onSimulateWhatsapp: (lead: LeadRecord) => void;
  operationEvents: OperationEvent[];
};

export function AutomationSection({
  latestLead,
  leads,
  onDownloadPdf,
  onOpenAdmin,
  onSimulateWhatsapp,
  operationEvents,
}: AutomationSectionProps) {
  const previewLead = latestLead ?? leads[0] ?? null;

  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="modulos">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            aside={
              <PrimaryButton onClick={onOpenAdmin} type="button">
                Abrir panel demo
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            }
            description="El flujo ya no termina en la banda preliminar. Aqui se ve como el lead entra a seguimiento, activa acciones comerciales y alimenta un panel privado listo para operar."
            eyebrow="Operacion conectada"
            title="Vista previa del sistema comercial que vive detras del Lead Terminal."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_380px]">
          <motion.div {...revealUp}>
            <SurfaceCard className="overflow-hidden">
              <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1fr)_220px]">
                <div className="bg-white px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center border border-ink bg-surface shadow-plate-sm">
                      <LayoutPanelTop className="h-5 w-5 text-ink" />
                    </div>
                    <div>
                      <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                        Panel BCA
                      </p>
                      <h3 className="mt-2 font-display text-[clamp(1.7rem,2.8vw,2.6rem)] font-bold leading-[0.96] tracking-[-0.04em] text-ink">
                        Prospectos, estados y seguimiento en una sola vista.
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="bg-industrial-gold px-5 py-5">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">Leads activos</p>
                  <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">{leads.length}</p>
                </div>
              </div>

              <div className="divide-y divide-ink/10">
                {leads.slice(0, 4).map((lead, index) => (
                  <motion.div
                    className={cn(
                      "grid gap-4 px-5 py-4 md:grid-cols-[120px_minmax(0,1fr)_160px_160px]",
                      index === 0 && latestLead ? "bg-surface" : "bg-white",
                    )}
                    key={lead.id}
                    transition={{ ...plateSpring, delay: index * 0.03 }}
                    whileHover={{ x: -3, y: -3 }}
                  >
                    <div>
                      <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">{lead.id}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-graphite/62">{lead.requestedAt}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink">{lead.company}</p>
                      <p className="mt-1 text-sm leading-6 text-graphite/82">
                        {lead.projectTypeLabel} / {lead.specialtyLabel}
                      </p>
                    </div>

                    <div className="text-sm leading-6 text-graphite/82">
                      <p>{lead.contactName}</p>
                      <p>{lead.location}</p>
                    </div>

                    <div className="flex items-center justify-start md:justify-end">
                      <StatusBadge compact status={lead.status} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </SurfaceCard>
          </motion.div>

          <div className="grid gap-5">
            <motion.div {...revealUp}>
              <SurfaceCard className="overflow-hidden">
                <div className="border-b border-ink/10 bg-white px-5 py-4">
                  <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Eventos operativos
                  </p>
                </div>
                <div className="space-y-4 bg-surface p-5">
                  {operationEvents.slice(0, 4).map((event) => (
                    <div className="flex gap-3 border border-ink/10 bg-white px-4 py-4 shadow-plate-sm" key={event.id}>
                      <span
                        className={cn(
                          "mt-1 block h-2.5 w-2.5 shrink-0",
                          event.accent === "cyan"
                            ? "bg-hydro-cyan"
                            : event.accent === "gold"
                              ? "bg-industrial-gold"
                              : "bg-ink",
                        )}
                      />
                      <div>
                        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite/70">
                          {event.time}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-ink">{event.title}</p>
                        <p className="mt-1 text-sm leading-6 text-graphite/82">{event.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </motion.div>

            {previewLead ? (
              <motion.div {...revealUp}>
                <SurfaceCard className="overflow-hidden">
                  <div className="grid gap-px bg-concrete">
                    <div className="grid gap-px bg-concrete sm:grid-cols-[72px_minmax(0,1fr)]">
                      <div className="flex items-center justify-center bg-hydro-cyan p-4">
                        <BellRing className="h-6 w-6 text-ink" />
                      </div>
                      <div className="bg-white px-5 py-4">
                        <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                          Salidas del lead activo
                        </p>
                        <p className="mt-2 text-sm leading-7 text-graphite/82">
                          El lead {previewLead.id} ya puede disparar WhatsApp y generar el PDF sin salir del flujo.
                        </p>
                      </div>
                    </div>

                    <div className="bg-surface p-5">
                      <div className="border border-ink bg-white px-5 py-5 shadow-plate-sm">
                        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                          {previewLead.company}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-ink">
                          {previewLead.specialtyLabel} / {previewLead.squareMeters} m2 /{" "}
                          {formatCurrency(previewLead.estimate.minimum)} - {formatCurrency(previewLead.estimate.maximum)}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <PrimaryButton
                          onClick={() => onSimulateWhatsapp(previewLead)}
                          type="button"
                          variant="secondary"
                        >
                          Simular WhatsApp
                        </PrimaryButton>
                        <PrimaryButton
                          onClick={() => onDownloadPdf(previewLead)}
                          type="button"
                          variant="secondary"
                        >
                          <FileText className="h-4 w-4 text-hydro-cyan" />
                          Descargar PDF
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                </SurfaceCard>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
