"use client"

import { GraduationCap, Calendar, Award } from "lucide-react"
import Image from "next/image"
import AnimatedSectionHeader from "./AnimatedSectionHeader"
import { motion } from "framer-motion"

export default function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Biomedical Engineering",
      institution: "Kenyatta University",
      achievements: [
        "Specialized in Health Information Systems and Bioinformatics",
        "Relevant coursework: Software Programming, Electronics, Database Systems",
        "Led Machine Learning competitions as Google Developers Student Club ML Lead",
      ],
    },
  ]

  const certifications = [
    {
      title: "Google Crowdsource AI Facilitator",
      organization: "Google",
      period: "2021 - Present",
      description: "Facilitated ML workshops and contributed to responsible AI initiatives",
    },
    {
      title: "Machine Learning Mentor",
      organization: "Teens in AI, London",
      period: "2019",
      description: "Coached teams in Descriptive and Predictive Analytics using Azure ML",
    },
  ]

  return (
    <div
      id="education"
      className="py-20 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Education" />
        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-indigo-400/30 dark:from-purple-600/30 dark:to-indigo-600/30 rounded-br-full z-0 opacity-50 group-hover:opacity-70 transition-all duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2 text-purple-500" />
                  {edu.degree}
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{edu.institution}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {edu.period}
                </p>
                <h4 className="text-lg font-medium mb-2 dark:text-gray-200 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-500" />
                  Key Achievements:
                </h4>
                <ul className="space-y-2">
                  {edu.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mt-1">
                        <span className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                      </div>
                      <span className="ml-3">{achievement}</span>
                    </li>
                  ))}
                </ul>
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
            <linearGradient id="edu-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          {/* Philosophical flowing elements */}
          <path
            d="M0,300 C200,200 400,400 600,300 S800,200 1000,300"
            stroke="url(#edu-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,500 C200,400 400,600 600,500 S800,400 1000,500"
            stroke="url(#edu-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,700 C200,600 400,800 600,700 S800,600 1000,700"
            stroke="url(#edu-gradient)"
            strokeWidth="2"
            fill="none"
          />

          <circle cx="300" cy="200" r="80" stroke="url(#edu-gradient)" strokeWidth="1" fill="none" />
          <circle cx="700" cy="600" r="120" stroke="url(#edu-gradient)" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 w-64 h-64 -mt-32 -ml-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </div>
  )
}
