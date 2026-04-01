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
  const [searchTerm, setSearchTerm] = useState("");

  const selectedLead = leads.find((lead) => lead.id === selectedLeadId) ?? leads[0] ?? null;

  const visibleLeads = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return leads.filter((lead) => {
      const statusMatch = statusFilter === "Todos" ? true : lead.status === statusFilter;
      const searchMatch =
        normalized.length === 0
          ? true
          : `${lead.id} ${lead.company} ${lead.contactName} ${lead.projectTypeLabel} ${lead.specialtyLabel} ${lead.location}`
              .toLowerCase()
              .includes(normalized);

      return statusMatch && searchMatch;
    });
  }, [leads, searchTerm, statusFilter]);

  const totals = {
    total: leads.length,
    nuevos: leads.filter((lead) => lead.status === "Nuevo").length,
    revision: leads.filter((lead) => lead.status === "En revision").length,
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
          <motion.div className="grid min-h-[calc(100vh-4rem)] gap-6 xl:grid-cols-[minmax(0,1.1fr)_420px]" {...revealUp}>
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
                <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.3rem,4vw,4.4rem)] font-bold leading-[0.92] tracking-[-0.05em] text-ink">
                  Seguimiento simple, directo y accionable.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-graphite/84">
                  El objetivo del panel es resolver tres cosas: ver qué entró, mover estado y actuar rápido con llamada,
                  WhatsApp o PDF.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="border border-ink/10 bg-surface px-4 py-4">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Total</p>
                  <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">{totals.total}</p>
                </div>
                <div className="border border-ink/10 bg-surface px-4 py-4">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Nuevos</p>
                  <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">{totals.nuevos}</p>
                </div>
                <div className="border border-ink/10 bg-surface px-4 py-4">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-graphite">Revision</p>
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
              <h1 className="mt-2 truncate font-display text-[clamp(1.6rem,2.3vw,2.8rem)] font-bold leading-none tracking-[-0.04em] text-ink">
                Control de prospectos
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="grid grid-cols-4 gap-px border border-ink/10 bg-concrete">
              <div className="bg-white px-4 py-3">
                <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-graphite">Total</p>
                <p className="mt-2 text-lg font-semibold text-ink">{totals.total}</p>
              </div>
              <div className="bg-white px-4 py-3">
                <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-graphite">Nuevos</p>
                <p className="mt-2 text-lg font-semibold text-ink">{totals.nuevos}</p>
              </div>
              <div className="bg-white px-4 py-3">
                <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-graphite">Revision</p>
                <p className="mt-2 text-lg font-semibold text-ink">{totals.revision}</p>
              </div>
              <div className="bg-industrial-gold px-4 py-3">
                <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink">Contactados</p>
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
        <motion.div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_380px]" {...revealUp}>
          <div className="space-y-5">
            <SurfaceCard className="overflow-hidden">
              <div className="border-b border-ink/10 bg-white px-5 py-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

                  <label className="relative block min-w-[280px]">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite/50" />
                    <input
                      className="w-full border border-ink/15 bg-surface px-10 py-3 text-sm text-ink outline-none shadow-plate-sm placeholder:text-graphite/35"
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Buscar por empresa, folio o contacto"
                      type="text"
                      value={searchTerm}
                    />
                  </label>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-ink/10">
                  <thead className="bg-surface">
                    <tr>
                      <th className="px-5 py-3 text-left font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                        Lead
                      </th>
                      <th className="px-5 py-3 text-left font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                        Contacto
                      </th>
                      <th className="px-5 py-3 text-left font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                        Proyecto
                      </th>
                      <th className="px-5 py-3 text-left font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                        Rango
                      </th>
                      <th className="px-5 py-3 text-left font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10 bg-white">
                    {visibleLeads.map((lead) => (
                      <tr
                        className={cn(
                          "cursor-pointer transition-colors hover:bg-surface/70",
                          selectedLeadId === lead.id ? "bg-surface" : "bg-white",
                        )}
                        key={lead.id}
                        onClick={() => onSelectLead(lead.id)}
                      >
                        <td className="px-5 py-4 align-top">
                          <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">{lead.id}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-graphite/62">{lead.requestedAt}</p>
                        </td>
                        <td className="px-5 py-4 align-top">
                          <p className="text-sm font-semibold text-ink">{lead.company}</p>
                          <p className="mt-1 text-sm leading-6 text-graphite/82">{lead.contactName}</p>
                        </td>
                        <td className="px-5 py-4 align-top text-sm leading-6 text-graphite/82">
                          <p>{lead.projectTypeLabel}</p>
                          <p>{lead.specialtyLabel}</p>
                          <p>{lead.location}</p>
                        </td>
                        <td className="px-5 py-4 align-top text-sm leading-6 text-ink">
                          {formatCurrency(lead.estimate.minimum)}
                          <br />
                          {formatCurrency(lead.estimate.maximum)}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <StatusBadge compact status={lead.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SurfaceCard>

            <SurfaceCard className="overflow-hidden">
              <div className="border-b border-ink/10 bg-white px-5 py-4">
                <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                  Actividad reciente
                </p>
              </div>
              <div className="divide-y divide-ink/10">
                {operationEvents.slice(0, 6).map((event) => (
                  <div className="flex gap-3 bg-white px-5 py-4" key={event.id}>
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
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite/70">
                          {event.time}
                        </p>
                        <p className="text-sm font-semibold text-ink">{event.title}</p>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-graphite/82">{event.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </div>

          <div className="space-y-5">
            {selectedLead ? (
              <SurfaceCard className="sticky top-5 overflow-hidden">
                <div className="border-b border-ink/10 bg-white px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                        Lead activo
                      </p>
                      <h2 className="mt-3 font-display text-[clamp(1.8rem,2.4vw,2.7rem)] font-bold leading-[0.96] tracking-[-0.04em] text-ink">
                        {selectedLead.company}
                      </h2>
                    </div>
                    <StatusBadge status={selectedLead.status} />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      className="inline-flex items-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                      href={`tel:${selectedLead.phone}`}
                    >
                      <Phone className="h-4 w-4 text-hydro-cyan" />
                      Llamar
                    </a>
                    <a
                      className="inline-flex items-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
                      href={`mailto:${selectedLead.email}`}
                    >
                      <Mail className="h-4 w-4 text-hydro-cyan" />
                      Correo
                    </a>
                    <PrimaryButton
                      onClick={() => onSimulateWhatsapp(selectedLead)}
                      type="button"
                      variant="secondary"
                    >
                      <BellRing className="h-4 w-4 text-hydro-cyan" />
                      WhatsApp
                    </PrimaryButton>
                    <PrimaryButton
                      onClick={() => onDownloadPdf(selectedLead)}
                      type="button"
                      variant="secondary"
                    >
                      <FileText className="h-4 w-4 text-hydro-cyan" />
                      PDF
                    </PrimaryButton>
                  </div>
                </div>

                <div className="grid gap-px bg-concrete sm:grid-cols-2">
                  <div className="bg-surface px-5 py-4">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">Contacto</p>
                    <p className="mt-3 text-sm font-semibold text-ink">{selectedLead.contactName}</p>
                    <p className="mt-1 text-sm leading-6 text-ink">{selectedLead.phone}</p>
                    <p className="text-sm leading-6 text-ink">{selectedLead.email}</p>
                  </div>
                  <div className="bg-surface px-5 py-4">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">Proyecto</p>
                    <p className="mt-3 text-sm leading-6 text-ink">{selectedLead.location}</p>
                    <p className="text-sm leading-6 text-ink">{selectedLead.projectTypeLabel}</p>
                    <p className="text-sm leading-6 text-ink">{selectedLead.specialtyLabel}</p>
                    <p className="text-sm leading-6 text-ink">{selectedLead.squareMeters} m2</p>
                  </div>
                  <div className="bg-surface px-5 py-4">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-graphite">Rango preliminar</p>
                    <p className="mt-3 text-base font-semibold text-ink">
                      {formatCurrency(selectedLead.estimate.minimum)} - {formatCurrency(selectedLead.estimate.maximum)}
                    </p>
                  </div>
                  <div className="bg-white px-5 py-4">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-hydro-cyan">Estado</p>
                    <div className="mt-3 flex flex-wrap gap-3">
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
                </div>
              </SurfaceCard>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
