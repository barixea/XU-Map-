# XU Campus Map

Interactive campus navigation for Xavier University – Ateneo de Cagayan.

## Quick start

```bash
npm install
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_MAPBOX_TOKEN — get one at mapbox.com/account/access-tokens
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The map works with just `NEXT_PUBLIC_MAPBOX_TOKEN`. Add the other variables when you're ready to deploy and test admin photo uploads.

## Deploying to Vercel

1. Push to GitHub
2. Import the repo into Vercel
3. Add these environment variables in the Vercel dashboard:

   - `NEXT_PUBLIC_MAPBOX_TOKEN` — your public Mapbox token (Production, Preview, Development)
   - `ADMIN_PASSWORD` — generate with `openssl rand -base64 24` (Production & Preview only)
   - `ADMIN_SESSION_SECRET` — generate with `openssl rand -base64 32` (Production & Preview only)

4. Create a Vercel Postgres database: Storage → Create Database → Postgres
5. Connect it to the project — `DATABASE_URL` auto-injects
6. Run the schema: `vercel env pull .env.local && npm run db:push`
7. Create a Vercel Blob store: Storage → Create Database → Blob (auto-connected)

Admin panel: `/admin/login` → enter `ADMIN_PASSWORD` → upload photos at `/admin/photos`.

## Updating building data

Real coordinates matter. The placeholder lat/lngs in [data/buildings.ts](data/buildings.ts) are rough estimates — use [geojson.io](https://geojson.io) over satellite imagery to capture accurate centroids before launch.

Building IDs are stable keys: the Blob path and database row both use them. Renaming an ID orphans the existing photo. To rename safely:

1. Update the Blob object's path with the new ID
2. Update the `building_id` column in Postgres
3. Update `data/buildings.ts`

Or delete the old photo and re-upload under the new ID.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, React 19, Server Components)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) (via [react-map-gl](https://visgl.github.io/react-map-gl/))
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (image storage)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (photo metadata)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## Architecture decisions

**Why client-side Blob upload?** Vercel serverless functions cap request bodies at 4.5 MB. Phone photos routinely exceed that. The browser uploads directly to Blob storage after the API route issues a scoped, short-lived token. See [app/api/admin/photos/upload/route.ts](app/api/admin/photos/upload/route.ts).

**Why Postgres when it's just photos?** The MVP can drop it entirely — write each upload to a deterministic Blob path and resolve URLs with a cached `list()` call. Zero schema, zero connection strings. Postgres matters when you add captions, multiple photos per building, upload history, or audit trails. The code already has the split: Postgres is opt-in and the app boots without `DATABASE_URL`.

**Why middleware for auth instead of a layout check?** Middleware is the coarse gate — it redirects unauthenticated `/admin/*` requests early before any page logic runs. Every admin route handler and page *still* calls `requireAdmin()` itself; middleware alone is not the security boundary.

## License

MIT

