import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /**
         * Theme-driven brand palette — the top bar, active controls, and
         * primary buttons. The literal values live in `lib/themes/`; the CSS
         * custom properties are emitted by `themeStyleSheet()` and swapped by
         * the `data-theme` attribute on <html>.
         *
         * The channels are bare (`41 56 113`, not `rgb(...)`) so Tailwind can
         * slot `<alpha-value>` in and `bg-brand/50` still works.
         */
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          dark: 'rgb(var(--brand-dark) / <alpha-value>)',
          light: 'rgb(var(--brand-light) / <alpha-value>)',
          /** Text and icons drawn on top of `brand`. */
          fg: 'rgb(var(--on-brand) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
