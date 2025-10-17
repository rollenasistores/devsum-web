"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useActiveSection } from "@/hooks/use-active-section"
import { useTableOfContents } from "@/hooks/use-table-of-contents"
import {
  BookOpen,
  Download,
  Settings,
  Terminal,
  Sparkles,
  FileText,
  Lightbulb,
  AlertCircle,
  Menu,
  X,
} from "lucide-react"

const navigation = [
  { name: "Getting Started", href: "#getting-started", id: "getting-started", icon: BookOpen },
  { name: "Installation", href: "#installation", id: "installation", icon: Download },
  { name: "Configuration", href: "#configuration", id: "configuration", icon: Settings },
  { name: "Commands Reference", href: "#commands", id: "commands", icon: Terminal },
  { name: "AI Providers", href: "#ai-providers", id: "ai-providers", icon: Sparkles },
  { name: "Output Formats", href: "#output-formats", id: "output-formats", icon: FileText },
  { name: "Use Cases", href: "#use-cases", id: "use-cases", icon: Lightbulb },
  { name: "Troubleshooting", href: "#troubleshooting", id: "troubleshooting", icon: AlertCircle },
]

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sectionIds = navigation.map(item => item.id)
  const activeSection = useActiveSection(sectionIds)
  const { headings, activeHeading } = useTableOfContents(activeSection)
  
  // Debug logging
  console.log('Active section:', activeSection)
  console.log('Section IDs:', sectionIds)
  console.log('Headings:', headings)
  console.log('Active heading:', activeHeading)

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex gap-8">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4 z-50 lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-background transition-transform duration-200 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ScrollArea className="h-full py-6 px-4">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="prose prose-slate dark:prose-invert max-w-none">{children}</div>
        </main>

        {/* Right sidebar - Table of contents */}
        <aside className="hidden xl:block w-64 shrink-0">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-semibold text-sm mb-2">On This Page</h3>
              <div className="space-y-1 text-sm">
                {headings.length > 0 ? (
                  headings.map((heading) => {
                    const isActive = activeHeading === heading.id
                    return (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block py-1 transition-colors ${
                          heading.level === 3 ? 'ml-4' : ''
                        } ${
                          isActive
                            ? 'text-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {heading.text}
                      </a>
                    )
                  })
                ) : (
                  <div className="text-muted-foreground">No headings available</div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
