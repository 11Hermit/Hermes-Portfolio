"use client"

import { motion } from "framer-motion"
import { Brain, Bot, Database, Zap, GitBranch, Cpu, Briefcase, Calendar, MapPin } from "lucide-react"

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
    company: "Rightsify Group LLC",
    location: "Pasadena, California",
    period: "June 2023 - Aug 2024",
    role: "Senior AI Engineer",
    highlights: [
      "Architected AI music platform serving 3M+ daily users",
      "Fine-tuned transformer models on 1M+ songs",
      "Reduced model training time by 60%",
      "Built GraphQL APIs with React/Angular frontends",
      "Implemented distributed training pipelines",
      "Designed scalable inference architecture",
    ],
  },
  {
    company: "Wan AI Labs",
    location: "Nairobi, Kenya",
    period: "Jun 2023 - Present",
    role: "Co-Founder & AI Solutions Architect",
    highlights: [
      "Built AI platform processing $500M+ in property data",
      "Developed custom RAG system with 92% accuracy",
      "Automated 80% of manual data processing",
      "Created Express-GraphQL APIs with React dashboards",
      "Implemented agentic AI workflows",
      "Designed cloud-native data pipelines",
    ],
  },
  {
    company: "Zuri Health",
    location: "Nairobi, Kenya",
    period: "Jan 2023 - April 2023",
    role: "AI Engineer",
    highlights: [
      "Developed AI-powered symptom analysis system",
      "Built conversational AI chatbot for patient triage",
      "Implemented Graphene GraphQL server",
      "Created React components with Apollo Client",
      "Enhanced chatbot accuracy using RAG",
      "Reduced query resolution time by 30%",
    ],
  },
  {
    company: "Google Crowdsource",
    location: "Nairobi, Kenya",
    period: "Aug 2021 - Present",
    role: "AI Facilitator/Trainer",
    highlights: [
      "Facilitated 10+ ML workshops across Africa",
      "Managed community of 5000+ contributors",
      "Trained on responsible AI development",
      "Promoted AI accessibility and ethics",
      "Contributed to global AI initiatives",
      "Built educational AI content",
    ],
  },
  {
    company: "Analytics Vidhya",
    location: "Gurgaon, India",
    period: "Sep 2022 - Dec 2022",
    role: "AI Content Writer",
    highlights: [
      "Published 3 tutorial articles on LLMs with GraphQL",
      "Created content on AI-powered applications",
      "Developed sample code for LLM fine-tuning",
      "Wrote guides on vector databases",
      "Contributed to AI education community",
      "Simplified complex AI concepts",
    ],
  },
  {
    company: "Freelance",
    location: "Nairobi, Kenya",
    period: "Feb 2022 - Sep 2022",
    role: "AI & Full Stack Engineer",
    highlights: [
      "Developed custom AI solutions for multiple clients",
      "Built GraphQL APIs with Express-GraphQL",
      "Created React applications with Apollo Client",
      "Implemented .NET Core microservices",
      "Designed AWS-based data processing pipelines",
      "Delivered NLP and computer vision projects",
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

        {/* Service Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Customer Relationship Improvement</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">70%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Administrative Backlog Reduction</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">1M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Daily Data Points Processed</div>
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
            Leading AI initiatives at innovative companies worldwide
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
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h4 className="text-2xl font-bold philosophical-text mb-2">{exp.company}</h4>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    {exp.role}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 dark:text-gray-400">
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {exp.location}
                    </p>
                    <p className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.period}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mt-1">
                      <span className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">{highlight}</span>
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
