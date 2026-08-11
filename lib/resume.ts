import fs from "fs";
import path from "path";

const RESUME_PATH = path.join(process.cwd(), "content", "resume.md");

export interface ContactInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Entry {
  title: string;
  dateRange: string;
  subtitle: string;
  meta: string[];
  bullets: string[];
}

export interface Project {
  title: string;
  bullets: string[];
  linkLabel: string;
  linkUrl: string;
}

export interface ResumeData {
  contact: ContactInfo;
  summary: string;
  skills: SkillGroup[];
  experience: Entry[];
  education: Entry[];
  projects: Project[];
  certifications: Entry[];
  achievements: Entry[];
}

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (/^(https?:)?\/\//i.test(trimmed)) {
    return trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;
  }
  if (/^mailto:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function splitEntries(sectionBody: string): string[] {
  const lines = sectionBody.split("\n");
  const chunks: string[] = [];
  let currentChunk: string[] = [];

  for (const line of lines) {
    if (line.trim().startsWith("**")) {
      if (currentChunk.length > 0) {
        const str = currentChunk.join("\n").trim();
        if (str) chunks.push(str);
      }
      currentChunk = [line];
    } else {
      currentChunk.push(line);
    }
  }
  if (currentChunk.length > 0) {
    const str = currentChunk.join("\n").trim();
    if (str) chunks.push(str);
  }

  if (chunks.length === 0) {
    return sectionBody
      .split(/\n\s*\n/)
      .map((chunk) => chunk.trim())
      .filter(Boolean);
  }

  return chunks;
}

function parseEntry(chunk: string): Entry {
  const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
  let title = "";
  let dateRange = "";
  let subtitle = "";
  const meta: string[] = [];
  const bullets: string[] = [];

  for (const line of lines) {
    if (line.startsWith("- ") || line.startsWith("* ")) {
      bullets.push(line.replace(/^[-*]\s*/, "").trim());
      continue;
    }
    if (!subtitle && /^\*[^*].*\*$/.test(line)) {
      subtitle = line.replace(/^\*/, "").replace(/\*$/, "").trim();
      continue;
    }
    if (!title) {
      const boldMatch = line.match(/^\*\*(.+?)\*\*\s*(?:—|–|-)?\s*(.*)$/);
      if (boldMatch) {
        title = boldMatch[1].trim();
        dateRange = boldMatch[2].trim();
      } else {
        const dashMatch = line.match(/^(.+?)\s*(?:—|–)\s*(.*)$/);
        if (dashMatch) {
          title = dashMatch[1].trim();
          dateRange = dashMatch[2].trim();
        } else {
          title = line.trim();
        }
      }
      continue;
    }
    meta.push(line);
  }

  return { title, dateRange, subtitle, meta, bullets };
}

function parseProject(chunk: string): Project {
  const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
  let title = "";
  const bullets: string[] = [];
  let linkLabel = "";
  let linkUrl = "";

  for (const line of lines) {
    const linkMatch = line.match(/^\[(.+?)\]\((.+?)\)$/);
    if (linkMatch) {
      linkLabel = linkMatch[1].trim();
      linkUrl = normalizeUrl(linkMatch[2]);
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      bullets.push(line.replace(/^[-*]\s*/, "").trim());
      continue;
    }
    if (!title) {
      title = line.replace(/\*\*/g, "").trim();
      continue;
    }
  }

  return { title, bullets, linkLabel, linkUrl };
}

function parseSkills(sectionBody: string): SkillGroup[] {
  const lines = sectionBody.split("\n").map((l) => l.trim()).filter(Boolean);
  const groups: SkillGroup[] = [];
  for (const line of lines) {
    const clean = line.replace(/^[-*]\s*/, "").replace(/\*\*/g, "").trim();
    const colonIndex = clean.indexOf(":");
    if (colonIndex !== -1) {
      const category = clean.slice(0, colonIndex).trim();
      const items = clean
        .slice(colonIndex + 1)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      groups.push({ category, items });
    }
  }
  return groups;
}

function parseContact(headerBlock: string): { contact: ContactInfo } {
  const lines = headerBlock.split("\n").map((l) => l.trim()).filter(Boolean);
  const name = (lines[0] || "").replace(/^#\s*/, "").trim();
  const title = (lines[1] || "").replace(/^\*/, "").replace(/\*$/, "").trim();
  const contactLine = lines[2] || "";
  const parts = contactLine.split("|").map((p) => p.trim());

  let location = "";
  let phone = "";
  let email = "";
  let linkedin = "";
  let github = "";

  for (const part of parts) {
    const mailtoMatch = part.match(/\[.*?\]\(mailto:(.+?)\)/);
    const linkMatch = part.match(/\[(.+?)\]\((.+?)\)/);
    if (mailtoMatch) {
      email = mailtoMatch[1];
    } else if (linkMatch && /linkedin/i.test(linkMatch[2])) {
      linkedin = normalizeUrl(linkMatch[2]);
    } else if (linkMatch && /github/i.test(linkMatch[2])) {
      github = normalizeUrl(linkMatch[2]);
    } else if (/^\+?[\d\s()-]{7,}$/.test(part)) {
      phone = part;
    } else if (part) {
      location = part;
    }
  }

  return { contact: { name, title, location, phone, email, linkedin, github } };
}

let cached: ResumeData | null = null;

export function getResumeData(): ResumeData {
  if (cached) return cached;

  const raw = fs.readFileSync(RESUME_PATH, "utf-8").replace(/\\&/g, "&");
  const sectionSplit = raw.split(/\n(?=## )/g);
  const headerBlock = sectionSplit[0];
  const { contact } = parseContact(headerBlock);

  const sections: Record<string, string> = {};
  for (let i = 1; i < sectionSplit.length; i++) {
    const block = sectionSplit[i];
    const headingMatch = block.match(/^##\s*(.+?)\s*\n([\s\S]*)$/);
    if (headingMatch) {
      const normalizedKey = headingMatch[1]
        .replace(/\\&/g, "&")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase();
      sections[normalizedKey] = headingMatch[2].trim();
    }
  }

  const summary = sections["SUMMARY"] || "";
  const skills = parseSkills(sections["TECHNICAL SKILLS"] || "");
  const experience = splitEntries(sections["WORK EXPERIENCE"] || "").map(parseEntry);
  const education = splitEntries(sections["EDUCATION"] || "").map(parseEntry);
  const projects = splitEntries(sections["PROJECTS"] || "").map(parseProject);
  const certifications = splitEntries(sections["CERTIFICATIONS"] || "").map(parseEntry);
  const achievements = splitEntries(
    sections["AWARDS & LEADERSHIP EXPERIENCE"] ||
      sections["AWARDS AND LEADERSHIP EXPERIENCE"] ||
      sections["ACHIEVEMENTS"] ||
      ""
  ).map(parseEntry);

  cached = {
    contact,
    summary,
    skills,
    experience,
    education,
    projects,
    certifications,
    achievements,
  };

  return cached;
}
