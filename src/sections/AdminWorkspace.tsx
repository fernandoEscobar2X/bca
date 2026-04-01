import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BellRing,
  FileText,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { StatusBadge } from "../components/ui/StatusBadge";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { demoAdminCredentials, leadStatusOptions, type OperationEvent } from "../content/automationContent";
import { cn } from "../lib/cn";
import { revealUp } from "../lib/motion";
import { formatCurrency, type LeadRecord, type LeadStatus } from "../lib/quote";

type AdminWorkspaceProps = {
  leads: LeadRecord[];
  operationEvents: OperationEvent[];
  onClose: () => void;
  onDownloadPdf: (lead: LeadRecord) => void;
  onSelectLead: (leadId: string) => void;
  onSimulateWhatsapp: (lead: LeadRecord) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
  selectedLeadId: string;
};

export function AdminWorkspace({
  leads,
  operationEvents,
  onClose,
  onDownloadPdf,
  onSelectLead,
  onSimulateWhatsapp,
  onStatusChange,
  selectedLeadId,
}: AdminWorkspaceProps) {
  const [credentials, setCredentials] = useState(demoAdminCredentials);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "Todos">("Todos");

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId) ?? leads[0] ?? null;
  const visibleLeads = statusFilter === "Todos" ? leads : leads.filter((lead) => lead.status === statusFilter);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password.trim();

    if (email === demoAdminCredentials.email && password === demoAdminCredentials.password) {
      setIsAuthenticated(true);
      setLoginError("");
      return;
    }

    setLoginError("Credenciales demo incorrectas. Usa el acceso sugerido para revisar el panel.");
  };

  return (
    <section className="min-h-screen bg-surface text-ink">
      <div className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <button
              className="inline-flex items-center gap-2 border border-ink/15 bg-surface px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
              onClick={onClose}
              type="button"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al sitio
            </button>

            <div className="min-w-0">
              <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                Panel privado BCA
              </p>
              <h1 className="mt-2 truncate font-display text-[clamp(1.55rem,2vw,2.4rem)] font-bold leading-none tracking-[-0.04em] text-ink">
                Gestor de prospectos y seguimiento operativo
              </h1>
            </div>
          </div>

          {isAuthenticated ? (
            <button
              className="inline-flex items-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
              onClick={() => setIsAuthenticated(false)}
              type="button"
            >
              <LogOut className="h-4 w-4 text-hydro-cyan" />
              Salir demo
            </button>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-[92rem] px-5 py-8 sm:px-6 lg:px-8">
        {!isAuthenticated ? (
          <motion.div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]" {...revealUp}>
            <SurfaceCard className="overflow-hidden">
              <div className="grid gap-px bg-concrete lg:grid-cols-3">
                <div className="bg-ink px-5 py-5 text-white">
                  <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Vista operativa</p>
                  <p className="mt-3 text-sm leading-7 text-white/84">
                    Acceso privado para ordenar leads del terminal, mover estados y operar el seguimiento sin Excel.
                  </p>
                </div>
                <div className="bg-white px-5 py-5">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Leads activos</p>
                  <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">{leads.length}</p>
                </div>
                <div className="bg-industrial-gold px-5 py-5">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">Acceso demo</p>
                  <p className="mt-3 text-sm leading-7 text-ink">admin@bca-demo.mx / BCA2026</p>
                </div>
              </div>

              <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="bg-surface p-6 sm:p-8">
                    <div className="space-y-4">
                      {leads.slice(0, 3).map((lead) => (
                      <div
                        className="grid gap-4 border border-ink/10 bg-white px-4 py-4 shadow-plate-sm md:grid-cols-[140px_minmax(0,1fr)_160px]"
                        key={lead.id}
                      >
                        <div>
                          <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">{lead.id}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-graphite/62">{lead.requestedAt}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ink">{lead.company}</p>
                          <p className="mt-1 text-sm leading-6 text-graphite/78">{lead.contactName}</p>
                        </div>
                        <div className="flex items-center md:justify-end">
                          <StatusBadge compact status={lead.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 sm:p-8">
                  <form className="space-y-5" onSubmit={handleLogin}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center border border-ink/10 bg-surface">
                        <LockKeyhole className="h-5 w-5 text-ink" />
                      </div>
                      <div>
                        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                          Acceso privado demo
                        </p>
                        <p className="mt-1 text-sm text-graphite/82">Login obligatorio para mantener la logica del sistema.</p>
                      </div>
                    </div>

                    <label className="block">
                      <span className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Correo</span>
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
                    </label>

                    <label className="block">
                      <span className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Clave</span>
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
                    </label>

                    {loginError ? (
                      <p className="border border-[#d9b4b4] bg-[#fff1f1] px-4 py-3 text-sm leading-6 text-[#8f2d2d]">
                        {loginError}
                      </p>
                    ) : null}

                    <PrimaryButton className="w-full justify-center" type="submit">
                      Entrar al panel demo
                    </PrimaryButton>
                  </form>
                </div>
              </div>
            </SurfaceCard>
          </motion.div>
        ) : (
          <motion.div className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)_360px]" {...revealUp}>
            <div className="space-y-5">
              <SurfaceCard className="p-5">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Resumen</p>
                <div className="mt-5 space-y-4">
                  <div className="border border-ink/10 bg-surface px-4 py-4">
                    <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Nuevos</p>
                    <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">
                      {leads.filter((lead) => lead.status === "Nuevo").length}
                    </p>
                  </div>
                  <div className="border border-ink/10 bg-surface px-4 py-4">
                    <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">En revision</p>
                    <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">
                      {leads.filter((lead) => lead.status === "En revision").length}
                    </p>
                  </div>
                  <div className="border border-ink/10 bg-surface px-4 py-4">
                    <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Contactados</p>
                    <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">
                      {leads.filter((lead) => lead.status === "Contactado").length}
                    </p>
                  </div>
                </div>
              </SurfaceCard>

              <SurfaceCard className="p-5">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Filtrar estado</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {(["Todos", ...leadStatusOptions] as const).map((status) => (
                    <button
                      className={cn(
                        "border px-3 py-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] shadow-plate-sm transition-colors",
                        statusFilter === status ? "border-ink bg-industrial-gold text-ink" : "border-ink/15 bg-white text-graphite",
                      )}
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      type="button"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </SurfaceCard>
            </div>

            <SurfaceCard className="overflow-hidden">
              <div className="border-b border-ink/10 bg-white px-5 py-4">
                <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Prospectos</p>
                <p className="mt-2 text-sm leading-7 text-graphite/82">Vista privada de leads generados por el terminal.</p>
              </div>

              <div className="divide-y divide-ink/10">
                {visibleLeads.map((lead) => (
                  <button
                    className={cn(
                      "grid w-full gap-4 px-5 py-4 text-left transition-colors md:grid-cols-[120px_minmax(0,1fr)_150px]",
                      selectedLeadId === lead.id ? "bg-surface" : "bg-white hover:bg-surface/70",
                    )}
                    key={lead.id}
                    onClick={() => onSelectLead(lead.id)}
                    type="button"
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

                    <div className="flex items-center justify-start md:justify-end">
                      <StatusBadge compact status={lead.status} />
                    </div>
                  </button>
                ))}
              </div>
            </SurfaceCard>

            <div className="space-y-5">
              {selectedLead ? (
                <>
                  <SurfaceCard className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                          Lead activo
                        </p>
                        <h2 className="mt-3 font-display text-[clamp(1.5rem,2.1vw,2.2rem)] font-bold leading-[0.96] tracking-[-0.04em] text-ink">
                          {selectedLead.company}
                        </h2>
                      </div>
                      <StatusBadge status={selectedLead.status} />
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="border border-ink/10 bg-surface px-4 py-4">
                        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Contacto</p>
                        <p className="mt-2 text-sm leading-6 text-ink">{selectedLead.contactName}</p>
                        <p className="text-sm leading-6 text-ink">{selectedLead.phone}</p>
                      </div>
                      <div className="border border-ink/10 bg-surface px-4 py-4">
                        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Correo</p>
                        <p className="mt-2 text-sm leading-6 text-ink">{selectedLead.email}</p>
                      </div>
                      <div className="border border-ink/10 bg-surface px-4 py-4">
                        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Proyecto</p>
                        <p className="mt-2 text-sm leading-6 text-ink">{selectedLead.location}</p>
                        <p className="text-sm leading-6 text-ink">{selectedLead.squareMeters} m2</p>
                      </div>
                      <div className="border border-ink/10 bg-industrial-gold px-4 py-4">
                        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">Rango</p>
                        <p className="mt-2 text-sm leading-6 text-ink">
                          {formatCurrency(selectedLead.estimate.minimum)} - {formatCurrency(selectedLead.estimate.maximum)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
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
                            onClick={() => onStatusChange(selectedLead.id, status)}
                            type="button"
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <PrimaryButton
                        onClick={() => onDownloadPdf(selectedLead)}
                        type="button"
                        variant="secondary"
                      >
                        <FileText className="h-4 w-4 text-hydro-cyan" />
                        PDF
                      </PrimaryButton>
                      <PrimaryButton
                        onClick={() => onSimulateWhatsapp(selectedLead)}
                        type="button"
                        variant="secondary"
                      >
                        <BellRing className="h-4 w-4 text-hydro-cyan" />
                        WhatsApp
                      </PrimaryButton>
                    </div>
                  </SurfaceCard>

                  <SurfaceCard className="p-5">
                    <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                      Actividad reciente
                    </p>
                    <div className="mt-5 space-y-4">
                      {operationEvents.slice(0, 5).map((event) => (
                        <div className="flex gap-3 border border-ink/10 bg-surface px-4 py-4">
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
                </>
              ) : (
                <SurfaceCard className="p-5">
                  <div className="flex items-center gap-3">
                    <UserRound className="h-5 w-5 text-hydro-cyan" />
                    <p className="text-sm text-graphite/82">Aun no hay un lead activo para revisar.</p>
                  </div>
                </SurfaceCard>
              )}

              <SurfaceCard className="p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-hydro-cyan" />
                  <p className="text-sm leading-7 text-graphite/82">
                    Este panel sigue siendo demo, pero ya replica el comportamiento central que el cliente quiere probar:
                    acceso privado, filtros, estados y acciones sobre el lead.
                  </p>
                </div>
              </SurfaceCard>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
