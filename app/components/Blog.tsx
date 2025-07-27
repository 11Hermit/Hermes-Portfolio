"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit3, Eye, Calendar, Clock, Tag, Search, Filter, BookOpen } from "lucide-react"
import Image from "next/image"
import BlogEditor from "./BlogEditor"
import BlogPost from "./BlogPost"

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

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostData[]>([
    {
      id: "1",
      title: "Building Agentic AI Systems with CrewAI: A Complete Guide",
      content: `# Building Agentic AI Systems with CrewAI: A Complete Guide

Agentic AI represents the next frontier in artificial intelligence, where autonomous agents can collaborate, reason, and execute complex tasks with minimal human intervention. In this comprehensive guide, I'll walk you through building sophisticated multi-agent systems using CrewAI.

## What is Agentic AI?

Agentic AI systems are composed of multiple AI agents that can:
- **Collaborate** on complex tasks
- **Make autonomous decisions**
- **Learn from interactions**
- **Adapt to changing environments**

\`\`\`python
from crewai import Agent, Task, Crew
from langchain.llms import OpenAI

# Define specialized agents
researcher = Agent(
    role='Research Specialist',
    goal='Conduct thorough research on given topics',
    backstory='Expert researcher with access to vast knowledge',
    llm=OpenAI(temperature=0.1)
)

writer = Agent(
    role='Content Writer',
    goal='Create engaging content based on research',
    backstory='Professional writer with expertise in technical content',
    llm=OpenAI(temperature=0.7)
)
\`\`\`

## Key Benefits

1. **Scalability**: Handle multiple tasks simultaneously
2. **Specialization**: Each agent focuses on specific expertise
3. **Reliability**: Built-in error handling and recovery
4. **Flexibility**: Easy to modify and extend

The future of AI is agentic, and CrewAI makes it accessible to developers worldwide.`,
      excerpt:
        "Learn how to build sophisticated multi-agent AI systems using CrewAI framework, with practical examples and best practices.",
      author: "Ashtone Onyango",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["AI", "CrewAI", "Multi-Agent Systems", "Python"],
      category: "AI Development",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      published: true,
    },
    {
      id: "2",
      title: "GraphQL + AI: Building Intelligent APIs for Modern Applications",
      content: `# GraphQL + AI: Building Intelligent APIs for Modern Applications

The combination of GraphQL's flexible query language with AI capabilities creates powerful, intelligent APIs that can adapt to user needs and provide contextual responses.

## Why GraphQL for AI Applications?

GraphQL offers several advantages when building AI-powered applications:

- **Flexible Data Fetching**: Request exactly what you need
- **Type Safety**: Strong typing system prevents errors
- **Real-time Subscriptions**: Perfect for AI streaming responses
- **Single Endpoint**: Simplified API management

\`\`\`typescript
import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql'

const AIResponseType = new GraphQLObjectType({
  name: 'AIResponse',
  fields: {
    text: { type: GraphQLString },
    confidence: { type: GraphQLString },
    model: { type: GraphQLString }
  }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    generateResponse: {
      type: AIResponseType,
      args: {
        prompt: { type: GraphQLString }
      },
      resolve: async (_, { prompt }) => {
        const { text } = await generateText({
          model: openai('gpt-4'),
          prompt
        })
        
        return {
          text,
          confidence: '0.95',
          model: 'gpt-4'
        }
      }
    }
  }
})
\`\`\`

This approach enables building truly intelligent applications that can understand and respond to complex user queries.`,
      excerpt:
        "Discover how to combine GraphQL's flexibility with AI capabilities to create intelligent, adaptive APIs.",
      author: "Ashtone Onyango",
      date: "2024-01-10",
      readTime: "6 min read",
      tags: ["GraphQL", "AI", "API", "TypeScript"],
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      published: true,
    },
    {
      id: "3",
      title: "The Future of AI in Real Estate: From Data to Decisions",
      content: `# The Future of AI in Real Estate: From Data to Decisions

The real estate industry is undergoing a massive transformation driven by artificial intelligence. From property valuation to lead generation, AI is revolutionizing how we buy, sell, and invest in real estate.

## Current AI Applications in Real Estate

### 1. Automated Property Valuation
AI models can analyze thousands of data points to provide accurate property valuations:

\`\`\`python
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

# Load property data
data = pd.read_csv('property_data.csv')

# Feature engineering
features = ['square_feet', 'bedrooms', 'bathrooms', 'location_score', 'age']
X = data[features]
y = data['price']

# Train model
model = RandomForestRegressor(n_estimators=100)
model.fit(X, y)

# Predict property value
prediction = model.predict([[2000, 3, 2, 8.5, 5]])
print("Estimated Property Value: $" + "{:,.2f}".format(prediction[0]))
\`\`\`

### 2. Lead Scoring and Qualification
AI can analyze buyer behavior to identify high-quality leads:

- **Behavioral Analysis**: Track website interactions
- **Demographic Scoring**: Analyze buyer profiles  
- **Predictive Modeling**: Forecast purchase likelihood

### 3. Market Trend Analysis
Machine learning algorithms can identify market patterns and predict future trends.

## The Road Ahead

The future of real estate AI includes:
- **Virtual Property Tours** with AI guides
- **Automated Contract Generation**
- **Predictive Maintenance** for properties
- **Smart Investment Recommendations**

AI is not replacing real estate professionals—it's empowering them with better tools and insights.`,
      excerpt:
        "Explore how AI is transforming the real estate industry, from automated valuations to predictive market analysis.",
      author: "Ashtone Onyango",
      date: "2024-01-05",
      readTime: "10 min read",
      tags: ["AI", "Real Estate", "Machine Learning", "PropTech"],
      category: "Industry Insights",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      published: true,
    },
  ])

  const [currentView, setCurrentView] = useState<"list" | "editor" | "post">("list")
  const [selectedPost, setSelectedPost] = useState<BlogPostData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isEditing, setIsEditing] = useState(false)

  const categories = ["All", "AI Development", "Web Development", "Industry Insights", "Tutorials"]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory && post.published
  })

  const handleCreatePost = () => {
    setSelectedPost(null)
    setIsEditing(true)
    setCurrentView("editor")
  }

  const handleEditPost = (post: BlogPostData) => {
    setSelectedPost(post)
    setIsEditing(true)
    setCurrentView("editor")
  }

  const handleViewPost = (post: BlogPostData) => {
    setSelectedPost(post)
    setCurrentView("post")
  }

  const handleSavePost = (postData: BlogPostData) => {
    if (selectedPost) {
      // Update existing post
      setPosts(posts.map((p) => (p.id === selectedPost.id ? postData : p)))
    } else {
      // Create new post
      const newPost = {
        ...postData,
        id: Date.now().toString(),
        author: "Ashtone Onyango",
        date: new Date().toISOString().split("T")[0],
      }
      setPosts([newPost, ...posts])
    }
    setCurrentView("list")
    setIsEditing(false)
  }

  const handleBackToList = () => {
    setCurrentView("list")
    setSelectedPost(null)
    setIsEditing(false)
  }

  if (currentView === "editor") {
    return <BlogEditor post={selectedPost} onSave={handleSavePost} onCancel={handleBackToList} />
  }

  if (currentView === "post" && selectedPost) {
    return <BlogPost post={selectedPost} onBack={handleBackToList} onEdit={() => handleEditPost(selectedPost)} />
  }

  return (
    <div className="container mx-auto px-6 relative z-10">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-6">
          <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
          <h2 className="text-5xl font-bold philosophical-text">AI Engineering Blog</h2>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Insights, tutorials, and deep dives into AI development, modern web technologies, and the future of
          intelligent applications.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            onClick={handleCreatePost}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Write New Article
          </motion.button>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => handleViewPost(post)}
            >
              {/* Featured Image */}
              {post.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">+{post.tags.length - 3} more</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewPost(post)
                    }}
                    className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    Read More
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditPost(post)
                    }}
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No articles found</h3>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            {searchTerm || selectedCategory !== "All"
              ? "Try adjusting your search or filter criteria"
              : "Start writing your first article to share your knowledge"}
          </p>
          <button
            onClick={handleCreatePost}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Write First Article
          </button>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {posts.filter((p) => p.published).length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Published Articles</div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{categories.length - 1}</div>
          <div className="text-gray-600 dark:text-gray-400">Categories</div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {Array.from(new Set(posts.flatMap((p) => p.tags))).length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Unique Tags</div>
        </div>
      </motion.div>
    </div>
  )
}
