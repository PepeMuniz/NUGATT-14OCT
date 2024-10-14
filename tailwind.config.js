/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C0E8C',
          light: '#4A2BA9',
          dark: '#200A66',
        },
        secondary: {
          DEFAULT: '#F7468A',
          light: '#F97AA6',
          dark: '#D93A73',
        },
        background: '#F8F9FA',
        surface: '#FFFFFF',
        text: {
          primary: '#333333',
          secondary: '#666666',
        },
      },
    },
  },
  plugins: [],
};