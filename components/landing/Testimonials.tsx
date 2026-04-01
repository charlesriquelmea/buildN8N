"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion"
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

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const shouldReduce = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduce
          ? {}
          : { rotateX: rotX, rotateY: rotY, transformPerspective: 800 }
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface Props { lang: Lang }

export function Testimonials({ lang }: Props) {
  const c = copy[lang]

  return (
    <section id="testimonials" className="py-24 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-3xl md:text-4xl font-bold text-zinc-50 text-center mb-12 text-balance"
        >
          {c.testimonialsTitle}
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {c.testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp}>
              <TiltCard className="h-full">
                <div className="bg-zinc-800 rounded-2xl border border-zinc-700 hover:border-zinc-600 p-6 h-full flex flex-col gap-4 transition-all">
                  {/* ANTES */}
                  <div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400">
                      ANTES
                    </span>
                    <p className="mt-2 text-zinc-400 text-sm leading-relaxed italic">&ldquo;{t.before}&rdquo;</p>
                  </div>
                  {/* DURANTE */}
                  <div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400">
                      DURANTE
                    </span>
                    <p className="mt-2 text-zinc-300 text-sm leading-relaxed italic">&ldquo;{t.during}&rdquo;</p>
                  </div>
                  {/* DESPUÉS */}
                  <div className="flex-1">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400">
                      {lang === "es" ? "DESPUÉS" : "AFTER"}
                    </span>
                    <p className="mt-2 text-zinc-200 text-sm leading-relaxed font-medium">&ldquo;{t.after}&rdquo;</p>
                  </div>
                  {/* Author */}
                  <div className="pt-3 border-t border-zinc-700 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {t.author.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">{t.author}</p>
                      <p className="text-xs text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 text-center bg-zinc-800 rounded-xl border border-zinc-700 px-6 py-4"
        >
          <p className="text-sm text-zinc-400 leading-relaxed">{c.statsBar}</p>
        </motion.div>
      </div>
    </section>
  )
}
