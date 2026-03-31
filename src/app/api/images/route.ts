import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { analyzeImage } from '@/lib/ai/image-analysis'
import { put } from '@vercel/blob'
import { randomUUID } from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const boardId = formData.get('boardId') as string | null

  if (!file || !boardId) {
    return NextResponse.json({ error: 'File and boardId required' }, { status: 400 })
  }

  const board = await prisma.board.findUnique({ where: { id: boardId } })
  if (!board || board.userId !== session.user.id) {
    return NextResponse.json({ error: 'Board not found' }, { status: 404 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = file.name.split('.').pop() || 'jpg'
  const filename = `uploads/${randomUUID()}.${ext}`

  const blob = await put(filename, buffer, { access: 'public' })

  const analysis = analyzeImage(buffer, file.name)

  const image = await prisma.image.create({
    data: {
      boardId,
      url: blob.url,
      analysis: JSON.stringify(analysis),
    },
  })

  return NextResponse.json({ ...image, analysis }, { status: 201 })
}
