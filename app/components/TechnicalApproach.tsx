"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Zap, Cpu } from "lucide-react"

export default function TechnicalApproach() {
  const approaches = [
    {
      icon: <Brain className="w-10 h-10 card-icon" />,
      title: "AI-First Architecture Design",
      description:
        "I design AI applications as microservices from the start — model versioning, A/B testing, and distributed scaling built into the architecture, not bolted on after the fact.",
    },
    {
      icon: <Bot className="w-10 h-10 card-icon" />,
      title: "Agentic AI System Design",
      description:
        "Multi-agent systems using CrewAI with tool-calling, context management, and failure recovery baked in. Designed for long-running enterprise workflows, not toy demos.",
    },
    {
      icon: <Zap className="w-10 h-10 card-icon" />,
      title: "LLM Integration Strategy",
      description:
        "Custom fine-tuning workflows, systematic prompt optimization, and RAG pipelines. I treat LLM integration as an engineering problem, not a magic trick.",
    },
    {
      icon: <Cpu className="w-10 h-10 card-icon" />,
      title: "Production AI Optimization",
      description:
        "Advanced caching, model quantization, and inference optimization. 70% latency reduction on production systems while maintaining accuracy — because 'fast enough' is an engineering spec.",
    },
  ]

  return (
    <div
      id="approach"
      className="py-20 transition-colors duration-300 overflow-hidden relative section-base"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-6 text-center hero-heading"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          AI Engineering Philosophy
        </motion.h2>

        <motion.p
          className="text-xl text-center max-w-4xl mx-auto mb-12"
          style={{ color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I think about AI the way an engineer thinks about infrastructure: reliability first, 
          then scale. Every system I build is designed to be maintained, measured, and improved — 
          not admired and abandoned.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              className="philosophy-card p-8 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg card-icon-bg mr-6">
                  {approach.icon}
                </div>
                <div>
                  <h3 
                    className="text-xl font-semibold mb-3 card-title"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {approach.title}
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {approach.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 rounded-xl shadow-lg border philosophy-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 
            className="text-2xl font-semibold mb-6 text-center"
            style={{ color: 'var(--color-text)' }}
          >
            Case Study: Enterprise AI Agent Platform
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h4 
                className="text-xl font-medium mb-4"
                style={{ color: 'var(--color-accent)' }}
              >
                Challenge
              </h4>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Design and deploy an autonomous AI agent system capable of processing complex business workflows across
                multiple departments, with real-time decision making and human oversight capabilities.
              </p>
            </div>

            <div>
              <h4 
                className="text-xl font-medium mb-4"
                style={{ color: 'var(--color-accent)' }}
              >
                AI Solution
              </h4>
              <ul className="space-y-2">
                {[
                  "Implemented CrewAI multi-agent orchestration with specialized AI agents for different business functions",
                  "Fine-tuned GPT-4 models for domain-specific tasks with 95% accuracy",
                  "Built RAG system with vector database for contextual decision making",
                  "Deployed MLOps pipeline with automated model retraining and A/B testing",
                  "Created real-time monitoring dashboard for agent performance and business metrics",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div 
                      className="h-5 w-5 rounded-full flex items-center justify-center mt-1 flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-accent-dim)' }}
                    >
                      <span 
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      ></span>
                    </div>
                    <span className="ml-3" style={{ color: 'var(--color-text-muted)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 
                className="text-xl font-medium mb-4"
                style={{ color: 'var(--color-accent)' }}
              >
                Business Impact
              </h4>
              <ul className="space-y-4">
                {[
                  { metric: "85%", description: "Reduction in manual processing time" },
                  { metric: "92%", description: "Accuracy in automated decision making" },
                  { metric: "$1.2M", description: "Annual cost savings achieved" },
                  { metric: "99.9%", description: "System uptime across distributed infrastructure" },
                ].map((result, idx) => (
                  <li key={idx} className="flex items-center">
                    <div 
                      className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
                      style={{ backgroundColor: 'var(--color-accent-dim)' }}
                    >
                      <span 
                        className="text-lg font-bold stat-number"
                      >
                        {result.metric}
                      </span>
                    </div>
                    <span style={{ color: 'var(--color-text-muted)' }}>{result.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
