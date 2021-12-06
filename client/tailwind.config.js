module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#59B8DD',
          300: '#9ce3ff',
          900: '#0DAAE7',
        },
      }
    },
  },
  plugins: [],
}
