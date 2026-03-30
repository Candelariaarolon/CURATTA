import LoginForm from '@/components/auth/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-rose-600">CURATTA</h1>
          <p className="text-gray-500 mt-2">Welcome back</p>
        </div>
        <LoginForm />
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-rose-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-gray-400 mt-2 text-sm">
          <Link href="/forgot-password" className="hover:underline">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  )
}
