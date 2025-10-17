import { Header } from "@/components/header"
import { ExamplesGallery } from "@/components/examples-gallery"
import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/ui/code-block"
import { Badge } from "@/components/ui/badge"
import { Terminal, FileText, BarChart3, Zap } from "lucide-react"

export default function ExamplesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">DevSum Examples</h1>
            <p className="text-xl text-muted-foreground">
              See DevSum CLI in action with real-world examples and use cases
            </p>
          </div>

          {/* Command Examples */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Terminal className="h-8 w-8 text-primary" />
              Command Examples
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Basic Usage</h3>
                <CodeBlock
                  language="bash"
                  code={`# Generate a commit message for staged changes
devsum commit

# Auto workflow: create branch, commit, and push
devsum commit --auto

# Generate report for last 30 days
devsum report --days 30`}
                />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Advanced Options</h3>
                <CodeBlock
                  language="bash"
                  code={`# Custom output format
devsum report --format json --output report.json

# Specific date range
devsum report --from 2024-01-01 --to 2024-03-31

# Include specific file types only
devsum commit --include "*.ts,*.tsx"`}
                />
              </Card>
            </div>
          </section>

          {/* Output Examples */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Output Examples
            </h2>
            <ExamplesGallery />
          </section>

          {/* Real-world Scenarios */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              Real-world Scenarios
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Sprint Planning</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Generate comprehensive sprint summaries for team retrospectives and planning sessions.
                </p>
                <Badge variant="secondary">Team Management</Badge>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Client Reports</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Create professional progress reports for clients and stakeholders.
                </p>
                <Badge variant="secondary">Client Communication</Badge>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Performance Reviews</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Document your contributions and achievements for annual reviews.
                </p>
                <Badge variant="secondary">Career Development</Badge>
              </Card>
            </div>
          </section>

          {/* Integration Examples */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Integration Examples</h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">GitHub Actions</h3>
                <p className="text-muted-foreground mb-4">
                  Automate report generation in your CI/CD pipeline
                </p>
                <CodeBlock
                  language="yaml"
                  code={`name: Generate DevSum Report
on:
  schedule:
    - cron: '0 0 * * 1' # Weekly on Monday

jobs:
  generate-report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install DevSum
        run: npm install -g @rollenasistores/devsum
      - name: Generate Report
        run: devsum report --format markdown --output weekly-report.md
        env:
          GEMINI_API_KEY: \${{ secrets.GEMINI_API_KEY }}
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: weekly-report
          path: weekly-report.md`}
                />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Slack Integration</h3>
                <p className="text-muted-foreground mb-4">
                  Send weekly reports to your team channel
                </p>
                <CodeBlock
                  language="bash"
                  code={`#!/bin/bash
# Generate weekly report
devsum report --days 7 --format markdown > weekly-report.md

# Send to Slack
curl -X POST -H 'Content-type: application/json' \\
  --data "{\\"text\\":\\"Weekly DevSum Report\\",\\"attachments\\":[{\\"text\\":\\"$(cat weekly-report.md)\\"}]}" \\
  \$SLACK_WEBHOOK_URL`}
                />
              </Card>
            </div>
          </section>

          {/* Getting Started CTA */}
          <Card className="p-8 bg-primary/5 border-primary/20 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Install DevSum CLI and start generating professional commit reports today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CodeBlock
                language="bash"
                code="npm install -g @rollenasistores/devsum"
                className="text-left"
              />
              <a
                href="/docs"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                View Documentation
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
