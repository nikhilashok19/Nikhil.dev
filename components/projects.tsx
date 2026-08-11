"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import type { Project, SkillGroup } from "@/lib/resume";

function deriveTags(project: Project, skills: SkillGroup[]): string[] {
  const haystack = `${project.title} ${project.bullets.join(" ")}`.toLowerCase();
  const tags = new Set<string>();
  for (const group of skills) {
    for (const item of group.items) {
      const needle = item.toLowerCase();
      if (needle.length > 2 && haystack.includes(needle)) {
        tags.add(item);
      }
    }
  }
  return Array.from(tags);
}

export function Projects({ projects, skills }: { projects: Project[]; skills: SkillGroup[] }) {
  const withTags = useMemo(
    () => projects.map((p) => ({ ...p, tags: deriveTags(p, skills) })),
    [projects, skills]
  );

  const allTags = useMemo(
    () => Array.from(new Set(withTags.flatMap((p) => p.tags))).sort(),
    [withTags]
  );

  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? withTags : withTags.filter((p) => p.tags.includes(filter))),
    [withTags, filter]
  );

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading
        eyebrow="projects"
        title="Selected builds"
        description="Hardware-to-cloud products, from sensor firmware to the mobile app that controls them."
      />

      {allTags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {["All", ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={cn(
                "rounded-full border px-4 py-1.5 font-mono text-xs transition-colors",
                filter === tag
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted hover:border-secondary/50 hover:text-secondary"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.article
              key={project.title ? `${project.title}-${i}` : `project-${i}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="glass group flex flex-col rounded-2xl p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-bold text-text">{project.title}</h3>
                {project.linkUrl && (
                  <a
                    href={project.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} link`}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:rotate-45"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>

              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-secondary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {project.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-bg/60 px-3 py-1 font-mono text-[11px] text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.linkUrl && (
                <a
                  href={project.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
                >
                  <Github className="h-4 w-4" />
                  {project.linkLabel}
                </a>
              )}
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
