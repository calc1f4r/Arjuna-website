import type { Config } from "tailwindcss";
import * as tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "rgb(120, 113, 108)",
            maxWidth: "65ch",
            a: {
              color: "hsl(var(--primary))",
              "&:hover": {
                color: "hsl(var(--primary))",
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: "rgb(168, 162, 158)",
              fontWeight: "700",
              letterSpacing: "-0.03em",
              lineHeight: "1.2",
            },
            h1: {
              fontSize: "2.5rem",
              lineHeight: "1.1",
              marginTop: "0",
              marginBottom: "1.5rem",
              color: "rgb(168, 162, 158)",
            },
            h2: {
              fontSize: "2rem",
              lineHeight: "1.2",
              marginTop: "2rem",
              marginBottom: "1.25rem",
              color: "rgb(168, 162, 158)",
            },
            h3: {
              fontSize: "1.5rem",
              lineHeight: "1.3",
              marginTop: "1.5rem",
              marginBottom: "1rem",
              color: "rgb(168, 162, 158)",
            },
            p: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
              lineHeight: "1.75",
              color: "rgb(120, 113, 108)",
            },
            ul: {
              color: "rgb(120, 113, 108)",
            },
            ol: {
              color: "rgb(120, 113, 108)",
            },
            li: {
              color: "rgb(120, 113, 108)",
            },
            code: {
              color: "hsl(var(--primary))",
              backgroundColor: "hsl(var(--secondary))",
              padding: "0.25rem",
              borderRadius: "0.25rem",
              fontWeight: "500",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "hsl(var(--secondary))",
              borderRadius: "0.5rem",
              padding: "1rem",
              borderColor: "hsl(var(--border) / 0.1)",
            },
            strong: {
              color: "rgb(168, 162, 158)",
              fontWeight: "600",
            },
            blockquote: {
              borderLeftColor: "hsl(var(--primary))",
              borderLeftWidth: "0.25rem",
              paddingLeft: "1rem",
              fontStyle: "italic",
              color: "rgb(87, 83, 78)",
            },
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-100% - 0px))" },
        },
        "aurora-flow": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-15px) scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "gradient-flow": "gradient-flow 3s ease infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        scroll: "scroll 15s linear infinite",
        "aurora-flow": "aurora-flow 10s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
