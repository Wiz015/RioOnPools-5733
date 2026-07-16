export type Tour = {
  slug: string;
  name: string;
  shortName: string;
  price: string;
  priceNote: string;
  duration: string;
  durationHours: string;
  groupNote: string;
  image: string;
  gallery: string[];
  summary: string;
  description: string[];
  stops: { name: string; note: string }[];
  includes: string[];
  bring: string[];
  gauge: { label: string; value: string }[];
};

export const tours: Tour[] = [
  {
    slug: "rio-on-pools-mountain-pine-ridge-half-day",
    name: "Rio On Pools & Mountain Pine Ridge Half-Day Tour",
    shortName: "Half-Day Pools Tour",
    price: "$95",
    priceNote: "per person",
    duration: "Half Day",
    durationHours: "5-6 HRS",
    groupNote: "Small groups",
    image: "/images/rio-on-pools-hero.jpg",
    gallery: [
      "/images/rio-on-pools-hero.jpg",
      "/images/rio-on-pools-2.jpg",
      "/images/big-rock-falls-1.jpg",
      "/images/rio-frio-cave-1.jpg",
    ],
    summary:
      "Swim through a run of natural granite pools, walk into a limestone cavern, and cool off under a 150 foot waterfall, all in one half day inside Mountain Pine Ridge Forest Reserve.",
    description: [
      "This tour covers the signature stops of Mountain Pine Ridge Forest Reserve in a single half day loop from San Ignacio. You will swim through the terraced granite pools at Rio On Pools, walk into the wide limestone mouth of Rio Frio Cave, and finish at the base of Big Rock Falls, a 150 foot waterfall on the Privassion River with its own swimming hole.",
      "Along the drive we stop at a Pine Ridge viewpoint where the forest changes from broadleaf jungle to open pine savanna, one of the few places in Belize with this ecosystem. Your guide covers the geology, the reserve's history since 1944, and points out wildlife along the way, including the chance of spotting the rare orange breasted falcon.",
      "Pace is easy. Trails inside the reserve are short and mostly flat. This is a good fit for families, casual swimmers, and anyone short on time who still wants the full Pine Ridge experience.",
    ],
    stops: [
      { name: "Rio On Pools", note: "Swim through granite pool terraces" },
      { name: "Rio Frio Cave", note: "Walk through limestone cavern, no gear needed" },
      { name: "Big Rock Falls", note: "Swim below a 150 ft waterfall" },
      { name: "Pine Ridge Viewpoint", note: "Photo stop over the pine savanna" },
    ],
    includes: [
      "Licensed local guide",
      "Round trip transportation from San Ignacio",
      "Mountain Pine Ridge park access",
      "Bottled water",
    ],
    bring: [
      "Swimsuit under your clothes",
      "Water shoes or sandals with straps",
      "Quick dry towel",
      "Biodegradable sunscreen and insect repellent",
      "Dry change of clothes",
      "Reusable water bottle",
    ],
    gauge: [
      { label: "STOPS", value: "4" },
      { label: "DURATION", value: "5-6 HRS" },
      { label: "PRICE", value: "$95 PP" },
    ],
  },
  {
    slug: "caracol-rio-on-pools-full-day-combo",
    name: "Caracol & Rio On Pools Full-Day Combo",
    shortName: "Full-Day Combo",
    price: "$250",
    priceNote: "per person, 2 min",
    duration: "Full Day",
    durationHours: "10-11 HRS",
    groupNote: "2 person minimum",
    image: "/images/caracol-1.jpg",
    gallery: [
      "/images/caracol-1.jpg",
      "/images/caracol-2.jpg",
      "/images/pine-ridge-1.jpg",
      "/images/rio-on-pools-3.jpg",
    ],
    summary:
      "Climb Caana, the tallest structure in Belize, at the largest Maya city ever found here, then cool off in the granite pools of Rio On Pools on the drive back.",
    description: [
      "Caracol sits deep inside the Chiquibul Forest Reserve, about 2 to 3 hours each way from San Ignacio, which is why almost nobody does it as a standalone half day trip. This combo pairs the full Caracol experience with a swim stop at Rio On Pools on the return leg, so the long drive earns you two destinations instead of one.",
      "At Caracol, your guide walks you through the plazas, ball courts, and residential groups of what was once the largest Maya city in the region, with a documented population larger than modern day Belize City at its peak. You will climb Caana, the Sky Palace, standing about 43 meters (140 feet) tall, still the tallest man made structure in the country. The site was lost to the forest for centuries until a mahogany logger named Rosa Mai rediscovered it in 1938.",
      "On the way back, we stop at a Pine Ridge viewpoint before finishing at Rio On Pools, where the granite terraces make for a welcome swim after a day of ruins and forest roads. A packed lunch is included so you are fueled for the full day.",
    ],
    stops: [
      { name: "Caracol Maya Ruins", note: "Guided tour, climb Caana" },
      { name: "Pine Ridge Viewpoint", note: "Photo stop on the return leg" },
      { name: "Rio On Pools", note: "Swim in the granite pools before heading back" },
    ],
    includes: [
      "Licensed local guide",
      "Round trip transportation",
      "Caracol entrance fee",
      "Packed lunch",
      "Bottled water",
    ],
    bring: [
      "Swimsuit under your clothes",
      "Water shoes or sandals with straps",
      "Comfortable walking shoes for the ruins",
      "Quick dry towel",
      "Biodegradable sunscreen and insect repellent",
      "Camera, this is a full day of photo stops",
    ],
    gauge: [
      { label: "STOPS", value: "3" },
      { label: "DURATION", value: "10-11 HRS" },
      { label: "PRICE", value: "$250 PP" },
    ],
  },
];

export function getTourBySlug(slug: string) {
  return tours.find((t) => t.slug === slug);
}

// Controls which tours show on the home page, and in what order, by index
// into the `tours` array above. Home page supports up to 4 cards.
// Add more tours to the array above, then add their index here (0-based)
// to feature them on the home page. Example with 4 tours: [0, 1, 2, 3]
export const homeTourIndexes: number[] = [0, 1];

export function getHomeTours() {
  return homeTourIndexes
    .map((i) => tours[i])
    .filter((t): t is Tour => Boolean(t));
}
