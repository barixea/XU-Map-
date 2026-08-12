'use client';

import { Marker } from 'react-map-gl/mapbox';
import type { BuildingCategory, BuildingWithPhoto } from '@/lib/types';

/** One dot color per category, so the map can be read without a legend. */
const CATEGORY_COLOR: Record<BuildingCategory, string> = {
  academic: 'bg-blue-600',
  admin: 'bg-slate-700',
  'student-life': 'bg-amber-600',
  chapel: 'bg-violet-600',
  sports: 'bg-emerald-600',
  service: 'bg-rose-600',
  landmark: 'bg-teal-600',
};

/** For a category added to the data but not yet given a color above. */
const FALLBACK_COLOR = 'bg-slate-600';

/**
 * Label stacked over dot. `group` is what lets the dot below react to hover
 * and focus landing on this button rather than on the dot itself.
 */
const MARKER = 'group flex cursor-pointer flex-col items-center gap-1 focus:outline-none';

/** The name chip. Long names truncate instead of covering half the campus. */
const LABEL = [
  'max-w-[9rem] truncate',
  'rounded-md bg-white/95 px-2 py-0.5',
  'text-xs font-semibold text-slate-800',
  'shadow-sm ring-1 ring-black/5',
].join(' ');

/**
 * The dot is deliberately small, so an invisible ::after pad carries the touch
 * target up to ~26px — below the label zoom threshold the dot is the only
 * thing left to tap.
 */
const DOT = [
  'relative size-2.5 rounded-full',
  'ring-[1.5px] ring-white',
  `after:absolute after:-inset-2 after:content-['']`,
  'transition-transform group-hover:scale-125',
  'group-focus-visible:scale-125 group-focus-visible:ring-slate-900',
].join(' ');

/** Held while this building owns the detail sheet. */
const DOT_SELECTED = 'scale-150';

type Props = {
  building: BuildingWithPhoto;
  /** False below LABEL_ZOOM_THRESHOLD, where chips would overlap each other. */
  showLabel: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export default function BuildingMarker({ building, showLabel, isSelected, onSelect }: Props) {
  const [longitude, latitude] = building.coordinates;
  const dotColor = CATEGORY_COLOR[building.category] ?? FALLBACK_COLOR;

  // A screen reader gets the room count as well — it is the reason to open a
  // marker, and it is the one thing the visual chip never shows.
  const spokenLabel = building.rooms.length
    ? `${building.name}. ${building.rooms.length} rooms and offices inside.`
    : building.name;

  return (
    <Marker longitude={longitude} latitude={latitude} anchor="bottom">
      <button
        type="button"
        aria-label={spokenLabel}
        aria-pressed={isSelected}
        onClick={(event) => {
          // The map clears the selection on its own click handler, so let this
          // one stop here or picking a marker would instantly deselect it.
          event.stopPropagation();
          onSelect(building.id);
        }}
        className={MARKER}
      >
        {showLabel && <span className={LABEL}>{building.name}</span>}

        <span className={`${DOT} ${dotColor} ${isSelected ? DOT_SELECTED : ''}`} />
      </button>
    </Marker>
  );
}
