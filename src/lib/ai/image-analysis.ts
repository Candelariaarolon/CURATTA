import { ImageAnalysis } from '@/types'

export function analyzeImage(imageBuffer: Buffer, filename: string): ImageAnalysis {
  const styles = ['casual', 'formal', 'bohemian', 'minimalist', 'streetwear', 'romantic', 'sporty']
  const garments = ['dress', 'top', 'pants', 'jacket', 'skirt', 'shoes', 'accessory', 'coat']
  const patterns = ['solid', 'striped', 'floral', 'geometric', 'plaid', 'polka dots', 'animal print']
  const colors = ['black', 'white', 'navy', 'beige', 'red', 'blush', 'emerald', 'camel', 'gray', 'mustard']

  const seed = (imageBuffer.length + filename.length) % 7
  
  return {
    colors: [
      colors[seed % colors.length],
      colors[(seed + 2) % colors.length],
      colors[(seed + 4) % colors.length],
    ],
    styles: [styles[seed % styles.length], styles[(seed + 3) % styles.length]],
    garments: [garments[seed % garments.length], garments[(seed + 2) % garments.length]],
    patterns: [patterns[seed % patterns.length]],
  }
}
