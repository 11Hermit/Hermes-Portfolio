"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Database, Cloud, Code2, Server, Cpu, GitBranch } from "lucide-react"

const skills = [
  {
    icon: Brain,
    name: "Generative AI & LLM Systems",
    tech: "OpenAI GPT-4/o1, Claude, LangChain, HuggingFace",
    color: "text-purple-500",
  },
  {
    icon: Bot,
    name: "Agentic AI Systems",
    tech: "CrewAI, OpenAI Agents SDK, n8n Workflow",
    color: "text-blue-500",
  },
  {
    icon: Database,
    name: "AI Data Pipelines",
    tech: "Apache Spark, Kafka, Airbyte, BigQuery",
    color: "text-green-500",
  },
  {
    icon: Cloud,
    name: "Cloud AI Infrastructure",
    tech: "AWS SageMaker, Azure OpenAI, GCP Vertex AI",
    color: "text-yellow-500",
  },
  {
    icon: Code2,
    name: "Full-Stack AI Development",
    tech: "React.js, Next.js, Python, FastAPI",
    color: "text-red-500",
  },
  {
    icon: Server,
    name: "Backend AI Systems",
    tech: "Node.js, .NET Core, GraphQL APIs",
    color: "text-indigo-500",
  },
  {
    icon: GitBranch,
    name: "MLOps & Model Management",
    tech: "CI/CD for AI, Model Versioning, A/B Testing",
    color: "text-purple-500",
  },
  {
    icon: Cpu,
    name: "AI Model Optimization",
    tech: "Model Quantization, GPU Optimization",
    color: "text-orange-500",
  },
]

export default function CombinedExpertise() {
  return (
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-bold mb-6 philosophical-text">AI Engineering Expertise</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Senior AI Software Engineer with 5+ years of hands-on experience architecting and deploying production AI
          systems that drive measurable business outcomes. I specialize in building sophisticated AI agents and custom
          LLM solutions with a track record of reducing operational costs by 60-70% while improving customer
          satisfaction scores by 85%.
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold">5+</div>
            <div className="text-sm opacity-90">Years AI Development</div>
          </div>
          <div>
            <div className="text-4xl font-bold">11+</div>
            <div className="text-sm opacity-90">AI Client Projects</div>
          </div>
          <div>
            <div className="text-4xl font-bold">$2M+</div>
            <div className="text-sm opacity-90">Cost Savings Generated</div>
          </div>
          <div>
            <div className="text-4xl font-bold">99.9%</div>
            <div className="text-sm opacity-90">AI System Uptime</div>
          </div>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 group h-full"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-4">
                <skill.icon className={`w-8 h-8 ${skill.color}`} />
              </div>
              <h3 className="text-lg font-semibold dark:text-white mb-2">{skill.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{skill.tech}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
