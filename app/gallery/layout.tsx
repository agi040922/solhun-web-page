import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery - Explore CLI Manager Features in Action",
  description:
    "Browse the CLI Manager gallery showcasing Worktree management, Git integration, port monitoring, terminal templates, and playground features with real screenshots.",
  keywords: [
    "CLI Manager gallery",
    "CLI Manager screenshots",
    "AI agent tools demo",
    "Git worktree screenshots",
    "port management preview",
    "terminal templates demo",
    "developer tools gallery",
    "AI-powered development preview",
    "workflow automation images",
    "Claude Code screenshots",
    "Gemini CLI screenshots",
  ],
  openGraph: {
    title: "Gallery - Explore CLI Manager Features in Action",
    description:
      "See CLI Manager in action: Worktree management, Git integration, port monitoring, terminal templates, and experimental playground with real screenshots.",
    type: "website",
    locale: "en_US",
    siteName: "CLI Manager",
    images: [
      {
        url: "/worktree-create.png",
        width: 1200,
        height: 630,
        alt: "CLI Manager Gallery - Feature Screenshots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery - Explore CLI Manager Features in Action",
    description:
      "See CLI Manager in action with real screenshots: Worktree, Git integration, port management, terminal templates, and playground.",
    images: ["/worktree-create.png"],
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
    canonical: "/gallery",
  },
}

// JSON-LD Structured Data for Gallery Page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "CLI Manager Feature Gallery",
  description:
    "Visual showcase of CLI Manager features including worktree management, Git integration, port monitoring, and terminal templates.",
  about: {
    "@type": "SoftwareApplication",
    name: "CLI Manager",
    applicationCategory: "DeveloperApplication",
  },
  image: [
    "/worktree-create.png",
    "/git-integration-1.png",
    "/port-monitor.png",
    "/terminal-templates.png",
    "/playground.png",
  ],
}

export default function GalleryLayout({
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
