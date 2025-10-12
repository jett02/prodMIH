export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        'midnight-black': '#000000',
        'warm-sunset': '#EBA472',
        'modern-white': '#FFFFFF',
        'slate-gray': '#4A4A4A',
        
        // Secondary Brand Colors
        'steel-blue': '#4A6FA5',
        'sienna-brown': '#A15E3B',
        'soft-beige': '#EDE0D4',
        'deep-olive': '#5C573E',
        
        // Keep existing primary structure but update values
        primary: {
          50: '#FDF6F0',
          100: '#FBEBD9',
          200: '#F7D6B3',
          300: '#F3C18D',
          400: '#EFAC67',
          500: '#EBA472', // warm-sunset
          600: '#D4935E',
          700: '#BD824A',
          800: '#A67136',
          900: '#8F6022',
        },
        secondary: '#4A4A4A', // slate-gray
        accent: '#4A6FA5', // steel-blue
        
        // Add brand colors to standard color names for easier use
        black: '#000000', // midnight-black
        white: '#FFFFFF', // modern-white
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#4A4A4A', // slate-gray
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#000000', // midnight-black
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
        'montserrat': ['Montserrat', 'system-ui', 'sans-serif'],
        'lora': ['Lora', 'serif'],
        'playfair': ['Playfair Display', 'serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}


