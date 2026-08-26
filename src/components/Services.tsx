"use client";
import { motion } from "framer-motion";
import { Monitor, Palette, Smartphone } from "lucide-react";

const services = [
  {
    icon: <Monitor size={32} className="text-[#ff6b4a]" />,
    title: "Website Design",
    desc: "Modern, responsive web experiences built with Next.js, React, and cutting-edge UI frameworks. From landing pages to full-stack applications.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    icon: <Palette size={32} className="text-[#ff6b4a]" />,
    title: "Logo & Brand Design",
    desc: "Creative visual identities that communicate your brand story. Digital illustrations, logos, and brand guidelines crafted with precision.",
    tags: ["Illustrator", "Figma", "Branding"],
  },
  {
    icon: <Smartphone size={32} className="text-[#ff6b4a]" />,
    title: "Apps Development",
    desc: "Cross-platform mobile and desktop applications. Clean architecture, intuitive UX, and scalable codebase for your product.",
    tags: ["Python", "TypeScript", "UI/UX"],
  },
];

export default function Services({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";

  return (
    <section
      id="services"
      className={`py-24 px-6 ${isDark ? "bg-[#16161c]" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-[#ff6b4a] text-sm font-semibold uppercase tracking-widest text-center mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What I Do
        </motion.p>
        <motion.h2
          className={`font-sora font-bold text-3xl md:text-4xl text-center mb-16 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className={`p-8 rounded-2xl border transition-all group cursor-default ${
                isDark
                  ? "bg-[#1c1c24] border-[#2a2a38] hover:border-[#ff6b4a40]"
                  : "bg-[#f5f5f8] border-gray-200 hover:border-[#ff6b4a]"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="mb-5 p-3 inline-block rounded-xl bg-[#ff6b4a15]">
                {s.icon}
              </div>
              <h3 className={`font-sora font-bold text-xl mb-3 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}>
                {s.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-5 ${isDark ? "text-[#8888a0]" : "text-gray-500"}`}>
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-[#ff6b4a15] text-[#ff6b4a]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
