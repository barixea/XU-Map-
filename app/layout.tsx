import type { Metadata, Viewport } from 'next';
import './globals.css';

import ThemeProvider from '@/components/theme/ThemeProvider';
import { getTheme } from '@/lib/themes';
import { themeStyleSheet } from '@/lib/themes/css';
import { themeInitScript } from '@/lib/themes/init-script';

export const metadata: Metadata = {
  title: 'XU Campus Map — Xavier University Ateneo de Cagayan',
  description:
    'Find buildings and offices on the Xavier University Main Campus, Corrales Avenue, Cagayan de Oro City.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // Static per deploy, so it tracks the default theme rather than the
  // visitor's choice — browsers read this before any script runs.
  themeColor: getTheme(null).colors.brand,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
      `suppressHydrationWarning` covers the `data-theme` attribute that the
      pre-paint script in <head> sets from localStorage. The server cannot know
      the visitor's choice, so it renders no attribute and the client finds one
      — a mismatch React reports as an error. It is scoped to this element's own
      attributes and does not extend to any descendant, so a genuine mismatch
      inside the app is still reported.
    */
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Color variables for every theme; `data-theme` picks which block wins. */}
        <style dangerouslySetInnerHTML={{ __html: themeStyleSheet() }} />
        {/* Applies the stored choice before the first paint — see init-script.ts. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
