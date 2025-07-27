"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Zap, Cpu, ExternalLink, Sparkles } from "lucide-react"
import Image from "next/image"

const approaches = [
  {
    icon: <Brain className="w-10 h-10 text-purple-500" />,
    title: "AI-First Architecture Design",
    description:
      "I architect AI applications with microservices approach, prioritizing model versioning, A/B testing capabilities, and seamless scaling across distributed systems.",
  },
  {
    icon: <Bot className="w-10 h-10 text-blue-500" />,
    title: "Agentic AI System Design",
    description:
      "I design multi-agent systems using CrewAI with sophisticated tool-calling capabilities and context management across long-running workflows.",
  },
  {
    icon: <Zap className="w-10 h-10 text-pink-500" />,
    title: "LLM Integration Strategy",
    description:
      "I implement sophisticated LLM pipelines with custom fine-tuning workflows, prompt optimization, and retrieval-augmented generation systems.",
  },
  {
    icon: <Cpu className="w-10 h-10 text-indigo-500" />,
    title: "Production AI Optimization",
    description:
      "I optimize AI systems with advanced caching strategies, model quantization, reducing latency by 70% while maintaining 99.9% accuracy.",
  },
]

const clients = [
  {
    name: "Rightsify Hydra",
    description:
      "AI music generation platform for commercial applications, providing copyright-cleared instrumental music.",
    logo: "/images/rightsify-hydra-logo.png",
    website: "https://rightsify.com/hydra/",
    highlights: [
      "AI-Powered Music Generation",
      "Commercial Use Licensed",
      "Global Reach - 180+ Countries",
      "3M+ Daily Users",
    ],
    color: "from-purple-600 to-pink-600",
  },
  {
    name: "ClassifyMe",
    description:
      "AI platform helping students discover perfect course matches tailored to their passions and strengths.",
    logo: "/images/classifyme-logo.png",
    website: "https://classifyme.co.ke",
    highlights: [
      "Personalized Recommendations",
      "AI-Powered Matching",
      "Comprehensive Analysis",
      "Student-Centered Design",
    ],
    color: "from-blue-600 to-indigo-600",
  },
  {
    name: "MarketReady.ai",
    description:
      "Comprehensive AI-powered SaaS platform for real estate professionals with dynamic tool loading, multi-tenant architecture, and subscription management.",
    logo: "/placeholder.svg?height=32&width=32",
    website: "https://marketreadyai.vercel.app",
    highlights: [
      "Multi-Tenant SaaS Architecture",
      "Dynamic AI Tool Loading",
      "Real Estate Workflow Automation",
      "Subscription & Billing Integration",
    ],
    color: "from-green-600 to-teal-600",
  },
  {
    name: "Davis & Shirtliff - Waba AI",
    description:
      "AI-driven reverse osmosis design and proposal generation platform that automates water treatment laboratory report analysis, system sizing, and technical proposal creation for engineering teams.",
    logo: "/placeholder.svg?height=32&width=32",
    website: "https://www.youtube.com/watch?v=fti0qnG6p7A",
    highlights: [
      "Automated Lab Report Analysis",
      "Multi-Agent AI System Design",
      "50,000+ Proposals Generated",
      "4.9/5 Engineer Rating",
    ],
    color: "from-cyan-600 to-blue-600",
  },
]

export default function CombinedPhilosophy() {
  return (
    <div className="container mx-auto px-6 relative z-10">
      {/* Philosophy Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-bold mb-6 philosophical-text">AI Engineering Philosophy</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          My approach to AI engineering combines cutting-edge technology with practical business solutions, ensuring
          every system I build delivers measurable value and scales efficiently.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {approaches.map((approach, index) => (
          <motion.div
            key={index}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
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
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{approach.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{approach.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Previous Clients Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-4xl font-bold mb-4 philosophical-text">Previous Clients</h3>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Trusted by innovative companies to deliver AI solutions that transform their business operations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {clients.map((client, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
          >
            <div className={`bg-gradient-to-r ${client.color} p-6 text-white`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <Image
                    src={client.logo || "/placeholder.svg"}
                    alt={`${client.name} logo`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h4 className="text-2xl font-bold">{client.name}</h4>
              </div>
              <p className="text-white/90 mb-4">{client.description}</p>
              <div className="grid grid-cols-2 gap-2">
                {client.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <motion.a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
