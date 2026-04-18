"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code, ArrowRight, Shield, Bell, MessageSquare, Youtube, FlaskConical, Briefcase } from "lucide-react"
import Image from "next/image"
import AnimatedSectionHeader from "./AnimatedSectionHeader"
import { useState } from "react"

export default function Projects() {
  const [imageLoaded, setImageLoaded] = useState({})

  const projects = [
    {
      title: "DriveSmart AI",
      description:
        "WhatsApp-Powered AI Assistant that gives every driving school learner a 24/7 intelligent assistant trained on the school's own materials. Learners ask via text, voice, or photo and get accurate answers instantly, solving the 80% knowledge retention problem after learners leave the classroom.",
      image: "/images/drivesmart.png",
      url: "https://drivesmart.wanailabs.org",
      demoUrl: "https://drivesmart.wanailabs.org",
      features: [
        "Text Questions - learners type any driving question and get accurate answers",
        "Voice Notes - AI transcribes voice notes and replies with spoken audio responses",
        "Image Recognition - photograph road signs and get instant explanations",
        "Live Web Search - get up-to-date information on recent regulatory changes",
        "Instructor Dashboard - upload materials, manage content, view analytics",
        "AI Brain - intelligent engine that understands uploaded training materials",
        "WhatsApp Channel - no app downloads, zero learning curve for learners",
        "Scales from 20 learners to 2,000 without additional staff needed",
      ],
      techStack: "WhatsApp API · LLMs · Image Recognition · Voice Transcription · Web Search · React · Python",
      stats: [
        { value: "80%", label: "Knowledge Retention Improvement" },
        { value: "24/7", label: "Availability" },
        { value: "Instant", label: "Response Time" },
        { value: "Zero", label: "App Downloads Needed" },
      ],
    },
    {
      title: "The Action Foundation (TAF) — AI Caregiver Support Ecosystem",
      description:
        "Multi-modal AI support system for caregivers of children with disabilities, bridging critical information gaps across Sub-Saharan Africa. Developed an empathetic, intelligent WhatsApp chatbot and admin ecosystem. The system leverages a custom RAG architecture to provide instant, accurate answers from a specialized medical and legal knowledge base, serving a vulnerable community with real-time support.",
      image: "/images/mlezibora.png",
      url: "https://aichat.theactionfoundationkenya.org",
      demoUrl: "https://youtu.be/ThHj96FBxKU?si=_W0rEQUzO7_qdkKo",
      features: [
        "Intelligent AI Assistant with knowledge-base prioritization",
        "Seamless WhatsApp integration for high accessibility",
        "Comprehensive Staff Admin Dashboard for conversation management and analytics",
        "Multi-modal knowledge management (Documents, Videos, Media)",
        "Custom RAG architecture for specialized medical and legal queries",
        "Empathetic conversational design for sensitive healthcare contexts",
        "Real-time support serving vulnerable communities across Sub-Saharan Africa",
        "Built with Engineering Rigor: Python, LLMs, Vector Databases, React",
      ],
      techStack: "WhatsApp API · Python · RAG Architecture · LLMs · Vector Databases · React",
      stats: [
        { value: "1,000+", label: "Caregivers Supported" },
        { value: "95%", label: "Information Accuracy" },
        { value: "Instant", label: "Response Time" },
        { value: "24/7", label: "Resource Availability" },
      ],
    },
    {
      title: "CDIE UMS — Smart Lab Orchestration & SOP Automation",
      description:
        "A comprehensive Laboratory Management System for Kenyatta University, featuring AI-driven SOP automation to accelerate student research and practical preparation. Architected a centralized platform to streamline laboratory operations and research productivity. Integrated a specialized AI layer that automates the understanding and assessment of Lab Standard Operating Procedures (SOPs), transforming dense technical documentation into interactive, time-saving preparation modules for students and researchers.",
      image: "/images/cdie.png",
      url: "https://app.cdie.co.ke",
      demoUrl: "https://youtu.be/lrh9dhsFyHc?si=ZONmBUTOarUqLWMi",
      features: [
        "AI-Automated SOP Understanding & Assessment",
        "Centralized Laboratory Resource Tracking",
        "Real-time Research Analytics Dashboard",
        "Equipment Booking & Scheduling System",
        "Interactive Modules transforming dense SOPs into digestible formats",
        "LLM-powered documentation processing for institutional infrastructure",
        "Automated SOP parsing reducing manual preparation overhead",
        "Built with Institutional Infrastructure focus: Python, FastAPI, React, PostgreSQL",
      ],
      techStack: "Python · FastAPI · React · PostgreSQL · LLM SOP Parsing · Cloud Hosting",
      stats: [
        { value: "10,000+", label: "Users Impacted" },
        { value: "75%", label: "Faster Lab Prep" },
        { value: "Real-time", label: "Resource Tracking" },
        { value: "90%", label: "Documentation Accuracy" },
      ],
    },
    {
      title: "Agian Solutions — Dignified Employment Ecosystem",
      description:
        "A comprehensive labor market platform connecting Kenyan youth with dignified employment through automated placement tracking and multi-stakeholder verification. Developed a robust employment infrastructure serving all 47 counties in Kenya. The platform orchestrates the workflow between job seekers, placement partners, and employers, ensuring every placement meets minimum wage and duration standards through a comprehensive verification engine.",
      image: "/images/agian.png",
      url: "https://jobs.agiansolutions.co.ke",
      demoUrl: "https://jobs.agiansolutions.co.ke",
      features: [
        "Multi-tenant Placement Pipeline for partners",
        "Automated Hire Verification & KPI Tracking",
        "Real-time Support Integration for Opportunity Youth",
        "Employer Dashboard for job posting and application review",
        "System Orchestration across 47 counties with measurable impact",
        "Verification Logic ensuring KES 15K minimum wage enforcement",
        "6-month minimum job duration compliance tracking",
        "Built for Business and Social Growth: Node.js, React, PostgreSQL",
      ],
      techStack: "Node.js · React · PostgreSQL · Verification Logic · KPI Analytics · Cloud Infrastructure",
      stats: [
        { value: "1,000+", label: "Verified Placements" },
        { value: "47", label: "Counties Covered" },
        { value: "KES 15K", label: "Minimum Wage Enforcement" },
        { value: "6 Months", label: "Minimum Job Duration" },
      ],
    },
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
      title: "Bootyque POS",
      description:
        "Effortless Style. Perfected Sales. A beautiful point-of-sale system designed for modern boutiques and fashion businesses to track stock, process sales, and grow sustainably.",
      image:
        "https://res.cloudinary.com/di2rbwzyd/image/upload/v1764925134/bootyque_yegnb9.png",
      url: "https://bootyque.wanailabs.org",
      features: [
        "Elegant POS interface designed for fashion businesses",
        "Real-time inventory tracking with style categorization",
        "Customer relationship management for fashion clientele",
        "Profit tracking and business analytics dashboard",
        "Multi-outlet support with role-based access control",
        "Cloud-based system accessible from anywhere, anytime",
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
      className="py-20 transition-colors duration-300 overflow-hidden relative section-base"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-accent) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, var(--color-accent) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl font-bold mb-4 hero-heading"
            style={{ color: 'var(--color-text)' }}
          >
            Projects Worked On
          </h2>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="client-card rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h3 
                      className="text-3xl font-bold mb-4 card-title"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="mb-6 text-lg"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {project.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div 
                            className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-0.5"
                            style={{ backgroundColor: 'var(--color-accent-dim)' }}
                          >
                            <span 
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: 'var(--color-accent)' }}
                            ></span>
                          </div>
                          <p className="ml-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>{feature}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-6 mb-6">
                      {project.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <p className="text-2xl font-bold stat-number">{stat.value}</p>
                          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Visit Project <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    {project.demoUrl ? (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Demo <Youtube className="w-4 h-4" />
                      </motion.a>
                    ) : (
                      <motion.button
                        onClick={() => window.open(project.url, "_blank")}
                        className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Demo <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>

                <div 
                  className="relative h-80 lg:h-auto overflow-hidden group"
                  style={{ backgroundColor: 'var(--color-surface-2)' }}
                >
                  <div
                    className={`absolute inset-0 animate-pulse ${imageLoaded[index] ? "hidden" : "flex"} items-center justify-center`}
                    style={{ backgroundColor: 'var(--color-surface)' }}
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
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }}
                  ></div>

                  {/* Project type indicator */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div 
                      className="rounded-lg p-3 shadow-lg"
                      style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                    >
                      <div className="flex items-center" style={{ color: 'var(--color-text)' }}>
                        {project.title === "DriveSmart AI" ? (
                          <MessageSquare className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        ) : project.title.includes("The Action Foundation") ? (
                          <MessageSquare className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        ) : project.title.includes("CDIE") ? (
                          <FlaskConical className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        ) : project.title.includes("Agian") ? (
                          <Briefcase className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        ) : project.title === "Ruphids Autotech Solutions" ? (
                          <Shield className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        ) : project.title === "TenderAI" ? (
                          <Code className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        ) : project.title === "Bootyque POS" ? (
                          <Code className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        ) : (
                          <Code className="w-5 h-5 mr-2" style={{ color: 'var(--color-accent)' }} />
                        )}
                        <span className="text-sm font-medium">
                          {project.title === "DriveSmart AI"
                            ? "WhatsApp-Powered AI Assistant"
                            : project.title.includes("The Action Foundation")
                              ? "AI Caregiver Support Ecosystem"
                              : project.title.includes("CDIE")
                                ? "Smart Lab Orchestration & SOP Automation"
                                : project.title.includes("Agian")
                                  ? "Dignified Employment Ecosystem"
                                  : project.title === "Ruphids Autotech Solutions"
                                    ? "School Security & Biometric Systems"
                                    : project.title === "TenderAI"
                                      ? "AI-Powered Tender Analysis"
                                      : project.title === "Bootyque POS"
                                        ? "Fashion Boutique POS System"
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
