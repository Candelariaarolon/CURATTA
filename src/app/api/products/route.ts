import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  
  const products = await prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: { name: 'asc' },
  })
  
  return NextResponse.json(
    products.map(p => ({
      ...p,
      colors: typeof p.colors === 'string' ? JSON.parse(p.colors) : p.colors,
      styles: typeof p.styles === 'string' ? JSON.parse(p.styles) : p.styles,
      patterns: typeof p.patterns === 'string' ? JSON.parse(p.patterns) : p.patterns,
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
    }))
  )
}
