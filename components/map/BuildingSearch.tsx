'use client';

import { useMemo, useState } from 'react';
import type { BuildingWithPhoto } from '@/lib/types';

/**
 * Non-map path to a building. Matters more than the map for someone who
 * already knows the name, and it's the accessible fallback on slow
 * connections or with a screen reader.
 */
export default function BuildingSearch({
  buildings,
  onSelect,
}: {
  buildings: BuildingWithPhoto[];
  onSelect: (id: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return buildings
      .filter((b) => {
        const haystack = [b.name, ...(b.aliases ?? []), ...b.offices.map((o) => o.name)]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 6);
  }, [buildings, query]);

  return (
    <div className="absolute left-1/2 top-4 z-10 w-[min(22rem,calc(100vw-9rem))] -translate-x-1/2">
      <label htmlFor="building-search" className="sr-only">
        Search buildings and offices
      </label>
      <input
        id="building-search"
        type="search"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls="building-search-results"
        aria-autocomplete="list"
        value={query}
        placeholder="Search a building or office…"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        className="w-full rounded-lg bg-white/95 px-3 py-2 text-sm shadow-md ring-1 ring-black/5 backdrop-blur placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
      />

      {open && results.length > 0 && (
        <ul
          id="building-search-results"
          role="listbox"
          className="mt-1 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5"
        >
          {results.map((b) => (
            <li key={b.id} role="option" aria-selected={false}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect(b.id);
                  setQuery('');
                  setOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
              >
                <span className="font-medium text-slate-800">{b.name}</span>
                {b.aliases?.length ? (
                  <span className="ml-2 text-xs text-slate-500">{b.aliases.join(' · ')}</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
