import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BellRing,
  FileText,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  Search,
} from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { StatusBadge } from "../components/ui/StatusBadge";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { demoAdminCredentials, leadStatusOptions } from "../content/automationContent";
import { cn } from "../lib/cn";
import { revealUp } from "../lib/motion";
import { formatCurrency, type LeadRecord, type LeadStatus } from "../lib/quote";

type AdminWorkspaceProps = {
  leads: LeadRecord[];
  onClose: () => void;
  onDownloadPdf: (lead: LeadRecord) => void;
  onSelectLead: (leadId: string) => void;
  onSimulateWhatsapp: (lead: LeadRecord) => void;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
  selectedLeadId: string;
};

const statusRank: Record<LeadStatus, number> = {
  Nuevo: 0,
  "En revisión": 1,
  Contactado: 2,
};

const priorityMap: Record<
  LeadStatus,
  {
    label: string;
    tone: string;
    nextAction: string;
    queueLabel: string;
  }
> = {
  Nuevo: {
    label: "Alta",
    tone: "border-[#8ed8f5] bg-hydro-cyan/12 text-ink",
    nextAction: "Llamar y confirmar alcance",
    queueLabel: "Atender hoy",
  },
  "En revisión": {
    label: "Media",
    tone: "border-[#e3cf74] bg-industrial-gold/16 text-ink",
    nextAction: "Validar datos y enviar PDF",
    queueLabel: "Pendiente interno",
  },
  Contactado: {
    label: "Baja",
    tone: "border-ink/15 bg-surface text-graphite",
    nextAction: "Seguimiento comercial",
    queueLabel: "Seguimiento",
  },
};

function getPriorityConfig(status: LeadStatus) {
  return priorityMap[status];
}

export function AdminWorkspace({
  leads,
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
  const [searchTerm, setSearchTerm] = useState("");

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId) ?? leads[0] ?? null;

  const visibleLeads = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return leads
      .filter((lead) => {
        const statusMatch = statusFilter === "Todos" ? true : lead.status === statusFilter;
        const searchMatch =
          normalized.length === 0
            ? true
            : `${lead.id} ${lead.company} ${lead.contactName} ${lead.projectTypeLabel} ${lead.specialtyLabel} ${lead.location}`
                .toLowerCase()
                .includes(normalized);

        return statusMatch && searchMatch;
      })
      .sort((left, right) => statusRank[left.status] - statusRank[right.status]);
  }, [leads, searchTerm, statusFilter]);

  const totals = {
    total: leads.length,
    attention: leads.filter((lead) => lead.status !== "Contactado").length,
    nuevos: leads.filter((lead) => lead.status === "Nuevo").length,
    revision: leads.filter((lead) => lead.status === "En revisión").length,
    contactados: leads.filter((lead) => lead.status === "Contactado").length,
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password.trim();

    if (email === demoAdminCredentials.email && password === demoAdminCredentials.password) {
      setIsAuthenticated(true);
      setLoginError("");
      return;
    }

    setLoginError("Credenciales demo incorrectas.");
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-surface text-ink">
        <div className="mx-auto max-w-[92rem] px-5 py-8 sm:px-6 lg:px-8">
          <motion.div className="grid min-h-[calc(100vh-4rem)] gap-6 xl:grid-cols-[minmax(0,1.08fr)_420px]" {...revealUp}>
            <div className="flex flex-col justify-between border border-ink bg-white p-8 shadow-plate">
              <div>
                <button
                  className="inline-flex items-center gap-2 border border-ink/15 bg-surface px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                  onClick={onClose}
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver al sitio
                </button>

                <p className="mt-10 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                  Panel privado BCA
                </p>
                <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.1rem,3.5vw,3.7rem)] font-bold leading-[0.94] tracking-[-0.05em] text-ink">
                  Seguimiento diario para mesa comercial y operativa.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-graphite/84">
                  El panel está pensado para tres tareas: detectar qué entró, mover estado y accionar rápido con llamada,
                  WhatsApp o PDF.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="border border-ink/10 bg-surface px-4 py-4">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">En cola</p>
                  <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">{totals.attention}</p>
                </div>
                <div className="border border-ink/10 bg-surface px-4 py-4">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Nuevos</p>
                  <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">{totals.nuevos}</p>
                </div>
                <div className="border border-ink/10 bg-surface px-4 py-4">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Revisión</p>
                  <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">{totals.revision}</p>
                </div>
                <div className="border border-ink/10 bg-industrial-gold px-4 py-4">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">Acceso demo</p>
                  <p className="mt-3 text-sm leading-7 text-ink">admin@bca-demo.mx / BCA2026</p>
                </div>
              </div>
            </div>

            <SurfaceCard className="flex items-center">
              <div className="w-full p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center border border-ink/10 bg-surface">
                    <LockKeyhole className="h-5 w-5 text-ink" />
                  </div>
                  <div>
                    <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                      Acceso demo
                    </p>
                    <p className="mt-1 text-sm text-graphite/82">Login obligatorio para probar el flujo interno.</p>
                  </div>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleLogin}>
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
                    Entrar al panel
                  </PrimaryButton>
                </form>
              </div>
            </SurfaceCard>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-surface text-ink">
      <div className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-[96rem] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-start gap-4">
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
              <h1 className="mt-2 truncate font-display text-[clamp(1.6rem,2.3vw,2.8rem)] font-bold leading-none tracking-[-0.04em] text-ink">
                Panel operativo de prospectos
              </h1>
              <p className="mt-2 text-sm leading-6 text-graphite/76">
                Prioriza atención, estado y siguiente acción sin fricción.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="grid grid-cols-2 gap-px border border-ink/10 bg-concrete lg:grid-cols-4">
              <div className="bg-white px-4 py-3">
                <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-graphite">En cola</p>
                <p className="mt-2 text-lg font-semibold text-ink">{totals.attention}</p>
              </div>
              <div className="bg-white px-4 py-3">
                <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-graphite">Nuevos</p>
                <p className="mt-2 text-lg font-semibold text-ink">{totals.nuevos}</p>
              </div>
              <div className="bg-white px-4 py-3">
                <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-graphite">Revisión</p>
                <p className="mt-2 text-lg font-semibold text-ink">{totals.revision}</p>
              </div>
              <div className="bg-industrial-gold px-4 py-3">
                <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink">Cerrados</p>
                <p className="mt-2 text-lg font-semibold text-ink">{totals.contactados}</p>
              </div>
            </div>

            <button
              className="inline-flex items-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
              onClick={() => setIsAuthenticated(false)}
              type="button"
            >
              <LogOut className="h-4 w-4 text-hydro-cyan" />
              Salir
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[96rem] px-5 py-6 sm:px-6 lg:px-8">
        <motion.div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_360px]" {...revealUp}>
          <div className="space-y-5">
            <SurfaceCard className="overflow-hidden">
              <div className="border-b border-ink/10 bg-white px-5 py-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
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
                    <p className="text-sm leading-6 text-graphite/72">
                      Ordenado por prioridad operativa. Los leads nuevos aparecen primero.
                    </p>
                  </div>

                  <label className="relative block w-full lg:w-[320px]">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite/50" />
                    <input
                      className="w-full border border-ink/15 bg-surface px-10 py-3 text-sm text-ink outline-none shadow-plate-sm placeholder:text-graphite/35"
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Buscar empresa, folio o contacto"
                      type="text"
                      value={searchTerm}
                    />
                  </label>
                </div>
              </div>

              <div className="divide-y divide-ink/10 bg-white">
                {visibleLeads.length === 0 ? (
                  <div className="px-5 py-10 text-sm leading-7 text-graphite/72">
                    No hay leads que coincidan con el filtro o la búsqueda actual.
                  </div>
                ) : null}

                {visibleLeads.map((lead) => {
                  const priority = getPriorityConfig(lead.status);

                  return (
                    <button
                      className={cn(
                        "grid w-full gap-4 px-5 py-5 text-left transition-colors md:grid-cols-[minmax(0,1.15fr)_180px_180px_150px]",
                        selectedLeadId === lead.id ? "bg-surface" : "bg-white hover:bg-surface/70",
                      )}
                      key={lead.id}
                      onClick={() => onSelectLead(lead.id)}
                      type="button"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-1 block h-12 w-1 shrink-0",
                            lead.status === "Nuevo"
                              ? "bg-hydro-cyan"
                              : lead.status === "En revisión"
                                ? "bg-industrial-gold"
                                : "bg-ink/20",
                          )}
                        />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">
                              {lead.id}
                            </p>
                            <p className="text-xs uppercase tracking-[0.14em] text-graphite/58">{lead.requestedAt}</p>
                          </div>
                          <p className="mt-2 text-base font-semibold text-ink">{lead.company}</p>
                          <p className="mt-1 text-sm leading-6 text-graphite/82">
                            {lead.contactName} / {lead.phone}
                          </p>
                          <p className="text-sm leading-6 text-graphite/72">
                            {lead.projectTypeLabel} / {lead.specialtyLabel} / {lead.location}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-graphite/58">Prioridad</p>
                        <span
                          className={cn(
                            "inline-flex items-center border px-3 py-1.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
                            priority.tone,
                          )}
                        >
                          {priority.label}
                        </span>
                        <p className="text-sm leading-6 text-graphite/72">{priority.queueLabel}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-graphite/58">Siguiente</p>
                        <p className="text-sm font-semibold leading-6 text-ink">{priority.nextAction}</p>
                        <StatusBadge compact status={lead.status} />
                      </div>

                      <div className="flex items-center md:justify-end">
                        {lead.status === "Nuevo" ? (
                          <a
                            className="inline-flex items-center gap-2 border border-ink/15 bg-white px-3 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                            href={`tel:${lead.phone}`}
                            onClick={(event) => event.stopPropagation()}
                          >
                            <Phone className="h-3.5 w-3.5 text-hydro-cyan" />
                            Llamar
                          </a>
                        ) : lead.status === "En revisión" ? (
                          <button
                            className="inline-flex items-center gap-2 border border-ink/15 bg-white px-3 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                            onClick={(event) => {
                              event.stopPropagation();
                              onDownloadPdf(lead);
                            }}
                            type="button"
                          >
                            <FileText className="h-3.5 w-3.5 text-hydro-cyan" />
                            PDF
                          </button>
                        ) : (
                          <span className="inline-flex items-center border border-ink/10 bg-surface px-3 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                            Revisado
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </SurfaceCard>
          </div>

          <div className="space-y-5">
            {selectedLead ? (
              <SurfaceCard className="overflow-hidden xl:sticky xl:top-5">
                <div className="border-b border-ink/10 bg-white px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                        Lead activo
                      </p>
                      <h2 className="mt-2 text-xl font-semibold leading-tight text-ink sm:text-2xl">{selectedLead.company}</h2>
                      <p className="mt-2 text-sm leading-6 text-graphite/76">
                        {selectedLead.id} / {selectedLead.requestedAt} / {selectedLead.assignedTo}
                      </p>
                    </div>
                    <StatusBadge status={selectedLead.status} />
                  </div>

                  <div className="mt-5 grid gap-px border border-ink/10 bg-concrete sm:grid-cols-2">
                    <div className="bg-surface px-4 py-4">
                      <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-graphite">Prioridad</p>
                      <div className="mt-3 flex items-center gap-3">
                        <span
                          className={cn(
                            "inline-flex items-center border px-3 py-1.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
                            getPriorityConfig(selectedLead.status).tone,
                          )}
                        >
                          {getPriorityConfig(selectedLead.status).label}
                        </span>
                        <p className="text-sm text-graphite/72">{getPriorityConfig(selectedLead.status).queueLabel}</p>
                      </div>
                    </div>
                    <div className="bg-surface px-4 py-4">
                      <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-graphite">Siguiente acción</p>
                      <p className="mt-3 text-sm font-semibold leading-6 text-ink">{getPriorityConfig(selectedLead.status).nextAction}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <a
                      className="inline-flex items-center justify-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                      href={`tel:${selectedLead.phone}`}
                    >
                      <Phone className="h-4 w-4 text-hydro-cyan" />
                      Llamar
                    </a>
                    <a
                      className="inline-flex items-center justify-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                      href={`mailto:${selectedLead.email}`}
                    >
                      <Mail className="h-4 w-4 text-hydro-cyan" />
                      Correo
                    </a>
                    <button
                      className="inline-flex items-center justify-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                      onClick={() => onSimulateWhatsapp(selectedLead)}
                      type="button"
                    >
                      <BellRing className="h-4 w-4 text-hydro-cyan" />
                      WhatsApp
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                      onClick={() => onDownloadPdf(selectedLead)}
                      type="button"
                    >
                      <FileText className="h-4 w-4 text-hydro-cyan" />
                      PDF
                    </button>
                  </div>
                </div>

                <div className="grid gap-px bg-concrete sm:grid-cols-2">
                  <div className="bg-white px-5 py-4">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">Contacto</p>
                    <p className="mt-3 text-sm font-semibold text-ink">{selectedLead.contactName}</p>
                    <p className="mt-1 text-sm leading-6 text-ink">{selectedLead.phone}</p>
                    <p className="text-sm leading-6 text-ink">{selectedLead.email}</p>
                  </div>
                  <div className="bg-white px-5 py-4">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">Proyecto</p>
                    <p className="mt-3 text-sm leading-6 text-ink">{selectedLead.location}</p>
                    <p className="text-sm leading-6 text-ink">{selectedLead.projectTypeLabel}</p>
                    <p className="text-sm leading-6 text-ink">{selectedLead.specialtyLabel}</p>
                    <p className="text-sm leading-6 text-ink">{selectedLead.squareMeters} m2</p>
                  </div>
                  <div className="bg-white px-5 py-4">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">Rango preliminar</p>
                    <p className="mt-3 text-base font-semibold text-ink">
                      {formatCurrency(selectedLead.estimate.minimum)} - {formatCurrency(selectedLead.estimate.maximum)}
                    </p>
                  </div>
                  <div className="bg-surface px-5 py-4">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">Notas</p>
                    <p className="mt-3 text-sm leading-6 text-ink">{selectedLead.notes || "Sin observaciones cargadas en este lead."}</p>
                  </div>
                </div>

                <div className="border-t border-ink/10 bg-white px-5 py-5">
                  <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Actualizar estado</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {leadStatusOptions.map((status) => (
                      <button
                        className={cn(
                          "border px-3 py-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] shadow-plate-sm transition-colors",
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
              </SurfaceCard>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
