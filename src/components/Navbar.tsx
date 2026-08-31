"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#certifications", label: "Certifications", id: "certifications" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar({
  theme,
  onToggleTheme,
}: {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isInAbout, setIsInAbout] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Switch to minimized liquid glass box starting in the About section
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const aboutTop = aboutEl.offsetTop - 140;
        setIsInAbout(scrollY >= aboutTop);
      } else {
        setIsInAbout(scrollY > 380);
      }

      // Track active section for navigation links
      const sectionIds = ["home", "about", "experience", "certifications", "projects", "contact"];
      let currentSection = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom >= 100) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-2 sm:px-4 lg:px-6 transition-all duration-300">
      {/* ================= UNIFIED MINIMIZE MORPHING CONTAINER ================= */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 26,
          mass: 0.75,
        }}
        className={`pointer-events-auto mx-auto relative transition-all duration-500 ${
          isInAbout
            ? `max-w-4xl lg:max-w-5xl mt-2.5 sm:mt-3.5 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-1 sm:py-1.5 ${
                isDark
                  ? "liquid-glass-box-dark text-[#e8e8f0]"
                  : "liquid-glass-box-light text-[#1a1a2e]"
              }`
            : "max-w-7xl mt-0 rounded-none px-4 sm:px-8 lg:px-10 py-0 bg-transparent border border-transparent shadow-none"
        }`}
      >
        {/* Specular Liquid Rim Light (Fades in when minimized in About section) */}
        <motion.div
          animate={{ opacity: isInAbout ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none"
        />

        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isInAbout
              ? "h-12 sm:h-13 gap-3 sm:gap-6"
              : "h-20 gap-4 sm:gap-8"
          }`}
        >
          {/* LEFT CORNER: Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className={`group flex items-center font-sora font-extrabold tracking-tight transition-all duration-200 ${
                isInAbout ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
              }`}
            >
              <span className={isDark ? "text-white/80" : "text-stone-700"}>i_</span>
              <span className="text-[#ff6b4a] group-hover:scale-105 transition-transform duration-300">
                Kiridho
              </span>
              <span className={isDark ? "text-white" : "text-[#111118]"}>.</span>
            </a>
          </div>

          {/* CENTER: Navigation Links (Original Design with Orange Underline Indicator) */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-4 lg:mx-8">
            <ul
              className={`flex items-center transition-all duration-300 ${
                isInAbout ? "gap-4 lg:gap-6" : "gap-5 lg:gap-8"
              }`}
            >
              {links.map((l) => {
                const isActive = activeSection === l.id;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={`text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-300 hover:text-[#ff6b4a] relative py-1 group ${
                        isActive
                          ? "text-[#ff6b4a]"
                          : isDark
                          ? "text-[#a0a0b8]"
                          : "text-[#555566]"
                      }`}
                    >
                      {l.label}
                      {/* Subtle underline hover and active indicator */}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-[#ff6b4a] transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT CORNER: Theme Switcher & Mobile Menu Trigger */}
          <div
            className={`flex-shrink-0 flex items-center transition-all duration-300 ${
              isInAbout ? "gap-2 sm:gap-3" : "gap-3 sm:gap-4"
            }`}
          >
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              type="button"
              className={`md:hidden p-2 rounded-lg border transition-all pointer-events-auto cursor-pointer relative z-50 ${
                isInAbout
                  ? isDark
                    ? "border-white/10 text-white bg-white/[0.06] hover:bg-white/[0.12] active:scale-95"
                    : "border-black/10 text-[#111118] bg-black/[0.04] hover:bg-black/[0.08] active:scale-95"
                  : isDark
                  ? "border-[#2a2a38] text-white bg-[#0e0e12]/80 hover:bg-[#1a1a24] active:scale-95"
                  : "border-[#e0e0ec] text-[#111118] bg-white/80 hover:bg-gray-100 active:scale-95"
              }`}
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ================= MOBILE FLOATING GLASS DRAWER CARD ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className={`pointer-events-auto md:hidden mx-auto mt-2 max-w-md w-full p-2.5 sm:p-3 rounded-2xl border shadow-2xl backdrop-blur-3xl relative z-50 flex flex-col gap-1 ${
              isDark
                ? "bg-[#0e0e12]/95 border-white/[0.12] text-[#e8e8f0] shadow-black/60"
                : "bg-white/95 border-black/[0.08] text-[#1a1a2e] shadow-slate-300/40"
            }`}
          >
            {links.map((l) => {
              const isActive = activeSection === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    setOpen(false);
                    const target = document.querySelector(l.href);
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`text-xs uppercase tracking-wider font-semibold py-3 px-3.5 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                    isActive
                      ? "text-[#ff6b4a] bg-white/[0.08] dark:bg-white/[0.08]"
                      : isDark
                      ? "text-[#a0a0b8] hover:text-white hover:bg-white/[0.04]"
                      : "text-[#555566] hover:text-[#111118] hover:bg-black/[0.04]"
                  }`}
                >
                  <span>{l.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b4a] shadow-[0_0_8px_#ff6b4a]" />
                  )}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}



