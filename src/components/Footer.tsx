"use client";
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import manifest from "@/data/manifest.json";

export default function Footer({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const { profile } = manifest;
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (
    <footer className={`py-12 px-6 border-t ${isDark ? "bg-[#0e0e12] border-[#2a2a38]" : "bg-white border-gray-200"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="font-sora font-bold text-xl mb-3">
              <span className={isDark ? "text-white/80" : "text-stone-700"}>i_</span>
              <span className="text-[#ff6b4a]">Kiridho</span>
              <span className={isDark ? "text-white" : "text-[#111118]"}>.</span>
            </p>
            <p className={`text-sm leading-relaxed ${isDark ? "text-[#8888a0]" : "text-gray-500"}`}>
              Data Science · Creative Arts · Mathematics
              <br />
              Institut Teknologi Sepuluh Nopember
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className={`font-semibold text-sm mb-4 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}>Quick Links</p>
            <div className="grid grid-cols-2 gap-2">
              {["#home", "#about", "#experience", "#certifications", "#projects", "#contact"].map((href) => (
                <a
                  key={href}
                  href={href}
                  className={`text-sm capitalize transition-colors hover:text-[#ff6b4a] ${
                    isDark ? "text-[#8888a0]" : "text-gray-500"
                  }`}
                >
                  {href.replace("#", "")}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className={`font-semibold text-sm mb-4 ${isDark ? "text-white" : "text-[#1a1a2e]"}`}>Newsletter</p>
            <p className={`text-sm mb-3 ${isDark ? "text-[#8888a0]" : "text-gray-500"}`}>
              Get updates on new projects and research insights.
            </p>
            {subbed ? (
              <p className="text-[#ff6b4a] text-sm font-medium">🎉 Subscribed! Thank you.</p>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-xl text-sm border outline-none focus:border-[#ff6b4a] transition-all ${
                    isDark
                      ? "bg-[#16161c] border-[#2a2a38] text-white placeholder-[#8888a0]"
                      : "bg-[#f5f5f8] border-gray-200 text-[#1a1a2e] placeholder-gray-400"
                  }`}
                />
                <button
                  onClick={() => { if (email) setSubbed(true); }}
                  className="px-3 py-2 rounded-xl bg-[#ff6b4a] text-white hover:bg-[#e5593a] transition-all"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark ? "border-[#2a2a38]" : "border-gray-200"
        }`}>
          <p className={`text-sm ${isDark ? "text-[#8888a0]" : "text-gray-400"}`}>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[
              { icon: <Mail size={17} />, href: `mailto:${profile.email}`, label: "Email" },
              { icon: <GithubIcon size={17} />, href: profile.socials.github, label: "GitHub" },
              { icon: <LinkedinIcon size={17} />, href: profile.socials.linkedin, label: "LinkedIn" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`transition-colors hover:text-[#ff6b4a] ${isDark ? "text-[#8888a0]" : "text-gray-400"}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
