"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

/* ── Context ────────────────────────────────────────────────────── */

import { createContext, useContext } from "react";

interface WaitlistContextValue {
  open: () => void;
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

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <WaitlistContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </WaitlistContext.Provider>
  );
}

/* ── Button helper ──────────────────────────────────────────────── */

export function JoinListButton({
  className = "",
  children = "Join the List",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { open } = useWaitlist();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

/* ── Modal ──────────────────────────────────────────────────────── */

type Stage = "idle" | "loading" | "success" | "error" | "duplicate";

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  // Reset form each open
  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setStage("idle");
      setTimeout(() => nameRef.current?.focus(), 120);
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStage("loading");
    setErrorMsg("");

    try {
      // Prevent duplicate email submissions
      const q = query(collection(db, "waitlist"), where("email", "==", email.toLowerCase().trim()));
      const existing = await getDocs(q);

      if (!existing.empty) {
        setStage("duplicate");
        return;
      }

      await addDoc(collection(db, "waitlist"), {
        name: name.trim(),
        email: email.toLowerCase().trim(),
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
                    {/* Success ring */}
                    <div className="w-16 h-16 rounded-full bg-[#0F3D33] flex items-center justify-center mb-6 shadow-lg shadow-[#0F3D33]/30">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                        <path d="M6 14L11.5 19.5L22 9" stroke="#E7ECD8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter text-[#0F3D33] mb-2">
                      You&apos;re on the list!
                    </h3>
                    <p className="text-[#0F3D33]/55 text-sm leading-relaxed max-w-xs">
                      We&apos;ll reach out to <span className="font-semibold text-[#0F3D33]/80">{email}</span> the moment Rout is ready for you.
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
                    <div className="flex justify-center mb-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/logo.png"
                        alt="Rout"
                        className="h-12 w-12 object-contain"
                        style={{ mixBlendMode: "multiply" }}
                      />
                    </div>

                    <h2 className="text-3xl font-black tracking-tighter text-[#0F3D33] text-center mb-1.5">
                      Be first to ride
                    </h2>
                    <p className="text-[#0F3D33]/50 text-sm text-center mb-7 leading-relaxed">
                      Rout is launching soon. Join the waitlist and we&apos;ll notify you the moment it drops.
                    </p>

                    <div className="space-y-3.5">
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

                    {stage === "error" && (
                      <p className="mt-3 text-red-600/70 text-xs text-center">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={stage === "loading"}
                      className="mt-5 w-full py-3.5 rounded-xl bg-[#0F3D33] text-[#E7ECD8] text-sm font-bold tracking-wide hover:bg-[#1A5444] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
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

                    <p className="mt-4 text-center text-[#0F3D33]/30 text-[11px]">
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
