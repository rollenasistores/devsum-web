import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { Badge } from "@/components/ui/badge"

const commands = [
  {
    name: "devsum commit",
    description: "Generate and create a commit with AI-generated message",
    flags: [
      { flag: "--auto", description: "Auto workflow: create branch, commit, and push" },
      { flag: "--no-verify", description: "Skip git hooks" },
      { flag: "--amend", description: "Amend the last commit" },
      { flag: "--push", description: "Automatically push after commit" },
    ],
    example: "devsum commit --auto",
  },
  {
    name: "devsum analyze",
    description: "Analyze git history and generate accomplishment report",
    flags: [
      { flag: "--since <date>", description: "Start date for analysis (e.g., '2024-01-01')" },
      { flag: "--until <date>", description: "End date for analysis" },
      { flag: "--author <name>", description: "Filter by author" },
      { flag: "--branch <name>", description: "Analyze specific branch" },
      { flag: "--output <file>", description: "Save report to file" },
    ],
    example: "devsum analyze --since 2024-01-01 --output report.md",
  },
  {
    name: "devsum report",
    description: "Generate formatted report from git history",
    flags: [
      { flag: "--format <type>", description: "Output format: markdown, json, html, pdf" },
      { flag: "--template <name>", description: "Use custom template" },
      { flag: "--group-by <field>", description: "Group commits by: date, author, type" },
    ],
    example: "devsum report --format pdf --group-by type",
  },
  {
    name: "devsum config",
    description: "Manage configuration settings",
    flags: [
      { flag: "set <key> <value>", description: "Set configuration value" },
      { flag: "get <key>", description: "Get configuration value" },
      { flag: "list", description: "List all configuration" },
      { flag: "reset", description: "Reset to default configuration" },
    ],
    example: "devsum config set provider gemini",
  },
  {
    name: "devsum init",
    description: "Initialize DevSum CLI in current repository",
    flags: [
      { flag: "--provider <name>", description: "Set AI provider during init" },
      { flag: "--interactive", description: "Interactive setup wizard" },
    ],
    example: "devsum init --interactive",
  },
]

export function CommandsReference() {
  return (
    <section id="commands" className="scroll-mt-20">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 id="commands-overview" className="text-2xl font-bold tracking-tight scroll-mt-20 sm:text-3xl">Commands Reference</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
            Complete reference for all DevSum CLI commands and their options.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {commands.map((command) => (
            <Card key={command.name} className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:gap-3">
                    <code className="text-base font-semibold text-primary sm:text-lg break-all overflow-hidden">{command.name}</code>
                    <Badge variant="secondary" className="w-fit text-xs shrink-0">Command</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-base">{command.description}</p>
                </div>

                {command.flags.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Flags & Options</h4>
                    <div className="space-y-2">
                      {command.flags.map((flag) => (
                        <div key={flag.flag} className="flex flex-col gap-1 text-xs sm:flex-row sm:gap-4 sm:text-sm">
                          <code className="text-accent shrink-0 font-mono text-xs break-all overflow-hidden sm:text-sm">{flag.flag}</code>
                          <span className="text-muted-foreground text-xs sm:text-sm break-words">{flag.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Example</h4>
                  <CodeBlock language="bash" code={command.example} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
