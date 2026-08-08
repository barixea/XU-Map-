import type { Theme } from './types';
import { spiderman } from './spiderman';
import { xuBlue } from './xu-blue';

export type { Theme, LightPreset } from './types';

/**
 * Every theme the picker offers, in display order.
 *
 * ── Adding an event theme ────────────────────────────────────────────────
 *   1. Copy `spiderman.ts` to e.g. `intramurals.ts` and change the values.
 *   2. Import it here and add it to the array below.
 * That is the whole job — no CSS, Tailwind, or component changes.
 */
export const THEMES: Theme[] = [xuBlue, spiderman];

/** The look a first-time visitor gets, and the fallback for an unknown id. */
export const DEFAULT_THEME_ID = xuBlue.id;

/** localStorage key holding the visitor's choice. */
export const THEME_STORAGE_KEY = 'xu-map:theme';

/**
 * Resolves a stored id to a theme. Always returns something: a theme that has
 * been retired still leaves its id in someone's localStorage, and that should
 * fall back to the default rather than render an undefined palette.
 */
export function getTheme(id: string | null | undefined): Theme {
  return THEMES.find((theme) => theme.id === id) ?? xuBlue;
}
