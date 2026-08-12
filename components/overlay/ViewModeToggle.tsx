'use client';

/** Matches the zoom and locate cards below it so the column reads as one unit. */
const TOGGLE_GROUP = 'flex flex-col overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/10';

/** Shared by both options; the fill and text color come from the two below. */
const OPTION = [
  'size-10 text-sm font-bold transition',
  'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand',
].join(' ');

/** The current mode, filled with the active theme's brand color. */
const OPTION_ACTIVE = 'bg-brand text-white';

/** The other mode — quiet until pointed at. */
const OPTION_IDLE = 'text-slate-600 hover:bg-slate-100';

/**
 * 2D / 3D switch. Stacked vertically so it reads as one column with the zoom
 * and locate buttons beneath it in ControlDock.
 */
export default function ViewModeToggle({
  mode,
  onChange,
}: {
  mode: '2d' | '3d';
  onChange: (mode: '2d' | '3d') => void;
}) {
  return (
    <div role="group" aria-label="Map view mode" className={TOGGLE_GROUP}>
      {(['2d', '3d'] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          // aria-pressed rather than aria-current: these are two toggles in a
          // group, and only one is on at a time.
          aria-pressed={mode === option}
          className={`${OPTION} ${mode === option ? OPTION_ACTIVE : OPTION_IDLE}`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
