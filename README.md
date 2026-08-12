# XU Campus Map

An interactive, themeable campus map for Xavier University – Ateneo de Cagayan. Find buildings, rooms, offices, and explore the campus in 2D or 3D.

## Quick Start

Get the map running locally in minutes:

```bash
npm install
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_MAPBOX_TOKEN — grab one at mapbox.com/account/access-tokens (free tier works)
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and you're done! The map works with just the Mapbox token.

## Tech Stack

This is a **modern, full-stack JavaScript project** built for interactive mapping and admin content management:

### Frontend & UI
- **[Next.js 15](https://nextjs.org)** — React framework with built-in routing and edge runtime
- **[React 19](https://react.dev)** — UI components with hooks
- **[TypeScript](https://www.typescriptlang.org)** — Type-safe development end-to-end
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first styling with custom theme system

### Mapping
- **[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)** — Interactive 3D maps
- **[react-map-gl](https://visgl.github.io/react-map-gl/)** — React bindings for Mapbox

### Development Tools
- **Node.js** — JavaScript runtime
- **Git** — Version control

## Future Deployment Plan

When you're ready to go live, here's what you'll need:

### Hosting & Database
- **[Vercel](https://vercel.com)** — Serverless hosting (free tier available)
- **[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)** — Managed PostgreSQL database for photo metadata
- **[Vercel Blob](https://vercel.com/docs/storage/vercel-blob)** — Serverless file storage for building photos

### Deployment Setup
1. Push to GitHub
2. Import the repo into Vercel
3. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_MAPBOX_TOKEN` — your Mapbox public token
   - `ADMIN_PASSWORD` — generate with `openssl rand -base64 24`
   - `ADMIN_SESSION_SECRET` — generate with `openssl rand -base64 32`

4. Create a Vercel Postgres database (Storage → Create Database → Postgres)
5. Connect Blob storage (Storage → Create Database → Blob)
6. Run the schema: `vercel env pull .env.local && npm run db:push`

Then access the admin panel at `/admin/login` to upload photos!

## Updating Building Data

Accurate coordinates are important for a good map experience. The placeholder coordinates in [data/buildings.ts](data/buildings.ts) are starting estimates — use [geojson.io](https://geojson.io) over satellite imagery to capture real building centroids.

**Important:** Building IDs are permanent keys used for photo storage. Changing an ID after photos are uploaded will orphan them. To safely rename:

1. Update the file path in Blob storage with the new ID
2. Update the `building_id` in your database
3. Update `data/buildings.ts`

Or just delete the old photo and re-upload under the new ID.

## Features

- **2D & 3D Modes** — Switch between flat and tilted 3D views
- **Theme System** — Built-in themes (XU Blue, Red) with easy extension
- **Building Search** — Find buildings by name or rooms inside them
- **Geolocation** — Show your current location on the map
- **Photo Gallery** — Admin panel to upload and manage building photos
- **Secure Auth** — Password-protected admin area

## 📄 License

MIT

