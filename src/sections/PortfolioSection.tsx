import { motion } from "framer-motion";

import { PrimaryButton } from "../components/ui/PrimaryButton";
import { SectionIntro } from "../components/ui/SectionIntro";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { projects } from "../content/siteContent";
import { plateSpring, revealUp } from "../lib/motion";

export function PortfolioSection() {
  const [featuredProject, ...secondaryProjects] = projects;

  return (
    <section className="border-b border-ink/10 bg-surface scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="casos">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            aside={<PrimaryButton href="#cotizador">Solicitar revision tecnica</PrimaryButton>}
            description="Todavia sin fotografia real, la seccion deja placeholders corporativos preparados para integrarse con evidencia de obra sin verse improvisada."
            eyebrow="Casos de obra"
            title="Referencias presentadas con orden documental y lectura comercial creible."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <motion.div {...revealUp}>
            <SurfaceCard className="overflow-hidden">
              <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1fr)_220px]">
                <div className="bg-white p-6">
                  <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Caso destacado</p>
                  <h3 className="mt-4 font-display text-[clamp(2rem,3.5vw,3.2rem)] font-bold leading-[0.96] tracking-[-0.045em] text-ink">
                    {featuredProject.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-graphite/84 sm:text-base">{featuredProject.summary}</p>
                </div>

                <div className="grid gap-px bg-concrete">
                  <div className="bg-industrial-gold px-5 py-4">
                    <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink">Ubicacion</p>
                    <p className="mt-2 text-sm font-medium text-ink">{featuredProject.location}</p>
                  </div>
                  <div className="bg-white px-5 py-4">
                    <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Lectura</p>
                    <p className="mt-2 text-sm font-medium text-ink">Proyecto por etapas, sin perder continuidad operativa</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-px bg-concrete lg:grid-cols-[minmax(0,1fr)_260px]">
                <div className="bg-surface p-4">
                  <div className="relative aspect-[16/10] border border-ink bg-white">
                    <div className="absolute inset-0 bg-blueprint-grid bg-[length:26px_26px]" />
                    <div className="absolute inset-6 grid grid-rows-[auto_1fr_auto] border border-ink bg-white">
                      <div className="grid gap-px bg-concrete sm:grid-cols-[1fr_180px]">
                        <div className="bg-white px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                          Placeholder para fotografia o avance de obra
                        </div>
                        <div className="bg-industrial-gold px-4 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink">
                          Imagen futura
                        </div>
                      </div>

                      <div className="grid place-items-center p-6">
                        <div className="grid w-full max-w-sm gap-px bg-concrete">
                          <div className="bg-hydro-cyan p-3" />
                          <div className="bg-white px-4 py-10 text-center font-sans text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-ink">
                            Registro visual corporativo
                          </div>
                          <div className="bg-industrial-gold p-3" />
                        </div>
                      </div>

                      <div className="grid gap-px bg-concrete sm:grid-cols-3">
                        {["Campo", "Supervision", "Entrega"].map((item) => (
                          <div
                            className="bg-white px-4 py-3 font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-graphite/70"
                            key={item}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-px bg-concrete">
                  <div className="bg-white px-5 py-4">
                    <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Especialidades</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {featuredProject.tags.map((tag) => (
                        <span
                          className="inline-flex items-center border border-ink/15 bg-surface px-3 py-1.5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white px-5 py-4">
                    <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Estado comercial</p>
                    <p className="mt-3 text-sm leading-7 text-ink">Bloque listo para transformarse en portafolio real sin rehacer la estructura.</p>
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </motion.div>

          <div className="grid gap-5">
            {secondaryProjects.map((project, index) => (
              <motion.div key={project.title} transition={{ ...plateSpring, delay: index * 0.05 }} whileHover={{ x: -5, y: -5 }}>
                <SurfaceCard className="overflow-hidden">
                  <div className="grid gap-px bg-concrete sm:grid-cols-[minmax(0,1fr)_112px]">
                    <div className="bg-white p-5">
                      <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">{project.location}</p>
                      <h3 className="mt-4 font-display text-[clamp(1.65rem,2.6vw,2.3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-graphite/84">{project.summary}</p>
                    </div>

                    <div className={index === 0 ? "bg-industrial-gold px-4 py-5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink" : "bg-hydro-cyan px-4 py-5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink"}>
                      Caso 0{index + 2}
                    </div>
                  </div>

                  <div className="border-t border-ink/10 bg-white px-5 py-5">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          className="inline-flex items-center border border-ink/15 bg-surface px-3 py-1.5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SurfaceCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
