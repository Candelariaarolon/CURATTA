import { ImageAnalysis } from '@/types'

export function analyzeImage(imageBuffer: Buffer, filename: string): ImageAnalysis {
  const styles = ['casual', 'formal', 'bohemian', 'minimalist', 'streetwear', 'romantic', 'sporty']
  const garments = ['dress', 'top', 'pants', 'jacket', 'skirt', 'shoes', 'accessory', 'coat']
  const patterns = ['solid', 'striped', 'floral', 'geometric', 'plaid', 'polka dots', 'animal print']
  const colors = ['black', 'white', 'navy', 'beige', 'red', 'blush', 'emerald', 'camel', 'gray', 'mustard']

  const hash = (imageBuffer.length + filename.length) % 7
  
  return {
    colors: [
      colors[hash % colors.length],
      colors[(hash + 2) % colors.length],
      colors[(hash + 4) % colors.length],
    ],
    styles: [styles[hash % styles.length], styles[(hash + 3) % styles.length]],
    garments: [garments[hash % garments.length], garments[(hash + 2) % garments.length]],
    patterns: [patterns[hash % patterns.length]],
  }
}
