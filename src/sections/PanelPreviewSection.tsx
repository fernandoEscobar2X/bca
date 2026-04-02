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

export function PanelPreviewSection({ leads, onOpenAdmin }: PanelPreviewSectionProps) {
  const previewLeads = leads.slice(0, 3);
  const activeLead = previewLeads[0] ?? null;

  return (
    <section className="border-b border-ink/10 bg-ink text-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="seguimiento">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-start">
          <motion.div className="space-y-5" {...revealUp}>
            <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan">
              Atencion mas ordenada
            </p>
            <h2 className="max-w-[12ch] font-display text-[clamp(2.2rem,3.8vw,3.7rem)] font-bold leading-[0.96] tracking-[-0.045em] text-white">
              Mejor seguimiento comercial sin que BCA deje de verse tecnica y corporativa.
            </h2>
            <p className="max-w-lg text-sm leading-7 text-white/74 sm:text-base">
              El sitio no solo capta mejor. Tambien deja una confirmacion mas inmediata, una referencia mejor presentada
              y un seguimiento interno mas claro para no perder proyectos por falta de orden.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton onClick={onOpenAdmin} type="button" variant="secondary">
                Acceso interno
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <a
                className="font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:text-industrial-gold"
                href="#cotizador"
              >
                Probar cotizador
              </a>
            </div>
          </motion.div>

          <motion.div className="relative" {...revealUp}>
            <div className="overflow-hidden border border-white/10 bg-white shadow-plate">
              <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="bg-white">
                  <div className="grid gap-px border-b border-ink/10 bg-concrete px-5 py-4 md:grid-cols-[minmax(0,1fr)_124px_160px]">
                    <p className="bg-white px-4 py-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                      Prospecto
                    </p>
                    <p className="bg-white px-4 py-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                      Estado
                    </p>
                    <p className="bg-white px-4 py-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                      Siguiente paso
                    </p>
                  </div>

                  <div className="divide-y divide-ink/10">
                    {previewLeads.map((lead, index) => (
                      <motion.div
                        className={cn(
                          "grid gap-4 px-5 py-5 md:grid-cols-[minmax(0,1fr)_124px_160px]",
                          index === 0 ? "bg-surface" : "bg-white",
                        )}
                        initial={{ opacity: 0, x: 12 }}
                        key={lead.id}
                        transition={{ delay: index * 0.06, duration: 0.35 }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, x: 0 }}
                      >
                        <div>
                          <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                            {lead.id}
                          </p>
                          <p className="mt-2 text-base font-semibold text-ink">{lead.company}</p>
                          <p className="mt-1 text-sm leading-6 text-graphite/78">
                            {lead.contactName} / {lead.specialtyLabel}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <StatusBadge compact status={lead.status} />
                        </div>

                        <div className="flex items-center text-sm font-semibold text-ink">
                          {lead.status === "Nuevo"
                            ? "Llamar y validar"
                            : lead.status === "En revision"
                              ? "Enviar PDF"
                              : "Continuar seguimiento"}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {activeLead ? (
                  <div className="grid gap-px bg-concrete">
                    <div className="bg-ink px-5 py-5 text-white">
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                        Lead activo
                      </p>
                      <h3 className="mt-3 text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                        {activeLead.company}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/74">
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
              <>
                <motion.div
                  className="mt-5 grid gap-5 lg:absolute lg:-bottom-8 lg:left-10 lg:max-w-[280px]"
                  initial={{ opacity: 0, y: 18 }}
                  transition={{ delay: 0.18, duration: 0.45 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="border border-white/10 bg-white p-5 text-ink shadow-plate">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center border border-ink/10 bg-surface">
                        <MessageSquareMore className="h-4 w-4 text-hydro-cyan" />
                      </div>
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-graphite">
                        Confirmacion por WhatsApp
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-ink">
                      Hola {activeLead.contactName}, recibimos tu solicitud para {activeLead.specialtyLabel}. En breve
                      revisamos el proyecto para continuar.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-5 lg:absolute lg:-right-4 lg:bottom-10 lg:max-w-[260px]"
                  initial={{ opacity: 0, y: 18 }}
                  transition={{ delay: 0.24, duration: 0.45 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="border border-ink bg-industrial-gold p-5 text-ink shadow-plate">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center border border-ink/10 bg-white">
                        <FileText className="h-4 w-4 text-hydro-cyan" />
                      </div>
                      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/72">
                        Pre-cotizacion lista
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-ink">
                      Folio {activeLead.id} preparado para presentarse con mejor formato y mas claridad comercial.
                    </p>
                  </div>
                </motion.div>
              </>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
