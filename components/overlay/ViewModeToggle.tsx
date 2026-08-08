'use client';

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
    <div
      role="group"
      aria-label="Map view mode"
      className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/10"
    >
      {(['2d', '3d'] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={mode === option}
          className={`size-10 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand ${
            mode === option ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
