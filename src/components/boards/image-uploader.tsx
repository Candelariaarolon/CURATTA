'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface ImageUploaderProps {
  boardId: string
}

interface AnalysisResult {
  colors: string[]
  styles: string[]
  garments: string[]
  patterns: string[]
}

export default function ImageUploader({ boardId }: ImageUploaderProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')

  const uploadFile = async (file: File) => {
    setUploading(true)
    setError('')
    setAnalysis(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('boardId', boardId)
      const res = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Upload failed')
      } else {
        setAnalysis(data.analysis)
        router.refresh()
      }
    } catch {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) uploadFile(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }

  return (
    <div>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragging ? 'border-rose-400 bg-rose-50' : 'border-gray-300 hover:border-rose-300 hover:bg-rose-50'
        }`}
      >
        <div className="text-4xl mb-2">📸</div>
        {uploading ? (
          <p className="text-gray-500">Uploading and analyzing...</p>
        ) : (
          <>
            <p className="text-gray-700 font-medium">Drop an image here or click to upload</p>
            <p className="text-sm text-gray-400 mt-1">JPG, PNG, GIF up to 10MB</p>
          </>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {analysis && (
        <div className="mt-4 bg-rose-50 rounded-xl p-4">
          <p className="text-sm font-semibold text-rose-800 mb-2">✨ Style Analysis</p>
          <div className="flex flex-wrap gap-2">
            {analysis.styles?.map(s => (
              <span key={s} className="text-xs bg-rose-200 text-rose-800 px-2 py-1 rounded-full">{s}</span>
            ))}
            {analysis.colors?.map(c => (
              <span key={c} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{c}</span>
            ))}
            {analysis.garments?.map(g => (
              <span key={g} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">{g}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
