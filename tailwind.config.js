/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    //? ----- WHITESPACE SYSTEM -----
    spacing: {
      0: '0',
      1: '0.1rem',
      2: '0.2rem',
      4: '0.4rem',
      8: '0.8rem',
      12: '1.2rem',
      16: '1.6rem',
      24: '2.4rem',
      32: '3.2rem',
      48: '4.8rem',
      64: '6.4rem',
      80: '8rem',
      96: '9.6rem',
      128: '12.8rem',
    },

    //? ----- TYPOGRAPHY SYSTEM -----
    fontSize: {
      10: '1rem',
      12: '1.2rem',
      14: '1.4rem',
      16: '1.6rem',
      18: '1.8rem',
      20: '2rem',
      24: '2.4rem',
      30: '3rem',
      36: '3.6rem',
      44: '4.4rem',
      52: '5.2rem',
      62: '6.2rem',
      74: '7.4rem',
      86: '8.6rem',
      98: '9.8rem',
    },
    lineHeight: {
      DEFAULT: '1',
      medium: '1.2',
      paragraph: '1.5',
    },
    letterSpacing: {
      DEFAULT: '0.1rem',
      0.1: '0.01rem',
      0.25: '0.025rem',
      0.5: '0.05rem',
      0.75: '0.075rem',
      1.25: '0.125rem',
      1.5: '0.15rem',
      6: '0.6rem',
    },

    // ! Rem and em do not depend on html font-size in media queries.
    // ! Instead, 1rem = 1em = 16px

    // ! We use em units for media queries because rem has some bugs in media queries.
    /* 
    Example:
    1680px / 16px = 105em
    */
    screens: {
      'bigger-desktops': { max: '105em' },
      'smaller-desktops': { max: '85em' },
      'landscape-tablets': { max: '75em' },
      tablets: { max: '59em' },
      'smaller-tablets': { max: '44em' },
      phones: { max: '34em' },
    },
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
        roboto: ['Roboto Slab', 'serif'],
        'sf-pro': ['SF Pro Display', 'sans-serif'],
        helvetica: ['Helvetica', 'sans-serif'],
      },

      // ? ----- COLOR SYSTEM
      colors: {
        background: '#f0f0f0',
        primary: {
          DEFAULT: '#28A6F4',
          background: '#0891E6',
          footer: '#050B32',
          50: '#D9EDF7',
          100: '#d2e0f7',
          200: '#AFE6FF',
          300: '#7491D2',
          400: '#4963A4',
          500: '#1B2F69',
          600: '#13235A',
          700: '#0D1A4B',
          800: '#08113C',
          900: '#0A2E7A',
        },
        secondary: {
          DEFAULT: '#e74c3c',
          shade: { 100: '#6b7280' },
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        black: {
          DEFAULT: '#000000',
          100: '#2d2d2d',
        },
        general: {
          DEFAULT: '#1349A0',
          tint: { 1: '#D5E3F9', 2: '#3877DD', 3: '#326bc7' },
          shade: { 1: '#0E3C87' },
        },
        success: {
          DEFAULT: '#5cb85c',
          100: '#E1F9D5',
          200: '#BEF3AD',
          300: '#8CDC7E',
          400: '#5DBA56',
          500: '#288C2A',
          600: '#1D7827',
          700: '#146423',
          800: '#0C5120',
          900: '#07431D',
          tint: { 1: '#568500', 2: '#D6F9D5' },
          shade: { 1: '#2B4200' },
        },
        info: {
          100: '#D0E1FC',
          200: '#A2C2F9',
          300: '#719BED',
          400: '#4B78DB',
          500: '#1949C4',
          600: '#1238A8',
          700: '#0C298D',
          800: '#071C71',
          900: '#04135E',
        },
        warning: {
          100: '#FDF9D5',
          200: '#FBF2AB',
          300: '#F4E580',
          400: '#EAD55F',
          500: '#DDC02E',
          600: '#BEA121',
          700: '#9F8317',
          800: '#80670E',
          900: '#6A5308',
          DEFAULT: '#DD8D38',
          tint: { 1: '#F9EDD5', 2: '#fffbee' },
        },
        danger: {
          DEFAULT: '#A01313',
          tint: { 1: '#F9D5D5', 2: '#FF6666', 3: '#990000', 4: '#db1514' },
          100: '#FBE5CD',
          200: '#F8C69C',
          300: '#EB9A69',
          400: '#D87042',
          500: '#BF380F',
          600: '#A4230A',
          700: '#891307',
          800: '#6E0604',
          900: '#5B0207',
        },
        border: {
          DEFAULT: '#8C9196',
          subdued: '#C9CCCF',
        },
        surface: {
          depressed: '#EDEEEF',
          disabled: '#F6F6F7',
        },
        typography: {
          disabled: '#8C9196',
        },
        light: {
          background: '#f0f4f7',
          primary: '#1094DD',
        },
        dark: {
          background: '#2a2a2a',
          primary: '#60a5fa',
          tint: { 1: '#334155', 2: '#181818' },
        },
        sd: {
          100: '#F8D8C6',
          200: '#F2AA91',
          300: '#D86D56',
          400: '#B2382C',
          500: '#800000',
          600: '#6E0009',
          700: '#5C000F',
          800: '#4A0013',
          900: '#3D0015',
        },
        smp: {
          100: '#D2E0F7',
          200: '#A8C0F0',
          300: '#7491D2',
          400: '#4963A4',
          500: '#1B2F69',
          600: '#13235A',
          700: '#0D1A4B',
          800: '#08113C',
          900: '#050B32',
        },
        sma: {
          100: '#F1FBF8',
          200: '#E4F7F4',
          300: '#CDE9E6',
          400: '#B3D3D3',
          500: '#92B3B6',
          600: '#6A949C',
          700: '#497483',
          800: '#2E5669',
          900: '#1C3E57',
        },
        islamic: {
          100: '#C4F5CF',
          200: '#8DEBAC',
          300: '#4FC581',
          400: '#238C5A',
          500: '#004028',
          600: '#003727',
          700: '#002E25',
          800: '#002522',
          900: '#001E1E',
        },
      },

      // ? ----- SHADOW SYSTEM
      boxShadow: {
        disabled: '0px -0.9471396207809448px 0px 0px rgba(0, 0, 0, 0.08) inset',
        'active-primary': '0 0 0 3px rgba(64, 0, 83, 0.5)',
      },

      // ? ----- ANIMATION
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: ['tailwindcss-animate'],
}
