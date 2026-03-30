import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import ImageUploader from '@/components/boards/image-uploader'
import DeleteBoardButton from '@/components/boards/delete-board-button'
import Link from 'next/link'

export default async function BoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const { id } = await params

  const board = await prisma.board.findUnique({
    where: { id },
    include: { images: { orderBy: { createdAt: 'desc' } } },
  })

  if (!board || board.userId !== session.user.id) notFound()

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/boards" className="text-gray-500 hover:text-rose-600 text-sm">
                ← Boards
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{board.name}</h1>
            {board.description && <p className="text-gray-500 mt-1">{board.description}</p>}
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${board.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {board.isPublic ? 'Public' : 'Private'}
              </span>
              <span className="text-xs text-gray-400">{board.images.length} images</span>
            </div>
          </div>
          <DeleteBoardButton boardId={board.id} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Images</h2>
          <ImageUploader boardId={board.id} />
        </div>

        {board.images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {board.images.map((image) => {
              const analysis = image.analysis
                ? (typeof image.analysis === 'string' ? JSON.parse(image.analysis) : image.analysis) as { colors: string[]; styles: string[]; garments: string[]; patterns: string[] }
                : null
              return (
                <div key={image.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.url} alt="Fashion upload" className="w-full h-48 object-cover" />
                  {analysis && (
                    <div className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {analysis.styles?.map((s: string) => (
                          <span key={s} className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {analysis.colors?.slice(0, 2).map((c: string) => (
                          <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center text-gray-400">
            <p className="text-4xl mb-3">🖼️</p>
            <p>No images yet. Upload your first fashion inspiration!</p>
          </div>
        )}
      </div>
    </div>
  )
}
