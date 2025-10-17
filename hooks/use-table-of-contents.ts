"use client"

import { useState, useEffect } from "react"

interface Heading {
  id: string
  text: string
  level: number
  element: HTMLElement
}

export function useTableOfContents(activeSection: string) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeHeading, setActiveHeading] = useState<string>("")

  useEffect(() => {
    if (!activeSection) {
      setHeadings([])
      setActiveHeading("")
      return
    }

    // Find the active section element
    const sectionElement = document.getElementById(activeSection)
    if (!sectionElement) {
      setHeadings([])
      setActiveHeading("")
      return
    }

    // Extract H2 and H3 headings from the active section
    const headingElements = sectionElement.querySelectorAll('h2, h3')
    const extractedHeadings: Heading[] = []

    headingElements.forEach((element) => {
      const htmlElement = element as HTMLElement
      const text = htmlElement.textContent || ""
      const level = parseInt(htmlElement.tagName.charAt(1))
      
      // Generate ID if not present
      let id = htmlElement.id
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim()
        htmlElement.id = id
      }

      // Add scroll margin for proper offset
      htmlElement.classList.add('scroll-mt-20')

      extractedHeadings.push({
        id,
        text,
        level,
        element: htmlElement
      })
    })

    setHeadings(extractedHeadings)

    // Set up intersection observer for the headings
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = ""
        let maxRatio = 0

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            mostVisible = entry.target.id
          }
        })

        if (mostVisible) {
          setActiveHeading(mostVisible)
        }
      },
      {
        rootMargin: "-10% 0px -60% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    )

    // Observe all headings
    extractedHeadings.forEach((heading) => {
      observer.observe(heading.element)
    })

    return () => {
      observer.disconnect()
    }
  }, [activeSection])

  return { headings, activeHeading }
}
