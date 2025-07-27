"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Database, Cloud, Code, Cpu, MessageSquare, GitBranch } from "lucide-react"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

const SkillIcon = ({ icon: Icon, color }) => (
  <div className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg`}>
    <Icon className={`w-6 h-6 ${color}`} />
  </div>
)

const skills = [
  {
    icon: Brain,
    name: "Generative AI & LLM Systems",
    tech: "OpenAI GPT-4/o1, Claude, LangChain, HuggingFace Transformers",
    description:
      "Custom model fine-tuning, prompt engineering, RLHF, and production LLM deployment with advanced optimization techniques.",
    color: "text-purple-500",
  },
  {
    icon: Bot,
    name: "Agentic AI Systems",
    tech: "CrewAI, OpenAI Agents SDK, n8n Workflow Automation",
    description:
      "Multi-agent orchestration, tool-calling LLMs, autonomous task execution, and sophisticated agent workflow design.",
    color: "text-blue-500",
  },
  {
    icon: MessageSquare,
    name: "Intelligent AI Systems",
    tech: "RAG Architecture, Vector Databases, Semantic Search",
    description:
      "Context-aware chatbots, Pinecone/Weaviate/Chroma integration, Model Context Protocols (MCPs), and advanced retrieval systems.",
    color: "text-green-500",
  },
  {
    icon: Database,
    name: "AI Data Pipelines",
    tech: "Apache Spark, Apache Kafka, Airbyte, BigQuery",
    description:
      "Real-time stream processing, Medallion Architecture for AI/ML, and scalable data infrastructure for model training.",
    color: "text-indigo-500",
  },
  {
    icon: Cloud,
    name: "Cloud AI Infrastructure",
    tech: "AWS SageMaker, Azure OpenAI Service, GCP Vertex AI",
    description:
      "Digital Ocean GPU Droplets, Kubernetes AI workloads, MLOps at scale, and distributed AI system deployment.",
    color: "text-yellow-500",
  },
  {
    icon: Code,
    name: "Full-Stack AI Development",
    tech: "React.js, Next.js, Python, Node.js, FastAPI, TypeScript",
    description:
      "Real-time AI interfaces, seamless frontend-AI integration, and responsive applications for AI-powered experiences.",
    color: "text-red-500",
  },
  {
    icon: GitBranch,
    name: "MLOps & Model Management",
    tech: "CI/CD for AI, Model Versioning, A/B Testing",
    description:
      "Production ML pipelines, automated model deployment, performance monitoring, and continuous learning systems.",
    color: "text-purple-500",
  },
  {
    icon: Cpu,
    name: "AI Model Optimization",
    tech: "Model Quantization, Distributed Training, GPU Optimization",
    description:
      "Performance tuning for production AI systems, cost optimization, and scalable inference architectures.",
    color: "text-orange-500",
  },
]

export default function Skills() {
  return (
    <div
      id="skills"
      className="py-20 relative overflow-hidden bg-gradient-to-b from-indigo-50 to-gray-50 dark:from-indigo-900 dark:to-gray-900"
    >
      {/* AI-themed Background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          {/* Neural network inspired patterns */}
          <circle cx="100" cy="200" r="3" fill="url(#ai-gradient)" />
          <circle cx="300" cy="150" r="3" fill="url(#ai-gradient)" />
          <circle cx="500" cy="250" r="3" fill="url(#ai-gradient)" />
          <circle cx="700" cy="180" r="3" fill="url(#ai-gradient)" />
          <circle cx="900" cy="220" r="3" fill="url(#ai-gradient)" />

          <line x1="100" y1="200" x2="300" y2="150" stroke="url(#ai-gradient)" strokeWidth="1" />
          <line x1="300" y1="150" x2="500" y2="250" stroke="url(#ai-gradient)" strokeWidth="1" />
          <line x1="500" y1="250" x2="700" y2="180" stroke="url(#ai-gradient)" strokeWidth="1" />
          <line x1="700" y1="180" x2="900" y2="220" stroke="url(#ai-gradient)" strokeWidth="1" />

          <path d="M0,400 Q250,300 500,400 T1000,400" stroke="url(#ai-gradient)" strokeWidth="2" fill="none" />
          <path d="M0,600 Q250,500 500,600 T1000,600" stroke="url(#ai-gradient)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="AI Engineering Expertise" />

        {/* Key Metrics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm opacity-90">Years AI Development</div>
            </div>
            <div>
              <div className="text-3xl font-bold">11+</div>
              <div className="text-sm opacity-90">AI Client Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold">$2M+</div>
              <div className="text-sm opacity-90">Cost Savings Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm opacity-90">AI System Uptime</div>
            </div>
          </div>
        </motion.div>

        {/* AI Specialization Categories */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {["Generative AI", "Agentic Systems", "MLOps", "AI Infrastructure", "LLM Fine-tuning", "RAG Systems"].map(
            (category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 shadow-md text-sm font-medium text-purple-700 dark:text-purple-300"
              >
                {category}
              </motion.div>
            ),
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 group h-full">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 group-hover:from-purple-100 group-hover:to-pink-200 dark:group-hover:from-purple-900/50 dark:group-hover:to-pink-900/50 transition-colors duration-300">
                    <SkillIcon icon={skill.icon} color={skill.color} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.tech}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
