"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Zap, Cpu } from "lucide-react"

export default function TechnicalApproach() {
  const approaches = [
    {
      icon: <Brain className="w-12 h-12 text-purple-500" />,
      title: "AI-First Architecture Design",
      description:
        "I architect AI applications with a microservices approach, separating model inference, data processing, and business logic. My designs prioritize model versioning, A/B testing capabilities, and seamless scaling of AI workloads across distributed systems.",
    },
    {
      icon: <Zap className="w-12 h-12 text-pink-500" />,
      title: "LLM Integration & Fine-tuning Strategy",
      description:
        "I implement sophisticated LLM pipelines with custom fine-tuning workflows, prompt optimization systems, and retrieval-augmented generation. My approach includes robust evaluation frameworks and continuous learning systems that adapt to user feedback.",
    },
    {
      icon: <Bot className="w-12 h-12 text-blue-500" />,
      title: "Agentic AI System Design",
      description:
        "I design multi-agent systems using CrewAI and custom orchestration frameworks, enabling autonomous task execution with human-in-the-loop validation. My agent architectures include sophisticated tool-calling capabilities and context management across long-running workflows.",
    },
    {
      icon: <Cpu className="w-12 h-12 text-indigo-500" />,
      title: "Production AI Optimization",
      description:
        "I optimize AI systems for production environments with advanced caching strategies, model quantization, and distributed inference. My optimization techniques reduce latency by 70% while maintaining 99.9% accuracy across high-traffic applications.",
    },
  ]

  return (
    <div
      id="approach"
      className="py-20 bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          AI Engineering Philosophy
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start">
                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mr-6">
                  {approach.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 dark:text-white">{approach.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{approach.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center dark:text-white">
            Case Study: Enterprise AI Agent Platform
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-medium mb-4 text-purple-600 dark:text-purple-400">Challenge</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Design and deploy an autonomous AI agent system capable of processing complex business workflows across
                multiple departments, with real-time decision making and human oversight capabilities.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-medium mb-4 text-purple-600 dark:text-purple-400">AI Solution</h4>
              <ul className="space-y-2">
                {[
                  "Implemented CrewAI multi-agent orchestration with specialized AI agents for different business functions",
                  "Fine-tuned GPT-4 models for domain-specific tasks with 95% accuracy",
                  "Built RAG system with vector database for contextual decision making",
                  "Deployed MLOps pipeline with automated model retraining and A/B testing",
                  "Created real-time monitoring dashboard for agent performance and business metrics",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mt-1 flex-shrink-0">
                      <span className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-medium mb-4 text-purple-600 dark:text-purple-400">Business Impact</h4>
              <ul className="space-y-4">
                {[
                  { metric: "85%", description: "Reduction in manual processing time" },
                  { metric: "92%", description: "Accuracy in automated decision making" },
                  { metric: "$1.2M", description: "Annual cost savings achieved" },
                  { metric: "99.9%", description: "System uptime across distributed infrastructure" },
                ].map((result, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-xl font-bold text-purple-600 dark:text-purple-400">{result.metric}</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{result.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="approach-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          {/* AI-themed neural network patterns */}
          <circle cx="200" cy="200" r="4" fill="url(#approach-gradient)" />
          <circle cx="400" cy="150" r="4" fill="url(#approach-gradient)" />
          <circle cx="600" cy="250" r="4" fill="url(#approach-gradient)" />
          <circle cx="800" cy="180" r="4" fill="url(#approach-gradient)" />

          <line x1="200" y1="200" x2="400" y2="150" stroke="url(#approach-gradient)" strokeWidth="2" />
          <line x1="400" y1="150" x2="600" y2="250" stroke="url(#approach-gradient)" strokeWidth="2" />
          <line x1="600" y1="250" x2="800" y2="180" stroke="url(#approach-gradient)" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}
