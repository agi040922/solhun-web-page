"use client"

import { useState } from "react"
import { PageWrapper } from "../../components/page-wrapper"
import { ProductList, Product } from "../../components/product-list"
import { ImageGallery } from "../../components/image-gallery"
import { GitBranch, Github, Network, Terminal, FlaskConical } from "lucide-react"

const products = [
  {
    id: "1",
    title: "Worktree Manager",
    description: "Effortlessly manage Git worktrees for parallel AI agent workflows. Create, distribute, and merge branches with a single click.",
    image: "/worktree-create.png",
    logo: <GitBranch className="h-5 w-5 text-purple-600" />,
    badge: "Popular",
    galleryImages: [
      "/worktree-1.png",
      "/worktree-2.png",
      "/worktree-3.png",
      "/worktree-4.png",
      "/worktree-5.png",
      "/worktree-create.png",
    ]
  },
  {
    id: "2",
    title: "Git & GitHub Integration",
    description: "Visualize your Git history intuitively. Instantly spot agent mistakes and rollback changes with confidence.",
    image: "/git-integration-1.png",
    logo: <Github className="h-5 w-5 text-gray-800" />,
    badge: "Essential",
    galleryImages: [
      "/git-integration-1.png",
      "/git-restore.png",
    ]
  },
  {
    id: "3",
    title: "Port Manager",
    description: "Track and manage ports across multiple projects. Never lose sight of which service runs where when delegating to agents.",
    image: "/port-monitor.png",
    logo: <Network className="h-5 w-5 text-blue-500" />,
    galleryImages: [
      "/port-1.png",
      "/port-2.png",
      "/port-monitor.png",
    ]
  },
  {
    id: "4",
    title: "Terminal Templates",
    description: "Save and reuse your favorite commands and agent configurations. Launch complex workflows with customizable templates.",
    image: "/terminal-templates.png",
    logo: <Terminal className="h-5 w-5 text-green-600" />,
    galleryImages: [
      "/template-1.png",
      "/template-2.png",
      "/template-3.png",
      "/terminal-templates.png",
    ]
  },
  {
    id: "5",
    title: "Playground",
    description: "Experiment fearlessly with AI agents in a sandboxed environment. Test new ideas without affecting your main projects.",
    image: "/playground.png",
    logo: <FlaskConical className="h-5 w-5 text-orange-500" />,
    galleryImages: [
      "/playground.png",
      "/main-claude.png",
      "/main-gemini.png",
    ]
  },
]

// Reusable Badge Component
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <PageWrapper>
      {/* Bento Grid Section */}
      <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
        {/* Header Section */}
        <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] py-8 sm:py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
          <div className="w-full max-w-[616px] lg:w-[616px] px-4 sm:px-6 py-4 sm:py-5 shadow-[0px_2px_4px_rgba(50,45,43,0.06)] overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
            <Badge
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                  <rect x="7" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                  <rect x="1" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                  <rect x="7" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                </svg>
              }
              text="Gallery"
            />
            <div className="w-full max-w-[598.06px] lg:w-[598.06px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
              Visualizing the Future of Development
            </div>
            <div className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
              Explore our innovative tools and interfaces designed
              <br />
              to enhance your AI-powered workflows.
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] lg:w-[1060px] py-8 sm:py-12 md:py-16 flex flex-col justify-start items-center gap-12">
           <ProductList
             products={products}
             onProductClick={(product) => setSelectedProduct(product)}
           />
        </div>
      </div>

      <ImageGallery
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        images={selectedProduct?.galleryImages || []}
      />
    </PageWrapper>
  )
}
