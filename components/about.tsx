import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import type { ResumeData } from "@/lib/resume";

export function About({ resume }: { resume: ResumeData }) {
  const { contact, summary, skills, experience, projects, education } = resume;
  const primaryEducation = education[0];

  const stats = [
    { label: "Projects shipped", value: `${projects.length}+` },
    { label: "Internship experience", value: `${experience.length}` },
    { label: "Skill domains", value: `${skills.length}` },
  ];

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading eyebrow="about" title="About me" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-lg leading-relaxed text-muted">{summary}</p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="glass flex items-start gap-3 rounded-2xl p-5">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-display font-semibold text-text">Based in</p>
                <p className="text-sm text-muted">{contact.location}</p>
              </div>
            </div>
            {primaryEducation && (
              <div className="glass flex items-start gap-3 rounded-2xl p-5">
                <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                <div>
                  <p className="font-display font-semibold text-text">{primaryEducation.title}</p>
                  <p className="text-sm text-muted">{primaryEducation.subtitle}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((group) => (
              <span
                key={group.category}
                className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs text-secondary"
              >
                <Sparkles className="h-3 w-3" /> {group.category}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center transition-colors hover:border-primary/40 lg:text-left"
            >
              <p className="font-display text-4xl font-bold text-gradient">{stat.value}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
