import { getResumeData } from "@/lib/resume";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Timeline } from "@/components/timeline";
import { EntryCards } from "@/components/entry-cards";
import { ResumeSection } from "@/components/resume-section";
import { Contact } from "@/components/contact";

export default function Home() {
  const resume = getResumeData();

  return (
    <>
      <Hero contact={resume.contact} />
      <About resume={resume} />
      <Skills skills={resume.skills} />
      <Projects projects={resume.projects} skills={resume.skills} />
      <Timeline
        id="experience"
        eyebrow="experience"
        title="Work experience"
        description="Where I've shipped hardware and software into the field."
        entries={resume.experience}
        icon="briefcase"
      />
      <Timeline
        id="education"
        eyebrow="education"
        title="Education"
        entries={resume.education}
        icon="graduation"
      />
      <EntryCards
        id="certifications"
        eyebrow="certifications"
        title="Certifications"
        entries={resume.certifications}
        icon="award"
      />
      <EntryCards
        id="achievements"
        eyebrow="achievements"
        title="Awards & leadership"
        entries={resume.achievements}
        icon="trophy"
      />
      <ResumeSection />
      <Contact contact={resume.contact} />
    </>
  );
}
