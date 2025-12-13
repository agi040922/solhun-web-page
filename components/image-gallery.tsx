"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

// 미디어 타입 정의 (이미지 또는 비디오)
export interface MediaItem {
  type: "image" | "video"
  src: string
}

interface ImageGalleryProps {
  images: string[] // 하위 호환성 유지
  media?: MediaItem[] // 새로운 미디어 배열 (비디오 지원)
  isOpen: boolean
  onClose: () => void
}

// 파일 확장자로 비디오인지 확인하는 헬퍼 함수
function isVideoFile(src: string): boolean {
  return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg")
}

export function ImageGallery({ images, media, isOpen, onClose }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // images 배열을 MediaItem 형식으로 변환 (하위 호환성)
  const mediaItems: MediaItem[] = media || images.map((src) => ({
    type: isVideoFile(src) ? "video" : "image",
    src,
  }))

  // Reset index when modal opens with new images
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
      setIsPlaying(false)
    }
  }, [isOpen])

  // 인덱스 변경 시 비디오 정지
  useEffect(() => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [currentIndex])

  // 비디오 재생/일시정지 토글
  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // 현재 미디어 아이템
  const currentMedia = mediaItems[currentIndex]

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex]) // Added currentIndex dependency for closure freshness if needed, though state setter handles it

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Main Content Container */}
          <div 
            className="relative flex h-full w-full flex-col items-center justify-center p-4 md:p-10"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
          >
            {/* Main Image or Video */}
            <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-lg shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full w-full"
                >
                  {currentMedia?.type === "video" ? (
                    <>
                      <video
                        ref={videoRef}
                        src={currentMedia.src}
                        className="h-full w-full object-contain"
                        playsInline
                        onEnded={() => setIsPlaying(false)}
                      />
                      {/* 재생/일시정지 버튼 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePlay()
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30"
                        style={{ opacity: isPlaying ? 0 : 1 }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = isPlaying ? "0" : "1")}
                      >
                        <div className="rounded-full bg-white/90 p-4 shadow-lg transition-transform hover:scale-110">
                          {isPlaying ? (
                            <Pause className="h-10 w-10 text-gray-800" />
                          ) : (
                            <Play className="h-10 w-10 text-gray-800 ml-1" />
                          )}
                        </div>
                      </button>
                    </>
                  ) : (
                    <Image
                      src={currentMedia?.src || ""}
                      alt={`Gallery image ${currentIndex + 1}`}
                      fill
                      className="object-contain"
                      quality={100}
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Buttons (Overlay) */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm hover:bg-black/70 transition-all"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm hover:bg-black/70 transition-all"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {mediaItems.length > 1 && (
              <div className="mt-6 flex w-full max-w-5xl gap-4 overflow-x-auto px-2 pb-4 scrollbar-hide justify-center">
                {mediaItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "relative h-16 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-md transition-all",
                      currentIndex === idx
                        ? "ring-2 ring-white scale-105"
                        : "opacity-50 hover:opacity-80 hover:scale-105"
                    )}
                  >
                    {item.type === "video" ? (
                      <>
                        <video
                          src={item.src}
                          className="h-full w-full object-cover"
                          muted
                          preload="metadata"
                        />
                        {/* 비디오 표시 아이콘 */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      </>
                    ) : (
                      <Image
                        src={item.src}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
