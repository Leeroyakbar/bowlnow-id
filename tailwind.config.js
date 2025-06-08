// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A65F2D',
        secondary: '#F4A825',
        accent: '#6B3F1D',
        base: '#FFF9F0',
        text: '#2E2E2E',
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
