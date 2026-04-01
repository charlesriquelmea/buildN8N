"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { copy, INSTRUCTOR_NAME, INSTRUCTOR_INITIALS, WORKFLOWS_DEPLOYED, STUDENTS_TRAINED, YEARS_EXPERIENCE } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

interface Props { lang: Lang }

export function Guarantee({ lang }: Props) {
  const c = copy[lang]
  const lines = c.guaranteeBody.split("\n\n")

  return (
    <section id="guarantee" className="py-24 bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-zinc-900 rounded-2xl border-2 border-green-500/30 p-8 md:p-12 shadow-xl shadow-green-500/5"
        >
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-50">{c.guaranteeTitle}</h2>
            <div className="flex flex-col gap-4 text-left">
              {lines.map((line, i) => (
                <p key={i} className="text-zinc-400 leading-relaxed text-base">{line}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Instructor({ lang }: Props) {
  const c = copy[lang]

  return (
    <section id="instructor" className="py-24 bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row items-center md:items-start gap-8"
        >
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-violet-500/20">
              <span className="text-3xl md:text-4xl font-black text-white">{INSTRUCTOR_INITIALS}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-50">{INSTRUCTOR_NAME}</h2>
              <p className="text-violet-400 font-medium mt-1">{c.instructorBadge}</p>
            </div>
            <p className="text-zinc-400 leading-relaxed">{c.instructorBio}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-2">
              {[
                { value: WORKFLOWS_DEPLOYED, label: lang === "es" ? "Workflows deployados" : "Workflows deployed" },
                { value: STUDENTS_TRAINED, label: lang === "es" ? "Alumnos formados" : "Students trained" },
                { value: YEARS_EXPERIENCE, label: lang === "es" ? "Años de experiencia" : "Years of experience" },
              ].map((stat) => (
                <div key={stat.label} className="bg-zinc-800 rounded-xl border border-zinc-700 px-5 py-3 text-center min-w-[100px]">
                  <p className="text-2xl font-black text-violet-400 font-mono">{stat.value}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
