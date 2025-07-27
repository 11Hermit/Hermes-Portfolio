"use client"

import { motion } from "framer-motion"

interface CreativeTransitionProps {
  colorFrom: string
  colorTo: string
}

export default function CreativeTransition({ colorFrom, colorTo }: CreativeTransitionProps) {
  return (
    <div className="relative h-24 overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: `linear-gradient(to bottom, ${colorFrom}, ${colorTo})` }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C300,100 600,0 900,50 C1000,75 1100,0 1200,50 L1200,120 L0,120 Z"
              className="fill-current transition-colors duration-500"
              style={{
                fill: "currentColor",
                color: colorTo,
                opacity: 0.3,
              }}
            ></path>
            <path
              d="M0,60 C200,20 400,100 600,30 C800,10 1000,80 1200,30 L1200,120 L0,120 Z"
              className="fill-current transition-colors duration-500"
              style={{
                fill: "currentColor",
                color: colorTo,
                opacity: 0.2,
              }}
            ></path>
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
