export interface MockOutput {
  content: string;
  type: 'markdown' | 'json' | 'html' | 'text' | 'error';
  delay?: number;
}

export interface CommandPattern {
  pattern: RegExp;
  output: MockOutput;
  suggestions?: string[];
}

// Mock outputs for different CLI commands
export const mockOutputs: Record<string, MockOutput> = {
  'help': {
    content: `DevSum CLI v1.2.3
AI-powered git commit analysis and report generation

USAGE:
  devsum <command> [options]

COMMANDS:
  setup     Configure DevSum settings and AI providers
  login     View authentication status and free mode info
  report    Generate accomplishment reports from git commits
  analyze   Analyze git commits and generate summary (alias for report)
  commit    Generate AI-powered commit messages
  analytics Interactive analytics dashboard
  update    Check for DevSum updates
  telemetry Manage usage tracking settings

OPTIONS:
  -v, --version    Display version number
  -h, --help       Display help information

EXAMPLES:
  $ devsum setup                    # Interactive configuration
  $ devsum analyze --since 7d       # Analyze commits for last 7 days
  $ devsum analyze --format=pdf     # Export to PDF
  $ devsum commit --auto            # Generate and commit with AI
  $ devsum update                   # Check for updates
  $ devsum login                    # View free mode info
  $ devsum telemetry --status       # Manage usage tracking

DOCUMENTATION:
  https://devsum.rollenasistores.site/

For more information on a specific command, use 'devsum <command> --help'`,
    type: 'text',
    delay: 200
  },

  'version': {
    content: '1.2.3',
    type: 'text',
    delay: 100
  },

  'report-help': {
    content: `Usage: devsum report [options]

Generate accomplishment report from git commits

Options:
  -s, --since <date>        Include commits since this date (YYYY-MM-DD, "today", or relative like "7d")
  -u, --until <date>        Include commits until this date (YYYY-MM-DD or "today")
  -a, --author <name>       Filter commits by author name
  -o, --output <path>       Output file path
  -f, --format <format>     Output format (markdown|json|html|txt) (default: "markdown")
  -l, --length <length>     Report length (light|short|detailed) (default: "detailed")
  --light                   Shortcut for --length light (brief executive summary)
  --short                   Shortcut for --length short (quick daily update)
  --detailed                Shortcut for --length detailed (comprehensive analysis)
  --no-header               Skip the fancy header display
  --today                   Shortcut for --since today (get commits from today only)
  -p, --provider <name>     Use specific AI provider by name
  --list-providers          List available AI providers and exit
  --list-models             List available models for configured providers and exit
  -h, --help                Display help for command

Examples:
  $ devsum report --since 7d
  $ devsum report --since 2024-01-01 --until 2024-01-31
  $ devsum report --format json --output report.json
  $ devsum report --light --today`,
    type: 'text',
    delay: 150
  },

  'commit-help': {
    content: `Usage: devsum commit [options]

Generate AI-powered commit messages from your changes (auto mode enabled by default)

Options:
  -a, --auto                Full automation: generate branch, add files, commit with detailed messages, and optionally push (enabled by default)
  --no-auto                 Disable auto mode and use interactive mode instead
  -c, --conventional        Generate conventional commit format
  -e, --emoji               Include emojis in commit message
  -l, --length <length>     Message length (short|medium|detailed). Auto mode uses detailed by default. (default: "medium")
  -p, --provider <name>     Use specific AI provider by name
  --dry-run                 Show what would be committed without actually committing
  --no-header               Skip the fancy header display
  -b, --branch <name>       Create and switch to a new branch before committing
  --new-branch <name>       Create a new branch (alias for --branch)
  -s, --switch-branch <name> Switch to an existing branch before committing
  --list-branches           List all available branches and exit
  --auto-branch             Auto-generate branch name and ask for confirmation
  --auto-add                Automatically add all changes (git add .)
  --auto-push               Automatically push after committing
  --report                  Generate a report for today's commits after committing
  -h, --help                Display help for command

Examples:
  $ devsum commit
  $ devsum commit --dry-run
  $ devsum commit --conventional --emoji
  $ devsum commit --auto --auto-push`,
    type: 'text',
    delay: 150
  },

  'report-weekly': {
    content: `# 📊 DevSum Report - Last 7 Days

**Period:** December 15-21, 2024  
**Total Commits:** 23  
**Files Changed:** 45  
**Lines Added:** 1,247  
**Lines Removed:** 389  

## 🚀 Major Accomplishments

### Frontend Development
- **New Feature:** Implemented interactive CLI testing environment
  - Added terminal simulator component with command history
  - Built mock output database with realistic responses
  - Created command parser with autocomplete support
  - Integrated with examples page for hands-on demo

- **UI/UX Improvements:** Enhanced examples page design
  - Added animated terminal interface
  - Improved mobile responsiveness
  - Added syntax highlighting for code blocks
  - Implemented smooth scrolling effects

### Backend Infrastructure
- **API Development:** Created new endpoints for CLI simulation
  - Built command execution API with security measures
  - Added rate limiting and input validation
  - Implemented mock data generation system

- **Performance Optimization:** Improved application speed
  - Reduced bundle size by 15%
  - Optimized image loading with lazy loading
  - Added caching for static assets

## 🔧 Technical Details

### Code Quality Metrics
- **Test Coverage:** 87% (↑3% from last week)
- **TypeScript Coverage:** 94%
- **ESLint Issues:** 0 (↓2 from last week)
- **Bundle Size:** 2.1MB (↓0.3MB from last week)

### Git Activity
- **Most Active Files:**
  - \`components/interactive-terminal.tsx\` (12 commits)
  - \`lib/mock-cli-outputs.ts\` (8 commits)
  - \`app/examples/page.tsx\` (6 commits)

- **Commit Patterns:**
  - Feature commits: 45%
  - Bug fixes: 30%
  - Documentation: 15%
  - Refactoring: 10%

## 🎯 Next Week's Focus
- Complete interactive terminal polish
- Add more command variations to mock database
- Implement mobile-optimized terminal controls
- Create comprehensive documentation

---
*Generated by DevSum CLI v1.2.3*`,
    type: 'markdown',
    delay: 800
  },

  'report-monthly': {
    content: `# 📈 DevSum Report - December 2024

**Period:** December 1-31, 2024  
**Total Commits:** 127  
**Files Changed:** 234  
**Lines Added:** 8,456  
**Lines Removed:** 2,891  

## 🏆 Monthly Highlights

### Major Features Delivered
1. **Interactive CLI Testing Environment**
   - Complete terminal simulator with realistic outputs
   - Command autocomplete and history navigation
   - Multiple output format support (markdown, JSON, HTML)
   - Mobile-responsive design

2. **Enhanced Documentation System**
   - Comprehensive command reference
   - Interactive examples gallery
   - Step-by-step setup guides
   - Troubleshooting documentation

3. **Performance Optimizations**
   - 25% faster page load times
   - 30% reduction in bundle size
   - Improved Core Web Vitals scores
   - Better mobile performance

### Technical Achievements
- **Code Quality:** Maintained 90%+ test coverage
- **Security:** Implemented comprehensive input validation
- **Accessibility:** Achieved WCAG 2.1 AA compliance
- **SEO:** Improved Lighthouse scores across all pages

### Team Collaboration
- **Code Reviews:** 100% of PRs reviewed
- **Documentation:** Updated all API documentation
- **Knowledge Sharing:** Conducted 3 technical workshops

## 📊 Detailed Metrics

### Development Velocity
- **Average Commits/Day:** 4.1
- **Feature Completion Rate:** 95%
- **Bug Resolution Time:** 2.3 days average
- **Code Review Turnaround:** 4.2 hours average

### Technology Stack Updates
- **Dependencies:** Updated 15 packages
- **Security Patches:** Applied 8 critical updates
- **New Tools:** Integrated 3 new development tools
- **Deprecations:** Removed 2 legacy components

## 🎯 December Goals Achieved
- ✅ Interactive CLI demo implementation
- ✅ Mobile optimization completion
- ✅ Performance audit and improvements
- ✅ Documentation overhaul
- ✅ Security audit and hardening

## 🔮 January 2025 Roadmap
- Advanced analytics dashboard
- Real-time collaboration features
- API rate limiting improvements
- Enhanced error handling system

---
*Generated by DevSum CLI v1.2.3*`,
    type: 'markdown',
    delay: 1200
  },

  'report-today': {
    content: `# 📅 DevSum Report - Today

**Date:** December 21, 2024  
**Total Commits:** 3  
**Files Changed:** 8  
**Lines Added:** 156  
**Lines Removed:** 23  

## 🎯 Today's Work

### Completed Tasks
- **Interactive Terminal Component**
  - Implemented command input with history navigation
  - Added autocomplete functionality
  - Created output renderer for different formats

- **Mock Output Database**
  - Added comprehensive CLI command responses
  - Created realistic report examples
  - Implemented error message handling

### Current Focus
- **Terminal Polish**
  - Adding keyboard shortcuts
  - Implementing mobile touch controls
  - Enhancing visual feedback

### Next Steps
- Complete terminal integration
- Add more command variations
- Test mobile responsiveness
- Update documentation

---
*Generated by DevSum CLI v1.2.3*`,
    type: 'markdown',
    delay: 400
  },

  'report-json': {
    content: `{
  "metadata": {
    "generatedAt": "2024-12-21T10:30:00Z",
    "period": {
      "since": "2024-12-14T00:00:00Z",
      "until": "2024-12-21T23:59:59Z"
    },
    "version": "1.2.3"
  },
  "summary": {
    "totalCommits": 23,
    "filesChanged": 45,
    "linesAdded": 1247,
    "linesRemoved": 389,
    "authors": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "commits": 15,
        "percentage": 65.2
      },
      {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "commits": 8,
        "percentage": 34.8
      }
    ]
  },
  "accomplishments": [
    {
      "category": "Frontend Development",
      "title": "Interactive CLI Testing Environment",
      "description": "Implemented terminal simulator with command history and autocomplete",
      "impact": "high",
      "commits": 12
    },
    {
      "category": "UI/UX Improvements",
      "title": "Enhanced Examples Page",
      "description": "Added animated terminal interface and improved mobile responsiveness",
      "impact": "medium",
      "commits": 6
    },
    {
      "category": "Backend Infrastructure",
      "title": "API Development",
      "description": "Created command execution API with security measures",
      "impact": "high",
      "commits": 5
    }
  ],
  "metrics": {
    "codeQuality": {
      "testCoverage": 87,
      "typescriptCoverage": 94,
      "eslintIssues": 0,
      "bundleSize": "2.1MB"
    },
    "performance": {
      "pageLoadTime": "1.2s",
      "bundleSizeReduction": "15%",
      "lighthouseScore": 95
    }
  }
}`,
    type: 'json',
    delay: 600
  },

  'report-html': {
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevSum Report - Last 7 Days</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 40px; background: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #1e293b; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
        .meta { background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .accomplishment { background: #f0f9ff; padding: 20px; margin: 15px 0; border-left: 4px solid #3b82f6; border-radius: 0 6px 6px 0; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
        .metric { background: #f8fafc; padding: 15px; border-radius: 6px; text-align: center; }
        .metric-value { font-size: 24px; font-weight: bold; color: #3b82f6; }
        .metric-label { color: #64748b; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 DevSum Report - Last 7 Days</h1>
        
        <div class="meta">
            <strong>Period:</strong> December 15-21, 2024<br>
            <strong>Total Commits:</strong> 23<br>
            <strong>Files Changed:</strong> 45<br>
            <strong>Lines Added:</strong> 1,247<br>
            <strong>Lines Removed:</strong> 389
        </div>

        <h2>🚀 Major Accomplishments</h2>
        
        <div class="accomplishment">
            <h3>Frontend Development</h3>
            <p><strong>New Feature:</strong> Implemented interactive CLI testing environment</p>
            <ul>
                <li>Added terminal simulator component with command history</li>
                <li>Built mock output database with realistic responses</li>
                <li>Created command parser with autocomplete support</li>
                <li>Integrated with examples page for hands-on demo</li>
            </ul>
        </div>

        <div class="accomplishment">
            <h3>UI/UX Improvements</h3>
            <p><strong>Enhanced Examples Page:</strong> Improved user experience and mobile responsiveness</p>
            <ul>
                <li>Added animated terminal interface</li>
                <li>Improved mobile responsiveness</li>
                <li>Added syntax highlighting for code blocks</li>
                <li>Implemented smooth scrolling effects</li>
            </ul>
        </div>

        <div class="metrics">
            <div class="metric">
                <div class="metric-value">87%</div>
                <div class="metric-label">Test Coverage</div>
            </div>
            <div class="metric">
                <div class="metric-value">94%</div>
                <div class="metric-label">TypeScript Coverage</div>
            </div>
            <div class="metric">
                <div class="metric-value">0</div>
                <div class="metric-label">ESLint Issues</div>
            </div>
            <div class="metric">
                <div class="metric-value">2.1MB</div>
                <div class="metric-label">Bundle Size</div>
            </div>
        </div>

        <p><em>Generated by DevSum CLI v1.2.3</em></p>
    </div>
</body>
</html>`,
    type: 'html',
    delay: 700
  },

  'analyze-light': {
    content: `# Quick Summary - Last 7 Days

**23 commits** across **45 files** with **1,247 additions** and **389 deletions**.

## Key Highlights
- ✅ Interactive CLI testing environment completed
- ✅ Mobile responsiveness improvements
- ✅ Performance optimizations (15% bundle size reduction)
- ✅ Zero ESLint issues achieved

## Top Contributors
- John Doe: 15 commits (65%)
- Jane Smith: 8 commits (35%)

---
*Generated by DevSum CLI v1.2.3*`,
    type: 'markdown',
    delay: 300
  },

  'analyze-detailed': {
    content: `# 📊 Comprehensive Analysis - Last 7 Days

**Period:** December 15-21, 2024  
**Analysis Depth:** Detailed  
**Total Commits:** 23  
**Active Contributors:** 2  

## 📈 Development Metrics

### Code Activity
- **Files Modified:** 45
- **Lines Added:** 1,247
- **Lines Removed:** 389
- **Net Change:** +858 lines
- **Average Commits/Day:** 3.3
- **Most Active Day:** December 19 (7 commits)

### File Type Distribution
- **TypeScript (.ts/.tsx):** 60% (27 files)
- **JavaScript (.js/.jsx):** 20% (9 files)
- **CSS/SCSS:** 15% (7 files)
- **Markdown:** 5% (2 files)

### Commit Message Analysis
- **Conventional Commits:** 78% (18 commits)
- **Feature Commits:** 52% (12 commits)
- **Bug Fixes:** 26% (6 commits)
- **Documentation:** 13% (3 commits)
- **Refactoring:** 9% (2 commits)

## 🎯 Feature Development Analysis

### Interactive CLI Testing Environment
- **Development Time:** 4 days
- **Commits:** 12
- **Files Created:** 8
- **Lines of Code:** 1,156
- **Complexity:** High
- **Impact:** High

**Key Components:**
- Terminal simulator with command history
- Mock output database with 15+ command variations
- Command parser with regex pattern matching
- Output renderers for markdown, JSON, HTML, and text
- Autocomplete system with intelligent suggestions

### UI/UX Improvements
- **Development Time:** 2 days
- **Commits:** 6
- **Files Modified:** 12
- **Lines Changed:** 234
- **Impact:** Medium

**Improvements:**
- Mobile-responsive terminal interface
- Smooth animations and transitions
- Enhanced syntax highlighting
- Improved accessibility features

### Backend Infrastructure
- **Development Time:** 1 day
- **Commits:** 5
- **Files Created:** 3
- **Lines of Code:** 456
- **Impact:** High

**Components:**
- Command execution API endpoint
- Security validation and rate limiting
- Mock data generation system
- Error handling and logging

## 🔍 Code Quality Insights

### Test Coverage
- **Overall Coverage:** 87% (↑3% from previous week)
- **Component Coverage:** 92%
- **Utility Functions:** 95%
- **API Endpoints:** 78%
- **Integration Tests:** 85%

### TypeScript Usage
- **Type Coverage:** 94%
- **Strict Mode:** Enabled
- **Any Types:** 2% (↓1% from previous week)
- **Interface Coverage:** 98%

### Performance Metrics
- **Bundle Size:** 2.1MB (↓0.3MB)
- **First Contentful Paint:** 1.2s
- **Largest Contentful Paint:** 2.1s
- **Cumulative Layout Shift:** 0.05
- **First Input Delay:** 45ms

## 🚀 Technical Debt Analysis

### Resolved Issues
- ✅ Removed 2 legacy components
- ✅ Updated 5 deprecated dependencies
- ✅ Fixed 3 accessibility issues
- ✅ Resolved 2 performance bottlenecks

### Remaining Technical Debt
- **Priority 1:** Add integration tests for CLI parser
- **Priority 2:** Implement error boundary components
- **Priority 3:** Add performance monitoring
- **Priority 4:** Create component documentation

## 📊 Team Productivity

### Individual Contributions
**John Doe (Senior Developer)**
- Commits: 15 (65%)
- Lines Added: 856
- Lines Removed: 234
- Primary Focus: Interactive terminal development
- Code Reviews: 8

**Jane Smith (Frontend Developer)**
- Commits: 8 (35%)
- Lines Added: 391
- Lines Removed: 155
- Primary Focus: UI/UX improvements
- Code Reviews: 5

### Collaboration Metrics
- **Code Reviews:** 13 total
- **Average Review Time:** 2.3 hours
- **Merge Conflicts:** 0
- **Pull Request Size:** 8.2 files average

## 🎯 Recommendations

### Immediate Actions (Next 3 Days)
1. Complete mobile terminal testing
2. Add keyboard shortcut documentation
3. Implement error boundary for terminal component
4. Create user testing session

### Short-term Goals (Next 2 Weeks)
1. Add more command variations to mock database
2. Implement terminal theme customization
3. Create comprehensive documentation
4. Add performance monitoring

### Long-term Objectives (Next Month)
1. Real-time collaboration features
2. Advanced analytics dashboard
3. Plugin system for custom commands
4. Integration with popular IDEs

---
*Generated by DevSum CLI v1.2.3 - Detailed Analysis Mode*`,
    type: 'markdown',
    delay: 1500
  },

  'commit-dry-run': {
    content: `🔍 DRY RUN - Commit Preview

📝 Generated Commit Message:
feat: implement interactive CLI testing environment

Add comprehensive terminal simulator with command history, autocomplete, and realistic mock outputs. Includes support for multiple output formats (markdown, JSON, HTML) and mobile-responsive design.

- Add terminal component with command input and history navigation
- Create mock output database with 15+ command variations
- Implement command parser with regex pattern matching
- Add output renderers for different content types
- Integrate with examples page for hands-on demo
- Add mobile touch controls and keyboard shortcuts

Files to be committed:
  M  components/interactive-terminal.tsx
  M  lib/mock-cli-outputs.ts
  M  lib/cli-parser.ts
  M  app/examples/page.tsx
  A  components/terminal-output.tsx
  A  lib/cli-suggestions.ts

📊 Stats:
- 6 files changed
- 1,247 insertions(+)
- 23 deletions(-)

✅ Ready to commit? Run 'devsum commit' to proceed.`,
    type: 'text',
    delay: 500
  },

  'commit-conventional': {
    content: `🔍 DRY RUN - Conventional Commit Preview

📝 Generated Commit Message:
feat(terminal): implement interactive CLI testing environment

Add comprehensive terminal simulator with command history, autocomplete, and realistic mock outputs. Includes support for multiple output formats (markdown, JSON, HTML) and mobile-responsive design.

- Add terminal component with command input and history navigation
- Create mock output database with 15+ command variations
- Implement command parser with regex pattern matching
- Add output renderers for different content types
- Integrate with examples page for hands-on demo
- Add mobile touch controls and keyboard shortcuts

BREAKING CHANGE: Terminal component requires React 18+ and TypeScript 4.9+

Files to be committed:
  M  components/interactive-terminal.tsx
  M  lib/mock-cli-outputs.ts
  M  lib/cli-parser.ts
  M  app/examples/page.tsx
  A  components/terminal-output.tsx
  A  lib/cli-suggestions.ts

📊 Stats:
- 6 files changed
- 1,247 insertions(+)
- 23 deletions(-)

✅ Ready to commit? Run 'devsum commit' to proceed.`,
    type: 'text',
    delay: 500
  },

  'error-invalid-command': {
    content: `❌ Error: Unknown command 'devsum invalid'

💡 Available commands:
  setup     - Configure DevSum settings
  analyze   - Analyze git commits and generate reports
  report    - Generate accomplishment reports (alias for analyze)
  analytics - Interactive analytics dashboard
  commit    - Generate AI commit messages
  update    - Check for DevSum updates
  login     - View free mode information
  telemetry - Manage usage tracking settings
  --help    - Show help information

Did you mean:
  • devsum analyze
  • devsum report
  • devsum commit

For more information, use 'devsum --help'`,
    type: 'error',
    delay: 200
  },

  'error-missing-option': {
    content: `❌ Error: Missing required option '--since'

Usage: devsum report [options]

Options:
  -s, --since <date>        Include commits since this date (YYYY-MM-DD, "today", or relative like "7d")
  -u, --until <date>        Include commits until this date (YYYY-MM-DD or "today")
  -a, --author <name>       Filter commits by author name
  -o, --output <path>       Output file path
  -f, --format <format>     Output format (markdown|json|html|txt) (default: "markdown")
  -l, --length <length>     Report length (light|short|detailed) (default: "detailed")

Examples:
  $ devsum report --since 7d
  $ devsum report --since today
  $ devsum report --since 2024-01-01

For more information, use 'devsum report --help'`,
    type: 'error',
    delay: 200
  },

  'error-invalid-format': {
    content: `❌ Error: Invalid format 'invalid-format'

Valid formats are:
  • markdown (default)
  • json
  • html
  • txt

Examples:
  $ devsum report --format json
  $ devsum report --format html
  $ devsum report --format txt

For more information, use 'devsum report --help'`,
    type: 'error',
    delay: 200
  }
};

// Command patterns for matching user input
export const commandPatterns: CommandPattern[] = [
  // Help commands
  { pattern: /^devsum\s+--help$|^devsum\s+-h$|^devsum\s*$/, output: mockOutputs.help, suggestions: ['devsum report --since 7d', 'devsum commit --dry-run'] },
  { pattern: /^devsum\s+report\s+--help$|^devsum\s+report\s+-h$/, output: mockOutputs['report-help'], suggestions: ['devsum report --since 7d', 'devsum report --format json'] },
  { pattern: /^devsum\s+commit\s+--help$|^devsum\s+commit\s+-h$/, output: mockOutputs['commit-help'], suggestions: ['devsum commit --dry-run', 'devsum commit --conventional'] },
  
  // Version
  { pattern: /^devsum\s+--version$|^devsum\s+-v$/, output: mockOutputs.version, suggestions: ['devsum --help', 'devsum report --since 7d'] },
  
  // Report commands
  { pattern: /^devsum\s+report\s+--since\s+7d$|^devsum\s+report\s+-s\s+7d$/, output: mockOutputs['report-weekly'], suggestions: ['devsum report --since 30d', 'devsum report --format json'] },
  { pattern: /^devsum\s+report\s+--since\s+30d$|^devsum\s+report\s+-s\s+30d$/, output: mockOutputs['report-monthly'], suggestions: ['devsum report --since 7d', 'devsum report --today'] },
  { pattern: /^devsum\s+report\s+--today$|^devsum\s+report\s+--since\s+today$/, output: mockOutputs['report-today'], suggestions: ['devsum report --since 7d', 'devsum report --since 30d'] },
  { pattern: /^devsum\s+report\s+--format\s+json$|^devsum\s+report\s+-f\s+json$/, output: mockOutputs['report-json'], suggestions: ['devsum report --format html', 'devsum report --format markdown'] },
  { pattern: /^devsum\s+report\s+--format\s+html$|^devsum\s+report\s+-f\s+html$/, output: mockOutputs['report-html'], suggestions: ['devsum report --format json', 'devsum report --format markdown'] },
  
  // Analyze commands (aliases for report)
  { pattern: /^devsum\s+analyze\s+--since\s+7d\s+--light$|^devsum\s+analyze\s+-s\s+7d\s+--light$/, output: mockOutputs['analyze-light'], suggestions: ['devsum analyze --since 7d --detailed', 'devsum report --since 7d'] },
  { pattern: /^devsum\s+analyze\s+--since\s+7d\s+--detailed$|^devsum\s+analyze\s+-s\s+7d\s+--detailed$/, output: mockOutputs['analyze-detailed'], suggestions: ['devsum analyze --since 7d --light', 'devsum report --since 7d'] },
  
  // Commit commands
  { pattern: /^devsum\s+commit\s+--dry-run$/, output: mockOutputs['commit-dry-run'], suggestions: ['devsum commit --dry-run --conventional', 'devsum commit --auto'] },
  { pattern: /^devsum\s+commit\s+--dry-run\s+--conventional$/, output: mockOutputs['commit-conventional'], suggestions: ['devsum commit --dry-run', 'devsum commit --auto'] },
  
  // Error patterns
  { pattern: /^devsum\s+invalid/, output: mockOutputs['error-invalid-command'], suggestions: ['devsum analyze', 'devsum report', 'devsum commit'] },
  { pattern: /^devsum\s+report$/, output: mockOutputs['error-missing-option'], suggestions: ['devsum report --since 7d', 'devsum report --since today'] },
  { pattern: /^devsum\s+report\s+--format\s+invalid/, output: mockOutputs['error-invalid-format'], suggestions: ['devsum report --format json', 'devsum report --format html'] }
];

// Quick command suggestions for the UI
export const quickCommands = [
  { command: 'devsum --help', description: 'Show all available commands' },
  { command: 'devsum report --since 7d', description: 'Generate weekly report' },
  { command: 'devsum report --since 30d', description: 'Generate monthly report' },
  { command: 'devsum report --today', description: 'Generate today\'s report' },
  { command: 'devsum report --format json', description: 'Export report as JSON' },
  { command: 'devsum report --format html', description: 'Export report as HTML' },
  { command: 'devsum analyze --since 7d --light', description: 'Quick analysis summary' },
  { command: 'devsum analyze --since 7d --detailed', description: 'Detailed analysis' },
  { command: 'devsum commit --dry-run', description: 'Preview AI commit message' },
  { command: 'devsum commit --dry-run --conventional', description: 'Preview conventional commit' },
  { command: 'devsum --version', description: 'Show version number' }
];
