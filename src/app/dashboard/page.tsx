import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const [boardCount, imageCount, favoriteCount, recentBoards] = await Promise.all([
    prisma.board.count({ where: { userId: session.user.id } }),
    prisma.image.count({ where: { board: { userId: session.user.id } } }),
    prisma.favorite.count({ where: { userId: session.user.id } }),
    prisma.board.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: { _count: { select: { images: true } } },
    }),
  ])

  const stats = [
    { label: 'Mood Boards', value: boardCount, icon: '🎨', href: '/boards' },
    { label: 'Images Uploaded', value: imageCount, icon: '🖼️', href: '/boards' },
    { label: 'Saved Favorites', value: favoriteCount, icon: '❤️', href: '/recommendations' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session.user.name || session.user.email}! 👋
          </h1>
          <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your style journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/boards"
              className="bg-rose-600 text-white px-5 py-2 rounded-full font-medium hover:bg-rose-700 transition-colors"
            >
              + New Board
            </Link>
            <Link
              href="/recommendations"
              className="bg-white border border-rose-200 text-rose-600 px-5 py-2 rounded-full font-medium hover:bg-rose-50 transition-colors"
            >
              View Recommendations
            </Link>
            <Link
              href="/profile"
              className="bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Recent Boards */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Boards</h2>
            <Link href="/boards" className="text-rose-600 text-sm font-medium hover:underline">
              View all →
            </Link>
          </div>
          {recentBoards.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-4xl mb-3">🎨</p>
              <p>No boards yet. Create your first mood board!</p>
              <Link
                href="/boards"
                className="mt-4 inline-block bg-rose-600 text-white px-6 py-2 rounded-full font-medium hover:bg-rose-700 transition-colors"
              >
                Create Board
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentBoards.map((board) => (
                <Link key={board.id} href={`/boards/${board.id}`}>
                  <div className="border border-gray-100 rounded-xl p-4 hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer">
                    <div className="bg-gradient-to-br from-rose-100 to-pink-200 rounded-lg h-24 mb-3 flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <p className="font-medium text-gray-900 truncate">{board.name}</p>
                    <p className="text-sm text-gray-500">{board._count.images} images</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
