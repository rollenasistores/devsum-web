import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const issues = [
  {
    problem: "API Key Not Found",
    solution: "Ensure your API key is set in environment variables or configuration file",
    steps: [
      "Check if environment variable is set: echo $GEMINI_API_KEY",
      "Set the API key: export GEMINI_API_KEY='your-key'",
      "Or use config: devsum config set apiKey your-key",
      "Verify: devsum config get apiKey",
    ],
  },
  {
    problem: "Git Repository Not Found",
    solution: "DevSum CLI must be run inside a git repository",
    steps: [
      "Navigate to your git repository: cd your-project",
      "Verify git is initialized: git status",
      "If not initialized: git init",
      "Try running devsum again",
    ],
  },
  {
    problem: "No Changes Detected",
    solution: "Ensure you have staged or unstaged changes in your repository",
    steps: [
      "Check git status: git status",
      "Stage changes: git add .",
      "Or use --all flag: devsum commit --all",
      "Verify changes are present",
    ],
  },
  {
    problem: "Rate Limit Exceeded",
    solution: "You've hit the API rate limit for your provider",
    steps: [
      "Wait a few minutes before retrying",
      "Check your API provider's rate limits",
      "Consider upgrading your API plan",
      "Use a different provider temporarily",
    ],
  },
]

export function Troubleshooting() {
  return (
    <section id="troubleshooting" className="scroll-mt-20">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 id="troubleshooting-overview" className="text-2xl font-bold tracking-tight scroll-mt-20 sm:text-3xl">Troubleshooting</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
            Common issues and their solutions to help you get back on track quickly.
          </p>
        </div>

        <Alert className="text-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-sm sm:text-base">Need More Help?</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            If you encounter an issue not listed here, please open an issue on{" "}
            <a href="https://github.com/rollenasistores/devsum/issues" className="underline">
              GitHub
            </a>{" "}
            or join our community Discord.
          </AlertDescription>
        </Alert>

        <div className="space-y-4 sm:space-y-6">
          {issues.map((issue, index) => (
            <Card key={index} className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-destructive mb-2 flex items-center gap-2 sm:text-lg">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    {issue.problem}
                  </h3>
                  <p className="text-sm text-muted-foreground sm:text-base">{issue.solution}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:mb-3 sm:text-base">
                    <CheckCircle2 className="h-3 w-3 text-accent sm:h-4 sm:w-4" />
                    Solution Steps
                  </h4>
                  <ol className="space-y-1.5 sm:space-y-2">
                    {issue.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex gap-2 text-xs sm:gap-3 sm:text-sm">
                        <span className="font-semibold text-muted-foreground shrink-0">{stepIndex + 1}.</span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 bg-accent/5 border-accent/20 sm:p-6">
          <h3 id="enable-debug-mode" className="text-base font-semibold mb-3 scroll-mt-20 sm:text-lg sm:mb-4">Enable Debug Mode</h3>
          <p className="text-sm text-muted-foreground mb-3 sm:text-base sm:mb-4">
            For detailed error information, run DevSum CLI with debug logging enabled:
          </p>
          <CodeBlock language="bash" code="DEBUG=devsum:* devsum commit" />
        </Card>
      </div>
    </section>
  )
}
