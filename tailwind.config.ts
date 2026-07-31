import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    // Single source of truth for page width and gutters. Every section renders
    // through the `Section` primitive, which uses this — sections no longer
    // hand-roll `max-w-7xl` with their own inconsistent padding.
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        "border-subtle": "hsl(var(--border-subtle))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        subtle: "hsl(var(--subtle-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          wash: "hsl(var(--primary-wash))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          wash: "hsl(var(--destructive-wash))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          wash: "hsl(var(--warning-wash))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          wash: "hsl(var(--success-wash))",
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
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      // 12px ceiling. `rounded-3xl` on cards was the strongest
      // consumer-product signal in the previous visual language.
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
      },
      // Display type tightens its tracking as it scales, so large sizes read
      // as engineered rather than merely big.
      fontSize: {
        display: [
          "clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.022em", fontWeight: "660" },
        ],
        h3: [
          "1.25rem",
          { lineHeight: "1.3", letterSpacing: "-0.012em", fontWeight: "640" },
        ],
        eyebrow: [
          "0.6875rem",
          { lineHeight: "1", letterSpacing: "0.16em", fontWeight: "600" },
        ],
      },
      maxWidth: {
        prose: "68ch",
      },
      // The layout loads Geist and sets these CSS variables, but nothing
      // referenced them — body text was falling back to the default
      // system stack while the webfont downloaded unused.
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        micro: "120ms",
        standard: "200ms",
        entrance: "320ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 200ms cubic-bezier(0.22, 1, 0.36, 1)",
        "accordion-up": "accordion-up 200ms cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
