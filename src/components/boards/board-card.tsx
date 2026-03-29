'use client'
import Link from 'next/link'

interface BoardCardProps {
  board: {
    id: string
    name: string
    description?: string | null
    isPublic: boolean
    _count?: { images: number }
  }
}

export default function BoardCard({ board }: BoardCardProps) {
  return (
    <Link href={`/boards/${board.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-rose-200 overflow-hidden">
        <div className="bg-gradient-to-br from-rose-100 to-pink-200 h-32 flex items-center justify-center">
          <span className="text-4xl">🎨</span>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-gray-900 truncate">{board.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ml-2 shrink-0 ${board.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {board.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          {board.description && (
            <p className="text-sm text-gray-500 mt-1 truncate">{board.description}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">{board._count?.images ?? 0} images</p>
        </div>
      </div>
    </Link>
  )
}
