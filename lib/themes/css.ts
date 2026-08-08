import { DEFAULT_THEME_ID, THEMES } from './index';
import type { Theme } from './types';

/**
 * Compiles every theme into CSS custom properties, one block per theme.
 *
 * Emitted as a real stylesheet — rather than set from JavaScript — so that a
 * returning visitor's theme is already painted on the first frame. The
 * pre-paint script in `init-script.ts` only has to flip an attribute; it never
 * needs to know a single color.
 */

/**
 * Hex to space-separated RGB channels: '#293871' → '41 56 113'.
 *
 * Tailwind's `<alpha-value>` placeholder needs the channels bare, not wrapped
 * in `rgb()`, so that `bg-brand/50` can compose into `rgb(41 56 113 / 0.5)`.
 */
function toChannels(hex: string): string {
  const raw = hex.trim().replace(/^#/, '');
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;

  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    // Thrown during the layout render, so `next build` fails loudly on a typo
    // instead of shipping a theme with a silently broken color.
    throw new Error(`Invalid theme color "${hex}" — expected #rgb or #rrggbb.`);
  }

  const n = parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

function variables(theme: Theme): string {
  const { brand, brandDark, brandLight, onBrand } = theme.colors;
  return [
    `--brand:${toChannels(brand)}`,
    `--brand-dark:${toChannels(brandDark)}`,
    `--brand-light:${toChannels(brandLight)}`,
    `--on-brand:${toChannels(onBrand)}`,
  ].join(';');
}

/** Ids reach a CSS selector and an HTML attribute, so keep them boring. */
function assertSafeId(id: string): string {
  if (!/^[a-z0-9-]+$/.test(id)) {
    throw new Error(`Invalid theme id "${id}" — use lowercase letters, digits, and dashes.`);
  }
  return id;
}

export function themeStyleSheet(): string {
  const blocks = THEMES.map((theme) => {
    const vars = variables(theme);
    const selector = `[data-theme="${assertSafeId(theme.id)}"]`;
    // The default also lands on :root so the very first paint — before the
    // pre-paint script has run, and for anyone with storage disabled — is
    // already correct rather than unstyled.
    return theme.id === DEFAULT_THEME_ID
      ? `:root,${selector}{${vars}}`
      : `${selector}{${vars}}`;
  });

  return blocks.join('');
}
