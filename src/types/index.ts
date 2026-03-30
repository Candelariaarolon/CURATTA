export interface UserSession {
  id: string
  email: string
  name?: string | null
  avatar?: string | null
}

export interface BoardWithImages {
  id: string
  name: string
  description?: string | null
  isPublic: boolean
  createdAt: Date
  userId: string
  images: ImageWithAnalysis[]
  _count?: { images: number }
}

export interface ImageWithAnalysis {
  id: string
  url: string
  boardId: string
  createdAt: Date
  analysis?: ImageAnalysis | null
}

export interface ImageAnalysis {
  colors: string[]
  styles: string[]
  garments: string[]
  patterns: string[]
}

export interface ProductType {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  colors: string[]
  styles: string[]
  patterns: string[]
  season: string
  tags: string[]
  purchaseLink: string
}

export interface StyleProfile {
  topColors: string[]
  topStyles: string[]
  topGarments: string[]
  topPatterns: string[]
}
