"use client"

import { useState, useEffect } from "react"

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    // Check for hash in URL on initial load
    const hash = window.location.hash.slice(1)
    if (hash && sectionIds.includes(hash)) {
      setActiveSection(hash)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible
        let mostVisible = ""
        let maxRatio = 0

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            mostVisible = entry.target.id
          }
        })

        if (mostVisible) {
          setActiveSection(mostVisible)
        }
      },
      {
        rootMargin: "-10% 0px -50% 0px", // More lenient margins
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    )

    // Also add a scroll listener as fallback
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for header
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i])
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= scrollPosition) {
            setActiveSection(sectionIds[i])
            break
          }
        }
      }
    }

    // Observe all sections with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.observe(element)
        }
      })
      
      // Add scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds])

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [sectionIds])

  return activeSection
}
