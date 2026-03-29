import { ImageAnalysis, StyleProfile, ProductType } from '@/types'

export function buildStyleProfile(analyses: ImageAnalysis[]): StyleProfile {
  const colorCount: Record<string, number> = {}
  const styleCount: Record<string, number> = {}
  const garmentCount: Record<string, number> = {}
  const patternCount: Record<string, number> = {}

  for (const analysis of analyses) {
    for (const c of analysis.colors) colorCount[c] = (colorCount[c] || 0) + 1
    for (const s of analysis.styles) styleCount[s] = (styleCount[s] || 0) + 1
    for (const g of analysis.garments) garmentCount[g] = (garmentCount[g] || 0) + 1
    for (const p of analysis.patterns) patternCount[p] = (patternCount[p] || 0) + 1
  }

  const top = (obj: Record<string, number>, n: number) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([k]) => k)

  return {
    topColors: top(colorCount, 5),
    topStyles: top(styleCount, 3),
    topGarments: top(garmentCount, 3),
    topPatterns: top(patternCount, 3),
  }
}

export function getRecommendations(
  styleProfile: StyleProfile,
  products: ProductType[]
): ProductType[] {
  const scored = products.map((product) => {
    let score = 0
    for (const c of styleProfile.topColors) {
      if (product.colors.includes(c)) score += 2
    }
    for (const s of styleProfile.topStyles) {
      if (product.styles.includes(s)) score += 3
    }
    for (const p of styleProfile.topPatterns) {
      if (product.patterns.includes(p)) score += 1
    }
    return { product, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product)
}
