/**
 * Shape of a campus map theme.
 *
 * A theme is the single source of truth for one look: the CSS custom properties
 * that drive every Tailwind `brand` utility, and the raw colors Mapbox needs at
 * runtime for the campus boundary and lighting.
 *
 * To add a theme, copy an existing file in this folder, change the values, and
 * register it in `index.ts`. Nothing else needs to change.
 */

/** Mapbox Standard's built-in lighting presets. */
export type LightPreset = 'dawn' | 'day' | 'dusk' | 'night';

export interface Theme {
  /** Stable id — persisted to localStorage and used as the `data-theme` value. */
  id: string;
  /** Name shown in the picker. */
  label: string;
  /** One line under the label in the picker. */
  tagline: string;
  /** Two hexes for the picker's swatch chip — usually brand + a map accent. */
  swatch: [string, string];

  /** Hex colors compiled into CSS custom properties. */
  colors: {
    /** Top bar, active controls, primary buttons. */
    brand: string;
    /** Hover/pressed state of anything `brand`. */
    brandDark: string;
    /** Lighter fill, currently unused by components but available as `bg-brand-light`. */
    brandLight: string;
    /** Text and icons drawn on top of `brand` — pick for contrast, not for looks. */
    onBrand: string;
  };

  /** Values handed to Mapbox at runtime; these cannot be Tailwind classes. */
  map: {
    /** Campus interior tint. */
    boundaryFill: string;
    /** Campus perimeter stroke. */
    boundaryLine: string;
    /** Wider stroke drawn under the perimeter to keep it legible on busy tiles. */
    boundaryCasing: string;
    lightPreset2D: LightPreset;
    lightPreset3D: LightPreset;
  };

  /**
   * Optional decoration layered over the top bar — a web pattern, bunting, a
   * team crest. Rendered non-interactively above the bar's background and
   * below its text.
   */
  accent?: {
    /** Path under `public/`, e.g. `/themes/intramurals/bunting.svg`. */
    image?: string;
    /** Extra classes on the overlay, e.g. opacity or background-size. */
    className?: string;
  };
}
