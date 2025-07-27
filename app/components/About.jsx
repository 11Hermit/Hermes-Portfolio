"use client"

import { motion } from "framer-motion"
import { Cloud, Database, Brain, Code2, Globe, Server } from "lucide-react"
import Image from "next/image"

export default function About() {
  return (
    <div
      id="about"
      className="py-20 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          AI Engineering Expertise
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Senior AI Software Engineer with 5+ years of hands-on experience architecting and deploying production AI
            systems that drive measurable business outcomes. I specialize in building sophisticated AI agents using
            cutting-edge frameworks like CrewAI, OpenAI Agents SDK, and custom LLM solutions. My expertise spans the
            entire AI development lifecycle - from fine-tuning large language models and implementing RAG systems to
            orchestrating complex agentic workflows and MLOps pipelines. I've successfully delivered AI solutions for
            11+ clients, with a track record of reducing operational costs by 60-70% while improving customer
            satisfaction scores by 85%. My technical leadership has resulted in AI systems processing over 1M+ data
            points daily, with 99.9% uptime across distributed cloud infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
          >
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/30 mb-4 inline-block">
              <Brain className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 dark:text-white">AI & LLM Development</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Building intelligent applications with LLMs and custom AI models
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
                LangChain
              </span>
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
                OpenAI
              </span>
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
                HuggingFace
              </span>
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
                TensorFlow
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-pink-200 dark:hover:border-pink-800"
          >
            <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-900/30 mb-4 inline-block">
              <Globe className="w-10 h-10 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 dark:text-white">GraphQL APIs</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Designing efficient APIs for AI-powered applications
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 rounded-full text-xs font-medium">
                Apollo
              </span>
              <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 rounded-full text-xs font-medium">
                Express-GraphQL
              </span>
              <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 rounded-full text-xs font-medium">
                Graphene
              </span>
              <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 rounded-full text-xs font-medium">
                Hot Chocolate
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-red-200 dark:hover:border-red-800"
          >
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 mb-4 inline-block">
              <Code2 className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 dark:text-white">Frontend Development</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Creating responsive UIs for AI-powered applications</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full text-xs font-medium">
                React
              </span>
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full text-xs font-medium">
                Angular
              </span>
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full text-xs font-medium">
                Next.js
              </span>
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full text-xs font-medium">
                Tailwind CSS
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
          >
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 mb-4 inline-block">
              <Server className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 dark:text-white">Backend Development</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Building robust backends for AI-powered applications
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                Node.js
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                .NET Core
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                Python
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                FastAPI
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-green-200 dark:hover:border-green-800"
          >
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30 mb-4 inline-block">
              <Database className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 dark:text-white">Data Engineering</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Processing and analyzing data for AI model training</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                ETL/ELT
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                Airflow
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                Databricks
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                Snowflake
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-yellow-200 dark:hover:border-yellow-800"
          >
            <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 mb-4 inline-block">
              <Cloud className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 dark:text-white">Cloud Infrastructure</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Deploying AI solutions on scalable cloud platforms</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium">
                AWS
              </span>
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium">
                Azure
              </span>
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium">
                GCP
              </span>
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium">
                Kubernetes
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="about-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          {/* Philosophical flowing curves */}
          <path
            d="M-100,200 C100,100 300,300 500,200 S700,100 900,200 S1100,300 1300,200"
            stroke="url(#about-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-100,400 C100,300 300,500 500,400 S700,300 900,400 S1100,500 1300,400"
            stroke="url(#about-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-100,600 C100,500 300,700 500,600 S700,500 900,600 S1100,700 1300,600"
            stroke="url(#about-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-100,800 C100,700 300,900 500,800 S700,700 900,800 S1100,900 1300,800"
            stroke="url(#about-gradient)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </div>
  )
}
