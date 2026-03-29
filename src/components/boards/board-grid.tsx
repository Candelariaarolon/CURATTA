'use client'
import { useState } from 'react'
import BoardCard from './board-card'
import CreateBoardModal from './create-board-modal'

interface Board {
  id: string
  name: string
  description?: string | null
  isPublic: boolean
  _count?: { images: number }
}

interface BoardGridProps {
  initialBoards: Board[]
}

export default function BoardGrid({ initialBoards }: BoardGridProps) {
  const [boards, setBoards] = useState<Board[]>(initialBoards)
  const [showModal, setShowModal] = useState(false)

  const handleBoardCreated = (newBoard: Board) => {
    setBoards(prev => [newBoard, ...prev])
    setShowModal(false)
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="bg-rose-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-rose-700 transition-colors"
        >
          + New Board
        </button>
      </div>

      {boards.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center text-gray-400">
          <p className="text-5xl mb-4">🎨</p>
          <p className="text-lg font-medium text-gray-700 mb-2">No boards yet</p>
          <p className="text-sm mb-6">Create your first mood board to get started!</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-rose-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-rose-700 transition-colors"
          >
            Create First Board
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {boards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}

      <CreateBoardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreated={handleBoardCreated}
      />
    </>
  )
}
