import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { buildStyleProfile, getRecommendations } from '@/lib/recommendation-engine'
import { ImageAnalysis, ProductType } from '@/types'
import RecommendationFeed from '@/components/recommendations/recommendation-feed'

export default async function RecommendationsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const boards = await prisma.board.findMany({
    where: { userId: session.user.id },
    include: { images: true },
  })

  const analyses: ImageAnalysis[] = boards
    .flatMap(b => b.images)
    .filter(img => img.analysis)
    .map(img => {
      const a = typeof img.analysis === 'string' ? JSON.parse(img.analysis) : img.analysis
      return a as ImageAnalysis
    })

  const allProducts = await prisma.product.findMany()
  const products: ProductType[] = allProducts.map(p => ({
    ...p,
    colors: typeof p.colors === 'string' ? JSON.parse(p.colors) : p.colors as string[],
    styles: typeof p.styles === 'string' ? JSON.parse(p.styles) : p.styles as string[],
    patterns: typeof p.patterns === 'string' ? JSON.parse(p.patterns) : p.patterns as string[],
    tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags as string[],
  }))

  const recommendations = analyses.length > 0
    ? getRecommendations(buildStyleProfile(analyses), products)
    : products

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    select: { productId: true },
  })
  const favoriteIds = favorites.map(f => f.productId)

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recommendations</h1>
          <p className="text-gray-500 mt-1">
            {analyses.length > 0
              ? 'Personalized picks based on your style profile'
              : 'Upload images to your boards for personalized recommendations'}
          </p>
        </div>
        <RecommendationFeed products={recommendations} initialFavoriteIds={favoriteIds} />
      </div>
    </div>
  )
}
