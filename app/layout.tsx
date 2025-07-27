import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import PhilosophicalBackground from "./components/PhilosophicalBackground"
import FloatingParticles from "./components/FloatingParticles"
import ScrollToTop from "./components/ScrollToTop"
import VoiceAgent from "./components/VoiceAgent"
import { DynamicFloatingNav } from "./components/client-components"

const inter = Inter({ subsets: ["latin"], display: "swap" })

// Update metadata
export const metadata = {
  title: "Ashtone Onyango - Full Stack Engineer & AI Developer",
  description:
    "Portfolio of Ashtone Onyango, a Full Stack Engineer specializing in GraphQL, Angular, .NET, and AI solutions.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PhilosophicalBackground />
          <FloatingParticles />
          <ScrollToTop />
          <VoiceAgent />
          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>
          <DynamicFloatingNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
