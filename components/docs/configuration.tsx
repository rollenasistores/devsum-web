import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function Configuration() {
  return (
    <section id="configuration" className="scroll-mt-20">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 id="configuration-overview" className="text-2xl font-bold tracking-tight scroll-mt-20 sm:text-3xl">Configuration</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">Configure DevSum CLI to match your workflow and preferences.</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h3 id="configuration-file" className="text-lg font-semibold scroll-mt-20 sm:text-xl">Configuration File</h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            DevSum CLI looks for a <code className="px-1.5 py-0.5 rounded bg-muted text-xs sm:px-2 sm:py-1 sm:text-sm">.devsumrc.json</code> file in your project root or home directory.
          </p>
          <CodeBlock
            language="json"
            code={`{
  "provider": "gemini",
  "model": "gemini-2.0-flash",
  "outputFormat": "markdown",
  "autoCommit": false,
  "autoPush": false,
  "branchPrefix": "feature/",
  "commitStyle": "conventional",
  "maxTokens": 2000,
  "temperature": 0.7
}`}
          />
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h3 id="configuration-options" className="text-lg font-semibold scroll-mt-20 sm:text-xl">Configuration Options</h3>
          <div className="space-y-3 sm:space-y-4">
            <Card className="p-3 sm:p-4">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">provider</h4>
              <p className="text-xs text-muted-foreground mb-2 sm:text-sm">
                AI provider to use: <code className="px-1 py-0.5 rounded bg-muted text-xs">gemini</code>, <code className="px-1 py-0.5 rounded bg-muted text-xs">claude</code>, or <code className="px-1 py-0.5 rounded bg-muted text-xs">openai</code>
              </p>
              <CodeBlock language="bash" code="devsum config set provider gemini" />
            </Card>

            <Card className="p-3 sm:p-4">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">model</h4>
              <p className="text-xs text-muted-foreground mb-2 sm:text-sm">
                Specific model to use (e.g., <code className="px-1 py-0.5 rounded bg-muted text-xs">gemini-2.0-flash</code>, <code className="px-1 py-0.5 rounded bg-muted text-xs">claude-3-5-sonnet</code>)
              </p>
              <CodeBlock language="bash" code="devsum config set model gemini-2.0-flash" />
            </Card>

            <Card className="p-3 sm:p-4">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">outputFormat</h4>
              <p className="text-xs text-muted-foreground mb-2 sm:text-sm">
                Output format: <code className="px-1 py-0.5 rounded bg-muted text-xs">markdown</code>, <code className="px-1 py-0.5 rounded bg-muted text-xs">json</code>, <code className="px-1 py-0.5 rounded bg-muted text-xs">html</code>, or <code className="px-1 py-0.5 rounded bg-muted text-xs">pdf</code>
              </p>
              <CodeBlock language="bash" code="devsum config set outputFormat markdown" />
            </Card>

            <Card className="p-3 sm:p-4">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">commitStyle</h4>
              <p className="text-xs text-muted-foreground mb-2 sm:text-sm">
                Commit message style: <code className="px-1 py-0.5 rounded bg-muted text-xs">conventional</code>, <code className="px-1 py-0.5 rounded bg-muted text-xs">semantic</code>, or <code className="px-1 py-0.5 rounded bg-muted text-xs">custom</code>
              </p>
              <CodeBlock language="bash" code="devsum config set commitStyle conventional" />
            </Card>
          </div>
        </div>

        <Alert className="text-sm">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs sm:text-sm">
            Environment variables take precedence over configuration file settings. Use <code className="px-1 py-0.5 rounded bg-muted text-xs">DEVSUM_PROVIDER</code>,{" "}
            <code className="px-1 py-0.5 rounded bg-muted text-xs">GEMINI_API_KEY</code>, etc.
          </AlertDescription>
        </Alert>

        <div className="space-y-4 sm:space-y-6">
          <h3 id="environment-variables" className="text-lg font-semibold scroll-mt-20 sm:text-xl">Environment Variables</h3>
          <CodeBlock
            language="bash"
            code={`# AI Provider API Keys
export GEMINI_API_KEY="your-gemini-key"
export ANTHROPIC_API_KEY="your-claude-key"
export OPENAI_API_KEY="your-openai-key"

# Configuration overrides
export DEVSUM_PROVIDER="gemini"
export DEVSUM_MODEL="gemini-2.0-flash"
export DEVSUM_OUTPUT_FORMAT="markdown"`}
          />
        </div>
      </div>
    </section>
  )
}
