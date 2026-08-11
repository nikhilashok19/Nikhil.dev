import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getResumeData } from "@/lib/resume";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const resume = getResumeData();
const siteUrl = "https://nikhilashok.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${resume.contact.name} — ${resume.contact.title}`,
    template: `%s — ${resume.contact.name}`,
  },
  description: resume.summary,
  keywords: [
    "Nikhil Ashok",
    "Embedded Systems Engineer",
    "IoT Developer",
    "Flutter Developer",
    "ESP32",
    "Firebase",
    "Portfolio",
  ],
  authors: [{ name: resume.contact.name, url: resume.contact.github }],
  creator: resume.contact.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${resume.contact.name} — ${resume.contact.title}`,
    description: resume.summary,
    siteName: `${resume.contact.name} Portfolio`,
    images: [{ url: "/images/profile.jpg", width: 1200, height: 1200, alt: resume.contact.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${resume.contact.name} — ${resume.contact.title}`,
    description: resume.summary,
    images: ["/images/profile.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resume.contact.name,
    jobTitle: resume.contact.title,
    email: resume.contact.email,
    address: resume.contact.location,
    url: siteUrl,
    sameAs: [resume.contact.linkedin, resume.contact.github].filter(Boolean),
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body bg-bg text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <Navbar name={resume.contact.name} />
        <main>{children}</main>
        <Footer contact={resume.contact} />
        <BackToTop />
      </body>
    </html>
  );
}
