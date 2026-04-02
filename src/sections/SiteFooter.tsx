import { ArrowRight } from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { navigationLinks } from "../content/siteContent";

const legalLinks = [
  { label: "Aviso de Privacidad", href: "#" },
  { label: "Políticas de Datos", href: "#" },
] as const;

export function SiteFooter() {
  return (
    <footer className="safe-bottom-pad bg-ink text-surface scroll-mt-20 md:scroll-mt-24 xl:scroll-mt-28" id="contacto">
      <div className="mx-auto max-w-[88rem] px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[240px_minmax(0,1fr)_auto] lg:items-center">
          <div className="space-y-4">
            <div className="w-28 border border-white/10 bg-white p-3 shadow-plate-sm">
              <img alt="BCA Ingeniería" className="h-auto w-full object-contain" src="/assets/bca-logo.jpeg" />
            </div>
            <p className="max-w-xs text-sm leading-7 text-surface/88">
              Ingeniería hidrosanitaria, gas, bombeo y pruebas para proyectos residenciales, comerciales e industriales.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div>
              <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Teléfono</p>
              <p className="mt-2 text-base text-surface">+52 81 0000 0000</p>
            </div>
            <div>
              <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Correo</p>
              <p className="mt-2 text-base text-surface">contacto@bcaingenieria.com</p>
            </div>
            <div>
              <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Atención</p>
              <p className="mt-2 text-base text-surface">Cotización preliminar y atención más clara para nuevos proyectos</p>
            </div>
          </div>

          <PrimaryButton href="#cotizador">
            Cotizar proyecto
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>

        <div className="flex flex-col gap-4 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {navigationLinks.map((item) => (
              <a
                className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-surface/86 transition-colors hover:text-industrial-gold"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map((item) => (
              <a
                className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-surface/86 transition-colors hover:text-industrial-gold"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </div>

          <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-surface/72">
            BCA Ingeniería | Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
