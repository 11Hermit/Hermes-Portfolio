"use client"

import { motion } from "framer-motion"

interface SectionTransitionProps {
  from: string
  to: string
}

export default function SectionTransition({ from, to }: SectionTransitionProps) {
  return (
    <div className="h-24 relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <svg className="w-full h-full" viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 Q250,0 500,50 T1000,50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
            <path d="M0,70 Q250,20 500,70 T1000,70" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
            <path d="M0,90 Q250,40 500,90 T1000,90" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
