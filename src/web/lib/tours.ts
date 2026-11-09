import { adventures, type Adventure } from "./adventures";

export type Tour = Adventure & {
  name: string;
  shortName: string;
  description_detail: string;
  included: string[];
  requirements: string[];
};

export const tours: Tour[] = adventures.map((adventure) => ({
  ...adventure,
  name: adventure.title,
  shortName: adventure.title,
  description_detail: adventure.longDescription,
  included: adventure.gearProvided,
  requirements: adventure.safetyInfo,
}));

export function getTourBySlug(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}

// Edit these zero-based indices to choose and order the four home-page tours.
// Indices refer to the adventures array in adventures.ts:
// 0 = Caracol + Pine Ridge, 1 = Cave Tubing, 2 = Xunantunich,
// 3 = ATM Cave, 4 = 7 Mile Cave Kayaking.
export const homeTourIndexes: number[] = [0, 1, 2, 3];

export function getHomeTours() {
  return [...new Set(homeTourIndexes)].slice(0, 4)
    .map((index) => tours[index])
    .filter((tour): tour is Tour => Boolean(tour));
}
