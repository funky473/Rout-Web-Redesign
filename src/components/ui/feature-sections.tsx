"use client";

import { motion } from "framer-motion";
import { JoinListButton } from "@/components/ui/waitlist-modal";

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
          <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover object-top" />
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
  const x = direction === "right" ? 60 : -60;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x, rotateX: 25, rotateY: direction === "right" ? -15 : 15, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotateX: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
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
            Built by believers<br />in better transit
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

export function SiteFooter() {
  return (
    <footer className="bg-[#061A14] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 pb-12 border-b border-[#E7ECD8]/8">
          {/* Brand block */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Rout" className="h-9 w-9 object-contain opacity-80" />
              <span className="font-extrabold text-lg text-[#E7ECD8] tracking-tight">Rout</span>
            </div>
            <p className="text-[#E7ECD8]/35 text-sm leading-relaxed mb-5">
              Beyond bus tracking. Real-time transit intelligence for your daily commute.
            </p>
            <div className="flex items-center gap-2 mt-1">
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
              {["Features", "Night Plus", "Charter Marketplace", "Download"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="block text-[#E7ECD8]/40 text-sm hover:text-[#E7ECD8]/70 transition-colors mb-3"
                >
                  {label}
                </a>
              ))}
            </div>
            <div>
              <p className="text-[#E7ECD8]/25 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                Company
              </p>
              {["About", "Team", "Privacy Policy", "Terms of Service"].map((label) => (
                <a
                  key={label}
                  href="#"
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
