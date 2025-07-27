"use client"

import dynamic from "next/dynamic"

// Dynamically import non-critical components with client-side only rendering
export const DynamicFloatingNav = dynamic(() => import("./floating-nav"), {
  ssr: false,
  loading: () => null,
})
