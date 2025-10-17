"use client"

import { TerminalWindow } from "@/components/ui/terminal-window"
import { motion } from "framer-motion"
import { scrollReveal, staggerChildren, hoverLift } from "@/lib/animations"

export function UsageExamples() {
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
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl">Simple, powerful commands</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base lg:text-lg">Generate reports with a single command</p>
        </motion.div>

        <motion.div 
          className="mx-auto mt-8 max-w-4xl space-y-6 sm:mt-12 sm:space-y-8"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={staggerChildren}>
            <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">Basic usage</h3>
            <motion.div
              variants={hoverLift}
              whileHover="hover"
            >
              <TerminalWindow>
                <div className="space-y-1.5 sm:space-y-2 font-mono text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-accent">$</span>
                    <span className="text-foreground break-all">devsum analyze</span>
                  </div>
                  <div className="ml-4 text-muted-foreground">✓ Analyzing commits from the last 30 days...</div>
                </div>
              </TerminalWindow>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerChildren}>
            <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">Custom date range</h3>
            <motion.div
              variants={hoverLift}
              whileHover="hover"
            >
              <TerminalWindow>
                <div className="space-y-1.5 sm:space-y-2 font-mono text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-accent">$</span>
                    <span className="text-foreground break-all">devsum analyze --since="2024-01-01" --until="2024-03-31"</span>
                  </div>
                  <div className="ml-4 text-muted-foreground">✓ Analyzing Q1 2024 commits...</div>
                </div>
              </TerminalWindow>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerChildren}>
            <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">Export to PDF</h3>
            <motion.div
              variants={hoverLift}
              whileHover="hover"
            >
              <TerminalWindow>
                <div className="space-y-1.5 sm:space-y-2 font-mono text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-accent">$</span>
                    <span className="text-foreground break-all">devsum analyze --format=pdf --output=report.pdf</span>
                  </div>
                  <div className="ml-4 text-muted-foreground">✓ Generated PDF report: report.pdf</div>
                </div>
              </TerminalWindow>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
