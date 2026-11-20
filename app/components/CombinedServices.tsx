"use client"

import { motion } from "framer-motion"
import { BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react"

const experiences = [
  {
    company: "Kujia · Kujia Digitize", location: "Nairobi, Kenya", period: "Apr 2026 – Sep 2026", role: "Head of Kujia Digital Programs",
    highlights: [
      "Designed and built the organization’s web platform, internship placement portal, data layer, hosting and release workflows, enabling a six-person team to operate five digital products without outside engineering support.",
      "Reduced annual hosting and tooling costs by 35%; set delivery, code-review and release standards across a 12-deliverable roadmap.",
      "Led a cross-border technical partnership with WeShareApps and delivered three API integrations; shipped semantic job matching that increased successful intern matches by 28%.",
    ], technologies: ["TypeScript", "React", "Node.js", "REST APIs", "AWS Lambda", "PostgreSQL", "CI/CD"],
  },
  {
    company: "iMerit Technology", location: "Remote · US", period: "Nov 2025 – Mar 2026", role: "RL Environment & LLM Evaluation Engineer · Contract",
    highlights: [
      "Created 150+ test cases and multi-step reasoning tasks for GPT-4, Claude and Gemini; documented failure modes and reward-hacking vectors.",
      "Built automated Python and SQL scoring services with verified ground truth, reaching 98% agreement with expert-reviewed answers.",
      "Packaged reproducible datasets and evaluation workflows in Docker and AWS/GCP CI/CD; improved first-pass annotation acceptance by 25%.",
    ], technologies: ["Python", "NumPy", "Pandas", "SQL", "Docker", "AWS", "GCP", "CI/CD"],
  },
  {
    company: "Wan AI Labs", location: "Nairobi, Kenya", period: "Oct 2024 – Sep 2025", role: "Lead AI Engineer · Agentic Systems & LLM Deployment",
    highlights: [
      "Led an eight-engineer AI team building 20+ production agentic systems across healthcare, legal and enterprise operations using LangChain, CrewAI and leading LLMs.",
      "Automated complex workflows, contributing to 40% productivity gains, 60% less manual operations and an estimated $150K in annual client savings.",
      "Owned GraphQL and Kafka integrations and production lifecycle; structured human-feedback releases raised accuracy by 18% while systems sustained 99.5% uptime.",
    ], technologies: ["Python", "LangChain", "CrewAI", "GraphQL", "Kafka", "LLMs", "RLHF"],
  },
  {
    company: "Rightsify Group LLC", location: "Pasadena, California · Remote", period: "Jun 2023 – Aug 2024", role: "AI Engineer · Audio Generative LLMs",
    highlights: [
      "Built custom transformer models for music generation with a five-engineer team, serving thousands of daily users from preprocessing through evaluation.",
      "Designed distributed PyTorch training on AWS over 1M+ audio samples, cutting training time by 60% and compute spend by 30%; feedback-driven training improved model performance by 20%.",
      "Introduced Docker and Kubernetes CI/CD for model deployment, reducing release time from four hours to 15 minutes; migrated 10TB+ of data from S3 to GCP.",
    ], technologies: ["Python", "PyTorch", "Hugging Face", "AWS", "Docker", "Kubernetes", "GCP"],
  },
  {
    company: "Zuri Health", location: "Nairobi, Kenya", period: "Jan 2023 – Apr 2023", role: "Software Developer",
    highlights: [
      "Built a conversational NLP and RAG triage system serving 5,000+ users at 92% diagnostic accuracy, reducing query resolution time by 30% and human escalations by 35%.",
      "Improved medical-information retrieval relevance by 40% and developed analytics over interaction data from four countries to guide product changes.",
    ], technologies: ["Python", "NLP", "RAG", "Semantic search", "REST APIs", "Analytics"],
  },
  {
    company: "Upwork", location: "Nairobi, Kenya", period: "Feb 2021 – Sep 2022", role: "Machine Learning Engineer · Freelance",
    highlights: [
      "Delivered 33+ client software solutions using AWS and Azure ML, including semantic search, NLP and production GraphQL APIs with React applications.",
      "Built distributed Apache Spark pipelines that improved data-ingestion speed by 65% and Tableau reports that saved clients 10+ hours each week.",
    ], technologies: ["Python", "AWS", "Azure ML", "GraphQL", "Express", "React", "Apache Spark"],
  },
  {
    company: "Analytics Vidhya", location: "Gurgaon, India · Seasonal", period: "Sep 2022 – Dec 2022", role: "Technical Writer · Data",
    highlights: [
      "Published three data-science tutorials on ETL workflows across OLAP and OLTP systems.",
      "Implemented Flask backends integrating APIs for locally and cloud-hosted PostgreSQL databases, reducing query latency by 30%.",
    ], technologies: ["Python", "Flask", "PostgreSQL", "ETL", "REST APIs"],
  },
  {
    company: "Google Crowdsource", location: "Nairobi, Kenya", period: "Aug 2021 – Present · Part-time", role: "AI Facilitator & Trainer",
    highlights: [
      "Facilitated 11+ hands-on workshops in LLM fine-tuning, NLP and cloud deployment for 33+ university students across Africa.",
      "Support a 5,000+ contributor community; workshop participants achieved 45% higher post-workshop deployment assessment scores.",
    ], technologies: ["AWS SageMaker", "GCP Vertex AI", "LLM fine-tuning", "NLP", "Training"],
  },
  {
    company: "TEENS IN AI", location: "London, UK", period: "Aug 2019 – Sep 2019", role: "Machine Learning Trainer",
    highlights: [
      "Coached students in descriptive and predictive analytics with Azure Machine Learning, including a five-country analysis of access to affordable healthcare.",
    ], technologies: ["Azure Machine Learning", "Predictive analytics", "Healthcare data"],
  },
]

export default function CombinedServices() {
  return (
    <section className="container mx-auto max-w-5xl px-6 py-12 sm:px-10" aria-labelledby="experience-title">
      <div className="mb-9">
        <p className="section-label mb-3">Where I’ve made an impact</p>
        <h2 id="experience-title" className="hero-heading text-4xl font-bold text-foreground sm:text-5xl">Experience in production.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">A software engineering career built around shipping, evaluating and operating AI-enabled systems with teams across Africa and globally.</p>
      </div>
      <div className="relative flex flex-col gap-4 before:absolute before:bottom-5 before:left-[17px] before:top-5 before:w-px before:bg-border sm:gap-5">
        {experiences.map((experience, index) => (
          <motion.article key={experience.company} className="expertise-card relative ml-8 rounded-xl p-5 sm:ml-10 sm:p-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.2) }}>
            <span className="absolute -left-[39px] top-7 size-3 rounded-full border-2 border-background bg-primary sm:-left-[47px]" aria-hidden="true" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div><p className="text-lg font-semibold text-foreground">{experience.company}</p><h3 className="mt-1 text-base font-medium text-primary">{experience.role}</h3></div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground sm:justify-end"><span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" aria-hidden="true" />{experience.period}</span><span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden="true" />{experience.location}</span></div>
            </div>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm leading-6 text-muted-foreground">{experience.highlights.map((highlight) => <li key={highlight} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />{highlight}</li>)}</ul>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Technologies used at ${experience.company}`}>{experience.technologies.map((technology) => <li key={technology} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{technology}</li>)}</ul>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
