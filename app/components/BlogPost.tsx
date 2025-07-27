"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Edit3, Calendar, Clock, Tag, Share2, Eye } from "lucide-react"
import Image from "next/image"

interface BlogPostData {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  date: string
  readTime: string
  tags: string[]
  category: string
  image?: string
  published: boolean
}

interface BlogPostProps {
  post: BlogPostData
  onBack: () => void
  onEdit: () => void
}

export default function BlogPost({ post, onBack, onEdit }: BlogPostProps) {
  const renderContent = () => {
    // Enhanced markdown-to-HTML converter
    const html = post.content
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-gray-900 dark:bg-gray-800 text-green-400 p-6 rounded-xl overflow-x-auto my-6 border border-gray-700"><code class="text-sm font-mono">$1</code></pre>',
      )
      .replace(
        /`(.*?)`/g,
        '<code class="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded font-mono text-sm">$1</code>',
      )
      .replace(/^- (.*$)/gim, '<li class="mb-2">$1</li>')
      .replace(
        /(<li>.*<\/li>)/s,
        '<ul class="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">$1</ul>',
      )
      .replace(/\n\n/g, '</p><p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">')
      .replace(/^(?!<[h|u|p|l])/gm, '<p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">')

    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <div className="container mx-auto px-6 relative z-10 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-300"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>

            <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Article */}
        <article className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Featured Image */}
          {post.image && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full mb-4">
                  {post.category}
                </span>
              </div>
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <span className="font-medium">{post.author}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>

              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {Math.floor(Math.random() * 1000) + 100} views
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">{renderContent()}</div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{post.author}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Senior AI Software Engineer</div>
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                  <Share2 className="w-4 h-4" />
                  Share Article
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for related articles */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mb-4"></div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Coming Soon: More AI Insights</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Stay tuned for more articles on AI development and modern web technologies.
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg mb-4"></div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Advanced GraphQL Techniques</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Deep dive into advanced GraphQL patterns and best practices.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
