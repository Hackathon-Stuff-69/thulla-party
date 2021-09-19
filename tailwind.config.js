module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  mode: 'jit',
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#000000',
      red: {
        500: '#F44336'
      },
      primary: { lightP2: '#8b6e4f', DEFAULT: '#171512' },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
