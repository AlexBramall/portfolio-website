/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-muted': 'var(--surface-muted)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        text: 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          subtle: 'var(--accent-subtle)',
        },
        'accent-2': {
          DEFAULT: 'var(--accent-2)',
          subtle: 'var(--accent-2-subtle)',
        },
        'accent-3': {
          DEFAULT: 'var(--accent-3)',
          subtle: 'var(--accent-3-subtle)',
        },
        success: 'var(--success)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      fontSize: {
        display: [
          'clamp(44px, 7vw, 72px)',
          { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '650' },
        ],
        h2: [
          'clamp(28px, 3vw, 34px)',
          { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        h3: ['clamp(20px, 2vw, 22px)', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['17px', { lineHeight: '1.5', fontWeight: '400' }],
        label: ['14px', { lineHeight: '1.4', fontWeight: '600' }],
        caption: ['13px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: {
        control: '12px',
        card: '20px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.04), 0 12px 40px rgba(0, 0, 0, 0.06)',
      },
      maxWidth: {
        content: '64rem',
        prose: '48rem',
      },
      backdropBlur: {
        nav: '16px',
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
      },
    },
  },
  plugins: [],
};
