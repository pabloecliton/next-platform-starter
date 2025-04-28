// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Azul padrão do Tailwind (ou sua cor)
        'primary-content': '#ffffff', // Cor do texto sobre o primary
      },
    },
  },
  plugins: [],
}