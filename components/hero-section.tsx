"use client"

import { Button } from "@/components/ui/button"
import { Github, ArrowRight } from "lucide-react"
import { TerminalWindow } from "@/components/ui/terminal-window"
import { AnimatedTerminal } from "@/components/animated-terminal"
import { VersionBadgeClient } from "@/components/version-badge-client"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, staggerChildren, float, pulse, hoverScale, hoverGlow } from "@/lib/animations"
import { Parallax } from "@/components/scroll-effects"
import { TypewriterText } from "@/components/typewriter-text"
import { ConstellationBackground } from "@/components/constellation-background"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border min-h-[100vh] sm:min-h-screen flex items-center">
      <ConstellationBackground />
      
      {/* Additional gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/30" />

      <div className="relative mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12 lg:px-6 lg:py-16 xl:py-24">
        <motion.div 
          className="mx-auto max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <VersionBadgeClient className="mb-2 sm:mb-3 lg:mb-4" />
          </motion.div>

              <motion.h1
                className="text-lg font-bold tracking-tight text-foreground sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-balance leading-tight break-words"
                variants={fadeInUp}
              >
                  <TypewriterText
                    text="Transform Git Commits into Professional Reports"
                    speed={5}
                    delay={50}
                    className="text-foreground break-words"
                    loop={true}
                    highlightWords={["Git Commits"]}
                    highlightClassName="text-primary font-bold bg-primary/10 px-1 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg break-words"
                  />
              </motion.h1>

          <motion.p 
            className="mt-2 text-xs leading-relaxed text-muted-foreground text-pretty sm:mt-3 sm:text-sm md:text-base lg:text-lg max-w-sm sm:max-w-md lg:max-w-lg mx-auto break-words"
            variants={fadeInUp}
          >
            DevSum CLI uses AI to analyze your git history and generate polished accomplishment summaries. Perfect for
            performance reviews, sprint reports, and project updates.
          </motion.p>

          <motion.div 
            className="mt-4 flex flex-col items-center justify-center gap-2 sm:mt-6 sm:flex-row sm:gap-3 lg:gap-4 w-full"
            variants={staggerChildren}
          >
            <motion.div variants={hoverScale} className="w-full max-w-xs sm:w-auto sm:max-w-none">
              <Button size="sm" className="gap-2 w-full sm:w-auto sm:size-lg text-xs sm:text-sm" asChild>
                <Link href="/docs">
                  Get Started
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
            <motion.div variants={hoverScale} className="w-full max-w-xs sm:w-auto sm:max-w-none">
              <Button size="sm" variant="outline" className="gap-2 bg-transparent w-full sm:w-auto sm:size-lg text-xs sm:text-sm" asChild>
                <Link href="https://github.com/rollenasistores/devsum" target="_blank" rel="noopener noreferrer">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                  </motion.div>
                  View on GitHub
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground sm:mt-4 sm:gap-3 lg:gap-4 lg:text-sm"
            variants={staggerChildren}
          >
            <motion.div 
              className="flex items-center gap-1 sm:gap-1.5"
              variants={fadeInUp}
            >
              <motion.div 
                className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-accent"
                variants={pulse}
                animate="animate"
              />
              <span>Open Source</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1 sm:gap-1.5"
              variants={fadeInUp}
            >
              <motion.div 
                className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-accent"
                variants={pulse}
                animate="animate"
              />
              <span>TypeScript</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1 sm:gap-1.5"
              variants={fadeInUp}
            >
              <motion.div 
                className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-accent"
                variants={pulse}
                animate="animate"
              />
              <span>AI-Powered</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mx-auto mt-4 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-3xl xl:max-w-4xl sm:mt-8 lg:mt-12 xl:mt-16 mt-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
              rotateX: [0, 5, 0],
              rotateY: [0, 2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -15,
              rotateX: 10,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            {/* 3D shadow effect */}
            <div 
              className="absolute inset-0 bg-primary/20 blur-xl scale-110 -z-10"
              style={{
                transform: "translateZ(-50px) rotateX(10deg)"
              }}
            />
            <TerminalWindow>
              <AnimatedTerminal />
            </TerminalWindow>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
