import type { Theme } from './types';

/**
 * Alternate look: deep red.
 *
 * A plain color theme — no artwork, no overlay. It exists so the picker has a
 * real second option and so the theme plumbing is exercised by something other
 * than the default.
 *
 * `brand` is dark enough to carry white text: #b0121f against #ffffff is
 * 7.11:1, comfortably past the 4.5:1 that WCAG asks for body text. If you
 * lighten it, re-check that ratio or darken `onBrand` to match — the top bar
 * puts white text directly on this color, so getting it wrong makes the bar
 * unreadable rather than merely ugly.
 */
export const red: Theme = {
  id: 'red',
  label: 'Red',
  tagline: 'A bold alternate look',
  // Brand plus the map tint, which is the pairing the picker chip shows. The
  // two are deliberately far apart in lightness so the chip reads as two
  // colors at 28px rather than one flat blob.
  swatch: ['#b0121f', '#ef4444'],

  colors: {
    brand: '#b0121f',
    brandDark: '#8a0e18',
    brandLight: '#d8283a',
    onBrand: '#ffffff',
  },

  map: {
    // Brighter than `brand`: this is a translucent tint over satellite and
    // street tiles, so it has to stay visible against a busy, mid-tone map.
    boundaryFill: '#ef4444',
    boundaryLine: '#991b1b',
    boundaryCasing: '#ffffff',
    lightPreset2D: 'dawn',
    lightPreset3D: 'day',
  },
};
