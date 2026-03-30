import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import BoardGrid from '@/components/boards/board-grid'

export default async function BoardsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const boards = await prisma.board.findMany({
    where: { userId: session.user.id },
    include: { _count: { select: { images: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Boards</h1>
            <p className="text-gray-500 mt-1">Create and manage your mood boards</p>
          </div>
        </div>
        <BoardGrid initialBoards={boards} />
      </div>
    </div>
  )
}
