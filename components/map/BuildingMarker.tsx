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
  landmark: 'bg-teal-600',
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
        aria-label={
          building.rooms.length
            ? `${building.name}. ${building.rooms.length} rooms and offices inside.`
            : building.name
        }
        aria-pressed={isSelected}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(building.id);
        }}
        className="group flex cursor-pointer flex-col items-center gap-1 focus:outline-none"
      >
        {showLabel && (
          <span className="max-w-[9rem] truncate rounded-md bg-white/95 px-2 py-0.5 text-xs font-semibold text-slate-800 shadow-sm ring-1 ring-black/5">
            {building.name}
          </span>
        )}
        {/*
          The dot is deliberately small, so an invisible ::after pad carries the
          touch target up to ~26px — below the label zoom threshold the dot is
          the only thing left to tap.
        */}
        <span
          className={`relative size-2.5 rounded-full ring-[1.5px] ring-white transition-transform after:absolute after:-inset-2 after:content-[''] group-hover:scale-125 group-focus-visible:scale-125 group-focus-visible:ring-slate-900 ${
            CATEGORY_COLOR[building.category] ?? 'bg-slate-600'
          } ${isSelected ? 'scale-150' : ''}`}
        />
      </button>
    </Marker>
  );
}
