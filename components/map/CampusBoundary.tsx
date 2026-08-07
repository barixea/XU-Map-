'use client';

import { Layer, Source, type LayerProps } from 'react-map-gl/mapbox';

import { CAMPUS_BOUNDARY } from '@/data/campus-boundary';

/**
 * Campus perimeter: a tinted area with a cased outline, so university grounds
 * read as one block against the surrounding city.
 *
 * `slot` places these inside Mapbox Standard's layer stack — 'bottom' keeps the
 * tint under roads and paths, 'middle' keeps the outline under labels and POI
 * icons. Without a slot, Standard stacks custom layers above everything,
 * including the building labels.
 */

const fillLayer: LayerProps = {
  id: 'campus-fill',
  type: 'fill',
  slot: 'bottom',
  paint: {
    'fill-color': '#2563eb',
    // Fades out as you zoom in — the tint is for orientation at a glance,
    // and would only muddy the basemap once you are reading building labels.
    'fill-opacity': ['interpolate', ['linear'], ['zoom'], 16, 0.12, 18.5, 0.04],
  },
};

/** White casing under the outline so it stays legible on dark or busy tiles. */
const outlineCasingLayer: LayerProps = {
  id: 'campus-outline-casing',
  type: 'line',
  slot: 'middle',
  layout: { 'line-join': 'round', 'line-cap': 'round' },
  paint: {
    'line-color': '#ffffff',
    'line-opacity': 0.9,
    'line-width': ['interpolate', ['linear'], ['zoom'], 16, 4, 19.5, 9],
  },
};

const outlineLayer: LayerProps = {
  id: 'campus-outline',
  type: 'line',
  slot: 'middle',
  layout: { 'line-join': 'round', 'line-cap': 'round' },
  paint: {
    'line-color': '#1d4ed8',
    'line-width': ['interpolate', ['linear'], ['zoom'], 16, 1.75, 19.5, 4],
  },
};

export default function CampusBoundary() {
  return (
    <Source id="campus-boundary" type="geojson" data={CAMPUS_BOUNDARY}>
      <Layer {...fillLayer} />
      <Layer {...outlineCasingLayer} />
      <Layer {...outlineLayer} />
    </Source>
  );
}
