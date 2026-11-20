import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata = {
  title: "Ashtone Onyango Omondi | AI Software Engineer",
  description:
    "AI Software Engineer building dependable agentic AI, LLM applications, backend services and cloud infrastructure for healthcare, social impact and enterprise operations.",
  keywords: ["AI Software Engineer", "Agentic AI", "LLM Systems", "Backend Engineering", "Nairobi", "RAG"],
  authors: [{ name: "Ashtone Onyango Omondi" }],
  openGraph: {
    title: "Ashtone Onyango Omondi | AI Software Engineer",
    description: "Production AI systems, backend engineering and software for meaningful impact.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
