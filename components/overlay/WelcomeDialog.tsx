'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * First-visit popup.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  EDIT ME — everything inside <DialogBody /> below is placeholder copy.
 *  Replace it with whatever the welcome message should say. The dialog
 *  mechanics (first-visit gating, Escape to close, focus handling) live
 *  outside it, so you can rewrite the body freely without touching them.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Shown once per browser: dismissing it writes STORAGE_KEY to localStorage.
 * Bump the version suffix to show it again to everyone after an edit, or set
 * SHOW_EVERY_VISIT to true while you are working on the copy.
 */
const STORAGE_KEY = 'xu-map:welcome-seen:v1';
const SHOW_EVERY_VISIT = true;

function DialogBody() {
  return (
    <>
      <h2 id="welcome-title" className="text-lg font-semibold text-slate-900">
        Welcome to the XU Campus Map
      </h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-600">
        <p>Hello, dev here this is the Version 1.0! And note this is not affiliated with the university.</p>
        <p>
          Search for a building, room, or office in the bar at the top, or tap any point on the map
          to see what is inside it.
        </p>
      </div>
    </>
  );
}

export default function WelcomeDialog() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // localStorage is read after mount, never during render — reading it in the
  // render pass would desync the server and client HTML and throw a hydration
  // error, since the server has no way to know what this browser has seen.
  useEffect(() => {
    if (SHOW_EVERY_VISIT) {
      setOpen(true);
      return;
    }
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      // Private mode or storage disabled — show it and simply don't persist.
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Nothing to do — the dialog just reappears next visit.
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      onClick={dismiss}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <DialogBody />

        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          className="mt-5 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
