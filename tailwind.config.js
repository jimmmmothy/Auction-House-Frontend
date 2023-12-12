/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {},
    fontFamily: {
      'poppins': ['poppins', 'sans-serif'],
      'lato': ['Lato', 'sans-serif'],
      'roboto': ['Roboto Condensed', 'sans-serif'],
      'josefin': ['Josefin Sans', 'sans-serif']
    }
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
}