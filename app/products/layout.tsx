import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Features - Powerful Tools for AI-Powered Development",
  description:
    "Discover powerful CLI Manager features: Worktree management for parallel AI agents, Git integration, port management, terminal templates, and experimental playground. Supercharge your development workflow.",
  keywords: [
    "CLI Manager features",
    "AI agent tools",
    "Git worktree management",
    "parallel AI development",
    "port management tool",
    "terminal templates",
    "developer productivity",
    "AI-powered development",
    "workflow automation",
    "Git integration",
    "Claude Code worktree",
    "multi-agent workflow",
  ],
  openGraph: {
    title: "Features - Powerful Tools for AI-Powered Development",
    description:
      "Supercharge your workflow with intelligent features designed to make CLI agent management effortless. Worktree, Git, Port, Terminal Templates & Playground.",
    type: "website",
    locale: "en_US",
    siteName: "CLI Manager",
    images: [
      {
        url: "/cli-main-gemini.png",
        width: 1200,
        height: 630,
        alt: "CLI Manager Features - AI-Powered Development Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features - Powerful Tools for AI-Powered Development",
    description:
      "Supercharge your workflow with intelligent features: Worktree management, Git integration, port management, terminal templates, and playground.",
    images: ["/cli-main-gemini.png"],
    creator: "@climanager",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/products",
  },
}

// JSON-LD Structured Data for Features Page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CLI Manager",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS",
  description:
    "CLI Manager helps developers orchestrate AI agents with powerful tools for worktree management, Git integration, port tracking, and terminal automation. Built for macOS.",
  featureList: [
    "Worktree Manager - Parallel AI agent workflows with Git worktrees",
    "Git Integration - Visual Git history and easy rollback",
    "Port Manager - Track and manage ports across projects",
    "Terminal Templates - Save and reuse commands and configurations",
    "Playground - Sandboxed environment for AI experimentation",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
