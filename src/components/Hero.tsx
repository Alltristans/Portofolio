"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, ArrowRight, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import manifest from "@/data/manifest.json";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero({ theme }: { theme: "dark" | "light" }) {
  const { profile } = manifest;
  const isDark = theme === "dark";

  // Scroll Speed Parallax Rig (Diego Vue data-speed implementation)
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Layered parallax scroll speed transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 0.85], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const cornerOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const cornerY = useTransform(scrollYProgress, [0, 0.28], [0, 20]);

  // Direct viewport snap from Hero toward About on any downward scroll
  useEffect(() => {
    let isSnapping = false;
    let touchStartY = 0;

    const snapToAbout = () => {
      const aboutEl = document.getElementById("about");
      if (!aboutEl) return;
      isSnapping = true;
      const top = aboutEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => {
        isSnapping = false;
      }, 850);
    };

    const snapToHero = () => {
      isSnapping = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        isSnapping = false;
      }, 850);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isSnapping) {
        e.preventDefault();
        return;
      }

      const aboutEl = document.getElementById("about");
      if (!aboutEl) return;
      const aboutTop = aboutEl.offsetTop;
      const currentScroll = window.scrollY;

      // When audience is anywhere in Hero (above About) and initiates scroll down
      if (currentScroll < aboutTop * 0.75) {
        if (e.deltaY > 6) {
          e.preventDefault();
          snapToAbout();
        }
      } else if (currentScroll <= aboutTop + 20 && currentScroll >= aboutTop - 40) {
        // When at the very top of About and scrolling up, snap back to Hero
        if (e.deltaY < -12 && currentScroll <= aboutTop + 10) {
          e.preventDefault();
          snapToHero();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isSnapping) {
        e.preventDefault();
        return;
      }

      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY; // Positive = swiping up to scroll down

      const aboutEl = document.getElementById("about");
      if (!aboutEl) return;
      const aboutTop = aboutEl.offsetTop;
      const currentScroll = window.scrollY;

      if (currentScroll < aboutTop * 0.75 && deltaY > 12) {
        e.preventDefault();
        snapToAbout();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentScroll = window.scrollY;
      const aboutEl = document.getElementById("about");
      if (!aboutEl) return;
      const aboutTop = aboutEl.offsetTop;

      if (currentScroll < aboutTop * 0.75) {
        if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
          e.preventDefault();
          snapToAbout();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ================= BACKGROUND HERO IMAGE (Parallax data-speed 0.85) ================= */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 origin-center pointer-events-none"
      >
        <Image
          src={profile.hero}
          alt={profile.name}
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />

        {/* Crisp Atmospheric Overlay (No blur, uniform depth) */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isDark ? "bg-black/65" : "bg-black/60"
          }`}
        />
      </motion.div>

      {/* Subtle Dotted Matrix Accent */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ff6b4a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient Floating Geometry */}
      <motion.div
        className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-[#ff6b4a]/10 border border-[#ff6b4a]/30 pointer-events-none hidden md:block"
        animate={{ y: [-12, 12, -12], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-16 w-16 h-16 rounded-full bg-[#ff6b4a]/15 border border-[#ff6b4a]/20 pointer-events-none hidden md:block"
        animate={{ y: [10, -10, 10], scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ================= MAIN EDITORIAL CONTENT (Parallax data-speed 1.2) ================= */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-28 sm:py-32 text-center flex flex-col items-center"
      >
        {/* Kicker / Greeting Headline */}
        <motion.h1
          className="text-white font-sora font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[1.08] mb-6 capitalize"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          hi ! i’m <span className="text-[#ff6b4a]">Tristan.</span>
        </motion.h1>

        {/* Subtitle Role & Institution */}
        <motion.p
          className="text-gray-200 text-lg sm:text-xl md:text-2xl font-medium max-w-2xl leading-relaxed mb-10 text-center"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          I&apos;m a <span className="text-white font-semibold">{profile.title}</span>.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <a
            href="#about"
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-[#ff6b4a] text-white shadow-lg shadow-[#ff6b4a]/30 hover:bg-[#e5593a] transition-all hover:scale-105 active:scale-95"
          >
            <span>more about me</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider text-white border-2 border-white/40 hover:border-[#ff6b4a] hover:bg-[#ff6b4a]/20 transition-all hover:scale-105 active:scale-95"
          >
            Let&apos;s work together
          </a>
        </motion.div>
      </motion.div>

      {/* ================= BOTTOM LEFT CONTACT (Slimhamdi Signature) ================= */}
      <motion.div
        style={{ opacity: cornerOpacity, y: cornerY }}
        className="absolute bottom-8 left-8 z-10 hidden lg:block text-left text-white/80 text-xs tracking-wider"
      >
        <p className="font-semibold text-white uppercase mb-1 text-[11px] text-[#ff6b4a]">Let&apos;s work together</p>
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-1.5 hover:text-[#ff6b4a] transition-colors mb-0.5"
        >
          <Mail size={13} className="text-[#ff6b4a]" /> {profile.email}
        </a>
        <a
          href={`tel:${profile.phone}`}
          className="flex items-center gap-1.5 hover:text-[#ff6b4a] transition-colors text-white/60"
        >
          <Phone size={13} className="text-[#ff6b4a]" /> {profile.phone}
        </a>
      </motion.div>

      {/* ================= BOTTOM RIGHT SOCIALS (Slimhamdi Signature) ================= */}
      <motion.div
        style={{ opacity: cornerOpacity, y: cornerY }}
        className="absolute bottom-8 right-8 z-10 hidden sm:flex items-center gap-3"
      >
        {[
          { icon: <GithubIcon size={18} />, href: profile.socials.github, label: "GitHub" },
          { icon: <LinkedinIcon size={18} />, href: profile.socials.linkedin, label: "LinkedIn" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff6b4a] text-white flex items-center justify-center transition-all hover:scale-110 shadow-md"
          >
            {s.icon}
          </a>
        ))}
      </motion.div>

      {/* ================= SCROLL DOWN INDICATOR ================= */}
      <motion.a
        href="#about"
        style={{ opacity: cornerOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 hover:text-[#ff6b4a] transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to About"
      >
        <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll</span>
        <ArrowDown size={14} className="text-[#ff6b4a]" />
      </motion.a>
    </section>
  );
}
