"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JoinListButton } from "@/components/ui/waitlist-modal";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Night Plus", href: "#night-plus" },
  { label: "Charter", href: "#charter" },
  { label: "Team", href: "#team" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const activated = scrolled || menuOpen;

  return (
    <>
      {/* ── Full-screen mobile menu overlay ───────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="mob-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[98] bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="mob-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 z-[99] md:hidden bg-[#0F3D33] pb-8 px-6 shadow-2xl"
              style={{ paddingTop: "88px" }}
            >
              <nav aria-label="Mobile navigation" className="space-y-1">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.25 }}
                    className={`flex items-center justify-between py-4 text-[#E7ECD8]/75 text-xl font-semibold hover:text-[#E7ECD8] transition-colors ${
                      i < NAV_LINKS.length - 1 ? "border-b border-[#E7ECD8]/8" : ""
                    }`}
                  >
                    {label}
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.a>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.25 }}
                className="mt-8"
              >
                <JoinListButton
                  className="w-full py-4 rounded-2xl bg-[#E7ECD8] text-[#0F3D33] text-base font-bold hover:bg-[#E7ECD8]/90 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Join the List
                </JoinListButton>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Fixed nav bar ─────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        <div className="max-w-6xl mx-auto px-5 pt-4">
          <div
            className={`flex items-center justify-between rounded-2xl px-5 py-3 pointer-events-auto transition-all duration-500 ${
              activated
                ? "bg-[#0F3D33]/90 backdrop-blur-2xl border border-[#E7ECD8]/10 shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
                : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.jpg"
                alt="Rout"
                className="h-8 w-8 object-contain"
                style={{ mixBlendMode: activated ? "normal" : "multiply" }}
              />
              <span
                className={`font-extrabold text-base tracking-tight transition-colors duration-500 ${
                  activated ? "text-[#E7ECD8]" : "text-[#0F3D33]"
                }`}
              >
                Rout
              </span>
            </div>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activated
                      ? "text-[#E7ECD8]/60 hover:text-[#E7ECD8]"
                      : "text-[#0F3D33]/55 hover:text-[#0F3D33]"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <JoinListButton
                className={`hidden md:block text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-300 ${
                  activated
                    ? "bg-[#E7ECD8] text-[#0F3D33] hover:bg-[#E7ECD8]/90 shadow-lg"
                    : "bg-[#0F3D33] text-[#E7ECD8] hover:bg-[#0F3D33]/90 shadow-md"
                }`}
              >
                Join the List
              </JoinListButton>

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className={`md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl transition-colors duration-300 ${
                  activated
                    ? "text-[#E7ECD8] hover:bg-[#E7ECD8]/10"
                    : "text-[#0F3D33] hover:bg-[#0F3D33]/8"
                }`}
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-5 h-[1.8px] bg-current rounded-full origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-5 h-[1.8px] bg-current rounded-full"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-5 h-[1.8px] bg-current rounded-full origin-center"
                />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
