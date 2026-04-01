"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { copy } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

// ─── Flow dot ──────────────────────────────────────────────────────────────
function FlowDot({ delay, speed = 1.8, color = "bg-violet-400" }: { delay: number; speed?: number; color?: string }) {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return null
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full ${color} top-1/2 -translate-y-1/2`}
      style={{ left: 0 }}
      animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: speed, repeat: Infinity, delay, ease: "linear" }}
    />
  )
}

// ─── Mini workflow diagram ─────────────────────────────────────────────────
interface NodeDef {
  label: string
  border: string
}
function WorkflowDiagram({
  nodes,
  hovered,
  dotColor = "bg-violet-400",
}: {
  nodes: NodeDef[]
  hovered: boolean
  dotColor?: string
}) {
  const speed = hovered ? 0.5 : 1.8
  return (
    <div className="flex items-center flex-wrap gap-y-2 gap-x-1 py-3">
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center gap-1">
          <div
            className={`font-mono text-xs px-2.5 py-1 rounded bg-zinc-800 border-l-2 ${node.border} text-zinc-200 transition-all ${hovered ? "shadow-sm" : ""}`}
          >
            {node.label}
          </div>
          {i < nodes.length - 1 && (
            <div className="relative w-8 h-px overflow-visible">
              <div className="w-full border-t border-dashed border-zinc-600" />
              <FlowDot delay={i * 0.5} speed={speed} color={dotColor} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Workflow card ──────────────────────────────────────────────────────────
interface WorkflowCardData {
  number: string
  badgeColor: string
  badgeBg: string
  title: string
  titleBadge: string
  nodes: NodeDef[]
  dotColor: string
  body: string
  metrics: string[]
  stack: string[]
  accentBorder: string
}

const WORKFLOWS: WorkflowCardData[] = [
  {
    number: "01",
    badgeColor: "text-violet-300",
    badgeBg: "bg-violet-500/15 border-violet-500/30",
    title: "",
    titleBadge: "⚡ Activo desde el día 1",
    nodes: [
      { label: "Form 📋 Nuevo Lead", border: "border-violet-500" },
      { label: "n8n ⚡ Procesa datos", border: "border-violet-400" },
      { label: "Sheets 📊 Guarda CRM", border: "border-emerald-400" },
      { label: "WhatsApp 💬 Notifica", border: "border-green-500" },
    ],
    dotColor: "bg-violet-400",
    body: "",
    metrics: ["⏱️ Respuesta: < 2 min", "💰 Valor: $800–$1,500 como servicio", "🔄 24/7 automático"],
    stack: ["n8n", "Webhooks", "Google Sheets", "WhatsApp Business API"],
    accentBorder: "hover:border-violet-500/40",
  },
  {
    number: "02",
    badgeColor: "text-cyan-300",
    badgeBg: "bg-cyan-500/15 border-cyan-500/30",
    title: "",
    titleBadge: "⚡ Activo desde el día 1",
    nodes: [
      { label: "Event 🎯 Nuevo signup", border: "border-cyan-400" },
      { label: "n8n ⚡ Segmenta", border: "border-violet-400" },
      { label: "Resend 📧 Email 1", border: "border-blue-400" },
      { label: "⏰ Wait → Resend 📧 +2", border: "border-blue-300" },
    ],
    dotColor: "bg-cyan-400",
    body: "",
    metrics: ["📈 Open rate: 45%+ (vs 22% avg)", "💰 Valor: $1,200–$2,500 como servicio", "🔄 Escala infinita"],
    stack: ["n8n", "Resend", "Webhooks", "Google Sheets"],
    accentBorder: "hover:border-cyan-500/40",
  },
  {
    number: "03",
    badgeColor: "text-orange-300",
    badgeBg: "bg-orange-500/15 border-orange-500/30",
    title: "",
    titleBadge: "⚡ El más avanzado · Nivel Intermedio",
    nodes: [
      { label: "Webhook 🔗 Mensaje", border: "border-cyan-400" },
      { label: "n8n ⚡ Extrae contexto", border: "border-violet-400" },
      { label: "Claude/GPT 🧠 Genera", border: "border-orange-400" },
      { label: "WhatsApp/Email 💬", border: "border-teal-400" },
    ],
    dotColor: "bg-orange-400",
    body: "",
    metrics: ["⚡ Respuesta: < 30 segundos", "💰 Valor: $2,000–$5,000 como servicio", "🤖 IA con contexto"],
    stack: ["n8n", "Claude API", "GPT-4", "Webhooks", "WhatsApp API"],
    accentBorder: "hover:border-orange-500/40",
  },
]

const TITLES_ES = [
  "Lead Capture → CRM con notificación automática",
  "Email Marketing automático con secuencias personalizadas",
  "Agente de IA que responde con contexto real",
]
const TITLES_EN = [
  "Lead Capture → CRM with automatic notification",
  "Automatic Email Marketing with personalized sequences",
  "AI Agent that responds with real context",
]
const BODIES_ES = [
  "Cada vez que alguien llena tu formulario, n8n lo captura, lo guarda en tu Google Sheets/Airtable como un CRM real, y te envía una notificación instantánea por WhatsApp. Nunca más un lead perdido.",
  "Un nuevo suscriptor o cliente dispara automáticamente una secuencia de emails personalizados con su nombre, comportamiento y contexto — enviados por Resend en los momentos exactos. Tu email marketing corriendo solo mientras tú duermes.",
  "Un mensaje llega (por WhatsApp, email, formulario). n8n extrae el contexto, lo envía a Claude o GPT con tu prompt personalizado, recibe la respuesta inteligente y la entrega automáticamente. Sin sonar a robot. Con el tono de tu marca.",
]
const BODIES_EN = [
  "Every time someone fills your form, n8n captures it, saves it to your Google Sheets/Airtable as a real CRM, and sends you an instant WhatsApp notification. Never lose a lead again.",
  "A new subscriber or client automatically triggers a personalized email sequence with their name, behavior and context — sent by Resend at exactly the right moments. Your email marketing running solo while you sleep.",
  "A message arrives (via WhatsApp, email, form). n8n extracts the context, sends it to Claude or GPT with your custom prompt, receives the intelligent response and delivers it automatically. Without sounding robotic. In your brand's voice.",
]

interface Props {
  lang: Lang
  onCtaClick: () => void
}

export function WorkflowCards({ lang, onCtaClick }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]
  const titles = lang === "es" ? TITLES_ES : TITLES_EN
  const bodies = lang === "es" ? BODIES_ES : BODIES_EN
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="workflows-detail" className="py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mb-4 text-balance">
            {c.workflowsSectionTitle}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {c.workflowsSectionIntro}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-8">
          {WORKFLOWS.map((wf, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className={`bg-zinc-900 rounded-2xl border border-zinc-800 ${wf.accentBorder} transition-all p-6 md:p-8 cursor-default`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border font-mono ${wf.badgeBg} ${wf.badgeColor}`}>
                  Workflow {wf.number}
                </span>
                <span className="text-xs text-zinc-400 border border-zinc-700 rounded-full px-3 py-1">
                  {wf.titleBadge}
                </span>
                <div className="flex items-center gap-1.5 ml-auto">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-mono text-green-400 font-semibold">LIVE</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-zinc-50 mb-4">{titles[i]}</h3>

              {/* Diagram */}
              <div className="bg-zinc-950/50 rounded-xl border border-zinc-800 px-4 py-2 mb-5 overflow-x-auto">
                <WorkflowDiagram nodes={wf.nodes} hovered={hoveredCard === i} dotColor={wf.dotColor} />
              </div>

              {/* Body */}
              <p className="text-zinc-400 leading-relaxed mb-5">{bodies[i]}</p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2 mb-5">
                {wf.metrics.map((m) => (
                  <span key={m} className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-medium">
                    {m}
                  </span>
                ))}
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5">
                {wf.stack.map((s) => (
                  <span key={s} className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-cyan-400 border border-zinc-700">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Authority block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 text-center bg-zinc-900 rounded-2xl border border-violet-500/20 p-8"
        >
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-6">{c.workflowsAuthorityBlock}</p>
          <button
            onClick={onCtaClick}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 text-base"
          >
            {c.primaryCta}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
