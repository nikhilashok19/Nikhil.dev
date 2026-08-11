"use client";

import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { MarkdownInline } from "@/components/markdown-inline";
import type { Entry } from "@/lib/resume";

const ICONS = { award: Award, trophy: Trophy } as const;

export function EntryCards({
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {entries.map((entry, i) => (
          <motion.div
            key={`${entry.title}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="glass flex gap-4 rounded-2xl p-6 transition-colors hover:border-accent/40"
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display font-bold text-text">{entry.title}</h3>
                {entry.dateRange && (
                  <span className="font-mono text-xs text-muted">{entry.dateRange}</span>
                )}
              </div>
              {entry.subtitle && <p className="mt-1 text-sm text-secondary">{entry.subtitle}</p>}
              {entry.meta.map((m, mi) => (
                <p key={mi} className="mt-1 font-mono text-xs text-muted">
                  {m}
                </p>
              ))}
              {entry.bullets.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                  {entry.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
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
