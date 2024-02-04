/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "ourPurple": "#4F3C75",
        "ourBeige": "#FAE8DD",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      }

    },
    
  },
  plugins: [],
}

