module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        tblack: {
          100: '#D7DBEC',
          200: '#A1A7C4',
          300: '#94A7AF',
          400: '#5A607F',
          700: '#131523'
        },
        tblue: {
          700: '#1E5EFF'
        }
      },
      boxShadow: {
        tblack: '0px 1px 4px rgba(21, 34, 50, 0.08)'
      }
    }
  },
  plugins: []
};
