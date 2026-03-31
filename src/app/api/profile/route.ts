import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, avatar: true, plan: true, createdAt: true, styleProfile: true },
  })
  
  return NextResponse.json(user)
}

export async function PUT(request: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  const { name, avatar } = await request.json()
  
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name, avatar },
    select: { id: true, email: true, name: true, avatar: true },
  })
  
  return NextResponse.json(user)
}
