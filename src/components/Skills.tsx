"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    year: "2020–2021",
    category: "Programming Foundations",
    items: [
      { name: "Python", level: 85 },
      { name: "SQL", level: 80 },
      { name: "HTML & CSS", level: 75 },
    ],
  },
  {
    year: "2022–2023",
    category: "Data Science & AI",
    items: [
      { name: "Data Analysis", level: 88 },
      { name: "Machine Learning", level: 78 },
      { name: "Data Visualization", level: 85 },
    ],
  },
  {
    year: "2024–Present",
    category: "Advanced & Creative",
    items: [
      { name: "Cloud (Azure, GCP)", level: 72 },
      { name: "React / Next.js", level: 70 },
      { name: "Digital Illustration", level: 90 },
    ],
  },
];

function SkillBar({ name, level, isDark }: { name: string; level: number; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className={isDark ? "text-[#e8e8f0]" : "text-[#1a1a2e]"}>{name}</span>
        <span className="text-[#ff6b4a] font-semibold">{level}%</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-[#2a2a38]" : "bg-gray-200"}`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#ff6b4a] to-[#ff9a5c]"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";

  return (
    <section
      id="skills"
      className={`py-24 px-6 ${isDark ? "bg-[#0e0e12]" : "bg-[#f5f5f8]"}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-[#ff6b4a] text-sm font-semibold uppercase tracking-widest text-center mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          My Expertise
        </motion.p>
        <motion.h2
          className={`font-sora font-bold text-3xl md:text-4xl text-center mb-16 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className={`absolute left-6 top-0 bottom-0 w-px ${isDark ? "bg-[#2a2a38]" : "bg-gray-200"} hidden md:block`} />

          <div className="space-y-12">
            {skills.map((block, i) => (
              <motion.div
                key={block.year}
                className="md:pl-20 relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 top-2 w-12 h-12 rounded-full border-2 border-[#ff6b4a] bg-[#ff6b4a20] items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#ff6b4a]" />
                </div>

                <div className="mb-2">
                  <span className="text-[#ff6b4a] text-xs font-semibold uppercase tracking-widest">{block.year}</span>
                  <h3 className={`font-sora font-bold text-xl mt-1 mb-4 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}>
                    {block.category}
                  </h3>
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    isDark ? "bg-[#16161c] border-[#2a2a38]" : "bg-white border-gray-200"
                  }`}
                >
                  {block.items.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} isDark={isDark} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
