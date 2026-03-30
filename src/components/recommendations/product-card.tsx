'use client'
import { useState } from 'react'
import { ProductType } from '@/types'

const categoryGradients: Record<string, string> = {
  tops: 'from-rose-200 to-pink-300',
  bottoms: 'from-blue-200 to-indigo-300',
  dresses: 'from-purple-200 to-fuchsia-300',
  outerwear: 'from-amber-200 to-orange-300',
  shoes: 'from-emerald-200 to-teal-300',
  accessories: 'from-yellow-200 to-amber-300',
  default: 'from-gray-200 to-gray-300',
}

interface ProductCardProps {
  product: ProductType
  isFavorited: boolean
  onToggleFavorite: (productId: string, isFav: boolean) => void
}

export default function ProductCard({ product, isFavorited, onToggleFavorite }: ProductCardProps) {
  const [loading, setLoading] = useState(false)
  const gradient = categoryGradients[product.category] || categoryGradients.default

  const handleFavorite = async () => {
    setLoading(true)
    await onToggleFavorite(product.id, isFavorited)
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100">
      <div className={`bg-gradient-to-br ${gradient} h-48 flex items-center justify-center relative`}>
        <span className="text-5xl">
          {product.category === 'tops' ? '👕' :
           product.category === 'bottoms' ? '👖' :
           product.category === 'dresses' ? '👗' :
           product.category === 'outerwear' ? '🧥' :
           product.category === 'shoes' ? '👠' :
           product.category === 'accessories' ? '👜' : '✨'}
        </span>
        <button
          onClick={handleFavorite}
          disabled={loading}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          {isFavorited ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{product.name}</h3>
          <span className="text-rose-600 font-bold text-sm ml-2 shrink-0">${product.price.toFixed(2)}</span>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{product.category}</span>
        <div className="flex flex-wrap gap-1 mt-2">
          {product.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
        <a
          href={product.purchaseLink}
          className="mt-3 block text-center bg-rose-600 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors"
        >
          Shop Now
        </a>
      </div>
    </div>
  )
}
