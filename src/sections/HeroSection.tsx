import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { heroStats } from "../content/siteContent";
import { revealUp } from "../lib/motion";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32"
      id="inicio"
    >
      <div className="mx-auto max-w-[88rem] px-5 pb-12 pt-32 sm:px-6 sm:pt-36 lg:px-8 xl:pb-16 xl:pt-36">
        <div className="relative xl:min-h-[40rem]">
          <motion.div
            className="relative overflow-hidden border border-ink bg-concrete shadow-plate xl:absolute xl:bottom-0 xl:left-[34%] xl:right-0 xl:top-0"
            {...revealUp}
          >
            <img
              alt="Supervision tecnica en obra para instalaciones hidrosanitarias, gas y bombeo"
              className="h-[24rem] w-full object-cover object-center sm:h-[30rem] xl:h-full xl:object-[center_35%]"
              src="/assets/hero-industrial.jpg"
            />

            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/32 via-ink/12 to-transparent" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/72 via-transparent to-transparent" />

            <motion.div
              className="absolute right-5 top-5 max-w-[15rem] border border-ink bg-industrial-gold px-4 py-4 shadow-plate-sm sm:right-6 sm:top-6"
              initial={{ opacity: 0, y: 18 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink/72">
                Solicitud inicial
              </p>
              <p className="mt-2 text-sm leading-6 text-ink">
                Cotizacion preliminar con validacion tecnica en sitio y seguimiento mejor presentado.
              </p>
            </motion.div>

            <motion.div
              className="absolute bottom-5 left-5 max-w-[32rem] border border-ink bg-white px-5 py-4 shadow-plate sm:bottom-6 sm:left-6 sm:px-6"
              initial={{ opacity: 0, y: 18 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                Diseno, instalacion y pruebas
              </p>
              <p className="mt-2 text-sm leading-6 text-ink sm:text-[0.98rem]">
                BCA atiende proyectos residenciales, comerciales, industriales y hoteleros con una presencia mas seria
                desde el primer contacto.
              </p>
            </motion.div>
          </motion.div>

          <motion.div className="relative z-10 xl:max-w-[36rem] xl:py-10" {...revealUp}>
            <div className="border border-ink bg-white p-6 shadow-plate sm:p-8 xl:mt-12">
              <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan">
                BCA Ingenieria
              </p>

              <h1 className="mt-4 max-w-[11.4ch] font-display text-[clamp(2.7rem,4.7vw,4.7rem)] font-bold leading-[0.94] tracking-[-0.05em] text-ink">
                Ingenieria hidrosanitaria, gas y bombeo para proyectos que no pueden improvisarse.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-graphite/84 sm:text-lg">
                Diseno y calculo, instalaciones, equipos y pruebas para clientes que necesitan una empresa mejor
                organizada, mejor presentada y lista para responder con claridad.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <PrimaryButton href="#cotizador">
                  Cotizar proyecto
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>

                <a
                  className="font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-industrial-gold"
                  href="#casos"
                >
                  Ver casos y alcance
                </a>
              </div>

              <div className="mt-8 grid gap-4 border-t border-ink/10 pt-6 sm:grid-cols-2 xl:grid-cols-4">
                {heroStats.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    transition={{ delay: 0.08 * index, duration: 0.45 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <p className="font-display text-[1.45rem] font-bold leading-none tracking-[-0.04em] text-ink">{item.value}</p>
                    <p className="mt-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-graphite/62">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
