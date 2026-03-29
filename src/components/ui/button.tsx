import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50',
  secondary: 'bg-white border border-rose-200 text-rose-600 hover:bg-rose-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
}

export default function Button({ variant = 'primary', loading, children, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${variantClasses[variant]} ${className}`}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
