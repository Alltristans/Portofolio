"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({
  theme,
  onToggleTheme,
}: {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = isDark
    ? scrolled
      ? "bg-[#0e0e12]/90 backdrop-blur-md border-b border-[#22222e] shadow-lg shadow-black/20"
      : "bg-transparent"
    : scrolled
    ? "bg-white/90 backdrop-blur-md border-b border-[#e5e5ec] shadow-sm shadow-slate-200"
    : "bg-transparent";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}>
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        
        {/* LEFT CORNER: Logo */}
        <div className="flex-shrink-0">
          <a
            href="#home"
            className="group flex items-center font-sora font-extrabold text-xl sm:text-2xl tracking-tight"
          >
            <span className={isDark ? "text-white/80" : "text-stone-700"}>i_</span>
            <span className="text-[#ff6b4a] group-hover:scale-105 transition-transform duration-300">
              Kiridho
            </span>
            <span className={isDark ? "text-white" : "text-[#111118]"}>.</span>
          </a>
        </div>

        {/* CENTER: Navigation Links */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-6 lg:mx-8">
          <ul className="flex items-center gap-5 lg:gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-300 hover:text-[#ff6b4a] relative py-1 group ${
                    isDark ? "text-[#a0a0b8]" : "text-[#555566]"
                  }`}
                >
                  {l.label}
                  {/* Subtle underline hover indicator */}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ff6b4a] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT CORNER: Dark/Light Mode Switcher & Mobile Menu Trigger */}
        <div className="flex-shrink-0 flex items-center gap-3 sm:gap-4">
          {/* Diego Vue Style Capsule Theme Switcher */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          {/* Mobile Hamburger Toggle Button */}
          <button
            className={`md:hidden p-2 rounded-full border transition-all ${
              isDark
                ? "border-[#2a2a38] text-white hover:bg-[#1a1a24]"
                : "border-[#e0e0ec] text-[#111118] hover:bg-gray-100"
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Navigation */}
      {open && (
        <div
          className={`md:hidden px-6 pb-6 pt-2 flex flex-col gap-3 border-b backdrop-blur-xl ${
            isDark
              ? "bg-[#0e0e12]/98 border-[#22222e]"
              : "bg-white/98 border-[#e5e5ec]"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm uppercase tracking-wider font-semibold py-2.5 border-b transition-colors hover:text-[#ff6b4a] ${
                isDark
                  ? "border-[#1c1c26] text-[#c0c0d0]"
                  : "border-gray-100 text-[#444455]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
