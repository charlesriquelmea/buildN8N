"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Loader2, CheckCircle } from "lucide-react"
import { copy, PHONE_NUMBER, SPOTS_AVAILABLE } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

const TOTAL_STEPS = 5

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }),
}

interface Props {
  lang: Lang
  formRef: React.RefObject<HTMLDivElement | null>
  highlightForm?: boolean
}

export function LeadForm({ lang, formRef, highlightForm }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]

  const [step, setStep] = useState(-1) // -1 = welcome
  const [dir, setDir] = useState(1)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [business, setBusiness] = useState("")
  const [level, setLevel] = useState("")
  const [shake, setShake] = useState(false)
  const [loadingIdx, setLoadingIdx] = useState(0)
  const [done, setDone] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const progress = step < 0 ? 0 : ((step + 1) / TOTAL_STEPS) * 100

  useEffect(() => {
    if (step >= 0 && step < 4 && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [step])

  // Loading text cycling
  useEffect(() => {
    if (step !== 4) return
    let i = 0
    const t = setInterval(() => {
      i++
      if (i < c.formStep5Texts.length) {
        setLoadingIdx(i)
      } else {
        clearInterval(t)
        // redirect
        const msg = c.waMessage(name, business, level)
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`
        window.open(url, "_blank")
        setDone(true)
      }
    }, 600)
    return () => clearInterval(t)
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  const goNext = useCallback((s: number) => {
    setDir(1)
    setStep(s)
  }, [])

  const validateAndNext = useCallback(() => {
    if (step === 0 && name.trim().length < 2) { setShake(true); setTimeout(() => setShake(false), 500); return }
    if (step === 1 && phone.replace(/\D/g, "").length < 10) { setShake(true); setTimeout(() => setShake(false), 500); return }
    goNext(step + 1)
  }, [step, name, phone, goNext])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") validateAndNext()
  }

  const reopen = useCallback(() => {
    const msg = c.waMessage(name, business, level)
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
  }, [name, business, level, c])

  return (
    <section id="lead-form" className="py-24 bg-zinc-950" ref={formRef}>
      <div className="max-w-lg mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mb-2 text-balance">
            {c.formTitle} —{" "}
            <span className="text-orange-400">
              {lang === "es"
                ? `Solo quedan ${SPOTS_AVAILABLE} lugares`
                : `Only ${SPOTS_AVAILABLE} spots left`}
            </span>
          </h2>
          <p className="text-zinc-500 text-sm">{c.formSubtitle}</p>
        </div>

        <motion.div
          animate={
            highlightForm && !shouldReduce
              ? { boxShadow: ["0 0 0 0px rgba(249,115,22,0)", "0 0 0 4px rgba(249,115,22,0.4)", "0 0 0 0px rgba(249,115,22,0)"] }
              : {}
          }
          transition={{ duration: 0.6 }}
          className="bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden"
          style={{ minHeight: 420 }}
        >
          {/* Progress bar */}
          {step >= 0 && step < 4 && (
            <div className="h-1 bg-zinc-800">
              <motion.div
                className="h-full bg-violet-500"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: progress / 100 }}
                style={{ originX: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          )}

          <div className="p-8 relative overflow-hidden" style={{ minHeight: 380 }}>
            <AnimatePresence mode="wait" custom={dir}>
              {/* STEP -1: Welcome */}
              {step === -1 && (
                <motion.div
                  key="welcome"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col items-center gap-5 text-center absolute inset-8"
                >
                  <span className="text-5xl">⚡</span>
                  <h3 className="text-2xl font-bold text-zinc-50">{c.formStep0Title}</h3>
                  <p className="text-zinc-400">{c.formStep0Body}</p>
                  <button
                    onClick={() => goNext(0)}
                    className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all text-lg w-full"
                  >
                    {c.formStep0Btn}
                  </button>
                </motion.div>
              )}

              {/* STEP 0: Name */}
              {step === 0 && (
                <motion.div
                  key="name"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-6 absolute inset-8"
                >
                  <label className="text-xl font-bold text-zinc-100">{c.formStep1Label}</label>
                  <motion.input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Tu nombre..."
                    animate={shake && !shouldReduce ? { x: [-4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className="bg-transparent border-b-2 border-zinc-700 focus:border-violet-500 outline-none text-2xl text-zinc-50 py-2 placeholder-zinc-700 transition-colors"
                  />
                  <p className="text-xs text-zinc-600">{c.formStep1Hint}</p>
                  <button
                    onClick={validateAndNext}
                    className="mt-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                  >
                    {c.formNextBtn}
                  </button>
                </motion.div>
              )}

              {/* STEP 1: Phone */}
              {step === 1 && (
                <motion.div
                  key="phone"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-6 absolute inset-8"
                >
                  <label className="text-xl font-bold text-zinc-100">{c.formStep2Label}</label>
                  <p className="text-sm text-zinc-500 -mt-4">{c.formStep2Sub}</p>
                  <motion.input
                    ref={inputRef}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="+1 (201) 555-0000"
                    animate={shake && !shouldReduce ? { x: [-4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className="bg-transparent border-b-2 border-zinc-700 focus:border-violet-500 outline-none text-2xl text-zinc-50 py-2 placeholder-zinc-700 font-mono transition-colors"
                  />
                  <p className="text-xs text-zinc-600">{c.formStep1Hint}</p>
                  <button
                    onClick={validateAndNext}
                    className="mt-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                  >
                    {c.formNextBtn}
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Business type */}
              {step === 2 && (
                <motion.div
                  key="business"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-4 absolute inset-8"
                >
                  <label className="text-lg font-bold text-zinc-100">{c.formStep3Label}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {c.formStep3Options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => { setBusiness(opt.label); goNext(3) }}
                        className="flex items-center gap-3 p-3 rounded-xl border border-zinc-700 hover:border-violet-500/50 hover:bg-violet-500/5 text-left transition-all"
                      >
                        <span className="text-xl">{opt.icon}</span>
                        <div>
                          <p className="font-medium text-zinc-200 text-sm">{opt.label}</p>
                          <p className="text-xs text-zinc-500">{opt.sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Level */}
              {step === 3 && (
                <motion.div
                  key="level"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-4 absolute inset-8"
                >
                  <label className="text-lg font-bold text-zinc-100">{c.formStep4Label}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {c.formStep4Options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => { setLevel(opt.label); goNext(4) }}
                        className="flex items-center gap-3 p-3 rounded-xl border border-zinc-700 hover:border-violet-500/50 hover:bg-violet-500/5 text-left transition-all"
                      >
                        <span className="text-xl">{opt.icon}</span>
                        <div>
                          <p className="font-medium text-zinc-200 text-sm">{opt.label}</p>
                          <p className="text-xs text-zinc-500">{opt.sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Loading */}
              {step === 4 && !done && (
                <motion.div
                  key="loading"
                  custom={dir}
                  variants={shouldReduce ? {} : slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col items-center justify-center gap-5 text-center absolute inset-8"
                >
                  <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-zinc-300 font-medium"
                    >
                      {c.formStep5Texts[loadingIdx]}
                    </motion.p>
                  </AnimatePresence>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-full bg-violet-500"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Success */}
              {done && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex flex-col items-center justify-center gap-5 text-center absolute inset-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <CheckCircle className="w-14 h-14 text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-zinc-50">
                    {c.formSuccessTitle.replace("{name}", name)}
                  </h3>
                  <p className="text-zinc-400">{c.formSuccessBody}</p>
                  <button
                    onClick={reopen}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                  >
                    {c.formSuccessBtn}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
