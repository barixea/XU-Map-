'use client';

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
      className="absolute left-4 top-4 z-10 flex rounded-lg bg-white/95 p-1 shadow-md ring-1 ring-black/5 backdrop-blur"
    >
      {(['2d', '3d'] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={mode === option}
          className={`rounded-md px-3 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
            mode === option ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
