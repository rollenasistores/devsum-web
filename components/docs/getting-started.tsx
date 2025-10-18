import { Card } from "@/components/ui/card"
import { Terminal, Zap, Shield, Sparkles } from "lucide-react"
import { CodeBlock } from "@/components/ui/code-block"

export function GettingStarted() {
  return (
    <section id="getting-started" className="scroll-mt-20">
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Getting Started</h1>
          <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
            DevSum CLI is an AI-powered tool that transforms your git commits into professional accomplishment reports.
            Get started in minutes.
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
          <Card className="p-4 sm:p-5 w-full">
            <Terminal className="h-6 w-6 text-primary mb-2 sm:h-8 sm:w-8" />
            <h3 className="font-semibold mb-1 text-sm sm:text-base">CLI First</h3>
            <p className="text-xs text-muted-foreground sm:text-sm">Works directly in your terminal</p>
          </Card>
          <Card className="p-4 sm:p-5 w-full">
            <Zap className="h-6 w-6 text-primary mb-2 sm:h-8 sm:w-8" />
            <h3 className="font-semibold mb-1 text-sm sm:text-base">Fast Setup</h3>
            <p className="text-xs text-muted-foreground sm:text-sm">Install and configure in seconds</p>
          </Card>
          <Card className="p-4 sm:p-5 w-full">
            <Shield className="h-6 w-6 text-primary mb-2 sm:h-8 sm:w-8" />
            <h3 className="font-semibold mb-1 text-sm sm:text-base">Secure</h3>
            <p className="text-xs text-muted-foreground sm:text-sm">Your code never leaves your machine</p>
          </Card>
          <Card className="p-4 sm:p-5 w-full">
            <Sparkles className="h-6 w-6 text-primary mb-2 sm:h-8 sm:w-8" />
            <h3 className="font-semibold mb-1 text-sm sm:text-base">AI-Powered</h3>
            <p className="text-xs text-muted-foreground sm:text-sm">Multiple AI providers supported</p>
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h2 id="quick-start" className="text-xl font-bold scroll-mt-20 sm:text-2xl">Quick Start</h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Install DevSum CLI globally and start generating professional commit messages in seconds.
          </p>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 id="install-devsum-cli" className="text-base font-semibold mb-2 scroll-mt-20 sm:text-lg">1. Install DevSum CLI</h3>
              <CodeBlock language="bash" code="npm install -g @rollenasistores/devsum" />
            </div>

            <div>
              <h3 id="configure-ai-provider" className="text-base font-semibold mb-2 scroll-mt-20 sm:text-lg">2. Configure AI Provider</h3>
              <CodeBlock
                language="bash"
                code={`# Set your API key (example with Gemini)
export GEMINI_API_KEY="your-api-key-here"

# Or use the config command
devsum config set provider gemini
devsum config set apiKey your-api-key-here`}
              />
            </div>

            <div>
              <h3 id="generate-first-commit" className="text-base font-semibold mb-2 scroll-mt-20 sm:text-lg">3. Generate Your First Commit</h3>
              <CodeBlock
                language="bash"
                code={`# Navigate to your git repository
cd your-project

# Run devsum commit
devsum commit

# Or use the auto workflow
devsum commit --auto`}
              />
            </div>
          </div>
        </div>

        <Card className="p-4 bg-primary/5 border-primary/20 sm:p-6">
          <h3 className="text-base font-semibold mb-2 flex items-center gap-2 sm:text-lg">
            <Sparkles className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
            Pro Tip
          </h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            Use the <code className="px-1.5 py-0.5 rounded bg-muted text-xs sm:px-2 sm:py-1 sm:text-sm">--auto</code> flag to automatically create a branch,
            generate a commit message, commit, and push in one command.
          </p>
        </Card>
      </div>
    </section>
  )
}
