"use client"

import { Briefcase, Calendar, MapPin, Globe } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

export default function Experience() {
  const experiences = [
    {
      company: "Rightsify Group LLC",
      location: "Pasadena, California",
      period: "June 2023 - Aug 2024",
      role: "Senior AI Engineer",
      responsibilities: [
        "Architected production AI music generation platform serving 3M+ daily users",
        "Led development of an AI music generation platform using LLMs and custom models, with GraphQL APIs for frontend integration",
        "Designed and implemented a React-based admin dashboard for managing AI model parameters and monitoring generation quality",
        "Built a GraphQL API layer with Apollo Server to unify access to multiple AI models and music metadata",
        "Developed Angular components with comprehensive Jasmine test coverage for the customer-facing application",
        "Orchestrated large-scale data pipelines across Azure and GCP for training and fine-tuning AI models",
        "Fine-tuned transformer models on 1M+ songs achieving industry-leading quality scores",
        "Implemented distributed training pipelines reducing model training time by 60%",
      ],
      technologies: [
        "LLMs",
        "Transformers",
        "PyTorch",
        "TensorFlow",
        "GraphQL",
        "Apollo",
        "React",
        "Angular",
        "Azure ML",
        "Databricks",
        "Snowflake",
      ],
    },
    {
      company: "Wan AI Labs",
      location: "Nairobi, Kenya",
      period: "Jun 2023 - Present",
      role: "Co-Founder & AI Solutions Architect",
      responsibilities: [
        "Built AI-powered real estate platform processing $500M+ in property data",
        "Architected an AI-powered real estate lead scoring platform with GraphQL APIs and React frontend",
        "Developed LLM-based document analysis system for extracting and structuring property data from diverse sources",
        "Implemented Express-GraphQL API layer to serve AI-generated content to multiple client applications",
        "Created React components for visualizing AI-processed data with interactive dashboards",
        "Built data pipelines using cloud-native services (AWS S3, Glue) to prepare training data for AI models",
        "Developed custom RAG system with 92% accuracy in lead qualification",
        "Implemented agentic AI workflows automating 80% of manual data processing",
      ],
      technologies: [
        "LLMs",
        "RAG",
        "Langchain",
        "Pinecone",
        "Express-GraphQL",
        "React",
        "Document AI",
        "AWS S3",
        "AWS Glue",
        "Vector Databases",
      ],
    },
    {
      company: "Zuri Health",
      location: "Nairobi, Kenya",
      period: "Jan 2023 - April 2023",
      role: "AI Engineer",
      responsibilities: [
        "Developed an AI-powered symptom analysis system with GraphQL API for the healthcare platform",
        "Built a conversational AI chatbot for patient triage and medical information using LLMs and RAG",
        "Implemented Graphene (Python) GraphQL server for unified healthcare data access",
        "Created React components for the patient portal with Apollo Client for GraphQL integration",
        "Enhanced chatbot response accuracy using retrieval-augmented generation, reducing query resolution time by 30%",
      ],
      technologies: ["LLMs", "RAG", "Graphene", "React", "Apollo Client", "Python", "Healthcare AI"],
    },
    {
      company: "Freelance",
      location: "Nairobi, Kenya",
      period: "Feb 2022 - Sep 2022",
      role: "AI & Full Stack Engineer",
      responsibilities: [
        "Developed custom AI solutions for multiple clients, including NLP, computer vision, and predictive analytics",
        "Built GraphQL APIs with Express-GraphQL for AI model serving and data access",
        "Created React applications with Apollo Client for AI-powered dashboards and visualizations",
        "Implemented .NET Core microservices with Hot Chocolate GraphQL for enterprise clients",
        "Designed AWS-based data processing pipelines for AI model training and inference",
      ],
      technologies: [
        "NLP",
        "Computer Vision",
        "Express-GraphQL",
        "React",
        "Apollo Client",
        ".NET Core",
        "Hot Chocolate",
        "AWS",
      ],
    },
    {
      company: "Google Crowdsource",
      location: "Nairobi, Kenya",
      period: "Aug 2021 - Present",
      role: "AI Facilitator/Trainer",
      responsibilities: [
        "Facilitated 10+ ML workshops for University students across Africa",
        "Trained participants on responsible AI development and ethical considerations",
        "Helped manage global community of 5000+ contributors and ML enthusiasts",
        "Contributed to making AI accessible and beneficial for everyone",
      ],
      technologies: ["Machine Learning", "Responsible AI", "Community Building", "Workshop Facilitation"],
    },
    {
      company: "Analytics Vidhya",
      location: "Gurgaon, India",
      period: "Sep 2022 - Dec 2022",
      role: "AI Content Writer",
      responsibilities: [
        "Published 3 tutorial articles on integrating LLMs with GraphQL APIs for data science applications",
        "Created content on building AI-powered applications with React and GraphQL",
        "Developed sample code for LLM fine-tuning and deployment in production environments",
        "Wrote technical guides on vector databases and semantic search implementation",
      ],
      technologies: ["LLMs", "GraphQL", "React", "Vector Databases", "Technical Writing"],
    },
    {
      company: "Teens in AI",
      location: "London, UK",
      period: "Aug 2019 - Sep 2019",
      role: "Machine Learning Mentor",
      responsibilities: [
        "Coached 5 teen girls in developing AI solutions for healthcare accessibility challenges",
        "Guided 10 students in implementing machine learning models for predictive analytics",
        "Taught fundamentals of AI ethics and responsible development practices",
        "Mentored teams in developing healthcare analytics solutions with Azure ML",
      ],
      technologies: ["Azure ML", "Predictive Analytics", "Healthcare AI", "AI Ethics"],
    },
  ]

  return (
    <div
      id="experience"
      className="py-20 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Professional Experience" />
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-blue-600/30 dark:to-purple-600/30 rounded-bl-full z-0 transition-transform duration-300 group-hover:scale-110"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  {exp.company === "Freelance" ? <Globe className="w-6 h-6 mr-2 inline text-blue-500" /> : null}
                  {exp.company}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {exp.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {exp.period}
                </p>
                <p className="text-xl font-medium mb-4 dark:text-gray-200 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  {exp.role}
                </p>
                <ul className="list-none space-y-2 mb-6">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
                        <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      </div>
                      <span className="ml-3">{resp}</span>
                    </li>
                  ))}
                </ul>

                {exp.technologies && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="exp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          {/* Philosophical flowing elements */}
          <path
            d="M0,200 C200,100 400,300 600,200 S800,100 1000,200"
            stroke="url(#exp-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,400 C200,300 400,500 600,400 S800,300 1000,400"
            stroke="url(#exp-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,600 C200,500 400,700 600,600 S800,500 1000,600"
            stroke="url(#exp-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,800 C200,700 400,900 600,800 S800,700 1000,800"
            stroke="url(#exp-gradient)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </div>
  )
}
