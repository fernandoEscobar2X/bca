import { useState } from "react";

import type { OperationEvent } from "./content/automationContent";
import { initialLeadRecords, initialOperationEvents } from "./content/automationContent";
import { downloadPrequotePdf } from "./lib/pdf";
import type { LeadRecord, LeadStatus } from "./lib/quote";
import { AutomationSection } from "./sections/AutomationSection";
import { AdminWorkspace } from "./sections/AdminWorkspace";
import { HeroSection } from "./sections/HeroSection";
import { PortfolioSection } from "./sections/PortfolioSection";
import { ProcessSection } from "./sections/ProcessSection";
import { QuoteSimulator } from "./sections/QuoteSimulator";
import { ServicesSection } from "./sections/ServicesSection";
import { SiteFooter } from "./sections/SiteFooter";
import { SiteHeader } from "./sections/SiteHeader";
import { TrustStrip } from "./sections/TrustStrip";

function buildOperationEvent(title: string, detail: string, accent: OperationEvent["accent"]): OperationEvent {
  return {
    id: `evt-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    title,
    detail,
    accent,
    time: new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date()),
  };
}

export function App() {
  const [view, setView] = useState<"site" | "admin">("site");
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeadRecords);
  const [latestLead, setLatestLead] = useState<LeadRecord | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string>(initialLeadRecords[0]?.id ?? "");
  const [operationEvents, setOperationEvents] = useState<OperationEvent[]>(initialOperationEvents);

  const pushEvent = (title: string, detail: string, accent: OperationEvent["accent"]) => {
    setOperationEvents((current) => [buildOperationEvent(title, detail, accent), ...current]);
  };

  const handleLeadGenerated = (lead: LeadRecord) => {
    setLatestLead(lead);
    setSelectedLeadId(lead.id);
    setLeads((current) => [lead, ...current.filter((item) => item.id !== lead.id)]);
    pushEvent(
      "Lead capturado",
      `${lead.company} entro desde el Lead Terminal con banda ${lead.estimate.minimum.toLocaleString("es-MX")} - ${lead.estimate.maximum.toLocaleString("es-MX")} MXN.`,
      "cyan",
    );
  };

  const handleSimulateWhatsapp = (lead: LeadRecord) => {
    pushEvent("WhatsApp cliente", `Confirmacion enviada a ${lead.contactName} en ${lead.phone}.`, "cyan");
    pushEvent("Alerta interna", `Mesa comercial recibio el lead ${lead.id} para seguimiento inmediato.`, "gold");
  };

  const handleDownloadPdf = (lead: LeadRecord) => {
    void downloadPrequotePdf(lead);
    pushEvent("PDF generado", `La pre-cotizacion ${lead.id} ya esta lista para enviar a ${lead.email}.`, "dark");
  };

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    setLeads((current) => current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)));
    if (latestLead?.id === leadId) {
      setLatestLead((current) => (current ? { ...current, status } : current));
    }
    pushEvent("Estado actualizado", `${leadId} cambio a ${status}.`, status === "En revision" ? "gold" : status === "Contactado" ? "dark" : "cyan");
  };

  if (view === "admin") {
    return (
      <AdminWorkspace
        leads={leads}
        onClose={() => setView("site")}
        onDownloadPdf={handleDownloadPdf}
        onSelectLead={setSelectedLeadId}
        onSimulateWhatsapp={handleSimulateWhatsapp}
        onStatusChange={handleStatusChange}
        operationEvents={operationEvents}
        selectedLeadId={selectedLeadId}
      />
    );
  }

  return (
    <>
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>

      <SiteHeader onOpenAdmin={() => setView("admin")} />

      <main className="relative min-h-screen bg-surface text-ink" id="contenido-principal">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-grid bg-[length:32px_32px] opacity-40" />

        <div className="relative">
          <HeroSection onOpenAdmin={() => setView("admin")} />
          <TrustStrip />
          <ServicesSection />
          <PortfolioSection />
          <ProcessSection />
          <QuoteSimulator
            onDownloadPdf={handleDownloadPdf}
            onLeadGenerated={handleLeadGenerated}
            onOpenAdmin={() => setView("admin")}
            onSimulateWhatsapp={handleSimulateWhatsapp}
          />
          <AutomationSection
            latestLead={latestLead}
            leads={leads}
            onDownloadPdf={handleDownloadPdf}
            onOpenAdmin={() => setView("admin")}
            onSimulateWhatsapp={handleSimulateWhatsapp}
            operationEvents={operationEvents}
          />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
