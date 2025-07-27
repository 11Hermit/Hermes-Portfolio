"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Calendar, Award, Mail, MapPin, Phone, Send, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function CombinedEducationContact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitSuccess(true)
      reset()
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 philosophical-text">Education & Certifications</h2>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-purple-500" />
              Bachelor of Science in Biomedical Engineering
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Kenyatta University</p>

            <h4 className="text-lg font-medium mb-4 dark:text-gray-200 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-500" />
              Key Achievements:
            </h4>
            <ul className="space-y-3">
              {[
                "Specialized in Health Information Systems and Bioinformatics",
                "Relevant coursework: Software Programming, Electronics, Database Systems",
                "Led Machine Learning competitions as Google Developers Student Club ML Lead",
              ].map((achievement, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mt-1">
                    <span className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                  </div>
                  <span className="ml-3">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {[
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
            ].map((cert, idx) => (
              <div key={idx} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400">{cert.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{cert.organization}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {cert.period}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{cert.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 philosophical-text">Get in Touch</h2>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-6 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Contact Information
            </h3>
            <div className="space-y-6">
              <a
                href="mailto:ashtoneonyango@gmail.com"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
              >
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors duration-300 mr-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                ashtoneonyango@gmail.com
              </a>
              <a
                href="tel:+254740497975"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
              >
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors duration-300 mr-3">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                +254 740 497975
              </a>
              <div className="flex items-center text-gray-600 dark:text-gray-300 group">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors duration-300 mr-3">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                Nairobi, Kenya
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                {...register("subject")}
                type="text"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.subject ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm`}
              />
              {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                {...register("message")}
                rows={4}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/80 dark:text-white backdrop-blur-sm`}
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
            {submitSuccess && (
              <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md">
                Message sent successfully!
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  )
}
