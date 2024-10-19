/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              backgroundColor: '#272829',
              padding:3,
              
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}