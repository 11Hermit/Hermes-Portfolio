"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Layers3 } from "lucide-react"

const projects = [
  {
    title: "DriveSmart AI",
    category: "Conversational AI · Driver education",
    description: "A WhatsApp-first assistant that helps driving-school learners get answers from their school’s training materials through text, voice and road-sign photos.",
    image: "/images/drivesmart.png",
    url: "https://drivesmart.wanailabs.org",
    demoUrl: "https://drivesmart.wanailabs.org",
    technologies: ["Python", "RAG", "LLMs", "WhatsApp API", "Speech-to-text", "Computer vision", "React"],
  },
  {
    title: "MleziBora · The Action Foundation",
    category: "Agentic AI · Caregiver support",
    description: "A retrieval-grounded assistant for caregivers’ medical and legal questions, designed around a curated knowledge base and evaluation against 300 test questions. Supported 1,000+ caregivers, handled 15,000+ conversations in its first quarter, and reduced response times from about a day to under three seconds.",
    image: "/images/mlezibora.png",
    url: "https://aichat.theactionfoundationkenya.org",
    demoUrl: "https://youtu.be/ThHj96FBxKU?si=_W0rEQUzO7_qdkKo",
    technologies: ["Python", "RAG", "LangChain", "Vector search", "WhatsApp API", "Evaluation pipeline", "React"],
  },
  {
    title: "CDIE Smart Lab",
    category: "LLM document processing · Education",
    description: "An LLM-powered laboratory management system that turns dense standard operating procedures into structured preparation and assessment workflows for a university community of 10,000+ users.",
    image: "/images/cdie.png",
    url: "https://app.cdie.co.ke",
    demoUrl: "https://youtu.be/lrh9dhsFyHc?si=ZONmBUTOarUqLWMi",
    technologies: ["Python", "FastAPI", "PostgreSQL", "LLMs", "Document processing", "LLM evaluation", "React"],
  },
  {
    title: "Agian Solutions",
    category: "Employment technology · Operations",
    description: "A multi-stakeholder employment platform connecting Kenyan job seekers, placement partners and employers, with placement verification and outcome tracking across all 47 counties.",
    image: "/images/agian.png",
    url: "https://jobs.agiansolutions.co.ke",
    demoUrl: "https://jobs.agiansolutions.co.ke",
    technologies: ["Node.js", "React", "PostgreSQL", "REST APIs", "Workflow automation", "Analytics"],
  },
  {
    title: "TenderAI",
    category: "Applied AI · Document analysis",
    description: "An AI-assisted tender discovery and analysis workflow that extracts requirements from procurement documents, scores opportunities and helps teams prioritize bid preparation.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-07-27%2019-31-22-vjN6s5MwLpXPuYfWeBIIZzxcuyfypg.png",
    url: "https://tenderai-rosy.vercel.app/",
    technologies: ["Python", "LLMs", "Document extraction", "Semantic search", "Web scraping", "React"],
  },
  {
    title: "Bootyque POS",
    category: "Product engineering · Retail",
    description: "A point-of-sale and inventory platform for boutique retailers, bringing product management, sales, customer records and multi-outlet operations into one responsive workflow.",
    image: "https://res.cloudinary.com/di2rbwzyd/image/upload/v1764925134/bootyque_yegnb9.png",
    url: "https://bootyque.wanailabs.org",
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "PWA", "Role-based access"],
  },
  {
    title: "Ruphids Autotech Solutions",
    category: "Web platform · School security",
    description: "A web presence for school attendance and security systems, including biometric verification and real-time parent notifications.",
    image: "/images/ruphids-hero.png",
    url: "https://v0-rhupids.vercel.app/",
    technologies: ["React", "Python", "Computer vision", "Biometric systems", "SMS API", "Cloud services"],
  },
  {
    title: "Chesapeake Stays",
    category: "Applied AI · Property data",
    description: "A lead-qualification workflow that uses NLP and retrieval to turn unstructured property information into more useful, ranked opportunities.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Pcd5bqXWs0OL3CyqYqQrRlQ2CsIDtn.png",
    url: "https://chesapeake-leads.vercel.app/",
    technologies: ["Python", "NLP", "RAG", "LLMs", "Vector search", "React"],
  },
  {
    title: "Rapid Medical Support",
    category: "Public-interest software · Health",
    description: "An accessible, mobile-first emergency guidance experience for first aid information, emergency contacts and location sharing, with offline-ready access for low-connectivity settings.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-07-27%2021-37-55-iNyxLOfhEM30EkPpQljtD3UODBhC51.png",
    url: "https://doc-waqo-wan-ai-labs.vercel.app",
    technologies: ["React", "PWA", "Gemini", "Geolocation", "Service workers", "WhatsApp/SMS links"],
  },
  {
    title: "Kujia Jobs Mtandao",
    category: "Employment technology · Job platform",
    description: "A mobile-first Kenyan job board connecting job seekers with curated opportunities, career resources and employer tools, with an emphasis on verification and trust.",
    image: "/images/kujiajobs-mtandao-hero.png",
    url: "https://kujia-jobs-mtandao.vercel.app/",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Search and filtering", "Responsive UI"],
  },
  {
    title: "Kujia Placements · Semantic Job Matching",
    category: "Search & matching · Kujia Digitize",
    description: "A semantic matching engine for 5,000+ job seekers, built to rank opportunities by meaning and relevance. It handles 1,000+ daily queries on AWS Lambda, achieved 90% matching accuracy and reduced manual screening effort by 70%.",
    image: "/images/kujiajobs-mtandao-hero.png",
    url: "https://kujia-jobs-mtandao.vercel.app/",
    technologies: ["Python", "Embeddings", "Semantic search", "Collaborative filtering", "AWS Lambda", "REST APIs"],
  },
  {
    title: "WeShareApps · Partner Integrations",
    category: "Software distribution · Technical partnership",
    description: "Led the cross-border engineering partnership between Kujia and London-based WeShareApps—scoping API work, aligning milestones across time zones and delivering three partner integrations on schedule.",
    image: "/images/kujiajobs-mtandao-hero.png",
    technologies: ["REST APIs", "OAuth 2.0", "Webhooks", "TypeScript", "Node.js", "CI/CD"],
  },
  {
    title: "Infant Pneumonia Risk Detection",
    category: "Applied ML · Huawei Global Innovator Award",
    description: "Built a neural network from scratch on 5,000+ rows of IoT sensor data to estimate infant pneumonia risk, achieving 80% accuracy. Recognized at the Huawei Global Innovator Summit in Johannesburg.",
    image: "/images/cdie.png",
    technologies: ["Python", "TensorFlow", "Neural networks", "IoT sensor data", "Predictive modeling"],
  },
]

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="client-card group flex h-full flex-col overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="section-label mb-2">{project.category}</p>
        <h3 className="card-title text-xl text-foreground sm:text-2xl">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{project.description}</p>
        <div className="mt-5 border-t border-border pt-4">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground"><Layers3 className="size-4 text-primary" aria-hidden="true" /> Architecture & tools</p>
          <ul className="flex flex-wrap gap-2" aria-label={`Technologies for ${project.title}`}>
            {project.technologies.map((technology) => <li key={technology} className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground">{technology}</li>)}
          </ul>
        </div>
        <div className="mt-5 flex flex-wrap gap-4">
          {project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">Visit project <ArrowUpRight className="size-4" aria-hidden="true" /></a> : <span className="text-sm text-muted-foreground">Partner engagement · no public demo</span>}
          {project.demoUrl && project.demoUrl !== project.url && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">Watch demo <ArrowUpRight className="size-4" aria-hidden="true" /></a>}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section className="container mx-auto max-w-7xl px-6 py-12 sm:px-10" aria-labelledby="projects-title">
      <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label mb-3">Selected systems · 2022—2026</p>
          <h2 id="projects-title" className="hero-heading text-4xl font-bold text-foreground sm:text-5xl">Built for real users.</h2>
        </div>
        <p className="max-w-lg text-sm leading-6 text-muted-foreground">A selection of AI products, backend systems and public-interest software. Each case study calls out the architecture and tools behind the work.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
      </div>
    </section>
  )
}
