import type { ReactNode } from "react"

interface FullPageSectionProps {
  id: string
  children: ReactNode
  className?: string
}

export default function FullPageSection({ id, children, className = "" }: FullPageSectionProps) {
  return (
    <section id={id} className={`relative min-h-screen w-full overflow-hidden ${className}`}>
      <div
        className="scroll-container h-screen overflow-x-hidden overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "var(--color-border-light) transparent" }}
      >
        <div className="flex min-h-full flex-col justify-center pb-10 pt-20">{children}</div>
      </div>
    </section>
  )
}
