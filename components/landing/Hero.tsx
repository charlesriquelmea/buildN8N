"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

// ─── Typewriter ──────────────────────────────────────────────────────────────
function Typewriter({ phrases, prefix }: { phrases: readonly string[]; prefix: string }) {
  const shouldReduce = useReducedMotion()
  const [text, setText] = useState("")
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [cursorActive, setCursorActive] = useState(true)

  useEffect(() => {
    if (shouldReduce) { setText(phrases[0]); return }
    const current = phrases[phraseIdx]
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true) }, 2200)
      return () => clearTimeout(t)
    }
    if (!isDeleting) {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), 55)
        return () => clearTimeout(t)
      } else {
        setIsPaused(true)
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 28)
        return () => clearTimeout(t)
      } else {
        setIsDeleting(false)
        const t = setTimeout(() => setPhraseIdx((phraseIdx + 1) % phrases.length), 400)
        return () => clearTimeout(t)
      }
    }
  }, [text, phraseIdx, isDeleting, isPaused, phrases, shouldReduce])

  useEffect(() => {
    const t = setInterval(() => setCursorActive((v) => !v), 500)
    return () => clearInterval(t)
  }, [])

  return (
    <p className="text-lg md:text-xl font-medium text-zinc-300 mt-4 min-h-[2rem]">
      <span className="text-zinc-500">{prefix} </span>
      <span className="text-violet-300">{text}</span>
      <motion.span
        className={isPaused ? "text-orange-400" : "text-violet-400"}
        animate={{ opacity: cursorActive ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        |
      </motion.span>
    </p>
  )
}

// ─── Workflow Canvas (hero right panel) ──────────────────────────────────────
const WORKFLOWS = [
  {
    id: 1,
    nodes: ["Form 📋", "n8n ⚡", "Sheets 📊", "WhatsApp 💬"],
    colors: ["border-violet-500", "border-violet-400", "border-emerald-400", "border-green-500"],
  },
  {
    id: 2,
    nodes: ["Event 🎯", "n8n ⚡", "Resend 📧", "Email ✉️"],
    colors: ["border-cyan-400", "border-violet-400", "border-blue-400", "border-blue-300"],
  },
  {
    id: 3,
    nodes: ["Webhook 🔗", "n8n ⚡", "Claude 🧠", "Reply 💬"],
    colors: ["border-cyan-400", "border-violet-400", "border-orange-400", "border-teal-400"],
  },
]

function FlowDot({ delay }: { delay: number }) {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return null
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-violet-400"
      style={{ top: "50%", transform: "translateY(-50%)", left: 0 }}
      animate={{ left: ["0%", "100%"] }}
      transition={{ duration: 1.8, repeat: Infinity, delay, ease: "linear" }}
    />
  )
}

function WorkflowRow({ wf, index }: { wf: typeof WORKFLOWS[0]; index: number }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      className="flex items-center gap-1"
      initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.3, duration: 0.5 }}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {wf.nodes.map((node, ni) => (
          <div key={ni} className="flex items-center gap-1">
            <div
              className={`font-mono text-xs px-2 py-0.5 rounded bg-zinc-700/80 border-l-2 text-zinc-200 ${wf.colors[ni]} whitespace-nowrap`}
            >
              {node}
            </div>
            {ni < wf.nodes.length - 1 && (
              <div className="relative h-px w-6 bg-transparent overflow-visible">
                <div className="w-full border-t border-dashed border-zinc-600" />
                <FlowDot delay={index * 0.6 + ni * 0.4} />
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function WorkflowCanvas() {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      className="relative"
      animate={shouldReduce ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="bg-zinc-900 rounded-xl border border-zinc-700 shadow-2xl overflow-hidden"
        style={{ transform: "rotate(-2deg)" }}>
        {/* Title bar */}
        <div className="bg-zinc-800 px-4 py-2.5 flex items-center gap-2 border-b border-zinc-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs font-mono text-zinc-400 ml-2">n8n · Workflow Editor</span>
        </div>

        {/* Canvas body */}
        <div className="p-4 flex flex-col gap-3 bg-zinc-950/50 min-w-[300px]">
          {WORKFLOWS.map((wf, i) => (
            <WorkflowRow key={wf.id} wf={wf} index={i} />
          ))}
        </div>

        {/* Status bar */}
        <div className="bg-zinc-800/80 px-4 py-2 border-t border-zinc-700">
          <p className="text-xs font-mono text-green-400">
            ✅ 3 workflows active · Last run: 2s ago · 847 executions
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Background canvas nodes ─────────────────────────────────────────────────
const BG_NODES = [
  { label: "Webhook", x: "5%", y: "20%", color: "text-cyan-400/20" },
  { label: "n8n", x: "20%", y: "35%", color: "text-violet-400/20" },
  { label: "Sheets", x: "55%", y: "15%", color: "text-emerald-400/20" },
  { label: "WhatsApp", x: "70%", y: "60%", color: "text-green-400/20" },
  { label: "Claude", x: "38%", y: "72%", color: "text-orange-400/20" },
]

function BgNodes() {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return null
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {BG_NODES.map((node) => (
        <div
          key={node.label}
          className={`absolute font-mono text-xs ${node.color} border border-current/30 rounded px-2 py-1`}
          style={{ left: node.x, top: node.y }}
        >
          {node.label}
        </div>
      ))}
    </div>
  )
}

// ─── Hero section ─────────────────────────────────────────────────────────────
interface Props {
  lang: Lang
  onCtaClick: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export function Hero({ lang, onCtaClick }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]
  const h1Words = c.h1.split(" ")

  const scrollToWorkflows = useCallback(() => {
    document.querySelector("#workflows")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-zinc-950"
    >
      <BgNodes />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,250,250,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(250,250,250,.3) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* LEFT — copy */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex"
            >
              <span className="inline-flex items-center gap-2 text-xs md:text-sm font-medium px-4 py-2 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 text-balance">
                {c.eyebrow}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-50 text-balance leading-[1.05]"
            >
              {h1Words.map((word, i) => (
                <motion.span key={i} variants={shouldReduce ? {} : wordVariant} className="inline-block mr-3">
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
              <Typewriter phrases={c.typewriterPhrases} prefix={c.typewriterPrefix} />
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
              className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl"
            >
              {c.subheadline}
            </motion.p>

            {/* Trust chips */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-2"
            >
              {c.trustChips.map((chip) => (
                <span
                  key={chip}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={onCtaClick}
                className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base md:text-lg px-8 py-4 rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 min-h-[52px]"
              >
                {c.primaryCta}
              </button>
              <button
                onClick={scrollToWorkflows}
                className="flex-1 sm:flex-none border border-zinc-700 hover:border-violet-500/50 text-zinc-300 hover:text-violet-300 font-medium text-sm px-6 py-4 rounded-xl transition-all min-h-[52px]"
              >
                {c.secondaryCta}
              </button>
            </motion.div>

            {/* Micro copy */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.0 }}
              className="text-xs text-zinc-500"
            >
              {c.microCopy}
            </motion.p>
          </div>

          {/* RIGHT — workflow canvas */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <WorkflowCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
