"use client";

import { motion } from "framer-motion";
import { JoinListButton } from "@/components/ui/waitlist-modal";
import type { Role } from "@/components/ui/waitlist-modal";

const vp = { once: true, margin: "-60px" as const };

const TEAM = [
  { name: "Henry Sylvester", role: "Co-Founder", photo: "/henry.jpg" },
  { name: "Franchesa James", role: "Co-Founder", photo: "/franchesa.jpg" },
];

// Mirrors the iphone-bezel / hardware-btn / screen-glare CSS injected by CinematicHero
// Those classes are in the DOM when this component renders, so they're safe to reuse.
function IPhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ perspective: "1200px" }} className="flex items-center justify-center flex-shrink-0">
      <div className="relative w-[260px] h-[540px] rounded-[3rem] iphone-bezel flex flex-col">
        {/* Physical hardware buttons */}
        <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
        <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
        <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
        <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

        {/* Screen */}
        <div className="absolute inset-[7px] bg-[#040E09] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
          <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />
          {/* Dynamic Island */}
          <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
          </div>
          {/* App screenshot */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

function PhoneEntrance({
  children,
  direction = "right",
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
}) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const x = direction === "right" ? (isMobile ? 30 : 60) : (isMobile ? -30 : -60);
  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 30 : 50, x, rotateX: isMobile ? 8 : 25, rotateY: isMobile ? 0 : (direction === "right" ? -15 : 15), scale: isMobile ? 0.94 : 0.85 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotateX: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: isMobile ? 0.8 : 1.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={vp}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export function NightPlusSection() {
  return (
    <section id="night-plus" className="bg-[#E7ECD8] py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={vp}
          className="flex-1 order-2 lg:order-1"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={vp}
            className="text-[#0F3D33]/40 text-xs font-bold tracking-[0.2em] uppercase mb-5 block"
          >
            Coming Soon
          </motion.span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#0F3D33] leading-none mb-6">
            Night<br />Plus
          </h2>
          <p className="text-[#0F3D33]/60 text-lg leading-relaxed max-w-md">
            Late-night transit, made safe. High-visibility bus tracking after midnight with enhanced alerts, brighter UI, and real-time safety updates so every journey home feels certain.
          </p>
          <div className="mt-8">
            <JoinListButton className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#0F3D33] text-[#E7ECD8] text-sm font-bold hover:bg-[#1A5444] transition-colors duration-200">
              Join the List
            </JoinListButton>
          </div>
        </motion.div>

        <div className="order-1 lg:order-2 flex justify-center">
          <PhoneEntrance direction="right">
            <IPhoneMockup src="/nightshift1.png" alt="Night Plus high-visibility tracking" />
          </PhoneEntrance>
        </div>
      </div>
    </section>
  );
}

export function CharterMarketplaceSection() {
  return (
    <section id="charter" className="bg-[#0F3D33] py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex justify-center order-1">
          <PhoneEntrance direction="left">
            <IPhoneMockup src="/Chartermarketplace.png" alt="Charter Marketplace" />
          </PhoneEntrance>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          viewport={vp}
          className="flex-1 order-2"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={vp}
            className="text-[#E7ECD8]/40 text-xs font-bold tracking-[0.2em] uppercase mb-5 block"
          >
            Coming Soon
          </motion.span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#E7ECD8] leading-none mb-6">
            Charter<br />Marketplace
          </h2>
          <p className="text-[#E7ECD8]/60 text-lg leading-relaxed max-w-md">
            Need wheels for your crew? Browse, compare, and book private bus charters directly through Rout — perfect for corporate teams, school trips, and special events.
          </p>
          <div className="mt-8">
            <JoinListButton className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#E7ECD8] text-[#0F3D33] text-sm font-bold hover:bg-[#E7ECD8]/90 transition-colors duration-200">
              Join the List
            </JoinListButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TeamSection() {
  return (
    <section id="team" className="bg-[#E7ECD8] py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={vp}
          className="text-center mb-16"
        >
          <span className="text-[#0F3D33]/40 text-xs font-bold tracking-[0.2em] uppercase mb-5 block">
            The Team
          </span>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#0F3D33] leading-none mb-6">
            Built by <br />Caribbean Talent
          </h2>
          {/* Parent company badge — logo slot ready */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={vp}
            className="inline-flex items-center gap-2.5 mt-4 px-4 py-2 rounded-full border border-[#0F3D33]/15 bg-[#0F3D33]/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/spice-logo.svg" alt="Spice Solutions GD" className="h-5 w-auto opacity-40" />
            <span className="text-[#0F3D33]/50 text-sm font-medium tracking-wide">
              Spice Solutions GD
            </span>
          </motion.div>
        </motion.div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {TEAM.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={vp}
              className="bg-[#0F3D33] rounded-3xl p-8 group hover:bg-[#1A5444] transition-colors duration-500"
            >
              {/* Photo */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 ring-1 ring-[#E7ECD8]/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.photo}
                  alt={person.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-2xl font-black tracking-tighter text-[#E7ECD8] mb-1">
                {person.name}
              </h3>
              <p className="text-[#E7ECD8]/45 text-sm font-medium">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Section ─────────────────────────────────────────────────── */

const CTA_ROLES: { value: Role; label: string; tagline: string; cta: string; icon: React.ReactNode }[] = [
  {
    value: "commuter",
    label: "Commuter",
    tagline: "Tired of waiting and wondering? Rout tells you exactly when your bus arrives.",
    cta: "I'm a Rider",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="5" r="2.5" />
        <path d="M12 8v5l-2.5 4M12 13l2.5 4M10 11H7M17 11h-3" />
      </svg>
    ),
  },
  {
    value: "bus_operator",
    label: "Bus Operator",
    tagline: "Put your routes on the map. Reach more commuters and grow your ridership.",
    cta: "I Operate Buses",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="13" rx="2" />
        <path d="M3 10h18M8 18v2M16 18v2M7 14h.01M17 14h.01" />
      </svg>
    ),
  },
  {
    value: "investor",
    label: "Investor",
    tagline: "Transit is a $200B market. Be part of the team reimagining it from the Caribbean.",
    cta: "I Want to Invest",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

export function CTASection() {
  return (
    <section className="bg-[#0F3D33] py-28 px-6 overflow-hidden relative">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(231,236,216,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={vp}
          className="text-center mb-16"
        >
          <span className="text-[#E7ECD8]/35 text-xs font-bold tracking-[0.25em] uppercase mb-5 block">
            Get Early Access
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#E7ECD8] leading-[0.92] mb-6">
            Transit that moves<br />
            <span className="text-[#E7ECD8]/40">with you.</span>
          </h2>
          <p className="text-[#E7ECD8]/50 text-lg max-w-lg mx-auto leading-relaxed">
            Rout is launching soon. Tell us how you&apos;d like to be part of it.
          </p>
        </motion.div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CTA_ROLES.map(({ value, label, tagline, cta, icon }, i) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={vp}
              className="flex flex-col bg-[#E7ECD8]/5 border border-[#E7ECD8]/10 rounded-3xl p-8 hover:bg-[#E7ECD8]/8 hover:border-[#E7ECD8]/20 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#E7ECD8]/10 flex items-center justify-center text-[#E7ECD8]/70 mb-6 group-hover:bg-[#E7ECD8]/15 transition-colors">
                {icon}
              </div>

              {/* Label + tagline */}
              <p className="text-[#E7ECD8]/40 text-xs font-bold tracking-[0.2em] uppercase mb-2">{label}</p>
              <p className="text-[#E7ECD8]/70 text-sm leading-relaxed flex-1 mb-8">
                {tagline}
              </p>

              {/* CTA button */}
              <JoinListButton
                role={value}
                className="w-full py-3.5 rounded-xl bg-[#E7ECD8] text-[#0F3D33] text-sm font-bold hover:bg-[#E7ECD8]/90 transition-colors duration-200"
              >
                {cta} →
              </JoinListButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRODUCT_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Night Plus", href: "#night-plus" },
  { label: "Charter Marketplace", href: "#charter" },
];

const COMPANY_LINKS = [
  { label: "About", href: "#team" },
  { label: "Team", href: "#team" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#061A14] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 pb-12 border-b border-[#E7ECD8]/8">
          {/* Brand block */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Rout" loading="lazy" className="h-9 w-9 object-contain opacity-80" />
              <span className="font-extrabold text-lg text-[#E7ECD8] tracking-tight">Rout</span>
            </div>
            <p className="text-[#E7ECD8]/35 text-sm leading-relaxed mb-5">
              Beyond bus tracking. Real-time transit intelligence for your daily commute.
            </p>
            {/* Contact */}
            <a
              href="tel:+14734239023"
              className="flex items-center gap-2 text-[#E7ECD8]/40 text-sm hover:text-[#E7ECD8]/70 transition-colors mb-4"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z"/>
              </svg>
              1 (473) 423-9023
            </a>
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/spice-logo.svg" alt="Spice Solutions GD" className="h-4 w-auto opacity-20 invert" />
              <span className="text-[#E7ECD8]/20 text-xs tracking-wide">Spice Solutions GD</span>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-3">
            <div>
              <p className="text-[#E7ECD8]/25 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                Product
              </p>
              {PRODUCT_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block text-[#E7ECD8]/40 text-sm hover:text-[#E7ECD8]/70 transition-colors mb-3"
                >
                  {label}
                </a>
              ))}
              <JoinListButton className="block text-[#E7ECD8]/40 text-sm hover:text-[#E7ECD8]/70 transition-colors mb-3 text-left">
                Join Waitlist
              </JoinListButton>
            </div>
            <div>
              <p className="text-[#E7ECD8]/25 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                Company
              </p>
              {COMPANY_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block text-[#E7ECD8]/40 text-sm hover:text-[#E7ECD8]/70 transition-colors mb-3"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#E7ECD8]/20 text-sm">
            &copy; {new Date().getFullYear()} Spice Solutions GD. All rights reserved.
          </p>
          <p className="text-[#E7ECD8]/15 text-xs">Rout — Made for commuters everywhere</p>
        </div>
      </div>
    </footer>
  );
}
