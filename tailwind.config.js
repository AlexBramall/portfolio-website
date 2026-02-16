/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Monochromatic Editorial Clean Palette
        black: '#000000',
        'dark-gray': '#3F3F3F',
        'muted-text': '#737373',
        'light-muted': '#A3A3A3',
        surface: '#F5F5F5',
        'nav-pill': '#F0F0F0',
        'button-border': '#D4D4D4',
      },
      fontSize: {
        // Typography scale aligned with Editorial Clean
        'display-xl': 'clamp(60px, 8vw, 96px)',
        'display-lg': 'clamp(20px, 2.5vw, 26px)',
        'heading-xl': '36px',
        'heading-lg': '24px',
        'heading-md': '20px',
        'heading-sm': '18px',
        'body': '17px',
        'body-sm': '16px',
        'label': '15px',
        'caption': '14px',
        'tag': '13px',
        'eyebrow': '12px',
      },
      fontWeight: {
        // Simplify to only used weights
        400: '400',
        500: '500',
        600: '600',
        700: '700',
      },
      spacing: {
        // 8px grid system
        0.5: '4px',
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        6: '48px',
        7: '56px',
        10: '80px',
        16: '128px',
        20: '160px',
      },
      borderRadius: {
        DEFAULT: '16px',
        '2xl': '16px',
        full: '100px',
      },
      lineHeight: {
        tight: '1.0',
        snug: '1.3',
        normal: '1.6',
        relaxed: '1.7',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        normal: '-0.01em',
        wide: '0.15em',
      },
      backdropBlur: {
        xl: '20px',
      },
      boxShadow: {
        'nav-pill': '0 1px 3px rgba(0,0,0,0.08)',
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
      },
    },
  },
  plugins: [],
};
