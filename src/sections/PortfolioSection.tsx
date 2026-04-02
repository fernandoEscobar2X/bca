import { motion } from "framer-motion";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { projects } from "../content/siteContent";
import { plateSpring, revealUp } from "../lib/motion";

export function PortfolioSection() {
  const [featuredProject, ...secondaryProjects] = projects;

  return (
    <section className="border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="casos">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] xl:items-end">
          <motion.div className="space-y-5" {...revealUp}>
            <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-hydro-cyan">
              Casos y tipologia de obra
            </p>
            <h2 className="max-w-[12ch] font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[0.96] tracking-[-0.045em] text-ink">
              Proyectos que se presentan con mas orden y mas criterio tecnico.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-graphite/84 sm:text-base">
              Corporativos, cocinas industriales, amenidades hoteleras y frentes que necesitan una empresa con mejor
              lectura comercial y mejor control de ejecucion.
            </p>
          </motion.div>

          <motion.div className="xl:justify-self-end" {...revealUp}>
            <PrimaryButton href="#cotizador">Solicitar cotizacion preliminar</PrimaryButton>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <motion.article className="overflow-hidden border border-ink bg-white shadow-plate" {...revealUp}>
            <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1.14fr)_340px]">
              <div className="relative min-h-[26rem] overflow-hidden">
                <img
                  alt={featuredProject.title}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  src="/assets/hero-industrial.jpg"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-16 text-surface">
                  <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Caso destacado
                  </p>
                  <h3 className="mt-3 max-w-[12ch] font-display text-[clamp(2rem,3.2vw,3.25rem)] font-bold leading-[0.96] tracking-[-0.04em] text-white">
                    {featuredProject.title}
                  </h3>
                </div>
              </div>

              <div className="grid gap-px bg-concrete">
                <div className="bg-white px-5 py-5 sm:px-6">
                  <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Ubicacion
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink">{featuredProject.location}</p>
                </div>
                <div className="bg-industrial-gold px-5 py-5 sm:px-6">
                  <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/72">
                    Alcance
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink">{featuredProject.summary}</p>
                </div>
                <div className="bg-white px-5 py-5 sm:px-6">
                  <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                    Especialidades
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <span
                        className="inline-flex items-center border border-ink/10 bg-surface px-3 py-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-5">
            {secondaryProjects.map((project, index) => (
              <motion.article
                className="overflow-hidden border border-ink bg-white shadow-plate"
                initial={{ opacity: 0, y: 22 }}
                key={project.title}
                transition={{ ...plateSpring, delay: index * 0.06 }}
                viewport={{ once: true, amount: 0.18 }}
                whileHover={{ x: -4, y: -4 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="grid gap-px bg-concrete sm:grid-cols-[155px_minmax(0,1fr)]">
                  <div className={index === 0 ? "bg-hydro-cyan px-5 py-5" : "bg-industrial-gold px-5 py-5"}>
                    <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/72">
                      Caso 0{index + 2}
                    </p>
                  </div>
                  <div className="bg-white px-5 py-5">
                    <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                      {project.location}
                    </p>
                    <h3 className="mt-3 text-[clamp(1.45rem,2vw,2rem)] font-semibold leading-tight text-ink">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-graphite/82">{project.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          className="inline-flex items-center border border-ink/10 bg-surface px-3 py-1.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
