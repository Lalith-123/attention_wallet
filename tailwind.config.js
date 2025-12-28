export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 2s infinite',
        'pulse-custom': 'pulse 1s infinite',
        'slide-up': 'slideUp 0.3s ease',
      },
    },
  },
  plugins: [],
}