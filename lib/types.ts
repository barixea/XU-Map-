export type BuildingCategory =
  | 'academic' | 'admin' | 'student-life' | 'chapel' | 'sports' | 'service';

export interface Office {
  name: string;
  floor?: string;
  hours?: string;
}

export interface Building {
  /** Stable slug. Also the Blob path key — never rename after photos exist. */
  id: string;
  name: string;
  /** Freshman-friendly search terms: "Magis", "SC", "the caf" */
  aliases?: string[];
  category: BuildingCategory;
  /** Mapbox order: [longitude, latitude] */
  coordinates: [number, number];
  offices: Office[];
  description?: string;
}

export interface BuildingPhoto {
  buildingId: string;
  url: string;
  caption: string | null;
  updatedAt: string;
}

export type BuildingWithPhoto = Building & { photo: BuildingPhoto | null };
