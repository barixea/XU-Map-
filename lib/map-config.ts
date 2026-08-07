import type { LngLatBoundsLike } from 'mapbox-gl';

export const CAMPUS_CENTER = { longitude: 124.6469, latitude: 8.4766 };

/**
 * [[west, south], [east, north]] — roughly a 700 x 620 m box around the
 * main campus. Tighten once real building coordinates are in; leave ~80 m
 * of slack so edge buildings can still be centered on a phone viewport.
 */
export const CAMPUS_BOUNDS: LngLatBoundsLike = [
  [124.6437, 8.4738],
  [124.6503, 8.4795],
];

export const MIN_ZOOM = 16.2;
export const MAX_ZOOM = 19.5;

export const VIEW_2D = { pitch: 0, bearing: 0, zoom: 16.9 } as const;
export const VIEW_3D = { pitch: 55, bearing: -22, zoom: 17.5 } as const;

/** Mapbox Standard ships 3D buildings and lighting presets — no manual extrusion layer. */
export const MAP_STYLE = 'mapbox://styles/mapbox/standard';

/** Below this zoom, marker labels collapse to dots to avoid overlap. */
export const LABEL_ZOOM_THRESHOLD = 17;
