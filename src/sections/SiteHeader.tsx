"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Menu, Phone, X } from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { navigationLinks } from "../content/siteContent";
import { plateSpring } from "../lib/motion";

type SiteHeaderProps = {
  onOpenAdmin: () => void;
};

export function SiteHeader({ onOpenAdmin }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-5 z-50 px-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[88rem] border border-ink bg-white shadow-plate">
        <div className="flex items-center justify-between gap-3 px-4 py-3 lg:px-5">
          <a className="flex min-w-0 flex-1 items-center gap-3" href="#inicio" onClick={() => setIsMenuOpen(false)}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink/10 bg-surface sm:h-14 sm:w-14">
              <img alt="BCA Ingenieria" className="h-9 w-9 object-contain sm:h-10 sm:w-10" src="/assets/bca-logo.jpeg" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-display text-[clamp(1.2rem,4.1vw,2.15rem)] font-bold leading-none tracking-[-0.035em] text-ink">
                BCA INGENIERIA
              </p>
              <p className="mt-1 hidden font-sans text-[0.68rem] font-medium uppercase tracking-[0.14em] text-graphite/66 sm:block">
                Demo | Sistema comercial
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-3 xl:flex">
            <nav aria-label="Principal" className="flex items-center gap-2">
              {navigationLinks.map((link) => (
                <a
                  className="inline-flex items-center px-3 py-2 font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite transition-colors hover:text-industrial-gold"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              className="inline-flex items-center gap-2 border border-ink/10 bg-surface px-4 py-3 font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink"
              href="tel:+528100000000"
            >
              <Phone className="h-4 w-4 text-hydro-cyan" />
              +52 81 0000 0000
            </a>

            <button
              className="inline-flex items-center gap-2 border border-ink/15 bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-plate-sm"
              onClick={onOpenAdmin}
              type="button"
            >
              <LockKeyhole className="h-4 w-4 text-hydro-cyan" />
              Panel
            </button>

            <PrimaryButton href="#cotizador">
              Probar sistema
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          </div>

          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            <PrimaryButton className="px-4 py-3 text-[0.68rem] sm:px-5" href="#cotizador">
              <span className="hidden sm:inline">Probar sistema</span>
              <span className="sm:hidden">Probar</span>
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>

            <motion.button
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
              className="inline-flex h-12 w-12 items-center justify-center border border-ink/10 bg-surface text-ink shadow-plate-sm"
              onClick={() => setIsMenuOpen((current) => !current)}
              transition={plateSpring}
              type="button"
              whileHover={{ x: -3, y: -3 }}
              whileTap={{ x: 1, y: 1 }}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              animate={{ height: "auto", opacity: 1 }}
              className="overflow-hidden border-t border-ink/10 xl:hidden"
              exit={{ height: 0, opacity: 0 }}
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              transition={plateSpring}
            >
              <div className="grid gap-px bg-concrete p-3">
                {navigationLinks.map((link) => (
                  <a
                    className="bg-white px-4 py-3 font-sans text-[0.76rem] font-medium uppercase tracking-[0.14em] text-ink"
                    href={link.href}
                    key={link.label}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  className="flex items-center gap-2 bg-white px-4 py-3 font-sans text-[0.76rem] font-medium uppercase tracking-[0.14em] text-ink"
                  href="tel:+528100000000"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="h-4 w-4 text-hydro-cyan" />
                  +52 81 0000 0000
                </a>

                <button
                  className="flex items-center gap-2 bg-white px-4 py-3 font-sans text-[0.76rem] font-medium uppercase tracking-[0.14em] text-ink"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAdmin();
                  }}
                  type="button"
                >
                  <LockKeyhole className="h-4 w-4 text-hydro-cyan" />
                  Panel
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
