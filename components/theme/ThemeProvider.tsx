'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  DEFAULT_THEME_ID,
  THEME_STORAGE_KEY,
  getTheme,
  type Theme,
} from '@/lib/themes';

type ThemeContextValue = {
  /** The resolved theme object — colors, map paint, accent. */
  theme: Theme;
  themeId: string;
  setThemeId: (id: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>.');
  return ctx;
}

/**
 * Holds the active theme.
 *
 * Tailwind classes get their colors from CSS custom properties keyed off the
 * `data-theme` attribute, so components using `bg-brand` need nothing from this
 * context. It exists for the values Tailwind cannot reach — the Mapbox boundary
 * paint and lighting presets — and for the picker itself.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Starts at the default so the first client render matches the server's HTML.
  // The real value arrives in the effect below; the *visual* theme is already
  // correct by then, since the pre-paint script set the attribute before paint.
  const [themeId, setThemeIdState] = useState(DEFAULT_THEME_ID);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (!stored) return;

      const resolved = getTheme(stored).id;
      setThemeIdState(resolved);

      // A retired theme leaves its id behind in every browser that chose it.
      // `getTheme` already falls back, so nothing looks wrong — but the dead id
      // would sit there indefinitely and spring back to life if the id were
      // ever reused. Rewriting it here lets storage heal on the next load.
      if (resolved !== stored) window.localStorage.setItem(THEME_STORAGE_KEY, resolved);
    } catch {
      // Private mode or storage disabled — stay on the default.
    }
  }, []);

  const setThemeId = useCallback((id: string) => {
    const resolved = getTheme(id);
    setThemeIdState(resolved.id);
    document.documentElement.setAttribute('data-theme', resolved.id);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, resolved.id);
    } catch {
      // Choice applies for this session and simply won't persist.
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme: getTheme(themeId), themeId, setThemeId }),
    [themeId, setThemeId],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
