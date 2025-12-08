import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the perfect plan for your CLI agent management needs. Free tier available with premium features for power users and teams.",
  openGraph: {
    title: "CLI Manager Pricing - Plans for Every Developer",
    description: "Choose the perfect plan for your CLI agent management needs. Free tier available with premium features for power users and teams.",
    images: [
      {
        url: "/cli-main.png",
        width: 1200,
        height: 630,
        alt: "CLI Manager Pricing Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLI Manager Pricing - Plans for Every Developer",
    description: "Choose the perfect plan for your CLI agent management needs. Free tier available.",
    images: ["/cli-main.png"],
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
