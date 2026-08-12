'use client';

import ViewModeToggle from './ViewModeToggle';

type Props = {
  mode: '2d' | '3d';
  onModeChange: (mode: '2d' | '3d') => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
};

/** Bottom-right, clear of the Mapbox attribution in the opposite corner. */
const DOCK = 'absolute bottom-6 right-3 z-10 flex flex-col items-end gap-2 sm:bottom-8 sm:right-4';

/** The lifted-white-card treatment shared by every cluster in the dock. */
const FLOATING = 'rounded-lg shadow-md ring-1 ring-black/10';

/**
 * Zoom in and out read as one control, so they share a card and
 * `overflow-hidden` clips their square corners to the rounded shape.
 */
const ZOOM_GROUP = `flex flex-col overflow-hidden ${FLOATING}`;

/** Hairline between the two zoom buttons inside that shared card. */
const ZOOM_DIVIDER = 'border-b border-slate-200';

/**
 * `size-10` is 40px — a comfortable thumb target. The disabled rules matter as
 * much as the hover ones: at a zoom limit the button must stop offering hover
 * feedback for a press that will do nothing.
 */
const BUTTON = [
  'grid size-10 place-items-center',
  'bg-white text-slate-700',
  'transition hover:bg-slate-100',
  'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand',
  'disabled:cursor-default disabled:text-slate-300 disabled:hover:bg-white',
].join(' ');

/**
 * Every map control in one column at the bottom-right: view mode, zoom, and
 * locate. These replace Mapbox's own NavigationControl/GeolocateControl chrome
 * so the whole cluster shares one style — the real GeolocateControl still runs
 * hidden behind `onLocate` so the user-location dot and tracking are intact.
 */
export default function ControlDock({
  mode,
  onModeChange,
  onZoomIn,
  onZoomOut,
  onLocate,
  canZoomIn,
  canZoomOut,
}: Props) {
  return (
    <div className={DOCK}>
      <ViewModeToggle mode={mode} onChange={onModeChange} />

      <div className={ZOOM_GROUP}>
        <button
          type="button"
          onClick={onZoomIn}
          disabled={!canZoomIn}
          aria-label="Zoom in"
          className={`${BUTTON} ${ZOOM_DIVIDER}`}
        >
          <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M10 4.5v11M4.5 10h11" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onZoomOut}
          disabled={!canZoomOut}
          aria-label="Zoom out"
          className={BUTTON}
        >
          <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M4.5 10h11" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        onClick={onLocate}
        aria-label="Show my location"
        className={`${BUTTON} ${FLOATING}`}
      >
        <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <circle cx="10" cy="10" r="3.25" />
          <path d="M10 1.5v3M10 15.5v3M1.5 10h3M15.5 10h3" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
