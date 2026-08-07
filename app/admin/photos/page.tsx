import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import PhotoUploadForm from '@/components/admin/PhotoUploadForm';
import { BUILDINGS } from '@/data/buildings';
import { requireAdmin } from '@/lib/auth';
import { getBuildingsWithPhotos } from '@/lib/photos';

export default async function AdminPhotosPage() {
  const session = await requireAdmin();
  if (!session) redirect('/admin/login');

  const buildingsWithPhotos = await getBuildingsWithPhotos();

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Building photos</h1>
        <p className="mt-1 text-sm text-slate-600">
          Upload landmark photos to help freshmen visually identify buildings on campus.
        </p>
      </div>

      <PhotoUploadForm buildings={BUILDINGS} />

      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Current photos</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {buildingsWithPhotos.map((building) => (
            <li key={building.id} className="overflow-hidden rounded-lg border border-slate-200">
              <div className="relative aspect-[16/9] bg-slate-100">
                <Image
                  src={building.photo?.url ?? '/images/placeholder-building.svg'}
                  alt={building.photo?.caption ?? `${building.name} — no photo yet`}
                  fill
                  sizes="(max-width: 640px) 100vw, 384px"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-900">{building.name}</p>
                {building.photo ? (
                  <p className="mt-0.5 text-xs text-slate-500">
                    {building.photo.caption || 'No caption'}
                  </p>
                ) : (
                  <p className="mt-0.5 text-xs text-slate-400">No photo uploaded yet</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
        >
          ← Back to map
        </Link>
      </div>
    </div>
  );
}
