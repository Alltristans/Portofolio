"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.body.classList.toggle("light", saved === "light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.body.classList.toggle("light", next === "light");
  };

  return (
    <main className={theme === "dark" ? "bg-[#0e0e12] text-[#e8e8f0]" : "bg-[#f5f5f8] text-[#1a1a2e]"}>
      <Cursor theme={theme} />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <About theme={theme} />
      <Experience theme={theme} />
      <Certifications theme={theme} />
      <Projects theme={theme} />
      <Contact theme={theme} />
      <Footer theme={theme} />
    </main>
  );
}
