"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

interface ExperienceItem {
  id: string;
  num: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "sevima",
    num: "01",
    role: "Data Analyst",
    company: "PT Sentra Vidya Utama (SEVIMA)",
    period: "Feb 2025 – Aug 2025",
    location: "Surabaya, Indonesia",
    summary:
      "Conducted data analysis and automated processing workflows on EdLink, a national university LMS platform.",
    bullets: [
      "Analyzed student activity datasets to evaluate the quantitative impact of gamification features on daily learning behavior.",
      "Identified user retention patterns by examining student navigation paths across core learning modules.",
      "Developed Python automation scripts for web data extraction, improving data collection efficiency by 40%.",
      "Processed unstructured multi-format documents into structured datasets using Optical Character Recognition (OCR).",
      "Created data visualizations and infographics supporting the EdLink web application release.",
    ],
    skills: ["Python", "SQL", "EdLink LMS", "OCR", "Pandas", "Data Analytics"],
  },
  {
    id: "telkom",
    num: "02",
    role: "UI/UX Designer",
    company: "Digistar Class — Telkom Indonesia",
    period: "Jul 2024 – Oct 2024",
    location: "Remote",
    summary:
      "Collaborated in agile cross-functional triads (Hacker, Hustler, Hipster) to research and design digital product interfaces.",
    bullets: [
      "Conducted user research and interviews to define user personas and map pain points.",
      "Built interactive prototypes and wireframes in Figma to translate product requirements into intuitive flows.",
      "Maintained structured component libraries to ensure design-to-development consistency.",
      "Iterated on application usability and accessibility based on stakeholder and mentor feedback.",
    ],
    skills: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping"],
  },
  {
    id: "gim",
    num: "03",
    role: "Game Designer",
    company: "Ganesha Interactive Media (GIM)",
    period: "Sep 2023 – Nov 2024",
    location: "Bandung / Remote",
    summary:
      "Designed core gameplay mechanics, procedural content algorithms, and in-game economy models.",
    bullets: [
      "Designed and programmed a procedural content generation system, reducing manual level design time by 30%.",
      "Modeled mathematical game economy balance curves, contributing to a 20% increase in virtual goods sales.",
      "Engineered core gameplay loops and fortification mechanics that increased player engagement by 20%.",
      "Collaborated with artists and engineers to refine visual feedback and game design documents (GDD).",
    ],
    skills: ["Godot Engine", "Game Economy Math", "Procedural Generation", "Level Design", "GDD"],
  },
  {
    id: "infinite",
    num: "04",
    role: "Hyper Cloud & AI Participant",
    company: "Infinite Learning Indonesia (IBM Program)",
    period: "Aug 2023 – Jan 2024",
    location: "Remote",
    summary:
      "Enterprise training program in collaboration with IBM focusing on Red Hat Linux administration and AI fundamentals.",
    bullets: [
      "Administered Red Hat Enterprise Linux systems, including storage volume management and network setup.",
      "Configured Security-Enhanced Linux (SELinux) access control policies and permission structures.",
      "Studied enterprise machine learning workflows and trustworthy AI architectural guidelines.",
    ],
    skills: ["Red Hat Linux", "SELinux", "IBM Cloud", "Enterprise AI", "Shell"],
  },
  {
    id: "digistar-club",
    num: "05",
    role: "Creative Rangers",
    company: "Digistar Club ITS",
    period: "Dec 2024 – Mar 2026",
    location: "Surabaya, Indonesia",
    summary:
      "Designed high-impact visual media, structured PowerPoint presentation decks, and communicative graphics for student tech mentorship.",
    bullets: [
      "Designed creative visual assets and social media communications to elevate program awareness and member engagement.",
      "Crafted professional, communicative PowerPoint presentation decks for internal training and external keynote sessions.",
      "Supported cross-disciplinary mentorship and collaborative programs with clear, impactful visual assets.",
      "Collaborated closely with program and content teams to ensure strict visual identity consistency across channels.",
    ],
    skills: ["Visual Design", "PowerPoint Deck Design", "Digital Media", "Brand Identity", "Content Strategy"],
  },
  {
    id: "levelup-community",
    num: "06",
    role: "Community Staff",
    company: "Level UP! Indonesia (Surabaya Chapter)",
    period: "Apr 2024 – Present",
    location: "Surabaya / Remote",
    summary:
      "Spearheaded youth empowerment through educational workshops, mentoring sessions, and community tech initiatives.",
    bullets: [
      "Facilitated interactive peer workshops covering design thinking, digital productivity workflows, and technology literacy.",
      "Organized community empowerment events and mentored students on career readiness and essential digital competencies.",
      "Collaborated with community leadership to design and distribute educational resources to youth across chapters.",
    ],
    skills: ["Community Leadership", "Youth Empowerment", "Workshop Facilitation", "Peer Mentorship"],
  },
];

export default function Experience({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const [activeId, setActiveId] = useState<string>("sevima");

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Diego Vue smooth translate3d scroll parallax effect
  const bgTextX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? "" : id);
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`relative py-24 sm:py-32 px-6 sm:px-10 border-t overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-[#0e0e12] border-[#1e1e28] text-[#e8e8f0]"
          : "bg-white border-gray-200 text-[#111118]"
      }`}
    >
      {/* Diego Vue Bottom Animated Watermark Text (tp-services-bottom-text tp-services-bg-text) */}
      <div className="tp-services-bottom-text tp-services-bg-text absolute -bottom-10 sm:-bottom-14 left-0 right-0 pointer-events-none select-none overflow-hidden flex justify-center z-0">
        <motion.p
          style={{ x: bgTextX }}
          className={`font-sora font-extrabold text-[120px] sm:text-[180px] md:text-[230px] lg:text-[280px] uppercase tracking-tighter leading-none whitespace-nowrap text-center ${
            isDark
              ? "text-white opacity-[0.03] mix-blend-luminosity"
              : "text-[#171718] opacity-[0.04] mix-blend-luminosity"
          }`}
        >
          Experiences
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN: Title & Overview (Sticky) ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Subtitle */}
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ff6b4a] mb-3">
              Experience
            </p>

            {/* Display Headline */}
            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] mb-6">
              Roles <span className="font-light text-[#8888a0]">&</span> <br />
              impact delivered<span className="text-[#ff6b4a]">.</span>
            </h2>

            {/* Narrative Overview */}
            <p
              className={`text-base leading-relaxed mb-8 max-w-md ${
                isDark ? "text-[#9999b0]" : "text-gray-600"
              }`}
            >
              Applying mathematical modeling, data extraction pipelines, and interactive game systems to solve concrete technical challenges across enterprise platforms and creative studios.
            </p>

            {/* Direct ATS Resume Action */}
            <div className="pt-2">
              <a
                href="/cv/CV_ATS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-xs font-semibold px-5 py-3 rounded-lg border transition-all ${
                  isDark
                    ? "border-[#2a2a38] text-white hover:border-[#ff6b4a] hover:text-[#ff6b4a] hover:bg-[#14141c]"
                    : "border-gray-300 text-gray-800 hover:border-[#ff6b4a] hover:text-[#ff6b4a] hover:bg-gray-50"
                }`}
              >
                <span>Download ATS Resume (PDF)</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Diego Vue Accordion Rows ================= */}
          <div className="lg:col-span-7">
            <div
              className={`border-t ${
                isDark ? "border-[#22222e]" : "border-gray-200"
              }`}
            >
              {experiences.map((exp) => {
                const isOpen = activeId === exp.id;

                return (
                  <div
                    key={exp.id}
                    className={`border-b transition-colors duration-200 ${
                      isDark
                        ? isOpen
                          ? "border-[#2f2f3e] bg-[#14141c]/40"
                          : "border-[#1c1c26] hover:bg-[#14141c]/20"
                        : isOpen
                        ? "border-gray-300 bg-gray-50/60"
                        : "border-gray-200 hover:bg-gray-50/30"
                    }`}
                  >
                    {/* Accordion Row Header */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(exp.id)}
                      className="w-full py-6 px-4 sm:px-6 flex items-start justify-between gap-4 text-left cursor-pointer select-none group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                        {/* Number Index (Diego style span: 01, 02) */}
                        <span
                          className={`font-mono text-xs sm:text-sm font-semibold pt-1 transition-colors ${
                            isOpen
                              ? "text-[#ff6b4a]"
                              : isDark
                              ? "text-[#66667a] group-hover:text-[#9999b0]"
                              : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        >
                          {exp.num}
                        </span>

                        <div className="flex-1 min-w-0">
                          {/* Role and Company */}
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2.5 mb-1.5">
                            <h3
                              className={`font-sora text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                                isOpen
                                  ? "text-[#ff6b4a]"
                                  : isDark
                                  ? "text-white group-hover:text-[#ff6b4a]"
                                  : "text-[#111118] group-hover:text-[#ff6b4a]"
                              }`}
                            >
                              {exp.role}
                            </h3>
                            <span
                              className={`text-sm truncate ${
                                isDark ? "text-[#8888a0]" : "text-gray-500"
                              }`}
                            >
                              · {exp.company}
                            </span>
                          </div>

                          {/* Period & Location Metadata */}
                          <p
                            className={`text-xs ${
                              isDark ? "text-[#77778c]" : "text-gray-500"
                            }`}
                          >
                            {exp.period} · {exp.location}
                          </p>
                        </div>
                      </div>

                      {/* Clean Expand Toggle (+ / -) */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center border flex-shrink-0 mt-1 transition-colors ${
                          isOpen
                            ? "bg-[#ff6b4a] border-[#ff6b4a] text-white"
                            : isDark
                            ? "border-[#2a2a38] text-[#8888a0] group-hover:border-[#ff6b4a]/60 group-hover:text-white"
                            : "border-gray-300 text-gray-500 group-hover:border-[#ff6b4a]/60 group-hover:text-gray-800"
                        }`}
                      >
                        {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                      </div>
                    </button>

                    {/* Accordion Row Body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-6 pb-6 pt-1 sm:pl-16">
                            {/* Summary description */}
                            <p
                              className={`text-sm leading-relaxed mb-4 ${
                                isDark ? "text-[#c0c0d4]" : "text-gray-700"
                              }`}
                            >
                              {exp.summary}
                            </p>

                            {/* Clean, authentic bullet points */}
                            <ul className="space-y-2 mb-5">
                              {exp.bullets.map((b, i) => (
                                <li
                                  key={i}
                                  className={`text-xs sm:text-sm pl-4 relative leading-relaxed ${
                                    isDark ? "text-[#9999b0]" : "text-gray-600"
                                  }`}
                                >
                                  <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#ff6b4a]" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Monospace Tech Tags */}
                            <div className="flex flex-wrap gap-2 pt-1">
                              {exp.skills.map((skill, si) => (
                                <span
                                  key={si}
                                  className={`text-[11px] font-mono px-2.5 py-1 rounded border ${
                                    isDark
                                      ? "bg-[#181824] border-[#2a2a38] text-[#e0e0f0]"
                                      : "bg-gray-100 border-gray-200 text-gray-800"
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
