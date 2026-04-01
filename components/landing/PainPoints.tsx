"use client"

import { motion, useReducedMotion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const featuredVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

interface Props {
  lang: Lang
}

export function PainPoints({ lang }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]
  const regular = c.pains.filter((p) => !p.featured)
  const featured = c.pains.find((p) => p.featured)

  return (
    <section id="pain-points" className="py-24 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-3xl md:text-4xl font-bold text-zinc-50 text-center mb-12 text-balance"
        >
          {c.painTitle}
        </motion.h2>

        {/* Regular pains grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          {regular.map((pain, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-zinc-900 rounded-xl border border-zinc-800 hover:border-violet-500/30 p-5 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{pain.icon}</span>
                <div>
                  <p className="text-zinc-200 font-medium leading-snug">{pain.title}</p>
                  {pain.sub && (
                    <p className="text-zinc-500 text-sm mt-1">{pain.sub}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured pain */}
        {featured && (
          <motion.div
            variants={featuredVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className={`bg-zinc-900 rounded-2xl border-2 border-violet-500/50 p-6 md:p-8 ${
              shouldReduce ? "" : "shadow-lg shadow-violet-500/10"
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0 mt-1">{featured.icon}</span>
              <div>
                <p className="text-zinc-100 font-bold text-lg leading-snug mb-2">{featured.title}</p>
                <p className="text-zinc-400 leading-relaxed">{featured.sub}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
