"use client";

import { Download, FileText } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const RESUME_PATH = "/resume/Nikhil%20Ashok.pdf";

export function ResumeSection() {
  return (
    <section id="resume"></section>
    // <section id="resume" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
    //   <SectionHeading
    //     eyebrow="resume"
    //     title="Resume"
    //     description="Preview it inline or download the PDF for offline reading."
    //   />

    //   <div className="glass overflow-hidden rounded-2xl">
    //     <div className="flex flex-col items-center justify-between gap-4 border-b border-border p-6 sm:flex-row">
    //       <div className="flex items-center gap-3">
    //         <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
    //           <FileText className="h-5 w-5" />
    //         </span>
    //         <div>
    //           <p className="font-display font-semibold text-text">Nikhil Ashok.pdf</p>
    //           <p className="font-mono text-xs text-muted">CV Live Preview</p>
    //         </div>
    //       </div>
    //       <a
    //         href={RESUME_PATH}
    //         download="Nikhil Ashok.pdf"
    //         className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
    //       >
    //         <Download className="h-4 w-4" />
    //         Download CV
    //       </a>
    //     </div>

    //     <object data={RESUME_PATH} type="application/pdf" className="h-[70vh] w-full">
    //       <div className="flex h-[40vh] flex-col items-center justify-center gap-3 p-8 text-center">
    //         <FileText className="h-8 w-8 text-muted" />
    //         <p className="text-muted">
    //           CV Live Preview. If the document fails to load, please download the CV below.
    //         </p>
    //       </div>
    //     </object>
    //   </div>
    // </section>
  );
}
