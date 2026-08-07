'use client';

import 'mapbox-gl/dist/mapbox-gl.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import Map, {
  GeolocateControl,
  NavigationControl,
  Popup,
  ScaleControl,
  type MapRef,
  type ViewStateChangeEvent,
} from 'react-map-gl/mapbox';

import BuildingMarker from './BuildingMarker';
import BuildingSearch from './BuildingSearch';
import BuildingSheet from './BuildingSheet';
import ViewModeToggle from './ViewModeToggle';
import {
  CAMPUS_BOUNDS,
  CAMPUS_CENTER,
  LABEL_ZOOM_THRESHOLD,
  MAP_STYLE,
  MAX_ZOOM,
  MIN_ZOOM,
  VIEW_2D,
  VIEW_3D,
} from '@/lib/map-config';
import type { BuildingWithPhoto } from '@/lib/types';

type ViewMode = '2d' | '3d';

export default function CampusMap({ buildings }: { buildings: BuildingWithPhoto[] }) {
  const mapRef = useRef<MapRef>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('2d');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(VIEW_2D.zoom >= LABEL_ZOOM_THRESHOLD);
  const [styleReady, setStyleReady] = useState(false);

  const selected = buildings.find((b) => b.id === selectedId) ?? null;
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Camera + interaction handlers follow the view mode. Doing this
  // imperatively keeps the transition animated and avoids re-mounting the map.
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !styleReady) return;

    const is3D = viewMode === '3d';
    const preset = is3D ? VIEW_3D : VIEW_2D;

    map.easeTo({
      pitch: preset.pitch,
      bearing: preset.bearing,
      zoom: Math.max(map.getZoom(), preset.zoom),
      duration: 700,
      essential: true,
    });

    if (is3D) {
      map.dragRotate.enable();
      map.touchZoomRotate.enableRotation();
    } else {
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
    }

    // Mapbox Standard style config — 'basemap' is the import id.
    // Guarded: a custom style without these config properties would throw.
    try {
      map.setConfigProperty('basemap', 'show3dObjects', is3D);
      map.setConfigProperty('basemap', 'lightPreset', is3D ? 'day' : 'dawn');
    } catch {
      // Non-Standard style in use; the pitch change alone still reads as 3D.
    }
  }, [viewMode, styleReady]);

  const handleZoom = useCallback((e: ViewStateChangeEvent) => {
    const next = e.viewState.zoom >= LABEL_ZOOM_THRESHOLD;
    setShowLabels((prev) => (prev === next ? prev : next));
  }, []);

  const focusBuilding = useCallback(
    (id: string) => {
      const building = buildings.find((b) => b.id === id);
      if (!building) return;
      setSelectedId(id);

      const map = mapRef.current?.getMap();
      map?.easeTo({
        center: building.coordinates,
        zoom: Math.max(map.getZoom(), 17.6),
        duration: 600,
        essential: true,
      });
    },
    [buildings],
  );

  if (!token) {
    return (
      <div className="grid h-[100dvh] w-full place-items-center bg-slate-100 p-6 text-center">
        <div className="max-w-sm space-y-2">
          <h1 className="text-base font-semibold text-slate-900">Map unavailable</h1>
          <p className="text-sm text-slate-600">
            <code className="rounded bg-slate-200 px-1">NEXT_PUBLIC_MAPBOX_TOKEN</code> is not set.
            Add it to <code className="rounded bg-slate-200 px-1">.env.local</code> and restart the
            dev server.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <Map
        ref={mapRef}
        mapboxAccessToken={token}
        mapStyle={MAP_STYLE}
        initialViewState={{ ...CAMPUS_CENTER, ...VIEW_2D }}
        // --- campus lock ---
        maxBounds={CAMPUS_BOUNDS}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        // --- 2D defaults; toggled in the effect above ---
        dragRotate={false}
        pitchWithRotate={false}
        touchPitch={false}
        attributionControl
        reuseMaps
        onLoad={() => setStyleReady(true)}
        onZoom={handleZoom}
        onClick={() => setSelectedId(null)}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" visualizePitch={viewMode === '3d'} />
        <GeolocateControl
          position="top-right"
          trackUserLocation
          positionOptions={{ enableHighAccuracy: true }}
          fitBoundsOptions={{ maxZoom: 18 }}
        />
        <ScaleControl position="bottom-right" unit="metric" maxWidth={90} />

        {buildings.map((building) => (
          <BuildingMarker
            key={building.id}
            building={building}
            showLabel={showLabels}
            isSelected={building.id === selectedId}
            onSelect={focusBuilding}
          />
        ))}

        {selected && (
          <Popup
            longitude={selected.coordinates[0]}
            latitude={selected.coordinates[1]}
            anchor="bottom"
            offset={26}
            closeOnClick={false}
            closeButton={false}
            maxWidth="none"
            className="[&_.mapboxgl-popup-content]:rounded-xl [&_.mapboxgl-popup-content]:p-0 [&_.mapboxgl-popup-content]:shadow-lg"
          >
            <p className="px-3 py-2 text-sm font-medium text-slate-900">{selected.name}</p>
          </Popup>
        )}
      </Map>

      <ViewModeToggle mode={viewMode} onChange={setViewMode} />
      <BuildingSearch buildings={buildings} onSelect={focusBuilding} />
      <BuildingSheet building={selected} onClose={() => setSelectedId(null)} />
    </div>
  );
}
