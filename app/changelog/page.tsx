"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-effects";
import { motion } from "framer-motion";
import { Calendar, GitCommit, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";

const changelogData = [
  {
    version: "1.7.1",
    date: "2025-10-17",
    type: "patch",
    changes: []
  },
  {
    version: "1.5.4",
    date: "2025-09-23",
    type: "patch",
    changes: []
  },
  {
    version: "1.5.0",
    date: "2025-09-22",
    type: "minor",
    changes: [
      {
        type: "feature",
        description: "Enable auto mode by default in commit command",
        commit: "9acd52f"
      },
      {
        type: "feature",
        description: "Release v1.5.0-beta.0 with analytics and dashboard features",
        commit: "c39ec85"
      }
    ]
  },
  {
    version: "1.4.4",
    date: "2025-09-19",
    type: "patch",
    changes: []
  },
  {
    version: "1.4.3",
    date: "2025-09-19",
    type: "patch",
    changes: []
  },
  {
    version: "1.4.2",
    date: "2025-09-19",
    type: "patch",
    changes: []
  },
  {
    version: "1.4.0",
    date: "2025-09-19",
    type: "minor",
    changes: [
      {
        type: "feature",
        description: "Add commit command to standardize commit message generation. This improves commit history consistency and development workflow.",
        commit: "edd1dd1"
      }
    ]
  },
  {
    version: "1.3.0",
    date: "2025-09-18",
    type: "minor",
    changes: [
      {
        type: "feature",
        description: "Enhance report generation with multiple output formats and improved AI provider support",
        commit: "9e7b451"
      }
    ]
  },
  {
    version: "1.2.1",
    date: "2025-09-14",
    type: "patch",
    changes: []
  }
];

const getVersionColor = (type: string) => {
  switch (type) {
    case "major":
      return "text-red-500 bg-red-50 border-red-200";
    case "minor":
      return "text-blue-500 bg-blue-50 border-blue-200";
    case "patch":
      return "text-green-500 bg-green-50 border-green-200";
    default:
      return "text-gray-500 bg-gray-50 border-gray-200";
  }
};

const getChangeTypeColor = (type: string) => {
  switch (type) {
    case "feature":
      return "text-green-600 bg-green-100";
    case "fix":
      return "text-red-600 bg-red-100";
    case "breaking":
      return "text-red-700 bg-red-200";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export default function ChangelogPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Changelog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track all the changes, improvements, and new features in DevSum CLI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {changelogData.map((release, index) => (
              <motion.div
                key={release.version}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getVersionColor(
                        release.type
                      )}`}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      v{release.version}
                    </span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(release.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <Link
                    href={`https://github.com/rollenasistores/devsum/compare/v${release.version}...v${
                      changelogData[index + 1]?.version || "main"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View on GitHub
                  </Link>
                </div>

                {release.changes.length > 0 ? (
                  <div className="space-y-3">
                    {release.changes.map((change, changeIndex) => (
                      <motion.div
                        key={changeIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (index * 0.1) + (changeIndex * 0.05) }}
                        className="flex items-start gap-3"
                      >
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getChangeTypeColor(
                            change.type
                          )}`}
                        >
                          {change.type}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{change.description}</p>
                          {change.commit && (
                            <Link
                              href={`https://github.com/rollenasistores/devsum/commit/${change.commit}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mt-1"
                            >
                              <GitCommit className="w-3 h-3 mr-1" />
                              {change.commit.substring(0, 7)}
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No detailed changes available for this release.
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-4">
                Want to be notified about new releases? Star our repository on GitHub!
              </p>
              <Link
                href="https://github.com/rollenasistores/devsum"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <GitCommit className="w-4 h-4 mr-2" />
                Star on GitHub
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
