/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px' },
    },
    extend: {
      colors: {
        // 따뜻한 주황 계열 — 센터 포인트 컬러
        brand: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#E2620F',
          700: '#B84A0B',
          800: '#8F3A0C',
          900: '#6F2F0D',
        },
        // 보조 색 — 신뢰감/차분함
        sage: {
          50: '#F2F7F3',
          100: '#E1EDE4',
          200: '#C4DACB',
          300: '#9CC0A8',
          400: '#6FA07F',
          500: '#4E8260',
          600: '#3D684C',
          700: '#32533E',
          800: '#294334',
          900: '#22372B',
        },
        ink: {
          50: '#FAF9F7',
          100: '#F3F1ED',
          200: '#E5E1DA',
          300: '#CFC9BF',
          400: '#A39B8E',
          500: '#7A7266',
          600: '#5C5548',
          700: '#463F35',
          800: '#2E2921',
          900: '#1C1813',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'Pretendard Variable', 'Apple SD Gothic Neo', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // 40~60대 보호자 가독성 고려 — 기본 17px
        base: ['1.0625rem', { lineHeight: '1.75' }],
        lg: ['1.1875rem', { lineHeight: '1.75' }],
      },
      boxShadow: {
        card: '0 2px 16px -4px rgba(46, 41, 33, 0.10)',
        lift: '0 12px 32px -8px rgba(46, 41, 33, 0.18)',
      },
      borderRadius: { xl: '0.875rem', '2xl': '1.25rem', '3xl': '1.75rem' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up .5s ease-out both' },
    },
  },
  plugins: [],
}
