"use client"

import { ProductCard } from "./product-card"

export interface Product {
  id: string
  title: string
  description: string
  image: string
  badge?: string
  logo?: React.ReactNode
  galleryImages?: string[]
}

interface ProductListProps {
  products: Product[]
  onProductClick?: (product: Product) => void
}

// 비디오 파일인지 확인하는 헬퍼 함수
function hasVideoInGallery(galleryImages?: string[]): boolean {
  if (!galleryImages || galleryImages.length === 0) return false
  return galleryImages.some((src) =>
    src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg")
  )
}

export function ProductList({ products, onProductClick }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          image={product.image}
          badge={product.badge}
          logo={product.logo}
          hasVideo={hasVideoInGallery(product.galleryImages)}
          onClick={onProductClick ? () => onProductClick(product) : undefined}
        />
      ))}
    </div>
  )
}
