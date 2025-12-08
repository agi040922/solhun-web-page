import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to use CLI Manager to organize Claude Code, Codex CLI, and Gemini CLI. Complete guides, tutorials, and API references.",
  openGraph: {
    title: "CLI Manager Documentation - Getting Started Guide",
    description: "Learn how to use CLI Manager to organize Claude Code, Codex CLI, and Gemini CLI. Complete guides, tutorials, and API references.",
    images: [
      {
        url: "/cli-main.png",
        width: 1200,
        height: 630,
        alt: "CLI Manager Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLI Manager Documentation - Getting Started Guide",
    description: "Learn how to use CLI Manager. Complete guides, tutorials, and API references.",
    images: ["/cli-main.png"],
  },
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
