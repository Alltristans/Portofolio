"use client";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    category: "Data Science",
    date: "December 2025",
    title: "Getting Started with Microsoft Fabric for Data Science",
    excerpt:
      "Microsoft Fabric unifies data engineering, analytics, and science in one platform. Here's how I used it to build end-to-end data pipelines and train ML models without juggling multiple services.",
    readTime: "6 min read",
  },
  {
    category: "AI & ML",
    date: "November 2025",
    title: "Prompt Engineering Tips That Actually Work for Developers",
    excerpt:
      "After completing both IBM and Dicoding prompt engineering courses, here are the practical patterns that genuinely improved my AI-assisted coding workflow—no fluff, just what works.",
    readTime: "4 min read",
  },
  {
    category: "Art & Photography",
    date: "August 2025",
    title: "5 Years of Digital Illustration: Lessons from 90+ Works",
    excerpt:
      "From my first shaky sketch in 2020 to a portfolio of 90+ pieces, I share what changed in my creative process, tools, and mindset over five years of consistent practice.",
    readTime: "8 min read",
  },
];

export default function Blog({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";

  return (
    <section
      id="blog"
      className={`py-24 px-6 ${isDark ? "bg-[#16161c]" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-[#ff6b4a] text-sm font-semibold uppercase tracking-widest text-center mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Thoughts & Insights
        </motion.p>
        <motion.h2
          className={`font-sora font-bold text-3xl md:text-4xl text-center mb-16 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Latest Blog Posts
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              className={`rounded-2xl border overflow-hidden flex flex-col group cursor-pointer ${
                isDark ? "bg-[#1c1c24] border-[#2a2a38] hover:border-[#ff6b4a40]" : "bg-[#f5f5f8] border-gray-200 hover:border-[#ff6b4a]"
              } transition-all`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Color bar */}
              <div className="h-1 bg-gradient-to-r from-[#ff6b4a] to-[#ff9a5c]" />

              <div className="p-6 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ff6b4a15] text-[#ff6b4a]">
                    {post.category}
                  </span>
                  <span className={`flex items-center gap-1 text-xs ${isDark ? "text-[#8888a0]" : "text-gray-400"}`}>
                    <Calendar size={11} /> {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`font-sora font-bold text-lg mb-3 leading-snug group-hover:text-[#ff6b4a] transition-colors ${
                    isDark ? "text-white" : "text-[#1a1a2e]"
                  }`}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className={`text-sm leading-relaxed flex-1 mb-5 ${isDark ? "text-[#8888a0]" : "text-gray-500"}`}>
                  {post.excerpt}
                </p>

                {/* Read more */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDark ? "text-[#8888a0]" : "text-gray-400"}`}>
                    {post.readTime}
                  </span>
                  <span className="text-[#ff6b4a] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
