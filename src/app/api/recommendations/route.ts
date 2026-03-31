import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { buildStyleProfile, getRecommendations } from '@/lib/recommendation-engine'
import { ImageAnalysis, ProductType } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
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
  
  if (analyses.length === 0) {
    return NextResponse.json(products)
  }
  
  const styleProfile = buildStyleProfile(analyses)
  const recommendations = getRecommendations(styleProfile, products)
  
  return NextResponse.json(recommendations)
}
