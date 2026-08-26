"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import manifest from "@/data/manifest.json";

type Certificate = (typeof manifest.certificates)[number];

export default function Certifications({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const { certificates } = manifest;

  // Split certificates into 4 rich, domain-focused marquee tracks
  const { row1, row2, row3, row4 } = useMemo(() => {
    const r1: Certificate[] = [];
    const r2: Certificate[] = [];
    const r3: Certificate[] = [];
    const r4: Certificate[] = [];

    certificates.forEach((cert) => {
      const t = cert.title.toLowerCase();
      if (cert.category === "ai-ml" || t.includes("ai") || t.includes("machine learning") || t.includes("prompt")) {
        r1.push(cert);
      } else if (t.includes("cloud") || t.includes("azure") || t.includes("oracle") || t.includes("fabric") || t.includes("aws")) {
        r2.push(cert);
      } else if (cert.category === "data-science" || t.includes("data") || t.includes("sql") || t.includes("analytics") || t.includes("looker")) {
        r3.push(cert);
      } else {
        r4.push(cert);
      }
    });

    // Ensure all 4 rows have at least 7 items for seamless continuous ribbon flow
    const total = certificates.length;
    const chunk = Math.ceil(total / 4);
    if (r1.length < 6) certificates.slice(0, chunk).forEach(c => !r1.includes(c) && r1.push(c));
    if (r2.length < 6) certificates.slice(chunk, chunk * 2).forEach(c => !r2.includes(c) && r2.push(c));
    if (r3.length < 6) certificates.slice(chunk * 2, chunk * 3).forEach(c => !r3.includes(c) && r3.push(c));
    if (r4.length < 6) certificates.slice(chunk * 3).forEach(c => !r4.includes(c) && r4.push(c));

    return { row1: r1, row2: r2, row3: r3, row4: r4 };
  }, [certificates]);

  const renderCertCard = (cert: Certificate, keySuffix: string | number) => {
    const hasUrl = Boolean(cert.url && cert.url.trim() !== "");
    const CardElement = hasUrl ? "a" : "div";

    return (
      <CardElement
        key={`${cert.title}-${cert.credentialId || ""}-${keySuffix}`}
        {...(hasUrl ? { href: cert.url, target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border transition-all duration-300 select-none whitespace-nowrap ${
          isDark
            ? "bg-[#13141d]/90 border-[#222438] hover:border-[#ff6b4a] hover:bg-[#181926]"
            : "bg-white border-[#e2e0d8] hover:border-[#ff6b4a] hover:bg-stone-50"
        } ${hasUrl ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* Issuer Logo Container */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 relative rounded-lg overflow-hidden flex-shrink-0 bg-white p-1 border border-black/10 dark:border-white/10 shadow-xs flex items-center justify-center">
          {cert.logo ? (
            <Image
              src={cert.logo}
              alt={cert.issuer}
              fill
              className="object-contain p-0.5"
            />
          ) : (
            <ShieldCheck size={16} className="text-[#ff6b4a]" />
          )}
        </div>

        {/* Text Details */}
        <div className="text-left">
          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-[#8888a0] leading-none mb-0.5">
            <span className="font-semibold text-[#ff6b4a]">{cert.issuer}</span>
            <span>·</span>
            <span>{cert.date}</span>
          </div>
          <span
            className={`font-sora font-semibold text-xs sm:text-[13px] tracking-tight block max-w-[240px] sm:max-w-[300px] lg:max-w-[340px] truncate transition-colors ${
              isDark ? "text-[#e8e8f0] group-hover:text-white" : "text-[#111118] group-hover:text-[#ff6b4a]"
            }`}
          >
            {cert.title}
          </span>
        </div>

        {/* External Link Arrow Indicator */}
        {hasUrl && (
          <ArrowUpRight
            size={12}
            className="text-[#8888a0] group-hover:text-[#ff6b4a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-1 opacity-70 group-hover:opacity-100"
          />
        )}
      </CardElement>
    );
  };

  return (
    <section
      id="certifications"
      className={`relative py-24 sm:py-32 overflow-hidden border-b transition-colors duration-300 ${
        isDark
          ? "bg-[#0e0e12] border-[#22243a] text-[#e8e8f0]"
          : "bg-[#f5f5f8] border-[#e2e0d8] text-[#111118]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-12 sm:mb-16">
        {/* Top Editorial Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
          <div className="lg:col-span-7">
            <motion.h2
              className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Verified <span className="font-light text-[#8888a0]">Credentials</span>
              <span className="text-[#ff6b4a]">.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <p
              className={`text-xs sm:text-sm leading-relaxed mb-2 ${
                isDark ? "text-[#9a9ab2]" : "text-[#555566]"
              }`}
            >
              Continuous professional accreditation across AI/ML engineering, cloud architecture, data analytics, cybersecurity, and other.
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#ff6b4a]">
              <CheckCircle2 size={13} />
              <span>39+ Verified Industry Specializations</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTINUOUS INFINITE 4-ROW MARQUEE RIBBONS ================= */}
      <div className="relative w-full overflow-hidden marquee-pause py-2 flex flex-col gap-3.5 sm:gap-4">
        
        {/* Left & Right Feathered Edge Fade Masks */}
        <div
          className={`absolute inset-y-0 left-0 w-16 sm:w-32 lg:w-48 pointer-events-none z-20 transition-colors duration-300 ${
            isDark
              ? "bg-gradient-to-r from-[#0e0e12] via-[#0e0e12]/80 to-transparent"
              : "bg-gradient-to-r from-[#f5f5f8] via-[#f5f5f8]/80 to-transparent"
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 w-16 sm:w-32 lg:w-48 pointer-events-none z-20 transition-colors duration-300 ${
            isDark
              ? "bg-gradient-to-l from-[#0e0e12] via-[#0e0e12]/80 to-transparent"
              : "bg-gradient-to-l from-[#f5f5f8] via-[#f5f5f8]/80 to-transparent"
          }`}
        />

        {/* Row 1: AI, Deep Learning & Generative Models -> Moving Left */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex gap-3.5 sm:gap-4 pl-4">
            {row1.map((c, i) => renderCertCard(c, `r1-a-${i}`))}
            {row1.map((c, i) => renderCertCard(c, `r1-b-${i}`))}
          </div>
        </div>

        {/* Row 2: Cloud Infrastructure & Enterprise Systems -> Moving Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex gap-3.5 sm:gap-4 pl-4">
            {row2.map((c, i) => renderCertCard(c, `r2-a-${i}`))}
            {row2.map((c, i) => renderCertCard(c, `r2-b-${i}`))}
          </div>
        </div>

        {/* Row 3: Data Science, Analytics & SQL -> Moving Left */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left-fast flex gap-3.5 sm:gap-4 pl-4">
            {row3.map((c, i) => renderCertCard(c, `r3-a-${i}`))}
            {row3.map((c, i) => renderCertCard(c, `r3-b-${i}`))}
          </div>
        </div>

        {/* Row 4: Cybersecurity, Cryptography & Systems -> Moving Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex gap-3.5 sm:gap-4 pl-4">
            {row4.map((c, i) => renderCertCard(c, `r4-a-${i}`))}
            {row4.map((c, i) => renderCertCard(c, `r4-b-${i}`))}
          </div>
        </div>

      </div>
    </section>
  );
}
