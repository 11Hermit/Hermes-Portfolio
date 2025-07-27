"use client"

import { motion } from "framer-motion"
import { ExternalLink, Sparkles, Users, BookOpen, MessageSquare, Music, Headphones, Globe, Zap } from "lucide-react"
import Image from "next/image"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

export default function PreviousClients() {
  const clients = [
    {
      name: "Rightsify Hydra",
      description:
        "An advanced AI music generation platform designed for commercial applications, providing copyright-cleared instrumental music for businesses, creators, and artists.",
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
        "An innovative platform that helps students discover the perfect course match tailored to their passions, strengths, interests, and personality.",
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
  ]

  return (
    <div
      id="clients"
      className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300 overflow-hidden relative"
    >
      {/* Philosophical Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="client-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            {/* Abstract flowing elements */}
            <path
              d="M0,200 C200,100 400,300 600,200 S800,100 1000,200"
              stroke="url(#client-gradient)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M0,400 C200,300 400,500 600,400 S800,300 1000,400"
              stroke="url(#client-gradient)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M0,600 C200,500 400,700 600,600 S800,500 1000,600"
              stroke="url(#client-gradient)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M0,800 C200,700 400,900 600,800 S800,700 1000,800"
              stroke="url(#client-gradient)"
              strokeWidth="3"
              fill="none"
            />

            <circle cx="200" cy="200" r="80" stroke="url(#client-gradient)" strokeWidth="2" fill="none" />
            <circle cx="800" cy="600" r="120" stroke="url(#client-gradient)" strokeWidth="2" fill="none" />
            <circle cx="500" cy="400" r="60" stroke="url(#client-gradient)" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Previous Clients" />

        <div className="space-y-20">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-card rounded-2xl shadow-xl overflow-hidden"
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
                        <h3 className="text-3xl font-bold philosophical-text">{client.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="mr-2">
                            {client.name === "Rightsify Hydra" ? "AI Music Platform" : "Educational Platform"}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600"></span>
                          <span className="ml-2">
                            {client.name === "Rightsify Hydra" ? "Music Generation" : "Course Recommendation"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">{client.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {client.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mt-1">
                            <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                          </div>
                          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-6 mb-8">
                      <div className="flex mb-4">
                        <div className="text-4xl text-indigo-600 dark:text-indigo-400">"</div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 italic mb-4">{client.testimonial.quote}</p>
                      <p className="text-right text-indigo-600 dark:text-indigo-400 font-medium">
                        — {client.testimonial.author}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <motion.a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                {/* Right Column - Image/Video and Features */}
                <div className="lg:col-span-5 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-800 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0,100 Q100,50 200,100 T400,100" stroke="white" strokeWidth="2" fill="none" />
                      <path d="M0,200 Q100,150 200,200 T400,200" stroke="white" strokeWidth="2" fill="none" />
                      <path d="M0,300 Q100,250 200,300 T400,300" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  </div>

                  <div className="p-8 lg:p-12 h-full flex flex-col justify-between relative z-10">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-6">Key Highlights</h4>

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
                            <div className="flex items-start">
                              <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg mr-4">
                                <Music className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h5 className="text-white font-medium">AI-Powered</h5>
                                <p className="text-white/80 text-sm">
                                  Advanced music generation using Nvidia H100 GPUs
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg mr-4">
                                <Headphones className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h5 className="text-white font-medium">Commercial Use</h5>
                                <p className="text-white/80 text-sm">Copyright-cleared music for any project</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg mr-4">
                                <Globe className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h5 className="text-white font-medium">Global Reach</h5>
                                <p className="text-white/80 text-sm">Used in 180+ countries by millions daily</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg mr-4">
                                <Zap className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h5 className="text-white font-medium">Customizable</h5>
                                <p className="text-white/80 text-sm">Detailed prompts for tailored music generation</p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-4 mb-8">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg mr-4">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h5 className="text-white font-medium">Student-Centered</h5>
                              <p className="text-white/80 text-sm">Personalized approach to course selection</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg mr-4">
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h5 className="text-white font-medium">AI-Powered</h5>
                              <p className="text-white/80 text-sm">Smart algorithms for perfect course matching</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg mr-4">
                              <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h5 className="text-white font-medium">Comprehensive</h5>
                              <p className="text-white/80 text-sm">Holistic approach to academic guidance</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg mr-4">
                              <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h5 className="text-white font-medium">Supportive</h5>
                              <p className="text-white/80 text-sm">Guidance throughout the academic journey</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-white text-sm italic">
                        {client.name === "Rightsify Hydra"
                          ? "Unlock limitless musical possibilities and use the music for any project or use case. Generate unique, copyright-clear music instantly."
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
