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
          onClick={onProductClick ? () => onProductClick(product) : undefined}
        />
      ))}
    </div>
  )
}
