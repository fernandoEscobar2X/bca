"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Mail, Menu, Phone, X } from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { navigationLinks } from "../content/siteContent";
import { plateSpring } from "../lib/motion";

type SiteHeaderProps = {
  onOpenAdmin: () => void;
};

export function SiteHeader({ onOpenAdmin }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const overflowValue = isMenuOpen ? "hidden" : "";

    document.body.style.overflow = overflowValue;
    document.documentElement.style.overflow = overflowValue;

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="safe-top-pad sticky top-0 z-50 border-b border-ink/10 bg-white/96">
      <div className="hidden border-b border-ink/10 bg-ink lg:block">
        <div className="mx-auto flex max-w-[88rem] items-center justify-between px-5 py-2 text-surface sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a
              className="inline-flex items-center gap-2 font-sans text-[0.68rem] font-medium uppercase tracking-[0.14em] text-surface/82 transition-colors hover:text-white"
              href="mailto:contacto@bcaingenieria.com"
            >
              <Mail className="h-4 w-4 text-hydro-cyan" />
              contacto@bcaingenieria.com
            </a>
            <a
              className="inline-flex items-center gap-2 font-sans text-[0.68rem] font-medium uppercase tracking-[0.14em] text-surface/82 transition-colors hover:text-white"
              href="tel:+528100000000"
            >
              <Phone className="h-4 w-4 text-hydro-cyan" />
              +52 81 0000 0000
            </a>
          </div>

          <PrimaryButton className="px-4 py-2.5 text-[0.68rem] shadow-plate-sm" href="#cotizador">
            Cotizar proyecto
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2 sm:py-3">
          <a className="flex min-w-0 items-center gap-3" href="#inicio" onClick={() => setIsMenuOpen(false)}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink/10 bg-surface sm:h-12 sm:w-12">
              <img alt="BCA Ingeniería" className="h-7 w-7 object-contain sm:h-9 sm:w-9" src="/assets/bca-logo.jpeg" />
            </div>

            <div className="min-w-0">
              <p className="font-display text-[clamp(0.95rem,2.7vw,1.95rem)] font-bold leading-none tracking-[-0.035em] text-ink">
                BCA INGENIERÍA
              </p>
              <p className="mt-1 hidden font-sans text-[0.62rem] font-medium uppercase tracking-[0.14em] text-graphite/66 md:block">
                Proyectos | Hidrosanitarias | Gas | Bombeo
              </p>
            </div>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 xl:flex">
            {navigationLinks.map((link) => (
              <a
                className="inline-flex items-center px-4 py-1.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:text-industrial-gold"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <button
              className="inline-flex items-center gap-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-hydro-cyan"
              onClick={onOpenAdmin}
              type="button"
            >
              <LockKeyhole className="h-4 w-4 text-hydro-cyan" />
              Acceso interno
            </button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <motion.button
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className="inline-flex h-10 w-10 items-center justify-center border border-ink/10 bg-surface text-ink shadow-plate-sm"
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
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="safe-bottom-pad fixed inset-0 z-40 bg-ink/45 pt-[calc(3.9rem+env(safe-area-inset-top))] xl:hidden"
            exit={{ opacity: 0 }}
            id="mobile-menu"
            initial={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              className="mx-4 overflow-hidden border border-ink bg-white shadow-plate"
              exit={{ y: -12, opacity: 0 }}
              initial={{ y: -12, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              transition={plateSpring}
            >
              <div className="grid gap-px bg-concrete p-3">
                <PrimaryButton className="w-full justify-center" href="#cotizador">
                  Cotizar proyecto
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>

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

                <a
                  className="flex items-center gap-2 bg-white px-4 py-3 font-sans text-[0.76rem] font-medium uppercase tracking-[0.14em] text-ink"
                  href="mailto:contacto@bcaingenieria.com"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mail className="h-4 w-4 text-hydro-cyan" />
                  contacto@bcaingenieria.com
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
                  Acceso interno
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
