import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { services } from "../content/siteContent";

const heroSlides = [
  {
    src: "/assets/hero-bca-gas-dark.png",
    alt: "Infraestructura de gas industrial con tuberías, válvulas y zona oscura para texto",
  },
  {
    src: "/assets/hero-bca-water-dark.png",
    alt: "Cuarto técnico con filtrado, suavizadores y equipos hidráulicos",
  },
] as const;

const heroCards = services.slice(0, 4);
const heroCardsMobile = heroCards.slice(0, 2);

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-20 md:scroll-mt-24 xl:scroll-mt-28" id="inicio">
      <div className="relative min-h-[26rem] overflow-hidden bg-ink sm:min-h-[31rem] xl:min-h-[40rem]">
        <AnimatePresence mode="wait">
          <motion.img
            animate={{ opacity: 1, scale: 1.03 }}
            alt={heroSlides[activeSlide].alt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, scale: 1.01 }}
            key={heroSlides[activeSlide].src}
            src={heroSlides[activeSlide].src}
            transition={{ duration: 1.35, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/68 to-ink/18" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/84 via-ink/20 to-transparent" />
        <div aria-hidden className="absolute inset-y-0 left-0 w-[64%] bg-gradient-to-r from-ink/52 via-ink/18 to-transparent" />

        <div className="relative mx-auto max-w-[88rem] px-5 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 xl:pb-24 xl:pt-18">
          <div className="relative max-w-[40rem]">
            <div
              aria-hidden
              className="absolute -inset-x-4 -inset-y-5 bg-gradient-to-r from-ink/64 via-ink/34 to-transparent"
            />

            <div className="relative">
              <p className="hero-copy-shadow font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan sm:text-[0.72rem]">
                BCA Ingeniería | Hidrosanitarias, gas y bombeo
              </p>

              <h1 className="hero-title-shadow mt-4 max-w-[12ch] font-display text-[clamp(2rem,9.2vw,4.75rem)] font-bold leading-[0.92] tracking-[-0.048em] text-white sm:mt-5 sm:max-w-[13.4ch] sm:leading-[0.96]">
                Instalaciones hidrosanitarias, gas y bombeo para proyectos que exigen ejecución seria.
              </h1>

              <p className="hero-copy-shadow mt-5 max-w-[24rem] text-[0.96rem] font-semibold leading-7 text-white sm:mt-6 sm:max-w-[33rem] sm:text-[1.04rem] sm:leading-8">
                Diseño y cálculo, instalaciones, pruebas y puesta en marcha para obra residencial, comercial, industrial
                y hotelera, con una atención más clara desde la cotización inicial.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                <PrimaryButton className="w-full justify-center sm:w-auto" href="#cotizador">
                  Cotizar proyecto
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>

                <a
                  className="inline-flex items-center gap-2 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white/88 underline underline-offset-4 transition-colors hover:text-white sm:border sm:border-white/35 sm:bg-ink/52 sm:px-5 sm:py-3 sm:no-underline"
                  href="#especialidades"
                >
                  Ver especialidades
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-6 flex max-w-[44rem] flex-wrap gap-3 sm:mt-8">
                <span className="hero-copy-shadow inline-flex items-center border border-white/18 bg-ink/66 px-3 py-2 text-sm font-semibold leading-6 text-white">
                  Residencial, comercial y hotelero
                </span>
                <span className="hero-copy-shadow inline-flex items-center border border-white/18 bg-ink/66 px-3 py-2 text-sm font-semibold leading-6 text-white">
                  Gas LP y natural
                </span>
                <span className="hero-copy-shadow hidden items-center border border-white/18 bg-ink/66 px-3 py-2 text-sm font-semibold leading-6 text-white sm:inline-flex">
                  Pruebas hidrostáticas
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 right-5 hidden items-center gap-2 sm:bottom-6 sm:right-6 sm:flex lg:right-8">
            {heroSlides.map((slide, index) => (
              <button
                aria-label={`Mostrar imagen ${index + 1}`}
                className={
                  index === activeSlide
                    ? "h-2 w-10 border border-industrial-gold bg-industrial-gold"
                    : "h-2 w-6 border border-white/30 bg-white/35"
                }
                key={slide.src}
                onClick={() => setActiveSlide(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-5 py-4 sm:px-6 sm:py-5 lg:px-8 xl:hidden">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
          {heroCardsMobile.map((service) => (
            <article
              className="border border-ink/12 bg-[#1c1f23] px-4 py-4 text-white shadow-plate-sm sm:px-5 sm:py-5"
              key={service.code}
            >
              <span
                className={
                  service.accent === "gold"
                    ? "mb-4 block h-[3px] w-12 bg-industrial-gold"
                    : "mb-4 block h-[3px] w-12 bg-hydro-cyan"
                }
              />
              <h2 className="text-[1rem] font-semibold leading-[1.08] text-white sm:text-[1.18rem]">{service.title}</h2>
              <p className="mt-3 hidden text-[0.92rem] leading-7 text-white/74 sm:block">{service.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-12 hidden max-w-[88rem] px-5 pb-6 sm:px-6 lg:px-8 xl:block">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {heroCards.map((service, index) => (
            <motion.article
              className="border border-white/8 bg-[#1c1f23] px-6 py-6 text-white shadow-plate-sm"
              initial={{ opacity: 0, y: 18 }}
              key={service.code}
              transition={{ delay: 0.08 * index, duration: 0.45 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span
                className={
                  service.accent === "gold"
                    ? "mb-5 block h-[3px] w-14 bg-industrial-gold"
                    : "mb-5 block h-[3px] w-14 bg-hydro-cyan"
                }
              />
              <h2 className="text-[1.38rem] font-semibold leading-[1.08] text-white">{service.title}</h2>
              <p className="mt-4 text-[0.94rem] leading-7 text-white/72">{service.description}</p>
              <a
                className="mt-6 inline-flex items-center gap-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/92 transition-colors hover:text-industrial-gold"
                href="#especialidades"
              >
                Ver alcance
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
