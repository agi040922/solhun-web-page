"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  title: string
  description: string
  image: string
  badge?: string
  logo?: React.ReactNode
  onClick?: () => void
  className?: string
  hasVideo?: boolean // 비디오 포함 여부
}

export function ProductCard({
  title,
  description,
  image,
  badge,
  logo,
  className,
  onClick,
  hasVideo = false,
}: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[rgba(55,50,47,0.08)] shadow-sm transition-all hover:shadow-md",
        onClick && "cursor-pointer hover:ring-2 hover:ring-purple-500/20 active:scale-[0.98]",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative h-[120px] sm:h-[200px] w-full overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute left-2 top-2 sm:left-4 sm:top-4 rounded-full bg-white/90 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-700 backdrop-blur-sm">
            {badge}
          </div>
        )}
        {/* 비디오 재생 버튼 */}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full bg-white/90 p-2 sm:p-3 shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800 ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-3 sm:p-6">
        <div className="mb-2 sm:mb-4 flex items-center gap-2 sm:gap-3">
          {logo && <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gray-100 [&>svg]:h-3.5 [&>svg]:w-3.5 sm:[&>svg]:h-5 sm:[&>svg]:w-5">{logo}</div>}
          <h3 className="text-sm sm:text-lg font-semibold text-[#37322F] line-clamp-1">{title}</h3>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-[#605A57] line-clamp-2 sm:line-clamp-none">{description}</p>
      </div>
    </div>
  )
}
