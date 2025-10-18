import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { CheckCircle2 } from "lucide-react"

export function Installation() {
  return (
    <section id="installation" className="scroll-mt-20">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 id="installation-methods" className="text-2xl font-bold tracking-tight scroll-mt-20 sm:text-3xl">Installation</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">Choose your preferred package manager to install DevSum CLI.</p>
        </div>

        <Tabs defaultValue="npm" className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:max-w-md">
            <TabsTrigger value="npm" className="text-xs sm:text-sm">npm</TabsTrigger>
            <TabsTrigger value="yarn" className="text-xs sm:text-sm">Yarn</TabsTrigger>
            <TabsTrigger value="pnpm" className="text-xs sm:text-sm">pnpm</TabsTrigger>
          </TabsList>
          <TabsContent value="npm" className="space-y-3 sm:space-y-4">
            <CodeBlock language="bash" code="npm install -g @rollenasistores/devsum" />
            <p className="text-xs text-muted-foreground sm:text-sm">
              Install globally to use the <code className="px-1 py-0.5 rounded bg-muted text-xs">devsum</code> command from anywhere.
            </p>
          </TabsContent>
          <TabsContent value="yarn" className="space-y-3 sm:space-y-4">
            <CodeBlock language="bash" code="yarn global add @rollenasistores/devsum" />
            <p className="text-xs text-muted-foreground sm:text-sm">
              Install globally with Yarn to access the CLI from any directory.
            </p>
          </TabsContent>
          <TabsContent value="pnpm" className="space-y-3 sm:space-y-4">
            <CodeBlock language="bash" code="pnpm add -g @rollenasistores/devsum" />
            <p className="text-xs text-muted-foreground sm:text-sm">
              Use pnpm for faster installation and better disk space efficiency.
            </p>
          </TabsContent>
        </Tabs>

        <div className="space-y-4 sm:space-y-6">
          <h3 id="system-requirements" className="text-lg font-semibold scroll-mt-20 sm:text-xl">System Requirements</h3>
          <Card className="p-4 sm:p-6">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5 sm:h-5 sm:w-5" />
                <div>
                  <strong className="text-sm sm:text-base">Node.js 18+</strong>
                  <p className="text-xs text-muted-foreground sm:text-sm">Required for running the CLI</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5 sm:h-5 sm:w-5" />
                <div>
                  <strong className="text-sm sm:text-base">Git 2.0+</strong>
                  <p className="text-xs text-muted-foreground sm:text-sm">For repository analysis</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5 sm:h-5 sm:w-5" />
                <div>
                  <strong className="text-sm sm:text-base">AI Provider API Key</strong>
                  <p className="text-xs text-muted-foreground sm:text-sm">Gemini, Claude, or OpenAI</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h3 id="verify-installation" className="text-lg font-semibold scroll-mt-20 sm:text-xl">Verify Installation</h3>
          <CodeBlock
            language="bash"
            code={`# Check version
devsum --version

# View help
devsum --help`}
          />
        </div>
      </div>
    </section>
  )
}
