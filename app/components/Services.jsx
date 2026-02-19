"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Database, Zap, GitBranch, Cpu } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: <Brain className="w-10 h-10 card-icon" />,
      title: "Custom LLM Development",
      description:
        "End-to-end LLM system development — from dataset curation and fine-tuning to RLHF implementation and production deployment with evaluation frameworks.",
    },
    {
      icon: <Bot className="w-10 h-10 card-icon" />,
      title: "Agentic AI Systems",
      description:
        "Multi-agent orchestration with CrewAI — intelligent workflow automation that handles complex, multi-step tasks without falling over under real enterprise load.",
    },
    {
      icon: <Database className="w-10 h-10 card-icon" />,
      title: "RAG System Implementation",
      description:
        "Retrieval-augmented generation with vector databases (Pinecone, FAISS) and semantic search. Production systems processing 10,000+ documents daily at 94% extraction accuracy.",
    },
    {
      icon: <Zap className="w-10 h-10 card-icon" />,
      title: "Business Process Automation",
      description:
        "AI-driven automation that eliminates manual bottlenecks. Real results: 60% reduction in manual tasks, 40% productivity increase, measurable cost savings.",
    },
    {
      icon: <GitBranch className="w-10 h-10 card-icon" />,
      title: "MLOps & AI Infrastructure",
      description:
        "CI/CD pipelines, model monitoring, A/B testing, and deployment infrastructure. Because a model that doesn't ship — or that breaks in prod — isn't a model.",
    },
    {
      icon: <Cpu className="w-10 h-10 card-icon" />,
      title: "Generative AI Applications",
      description:
        "Full-stack generative AI products — from LLM backend to user interface. Built for real users, not demos.",
    },
  ]

  return (
    <div
      id="services"
      className="py-20 transition-colors duration-300 overflow-hidden relative section-base"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            className="text-4xl font-bold mb-4 hero-heading"
            style={{ color: 'var(--color-text)' }}
          >
            AI Engineering Services
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            What I build, and what it delivers.
          </p>
        </motion.div>

        {/* Service Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { value: "85%", label: "Customer Relationship Improvement" },
              { value: "70%", label: "Administrative Backlog Reduction" },
              { value: "1M+", label: "Daily Data Points Processed" },
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-xl text-center"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <div className="text-3xl font-bold stat-number mb-2">{stat.value}</div>
                <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="expertise-card p-6 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="p-3 rounded-lg card-icon-bg mb-4 w-fit">
                {service.icon}
              </div>
              <h3 
                className="text-xl font-semibold mb-3 card-title"
                style={{ color: 'var(--color-text)' }}
              >
                {service.title}
              </h3>
              <p 
                className="leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
