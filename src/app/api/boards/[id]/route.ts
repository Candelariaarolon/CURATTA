import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()
  const board = await prisma.board.findUnique({
    where: { id },
    include: { images: { orderBy: { createdAt: 'desc' } } },
  })
  if (!board) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!board.isPublic && board.userId !== session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(board)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const board = await prisma.board.findUnique({ where: { id } })
  if (!board || board.userId !== session.user.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  await prisma.board.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
