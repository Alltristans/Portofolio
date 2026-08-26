"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Responsive spring physics
  const springConfig = { damping: 24, stiffness: 280, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const isLight = theme === "light";

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    handleElementHover();

    // Re-bind on dynamic mutations
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer Follower Ring - Calibrated for dark & light themes */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 52 : 32,
          height: isHovered ? 52 : 32,
          backgroundColor: isHovered
            ? isLight ? "rgba(255, 107, 74, 0.25)" : "rgba(255, 107, 74, 0.2)"
            : isLight ? "rgba(255, 107, 74, 0.12)" : "rgba(255, 107, 74, 0.08)",
          borderColor: isHovered
            ? "#ff6b4a"
            : isLight ? "rgba(255, 107, 74, 0.85)" : "rgba(255, 107, 74, 0.65)",
          borderWidth: isHovered ? "2px" : "1.5px",
          boxShadow: isHovered
            ? isLight
              ? "0 0 20px rgba(255, 107, 74, 0.5), 0 0 4px rgba(255, 107, 74, 0.8)"
              : "0 0 16px rgba(255, 107, 74, 0.45)"
            : isLight
              ? "0 0 6px rgba(255, 107, 74, 0.3)"
              : "0 0 4px rgba(255, 107, 74, 0.15)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />

      {/* Inner Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-2 h-2 rounded-full bg-[#ff6b4a] shadow-[0_0_8px_rgba(255,107,74,0.9)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
