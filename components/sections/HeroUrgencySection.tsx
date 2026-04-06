"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useReducedMotion, AnimatePresence, useMotionValue, animate } from "framer-motion"
import Link from "next/link"
import { Zap, AlertTriangle, TrendingUp, ShieldCheck, CreditCard, ArrowRight } from "lucide-react"
import { copy, type Lang } from "@/lib/copy"

interface HeroUrgencySectionProps {
  lang: Lang
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

const nodeVariant = {
  hidden: { scale: 0.75, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.12, type: "spring", stiffness: 300, damping: 20 },
  }),
}

// ── BLOCK 3 COMPONENTS ──
function CountUpAmount({ value, duration = 2 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState("0")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""))
      const controls = animate(0, numericValue, {
        duration,
        onUpdate: (latest) => {
          setDisplay(`$${Math.floor(latest).toLocaleString()}`)
        },
      })
      return () => controls.stop()
    }
  }, [isInView, value, duration])

  return <span ref={ref}>{display}</span>
}

// ── BLOCK 4 COMPONENTS ──
function BezierLine({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex-1 min-w-[20px] md:min-w-[40px] h-10 flex items-center justify-center relative">
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
        <path
          d="M 0 20 C 20 20, 20 20, 40 20"
          fill="none"
          stroke="rgba(45, 212, 191, 0.2)"
          strokeWidth="2"
          className="w-full"
        />
        <motion.path
          d="M 0 20 C 20 20, 20 20, 40 20"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeDasharray="6 3"
          initial={{ pathLength: 0, strokeDashoffset: 100 }}
          whileInView={{ pathLength: 1 }}
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{
            pathLength: { duration: 0.8, delay },
            strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
          }}
          className="w-full"
        />
      </svg>
    </div>
  )
}

export default function HeroUrgencySection({ lang }: HeroUrgencySectionProps) {
  const t = copy[lang].heroUrgency
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section className="relative bg-[#0d0d0d] text-[#fafafa] py-16 md:py-24 px-4 overflow-hidden font-sans">
      {/* Background visual signature (nodos de workflow con opacidad baja) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* BLOQUE 1 — Scarcity Badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            {t.scarcity}
          </motion.div>
        </motion.div>

        {/* BLOQUE 2 — Wake-up Call (h1) */}
        <div className="text-center mb-16 px-4">
          <h1 className="font-bold text-4xl md:text-6xl max-w-4xl mx-auto leading-tight">
            {t.wakeup.h1.split(" ").map((word, i) => {
              // Accent highlight for "más de 5 horas" or similar in English
              const accentWords = t.wakeup.accent.split(" ")
              const isAccent = accentWords.includes(word.replace(/[¿?]/g, ""))
              return (
                <motion.span
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className={`inline-block mr-[0.15em] ${isAccent ? "text-red-400" : ""}`}
                >
                  {word}
                </motion.span>
              )
            })}
          </h1>
          <motion.p
            variants={fadeUp}
            className="text-[#a3a3a3] text-lg md:text-xl font-normal mt-6 max-w-2xl mx-auto px-4"
          >
            {t.wakeup.sub}
          </motion.p>
        </div>

        {/* BLOQUE 3 — Cost Calculator */}
        <motion.div
          variants={fadeUp}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto mb-20 shadow-2xl"
        >
          <p className="font-mono text-neutral-500 text-xs mb-6 uppercase tracking-wider">
            {t.calculator.title}
          </p>
          <div className="space-y-4">
            {t.calculator.rows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1 - i * 0.2, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-3 last:border-0"
              >
                <span className="font-mono text-neutral-400 text-sm">{row.label}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-[#ea4b35] text-lg">
                    <CountUpAmount value={row.amount} />
                    <span className="text-xs ml-1">/ año</span>
                  </span>
                  <span className="bg-red-500/10 text-red-400 text-[10px] uppercase font-bold tracking-tighter rounded-full px-2 py-0.5 border border-red-500/20">
                    {row.chip.replace(/[\[\]]/g, "")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BLOQUE 4 — Workflow Visualization */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-between overflow-x-auto pb-4 no-scrollbar">
            {t.workflow.nodes.map((node, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  custom={i}
                  variants={nodeVariant}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-center min-w-[110px] shadow-lg"
                >
                  <span className="text-sm font-medium text-neutral-200">{node}</span>
                </motion.div>
                {i < t.workflow.nodes.length - 1 && <BezierLine delay={i * 0.2} />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* SIN n8n */}
            <motion.div
              variants={fadeUp}
              className="border-l-2 border-red-500/50 bg-red-500/[0.02] p-5 rounded-r-xl"
            >
              <p className="text-red-400 text-xs font-mono mb-3 uppercase tracking-widest">{t.workflow.comparison.sin.label}</p>
              <p className="text-neutral-400 text-sm leading-relaxed">{t.workflow.comparison.sin.steps}</p>
              <p className="text-white font-mono text-sm mt-4">{t.workflow.comparison.sin.time}</p>
            </motion.div>

            {/* CON n8n */}
            <motion.div
              variants={fadeUp}
              className="border-l-2 border-teal-500 bg-teal-500/[0.05] p-5 rounded-r-xl"
            >
              <p className="text-teal-400 text-xs font-mono mb-3 uppercase tracking-widest">{t.workflow.comparison.con.label}</p>
              <p className="text-neutral-200 text-sm leading-relaxed">{t.workflow.comparison.con.steps}</p>
              <p className="text-teal-300 font-mono text-sm mt-4">{t.workflow.comparison.con.time}</p>
            </motion.div>
          </div>
        </div>

        {/* BLOQUE 5 — Competitive Gap Table */}
        <div className="mb-24 overflow-x-auto">
          <motion.p variants={fadeUp} className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] mb-8 text-center font-bold">
            {t.gapTable.title}
          </motion.p>
          <table className="w-full max-w-4xl mx-auto text-sm border-collapse border border-neutral-800/50">
            <thead>
              <tr className="border-b border-neutral-800">
                {t.gapTable.headers.map((h, i) => (
                  <th key={i} className="p-4 text-left font-mono text-neutral-500 text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.gapTable.rows.map((row, rowIndex) => (
                <motion.tr
                  key={rowIndex}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + rowIndex * 0.05 }}
                  className="border-b border-neutral-900 group hover:bg-white/[0.01] transition-colors"
                >
                  <td className="p-4 text-neutral-400 font-medium">{row[0]}</td>
                  <td className="p-4 text-neutral-500">{row[1]}</td>
                  <td className="p-4 text-teal-400 bg-teal-500/[0.03] font-semibold">{row[2]}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BLOQUE 6 — Risk Projection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
          {t.risk.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors shadow-xl group"
            >
              <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {i === 0 ? <Zap className="w-5 h-5 text-[#ea4b35]" /> : i === 1 ? <AlertTriangle className="w-5 h-5 text-amber-500" /> : <TrendingUp className="w-5 h-5 text-teal-400" />}
              </div>
              <h3 className="font-bold text-lg mb-3">{card.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>

        {/* BLOQUE 7 — Integration Badges Marquee */}
        <div className="mb-24 relative">
          <p className="text-neutral-600 text-[10px] uppercase tracking-[0.2em] mb-6 text-center font-bold">
            {t.marquee.label}
          </p>
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 pr-4 py-2"
            >
              {[...t.marquee.tools, ...t.marquee.tools].map((tool, i) => (
                <div
                  key={i}
                  className="bg-neutral-900/50 text-neutral-400 text-xs font-mono px-4 py-2 rounded-full border border-neutral-800 whitespace-nowrap hover:text-white transition-colors"
                >
                  {tool}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* BLOQUE 8 — CTA Block */}
        <div className="max-w-2xl mx-auto text-center space-y-8 bg-gradient-to-b from-white/[0.05] to-transparent p-10 rounded-3xl border border-white/5 shadow-2xl">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {t.cta.h1}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-neutral-400 text-lg leading-relaxed">
            {t.cta.sub}
          </motion.p>
          <motion.p variants={fadeUp} className="text-neutral-600 text-xs font-mono uppercase tracking-[0.2em]">
            {t.cta.bridge}
          </motion.p>
          
          <motion.div variants={fadeUp} className="pt-4">
            <Link
              href="#contact"
              className="inline-block w-full sm:w-auto"
            >
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.02, boxShadow: "0 0 28px rgba(234,75,53,0.4)" }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                className="w-full sm:px-12 h-16 rounded-xl font-bold bg-[#ea4b35] hover:bg-[#ff5740] text-white flex items-center justify-center gap-3 transition-all text-lg shadow-lg"
              >
                {t.cta.btn}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            {t.cta.trust.map((line, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  {i === 0 ? <ShieldCheck className="w-4 h-4 text-teal-400" /> : i === 1 ? <CreditCard className="w-4 h-4 text-amber-500" /> : <Zap className="w-4 h-4 text-red-400" />}
                </div>
                <span className="text-neutral-500 text-[10px] uppercase font-bold leading-tight">{line.split(" ").slice(1).join(" ")}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* BLOQUE 9 — Urgency Footer Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full bg-amber-500/[0.03] border-t border-amber-500/10 py-6 px-6 mt-20 text-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-amber-500/[0.02] transform -skew-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-700"></div>
        <p className="text-amber-500/80 text-xs md:text-sm font-mono tracking-wider relative z-10">
          {t.urgencyBar}
        </p>
      </motion.div>
    </section>
  )
}
