"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { useTyping } from "@/hooks/use-typing";
import type { ContactInfo } from "@/lib/resume";

const KEYWORDS = [
  "embedded systems hardware",
  "IoT product delivery",
  "Flutter app deployment",
  "cloud-connected pipelines",
];

export function Hero({ contact }: { contact: ContactInfo }) {
  const typed = useTyping(KEYWORDS);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="bg-radial-fade pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="eyebrow flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-secondary">
            <MapPin className="h-3.5 w-3.5" /> {contact.location}
          </p>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{contact.name}</span>
          </h1>

          <p className="mt-4 font-display text-xl font-medium text-muted sm:text-2xl">
            {contact.title}
          </p>

          <div className="mt-6 flex h-8 items-center font-mono text-base text-primary sm:text-lg">
            <span>{typed}</span>
            <span className="ml-1 inline-block h-5 w-[2px] animate-blink bg-primary" />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/resume/Nikhil%20Ashok.pdf"
              download="Nikhil Ashok.pdf"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Download CV
            </a>
            <a
              href="#projects"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-text transition-colors hover:border-primary/40 hover:text-primary"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-muted transition-colors hover:text-text"
            >
              <Mail className="h-4 w-4" />
              Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80"
        >
          <div className="absolute inset-0 animate-glow rounded-full bg-gradient-to-tr from-primary via-secondary to-accent opacity-70" />
          <div className="absolute inset-[6px] animate-border-spin rounded-full bg-[conic-gradient(from_0deg,#3B82F6,#06B6D4,#8B5CF6,#3B82F6)] opacity-90" />
          <div className="animate-float absolute inset-[14px] overflow-hidden rounded-full border-4 border-bg bg-card">
            <Image
              src="/images/profile.jpg"
              alt={`${contact.name} — ${contact.title}`}
              fill
              priority
              sizes="320px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-primary sm:block"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
