import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  })
  
  return NextResponse.json(favorites.map(f => ({
    ...f,
    product: {
      ...f.product,
      colors: typeof f.product.colors === 'string' ? JSON.parse(f.product.colors) : f.product.colors,
      styles: typeof f.product.styles === 'string' ? JSON.parse(f.product.styles) : f.product.styles,
      patterns: typeof f.product.patterns === 'string' ? JSON.parse(f.product.patterns) : f.product.patterns,
      tags: typeof f.product.tags === 'string' ? JSON.parse(f.product.tags) : f.product.tags,
    }
  })))
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  const { productId } = await request.json()
  if (!productId) return NextResponse.json({ error: 'productId required' }, { status: 400 })
  
  const favorite = await prisma.favorite.upsert({
    where: { userId_productId: { userId: session.user.id, productId } },
    update: {},
    create: { userId: session.user.id, productId },
  })
  
  return NextResponse.json(favorite, { status: 201 })
}

export async function DELETE(request: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  const { productId } = await request.json()
  
  await prisma.favorite.deleteMany({
    where: { userId: session.user.id, productId },
  })
  
  return NextResponse.json({ success: true })
}
