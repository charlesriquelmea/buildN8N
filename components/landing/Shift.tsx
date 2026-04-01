"use client"

import { motion } from "framer-motion"
import { CheckCircle, AlertCircle } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface Props { lang: Lang }

export function Shift({ lang }: Props) {
  const c = copy[lang]

  return (
    <section id="shift" className="py-24 bg-zinc-900">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mb-4 text-balance">{c.shiftTitle}</h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">{c.shiftIntro}</p>
        </motion.div>

        {/* Principles */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14"
        >
          {c.shiftPrinciples.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col gap-3">
              <span className="text-6xl font-black text-violet-500/30 font-mono leading-none">{p.num}</span>
              <h3 className="text-xl font-bold text-zinc-100">{p.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Alert box */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-zinc-800 rounded-2xl border border-cyan-500/30 p-6 md:p-8"
        >
          <div className="flex items-start gap-3 mb-5">
            <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <h3 className="font-bold text-zinc-100 text-lg">{c.shiftAlertTitle}</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {c.shiftAlertBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 text-sm leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
