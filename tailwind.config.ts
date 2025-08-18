import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      maxWidth: { prose: '72ch' }
    }
  },
  plugins: []
} satisfies Config;