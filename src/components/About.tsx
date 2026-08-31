"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import manifest from "@/data/manifest.json";

export default function About({ theme }: { theme: "dark" | "light" }) {
  const { profile } = manifest;
  const isDark = theme === "dark";
  const strokeColor = isDark ? "#ffffff" : "#1e1e2d";
  const accentStroke = "#ff6b4a";

  // Scroll Speed Parallax Rig for About (Diego Vue / Ashley multiplane pattern)
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  // Layered parallax speeds
  const leftColumnY = useTransform(scrollYProgress, [0, 1], [40, -30]);
  const rightColumnY = useTransform(scrollYProgress, [0, 1], [70, -50]);
  const vectorY = useTransform(scrollYProgress, [0, 1], [-30, 40]);
  const vectorRotate = useTransform(scrollYProgress, [0, 1], [-3, 5]);

  return (
    <section
      ref={aboutRef}
      id="about"
      className={`relative w-full pt-16 pb-28 sm:pb-36 lg:py-36 px-6 sm:px-12 md:px-16 transition-colors duration-500 overflow-hidden ${
        isDark ? "bg-[#0e0e12] text-[#e8e8f0]" : "bg-[#f5f5f8] text-[#1a1a2e]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-14">
          
          {/* ================= LEFT COLUMN: Ashley "Discover Our Studio" Text & Quote ================= */}
          <motion.div
            style={{ y: leftColumnY }}
            className="w-full lg:w-[52%] xl:w-[50%] flex flex-col justify-center relative z-10"
          >
            {/* Display Heading with Ashley's signature bold + thin font-weight contrast */}
            <motion.h2
              className={`font-sora font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-10 tracking-tight transition-colors duration-300 ${
                isDark ? "text-white" : "text-[#111118]"
              }`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Discover <br />
              My <span className="font-extralight text-[#8888a0]">Journey</span>
              <span className="text-[#ff6b4a]">.</span>
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p
              className={`text-base sm:text-lg leading-relaxed mb-6 transition-colors duration-300 ${
                isDark ? "text-[#a0a0b8]" : "text-[#4a4a5a]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              I am a Mathematics graduate from{" "}
              <strong className={isDark ? "text-white" : "text-black"}>
                Institut Teknologi Sepuluh Nopember (ITS)
              </strong>
              , specializing in mathematical optimization &amp; algorithms, agent-based simulations &amp; stochastic modeling, applied machine learning &amp; data science, and game mechanic design.
              My research focused on optimizing resource-flow balance in complex game economic simulations using Genetic Algorithms.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              className={`text-base sm:text-lg leading-relaxed mb-10 transition-colors duration-300 ${
                isDark ? "text-[#a0a0b8]" : "text-[#4a4a5a]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Beyond theory, I apply analytical modeling in production: analyzing user behavior and platform metrics at{" "}
              <strong className={isDark ? "text-white" : "text-black"}>SEVIMA</strong>, designing procedural mechanics and in-game economies at{" "}
              <strong className={isDark ? "text-white" : "text-black"}>Ganesha Interactive Media</strong>, and developing functional digital tools and visual systems.
            </motion.p>

            {/* Quote Block (Ashley Template Signature mil-about-quote) */}
            <motion.div
              className={`flex items-center gap-6 pt-8 pb-10 border-t transition-colors duration-300 ${
                isDark ? "border-[#22222e]" : "border-[#e2e2ec]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Circular Avatar with Accent Quote Badge */}
              <div className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src={profile.avatar || "/profil/Tristan square.png"}
                    alt={profile.name}
                    fill
                    quality={100}
                    className="object-cover object-top"
                  />
                </div>
                {/* Quote Badge */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ff6b4a] text-black font-serif flex items-center justify-center text-xl font-bold shadow-md select-none">
                  &ldquo;
                </div>
              </div>

              {/* Quote Headline with Light/Bold contrast */}
              <h6
                className={`font-sora text-base sm:text-lg font-bold leading-snug transition-colors duration-300 ${
                  isDark ? "text-white" : "text-[#111118]"
                }`}
              >
                Connecting Mathematical Rigor:{" "}
                <span className="font-extralight text-[#8888a0]">
                  Engineering Data Systems & Creative Logic
                </span>
              </h6>
            </motion.div>

            {/* Action Bar / CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="/cv/CV_ATS.pdf"
                download="CV_Alridho_Tristan_Satriawan.pdf"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-[#ff6b4a] text-white hover:bg-[#e5593a] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#ff6b4a]/25"
              >
                <Download size={15} />
                <span>Download CV</span>
              </a>

              <a
                href="#projects"
                className={`group inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-xs uppercase tracking-wider border transition-all hover:border-[#ff6b4a] hover:text-[#ff6b4a] ${
                  isDark ? "border-[#2a2a38] text-[#c0c0d0]" : "border-[#d0d0dc] text-[#333340]"
                }`}
              >
                <span>View Portfolio</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

          </motion.div>

          {/* ================= RIGHT COLUMN: Ashley Photo Frame & Math Vector ================= */}
          <motion.div
            style={{ y: rightColumnY }}
            className="w-full lg:w-[44%] xl:w-[42%] relative"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* BESPOKE MATHEMATICAL VECTOR BACKGROUND with Parallax Drift */}
            <motion.div
              style={{ y: vectorY, rotate: vectorRotate }}
              className="absolute -top-20 -bottom-20 -left-14 sm:-left-20 lg:-left-28 w-[280px] sm:w-[320px] lg:w-[360px] h-[calc(100%+160px)] z-0 pointer-events-none select-none"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 360 860"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
              >
                {/* 1. Coordinate Plane Subdivisions */}
                <g stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" opacity={isDark ? "0.3" : "0.2"}>
                  <line x1="10" y1="90" x2="350" y2="90" />
                  <line x1="10" y1="220" x2="350" y2="220" />
                  <line x1="10" y1="350" x2="350" y2="350" />
                  <line x1="10" y1="480" x2="350" y2="480" />
                  <line x1="10" y1="610" x2="350" y2="610" />
                  <line x1="10" y1="740" x2="350" y2="740" />

                  <line x1="50" y1="20" x2="50" y2="820" />
                  <line x1="130" y1="20" x2="130" y2="820" />
                  <line x1="210" y1="20" x2="210" y2="820" />
                  <line x1="290" y1="20" x2="290" y2="820" />
                </g>

                {/* 2. Primary Calibrated Y-Axis on the visible left edge */}
                <g stroke={strokeColor} strokeWidth="1.75" opacity={isDark ? "0.85" : "0.75"}>
                  <line x1="50" y1="20" x2="50" y2="820" />
                  <polygon points="50,8 45,24 55,24" fill={strokeColor} />
                  {[90, 155, 220, 285, 350, 415, 480, 545, 610, 675, 740, 805].map((y, idx) => (
                    <g key={idx}>
                      <line x1="40" y1={y} x2="60" y2={y} strokeWidth="1.75" />
                      <circle cx="50" cy={y} r="2.5" fill={accentStroke} />
                    </g>
                  ))}
                </g>

                {/* 3. Rotating Polar Coordinate Compass at Top-Left */}
                <g className="math-rotate-slow" style={{ transformOrigin: "110px 150px" }}>
                  <circle cx="110" cy="150" r="75" stroke={accentStroke} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.8" />
                  <circle cx="110" cy="150" r="50" stroke={strokeColor} strokeWidth="1.25" opacity="0.6" />
                  <circle cx="110" cy="150" r="25" stroke={accentStroke} strokeWidth="1.25" opacity="0.9" />
                  <line x1="25" y1="150" x2="195" y2="150" stroke={strokeColor} strokeWidth="1" opacity="0.6" />
                  <line x1="110" y1="65" x2="110" y2="235" stroke={strokeColor} strokeWidth="1" opacity="0.6" />
                  <line x1="50" y1="90" x2="170" y2="210" stroke={accentStroke} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                  <line x1="50" y1="210" x2="170" y2="90" stroke={accentStroke} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                </g>

                {/* 4. Animated Harmonic Trigonometric Sine Waves */}
                <g className="math-wave">
                  <path
                    d="M 5 360 C 50 260, 95 460, 140 360 C 185 260, 230 460, 275 360 C 320 260, 365 460, 410 360"
                    stroke={accentStroke}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <line x1="15" y1="440" x2="130" y2="280" stroke={strokeColor} strokeWidth="2" strokeDasharray="6 4" opacity="0.9" />
                  <circle cx="50" cy="360" r="5" fill={accentStroke} stroke={strokeColor} strokeWidth="1.5" />
                  <circle cx="140" cy="360" r="5" fill={accentStroke} stroke={strokeColor} strokeWidth="1.5" />
                </g>

                <g className="math-wave-alt">
                  <path
                    d="M 5 420 C 40 490, 85 350, 130 420 C 175 490, 220 350, 265 420 C 310 490, 355 350, 400 420"
                    stroke={strokeColor}
                    strokeWidth="1.75"
                    fill="none"
                    strokeDasharray="8 5"
                    opacity={isDark ? "0.8" : "0.7"}
                  />
                </g>

                {/* 5. Fibonacci Golden Ratio Spiral */}
                <g className="math-pulse">
                  <path
                    d="M 130 550 A 40 40 0 0 1 170 590 A 65 65 0 0 1 105 655 A 105 105 0 0 1 0 550 A 170 170 0 0 1 170 380"
                    stroke={accentStroke}
                    strokeWidth="2.25"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <rect x="105" y="550" width="65" height="40" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5" />
                </g>

                {/* 6. Formula Glyphs */}
                <g fill={strokeColor} fontSize="12" fontWeight="bold" fontFamily="monospace" opacity={isDark ? "0.9" : "0.85"}>
                  <text x="65" y="50">y = f(x)</text>
                  <text x="10" y="155">θ = 2π</text>
                  <text x="10" y="335" fill={accentStroke}>f(x) = sin(ωt)</text>
                  <text x="65" y="525">Φ = 1.618</text>
                  <text x="10" y="700" fill={accentStroke}>∇f(x*) = 0</text>
                  <text x="65" y="800">∫ e^(-λt) dt</text>
                </g>
              </svg>
            </motion.div>

            {/* Photo Frame Container (Full column width, thick and tall vertical 1:1.5 aspect ratio matching Ashley mil-img-frame) */}
            <div className="relative z-10 w-full aspect-[10/15] sm:aspect-[10/14.5] lg:aspect-[10/15] min-h-[540px] sm:min-h-[620px] lg:min-h-[680px] overflow-hidden group shadow-2xl">
              <Image
                src={profile.portrait}
                alt={profile.name}
                fill
                quality={100}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              {/* Subtle top-to-bottom edge vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Bottom Subtle Caption */}
              <div className="absolute bottom-6 left-6 z-10 text-[11px] font-mono uppercase tracking-widest text-white/90 px-3 py-1 bg-black/60 backdrop-blur-md rounded">
                {profile.name} · ITS Surabaya
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
