'use client';

import type { ReactNode } from 'react';

import ThemePicker from './ThemePicker';
import { useTheme } from '@/components/theme/ThemeProvider';

/**
 * The bar across the top of the map: university wordmark on the left, building
 * search centred, theme picker on the right. Sits in normal flow above the map
 * rather than floating over it, so it never covers the northern edge of campus.
 *
 * Its background is `bg-brand`, which resolves through the active theme's CSS
 * variables — the bar recolors itself with no work here.
 */
export default function TopBar({ search }: { search?: ReactNode }) {
  const { theme } = useTheme();
  const accent = theme.accent;

  return (
    <header className="relative z-20 flex h-12 shrink-0 items-center gap-3 bg-brand px-3 shadow-sm sm:h-14 sm:px-4">
      {/*
        Optional themed decoration — a web pattern, bunting, a crest. Painted
        over the brand fill and under the content, which follows it in DOM
        order and is positioned, so it stacks on top without a z-index.
      */}
      {accent?.image && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-repeat-x ${accent.className ?? ''}`}
          style={{ backgroundImage: `url(${accent.image})` }}
        />
      )}

      <h1 className="relative truncate text-[13px] font-semibold tracking-wide text-brand-fg sm:text-base">
        Xavier University
        <span className="hidden sm:inline"> - Ateneo de Cagayan</span>
      </h1>

      {search ? (
        <div className="relative ml-auto w-full max-w-xs sm:absolute sm:left-1/2 sm:ml-0 sm:w-80 sm:-translate-x-1/2 md:w-96">
          {search}
        </div>
      ) : null}

      {/*
        On mobile the search's own `ml-auto` right-aligns the pair, so the
        picker needs no margin. From `sm` the search leaves the flow entirely,
        so the picker takes over pushing itself to the right edge.
      */}
      <div className="relative sm:ml-auto">
        <ThemePicker />
      </div>
    </header>
  );
}
