"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { MarkdownInline } from "@/components/markdown-inline";
import type { Entry } from "@/lib/resume";

const ICONS = { briefcase: Briefcase, graduation: GraduationCap } as const;

export function Timeline({
  id,
  eyebrow,
  title,
  description,
  entries,
  icon,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  entries: Entry[];
  icon: keyof typeof ICONS;
}) {
  if (entries.length === 0) return null;
  const Icon = ICONS[icon];

  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />

      <div className="relative border-l border-border pl-8 sm:pl-10">
        {entries.map((entry, i) => (
          <motion.div
            key={`${entry.title}-${i}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative pb-12 last:pb-0"
          >
            <span className="glass absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full text-primary sm:-left-[49px]">
              <Icon className="h-4 w-4" />
            </span>

            <div className="glass rounded-2xl p-6 transition-colors hover:border-primary/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-text">{entry.title}</h3>
                {entry.dateRange && (
                  <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-secondary">
                    {entry.dateRange}
                  </span>
                )}
              </div>
              {entry.subtitle && <p className="mt-1 text-sm font-medium text-primary">{entry.subtitle}</p>}
              {entry.meta.map((m, mi) => (
                <p key={mi} className="mt-1 font-mono text-xs text-muted">
                  {m}
                </p>
              ))}
              {entry.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {entry.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-secondary" />
                      <MarkdownInline text={bullet} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
