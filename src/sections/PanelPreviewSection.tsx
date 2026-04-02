import { ArrowRight, FileText, MessageSquareMore } from "lucide-react";
import { motion } from "framer-motion";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { StatusBadge } from "../components/ui/StatusBadge";
import { cn } from "../lib/cn";
import { revealUp } from "../lib/motion";
import { formatCurrency, type LeadRecord } from "../lib/quote";

type PanelPreviewSectionProps = {
  leads: LeadRecord[];
  onOpenAdmin: () => void;
};

const valuePoints = [
  "Confirmación inmediata de la solicitud",
  "Referencia preliminar mejor presentada",
  "Seguimiento más claro para no perder proyectos",
] as const;

export function PanelPreviewSection({ leads, onOpenAdmin }: PanelPreviewSectionProps) {
  const previewLeads = leads.slice(0, 3);
  const activeLead = previewLeads[0] ?? null;

  return (
    <section className="border-t border-b border-ink/10 bg-surface scroll-mt-20 md:scroll-mt-24 xl:scroll-mt-28" id="seguimiento">
      <div className="mx-auto max-w-[88rem] px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] xl:items-start">
          <motion.div className="space-y-6" {...revealUp}>
            <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan">
              Atención más clara
            </p>
            <h2 className="max-w-[12ch] font-display text-[clamp(1.95rem,3.6vw,3.2rem)] font-bold leading-[0.98] tracking-[-0.045em] text-ink">
              Una mejor respuesta desde la primera solicitud.
            </h2>
            <p className="max-w-[30rem] text-sm leading-7 text-graphite/84 sm:text-base">
              BCA puede recibir un proyecto con mejor orden, confirmar su recepción y presentar una referencia
              preliminar con más claridad comercial, sin depender de mensajes sueltos o seguimiento improvisado.
            </p>

            <div className="grid gap-3">
              {valuePoints.map((item, index) => (
                <div
                  className={cn(
                    "items-center gap-3 border border-ink/10 bg-white px-4 py-4 shadow-plate-sm",
                    index === 2 ? "hidden sm:flex" : "flex",
                  )}
                  key={item}
                >
                  <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-hydro-cyan" />
                  <p className="text-sm leading-6 text-ink">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton className="w-full justify-center sm:w-auto" href="#cotizador">
                Cotizar proyecto
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <button
                className="hidden font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-industrial-gold sm:inline-flex"
                onClick={onOpenAdmin}
                type="button"
              >
                Vista interna
              </button>
            </div>
          </motion.div>

          <motion.div className="grid gap-5" {...revealUp}>
            <div className="grid gap-4 lg:hidden">
              <div className="overflow-hidden border border-ink bg-white shadow-plate">
                <div className="border-b border-ink/10 bg-ink px-4 py-4 text-white">
                  <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Seguimiento visible
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/88">
                    Solicitudes con estado claro y siguiente paso a la vista.
                  </p>
                </div>

                <div className="divide-y divide-ink/10">
                  {previewLeads.slice(0, 2).map((lead) => (
                    <div className="space-y-3 px-4 py-4" key={lead.id}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                            {lead.id}
                          </p>
                          <p className="mt-2 text-base font-semibold leading-6 text-ink">{lead.company}</p>
                        </div>
                        <StatusBadge compact status={lead.status} />
                      </div>

                      <p className="text-sm leading-6 text-graphite/82">{lead.specialtyLabel}</p>
                      <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-graphite/66">
                        {lead.status === "Nuevo"
                          ? "Siguiente paso: Validar datos"
                          : lead.status === "En revisión"
                            ? "Siguiente paso: Enviar referencia"
                            : "Siguiente paso: Continuar contacto"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {activeLead ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border border-ink/10 bg-white p-4 shadow-plate-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center border border-ink/10 bg-surface">
                        <MessageSquareMore className="h-4 w-4 text-hydro-cyan" />
                      </div>
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-graphite">
                        Confirmación inmediata
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink">
                      El cliente recibe confirmación desde el primer contacto con una respuesta más clara.
                    </p>
                  </div>

                  <div className="border border-ink bg-industrial-gold p-4 shadow-plate-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center border border-ink/10 bg-white">
                        <FileText className="h-4 w-4 text-hydro-cyan" />
                      </div>
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/72">
                        Referencia lista
                      </p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink">
                      {formatCurrency(activeLead.estimate.minimum)} - {formatCurrency(activeLead.estimate.maximum)}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="hidden overflow-hidden border border-ink bg-white shadow-plate lg:block">
              <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1fr)_260px]">
                <div className="bg-white">
                  <div className="grid gap-px border-b border-ink/10 bg-concrete px-5 py-4 md:grid-cols-[minmax(0,1fr)_124px_170px]">
                    <p className="bg-white px-4 py-3 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                      Solicitud
                    </p>
                    <p className="bg-white px-4 py-3 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                      Estado
                    </p>
                    <p className="bg-white px-4 py-3 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                      Respuesta
                    </p>
                  </div>

                  <div className="divide-y divide-ink/10">
                    {previewLeads.map((lead, index) => (
                      <motion.div
                        className={cn(
                          "grid gap-4 px-5 py-5 md:grid-cols-[minmax(0,1fr)_124px_170px]",
                          index === 0 ? "bg-surface" : "bg-white",
                        )}
                        initial={{ opacity: 0, x: 12 }}
                        key={lead.id}
                        transition={{ delay: index * 0.05, duration: 0.35 }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, x: 0 }}
                      >
                        <div>
                          <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                            {lead.id}
                          </p>
                          <p className="mt-2 text-base font-semibold text-ink">{lead.company}</p>
                          <p className="mt-1 text-sm leading-6 text-graphite/84">{lead.specialtyLabel}</p>
                        </div>

                        <div className="flex items-center">
                          <StatusBadge compact status={lead.status} />
                        </div>

                        <div className="flex items-center text-sm font-semibold text-ink">
                          {lead.status === "Nuevo"
                            ? "Validar datos"
                            : lead.status === "En revisión"
                              ? "Enviar referencia"
                              : "Continuar contacto"}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {activeLead ? (
                  <div className="grid gap-px bg-concrete">
                    <div className="bg-ink px-5 py-5 text-white">
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                        Proyecto activo
                      </p>
                      <h3 className="mt-3 text-[1.8rem] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
                        {activeLead.company}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/90">
                        {activeLead.location} / {activeLead.squareMeters} m2
                      </p>
                    </div>

                    <div className="bg-white px-5 py-5">
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                        Rango preliminar
                      </p>
                      <p className="mt-3 text-xl font-semibold leading-tight text-ink">
                        {formatCurrency(activeLead.estimate.minimum)} - {formatCurrency(activeLead.estimate.maximum)}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {activeLead ? (
              <div className="hidden gap-5 lg:grid lg:grid-cols-2">
                <motion.div
                  className="border border-ink/10 bg-white p-5 shadow-plate-sm"
                  initial={{ opacity: 0, y: 14 }}
                  transition={{ delay: 0.12, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-ink/10 bg-surface">
                      <MessageSquareMore className="h-4 w-4 text-hydro-cyan" />
                    </div>
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-graphite">
                      Confirmacion inmediata
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink">
                    Hola {activeLead.contactName}, recibimos tu solicitud para {activeLead.specialtyLabel}. En breve
                    revisamos el proyecto para continuar.
                  </p>
                </motion.div>

                <motion.div
                  className="border border-ink bg-industrial-gold p-5 shadow-plate-sm"
                  initial={{ opacity: 0, y: 14 }}
                  transition={{ delay: 0.18, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-ink/10 bg-white">
                      <FileText className="h-4 w-4 text-hydro-cyan" />
                    </div>
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/72">
                      Pre-cotización lista
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink">
                    Folio {activeLead.id} preparado para presentarse con mejor formato y más claridad comercial.
                  </p>
                </motion.div>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
