const defaultTheme = require('tailwindcss/defaultTheme');
const heropatterns = require('tailwindcss-hero-patterns/src/patterns');

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['src/**/*.{html,js,svelte,ts}'],

  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['roboto', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        ind_bg: "url('/bg.jpg')"
      }
    },
    heroPatternsOpacities: ['10'],
    heroPatterns: {
      topography: heropatterns.topography
    }
  },

  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=black]'],
          primary: '#facc15',
          secondary: '#E8456B',
          accent: '#3AE8C4',
          '--btn-text-case': 'none',
          '--rounded-box': '0.2rem',
          '--rounded-btn': '0.2rem'
        }
      }
    ]
  },
  plugins: [require('daisyui'), require('tailwindcss-hero-patterns')]
};

module.exports = config;
