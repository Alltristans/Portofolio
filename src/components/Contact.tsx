"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import manifest from "@/data/manifest.json";

export default function Contact({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const { profile } = manifest;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mqekrnyp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[#ff6b4a] ${
    isDark
      ? "bg-[#1c1c24] border-[#2a2a38] text-white placeholder-[#8888a0]"
      : "bg-[#f5f5f8] border-gray-200 text-[#1a1a2e] placeholder-gray-400"
  }`;

  return (
    <section
      id="contact"
      className={`py-24 px-6 ${isDark ? "bg-[#0e0e12]" : "bg-[#f5f5f8]"}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-[#ff6b4a] text-sm font-semibold uppercase tracking-widest text-center mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.p>
        <motion.h2
          className={`font-sora font-bold text-3xl md:text-4xl text-center mb-16 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Contact Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className={`font-sora font-bold text-2xl mb-4 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}>
              Let&apos;s Build Something Great
            </h3>
            <p className={`text-sm leading-relaxed mb-8 ${isDark ? "text-[#8888a0]" : "text-gray-500"}`}>
              I&apos;m open to freelance projects, collaborations, and interesting opportunities.
              Whether you have a data problem, need a creative solution, or just want to say hi, reach out!
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: <Mail size={18} />, label: profile.email, href: `mailto:${profile.email}` },
                { icon: <Phone size={18} />, label: "+62 823 2819 0290", href: `tel:${profile.phone}` },
                { icon: <MapPin size={18} />, label: profile.location || "Pati, Central Java, Indonesia", href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 text-sm group transition-colors hover:text-[#ff6b4a] ${
                    isDark ? "text-[#8888a0]" : "text-gray-500"
                  }`}
                >
                  <span className="text-[#ff6b4a]">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
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
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:border-[#ff6b4a] hover:text-[#ff6b4a] ${
                    isDark
                      ? "bg-[#16161c] border-[#2a2a38] text-[#8888a0]"
                      : "bg-white border-gray-200 text-gray-500"
                  }`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-[#8888a0]" : "text-gray-500"}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-[#8888a0]" : "text-gray-500"}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-[#8888a0]" : "text-gray-500"}`}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Project Inquiry / Hello"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-[#8888a0]" : "text-gray-500"}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or inquiry..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl font-sora font-semibold text-sm bg-[#ff6b4a] text-white hover:bg-[#e5593a] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-500 text-sm mt-2">
                  <CheckCircle size={16} />
                  <span>Message sent successfully! I will get back to you soon.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-rose-500 text-sm mt-2">
                  <AlertCircle size={16} />
                  <span>Failed to send message. Please email me directly at {profile.email}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
