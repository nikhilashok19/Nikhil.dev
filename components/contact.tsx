import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import type { ContactInfo } from "@/lib/resume";

export function Contact({ contact }: { contact: ContactInfo }) {
  const cards = [
    contact.email && {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    contact.phone && {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    },
    contact.linkedin && {
      icon: Linkedin,
      label: "LinkedIn",
      value: contact.linkedin.replace(/^https?:\/\//, ""),
      href: contact.linkedin,
    },
    contact.github && {
      icon: Github,
      label: "GitHub",
      value: contact.github.replace(/^https?:\/\//, ""),
      href: contact.github,
    },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string }[];

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading
        eyebrow="contact"
        title="Let's build something"
        description="Open to internships, IoT/embedded roles, and collaborations. Reach out directly — it opens right in your mail app."
      />

      <div className="glass flex flex-col items-start gap-6 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Mail className="h-6 w-6" />
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Say hello</p>
            <p className="font-display text-xl font-bold text-text">{contact.email}</p>
          </div>
        </div>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <Mail className="h-4 w-4" />
          Contact me
        </a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            target={card.label === "Email" || card.label === "Phone" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="glass group flex items-center gap-3 rounded-2xl p-5 transition-colors hover:border-secondary/40"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <card.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{card.label}</p>
              <p className="truncate text-sm text-text group-hover:text-secondary">{card.value}</p>
            </div>
          </a>
        ))}
        <div className="glass flex items-center gap-3 rounded-2xl p-5 sm:col-span-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <MapPin className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Location</p>
            <p className="text-sm text-text">{contact.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
