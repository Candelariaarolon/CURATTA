'use client'
import { useState } from 'react'
import { ProductType } from '@/types'
import ProductCard from './product-card'

const categories = ['All', 'tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories']

interface RecommendationFeedProps {
  products: ProductType[]
  initialFavoriteIds: string[]
}

export default function RecommendationFeed({ products, initialFavoriteIds }: RecommendationFeedProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(initialFavoriteIds))

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory)

  const handleToggleFavorite = async (productId: string, isFav: boolean) => {
    if (isFav) {
      await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      setFavoriteIds(prev => { const n = new Set(prev); n.delete(productId); return n })
    } else {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      setFavoriteIds(prev => new Set([...prev, productId]))
    }
  }

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-rose-600 text-white'
                : 'bg-white text-gray-600 hover:bg-rose-50 border border-gray-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
          <p className="text-4xl mb-3">✨</p>
          <p>No products in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorited={favoriteIds.has(product.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}
