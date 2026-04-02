import { ArrowRight, FileText, MessageSquareMore } from "lucide-react";
import { motion } from "framer-motion";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { SectionIntro } from "../components/ui/SectionIntro";
import { StatusBadge } from "../components/ui/StatusBadge";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { cn } from "../lib/cn";
import { revealUp } from "../lib/motion";
import { formatCurrency, type LeadRecord } from "../lib/quote";

type PanelPreviewSectionProps = {
  leads: LeadRecord[];
  onOpenAdmin: () => void;
};

export function PanelPreviewSection({ leads, onOpenAdmin }: PanelPreviewSectionProps) {
  const previewLeads = leads.slice(0, 3);
  const activeLead = previewLeads[0] ?? null;

  return (
    <section className="border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="seguimiento">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            aside={
              <PrimaryButton onClick={onOpenAdmin} type="button" variant="secondary">
                Acceso interno
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            }
            description="La nueva presencia digital de BCA no solo capta mejor: tambien ayuda a responder con mas orden, mejor presentacion y una continuidad comercial mas clara."
            eyebrow="Respuesta y seguimiento"
            title="Una experiencia mas formal desde la solicitud inicial hasta la respuesta."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_380px]">
          <motion.div {...revealUp}>
            <SurfaceCard className="overflow-hidden">
              <div className="border-b border-ink/10 bg-white px-5 py-4">
                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_140px_160px]">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Seguimiento interno</p>
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Estado</p>
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Siguiente paso</p>
                </div>
              </div>

              <div className="divide-y divide-ink/10 bg-white">
                {previewLeads.map((lead) => (
                  <div
                    className={cn(
                      "grid gap-4 px-5 py-4 md:grid-cols-[minmax(0,1fr)_140px_160px]",
                      activeLead?.id === lead.id ? "bg-surface" : "bg-white",
                    )}
                    key={lead.id}
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink">{lead.company}</p>
                      <p className="mt-1 text-sm leading-6 text-graphite/82">
                        {lead.contactName} / {lead.specialtyLabel}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <StatusBadge compact status={lead.status} />
                    </div>
                    <div className="flex items-center text-sm font-semibold text-ink">
                      {lead.status === "Nuevo"
                        ? "Contacto inicial"
                        : lead.status === "En revision"
                          ? "Enviar pre-cotizacion"
                          : "Seguimiento"}
                    </div>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </motion.div>

          {activeLead ? (
            <motion.div className="grid gap-5" {...revealUp}>
              <SurfaceCard className="overflow-hidden">
                <div className="border-b border-ink/10 bg-white px-5 py-4">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Confirmacion inmediata
                  </p>
                </div>
                <div className="bg-white px-5 py-5">
                  <div className="inline-flex items-center gap-2 border border-ink/10 bg-surface px-3 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">
                    <MessageSquareMore className="h-4 w-4" />
                    WhatsApp
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink">
                    Hola {activeLead.contactName}, recibimos tu solicitud para {activeLead.specialtyLabel}. En breve
                    revisamos los datos para continuar con la atencion.
                  </p>
                </div>
              </SurfaceCard>

              <SurfaceCard className="overflow-hidden">
                <div className="border-b border-ink/10 bg-white px-5 py-4">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Pre-cotizacion lista para enviar
                  </p>
                </div>
                <div className="bg-white px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center border border-ink/10 bg-surface">
                      <FileText className="h-5 w-5 text-hydro-cyan" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{activeLead.company}</p>
                      <p className="mt-1 text-sm leading-6 text-graphite/72">
                        {formatCurrency(activeLead.estimate.minimum)} - {formatCurrency(activeLead.estimate.maximum)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink">
                    Una mejor presentacion tambien ayuda a que BCA responda con mas formalidad desde la etapa preliminar.
                  </p>
                </div>
              </SurfaceCard>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
