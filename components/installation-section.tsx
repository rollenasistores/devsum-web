"use client"

import { CodeBlock } from "@/components/ui/code-block"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { scrollReveal, staggerChildren, tabContent, typewriter } from "@/lib/animations"

export function InstallationSection() {
  return (
    <section id="installation" className="border-b border-border bg-secondary/30 py-12 sm:py-16 lg:py-24 xl:py-32">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl">Get started in seconds</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base lg:text-lg">Install DevSum CLI with your favorite package manager</p>
        </motion.div>

        <motion.div 
          className="mx-auto mt-8 max-w-3xl sm:mt-12 lg:mt-16"
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Tabs defaultValue="npm" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TabsList className="grid w-full grid-cols-3 h-9 sm:h-10">
                <TabsTrigger value="npm" className="text-xs sm:text-sm">npm</TabsTrigger>
                <TabsTrigger value="yarn" className="text-xs sm:text-sm">yarn</TabsTrigger>
                <TabsTrigger value="pnpm" className="text-xs sm:text-sm">pnpm</TabsTrigger>
              </TabsList>
            </motion.div>
            
            <TabsContent value="npm" className="mt-4 sm:mt-6">
              <motion.div
                variants={tabContent}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <CodeBlock code="npm install -g @rollenasistores/devsum" language="bash" />
              </motion.div>
            </TabsContent>
            <TabsContent value="yarn" className="mt-4 sm:mt-6">
              <motion.div
                variants={tabContent}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <CodeBlock code="yarn global add @rollenasistores/devsum" language="bash" />
              </motion.div>
            </TabsContent>
            <TabsContent value="pnpm" className="mt-4 sm:mt-6">
              <motion.div
                variants={tabContent}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <CodeBlock code="pnpm add -g @rollenasistores/devsum" language="bash" />
              </motion.div>
            </TabsContent>
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="mt-6 sm:mt-8 border-border bg-card p-4 sm:p-6">
              <h3 className="font-semibold text-card-foreground text-sm sm:text-base">Requirements</h3>
              <motion.ul 
                className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li 
                  className="flex items-center gap-2"
                  variants={staggerChildren}
                >
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  />
                  Node.js 18.0 or higher
                </motion.li>
                <motion.li 
                  className="flex items-center gap-2"
                  variants={staggerChildren}
                >
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  />
                  Git 2.0 or higher
                </motion.li>
                <motion.li 
                  className="flex items-center gap-2"
                  variants={staggerChildren}
                >
                  <motion.div 
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  />
                  API key for your preferred AI provider (Claude, OpenAI, or Gemini)
                </motion.li>
              </motion.ul>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
