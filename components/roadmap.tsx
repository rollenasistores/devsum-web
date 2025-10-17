"use client";

import { motion } from "framer-motion";
import { CheckCircle, Circle, Clock, Zap, Users, FileText, GitBranch, Settings } from "lucide-react";

const roadmapItems = [
  {
    id: "pdf-export",
    title: "PDF Export",
    description: "Professional PDF reports with custom branding and layouts",
    status: "pending",
    priority: "high",
    icon: FileText,
    category: "Export Formats"
  },
  {
    id: "team-collaboration",
    title: "Team Collaboration",
    description: "Multi-user support with shared workspaces and team analytics",
    status: "pending",
    priority: "high",
    icon: Users,
    category: "Collaboration"
  },
  {
    id: "integration-apis",
    title: "Integration APIs",
    description: "Connect with Slack, Teams, Jira, and other project management tools",
    status: "pending",
    priority: "medium",
    icon: Zap,
    category: "Integrations"
  },
  {
    id: "custom-templates",
    title: "Custom Templates",
    description: "Personalized report formats and styling options",
    status: "pending",
    priority: "medium",
    icon: Settings,
    category: "Customization"
  },
  {
    id: "multi-repository",
    title: "Multi-Repository Support",
    description: "Aggregate reports across multiple repositories and projects",
    status: "pending",
    priority: "low",
    icon: GitBranch,
    category: "Advanced Features"
  }
];

const completedFeatures = [
  {
    title: "HTML Report Generation",
    description: "Beautiful web reports with modern styling",
    completedAt: "2024-09-22"
  },
  {
    title: "Plain Text Reports",
    description: "Simple text format for easy sharing",
    completedAt: "2024-09-22"
  },
  {
    title: "AI-Powered Commit Messages",
    description: "Automated commit message generation",
    completedAt: "2024-09-22"
  },
  {
    title: "Update Checking System",
    description: "Automatic update notifications",
    completedAt: "2024-09-22"
  },
  {
    title: "Automated Commit Workflow",
    description: "Full automation with branch management",
    completedAt: "2024-09-22"
  },
  {
    title: "Analytics Dashboard",
    description: "Interactive web-based insights with charts and visualizations",
    completedAt: "2024-09-22"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-red-500 bg-red-50 border-red-200";
    case "medium":
      return "text-yellow-500 bg-yellow-50 border-yellow-200";
    case "low":
      return "text-green-500 bg-green-50 border-green-200";
    default:
      return "text-gray-500 bg-gray-50 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "in-progress":
      return <Clock className="w-5 h-5 text-blue-500" />;
    case "pending":
      return <Circle className="w-5 h-5 text-gray-400" />;
    default:
      return <Circle className="w-5 h-5 text-gray-400" />;
  }
};

export function Roadmap() {
  return (
    <section id="roadmap" className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Development Roadmap
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what's coming next and track our progress on new features
          </p>
        </motion.div>

        {/* Completed Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">
            ✅ Completed Features
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                    <p className="text-xs text-green-600 font-medium">
                      Completed: {new Date(feature.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">
            🚀 Upcoming Features
          </h3>
          
          {/* Group by category */}
          {Array.from(new Set(roadmapItems.map(item => item.category))).map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h4 className="text-xl font-semibold mb-6 text-center text-muted-foreground">
                {category}
              </h4>
              <div className="grid gap-6 md:grid-cols-2">
                {roadmapItems
                  .filter(item => item.category === category)
                  .map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                        viewport={{ once: true }}
                        className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getStatusIcon(item.status)}
                              <h5 className="font-semibold text-foreground">{item.title}</h5>
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                                  item.priority
                                )}`}
                              >
                                {item.priority} priority
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-muted/50 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Have a Feature Request?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We'd love to hear your ideas! Help us prioritize features by sharing your feedback and use cases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/rollenasistores/devsum/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Zap className="w-4 h-4 mr-2" />
                Request Feature
              </a>
              <a
                href="https://github.com/rollenasistores/devsum/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-border text-foreground rounded-md hover:bg-muted transition-colors"
              >
                <Users className="w-4 h-4 mr-2" />
                Join Discussion
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
