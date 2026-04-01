import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BellRing,
  CheckCircle2,
  FileText,
  LayoutPanelTop,
  LockKeyhole,
  MessageSquareMore,
  PhoneCall,
} from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { SectionIntro } from "../components/ui/SectionIntro";
import { StatusBadge } from "../components/ui/StatusBadge";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { demoAdminCredentials, initialLeadRecords, leadStatusOptions, operationSignals } from "../content/automationContent";
import { automationModules } from "../content/siteContent";
import { cn } from "../lib/cn";
import { plateSpring, revealUp } from "../lib/motion";
import { downloadPrequotePdf } from "../lib/pdf";
import { formatCurrency, type LeadRecord, type LeadStatus } from "../lib/quote";

type AutomationSectionProps = {
  latestLead: LeadRecord | null;
};

type ModuleCardProps = {
  accent: "cyan" | "gold";
  code: string;
  description: string;
  price: string;
  title: string;
};

function ModuleCard({ accent, code, description, price, title }: ModuleCardProps) {
  return (
    <div className="grid gap-px border border-ink/15 bg-concrete shadow-plate-sm">
      <div className="grid gap-px bg-concrete sm:grid-cols-[130px_minmax(0,1fr)_180px]">
        <div className={cn("px-4 py-4 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink", accent === "gold" ? "bg-industrial-gold" : "bg-hydro-cyan")}>
          {code}
        </div>
        <div className="bg-white px-4 py-4">
          <p className="font-display text-[1.2rem] font-bold leading-none tracking-[-0.03em] text-ink">{title}</p>
        </div>
        <div className="bg-white px-4 py-4 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
          {price}
        </div>
      </div>
      <div className="bg-surface px-4 py-4 text-sm leading-7 text-graphite/84">{description}</div>
    </div>
  );
}

export function AutomationSection({ latestLead }: AutomationSectionProps) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState(demoAdminCredentials);
  const [loginError, setLoginError] = useState("");
  const [panelLeads, setPanelLeads] = useState<LeadRecord[]>(() => [...initialLeadRecords]);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "Todos">("Todos");
  const [selectedLeadId, setSelectedLeadId] = useState<string>(initialLeadRecords[0]?.id ?? "");

  useEffect(() => {
    if (!latestLead) {
      return;
    }

    setPanelLeads((current) => {
      if (current.some((lead) => lead.id === latestLead.id)) {
        return current;
      }

      return [latestLead, ...current];
    });

    setSelectedLeadId(latestLead.id);
  }, [latestLead]);

  const visibleLeads =
    statusFilter === "Todos" ? panelLeads : panelLeads.filter((lead) => lead.status === statusFilter);

  const selectedLead =
    panelLeads.find((lead) => lead.id === selectedLeadId) ?? latestLead ?? panelLeads[0] ?? null;

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password.trim();

    if (email === demoAdminCredentials.email && password === demoAdminCredentials.password) {
      setIsAdminAuthenticated(true);
      setLoginError("");
      return;
    }

    setLoginError("Credenciales demo incorrectas. Usa el acceso interno sugerido.");
  };

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    setPanelLeads((current) => current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)));
  };

  const selectedLeadClientMessage = selectedLead
    ? `Recibimos tu solicitud para ${selectedLead.specialtyLabel.toLowerCase()} en ${selectedLead.projectTypeLabel.toLowerCase()}. Nuestro equipo revisara el levantamiento preliminar y te contactara con la siguiente accion.`
    : "Completa el simulador para generar la confirmacion automatica al cliente.";

  const selectedLeadAssistantMessage = selectedLead
    ? `Nuevo lead ${selectedLead.id}. ${selectedLead.projectTypeLabel} / ${selectedLead.specialtyLabel} / ${selectedLead.squareMeters} m2 / banda ${formatCurrency(selectedLead.estimate.minimum)} - ${formatCurrency(selectedLead.estimate.maximum)}.`
    : "Aun no hay un lead nuevo en esta sesion.";

  const countByStatus = (status: LeadStatus) => panelLeads.filter((lead) => lead.status === status).length;

  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="modulos">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            aside={<PrimaryButton href="#cotizador">Capturar lead demo</PrimaryButton>}
            description="Despues de la captura, el flujo ya no se queda en correo. Este bloque demuestra como BCA puede ordenar prospectos, confirmar por WhatsApp y sacar una pre-cotizacion lista para mover la siguiente conversacion."
            eyebrow="Modulos operativos"
            title="Tres modulos que convierten una landing atractiva en una herramienta comercial mucho mas convincente."
          />
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {automationModules.map((module, index) => (
            <motion.div {...revealUp} key={module.code} transition={{ ...plateSpring, delay: index * 0.04 }}>
              <ModuleCard
                accent={index === 1 ? "cyan" : "gold"}
                code={module.code}
                description={module.description}
                price={module.price}
                title={module.title}
              />
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-5 grid gap-px border border-ink bg-concrete shadow-plate-sm md:grid-cols-3" {...revealUp}>
          {operationSignals.map((signal, index) => (
            <div className="bg-ink px-4 py-4" key={signal}>
              <span className={cn("mb-3 block h-1 w-16", index === 1 ? "bg-industrial-gold" : "bg-hydro-cyan")} />
              <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white">{signal}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,1.18fr)_380px]">
          <motion.div {...revealUp}>
            <SurfaceCard className="overflow-hidden">
              <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="bg-white px-5 py-5 sm:px-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center border border-ink bg-surface shadow-plate-sm">
                      <LayoutPanelTop className="h-5 w-5 text-ink" />
                    </div>
                    <div>
                      <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                        BCA Lead Panel
                      </p>
                      <h3 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[0.96] tracking-[-0.04em] text-ink">
                        Control privado de prospectos con acceso demo admin.
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-graphite/84 sm:text-base">
                    El mismo lead que el cliente captura arriba entra aqui con un estado inicial, responsable y una vista ordenada
                    para seguimiento. La demo incluye cambio de estado para mostrar el valor sin prometer backend real todavia.
                  </p>
                </div>

                <div className="grid gap-px bg-concrete">
                  <div className="bg-industrial-gold px-5 py-4">
                    <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink">
                      Implementacion
                    </p>
                    <p className="mt-2 text-xl font-semibold text-ink">$1,800 MXN</p>
                  </div>
                  <div className="bg-white px-5 py-4">
                    <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                      Acceso demo
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ink">admin@bca-demo.mx / BCA2026</p>
                  </div>
                </div>
              </div>

              {!isAdminAuthenticated ? (
                <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="bg-surface p-6 sm:p-8">
                    <div className="border border-ink/15 bg-white p-5 shadow-plate-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center border border-ink/10 bg-surface">
                          <LockKeyhole className="h-5 w-5 text-ink" />
                        </div>
                        <div>
                          <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                            Login demo
                          </p>
                          <p className="mt-1 text-sm text-graphite/82">Muestra acceso interno sin sacar al cliente de la home.</p>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="border border-ink/10 bg-surface px-4 py-4">
                          <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Nuevos</p>
                          <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">
                            {countByStatus("Nuevo")}
                          </p>
                        </div>
                        <div className="border border-ink/10 bg-surface px-4 py-4">
                          <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                            En revision
                          </p>
                          <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">
                            {countByStatus("En revision")}
                          </p>
                        </div>
                        <div className="border border-ink/10 bg-surface px-4 py-4">
                          <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                            Contactados
                          </p>
                          <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">
                            {countByStatus("Contactado")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 sm:p-8">
                    <form className="space-y-5" onSubmit={handleLogin}>
                      <div>
                        <label className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                          Correo demo
                        </label>
                        <input
                          className="mt-2 w-full border border-ink/15 bg-surface px-4 py-3 text-sm text-ink outline-none shadow-plate-sm"
                          onChange={(event) =>
                            setCredentials((current) => ({
                              ...current,
                              email: event.target.value,
                            }))
                          }
                          type="email"
                          value={credentials.email}
                        />
                      </div>

                      <div>
                        <label className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                          Clave demo
                        </label>
                        <input
                          className="mt-2 w-full border border-ink/15 bg-surface px-4 py-3 text-sm text-ink outline-none shadow-plate-sm"
                          onChange={(event) =>
                            setCredentials((current) => ({
                              ...current,
                              password: event.target.value,
                            }))
                          }
                          type="password"
                          value={credentials.password}
                        />
                      </div>

                      {loginError ? (
                        <p className="border border-[#d9b4b4] bg-[#fff1f1] px-4 py-3 text-sm leading-6 text-[#8f2d2d]">
                          {loginError}
                        </p>
                      ) : null}

                      <PrimaryButton className="w-full justify-center" type="submit">
                        Ingresar al panel demo
                      </PrimaryButton>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="grid gap-px bg-concrete xl:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.76fr)]">
                  <div className="bg-white">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {(["Todos", ...leadStatusOptions] as const).map((status) => (
                          <button
                            className={cn(
                              "border px-3 py-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] shadow-plate-sm transition-colors",
                              statusFilter === status
                                ? "border-ink bg-industrial-gold text-ink"
                                : "border-ink/15 bg-white text-graphite",
                            )}
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            type="button"
                          >
                            {status}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <StatusBadge status="Nuevo" compact />
                        <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/70">
                          admin conectado
                        </p>
                      </div>
                    </div>

                    <div className="divide-y divide-ink/10">
                      {visibleLeads.map((lead) => (
                        <button
                          className={cn(
                            "grid w-full gap-4 px-5 py-4 text-left transition-colors md:grid-cols-[140px_minmax(0,1fr)_150px_160px]",
                            selectedLeadId === lead.id ? "bg-surface" : "bg-white hover:bg-surface/70",
                          )}
                          key={lead.id}
                          onClick={() => setSelectedLeadId(lead.id)}
                          type="button"
                        >
                          <div>
                            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">{lead.id}</p>
                            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-graphite/62">{lead.requestedAt}</p>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-ink">{lead.company}</p>
                            <p className="mt-1 text-sm leading-6 text-graphite/80">
                              {lead.projectTypeLabel} / {lead.specialtyLabel}
                            </p>
                          </div>

                          <div className="text-sm leading-6 text-graphite/82">
                            <p>{lead.squareMeters} m2</p>
                            <p>{lead.location}</p>
                          </div>

                          <div className="flex items-center justify-start md:justify-end">
                            <StatusBadge compact status={lead.status} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-surface p-5 sm:p-6">
                    {selectedLead ? (
                      <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-5">
                          <div>
                            <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                              Prospecto activo
                            </p>
                            <h4 className="mt-3 font-display text-[clamp(1.5rem,2.4vw,2.2rem)] font-bold leading-[0.96] tracking-[-0.04em] text-ink">
                              {selectedLead.company}
                            </h4>
                          </div>
                          <StatusBadge status={selectedLead.status} />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="border border-ink/10 bg-white px-4 py-4">
                            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Canal</p>
                            <p className="mt-2 text-sm leading-6 text-ink">{selectedLead.channel}</p>
                          </div>
                          <div className="border border-ink/10 bg-white px-4 py-4">
                            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Responsable</p>
                            <p className="mt-2 text-sm leading-6 text-ink">{selectedLead.assignedTo}</p>
                          </div>
                          <div className="border border-ink/10 bg-white px-4 py-4">
                            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Contacto</p>
                            <p className="mt-2 text-sm leading-6 text-ink">{selectedLead.phone}</p>
                            <p className="text-sm leading-6 text-ink">{selectedLead.email}</p>
                          </div>
                          <div className="border border-ink/10 bg-industrial-gold px-4 py-4">
                            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">
                              Banda preliminar
                            </p>
                            <p className="mt-2 text-sm leading-6 text-ink">
                              {formatCurrency(selectedLead.estimate.minimum)} - {formatCurrency(selectedLead.estimate.maximum)}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">
                            Actualizar estado
                          </p>
                          <div className="mt-3 flex flex-wrap gap-3">
                            {leadStatusOptions.map((status) => (
                              <button
                                className={cn(
                                  "border px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] shadow-plate-sm transition-colors",
                                  selectedLead.status === status
                                    ? "border-ink bg-industrial-gold text-ink"
                                    : "border-ink/15 bg-white text-graphite",
                                )}
                                key={status}
                                onClick={() => handleStatusChange(selectedLead.id, status)}
                                type="button"
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </SurfaceCard>
          </motion.div>

          <div className="grid gap-5">
            <motion.div {...revealUp}>
              <SurfaceCard className="overflow-hidden">
                <div className="grid gap-px bg-concrete">
                  <div className="grid gap-px bg-concrete sm:grid-cols-[72px_minmax(0,1fr)_180px]">
                    <div className="flex items-center justify-center bg-hydro-cyan p-4">
                      <MessageSquareMore className="h-6 w-6 text-ink" />
                    </div>
                    <div className="bg-white px-5 py-4">
                      <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                        WhatsApp Automatico
                      </p>
                      <p className="mt-2 text-sm leading-7 text-graphite/82">
                        Respuesta inmediata al cliente y alerta operativa al asistente.
                      </p>
                    </div>
                    <div className="bg-white px-5 py-4 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                      $1,200 MXN + API Meta
                    </div>
                  </div>

                  <div className="bg-surface p-5">
                    <div className="grid gap-4">
                      <div className="border border-ink/15 bg-white p-4 shadow-plate-sm">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-hydro-cyan" />
                          <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                            Cliente final
                          </p>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-ink">{selectedLeadClientMessage}</p>
                      </div>

                      <div className="border border-ink/15 bg-white p-4 shadow-plate-sm">
                        <div className="flex items-center gap-3">
                          <BellRing className="h-4 w-4 text-industrial-gold" />
                          <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                            Asistente BCA
                          </p>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-ink">{selectedLeadAssistantMessage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SurfaceCard>
            </motion.div>

            <motion.div {...revealUp}>
              <SurfaceCard className="overflow-hidden">
                <div className="grid gap-px bg-concrete">
                  <div className="grid gap-px bg-concrete sm:grid-cols-[72px_minmax(0,1fr)_140px]">
                    <div className="flex items-center justify-center bg-industrial-gold p-4">
                      <FileText className="h-6 w-6 text-ink" />
                    </div>
                    <div className="bg-white px-5 py-4">
                      <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                        Pre-Cotizacion PDF
                      </p>
                      <p className="mt-2 text-sm leading-7 text-graphite/82">
                        Documento corporativo listo para descargar desde el prototipo.
                      </p>
                    </div>
                    <div className="bg-white px-5 py-4 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                      $800 MXN
                    </div>
                  </div>

                  <div className="bg-surface p-5">
                    <div className="border border-ink bg-white shadow-plate">
                      <div className="border-b border-ink/10 px-5 py-4">
                        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">
                          Folio demo
                        </p>
                        <p className="mt-2 text-sm font-semibold text-ink">{selectedLead?.id ?? "Sin lead activo"}</p>
                      </div>
                      <div className="space-y-3 px-5 py-5 text-sm leading-7 text-ink">
                        <p>{selectedLead?.specialtyLabel ?? "Especialidad pendiente"}</p>
                        <p>{selectedLead?.projectTypeLabel ?? "Tipo de obra pendiente"}</p>
                        <p>{selectedLead ? `${selectedLead.squareMeters} m2` : "Metraje pendiente"}</p>
                        <p>
                          {selectedLead
                            ? `${formatCurrency(selectedLead.estimate.minimum)} - ${formatCurrency(selectedLead.estimate.maximum)}`
                            : "Banda preliminar pendiente"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <PrimaryButton
                        onClick={() => {
                          if (selectedLead) {
                            void downloadPrequotePdf(selectedLead);
                          }
                        }}
                        type="button"
                      >
                        Descargar PDF demo
                      </PrimaryButton>

                      <a
                        className="inline-flex items-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                        href={selectedLead ? `mailto:${selectedLead.email}` : "mailto:contacto@bcaingenieria.com"}
                      >
                        <PhoneCall className="h-4 w-4 text-hydro-cyan" />
                        Enviar al asistente
                      </a>
                    </div>
                  </div>
                </div>
              </SurfaceCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
