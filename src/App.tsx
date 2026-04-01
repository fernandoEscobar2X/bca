import { useState } from "react";

import { initialLeadRecords } from "./content/automationContent";
import { downloadPrequotePdf } from "./lib/pdf";
import type { LeadRecord, LeadStatus } from "./lib/quote";
import { AdminWorkspace } from "./sections/AdminWorkspace";
import { BenefitsSection } from "./sections/BenefitsSection";
import { HeroSection } from "./sections/HeroSection";
import { PanelPreviewSection } from "./sections/PanelPreviewSection";
import { QuoteSimulator } from "./sections/QuoteSimulator";
import { ServicesSection } from "./sections/ServicesSection";
import { SiteFooter } from "./sections/SiteFooter";
import { SiteHeader } from "./sections/SiteHeader";
import { SystemModulesSection } from "./sections/SystemModulesSection";
import { TrustStrip } from "./sections/TrustStrip";

export function App() {
  const [view, setView] = useState<"site" | "admin">("site");
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeadRecords);
  const [latestLead, setLatestLead] = useState<LeadRecord | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string>(initialLeadRecords[0]?.id ?? "");

  const handleLeadGenerated = (lead: LeadRecord) => {
    setLatestLead(lead);
    setSelectedLeadId(lead.id);
    setLeads((current) => [lead, ...current.filter((item) => item.id !== lead.id)]);
  };

  const handleSimulateWhatsapp = (lead: LeadRecord) => {
    const message = encodeURIComponent(
      `Hola ${lead.contactName}, recibimos tu solicitud para ${lead.specialtyLabel}. Folio ${lead.id}.`,
    );
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const handleDownloadPdf = (lead: LeadRecord) => {
    void downloadPrequotePdf(lead);
  };

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    setLeads((current) => current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)));
    if (latestLead?.id === leadId) {
      setLatestLead((current) => (current ? { ...current, status } : current));
    }
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
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-grid bg-[length:32px_32px] opacity-20" />

        <div className="relative">
          <HeroSection onOpenAdmin={() => setView("admin")} />
          <TrustStrip />
          <ServicesSection />
          <SystemModulesSection />
          <PanelPreviewSection leads={leads} onOpenAdmin={() => setView("admin")} />
          <QuoteSimulator
            onDownloadPdf={handleDownloadPdf}
            onLeadGenerated={handleLeadGenerated}
            onOpenAdmin={() => setView("admin")}
            onSimulateWhatsapp={handleSimulateWhatsapp}
          />
          <BenefitsSection />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
