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
    }, 4800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-40 md:scroll-mt-32" id="inicio">
      <div className="relative min-h-[34rem] overflow-hidden bg-ink sm:min-h-[40rem] xl:min-h-[44rem]">
        <AnimatePresence mode="wait">
          <motion.img
            animate={{ opacity: 1, scale: 1.02 }}
            alt={heroSlides[activeSlide].alt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, scale: 1 }}
            key={heroSlides[activeSlide].src}
            src={heroSlides[activeSlide].src}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/52 to-ink/18" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/72 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-[88rem] px-5 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 xl:pb-32 xl:pt-24">
          <div className="max-w-[42rem]">
            <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan">
              BCA Ingenieria | Hidrosanitarias, gas y bombeo
            </p>

            <h1 className="mt-5 max-w-[11ch] font-display text-[clamp(2.9rem,6vw,5.6rem)] font-bold leading-[0.94] tracking-[-0.05em] text-white">
              Ingenieria tecnica para proyectos que exigen una empresa seria.
            </h1>

            <p className="mt-6 max-w-[34rem] text-base leading-8 text-white/88 sm:text-lg">
              Diseno y calculo, instalaciones, pruebas, bombeo, albercas y gas para obra residencial, comercial,
              industrial y hotelera con una atencion mas clara desde la cotizacion inicial.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton href="#cotizador">
                Cotizar proyecto
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>

              <a
                className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-5 py-3 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-ink"
                href="#especialidades"
              >
                Ver especialidades
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm leading-6 text-white/82">
              <span>Residencial, comercial, industrial y hotelero</span>
              <span>Gas LP y natural</span>
              <span>Pruebas hidrostaticas</span>
            </div>
          </div>

          <div className="absolute bottom-8 right-5 flex items-center gap-2 sm:right-6 lg:right-8">
            {heroSlides.map((slide, index) => (
              <button
                aria-label={`Mostrar imagen ${index + 1}`}
                className={index === activeSlide ? "h-2.5 w-10 bg-industrial-gold" : "h-2.5 w-6 bg-white/45"}
                key={slide.src}
                onClick={() => setActiveSlide(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-16 max-w-[88rem] px-5 pb-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {heroCards.map((service, index) => (
            <motion.article
              className="border border-ink bg-[#222326] px-5 py-6 text-white shadow-plate"
              initial={{ opacity: 0, y: 18 }}
              key={service.code}
              transition={{ delay: 0.08 * index, duration: 0.45 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span className={service.accent === "gold" ? "mb-4 block h-1 w-16 bg-industrial-gold" : "mb-4 block h-1 w-16 bg-hydro-cyan"} />
              <h2 className="text-[1.55rem] font-semibold leading-tight text-white">{service.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/76">{service.description}</p>
              <a
                className="mt-6 inline-flex items-center gap-2 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:text-industrial-gold"
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
