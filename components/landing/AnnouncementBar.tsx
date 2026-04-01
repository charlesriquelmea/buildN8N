"use client"

import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { copy, EVENT_DATE, EVENT_DATE_EN } from "@/lib/copy"
import type { Lang } from "@/lib/copy"

interface Props {
  lang: Lang
  onCtaClick: () => void
}

export function AnnouncementBar({ lang, onCtaClick }: Props) {
  const shouldReduce = useReducedMotion()
  const c = copy[lang]
  const text = c.announcementBar
    .replace("[FECHA]", EVENT_DATE)
    .replace("[DATE]", EVENT_DATE_EN)

  const content = (
    <span className="inline-flex items-center gap-8 pr-16 cursor-pointer whitespace-nowrap text-sm font-medium tracking-wide">
      {text}
    </span>
  )

  return (
    <div
      className="relative overflow-hidden bg-violet-600 text-white py-2.5 cursor-pointer"
      onClick={onCtaClick}
      role="banner"
    >
      <div className="flex">
        {shouldReduce ? (
          <div className="px-4">{content}</div>
        ) : (
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform" }}
            whileHover={{ animationPlayState: "paused" } as never}
          >
            {content}
            {content}
          </motion.div>
        )}
      </div>
    </div>
  )
}
