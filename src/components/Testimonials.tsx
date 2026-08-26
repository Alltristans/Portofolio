"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Reza Pratama",
    role: "Lecturer, Department of Mathematics ITS",
    text: "Alridho demonstrates exceptional analytical thinking and creativity. His ability to blend mathematical rigor with artistic vision is truly remarkable—a rare combination in any student.",
    avatar: "RP",
  },
  {
    name: "Siti Aminah",
    role: "Team Lead, Data Project Collaboration",
    text: "Working with Alridho was a pleasure. He brings both technical expertise in data science and a creative perspective that elevates any project he touches. Highly recommend!",
    avatar: "SA",
  },
  {
    name: "Budi Santoso",
    role: "Mentor, RevoU Mini Course",
    text: "One of the most curious and dedicated learners I've mentored. Alridho absorbs new concepts quickly and applies them with real-world creativity. A future data science leader.",
    avatar: "BS",
  },
];

export default function Testimonials({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className={`py-24 px-6 ${isDark ? "bg-[#16161c]" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="text-[#ff6b4a] text-sm font-semibold uppercase tracking-widest text-center mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What People Say
        </motion.p>
        <motion.h2
          className={`font-sora font-bold text-3xl md:text-4xl text-center mb-16 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Testimonials
        </motion.h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className={`p-8 md:p-12 rounded-2xl border text-center ${
                isDark ? "bg-[#1c1c24] border-[#2a2a38]" : "bg-[#f5f5f8] border-gray-200"
              }`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35 }}
            >
              <Quote size={36} className="text-[#ff6b4a] mx-auto mb-6 opacity-60" />
              <p className={`text-lg leading-relaxed mb-8 italic ${isDark ? "text-[#e8e8f0]" : "text-gray-700"}`}>
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ff6b4a] flex items-center justify-center font-bold text-white text-sm">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <p className={`font-semibold ${isDark ? "text-white" : "text-[#1a1a2e]"}`}>
                    {testimonials[current].name}
                  </p>
                  <p className={`text-sm ${isDark ? "text-[#8888a0]" : "text-gray-400"}`}>
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-[#ff6b4a] hover:border-[#ff6b4a] hover:text-white ${
                isDark ? "border-[#2a2a38] text-[#8888a0]" : "border-gray-200 text-gray-400"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-[#ff6b4a]" : `w-2 ${isDark ? "bg-[#2a2a38]" : "bg-gray-300"}`
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-[#ff6b4a] hover:border-[#ff6b4a] hover:text-white ${
                isDark ? "border-[#2a2a38] text-[#8888a0]" : "border-gray-200 text-gray-400"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
