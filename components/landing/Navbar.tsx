"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

interface Props {
  lang: Lang
  onLangChange: (l: Lang) => void
  onCtaClick: () => void
  countdown: { h: string; m: string; s: string }
}

export function Navbar({ lang, onLangChange, onCtaClick, countdown }: Props) {
  const shouldReduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const c = copy[lang]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-zinc-950/90 border-b border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-violet-500 ring-2 ring-violet-500/30" />
            <div className="w-8 border-t-2 border-dashed border-violet-500/60" />
            <div className="w-3 h-3 rounded-full bg-cyan-400 ring-2 ring-cyan-400/30" />
          </div>
          <span className="font-black text-lg tracking-tight text-zinc-50 ml-1">
            Build in n8n
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {c.navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Lang toggle */}
          <div className="hidden sm:flex items-center gap-0.5 bg-zinc-800 rounded-full p-0.5">
            {(["es", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => onLangChange(l)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  lang === l
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Countdown */}
          <span className="hidden lg:flex items-center gap-1 text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1">
            <Zap className="w-3 h-3" />
            EB: {countdown.h}h:{countdown.m}m:{countdown.s}s
          </span>

          {/* CTA */}
          <Button
            onClick={onCtaClick}
            size="sm"
            className="hidden sm:flex bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs"
          >
            {c.navCta}
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-4 flex flex-col gap-4"
          >
            {c.navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-zinc-300 hover:text-zinc-50 text-left transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <div className="flex gap-1 bg-zinc-800 rounded-full p-0.5">
                {(["es", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => onLangChange(l)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      lang === l ? "bg-violet-600 text-white" : "text-zinc-400"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <Button
                onClick={() => { setMobileOpen(false); onCtaClick() }}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs"
              >
                {c.navCta}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
