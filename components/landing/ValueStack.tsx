"use client"

import { motion, useReducedMotion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

interface Props { lang: Lang; onCtaClick: () => void }

export function ValueStack({ lang, onCtaClick }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]

  return (
    <section id="value-stack" className="py-24 bg-zinc-950">
      <div
        className="max-w-2xl mx-auto px-4 md:px-6"
        style={{ position: "relative" }}
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-violet-500/5 blur-3xl" />
        </div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-3xl md:text-4xl font-bold text-zinc-50 text-center mb-12 text-balance"
        >
          {c.valueStackTitle}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden"
        >
          {/* Items */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="divide-y divide-zinc-800"
          >
            {c.valueItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300 leading-snug">{item.label}</span>
                </div>
                <span className="text-sm font-mono text-zinc-500 line-through shrink-0">{item.price}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Separator */}
          <div className="border-t-2 border-zinc-700 mx-6" />

          {/* Total */}
          <div className="px-6 py-4 flex items-center justify-between">
            <span className="text-zinc-400 font-medium">{c.valueTotalLabel}</span>
            <span className="font-mono text-zinc-400 line-through text-lg">{c.valueTotalPrice}</span>
          </div>

          {/* Investment */}
          <div className="px-6 pb-6 flex flex-col gap-2 bg-zinc-800/30">
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-100 text-lg">{c.valueInvestmentLabel}</span>
              <motion.span
                className="font-black text-3xl text-orange-400 font-mono"
                initial={shouldReduce ? {} : { scale: 0.8 }}
                whileInView={{ scale: [1, 1.08, 1] }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                {c.valueInvestmentPrice} 🔥
              </motion.span>
            </div>
            <p className="text-xs text-zinc-500">{c.valueInvestmentSub}</p>
          </div>
        </motion.div>

        {/* Anchor copy */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 text-center text-zinc-400 text-sm leading-relaxed"
        >
          {c.valuePriceAnchor}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <button
            onClick={onCtaClick}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-5 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5"
          >
            {c.primaryCta}
          </button>
          <p className="text-xs text-zinc-500">{c.microCopy}</p>
        </motion.div>
      </div>
    </section>
  )
}
