"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Database, Cloud, Code2, Server, Cpu, GitBranch, Trophy } from "lucide-react"

const skills = [
  {
    icon: Brain,
    name: "LLMs & Generative AI",
    description: "GPT-4o, Claude, Gemini — fine-tuned, RAG-augmented, and deployed to production with eval frameworks and prompt optimization pipelines.",
  },
  {
    icon: Bot,
    name: "Agentic AI Systems",
    description: "Multi-agent orchestration using CrewAI and OpenAI Agents SDK. Context management, tool-calling, and long-running workflows that handle real enterprise load.",
  },
  {
    icon: Database,
    name: "AI Data Pipelines",
    description: "Apache Spark, Kafka, Airbyte, and BigQuery pipelines processing millions of records daily. Built for scale, not just for demos.",
  },
  {
    icon: Cloud,
    name: "Cloud AI Infrastructure",
    description: "Production deployments on AWS SageMaker, Azure OpenAI, and GCP Vertex AI — with CI/CD, Docker, Kubernetes, and monitoring baked in from day one.",
  },
  {
    icon: Code2,
    name: "Full-Stack AI Development",
    description: "End-to-end from model to interface. Python backends, React frontends, GraphQL APIs — everything needed to ship a working AI product, not just a model.",
  },
  {
    icon: Server,
    name: "Backend AI Systems",
    description: "FastAPI, Express.js, and GraphQL (Graphene/Apollo) backends handling high-throughput AI inference with vector database integration and caching.",
  },
  {
    icon: GitBranch,
    name: "MLOps & Model Management",
    description: "Model versioning, A/B testing, deployment pipelines, and monitoring. Cut deployment time from 4 hours to 15 minutes using Docker and Kubernetes CI/CD.",
  },
  {
    icon: Cpu,
    name: "AI Model Optimization",
    description: "Latency reduction through quantization, caching strategies, and model distillation. 70% latency reduction while maintaining 99.9% accuracy on production systems.",
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
        <h2 
          className="text-5xl font-bold mb-6 hero-heading"
          style={{ color: 'var(--color-text)' }}
        >
          AI Engineering Expertise
        </h2>
        <p 
          className="text-xl max-w-4xl mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          I don't build AI demos. I build systems that survive production. Six years of shipping 
          LLM pipelines, agentic automation workflows, and data infrastructure for clients in healthcare, fintech, 
          enterprise, and governance. The metric I care about: does it work when real users hit it?
        </p>
      </motion.div>

      {/* Key Metrics - Flat Dark Surface with Teal Numbers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12 rounded-2xl p-8 stats-banner"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold stat-number">6+</div>
            <div className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Yrs Production AI</div>
          </div>
          <div>
            <div className="text-4xl font-bold stat-number">22+</div>
            <div className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Systems Deployed</div>
          </div>
          <div>
            <div className="text-4xl font-bold stat-number">KES 2M+</div>
            <div className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Savings Generated</div>
          </div>
          <div>
            <div className="text-4xl font-bold stat-number">96.3%</div>
            <div className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Uptime Maintained</div>
          </div>
        </div>
      </motion.div>

      {/* Huawei Award Recognition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="recognition-strip mb-12"
      >
        <Trophy className="w-8 h-8 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
        <div>
          <div className="font-semibold" style={{ color: 'var(--color-text)' }}>Huawei Global Innovator Award</div>
          <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Johannesburg, South Africa · April 2022 · IoT + Neural Network pneumonia detection · 80% accuracy
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
            className="expertise-card p-6 h-full group cursor-pointer"
          >
            <div className="flex flex-col">
              <div 
                className="p-3 rounded-lg mb-4 w-fit card-icon-bg"
              >
                <skill.icon className="w-6 h-6 card-icon" />
              </div>
              <h3 
                className="text-lg font-semibold mb-2 card-title"
                style={{ color: 'var(--color-text)' }}
              >
                {skill.name}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {skill.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
