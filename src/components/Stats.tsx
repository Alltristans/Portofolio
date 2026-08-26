"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import manifest from "@/data/manifest.json";

function CountUp({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const totalFrames = Math.round(duration / 16);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // Ease out expo for snappy technical count
      const progress = frame / totalFrames;
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.min(Math.round(easeProgress * target), target);
      setCount(current);

      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const { counts } = manifest;

  const metrics = [
    {
      index: "01",
      tag: "CREDENTIALS & SPECIALIZATIONS",
      value: counts.totalCertificates || 39,
      suffix: "+",
      title: "Certifications",
      description: "Verified industry credentials spanning Oracle Cloud Data Science, Microsoft Azure AI, IBM Enterprise-Grade AI, and Dicoding ML tracks.",
      meta: "Oracle · Azure · IBM · Cisco",
      href: "#certifications",
    },
    {
      index: "02",
      tag: "INDUSTRY & RESEARCH ROLES",
      value: 5,
      suffix: "+",
      title: "Experiences",
      description: "Professional industry and research roles across LMS data analytics at SEVIMA, UI/UX systems at Digistar Telkom, game engineering at GIM, and tech mentoring.",
      meta: "SEVIMA · Telkom · GIM · LevelUp",
      href: "#experience",
    },
    {
      index: "03",
      tag: "HACKATHONS & CHALLENGES",
      value: 10,
      suffix: "+",
      title: "Competitions",
      description: "Submissions and placements across Global Game Jam 2026, GIMJAM, cryptographic CTF riddles, and national data-driven problem solving challenges.",
      meta: "GGJ26 · GIMJAM · CTF Crypto",
      href: "#projects",
    },
    {
      index: "04",
      tag: "APPLIED MATHEMATICAL RIGOR",
      value: counts.yearsExperience || 5,
      suffix: "+",
      title: "Years of Learning",
      description: "Rigorous academic and computational study in Pure & Applied Mathematics at Institut Teknologi Sepuluh Nopember (ITS Surabaya) with stochastic optimization and ML.",
      meta: "ITS Surabaya · Mathematics S1",
      href: "#about",
    },
  ];

  return (
    <section
      id="stats"
      className={`relative py-24 sm:py-32 px-6 sm:px-10 border-t transition-colors duration-300 ${
        isDark
          ? "bg-[#0e0e12] border-[#1e2034] text-[#e8e8f0]"
          : "bg-[#f5f5f8] border-[#e2e0d8] text-[#111118]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Editorial Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-12 sm:pb-16">
          {/* Left: Index & Bold-Thin Heading */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#ff6b4a] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff6b4a] animate-pulse" />
              <span>06 // QUANTITATIVE LEDGER</span>
            </div>
            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15]">
              Track <span className="font-light text-[#8888a0]">Record</span>
              <span className="text-[#ff6b4a]">.</span>
            </h2>
          </div>

          {/* Right: Authoritative Narrative */}
          <div className="lg:col-span-6 lg:pt-2">
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isDark ? "text-[#9a9ab2]" : "text-[#555566]"
              }`}
            >
              A documented ledger of empirical development: combining mathematical logic,
              enterprise-grade AI certifications, professional data analyst appointments, and competitive
              game engineering hackathons.
            </p>
          </div>
        </div>

        {/* ================= ARCHITECTURAL LEDGER MATRIX (NO FLOATING BOXES) ================= */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l ${
            isDark ? "border-[#22243a]" : "border-[#d8d5ca]"
          }`}
        >
          {metrics.map((item, idx) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className={`group relative p-8 sm:p-10 border-r border-b transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? "border-[#22243a] hover:bg-white/[0.02]"
                  : "border-[#d8d5ca] hover:bg-black/[0.02]"
              }`}
            >
              {/* Corner Coordinate Tick Indicator */}
              <div className="absolute top-3 right-3 font-mono text-[10px] text-[#ff6b4a] opacity-0 group-hover:opacity-100 transition-opacity">
                +{item.index}
              </div>

              {/* Taxonomy Index & Tag */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-6 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                  <span className="font-mono text-xs font-bold text-[#ff6b4a]">
                    #{item.index}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-[#8888a0] uppercase truncate">
                    {item.tag}
                  </span>
                </div>

                {/* Massive Crisp Number */}
                <div className="mb-4">
                  <div className="font-sora font-extrabold text-5xl sm:text-6xl lg:text-6xl tracking-tight leading-none text-black dark:text-white flex items-baseline">
                    <CountUp target={item.value} />
                    <span className="text-[#ff6b4a] ml-1 font-bold text-4xl sm:text-5xl">{item.suffix}</span>
                  </div>
                  <h3 className="font-sora font-bold text-lg sm:text-xl mt-2 tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Grounded Specific Description */}
                <p
                  className={`text-xs sm:text-[13px] leading-relaxed mb-6 ${
                    isDark ? "text-[#8e8ea6]" : "text-[#555566]"
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {/* Footer Meta Breadcrumb */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className={isDark ? "text-[#6c6c84]" : "text-stone-500"}>
                  {item.meta}
                </span>
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 text-[#ff6b4a] hover:underline font-semibold group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Explore</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
