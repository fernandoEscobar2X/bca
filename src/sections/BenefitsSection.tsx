import { motion } from "framer-motion";

import { SectionIntro } from "../components/ui/SectionIntro";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { benefitItems } from "../content/siteContent";
import { revealUp } from "../lib/motion";

export function BenefitsSection() {
  return (
    <section className="border-b border-ink/10 bg-white scroll-mt-72 md:scroll-mt-56 xl:scroll-mt-32" id="beneficios">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div {...revealUp}>
          <SectionIntro
            description="La inversion se entiende mejor cuando la demo deja ver mas orden, mejor imagen comercial y una atencion mas consistente."
            eyebrow="Beneficios concretos"
            title="Por que este sistema se percibe como inversion y no como gasto."
          />
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {benefitItems.map((item) => (
            <motion.div key={item.title} {...revealUp}>
              <SurfaceCard className="h-full p-5 sm:p-6">
                <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-hydro-cyan">Beneficio</p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight text-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-graphite/82">{item.description}</p>
              </SurfaceCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
