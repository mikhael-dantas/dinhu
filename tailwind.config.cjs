/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const safeListFile = 'safelist.txt'
const SAFELIST_COLORS = 'colors'
module.exports = {
	mode: 'jit',
	content:  [
		"./index.html",
    	"./src/**/*.{js,ts,jsx,tsx}", 
		'./safelist.txt'
	],
  darkMode: ["class"],
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        'ui-serif',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    screens: {
      xs: '576',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
				typography: (theme) => ({
					DEFAULT: {
						css: {
							color: theme('colors.gray.500'),
							maxWidth: '65ch',
						},
					},
					invert: {
						css: {
							color: theme('colors.gray.400'),
						},
					},
				}),
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('./twSafelistGenerator')({
      path: safeListFile,
      patterns: [
          `text-{${SAFELIST_COLORS}}`,
  `bg-{${SAFELIST_COLORS}}`,
  `dark:bg-{${SAFELIST_COLORS}}`,
  `dark:hover:bg-{${SAFELIST_COLORS}}`,
  `dark:active:bg-{${SAFELIST_COLORS}}`,
  `hover:text-{${SAFELIST_COLORS}}`,
  `hover:bg-{${SAFELIST_COLORS}}`,
  `active:bg-{${SAFELIST_COLORS}}`,
  `ring-{${SAFELIST_COLORS}}`,
  `hover:ring-{${SAFELIST_COLORS}}`,
  `focus:ring-{${SAFELIST_COLORS}}`,
  `focus-within:ring-{${SAFELIST_COLORS}}`,
  `border-{${SAFELIST_COLORS}}`,
  `focus:border-{${SAFELIST_COLORS}}`,
  `focus-within:border-{${SAFELIST_COLORS}}`,
  `dark:text-{${SAFELIST_COLORS}}`,
  `dark:hover:text-{${SAFELIST_COLORS}}`,
  `h-{height}`,
  `w-{width}`,
      ],
  }),
  require('@tailwindcss/typography'),
  require("tailwindcss-animate")],
}