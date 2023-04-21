const daisyui = require('daisyui');
const defaultTheme = require('tailwindcss/defaultTheme');

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
    }
  },

  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=black]'],
          primary: '#45B1E8',
          secondary: '#E8456B',
          accent: '#3AE8C4',
          "--btn-text-case": "none",
          '--rounded-box': '0.2rem',
          '--rounded-btn': '0.2rem'
        }
      }
    ]
  },
  plugins: [daisyui]
};

module.exports = config;
