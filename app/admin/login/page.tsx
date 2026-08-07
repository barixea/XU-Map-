'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setBusy(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const { error } = await response.json().catch(() => ({ error: 'Login failed' }));
        throw new Error(error);
      }

      router.push('/admin/photos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-[100dvh] place-items-center bg-slate-50 p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Admin login</h1>
          <p className="text-sm text-slate-600">Xavier University Campus Map</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={busy}
              autoFocus
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
