"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Clock } from "lucide-react"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

interface Props { lang: Lang }

export function Curriculum({ lang }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]

  return (
    <section id="curriculum" className="py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-3xl md:text-4xl font-bold text-zinc-50 text-center mb-16 text-balance"
        >
          {c.curriculumTitle}
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-zinc-700 to-transparent"
            initial={shouldReduce ? {} : { scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <div className="flex flex-col gap-6">
            {c.modules.map((mod, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05 }}
                className={`relative pl-16 md:pl-20 ${
                  mod.isBreak ? "opacity-70" : ""
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 md:left-6 top-3 w-4 h-4 rounded-full border-2 -translate-x-1/2 ${
                    mod.badge
                      ? "bg-green-500 border-green-400 shadow-lg shadow-green-500/30"
                      : mod.isBreak
                      ? "bg-zinc-700 border-zinc-600"
                      : "bg-violet-600 border-violet-400"
                  }`}
                />

                <div
                  className={`rounded-xl border p-5 ${
                    mod.isBreak
                      ? "bg-zinc-900/50 border-zinc-800 border-dashed"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  } transition-all`}
                >
                  {/* Time + duration */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-2.5 py-0.5">
                      {mod.time}
                    </span>
                    <span className="text-xs text-zinc-500">{mod.duration}</span>
                    {mod.isBreak && <Clock className="w-3.5 h-3.5 text-zinc-500" />}
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold text-lg mb-1 ${
                      mod.isBreak ? "text-zinc-400 italic" : "text-zinc-100"
                    }`}
                  >
                    {mod.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-zinc-500 text-sm mb-3">{mod.desc}</p>

                  {/* Learn / Leave */}
                  {!mod.isBreak && mod.learn && (
                    <div className="flex flex-col gap-2 mt-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2.5 py-0.5 shrink-0 whitespace-nowrap">
                          {lang === "es" ? "Aprenderás:" : "You'll learn:"}
                        </span>
                        <p className="text-zinc-400 text-xs leading-relaxed">{mod.learn}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-0.5 shrink-0 whitespace-nowrap">
                          {lang === "es" ? "Saldrás con:" : "You'll leave with:"}
                        </span>
                        <p className="text-zinc-400 text-xs leading-relaxed">{mod.leave}</p>
                      </div>
                    </div>
                  )}

                  {/* Deploy badge */}
                  {mod.badge && (
                    <div className="mt-3">
                      <motion.span
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400"
                        initial={shouldReduce ? {} : { scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      >
                        {mod.badge}
                      </motion.span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
