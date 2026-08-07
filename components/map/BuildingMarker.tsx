'use client';

import { Marker } from 'react-map-gl/mapbox';
import type { BuildingCategory, BuildingWithPhoto } from '@/lib/types';

const CATEGORY_COLOR: Record<BuildingCategory, string> = {
  academic: 'bg-blue-600',
  admin: 'bg-slate-700',
  'student-life': 'bg-amber-600',
  chapel: 'bg-violet-600',
  sports: 'bg-emerald-600',
  service: 'bg-rose-600',
};

export default function BuildingMarker({
  building,
  showLabel,
  isSelected,
  onSelect,
}: {
  building: BuildingWithPhoto;
  showLabel: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const [longitude, latitude] = building.coordinates;

  return (
    <Marker longitude={longitude} latitude={latitude} anchor="bottom">
      <button
        type="button"
        aria-label={`${building.name}. ${building.offices.length} offices inside.`}
        aria-pressed={isSelected}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(building.id);
        }}
        className="group flex cursor-pointer flex-col items-center gap-1 focus:outline-none"
      >
        {showLabel && (
          <span
            className={`max-w-[9rem] truncate rounded-md px-2 py-0.5 text-xs font-semibold shadow-sm ring-1 ring-black/5 ${
              isSelected ? 'bg-slate-900 text-white' : 'bg-white/95 text-slate-800'
            }`}
          >
            {building.name}
          </span>
        )}
        <span
          className={`size-3.5 rounded-full ring-2 ring-white transition-transform group-hover:scale-125 group-focus-visible:scale-125 group-focus-visible:ring-slate-900 ${
            CATEGORY_COLOR[building.category] ?? 'bg-slate-600'
          } ${isSelected ? 'scale-150' : ''}`}
        />
      </button>
    </Marker>
  );
}
