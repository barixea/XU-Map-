'use client';

import dynamic from 'next/dynamic';
import type { BuildingWithPhoto } from '@/lib/types';

/** Fills the same space the map will, so nothing jumps when it swaps in. */
const LOADING_SCREEN = 'grid h-[100dvh] w-full place-items-center bg-slate-100';

// mapbox-gl touches `window` at import time, so keep it out of the server render.
const CampusMap = dynamic(() => import('./CampusMap'), {
  ssr: false,
  loading: () => (
    <div className={LOADING_SCREEN}>
      <p className="text-sm text-slate-500">Loading campus map…</p>
    </div>
  ),
});

export default function MapShell({ buildings }: { buildings: BuildingWithPhoto[] }) {
  return <CampusMap buildings={buildings} />;
}
