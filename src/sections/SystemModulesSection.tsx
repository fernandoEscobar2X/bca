import { FileText, LayoutPanelTop, MessageSquareMore, Workflow } from "lucide-react";
import { motion } from "framer-motion";

import { SectionIntro } from "../components/ui/SectionIntro";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { systemModules } from "../content/siteContent";
import { revealUp } from "../lib/motion";

const moduleIcons = [Workflow, LayoutPanelTop, MessageSquareMore, FileText] as const;

export function SystemModulesSection() {
  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="modulos">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            description="Estos modulos elevan la percepcion de BCA frente al prospecto y al mismo tiempo ordenan la atencion comercial por dentro."
            eyebrow="Modulos principales"
            title="Un ecosistema digital que vende mejor y atiende mejor."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {systemModules.map((module, index) => {
            const Icon = moduleIcons[index] ?? LayoutPanelTop;

            return (
              <motion.div key={module.code} {...revealUp}>
                <SurfaceCard className="h-full overflow-hidden">
                  <div className="grid gap-px bg-concrete sm:grid-cols-[88px_minmax(0,1fr)]">
                    <div className="flex items-center justify-center bg-surface p-5">
                      <Icon className="h-6 w-6 text-ink" />
                    </div>

                    <div className="bg-white px-5 py-5 sm:px-6">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">
                          Modulo {module.code}
                        </p>
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold leading-tight text-ink">{module.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-graphite/82">{module.description}</p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {module.bullets.map((bullet) => (
                          <span
                            className="inline-flex items-center border border-ink/10 bg-surface px-3 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink"
                            key={bullet}
                          >
                            {bullet}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SurfaceCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
