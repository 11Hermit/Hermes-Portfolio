"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code, ArrowRight, Shield, Bell, MessageSquare } from "lucide-react"
import Image from "next/image"
import AnimatedSectionHeader from "./AnimatedSectionHeader"
import { useState } from "react"

export default function Projects() {
  const [imageLoaded, setImageLoaded] = useState({})

  const projects = [
    {
      title: "TenderAI",
      description:
        "AI-powered platform that automates tender analysis, scoring, and recommendation to streamline bid preparation and improve success rates for consulting companies.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-07-27%2019-31-22-vjN6s5MwLpXPuYfWeBIIZzxcuyfypg.png",
      url: "https://tenderai-rosy.vercel.app/",
      features: [
        "Automated tender discovery across 50+ platforms",
        "AI document analysis of PDFs and Word files",
        "Smart scoring algorithm with 95% accuracy rate",
        "10x faster analysis compared to manual processes",
        "24/7 monitoring and real-time notifications",
        "Advanced web scraping for both public and login-required sites",
        "Integration with SharePoint and existing workflows",
        "Intelligent proposal assistance and recommendation engine",
      ],
      stats: [
        { value: "95%", label: "Accuracy Rate" },
        { value: "10x", label: "Faster Analysis" },
        { value: "24/7", label: "Monitoring" },
        { value: "50+", label: "Platforms" },
      ],
    },
    {
      title: "Alfire POS System",
      description:
        "Comprehensive Point of Sale system designed specifically for motorcycle spare parts retailers, featuring inventory management, real-time sales processing, and business analytics.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-07-27%2019-46-30-hee5Rsg2jhsHN66RWbh56lkX2l6nLp.png",
      url: "https://alfire-sooty.vercel.app/",
      features: [
        "Mobile-first POS interface with touch-friendly design",
        "Real-time inventory management with stock alerts",
        "Automated receipt generation and sharing",
        "Comprehensive business analytics and reporting",
        "Multi-category product organization (Brakes, Engine, Electrical)",
        "Profit tracking and margin analysis per transaction",
        "Supabase backend with real-time data synchronization",
        "Progressive Web App with offline capabilities",
      ],
      stats: [
        { value: "60%", label: "Faster Transactions" },
        { value: "98%", label: "Inventory Accuracy" },
        { value: "100%", label: "Mobile Responsive" },
        { value: "KSh", label: "Local Currency" },
      ],
    },
    {
      title: "Ruphids Autotech Solutions",
      description:
        "A comprehensive website for a company providing biometric attendance systems and security solutions for schools in Kenya, enhancing child safety through cutting-edge technology.",
      image: "/images/ruphids-hero.png",
      url: "https://v0-rhupids.vercel.app/",
      features: [
        "Biometric & SMS-Enabled School Attendance System",
        "Real-time parent notifications via SMS",
        "Comprehensive security solutions for schools",
        "Trusted by 25+ educational institutions in Kenya",
        "Computer Vision AI for biometric verification with 99.8% accuracy",
        "Real-time AI processing serving 1000+ daily verifications",
        "Custom ML model deployment reducing verification time by 80%",
      ],
      stats: [
        { value: "25+", label: "Schools" },
        { value: "3yr", label: "Warranty" },
        { value: "1sec", label: "Verification" },
        { value: "99.8%", label: "AI Accuracy" },
      ],
      icons: [
        { icon: Shield, label: "Security First" },
        { icon: Bell, label: "Real-time Alerts" },
        { icon: MessageSquare, label: "Bulk SMS" },
      ],
    },
    {
      title: "Chesapeake Stays",
      description:
        "AI-powered platform that transforms raw, unstructured property data into qualified leads through advanced lead scoring algorithms.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Pcd5bqXWs0OL3CyqYqQrRlQ2CsIDtn.png",
      url: "https://chesapeake-leads.vercel.app/",
      features: [
        "Close 3x Faster - Reduce client acquisition time",
        "Save 40+ Hours - Per month on manual work",
        "Reduce Costs by 62% - Compared to manual methods",
        "2.5x More Leads - Higher quality conversion",
        "Advanced NLP models for document analysis and lead qualification",
        "Implemented RAG system processing 10,000+ property documents daily",
        "Fine-tuned LLM achieving 94% accuracy in property data extraction",
      ],
      stats: [
        { value: "87%", label: "Lead Accuracy" },
        { value: "5.2x", label: "ROI Increase" },
        { value: "3hrs", label: "Setup Time" },
        { value: "94%", label: "LLM Accuracy" },
      ],
    },
    {
      title: "Rapid Medical Support",
      description:
        "AI-powered Progressive Web App providing life-saving first aid guidance during protests and emergency situations in Kenya. Built with unity in mind - serving protesters, police officers, and bystanders alike with instant medical assistance.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-07-27%2021-37-55-iNyxLOfhEM30EkPpQljtD3UODBhC51.png",
      url: "https://doc-waqo-wan-ai-labs.vercel.app",
      features: [
        "Doc Waqo - AI Medical Assistant powered by Google's Gemini AI",
        "Instant medical guidance in emergency situations",
        "Quick First Aid Guides with step-by-step instructions",
        "Emergency Contacts for Kenyan emergency services",
        "GPS-based emergency location sharing with WhatsApp/SMS",
        "Offline-capable guidance for areas with poor connectivity",
        "Wakili Legal Aid integration (Coming Soon)",
        "Crypto donation system for community-driven development",
      ],
      stats: [
        { value: "24/7", label: "Available" },
        { value: "100%", label: "Free Access" },
        { value: "PWA", label: "Offline Ready" },
        { value: "🇰🇪", label: "For Kenya" },
      ],
    },
    // --- Kujia Jobs Mtandao entry ---
    {
      title: "Kujia Jobs Mtandao",
      description:
        "A modern online job board and career platform dedicated to connecting Kenyan job seekers with verified opportunities, career resources, and employer tools. Focused on transparency, accessibility, and empowerment for youth and professionals alike.",
      image:
        "/images/kujiajobs-mtandao-hero.png",
      url: "https://kujia-jobs-mtandao.vercel.app/",
      features: [
        "Curated job listings from top Kenyan employers and startups",
        "Advanced search and filtering for job seekers",
        "Personalized job alerts and recommendations",
        "Employer dashboard for posting and managing jobs",
        "Career resources: CV builder, interview tips, and more",
        "Mobile-first responsive design for accessibility",
        "Strict anti-fraud and verification system for listings",
        "Community-driven Q&A and mentorship forums",
      ],
      stats: [
        { value: "10,000+", label: "Jobs Listed" },
        { value: "5,000+", label: "Active Users" },
        { value: "100+", label: "Employers" },
        { value: "🇰🇪", label: "Kenya Focused" },
      ],
    },
  ]

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <div
      id="projects"
      className="py-20 bg-gradient-to-b from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300 overflow-hidden relative"
    >
      {/* Philosophical Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            {/* Abstract flowing lines */}
            <path d="M0,500 Q250,400 500,500 T1000,500 T1500,500" stroke="url(#gradient)" strokeWidth="5" fill="none" />
            <path d="M0,600 Q250,500 500,600 T1000,600 T1500,600" stroke="url(#gradient)" strokeWidth="5" fill="none" />
            <path d="M0,700 Q250,600 500,700 T1000,700 T1500,700" stroke="url(#gradient)" strokeWidth="5" fill="none" />
            <path d="M0,400 Q250,300 500,400 T1000,400 T1500,400" stroke="url(#gradient)" strokeWidth="5" fill="none" />
            <path d="M0,300 Q250,200 500,300 T1000,300 T1500,300" stroke="url(#gradient)" strokeWidth="5" fill="none" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Projects Worked On" />

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{project.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mt-0.5">
                            <span className="h-3 w-3 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                          </div>
                          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-6 mb-6">
                      {project.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Visit Project <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    <motion.button
                      onClick={() => window.open(project.url, "_blank")}
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Demo <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="relative h-80 lg:h-auto overflow-hidden group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <div
                    className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${imageLoaded[index] ? "hidden" : "flex"} items-center justify-center`}
                  >
                    <span className="sr-only">Loading image...</span>
                  </div>

                  {/* Image container with padding and proper scaling */}
                  <div className="absolute inset-0 p-6 flex items-center justify-center">
                    <div className="relative w-full h-full max-w-full max-h-full">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className={`object-contain transform group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg ${imageLoaded[index] ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => handleImageLoad(index)}
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Subtle overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                  {/* Project type indicator */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <div className="flex items-center text-gray-800 dark:text-gray-200">
                        {project.title === "Ruphids Autotech Solutions" ? (
                          <Shield className="w-5 h-5 mr-2 text-blue-600" />
                        ) : project.title === "TenderAI" ? (
                          <Code className="w-5 h-5 mr-2 text-purple-600" />
                        ) : project.title === "Alfire POS System" ? (
                          <Code className="w-5 h-5 mr-2 text-orange-600" />
                        ) : (
                          <Code className="w-5 h-5 mr-2 text-indigo-600" />
                        )}
                        <span className="text-sm font-medium">
                          {project.title === "Ruphids Autotech Solutions"
                            ? "School Security & Biometric Systems"
                            : project.title === "TenderAI"
                              ? "AI-Powered Tender Analysis"
                              : project.title === "Alfire POS System"
                                ? "Motorcycle Parts POS System"
                                : "AI-Powered Real Estate Data Processing"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
