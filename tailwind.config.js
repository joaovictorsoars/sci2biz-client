/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      primary: '#2B80B0',
      'network-green': '#D6EBEA',
      white: '#FFFFFF',
      yellow: '#FABE2C',
      black: '#222222',
      gray: '#B3B3B3',
      danger: '#F44336',
    },
    extend: {
      flex: {
        1.5: '1.5 1.5 0%',
      },
    },
  },
  plugins: [],
};
