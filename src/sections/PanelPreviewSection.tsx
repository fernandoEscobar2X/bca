import { ArrowRight, FileText, Mail, Phone } from "lucide-react";
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

const priorityTone = {
  Nuevo: "border-[#8ed8f5] bg-hydro-cyan/12 text-ink",
  "En revision": "border-[#e3cf74] bg-industrial-gold/16 text-ink",
  Contactado: "border-ink/15 bg-surface text-graphite",
} as const;

const nextAction = {
  Nuevo: "Llamar ahora",
  "En revision": "Enviar PDF",
  Contactado: "Dar seguimiento",
} as const;

export function PanelPreviewSection({ leads, onOpenAdmin }: PanelPreviewSectionProps) {
  const previewLeads = leads.slice(0, 4);
  const activeLead = previewLeads[0] ?? null;

  return (
    <section className="border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="panel">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            aside={
              <PrimaryButton onClick={onOpenAdmin} type="button">
                Abrir panel demo
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            }
            description="El panel se presenta como una extension natural de la marca: ordenado, claro y listo para dar seguimiento con mas formalidad."
            eyebrow="Preview del panel"
            title="Mas control comercial sin perder claridad de uso."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_360px]">
          <motion.div {...revealUp}>
            <SurfaceCard className="overflow-hidden">
              <div className="border-b border-ink/10 bg-white px-5 py-4">
                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_140px_140px_160px]">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Prospecto</p>
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Prioridad</p>
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Estado</p>
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Siguiente accion</p>
                </div>
              </div>

              <div className="divide-y divide-ink/10 bg-white">
                {previewLeads.map((lead) => (
                  <div
                    className={cn(
                      "grid gap-4 px-5 py-4 md:grid-cols-[minmax(0,1fr)_140px_140px_160px]",
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
                      <span
                        className={cn(
                          "inline-flex items-center border px-3 py-1.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
                          priorityTone[lead.status],
                        )}
                      >
                        {lead.status === "Nuevo" ? "Alta" : lead.status === "En revision" ? "Media" : "Baja"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <StatusBadge compact status={lead.status} />
                    </div>
                    <div className="flex items-center text-sm font-semibold text-ink">{nextAction[lead.status]}</div>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </motion.div>

          {activeLead ? (
            <motion.div {...revealUp}>
              <SurfaceCard className="overflow-hidden">
                <div className="border-b border-ink/10 bg-white px-5 py-5">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Lead seleccionado
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-ink">{activeLead.company}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite/76">
                    {activeLead.projectTypeLabel} / {activeLead.specialtyLabel} / {activeLead.squareMeters} m2
                  </p>
                </div>

                <div className="grid gap-px bg-concrete">
                  <div className="bg-white px-5 py-4">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">Contacto</p>
                    <p className="mt-3 text-sm font-semibold text-ink">{activeLead.contactName}</p>
                    <p className="mt-1 text-sm leading-6 text-ink">{activeLead.phone}</p>
                    <p className="text-sm leading-6 text-ink">{activeLead.email}</p>
                  </div>
                  <div className="bg-white px-5 py-4">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">Rango preliminar</p>
                    <p className="mt-3 text-base font-semibold text-ink">
                      {formatCurrency(activeLead.estimate.minimum)} - {formatCurrency(activeLead.estimate.maximum)}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 bg-surface px-5 py-5 sm:grid-cols-2">
                  <button className="inline-flex items-center justify-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm" type="button">
                    <Phone className="h-4 w-4 text-hydro-cyan" />
                    Llamar
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm" type="button">
                    <Mail className="h-4 w-4 text-hydro-cyan" />
                    Correo
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm" type="button">
                    WhatsApp
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm" type="button">
                    <FileText className="h-4 w-4 text-hydro-cyan" />
                    PDF
                  </button>
                </div>
              </SurfaceCard>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
