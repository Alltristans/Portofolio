"use client";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({
  theme,
  onToggle,
  className = "",
}: {
  theme: "dark" | "light";
  onToggle: () => void;
  className?: string;
}) {
  const isDark = theme === "dark";

  return (
    <div className={`select-none ${className}`}>
      {/* Diego Vue Style Capsule Theme Switcher (tp-theme-toggle-main / themepure-theme-toggle) */}
      <button
        type="button"
        onClick={onToggle}
        className={`relative w-[76px] h-[36px] p-[3px] rounded-full flex items-center justify-between border transition-all duration-300 shadow-md cursor-pointer ${
          isDark
            ? "bg-[#14141a]/90 border-[#2c2c3a] hover:border-[#ff6b4a]/60 shadow-black/40 backdrop-blur-md"
            : "bg-white/95 border-[#e0e0ec] hover:border-[#ff6b4a]/60 shadow-slate-300/50 backdrop-blur-md"
        }`}
        aria-label="Toggle dark and light theme"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {/* Animated Sliding Pill Indicator (tp-theme-toggle-slide) */}
        <motion.div
          className="absolute top-[3px] left-[3px] w-[28px] h-[28px] rounded-full bg-[#ff6b4a] shadow-[0_2px_10px_rgba(255,107,74,0.45)] z-0"
          animate={{
            x: isDark ? 38 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 30,
          }}
        />

        {/* Left Side: Sun Icon (Light Mode) */}
        <div className="relative z-10 w-[28px] h-[28px] flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              color: !isDark ? "#ffffff" : isDark ? "#8888a0" : "#a0a0b0",
              scale: !isDark ? 1.05 : 0.85,
            }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={15} strokeWidth={2.2} />
          </motion.div>
        </div>

        {/* Right Side: Moon Icon (Dark Mode) */}
        <div className="relative z-10 w-[28px] h-[28px] flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              color: isDark ? "#ffffff" : "#666680",
              scale: isDark ? 1.05 : 0.85,
            }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={14} strokeWidth={2.2} />
          </motion.div>
        </div>
      </button>
    </div>
  );
}
