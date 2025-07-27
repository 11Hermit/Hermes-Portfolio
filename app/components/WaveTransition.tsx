"use client"

import { motion } from "framer-motion"

interface WaveTransitionProps {
  from: string
  to: string
  invert?: boolean
}

export default function WaveTransition({ from, to, invert = false }: WaveTransitionProps) {
  return (
    <div
      className="relative h-20 overflow-hidden"
      style={{ background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)` }}
    >
      <div className="absolute w-full h-full">
        <motion.div
          className="absolute inset-0 w-full"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20"
            style={{ transform: invert ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="transition-all duration-300"
              style={{
                fill: invert ? from : to,
                opacity: 0.2,
              }}
            ></path>
          </svg>
        </motion.div>

        <motion.div
          className="absolute inset-0 w-full"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20"
            style={{ transform: invert ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="transition-all duration-300"
              style={{
                fill: invert ? from : to,
                opacity: 0.3,
              }}
            ></path>
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
