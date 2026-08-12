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
  // Uses the default theme; the browser reads this before any script runs
  themeColor: getTheme(null).colors.brand,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    {/* Suppress hydration warning for data-theme set by pre-paint script */}
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Defines colors for all themes */}
        <style dangerouslySetInnerHTML={{ __html: themeStyleSheet() }} />
        {/* Loads stored theme before the page paints */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
