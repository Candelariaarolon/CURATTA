'use client'
import { StyleProfile } from '@/types'

const colorMap: Record<string, string> = {
  black: '#1a1a1a',
  white: '#f5f5f5',
  navy: '#1a3a5c',
  beige: '#d4b896',
  red: '#e63946',
  blush: '#f4a0a0',
  emerald: '#2d6a4f',
  camel: '#c19a6b',
  gray: '#9e9e9e',
  mustard: '#e1b800',
}

interface StyleProfileDisplayProps {
  styleProfile: StyleProfile
}

export default function StyleProfileDisplay({ styleProfile }: StyleProfileDisplayProps) {
  return (
    <div className="space-y-4">
      {styleProfile.topColors.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Favorite Colors</p>
          <div className="flex gap-2">
            {styleProfile.topColors.map(color => (
              <div
                key={color}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: colorMap[color] || color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
      {styleProfile.topStyles.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Your Styles</p>
          <div className="flex flex-wrap gap-2">
            {styleProfile.topStyles.map(style => (
              <span key={style} className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm capitalize">{style}</span>
            ))}
          </div>
        </div>
      )}
      {styleProfile.topPatterns.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Preferred Patterns</p>
          <div className="flex flex-wrap gap-2">
            {styleProfile.topPatterns.map(pattern => (
              <span key={pattern} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">{pattern}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
