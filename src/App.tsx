import { useState } from "react";

import type { LeadRecord } from "./lib/quote";
import { AutomationSection } from "./sections/AutomationSection";
import { HeroSection } from "./sections/HeroSection";
import { PortfolioSection } from "./sections/PortfolioSection";
import { ProcessSection } from "./sections/ProcessSection";
import { QuoteSimulator } from "./sections/QuoteSimulator";
import { ServicesSection } from "./sections/ServicesSection";
import { SiteFooter } from "./sections/SiteFooter";
import { SiteHeader } from "./sections/SiteHeader";
import { TrustStrip } from "./sections/TrustStrip";

export function App() {
  const [latestLead, setLatestLead] = useState<LeadRecord | null>(null);

  return (
    <>
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>

      <SiteHeader />

      <main className="relative min-h-screen bg-surface text-ink" id="contenido-principal">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint-grid bg-[length:32px_32px] opacity-40" />

        <div className="relative">
          <HeroSection />
          <TrustStrip />
          <ServicesSection />
          <PortfolioSection />
          <ProcessSection />
          <QuoteSimulator onLeadGenerated={setLatestLead} />
          <AutomationSection latestLead={latestLead} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
