"use client"


const iconMap: Record<string, React.ElementType> = {
  Building2,
  Wrench,
  Star,
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface CredibilityProps {
  c: Copy
  prefersReducedMotion: boolean
}

export function CredibilitySection({ c, prefersReducedMotion }: CredibilityProps) {
  return (
    
  )
}
