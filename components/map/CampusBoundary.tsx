'use client';

import { useMemo } from 'react';
import { Layer, Source, type LayerProps } from 'react-map-gl/mapbox';

import { useTheme } from '@/components/theme/ThemeProvider';
import { CAMPUS_BOUNDARY } from '@/data/campus-boundary';

/**
 * Campus perimeter: a tinted area with a cased outline, so university grounds
 * read as one block against the surrounding city.
 *
 * `slot` places these inside Mapbox Standard's layer stack — 'bottom' keeps the
 * tint under roads and paths, 'middle' keeps the outline under labels and POI
 * icons. Without a slot, Standard stacks custom layers above everything,
 * including the building labels.
 *
 * Colors come from the active theme. react-map-gl diffs `paint` between renders
 * and pushes only the changed properties, so switching theme recolors the
 * existing layers instead of tearing the source down and rebuilding it.
 */
export default function CampusBoundary() {
  const { theme } = useTheme();
  const { boundaryFill, boundaryLine, boundaryCasing } = theme.map;

  const fillLayer = useMemo<LayerProps>(
    () => ({
      id: 'campus-fill',
      type: 'fill',
      slot: 'bottom',
      paint: {
        'fill-color': boundaryFill,
        // Fades out as you zoom in — the tint is for orientation at a glance,
        // and would only muddy the basemap once you are reading building labels.
        'fill-opacity': ['interpolate', ['linear'], ['zoom'], 16, 0.12, 18.5, 0.04],
      },
    }),
    [boundaryFill],
  );

  /** Casing under the outline so it stays legible on dark or busy tiles. */
  const outlineCasingLayer = useMemo<LayerProps>(
    () => ({
      id: 'campus-outline-casing',
      type: 'line',
      slot: 'middle',
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': boundaryCasing,
        'line-opacity': 0.9,
        'line-width': ['interpolate', ['linear'], ['zoom'], 16, 4, 19.5, 9],
      },
    }),
    [boundaryCasing],
  );

  const outlineLayer = useMemo<LayerProps>(
    () => ({
      id: 'campus-outline',
      type: 'line',
      slot: 'middle',
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': boundaryLine,
        'line-width': ['interpolate', ['linear'], ['zoom'], 16, 1.75, 19.5, 4],
      },
    }),
    [boundaryLine],
  );

  return (
    <Source id="campus-boundary" type="geojson" data={CAMPUS_BOUNDARY}>
      <Layer {...fillLayer} />
      <Layer {...outlineCasingLayer} />
      <Layer {...outlineLayer} />
    </Source>
  );
}
