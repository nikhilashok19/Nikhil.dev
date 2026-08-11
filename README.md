# Nikhil Ashok — Portfolio

A production-ready developer portfolio built with Next.js 15 (App Router), React 19, TypeScript,
Tailwind CSS, and Framer Motion. Every section — About, Skills, Projects, Experience, Education,
Certifications, and Achievements — is generated automatically by parsing `content/resume.md`.
**No component contains hardcoded resume content.**

## Tech stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS for styling
- Framer Motion for animation
- Lucide React for icons
- react-markdown for inline markdown (bold/italic) inside bullet text
- A custom markdown parser (`lib/resume.ts`) — no CMS, no database, just your resume file

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To create a production build:

```bash
npm run build
npm start
```

## Updating your content

### 1. Resume text (About, Skills, Projects, Experience, Education, Certifications, Achievements)

Edit `content/resume.md`. The parser expects the same structure as the original file:

- `# Name`, `*Title*`, and a contact line with `|`-separated location / phone / `[email](mailto:...)` /
  `[LinkedIn](url)` / `[GitHub](url)`
- `## SECTION HEADINGS` in the same order/names used today (`SUMMARY`, `TECHNICAL SKILLS`,
  `WORK EXPERIENCE`, `EDUCATION`, `PROJECTS`, `CERTIFICATIONS`, `AWARDS & LEADERSHIP EXPERIENCE`)
- Skills as `- **Category:** item, item, item`
- Experience / Education / Certifications / Achievements entries as blank-line-separated blocks
  starting with `**Title** — Date range`, an optional `*Subtitle*` line, then `- bullet` lines
- Projects as blank-line-separated blocks: `**Title**`, `- bullet` lines, then an optional
  `[label](url)` link line

Save the file and restart the dev server (or redeploy) — every section updates automatically.

### 2. Resume PDF

Replace `public/resume/Nikhil_Ashok_CV.pdf` with your real CV, **keeping the exact same filename**.
The file currently in that folder is a placeholder that explains this — swap it out and the
Download CV button and the embedded preview in the Resume section start working immediately, with
no code changes.

### 3. Profile photo

Replace `public/images/profile.jpg` with a new image (same filename) to update the hero photo.

## Notes on a few deliberate choices

- **Contact section**: per your instruction, this ships as a direct `mailto:` / `tel:` /
  social-link CTA rather than a third-party form service (no EmailJS keys were provided). If you'd
  like a real working contact form later, drop in EmailJS or Resend credentials and I can wire up
  `components/contact.tsx` to submit through them.
- **Project links**: each project card has a single clickable link (currently pointing at the
  GitHub URLs in your resume). Swap the URL in `content/resume.md` to a live demo link any time —
  no code changes needed.
- **Project tags**: the small tech badges on each project card are derived by matching your actual
  Technical Skills list against each project's description — nothing is invented.
- **Favicon**: a simple placeholder monogram (`N`) in the brand palette is included at
  `app/favicon.ico` — replace it with a real logo whenever you have one.

## Project structure

```
portfolio/
├── app/
│   ├── layout.tsx        # fonts, metadata, JSON-LD, global chrome
│   ├── page.tsx           # assembles every section from resume data
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   └── favicon.ico
├── components/             # one component per section + shared UI
├── content/
│   └── resume.md           # single source of truth
├── lib/
│   ├── resume.ts            # markdown → typed data parser
│   └── utils.ts
├── hooks/
│   └── use-typing.ts
└── public/
    ├── images/profile.jpg
    └── resume/Nikhil_Ashok_CV.pdf
```

## Deployment

The project deploys as-is to [Vercel](https://vercel.com) (recommended — zero config for Next.js):

```bash
npx vercel
```

Or any Node hosting that supports Next.js (Netlify, Render, a VPS with `npm run build && npm start`).

## SEO & performance

- Metadata, Open Graph, and Twitter Card tags are generated from your resume data in `app/layout.tsx`
- `sitemap.ts` and `robots.ts` are generated dynamically
- JSON-LD `Person` schema is embedded for rich search results
- Images use `next/image` for automatic optimization; fonts load via `next/font` with no layout shift
- Animations respect `prefers-reduced-motion`
