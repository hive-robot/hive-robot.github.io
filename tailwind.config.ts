import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '80rem' }, // max-w-7xl
    },
    extend: {
      borderRadius: {
        '2xl': '16px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(17 24 39 / 0.08)',
        lg: '0 10px 15px -3px rgb(17 24 39 / 0.1), 0 4px 6px -4px rgb(17 24 39 / 0.1)'
      },
      colors: {
        brand: {
          50: 'var(--brand-50)',
          100: 'var(--brand-100)',
          200: 'var(--brand-200)',
          300: 'var(--brand-300)',
          400: 'var(--brand-400)',
          500: 'var(--brand-500)',
          600: 'var(--brand-600)',
          700: 'var(--brand-700)'
        },
        ink: {
          900: 'var(--ink-900)',
          700: 'var(--ink-700)',
          500: 'var(--ink-500)'
        },
        line: 'var(--line)',
        bgsoft: 'var(--bgsoft)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config

