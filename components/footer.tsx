import { Github, Linkedin, Mail } from "lucide-react";
import type { ContactInfo } from "@/lib/resume";

export function Footer({ contact }: { contact: ContactInfo }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row lg:px-8">
        <p className="font-mono text-xs text-muted">
          © {year} {contact.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="text-muted transition-colors hover:text-primary"
            >
              <Mail className="h-5 w-5" />
            </a>
          )}
          <a href="#home" className="font-mono text-xs text-muted transition-colors hover:text-primary">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
