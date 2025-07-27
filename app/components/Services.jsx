"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Database, Zap, GitBranch, Cpu } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: <Brain className="w-12 h-12 text-purple-500" />,
      title: "Custom LLM Development & Fine-tuning",
      description:
        "End-to-end development of custom language models tailored to your business domain, including fine-tuning, prompt optimization, and RLHF implementation for superior performance.",
    },
    {
      icon: <Bot className="w-12 h-12 text-blue-500" />,
      title: "Agentic AI System Architecture",
      description:
        "Design and implementation of sophisticated multi-agent systems using CrewAI and OpenAI Agents SDK, enabling autonomous task execution with intelligent workflow orchestration.",
    },
    {
      icon: <Database className="w-12 h-12 text-green-500" />,
      title: "RAG System Implementation",
      description:
        "Advanced retrieval-augmented generation systems with vector databases, semantic search, and context-aware AI responses for enterprise knowledge management.",
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: "AI-Powered Business Process Automation",
      description:
        "Intelligent automation solutions that transform manual workflows into AI-driven processes, reducing operational costs by 60-70% while improving accuracy and speed.",
    },
    {
      icon: <GitBranch className="w-12 h-12 text-indigo-500" />,
      title: "MLOps & AI Infrastructure",
      description:
        "Production-ready ML pipelines with automated deployment, monitoring, and scaling. Includes model versioning, A/B testing, and continuous learning systems.",
    },
    {
      icon: <Cpu className="w-12 h-12 text-pink-500" />,
      title: "Generative AI Application Development",
      description:
        "Full-stack development of AI-powered applications with real-time interfaces, seamless user experiences, and scalable backend infrastructure for generative AI workloads.",
    },
  ]

  return (
    <div
      id="services"
      className="py-20 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          AI Engineering Services
        </motion.h2>

        {/* Service Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Customer Relationship Improvement</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">70%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Administrative Backlog Reduction</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">1M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Daily Data Points Processed</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="relative mb-6 overflow-hidden rounded-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 group-hover:from-purple-100 group-hover:to-pink-200 dark:group-hover:from-purple-900/50 dark:group-hover:to-pink-900/50 transition-colors duration-300">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="services-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          {/* AI-themed patterns */}
          <circle cx="200" cy="200" r="100" stroke="url(#services-gradient)" strokeWidth="2" fill="none" />
          <circle cx="800" cy="300" r="150" stroke="url(#services-gradient)" strokeWidth="2" fill="none" />
          <circle cx="500" cy="700" r="200" stroke="url(#services-gradient)" strokeWidth="2" fill="none" />
          <path d="M0,500 Q250,400 500,500 T1000,500" stroke="url(#services-gradient)" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  )
}
