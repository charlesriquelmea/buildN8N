"use client"

import { motion, useReducedMotion } from "framer-motion"
import { DollarSign, Settings, TrendingUp, Brain } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const ICONS = [
  <DollarSign key="dollar" className="w-6 h-6 text-green-400" />,
  <Settings key="settings" className="w-6 h-6 text-violet-400" />,
  <TrendingUp key="trend" className="w-6 h-6 text-orange-400" />,
  <Brain key="brain" className="w-6 h-6 text-cyan-400" />,
]

interface Props {
  lang: Lang
}

export function N8nAdvantage({ lang }: Props) {
  const c = copy[lang]

  return (
    <section id="n8n-advantage" className="py-24 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mb-4 text-balance">{c.n8nTitle}</h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">{c.n8nIntro}</p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12"
        >
          {c.n8nCards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-zinc-800 rounded-xl border border-zinc-700 hover:border-zinc-600 p-6 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                {ICONS[i]}
                <h3 className="font-bold text-zinc-100 text-lg">{card.title}</h3>
              </div>
              <p className="text-zinc-400 leading-relaxed text-sm mb-4">{card.body}</p>
              <span className="inline-flex font-mono text-xs px-3 py-1 rounded-full bg-zinc-700 border border-zinc-600 text-zinc-300">
                {card.stat}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 text-center border-l-4 border-violet-500 pl-6 text-left max-w-2xl mx-auto"
        >
          <p className="text-zinc-300 text-lg md:text-xl italic leading-relaxed">&ldquo;{c.n8nQuote}&rdquo;</p>
        </motion.blockquote>
      </div>
    </section>
  )
}
