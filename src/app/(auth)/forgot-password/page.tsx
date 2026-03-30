'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-rose-600">CURATTA</h1>
          <p className="text-gray-500 mt-2">Reset your password</p>
        </div>
        {submitted ? (
          <div className="text-center">
            <div className="text-5xl mb-4">📧</div>
            <p className="text-gray-700 font-medium mb-2">Check your email</p>
            <p className="text-gray-500 text-sm mb-6">
              If an account exists for {email}, we&apos;ve sent password reset instructions.
            </p>
            <Link href="/login" className="text-rose-600 font-semibold hover:underline">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-2 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
            >
              Send Reset Link
            </button>
            <p className="text-center text-sm text-gray-500">
              <Link href="/login" className="text-rose-600 hover:underline">
                Back to sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
