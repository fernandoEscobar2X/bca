import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { services } from "../content/siteContent";

const heroSlides = [
  {
    src: "/assets/hero-industrial.jpg",
    alt: "Supervision tecnica en obra para instalaciones hidrosanitarias y gas",
  },
  {
    src: "/assets/hero-bca-pipes.jpg",
    alt: "Infraestructura industrial con tuberias para instalaciones tecnicas",
  },
  {
    src: "/assets/hero-bca-site.jpg",
    alt: "Frente de obra industrial con tuberia y elementos de infraestructura",
  },
] as const;

const heroCards = services.slice(0, 4);

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 7200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-40 md:scroll-mt-32" id="inicio">
      <div className="relative min-h-[35rem] overflow-hidden bg-ink sm:min-h-[41rem] xl:min-h-[45rem]">
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

        <div className="relative mx-auto max-w-[88rem] px-5 pb-24 pt-18 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 xl:pb-32 xl:pt-24">
          <div className="relative max-w-[43rem]">
            <div
              aria-hidden
              className="absolute -inset-x-5 -inset-y-6 bg-gradient-to-r from-ink/58 via-ink/28 to-transparent"
            />

            <div className="relative">
            <p className="hero-copy-shadow font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan">
              BCA Ingenieria | Hidrosanitarias, gas y bombeo
            </p>

            <h1 className="hero-title-shadow mt-6 max-w-[11.4ch] font-display text-[clamp(3rem,5.6vw,5.4rem)] font-bold leading-[0.94] tracking-[-0.05em] text-white">
              Instalaciones hidrosanitarias, gas y bombeo para proyectos que exigen ejecucion seria.
            </h1>

            <p className="hero-copy-shadow mt-6 max-w-[31rem] text-[1.02rem] font-semibold leading-8 text-white sm:text-[1.08rem]">
              Diseno y calculo, instalaciones, pruebas y puesta en marcha para obra residencial, comercial, industrial
              y hotelera, con una atencion mas clara desde la cotizacion inicial.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <PrimaryButton href="#cotizador">
                Cotizar proyecto
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>

              <a
                className="inline-flex items-center gap-2 border border-white/35 bg-ink/52 px-5 py-3 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-ink"
                href="#especialidades"
              >
                Ver especialidades
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex max-w-[44rem] flex-wrap gap-3">
              <span className="hero-copy-shadow inline-flex items-center border border-white/18 bg-ink/66 px-3 py-2 text-sm font-semibold leading-6 text-white">
                Residencial, comercial, industrial y hotelero
              </span>
              <span className="hero-copy-shadow inline-flex items-center border border-white/18 bg-ink/66 px-3 py-2 text-sm font-semibold leading-6 text-white">
                Gas LP y natural
              </span>
              <span className="hero-copy-shadow inline-flex items-center border border-white/18 bg-ink/66 px-3 py-2 text-sm font-semibold leading-6 text-white">
                Pruebas hidrostaticas
              </span>
            </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-5 flex items-center gap-2 sm:right-6 lg:right-8">
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

      <div className="relative z-10 mx-auto -mt-14 max-w-[88rem] px-5 pb-6 sm:px-6 lg:px-8">
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
