"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Database, Cloud, Code2, ShieldCheck, Workflow, FlaskConical, Trophy } from "lucide-react"

const skills = [
  { icon: Bot, name: "Agentic AI & LLMs", description: "Tool-using agents, workflow design and retrieval-grounded generation with LangChain, CrewAI, Pinecone and FAISS." },
  { icon: ShieldCheck, name: "Evaluation & safety", description: "Evaluation datasets, LLM-as-judge scoring, ground-truth verification, adversarial tests and failure-mode analysis." },
  { icon: Brain, name: "Model engineering", description: "PyTorch, Hugging Face Transformers, TensorFlow, SFT/RLHF, distributed training and inference optimization." },
  { icon: Cloud, name: "MLOps & infrastructure", description: "Reproducible Docker environments, Kubernetes, GitHub Actions and Jenkins, AWS SageMaker/Lambda/S3, and GCP Vertex AI." },
  { icon: Code2, name: "Backend & product engineering", description: "Python, TypeScript, Node.js, FastAPI, Flask, React, Next.js, REST and GraphQL APIs." },
  { icon: Database, name: "Data systems", description: "PostgreSQL, MySQL, MongoDB, Redis, Apache Spark, Kafka, Airbyte and BigQuery data pipelines." },
  { icon: Workflow, name: "Reliable software delivery", description: "Jest and Pytest, unit and integration testing, CI/CD, code review, Agile delivery and production monitoring." },
  { icon: FlaskConical, name: "Applied research", description: "Implementing ML papers, engineering STEM evaluation tasks and translating experiments into maintainable software." },
]

export default function CombinedExpertise() {
  return (
    <section className="container mx-auto max-w-7xl px-6 py-14 sm:px-10" aria-labelledby="expertise-title">
      <motion.div className="mb-10 max-w-3xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <p className="section-label mb-3">How I work</p>
        <h2 id="expertise-title" className="hero-heading mb-4 text-4xl font-bold text-foreground sm:text-5xl">AI engineering, end to end.</h2>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          I work across the full path from model behavior to dependable software: designing APIs, grounding model responses, evaluating risk, and operating systems in production.
        </p>
      </motion.div>

      <motion.div className="stats-banner mb-10 grid grid-cols-2 gap-5 rounded-2xl p-6 sm:grid-cols-4 sm:p-8" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
        {[
          { value: "6+", label: "Years building software" },
          { value: "20+", label: "AI systems shipped" },
          { value: "8", label: "Engineers led" },
          { value: "150+", label: "Practitioners mentored" },
        ].map((stat) => <div key={stat.label}><p className="stat-number text-3xl font-bold sm:text-4xl">{stat.value}</p><p className="mt-1 text-sm text-muted-foreground">{stat.label}</p></div>)}
      </motion.div>

      <motion.div className="recognition-strip mb-10" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
        <Trophy className="size-7 shrink-0 text-primary" aria-hidden="true" />
        <div><p className="font-semibold text-foreground">Huawei Global Innovator Award</p><p className="text-sm text-muted-foreground">Infant pneumonia risk detection from IoT sensor data · Johannesburg · 2022</p></div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, index) => {
          const Icon = skill.icon
          return (
            <motion.article key={skill.name} className="expertise-card h-full rounded-xl p-5" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.035 }}>
              <div className="card-icon-bg mb-4 inline-flex rounded-lg p-3"><Icon className="card-icon size-5" aria-hidden="true" /></div>
              <h3 className="card-title mb-2 text-base text-foreground">{skill.name}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{skill.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
