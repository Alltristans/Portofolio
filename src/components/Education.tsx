"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import manifest from "@/data/manifest.json";

export default function Education({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const { university } = manifest;

  return (
    <section
      id="education"
      className={`py-24 px-6 ${isDark ? "bg-[#16161c]" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="text-[#ff6b4a] text-sm font-semibold uppercase tracking-widest text-center mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Background
        </motion.p>
        <motion.h2
          className={`font-sora font-bold text-3xl md:text-4xl text-center mb-16 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className={`absolute left-8 top-0 bottom-0 w-px ${isDark ? "bg-[#2a2a38]" : "bg-gray-200"}`} />

          <div className="space-y-10">
            {university.map((u, i) => (
              <motion.div
                key={u.name}
                className="relative pl-24"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {/* Logo as timeline node */}
                <div
                  className={`absolute left-0 top-2 w-16 h-16 rounded-xl overflow-hidden border-2 border-[#ff6b4a40] ${
                    isDark ? "bg-white" : "bg-white"
                  } flex items-center justify-center p-1`}
                >
                  <Image
                    src={u.src}
                    alt={u.name}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>

                <div
                  className={`p-6 rounded-2xl border ${
                    isDark ? "bg-[#1c1c24] border-[#2a2a38]" : "bg-[#f5f5f8] border-gray-200"
                  }`}
                >
                  <p className="text-[#ff6b4a] text-xs font-semibold uppercase tracking-wider mb-1">{u.period}</p>
                  <h3 className={`font-sora font-bold text-lg mb-1 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}>
                    {u.degree}
                  </h3>
                  <p className={`font-medium text-sm mb-1 ${isDark ? "text-[#e8e8f0]" : "text-gray-700"}`}>
                    {u.name}
                  </p>
                  <p className={`text-sm ${isDark ? "text-[#8888a0]" : "text-gray-500"}`}>
                    {u.department}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
