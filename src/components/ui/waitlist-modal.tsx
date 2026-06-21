"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createContext, useContext } from "react";

/* ── Types ──────────────────────────────────────────────────────── */

type Role = "commuter" | "bus_operator" | "investor";
type Stage = "idle" | "loading" | "success" | "error" | "duplicate";

/* ── Role options ───────────────────────────────────────────────── */

const ROLES: { value: Role; label: string; icon: React.ReactNode }[] = [
  {
    value: "commuter",
    label: "Commuter",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v6l-3 4M12 13l3 4M9 11H6M18 11h-3" />
      </svg>
    ),
  },
  {
    value: "bus_operator",
    label: "Bus Operator",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="13" rx="2" />
        <path d="M3 10h18M8 18v2M16 18v2M7 14h.01M17 14h.01" />
      </svg>
    ),
  },
  {
    value: "investor",
    label: "Investor",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

/* ── Context ────────────────────────────────────────────────────── */

interface WaitlistContextValue {
  open: (initialRole?: Role) => void;
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used inside WaitlistProvider");
  return ctx;
}

/* ── Provider ───────────────────────────────────────────────────── */

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedRole, setPreselectedRole] = useState<Role | "">("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const open = (initialRole?: Role) => {
    if (initialRole) setPreselectedRole(initialRole);
    setIsOpen(true);
  };

  return (
    <WaitlistContext.Provider value={{ open }}>
      {children}
      <WaitlistModal
        isOpen={isOpen}
        preselectedRole={preselectedRole}
        onClose={() => { setIsOpen(false); setPreselectedRole(""); }}
      />
    </WaitlistContext.Provider>
  );
}

/* ── Button helper ──────────────────────────────────────────────── */

export function JoinListButton({
  className = "",
  children = "Join the List",
  role,
  onClick,
}: {
  className?: string;
  children?: React.ReactNode;
  role?: Role;
  onClick?: () => void;
}) {
  const { open } = useWaitlist();
  return (
    <button
      type="button"
      onClick={() => { onClick?.(); open(role); }}
      className={className}
    >
      {children}
    </button>
  );
}

export type { Role };

/* ── Modal ──────────────────────────────────────────────────────── */

function WaitlistModal({ isOpen, preselectedRole, onClose }: { isOpen: boolean; preselectedRole?: Role | ""; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role | "">("");
  const [stage, setStage] = useState<Stage>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setRole(preselectedRole ?? "");
      setStage("idle");
      setTimeout(() => nameRef.current?.focus(), 120);
    }
  }, [isOpen, preselectedRole]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !role) return;

    setStage("loading");
    setErrorMsg("");

    try {
      const q = query(collection(db, "join_list"), where("email", "==", email.toLowerCase().trim()));
      const existing = await getDocs(q);

      if (!existing.empty) {
        setStage("duplicate");
        return;
      }

      await addDoc(collection(db, "join_list"), {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role,
        source: "web",
        createdAt: serverTimestamp(),
      });

      setStage("success");
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
      setStage("error");
    }
  }

  const roleLabel = ROLES.find((r) => r.value === role)?.label ?? "";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Join the Rout waitlist"
            className="fixed inset-0 z-[201] flex items-center justify-center px-5 pointer-events-none"
          >
            <div className="w-full max-w-md bg-[#E7ECD8] rounded-3xl shadow-2xl pointer-events-auto overflow-hidden">

              {/* Close button */}
              <div className="flex justify-end px-6 pt-5">
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full bg-[#0F3D33]/10 flex items-center justify-center text-[#0F3D33]/50 hover:bg-[#0F3D33]/15 hover:text-[#0F3D33] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {stage === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="px-8 pb-10 pt-2 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#0F3D33] flex items-center justify-center mb-6 shadow-lg shadow-[#0F3D33]/30">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                        <path d="M6 14L11.5 19.5L22 9" stroke="#E7ECD8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter text-[#0F3D33] mb-2">
                      You&apos;re on the list!
                    </h3>
                    <p className="text-[#0F3D33]/55 text-sm leading-relaxed max-w-xs">
                      We&apos;ll reach out to{" "}
                      <span className="font-semibold text-[#0F3D33]/80">{email}</span>{" "}
                      {roleLabel === "Investor"
                        ? "with our investor brief when we're ready."
                        : roleLabel === "Bus Operator"
                        ? "when we're ready to onboard operators."
                        : "the moment Rout is ready for you."}
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-7 px-7 py-3 rounded-xl bg-[#0F3D33] text-[#E7ECD8] text-sm font-bold hover:bg-[#1A5444] transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : stage === "duplicate" ? (
                  <motion.div
                    key="duplicate"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="px-8 pb-10 pt-2 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#0F3D33]/10 flex items-center justify-center mb-6">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                        <circle cx="14" cy="14" r="11" stroke="#0F3D33" strokeWidth="2" strokeOpacity="0.4" />
                        <path d="M14 8V15" stroke="#0F3D33" strokeWidth="2.2" strokeLinecap="round" />
                        <circle cx="14" cy="19.5" r="1.2" fill="#0F3D33" fillOpacity="0.6" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter text-[#0F3D33] mb-2">
                      Already registered
                    </h3>
                    <p className="text-[#0F3D33]/55 text-sm leading-relaxed max-w-xs">
                      <span className="font-semibold text-[#0F3D33]/80">{email}</span> is already on the waitlist. We&apos;ll be in touch!
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-7 px-7 py-3 rounded-xl bg-[#0F3D33] text-[#E7ECD8] text-sm font-bold hover:bg-[#1A5444] transition-colors"
                    >
                      Got it
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="px-8 pb-8 pt-1"
                  >
                    {/* Rout logo */}
                    <div className="flex justify-center mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/logo.jpg"
                        alt="Rout"
                        className="h-12 w-12 object-contain"
                        style={{ mixBlendMode: "multiply" }}
                      />
                    </div>

                    <h2 className="text-3xl font-black tracking-tighter text-[#0F3D33] text-center mb-1">
                      Be first to ride
                    </h2>
                    <p className="text-[#0F3D33]/50 text-sm text-center mb-6 leading-relaxed">
                      Rout is launching soon. Tell us who you are and we&apos;ll be in touch.
                    </p>

                    {/* Role selector */}
                    <div className="mb-5">
                      <p className="text-xs font-bold text-[#0F3D33]/50 tracking-widest uppercase mb-2.5">
                        I am joining as a…
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {ROLES.map(({ value, label, icon }) => {
                          const selected = role === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setRole(value)}
                              className={`flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-2xl border text-center transition-all duration-200 ${
                                selected
                                  ? "bg-[#0F3D33] border-[#0F3D33] text-[#E7ECD8] shadow-md shadow-[#0F3D33]/20"
                                  : "bg-[#0F3D33]/5 border-[#0F3D33]/12 text-[#0F3D33]/60 hover:bg-[#0F3D33]/10 hover:border-[#0F3D33]/25"
                              }`}
                            >
                              {icon}
                              <span className="text-[11px] font-bold tracking-tight leading-tight">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name + Email */}
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="wl-name" className="block text-xs font-bold text-[#0F3D33]/50 tracking-widest uppercase mb-1.5">
                          Name
                        </label>
                        <input
                          ref={nameRef}
                          id="wl-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl bg-[#0F3D33]/8 border border-[#0F3D33]/12 text-[#0F3D33] placeholder-[#0F3D33]/30 text-sm outline-none focus:border-[#0F3D33]/35 focus:bg-[#0F3D33]/10 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="wl-email" className="block text-xs font-bold text-[#0F3D33]/50 tracking-widest uppercase mb-1.5">
                          Email
                        </label>
                        <input
                          id="wl-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#0F3D33]/8 border border-[#0F3D33]/12 text-[#0F3D33] placeholder-[#0F3D33]/30 text-sm outline-none focus:border-[#0F3D33]/35 focus:bg-[#0F3D33]/10 transition-all"
                        />
                      </div>
                    </div>

                    {!role && stage === "error" && (
                      <p className="mt-3 text-red-600/70 text-xs text-center">Please select your role above.</p>
                    )}
                    {stage === "error" && errorMsg && (
                      <p className="mt-3 text-red-600/70 text-xs text-center">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={stage === "loading" || !role}
                      className="mt-5 w-full py-3.5 rounded-xl bg-[#0F3D33] text-[#E7ECD8] text-sm font-bold tracking-wide hover:bg-[#1A5444] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {stage === "loading" ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Saving your spot...
                        </>
                      ) : (
                        "Join the List"
                      )}
                    </button>

                    <p className="mt-3.5 text-center text-[#0F3D33]/30 text-[11px]">
                      No spam. Just a heads-up when we launch.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
