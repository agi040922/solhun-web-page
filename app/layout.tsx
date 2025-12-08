import type React from "react"
import type { Metadata } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://solhun.dev"),
  title: {
    default: "CLI Manager - Manage Claude Code, Codex CLI & Gemini CLI in One Place",
    template: "%s | CLI Manager"
  },
  description: "The ultimate CLI agent management tool. Organize Claude Code, Codex CLI, and Gemini CLI from a single dashboard. Rename agents, switch editors instantly, and streamline your AI-powered development workflow.",
  keywords: [
    "CLI Manager",
    "Claude Code",
    "Codex CLI",
    "Gemini CLI",
    "AI coding assistant",
    "CLI agent management",
    "developer tools",
    "terminal manager",
    "VS Code",
    "Cursor IDE",
    "AI development workflow",
    "command line interface",
    "multi-agent management"
  ],
  authors: [{ name: "CLI Manager Team" }],
  creator: "CLI Manager",
  publisher: "CLI Manager",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CLI Manager",
    title: "CLI Manager - All Your CLI Agents in One Place",
    description: "Manage Claude Code, Codex CLI, and Gemini CLI from a single dashboard. Rename agents, organize projects, and switch editors instantly.",
    images: [
      {
        url: "/cli-main.png",
        width: 1200,
        height: 630,
        alt: "CLI Manager Dashboard - Manage all CLI agents in one place",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLI Manager - All Your CLI Agents in One Place",
    description: "Manage Claude Code, Codex CLI, and Gemini CLI from a single dashboard. The ultimate tool for AI-powered development.",
    images: ["/cli-main.png"],
    creator: "@climanager",
  },
  alternates: {
    canonical: "/",
  },
  category: "Developer Tools",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400&display=swap" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
