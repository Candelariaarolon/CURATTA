'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/boards', label: 'Boards' },
    { href: '/recommendations', label: 'Discover' },
    { href: '/profile', label: 'Profile' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-rose-600 tracking-tight">
          CURATTA
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {session && navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-rose-600 font-medium transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Menu */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 rounded-full px-3 py-2 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                  {(session.user?.name || session.user?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                  {session.user?.name || session.user?.email}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login" className="text-gray-600 hover:text-rose-600 font-medium text-sm">
                Sign in
              </Link>
              <Link
                href="/register"
                className="bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-rose-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600 hover:text-rose-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {session ? (
            <>
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-700 hover:text-rose-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="block w-full text-left py-2 text-red-600 font-medium"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block py-2 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>Sign in</Link>
              <Link href="/register" className="block py-2 text-rose-600 font-medium" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
