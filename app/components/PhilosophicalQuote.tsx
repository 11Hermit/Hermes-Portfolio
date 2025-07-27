"use client"

import { motion } from "framer-motion"

interface PhilosophicalQuoteProps {
  quote: string
  author: string
  bgClass?: string
}

export default function PhilosophicalQuote({ quote, author, bgClass = "bg-transparent" }: PhilosophicalQuoteProps) {
  return (
    <div className={`py-12 relative overflow-hidden ${bgClass}`}>
      <div className="absolute inset-0 philosophical-gradient"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 flex justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500 dark:to-indigo-400 self-center mr-4"></div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-indigo-500 dark:text-indigo-400"
            >
              <path
                d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.11 13.6501L13.69 10.0601"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500 dark:to-indigo-400 self-center ml-4"></div>
          </div>
          <p className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300 mb-4">{quote}</p>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">— {author}</p>
        </motion.div>
      </div>
    </div>
  )
}
