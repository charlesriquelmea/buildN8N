"use client"

import { motion, useReducedMotion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const TECH = [
  { label: "n8n ⚡", color: "text-violet-400 border-violet-500/40 bg-violet-500/10" },
  { label: "WhatsApp API 💬", color: "text-green-400 border-green-500/40 bg-green-500/10" },
  { label: "Resend 📧", color: "text-blue-400 border-blue-500/40 bg-blue-500/10" },
  { label: "Google Sheets 📊", color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
  { label: "Airtable 🟡", color: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10" },
  { label: "Claude AI 🧠", color: "text-orange-400 border-orange-500/40 bg-orange-500/10" },
  { label: "GPT-4 🤖", color: "text-teal-400 border-teal-500/40 bg-teal-500/10" },
  { label: "Webhooks 🔗", color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10" },
  { label: "Vercel ▲", color: "text-zinc-200 border-zinc-500/40 bg-zinc-500/10" },
]

interface Props {
  lang: Lang
}

export function TechTicker({ lang }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]

  const badges = (
    <span className="inline-flex items-center gap-3 pr-8">
      {TECH.map((t) => (
        <span
          key={t.label}
          className={`inline-flex items-center font-mono text-xs font-medium px-3 py-1 rounded-full border ${t.color} whitespace-nowrap`}
        >
          {t.label}
        </span>
      ))}
      <span className="text-xs font-medium text-zinc-400 whitespace-nowrap px-4">
        {c.techTickerSuffix}
      </span>
    </span>
  )

  return (
    <div className="bg-zinc-800 border-y border-zinc-700 py-3 overflow-hidden">
      <div className="flex items-center gap-4 px-4">
        <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap shrink-0 border-r border-zinc-700 pr-4">
          {c.techTickerPrefix}
        </span>
        <div className="overflow-hidden flex-1">
          {shouldReduce ? (
            <div className="flex flex-wrap gap-2">{badges}</div>
          ) : (
            <motion.div
              className="flex"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {badges}
              {badges}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
