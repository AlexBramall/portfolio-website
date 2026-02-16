/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Rust & Terracotta Gradient Palette
        sienna: {
          50: '#F9F4F1',
          100: '#F0E8E3',
          600: '#A0644E',
          700: '#8B5441',
        },
        coral: {
          50: '#FEF5F3',
          100: '#FDE8E1',
          600: '#E8765A',
          700: '#D6634B',
        },
        amber: {
          600: '#D97706',
          700: '#B45309',
        },
        teal: {
          50: '#F0F7F8',
          100: '#DFF0F2',
          600: '#3B9FA0',
          700: '#2D7A7B',
        },
        warmNeutral: {
          50: '#FAF8F4',
          100: '#EAE4DC',
        },
      },
    },
  },
  plugins: [],
};
