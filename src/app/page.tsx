import Link from 'next/link'

export default function HomePage() {
  const features = [
    {
      icon: '🎨',
      title: 'Mood Boards',
      description: 'Create beautiful mood boards by uploading your favorite fashion images and inspirations.',
    },
    {
      icon: '✨',
      title: 'AI Analysis',
      description: 'Our intelligent system analyzes your uploaded images to understand your unique style DNA.',
    },
    {
      icon: '👗',
      title: 'Style Recommendations',
      description: 'Receive personalized product recommendations that match your aesthetic perfectly.',
    },
  ]

  const showcaseGradients = [
    'from-rose-300 to-pink-400',
    'from-purple-300 to-indigo-400',
    'from-amber-300 to-orange-400',
    'from-emerald-300 to-teal-400',
    'from-sky-300 to-blue-400',
    'from-fuchsia-300 to-rose-400',
  ]

  const showcaseLabels = ['Minimalist', 'Bohemian', 'Streetwear', 'Romantic', 'Casual Chic', 'Formal']

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your{' '}
            <span className="text-rose-600">Perfect Style</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Upload your fashion inspirations, let our AI analyze your aesthetic, and receive personalized recommendations tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-700 transition-colors text-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="border-2 border-rose-600 text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-rose-50 transition-colors text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How It Works</h2>
          <p className="text-center text-gray-500 mb-12">Three simple steps to your perfect wardrobe</p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-colors">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Explore Every Aesthetic</h2>
          <p className="text-center text-gray-500 mb-12">From minimalist to maximalist, we&apos;ve got you covered</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {showcaseGradients.map((gradient, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${gradient} rounded-2xl h-48 flex items-end p-4`}
              >
                <span className="text-white font-semibold text-lg drop-shadow">{showcaseLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-rose-500 to-pink-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Style?</h2>
          <p className="text-rose-100 mb-8 text-lg">Join thousands of fashion lovers discovering their perfect aesthetic.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-rose-50 transition-colors text-lg"
            >
              Create Free Account
            </Link>
            <Link
              href="/login"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center">
        <p className="text-2xl font-bold text-white mb-2">CURATTA</p>
        <p className="text-sm">© {new Date().getFullYear()} CURATTA. Fashion recommendation powered by AI.</p>
      </footer>
    </div>
  )
}
