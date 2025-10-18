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
    <div className="min-h-screen overflow-x-hidden">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 lg:hidden bg-background/80 backdrop-blur-sm border border-border"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-border bg-background transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Sidebar header */}
            <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
              <h2 className="text-lg font-semibold">Documentation</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-4 py-6">
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 lg:ml-0">
          <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 overflow-x-hidden">
              {children}
            </div>
          </div>
        </main>

        {/* Right sidebar - Table of contents */}
        <aside className="hidden xl:block w-64 shrink-0 border-l border-border">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <div className="p-6">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-semibold text-sm mb-3">On This Page</h3>
                <div className="space-y-1 text-sm">
                  {headings.length > 0 ? (
                    headings.map((heading) => {
                      const isActive = activeHeading === heading.id
                      return (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className={`block py-1.5 transition-colors rounded px-2 ${
                            heading.level === 3 ? 'ml-3' : ''
                          } ${
                            isActive
                              ? 'text-foreground font-medium bg-accent/50'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'
                          }`}
                        >
                          {heading.text}
                        </a>
                      )
                    })
                  ) : (
                    <div className="text-muted-foreground text-xs">No headings available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
