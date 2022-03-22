module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
    './types/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        twhite: {
          700: '#f5f6fa',
          600: '#D9E4FF'
        },
        tblack: {
          100: '#D7DBEC',
          200: '#A1A7C4',
          300: '#94A7AF',
          400: '#5A607F',
          700: '#131523'
        },
        tblue: {
          100: '#09E4A8',
          500: '#0d11d3',
          600: '#181A82',
          700: '#1E5EFF'
        },
        tpurple: {
          700: '#1E00E9'
        },
        tgreen: {
          400: '#1BED49'
        }
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(circle at 40% -20%, var(--tw-gradient-stops))'
      },
      boxShadow: {
        tblack: '0px 1px 4px rgba(21, 34, 50, 0.08)'
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif']
      },
      gridTemplateColumns: {
        aside: '270px 1fr'
      },
      gridTemplateRows: {
        header: 'auto 1fr'
      }
    }
  },
  plugins: []
};
