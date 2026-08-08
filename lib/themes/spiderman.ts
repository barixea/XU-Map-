import type { Theme } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  EDIT ME — every value below is a starting point, not a decision.
 *  Change the hexes, the label, the tagline. The theme system does not
 *  care what the numbers are; it only reads this object.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Event theme: Spider-Man.
 *
 * Classic red suit for the brand, web blue for the map outline. `onBrand` is
 * white because the red is dark enough to carry white text — if you lighten
 * `brand`, darken `onBrand` to match or the top bar becomes unreadable.
 */
export const spiderman: Theme = {
  id: 'spiderman',
  label: 'Spider-Man',
  tagline: 'Event theme',
  swatch: ['#C6162C', '#1A2E7A'],

  colors: {
    brand: '#C6162C',
    brandDark: '#8E0F1F',
    brandLight: '#E23A4E',
    onBrand: '#ffffff',
  },

  map: {
    boundaryFill: '#C6162C',
    boundaryLine: '#1A2E7A',
    boundaryCasing: '#ffffff',
    lightPreset2D: 'dawn',
    lightPreset3D: 'day',
  },

  /*
   * Top-bar decoration. Drop an SVG or PNG at
   * `public/themes/spiderman/web.svg`, then uncomment this block:
   *
   *   accent: {
   *     image: '/themes/spiderman/web.svg',
   *     className: 'opacity-25 bg-[length:auto_100%] bg-repeat-x',
   *   },
   *
   * It is left commented out so the app never requests a file that is not
   * there yet. The image tiles across the bar under the wordmark and search.
   */
};
