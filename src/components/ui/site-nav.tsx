"use client";

import { useEffect, useState } from "react";
import { JoinListButton } from "@/components/ui/waitlist-modal";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <div className="max-w-6xl mx-auto px-5 pt-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 pointer-events-auto transition-all duration-500 ${
            scrolled
              ? "bg-[#0F3D33]/85 backdrop-blur-2xl border border-[#E7ECD8]/10 shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
              : "bg-transparent"
          }`}
        >
          {/* Logo mark */}
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Rout"
              className="h-8 w-8 object-contain"
              style={{ mixBlendMode: scrolled ? "normal" : "multiply" }}
            />
            <span
              className={`font-extrabold text-base tracking-tight transition-colors duration-500 ${
                scrolled ? "text-[#E7ECD8]" : "text-[#0F3D33]"
              }`}
            >
              Rout
            </span>
          </div>

          {/* Nav links — desktop only */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
            {[
              { label: "Features", href: "#features" },
              { label: "Night Plus", href: "#night-plus" },
              { label: "Charter", href: "#charter" },
              { label: "Team", href: "#team" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-[#E7ECD8]/60 hover:text-[#E7ECD8]"
                    : "text-[#0F3D33]/55 hover:text-[#0F3D33]"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Waitlist CTA */}
          <JoinListButton
            className={`text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-300 ${
              scrolled
                ? "bg-[#E7ECD8] text-[#0F3D33] hover:bg-[#E7ECD8]/90 shadow-lg"
                : "bg-[#0F3D33] text-[#E7ECD8] hover:bg-[#0F3D33]/90 shadow-md"
            }`}
          >
            Join the List
          </JoinListButton>
        </div>
      </div>
    </header>
  );
}
