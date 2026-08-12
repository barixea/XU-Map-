'use client';

import Image from 'next/image';
import type { BuildingWithPhoto } from '@/lib/types';

/**
 * On a phone this rises from the bottom edge and is capped at 62dvh, so you can
 * still see the marker you tapped. From `md` the same panel is re-anchored as a
 * full-height rail down the right side.
 */
const SHEET = [
  'absolute inset-x-0 bottom-0 z-10 max-h-[62dvh] overflow-y-auto',
  'rounded-t-2xl bg-white shadow-2xl',
  'md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-96',
  'md:rounded-none md:rounded-l-2xl',
].join(' ');

/**
 * `relative` is required — next/image with `fill` positions itself against the
 * nearest positioned ancestor. The grey fill is what you see while it loads.
 */
const PHOTO_FRAME = 'relative aspect-[16/9] w-full bg-slate-100';

/** Tinted and blurred rather than solid, so the photo still reads underneath. */
const CLOSE_BUTTON = [
  'absolute right-3 top-3',
  'grid size-9 place-items-center rounded-full',
  'bg-black/60 text-white backdrop-blur',
  'transition hover:bg-black/75',
  'focus-visible:ring-2 focus-visible:ring-white',
].join(' ');

/** Small caps eyebrow above a group, quieter than the building name. */
const SECTION_LABEL = 'text-xs font-semibold uppercase tracking-wide text-slate-500';

type Props = {
  /** Null when nothing is selected, which unmounts the sheet entirely. */
  building: BuildingWithPhoto | null;
  onClose: () => void;
};

/**
 * Detail panel for the selected building: photo, description, and the list of
 * rooms and offices inside it.
 *
 * `aria-modal="false"` is deliberate. This is a dialog, but it does not trap
 * focus or block the map behind it — panning and picking another marker while
 * it is open are both intended.
 */
export default function BuildingSheet({ building, onClose }: Props) {
  if (!building) return null;

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="building-sheet-title"
      className={SHEET}
    >
      <div className={PHOTO_FRAME}>
        <Image
          src={building.photo?.url ?? '/images/placeholder-building.svg'}
          alt={
            building.photo
              ? building.photo.caption ?? `Exterior view of ${building.name}`
              : `No photo available for ${building.name} yet`
          }
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          className="object-cover"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close building details"
          className={CLOSE_BUTTON}
        >
          ✕
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h2 id="building-sheet-title" className="text-lg font-semibold text-slate-900">
            {building.name}
          </h2>
          {building.description && (
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{building.description}</p>
          )}
        </div>

        <div>
          <h3 className={SECTION_LABEL}>Rooms and offices</h3>
          {building.rooms.length > 0 ? (
            <ul className="mt-2 divide-y divide-slate-100">
              {building.rooms.map((room) => (
                <li key={room} className="py-2 text-sm text-slate-800">
                  {room}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">Not listed yet.</p>
          )}
        </div>
      </div>
    </aside>
  );
}
