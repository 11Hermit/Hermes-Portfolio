"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Database, Zap, GitBranch, Cpu, Briefcase, Calendar, MapPin, Building2, Code, Users, BookOpen, Sparkles, Globe } from "lucide-react"

const services = [
  {
    icon: <Brain className="w-10 h-10 text-purple-500" />,
    title: "Custom LLM Development",
    description: "End-to-end development of custom language models with fine-tuning and RLHF implementation.",
  },
  {
    icon: <Bot className="w-10 h-10 text-blue-500" />,
    title: "Agentic AI Systems",
    description: "Multi-agent systems using CrewAI with intelligent workflow orchestration.",
  },
  {
    icon: <Database className="w-10 h-10 text-green-500" />,
    title: "RAG System Implementation",
    description: "Advanced retrieval-augmented generation with vector databases and semantic search.",
  },
  {
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    title: "Business Process Automation",
    description: "AI-driven processes reducing operational costs by 60-70% while improving accuracy.",
  },
  {
    icon: <GitBranch className="w-10 h-10 text-indigo-500" />,
    title: "MLOps & AI Infrastructure",
    description: "Production-ready ML pipelines with automated deployment and monitoring.",
  },
  {
    icon: <Cpu className="w-10 h-10 text-pink-500" />,
    title: "Generative AI Applications",
    description: "Full-stack AI-powered applications with scalable backend infrastructure.",
  },
]

const experiences = [
  {
    company: "iMerit Technology",
    location: "Remote (US)",
    period: "Nov 2025 - March 2026",
    role: "RL Environment & LLM Evaluation Engineer (Contract)",
    icon: <Brain className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    highlights: [
      "Design and build high-precision RL environments and annotation workflows for GenAI training",
      "Engineer original, computationally intensive STEM problems simulating real-world scientific workflows",
      "Develop non-trivial reasoning chains and evaluation cases to test GPT-4, Claude, and Gemini",
      "Configure automated scoring criteria and verify ground-truth solutions using Python and SQL",
      "Deploy and manage reproducible Docker environments and CI/CD pipelines on AWS/GCP",
      "Serve as link between expert annotators and AI systems to create high-quality RL training data",
    ],
  },
  {
    company: "Wan AI Labs",
    location: "Nairobi, Kenya",
    period: "Oct 2024 - Sept 2025",
    role: "Lead AI Engineer (Agentic Systems & LLM Deployment)",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-teal-500 to-cyan-500",
    highlights: [
      "Led AI division building production-grade agentic systems using LLMs (GPT-4, Claude, Gemini)",
      "Designed and deployed 20+ AI systems using LangChain and CrewAI across healthcare, legal, and enterprise",
      "Automated complex workflows, resulting in 40% productivity gains and 60% reduction in manual operations",
      "Oversaw integration with enterprise systems via GraphQL APIs and Kafka pipelines",
      "Managed full lifecycle from model selection through production deployment and monitoring",
      "Facilitated iterative model improvement cycles with structured human feedback for RLHF pipeline design",
    ],
  },
  {
    company: "Rightsify Group LLC",
    location: "Pasadena, California (Remote)",
    period: "Jun 2023 - Aug 2024",
    role: "AI Engineer (Audio Generative LLMs)",
    icon: <Globe className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-500",
    highlights: [
      "Architected and trained custom transformer LLMs from scratch for music generation serving thousands of daily users",
      "Built full training pipelines including data preprocessing, model architecture design, and evaluation",
      "Used reinforcement learning during model training with feedback loops and rewards, achieving 20% improvement",
      "Designed distributed training pipelines on AWS with PyTorch and HuggingFace, reducing training time by 60%",
      "Created tools to continuously check and analyze model performance, similar to RL feedback mechanisms",
      "Implemented CI/CD for ML model deployment with Docker and Kubernetes, reducing deployment time from 4 hours to 15 minutes",
    ],
  },
  {
    company: "ZURI HEALTH",
    location: "Nairobi, Kenya",
    period: "Jan 2023 - April 2023",
    role: "Software Developer",
    icon: <Bot className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    highlights: [
      "Collaborated with platform engineers to design analytics pipelines extracting actionable insights from multi-country user data",
      "Built conversational AI triage system using NLP and RAG architecture, serving 5,000+ users with 92% diagnostic accuracy",
      "Reduced query resolution time by 30% through intelligent AI-powered system",
      "Created semantic search through medical information that improved answer relevance by 40%",
    ],
  },
  {
    company: "Google Crowdsource",
    location: "Nairobi, Kenya",
    period: "Aug 2021 - Present",
    role: "AI Facilitator/Trainer - Part-time",
    icon: <Users className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    highlights: [
      "Trained participants on AWS SageMaker and GCP Vertex AI for deploying production ML models",
      "Facilitated 11+ hands-on ML workshops covering LLM fine-tuning, NLP, and cloud ML deployment",
      "Trained 33+ university students across Africa on ML technologies and cloud platforms",
      "Managed community of 5,000+ AI contributors coordinating open-source initiatives",
    ],
  },
  {
    company: "Upwork",
    location: "Nairobi, Kenya",
    period: "Feb 2021 - Sep 2022",
    role: "Machine Learning Engineer - Freelance",
    icon: <Code className="w-6 h-6" />,
    color: "from-red-500 to-pink-500",
    highlights: [
      "Delivered 33+ custom AI solutions leveraging AWS and Azure ML services",
      "Implemented semantic search and NLP systems for diverse client needs",
      "Built production-ready GraphQL APIs with Express and React frontends",
      "Integrated LLM capabilities for intelligent data processing across multiple projects",
      "Developed distributed data processing pipelines using Apache Spark improving data ingestion speed by 65%",
      "Created automated reporting systems in Tableau that saved clients 10+ hours weekly",
    ],
  },
  {
    company: "ANALYTICS VIDHYA",
    location: "Gurgaon, India",
    period: "Sep 2022 - Dec 2022",
    role: "Technical Writer – Data (Seasonal)",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-amber-500 to-yellow-500",
    highlights: [
      "Wrote and published 3 tutorial articles for monthly data science blogathon",
      "Created content on ETL pipelines for over 2000 rows of data extracted from OLAP and OLTP databases",
      "Implemented application backends using Flask to integrate database APIs",
      "Enabled interaction with remote Postgres database servers hosted locally and on cloud",
      "Attracted over 50 readers and users to the platform through educational content",
    ],
  },
  {
    company: "TEENS IN AI",
    location: "London, UK",
    period: "Aug 2019 - Sep 2019",
    role: "Machine Learning Trainer",
    icon: <Zap className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-500",
    highlights: [
      "Coached 5 teen girls out of 10 teams in Descriptive and Predictive Analytics using Azure Machine Learning",
      "Guided approximately 10 students on using Azure ML to analyze access to affordable healthcare",
      "Analyzed healthcare access by low-income households in 5 countries across Sub-Saharan Africa",
    ],
  },
]

export default function CombinedServices() {
  return (
    <div className="container mx-auto px-6 relative z-10 space-y-20">
      {/* Services Section */}
      <div>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold mb-6 philosophical-text">AI Engineering Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive AI solutions that transform your business operations with measurable results
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">KES 2M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Cost Savings Through Automation</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">20+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Production AI Systems Deployed</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">3M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Daily Users Across Platforms</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="mb-4 p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 inline-block">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professional Experience Section */}
      <div>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl font-bold mb-4 philosophical-text">Professional Experience</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            6+ years architecting production-grade AI systems, full-stack applications, and data infrastructure that drive measurable business impact
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-transparent hover:border-purple-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="flex items-center mb-4 lg:mb-0">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${exp.color} mr-4 text-white`}>
                    {exp.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold philosophical-text mb-1">{exp.company}</h4>
                    <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                      {exp.role}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 dark:text-gray-400">
                  <p className="flex items-center mb-2 sm:mb-0">
                    <MapPin className="w-4 h-4 mr-2" />
                    {exp.location}
                  </p>
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {exp.period}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center mt-1 mr-3`}>
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
