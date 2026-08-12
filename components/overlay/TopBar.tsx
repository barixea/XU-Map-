'use client';

import type { ReactNode } from 'react';

import ThemePicker from './ThemePicker';
import { useTheme } from '@/components/theme/ThemeProvider';

/**
 * `shrink-0` keeps the bar at its own height inside the page's flex column —
 * without it the map's `flex-1` would squeeze it. `z-20` puts it above the map
 * so the search results panel can hang down over the canvas.
 */
const BAR = 'relative z-20 flex h-12 shrink-0 items-center gap-3 bg-brand px-3 shadow-sm sm:h-14 sm:px-4';

/** Painted over the brand fill and under the content — see the note below. */
const ACCENT_LAYER = 'pointer-events-none absolute inset-0 bg-repeat-x';

/**
 * `relative` lifts the wordmark above the accent layer without a z-index.
 * Truncates rather than wraps, since the bar has a fixed height.
 */
const WORDMARK = 'relative truncate text-[13px] font-semibold tracking-wide text-brand-fg sm:text-base';

/**
 * On a phone the search sits in the flex row and `ml-auto` pushes it right of
 * the wordmark. From `sm` it leaves the flow and centres itself on the bar,
 * which is why the negative translate and the `sm:ml-0` reset appear together.
 */
const SEARCH_SLOT = [
  'relative ml-auto w-full max-w-xs',
  'sm:absolute sm:left-1/2 sm:ml-0 sm:w-80 sm:-translate-x-1/2 md:w-96',
].join(' ');

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
    <header className={BAR}>
      {/*
        Optional themed decoration — a web pattern, bunting, a crest. Painted
        over the brand fill and under the content, which follows it in DOM
        order and is positioned, so it stacks on top without a z-index.
      */}
      {accent?.image && (
        <div
          aria-hidden="true"
          className={`${ACCENT_LAYER} ${accent.className ?? ''}`}
          style={{ backgroundImage: `url(${accent.image})` }}
        />
      )}

      <h1 className={WORDMARK}>
        Xavier University
        <span className="hidden sm:inline"> - Ateneo de Cagayan</span>
      </h1>

      {search ? <div className={SEARCH_SLOT}>{search}</div> : null}

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
