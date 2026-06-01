import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-syne)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--bg-primary)',
        foreground: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        accent: 'var(--accent-color)',
        border: 'var(--border-color)',
      },
      spacing: {
        safe: 'max(1.5rem, env(safe-area-inset-left))',
      },
    },
  },
  plugins: [],
}

export default config
