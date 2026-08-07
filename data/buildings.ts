import type { Building } from '@/lib/types';

/**
 * PLACEHOLDER COORDINATES — verify each centroid against satellite imagery
 * before shipping. Offices lists should be confirmed against the current
 * campus directory each academic year.
 */
export const BUILDINGS: Building[] = [
  {
    id: 'magis-student-complex',
    name: 'Magis Student Complex',
    aliases: ['Magis', 'MSC', 'canteen'],
    category: 'student-life',
    coordinates: [124.6472, 8.4769],
    description:
      'Food court, student organization offices, and study nooks. Most freshman orientation activities start here.',
    offices: [
      { name: 'Office of Student Affairs', floor: '2F' },
      { name: 'Central Student Government', floor: '2F' },
      { name: 'Food Court', floor: '1F', hours: 'Mon–Sat, 7:00–19:00' },
    ],
  },
  {
    id: 'science-center',
    name: 'Science Center',
    aliases: ['SC', 'Sci Cen'],
    category: 'academic',
    coordinates: [124.6465, 8.4772],
    description: 'Biology, chemistry, and physics laboratories.',
    offices: [
      { name: 'Department of Biology', floor: '3F' },
      { name: 'Department of Chemistry', floor: '2F' },
      { name: 'Physics Laboratory', floor: '4F' },
    ],
  },
  {
    id: 'campion-hall',
    name: 'Campion Hall',
    aliases: ['Campion'],
    category: 'academic',
    coordinates: [124.6467, 8.4763],
    description: 'General education classrooms and faculty rooms.',
    offices: [
      { name: 'College of Arts and Sciences Dean', floor: '1F' },
      { name: 'Faculty Rooms', floor: '2F–3F' },
    ],
  },
  {
    id: 'main-library',
    name: 'Xavier University Main Library',
    aliases: ['Library', 'Lib'],
    category: 'academic',
    coordinates: [124.6474, 8.4763],
    description: 'Circulation, reference, periodicals, and Filipiniana sections.',
    offices: [
      { name: 'Circulation Desk', floor: '1F', hours: 'Mon–Fri, 8:00–19:00' },
      { name: 'Filipiniana Section', floor: '3F' },
    ],
  },
  {
    id: 'immaculate-conception-chapel',
    name: 'Immaculate Conception Chapel',
    aliases: ['Chapel', 'ICC'],
    category: 'chapel',
    coordinates: [124.6470, 8.4757],
    offices: [{ name: 'Campus Ministry Office' }],
  },
  {
    id: 'museo-de-oro',
    name: 'Museo de Oro',
    aliases: ['Museum'],
    category: 'service',
    coordinates: [124.6462, 8.4759],
    description: 'University museum of Northern Mindanao cultural heritage.',
    offices: [{ name: 'Museum Curator' }],
  },
  {
    id: 'faber-hall',
    name: 'Faber Hall',
    aliases: [' College of Computer Studies','CS', ],
    category: 'academic',
    coordinates: [124.6462, 8.4759],
    description: 'University museum of Northern Mindanao cultural heritage.',
    offices: [{ name: 'Museum Curator' }],
  },
];

export const BUILDING_IDS = new Set(BUILDINGS.map((b) => b.id));

export function getBuilding(id: string) {
  return BUILDINGS.find((b) => b.id === id);
}
