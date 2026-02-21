"use client"

import { motion } from "framer-motion"
import { ExternalLink, Sparkles, Users, BookOpen, MessageSquare, Music, Headphones, Globe, Zap } from "lucide-react"
import Image from "next/image"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

export default function PreviousClients() {
  const clients = [
    {
      name: "The Action Foundation (TAF)",
      description:
        "Collaborated with TAF to build a high-impact AI caregiver support ecosystem, utilizing RAG architecture to provide 24/7 empathetic support on WhatsApp for families of children with disabilities.",
      logo: "https://theactionfoundationkenya.org/wp-content/uploads/2022/03/TAF-Logo.png",
      website: "https://theactionfoundationkenya.org",
      features: [
        "AI caregiver support ecosystem with RAG architecture",
        "24/7 empathetic WhatsApp support for vulnerable families",
        "Specialized medical and legal knowledge base",
        "Multi-modal knowledge management system",
        "Real-time support across Sub-Saharan Africa",
        "Engineering rigor with Python, LLMs, Vector Databases",
      ],
      metrics: {
        primary: "1,000+ Caregivers Supported",
        secondary: "95% Information Accuracy",
      },
    },
    {
      name: "Kenyatta University (CDIE Innovation Hub)",
      description:
        "Engineered a Smart Laboratory Management System for KU's CDIE Hub, implementing AI-driven SOP automation that streamlines technical documentation for thousands of students and researchers.",
      logo: "https://mlalyk2fvka4.i.optimole.com/cb:7IGe.234/w:auto/h:auto/q:mauto/f:best/https://cdie.co.ke/wp-content/uploads/2025/04/cdiepng-e1745595003177.png",
      website: "https://cdie.co.ke",
      features: [
        "AI-driven SOP automation for laboratory operations",
        "Centralized resource tracking and analytics",
        "Equipment booking and scheduling system",
        "Interactive modules for technical documentation",
        "LLM-powered documentation processing",
        "Institutional infrastructure: Python, FastAPI, React, PostgreSQL",
      ],
      metrics: {
        primary: "10,000+ Users Impacted",
        secondary: "75% Faster Lab Preparation",
      },
    },
    {
      name: "Agian Solutions",
      description:
        "Architected a national scale employment platform to bridge the gap for opportunity youth across 47 Kenyan counties, featuring a robust automated verification engine for dignified labor placements.",
      logo: "https://res-console.cloudinary.com/di2rbwzyd/thumbnails/v1/image/upload/v1771687473/YWdpYW4tbG9nb19kZmh2eDQ=/drilldown",
      website: "https://agiansolutions.co.ke",
      features: [
        "National employment platform across 47 counties",
        "Automated verification engine for labor placements",
        "Multi-tenant placement pipeline for partners",
        "KES 15K minimum wage enforcement",
        "6-month minimum job duration compliance",
        "System orchestration: Node.js, React, PostgreSQL",
      ],
      metrics: {
        primary: "1,000+ Verified Placements",
        secondary: "47 Counties Covered",
      },
    },
    {
      name: "Rightsify Hydra",
      description:
        "Built the AI core of a global music licensing platform. Transformer models generating copyright-cleared content for 3M+ daily users across 180+ countries — with distributed GCP training pipelines that cut model training time by 60%.",
      logo: "/images/rightsify-hydra-logo.png",
      website: "https://rightsify.com/hydra/",
      video: "https://rightsify.com/wp-content/uploads/2023/12/file.mp4",
      features: [
        "AI-generated instrumental music and sound effects",
        "Copyright-cleared for commercial use",
        "Trained on 1 million+ songs (50k hours of music)",
        "Supports 800+ unique instruments",
        "Multi-lingual capabilities in 50+ languages",
        "Customizable audio generation from 3 seconds to 1 minute",
      ],
      testimonial: {
        quote:
          "Rightsify provides music to thousands of businesses in more than 180 countries across the globe. Every day our music is experienced by over 3 million people across all facets of life.",
        author: "Rightsify Team",
      },
    },
    {
      name: "ClassifyMe",
      description:
        "AI matching system that analyzes student aptitude and passions to surface personalized course recommendations — reducing course selection confusion at scale with vector-based semantic matching.",
      logo: "/images/classifyme-logo.png",
      website: "https://classifyme.co.ke",
      image: "/images/classifyme.png",
      features: [
        "Personalized course recommendations",
        "Comprehensive subject analysis",
        "Academic performance tracking",
        "Interest-based matching",
        "Personality assessment integration",
        "Smart classification algorithm",
      ],
      testimonial: {
        quote:
          "From the intuitive user interface to the perfect-fit course recommendations, using ClassifyMe has been enjoyable. ClassifyMe is a go-to resource for course recommendations!",
        author: "Gilbert",
      },
    },
    {
      name: "Kujia Jobs Mtandao",
      description:
        "Kenya's trusted online job board and career platform, empowering young professionals and job seekers with verified listings, career resources, and employer tools. Committed to transparency, accessibility, and community support.",
      logo: "/images/kujia-logo.png",
      website: "https://kujia-jobs-mtandao.vercel.app/",
      features: [
        "Verified job listings from top employers",
        "Personalized job alerts and recommendations",
        "Employer dashboard for efficient job posting",
        "Career resources: CV builder, interview tips, and more",
        "Mobile-first responsive design",
        "Community Q&A and mentorship forums",
        "Strict anti-fraud and listing verification",
      ],
      testimonial: {
        quote:
          "Kujia Jobs Mtandao has made job searching in Kenya safer, easier, and more transparent. The platform's focus on verified listings and career growth is unmatched.",
        author: "A Kenyan Professional",
      },
    }
  ]

  return (
    <div
      id="clients"
      className="py-20 transition-colors duration-300 overflow-hidden relative section-base"
    >
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
            Previous Clients
          </h2>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Companies that shipped AI products with me — not just bought a consulting deck.
          </p>
        </motion.div>

        <div className="space-y-20">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="client-card rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left Column - Content */}
                <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="mr-4 relative w-14 h-14 flex items-center justify-center">
                        <Image
                          src={client.logo || "/placeholder.svg"}
                          alt={`${client.name} logo`}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 
                          className="text-3xl font-bold card-title"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {client.name}
                        </h3>
                        <div 
                          className="flex items-center text-sm"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          <span className="mr-2">
                            {client.name.includes("The Action Foundation")
                              ? "Non-Profit Healthcare"
                              : client.name.includes("Kenyatta University")
                                ? "Educational Institution"
                                : client.name.includes("Agian")
                                  ? "Employment Platform"
                                  : client.name === "Rightsify Hydra"
                                    ? "AI Music Platform"
                                    : client.name === "ClassifyMe"
                                      ? "Educational Platform"
                                      : client.name === "Kujia Jobs Mtandao"
                                        ? "Job Board Platform"
                                        : "Client Platform"}
                          </span>
                          <span 
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: 'var(--color-text-muted)' }}
                          ></span>
                          <span className="ml-2">
                            {client.name.includes("The Action Foundation")
                              ? "AI Caregiver Support"
                              : client.name.includes("Kenyatta University")
                                ? "Lab Management System"
                                : client.name.includes("Agian")
                                  ? "Employment Verification"
                                  : client.name === "Rightsify Hydra"
                                    ? "Music Generation"
                                    : client.name === "ClassifyMe"
                                      ? "Course Recommendation"
                                      : client.name === "Kujia Jobs Mtandao"
                                        ? "Career & Job Matching"
                                        : "Client Service"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p 
                      className="mb-8 text-lg"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {client.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {client.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div 
                            className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-1"
                            style={{ backgroundColor: 'var(--color-accent-dim)' }}
                          >
                            <span 
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: 'var(--color-accent)' }}
                            ></span>
                          </div>
                          <p className="ml-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>{feature}</p>
                        </div>
                      ))}
                    </div>

                    <div 
                      className="rounded-xl p-6 mb-8"
                      style={{ backgroundColor: 'var(--color-surface-2)' }}
                    >
                      {client.metrics ? (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div 
                              className="text-2xl font-bold"
                              style={{ color: 'var(--color-accent)' }}
                            >
                              {client.metrics.primary}
                            </div>
                            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                              Primary Impact
                            </div>
                          </div>
                          <div>
                            <div 
                              className="text-2xl font-bold"
                              style={{ color: 'var(--color-accent)' }}
                            >
                              {client.metrics.secondary}
                            </div>
                            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                              Key Metric
                            </div>
                          </div>
                        </div>
                      ) : client.testimonial ? (
                        <>
                          <div className="flex mb-4">
                            <div 
                              className="text-4xl"
                              style={{ color: 'var(--color-accent)' }}
                            >
                              "
                            </div>
                          </div>
                          <p 
                            className="italic mb-4"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            {client.testimonial.quote}
                          </p>
                          <p 
                            className="text-right font-medium"
                            style={{ color: 'var(--color-accent)' }}
                          >
                            — {client.testimonial.author}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <motion.a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                {/* Right Column - Image/Video and Features */}
                <div 
                  className="lg:col-span-5 relative overflow-hidden"
                  style={{ backgroundColor: 'var(--color-surface-2)' }}
                >
                  <div className="p-8 lg:p-12 h-full flex flex-col justify-between relative z-10">
                    <div>
                      <h4 
                        className="text-2xl font-bold mb-6"
                        style={{ color: 'var(--color-text)' }}
                      >
                        Key Highlights
                      </h4>

                      {client.name === "Rightsify Hydra" ? (
                        <>
                          <div className="mb-6 relative h-48 rounded-lg overflow-hidden">
                            <video
                              className="absolute inset-0 w-full h-full object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                            >
                              <source
                                src="https://rightsify.com/wp-content/uploads/2023/12/file.mp4"
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          </div>

                          <div className="space-y-4 mb-8">
                            {[
                              { icon: Music, title: "AI-Powered", desc: "Advanced music generation using Nvidia H100 GPUs" },
                              { icon: Headphones, title: "Commercial Use", desc: "Copyright-cleared music for any project" },
                              { icon: Globe, title: "Global Reach", desc: "Used in 180+ countries by millions daily" },
                              { icon: Zap, title: "Customizable", desc: "Detailed prompts for tailored music generation" },
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-start">
                                <div 
                                  className="flex-shrink-0 p-2 rounded-lg mr-4"
                                  style={{ backgroundColor: 'var(--color-accent-dim)' }}
                                >
                                  <item.icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                                </div>
                                <div>
                                  <h5 className="font-medium" style={{ color: 'var(--color-text)' }}>{item.title}</h5>
                                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : client.name.includes("The Action Foundation") ? (
                        <div className="space-y-4 mb-8">
                          {[
                            { icon: MessageSquare, title: "WhatsApp Integration", desc: "24/7 empathetic AI support via WhatsApp" },
                            { icon: Sparkles, title: "RAG Architecture", desc: "Custom medical and legal knowledge base" },
                            { icon: Users, title: "Caregiver Support", desc: "Serving vulnerable families across Africa" },
                            { icon: BookOpen, title: "Multi-modal Knowledge", desc: "Documents, videos, and media integration" },
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <div 
                                className="flex-shrink-0 p-2 rounded-lg mr-4"
                                style={{ backgroundColor: 'var(--color-accent-dim)' }}
                              >
                                <item.icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                              </div>
                              <div>
                                <h5 className="font-medium" style={{ color: 'var(--color-text)' }}>{item.title}</h5>
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : client.name.includes("Kenyatta University") ? (
                        <div className="space-y-4 mb-8">
                          {[
                            { icon: BookOpen, title: "SOP Automation", desc: "AI-driven documentation processing" },
                            { icon: Sparkles, title: "Lab Management", desc: "Centralized resource tracking system" },
                            { icon: Users, title: "Student Impact", desc: "10,000+ users across university" },
                            { icon: Zap, title: "Interactive Modules", desc: "Transforming dense technical docs" },
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <div 
                                className="flex-shrink-0 p-2 rounded-lg mr-4"
                                style={{ backgroundColor: 'var(--color-accent-dim)' }}
                              >
                                <item.icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                              </div>
                              <div>
                                <h5 className="font-medium" style={{ color: 'var(--color-text)' }}>{item.title}</h5>
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : client.name.includes("Agian") ? (
                        <div className="space-y-4 mb-8">
                          {[
                            { icon: Users, title: "National Scale", desc: "47 counties across Kenya" },
                            { icon: Sparkles, title: "Verification Engine", desc: "Automated placement validation" },
                            { icon: BookOpen, title: "Dignified Labor", desc: "KES 15K minimum wage enforcement" },
                            { icon: Zap, title: "System Orchestration", desc: "Multi-tenant partner pipeline" },
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <div 
                                className="flex-shrink-0 p-2 rounded-lg mr-4"
                                style={{ backgroundColor: 'var(--color-accent-dim)' }}
                              >
                                <item.icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                              </div>
                              <div>
                                <h5 className="font-medium" style={{ color: 'var(--color-text)' }}>{item.title}</h5>
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : client.name === "Kujia Jobs Mtandao" ? (
                        <div className="space-y-4 mb-8">
                          {[
                            { icon: Users, title: "Job Board", desc: "Curated jobs for Kenyan professionals" },
                            { icon: Sparkles, title: "Verified Listings", desc: "Strict anti-fraud and employer verification" },
                            { icon: BookOpen, title: "Career Resources", desc: "CV builder, interview tips, mentorship" },
                            { icon: MessageSquare, title: "Community Support", desc: "Q&A forums and personalized job alerts" },
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <div 
                                className="flex-shrink-0 p-2 rounded-lg mr-4"
                                style={{ backgroundColor: 'var(--color-accent-dim)' }}
                              >
                                <item.icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                              </div>
                              <div>
                                <h5 className="font-medium" style={{ color: 'var(--color-text)' }}>{item.title}</h5>
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4 mb-8">
                          {[
                            { icon: Users, title: "Student-Centered", desc: "Personalized approach to course selection" },
                            { icon: Sparkles, title: "AI-Powered", desc: "Smart algorithms for perfect course matching" },
                            { icon: BookOpen, title: "Comprehensive", desc: "Holistic approach to academic guidance" },
                            { icon: MessageSquare, title: "Supportive", desc: "Guidance throughout the academic journey" },
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start">
                              <div 
                                className="flex-shrink-0 p-2 rounded-lg mr-4"
                                style={{ backgroundColor: 'var(--color-accent-dim)' }}
                              >
                                <item.icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                              </div>
                              <div>
                                <h5 className="font-medium" style={{ color: 'var(--color-text)' }}>{item.title}</h5>
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div 
                      className="rounded-xl p-4"
                      style={{ backgroundColor: 'var(--color-surface)' }}
                    >
                      <p className="text-sm italic" style={{ color: 'var(--color-text-muted)' }}>
                        {client.name === "Rightsify Hydra"
                          ? "Unlock limitless musical possibilities and use the music for any project or use case. Generate unique, copyright-clear music instantly."
                          : client.name === "Kujia Jobs Mtandao"
                            ? "Unlock your career potential with verified job listings, career resources, and community support. Find your dream job today!"
                            : "Explore Your Path, Discover Your Course. Dive into endless opportunities and find the course that aligns with your interests and ambitions."}
                      </p>
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
