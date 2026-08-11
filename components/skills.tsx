"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Wrench,
  Layers,
  Cpu,
  BrainCircuit,
  Cloud,
  Boxes,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import type { SkillGroup } from "@/lib/resume";

const ICONS: Record<string, React.ElementType> = {
  "Programming Languages": Code2,
  "Tools & Technologies": Wrench,
  Frameworks: Layers,
  "IoT & Hardware": Cpu,
  "AI & Machine Learning": BrainCircuit,
  "Cloud & Backend": Cloud,
};

export function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading
        eyebrow="skills"
        title="Technical toolkit"
        description="Languages, frameworks, and hardware I use to take a product from prototype to production."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => {
          const Icon = ICONS[group.category] ?? Boxes;
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: gi * 0.06 }}
              className="glass group rounded-2xl p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display font-semibold text-text">{group.category}</h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-bg/60 px-3 py-1.5 font-mono text-xs text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/60 hover:text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
