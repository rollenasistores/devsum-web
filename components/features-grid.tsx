"use client"

import { Card } from "@/components/ui/card"
import { Sparkles, Zap, FileText, Filter, Workflow, Palette, GitBranch, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { scrollReveal, staggerCards, staggerCard, hoverLift, hoverGlow, breathe } from "@/lib/animations"

const features = [
  {
    icon: MessageSquare,
    title: "Smart Commit Messages",
    description: "AI generates conventional commit messages (feat:, fix:, docs:) with detailed descriptions of your changes.",
  },
  {
    icon: GitBranch,
    title: "Branch Automation",
    description: "Auto-generate branch names, easy switching, and conflict prevention. Never worry about branch management again.",
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description: "Full automation: add files, commit, push, and generate reports. Integrate with CI/CD pipelines seamlessly.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Analysis",
    description: "Leverage Claude, GPT-4, or Gemini to transform raw commits into professional narratives.",
  },
  {
    icon: FileText,
    title: "Multiple Formats",
    description: "Export to Markdown, JSON, HTML, or PDF. Perfect for any workflow or documentation system.",
  },
  {
    icon: Filter,
    title: "Flexible Filtering",
    description: "Filter by date range, author, branch, or file patterns. Get exactly the commits you need.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with caching and parallel processing. Analyze thousands of commits in seconds.",
  },
  {
    icon: Palette,
    title: "Beautiful Terminal UI",
    description: "Enjoy a polished CLI experience with progress indicators, colors, and interactive prompts.",
  },
]

export function FeaturesGrid() {
  return (
    <section className="border-b border-border bg-background py-12 sm:py-16 lg:py-24 xl:py-32">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
            Everything you need to summarize your work
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base lg:text-lg">
            Powerful features designed for developers who value their time
          </p>
        </motion.div>

        <motion.div 
          className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          variants={staggerCards}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={staggerCard}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={hoverLift}
                className="h-full"
              >
                <Card
                  className="group relative overflow-hidden border-border bg-card p-4 sm:p-6 transition-colors hover:border-primary/50 h-full"
                >
                  <motion.div 
                    className="flex items-start gap-3 sm:gap-4"
                    variants={breathe}
                    animate="animate"
                  >
                    <motion.div 
                      className="rounded-lg bg-primary/10 p-1.5 sm:p-2 text-primary flex-shrink-0"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -5, 5, -5, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <feature.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-card-foreground text-sm sm:text-base">{feature.title}</h3>
                      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    variants={hoverGlow}
                  />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
