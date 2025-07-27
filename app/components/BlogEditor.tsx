"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, X, Bold, Italic, List, Link, Quote, Code, Type, Eye, EyeOff, Hash, Plus, Sparkles } from "lucide-react"

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

interface BlogEditorProps {
  post?: BlogPostData | null
  onSave: (post: BlogPostData) => void
  onCancel: () => void
}

export default function BlogEditor({ post, onSave, onCancel }: BlogEditorProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [tags, setTags] = useState<string[]>(post?.tags || [])
  const [category, setCategory] = useState(post?.category || "AI Development")
  const [image, setImage] = useState(post?.image || "")
  const [published, setPublished] = useState(post?.published || false)
  const [isPreview, setIsPreview] = useState(false)
  const [newTag, setNewTag] = useState("")

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const categories = ["AI Development", "Web Development", "Industry Insights", "Tutorials"]

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [content])

  // Calculate read time
  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200
    const words = text.split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  const insertMarkdown = (before: string, after = "") => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    const newContent = content.substring(0, start) + before + selectedText + after + content.substring(end)

    setContent(newContent)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    const postData: BlogPostData = {
      id: post?.id || "",
      title,
      content,
      excerpt: excerpt || content.substring(0, 200) + "...",
      author: post?.author || "Ashtone Onyango",
      date: post?.date || new Date().toISOString().split("T")[0],
      readTime: calculateReadTime(content),
      tags,
      category,
      image,
      published,
    }
    onSave(postData)
  }

  const renderPreview = () => {
    // Simple markdown-to-HTML converter for preview
    const html = content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>',
      )
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">$1</code>')
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside mb-4">$1</ul>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|u|p|l])/gm, '<p class="mb-4">')

    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <div className="container mx-auto px-6 relative z-10 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold dark:text-white">{post ? "Edit Article" : "Create New Article"}</h1>
                <p className="text-gray-600 dark:text-gray-400">Share your knowledge with the world</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                  isPreview
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isPreview ? "Edit" : "Preview"}
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <Save className="w-4 h-4" />
                Save Article
              </button>

              <button
                onClick={onCancel}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            {!isPreview ? (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your article title..."
                    className="w-full px-4 py-3 text-2xl font-bold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <button
                    onClick={() => insertMarkdown("**", "**")}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors duration-200"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => insertMarkdown("*", "*")}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors duration-200"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>

                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                  <button
                    onClick={() => insertMarkdown("# ")}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors duration-200"
                    title="Heading 1"
                  >
                    <Type className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => insertMarkdown("## ")}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors duration-200"
                    title="Heading 2"
                  >
                    <Hash className="w-4 h-4" />
                  </button>

                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                  <button
                    onClick={() => insertMarkdown("- ")}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors duration-200"
                    title="List"
                  >
                    <List className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => insertMarkdown("> ")}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors duration-200"
                    title="Quote"
                  >
                    <Quote className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => insertMarkdown("`", "`")}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors duration-200"
                    title="Inline Code"
                  >
                    <Code className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => insertMarkdown("\n```\n", "\n```\n")}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors duration-200"
                    title="Code Block"
                  >
                    <Code className="w-4 h-4" />
                  </button>

                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                  <button
                    onClick={() => insertMarkdown("[Link Text](", ")")}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors duration-200"
                    title="Link"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content (Markdown supported)
                  </label>
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your article... You can use Markdown formatting."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none min-h-[400px] font-mono text-sm leading-relaxed"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt (Optional)
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of your article..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-24"
                  />
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h1 className="text-3xl font-bold mb-6">{title || "Untitled Article"}</h1>
                {renderPreview()}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Publish Settings</h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Publish immediately</span>
              </label>
            </div>

            {/* Category */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Image */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {image && (
                <div className="mt-2 relative h-32 rounded-lg overflow-hidden">
                  <img src={image || "/placeholder.svg"} alt="Featured" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={addTag}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-purple-500 hover:text-purple-700">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Article Stats</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div>Words: {content.split(/\s+/).filter((word) => word.length > 0).length}</div>
                <div>Characters: {content.length}</div>
                <div>Read time: {calculateReadTime(content)}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
