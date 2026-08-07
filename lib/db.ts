import postgres from 'postgres';

declare global {
  var __sql: ReturnType<typeof postgres> | undefined;
}

export const hasDatabase = Boolean(process.env.DATABASE_URL);

/**
 * Lazily constructed so the app still boots before Postgres is provisioned —
 * `getSql()` throws only when something actually tries to query.
 * `prepare: false` is required for transaction-mode poolers
 * (Supabase pgBouncer, Neon pooled endpoint).
 */
export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  if (!global.__sql) {
    global.__sql = postgres(process.env.DATABASE_URL, {
      max: 1,
      idle_timeout: 20,
      prepare: false,
    });
  }
  return global.__sql;
}
