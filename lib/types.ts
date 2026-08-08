export type BuildingCategory =
  | 'academic' | 'admin' | 'student-life' | 'chapel' | 'sports' | 'service' | 'landmark';

export interface Building {
  /** Stable slug. Also the Blob path key — never rename after photos exist. */
  id: string;
  name: string;
  /** Freshman-friendly search terms: "Magis", "SC", "the caf" */
  aliases?: string[];
  category: BuildingCategory;
  /** Mapbox order: [longitude, latitude] */
  coordinates: [number, number];
  /**
   * Rooms and offices inside this building, one free-form string each —
   * "Registrar", "Room 204", "Dean's Office, 3F". Searching any of these
   * surfaces the building, so write them the way a student would type them.
   */
  rooms: string[];
  /** Shown in the detail sheet. Empty string renders nothing. */
  description: string;
}

export interface BuildingPhoto {
  buildingId: string;
  url: string;
  caption: string | null;
  updatedAt: string;
}

export type BuildingWithPhoto = Building & { photo: BuildingPhoto | null };
