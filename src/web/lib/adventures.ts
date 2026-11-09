export interface Adventure {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  gallery: string[];
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  groupSize: string;
  price: number;
  gearProvided: string[];
  safetyInfo: string[];
  highlights: string[];
  testimonials: {
    name: string;
    rating: number;
    comment: string;
  }[];
}

export const adventures: Adventure[] = [
  {
    id: '10',
    title: 'Caracol + Pine Ridge',
    slug: 'caracol-pine-ridge-full-day',
    category: 'Ruins & Waterfalls',
    shortDescription: 'Our signature full day: climb Caana, the tallest structure in Belize at Caracol, then cool off at Rio On Pools, Big Rock Falls and Rio Frio Cave in the Mountain Pine Ridge. Two legendary places, one epic day. Transportation included.',
    longDescription: 'This is the big one. Our Caracol + Pine Ridge Full Day Tour bundles Belize\'s greatest Maya city with the country\'s most spectacular highland scenery into a single unforgettable expedition. The day starts early with a scenic drive up into the Maya Mountains, climbing out of the lowland jungle into cool pine forest, granite outcrops and mountain air. Deep in the Chiquibul Forest you reach Caracol, the largest ancient Maya site in Belize. It is remarkably uncrowded, so you can climb Caana, the sky palace that still stands as the tallest man-made structure in the country, and take in 360-degree views over unbroken rainforest into Guatemala. Your guide unpacks the site\'s incredible history, including the day in 562 AD when Caracol defeated the mighty Tikal, recorded on carved stone altars, along with its ball courts, plazas and hieroglyphic monuments. On the way back you trade ruins for waterfalls. At Rio On Pools you swim through a chain of granite pools linked by natural rock slides. Big Rock Falls thunders down over massive boulders into an emerald pool, and Rio Frio Cave opens into a cathedral-sized chamber you can walk straight through. It is a long, rich day that pairs ancient history with wild swimming and postcard views. Transportation is included, and pricing may vary slightly depending on your pickup location.',
    image: 'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol-maya-structures.jpg?tr=w-1600%2Cq-90%2Cf-auto',
    gallery: [
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765777601/caracol-img7_e5lylt.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771886/Big-Rock-Falls-in-the-Mountain-Pine-Ridge-Forest-Reserve-Cayo-Belize_r4fapg.webp',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765777594/caracol-img5_ie9jbn.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771868/BigRockFalls_DSC4414_300rgb-1_vpr31h.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765777597/caracol-img6_am36zs.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/rio-on-pools.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/on-the-way-to-caracol.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol-mayan-structure.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol-maya-structures.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/rioonpools-img.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/big-rock-falls-view.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol-mayan-ruins-highview.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/bigrockfalls.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/sign-caracol.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol-mayan-ruins00.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/rioonpools-onway.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol-temple.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol-mayan-temples.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/waterfall-big-rock-falls.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol-view.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/rio-on-pools-waterdrop.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol--river.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol-mayan-ruins.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol-rainy%20weather.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/fri-cave-shot-long-exposure.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/frio-cave.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/view-over-the-jungle.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/temple--caracol.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Caracol%20+%20Pine%20Ridge/caracol--plaza.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771867/belize-grand-jaguar-tours_bif-rock-falls-pine-ridge1_vtvmpr.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765777591/caracol-img3_c4rziz.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771865/458542131_917886037034367_5173860859398982782_n_ypgsq3.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765777587/caracol-img4_xkjgju.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771864/458495410_917886017034369_255043436152936808_n_tijujj.jpg'
    ],
    duration: '6-10 hours',
    difficulty: 'Moderate',
    groupSize: '3+',
    price: 160,
    gearProvided: [
      'Expert archaeological & nature guide',
      'Round-trip transportation in vehicle',
      'Caracol site entrance fees',
      'Mountain Pine Ridge scenic drive',
      'Swimming time at Rio On Pools',
      'Lunch is included',
      'Multiple photo & waterfall stops'
    ],
    safetyInfo: [
      'Pricing changes for pickups outside San Ignacio',
      'Price shown assumes a 3-person minimum; adjusted pricing applies for 1–2 guests.',
      'Full site tour at Caracol (3-4 hours)',
      'Rio On Pools & Rio Frio Cave visits',
      'Comfortable hiking shoes recommended',
      'Bring swimwear, water and sun protection',
      'Long day - early departure required'
    ],
    highlights: [
      'Climb Caana, the tallest structure in Belize',
      'Largest ancient Maya site in the country',
      'Swim at Rio On Pools & see Big Rock Falls',
      'Explore the vast Rio Frio Cave chamber',
      'Transportation & entrance fees included'
    ],
    testimonials: [
      {
        name: 'Lisa P.',
        rating: 5,
        comment: 'The best day of our whole trip. Caracol was massive and we practically had it to ourselves, then we cooled off at the waterfalls on the way home. Incredible value for a full day.'
      },
      {
        name: 'James T.',
        rating: 5,
        comment: 'Two bucket-list places in one tour. Our guide knew the Maya history inside out and the Pine Ridge waterfalls were stunning. Long day but worth every minute.'
      }
    ]
  },
  {
    id: '1',
    title: 'Cave Tubing Belize',
    slug: 'cave-tubing-belize',
    category: 'Water Adventure',
    shortDescription: 'Float through ancient Mayan caves on inner tubes along underground rivers. Experience stunning stalactites and stalagmites in the Caves Branch cave system.',
    longDescription: 'Cave Tubing Belize is our most popular tour and for good reason! This incredible adventure takes you deep into the heart of the Belizean jungle to explore the ancient cave systems of the Caves Branch River. After a scenic 30-minute hike through lush rainforest, you\'ll float on inner tubes through a series of spectacular limestone caves adorned with stunning stalactites and stalagmites. The caves were sacred to the ancient Maya, who believed them to be portals to Xibalba, the underworld. As you drift along the underground river, your guide will illuminate the formations with headlamps while sharing fascinating stories about Mayan culture, geology, and local wildlife. The experience is both relaxing and exhilarating - perfect for all fitness levels and a must-do activity in Belize!',
    image: 'https://res.cloudinary.com/dbprf7diz/image/upload/v1767631236/sthermans_img18_fkzwdx.jpg',
    gallery: [
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772494/GOPR0543_v86qvz.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772492/GOPR0426_bqnwqk.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772488/robin-canfield-iq4NMisXz7o-unsplash_a58e3j.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772486/GOPR0597_xuisgt.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772484/GOPR0492_ryfnr8.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772482/GOPR0173_quxjqx.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765922286/WhatsApp_Image_2025-12-16_at_3.51.58_PM_m74hfs.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765922286/WhatsApp_Image_2025-12-16_at_3.51.59_PM_ewuyb1.jpg'
    ],
    duration: '2 hours',
    difficulty: 'Easy',
    groupSize: '2+',
    price: 60,
    gearProvided: [
      'Inner tubes and safety equipment',
      'Personal guide',
      'Helmets with headlamps',
      'Life jackets',
      'Park entrance fee',
    ],
    safetyInfo: [
      'Professional certified tour guide included',
      'All participants must be comfortable in water',
      'Scenic 30-minute jungle hike to cave entrance',
      'Transportation can be included for an additional fee'
    ],
    highlights: [
      'Professional guide included',
      'All equipment provided',
      'Scenic jungle hike to cave entrance',
      'Entrance fee not included',
    ],
    testimonials: [
      {
        name: 'Sarah M.',
        rating: 5,
        comment: 'Absolutely magical floating through those ancient caves! The stalactites are incredible and our guide made the Mayan history come alive. A must-do in Belize!'
      },
      {
        name: 'David L.',
        rating: 5,
        comment: 'Best tour we did in Belize! The cave formations are stunning and the whole experience was so peaceful yet adventurous. Our guide was fantastic!'
      }
    ]
  },
  {
    id: '2',
    title: 'Xunantunich Belize',
    slug: 'xunantunich-belize',
    category: 'Archaeological Tour',
    shortDescription: 'Explore the magnificent El Castillo temple rising 130 feet above the jungle. Discover ancient Mayan hieroglyphics and panoramic views of Guatemala.',
    longDescription: 'Xunantunich is a crown jewel of Belizean archaeology and a must-visit for anyone interested in ancient Mayan civilization. After crossing the Mopan River on a traditional hand-cranked ferry, you\'ll enter this remarkably preserved ceremonial center. The highlight is climbing El Castillo ("The Castle"), where you\'ll be rewarded with stunning panoramic views stretching into Guatemala. The pyramid\'s eastern facade features an intricate stucco frieze depicting the Mayan cosmos. Your expert guide will explain the astronomical significance of the site\'s layout, the hieroglyphic inscriptions, and the sophisticated engineering of ancient Mayan architecture. Walk through multiple plazas, explore residential areas, and imagine life in this thriving city over 1,000 years ago!',
    image: 'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772219/xunan01_ocragj.png',
    gallery: [
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772219/xunan01_ocragj.png',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772216/p1065784_mbr1bp.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772214/xunantunich_nwam56.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/xunantunich-img.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/temple-view-xunantunich.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/temple-highview-xunantunich.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/temple-highview-xunantunich.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/xunan-temp.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/xunantunich-ferry-crossing.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/xunantunich-temp.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/xunantunich-temple-view.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/maya-ruins-xunan.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/xunan-view.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/Xunantunich/xunantunich-afternoon-view.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772212/xunantunich-mayan-ruin-belize_xxmbbt.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772210/mayaruin2_qvfahg.png',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772208/ch1_qzkkki.jpg'
    ],
    duration: '2–3 hours',
    difficulty: 'Moderate',
    groupSize: '2+',
    price: 85,
    gearProvided: [
      'Expert archaeological guide',
      'Hand-cranked ferry river crossing',
      'Site entrance fees'
    ],
    safetyInfo: [
      'Comfortable walking shoes required',
      'Climbing steep temple steps',
      'Bring hat and sunscreen - it gets hot!',
      'Time to explore all structures at your own pace',
      'Transportation can be included for an additional fee'
    ],
    highlights: [
      'Expert archaeological guide',
      'Hand-cranked ferry crossing',
      'Climb El Castillo temple',
      'Historical insights & stories',
    ],
    testimonials: [
      {
        name: 'Michael K.',
        rating: 5,
        comment: 'The view from the top of El Castillo is absolutely breathtaking! Our guide was incredibly knowledgeable about Mayan history. A perfect half-day trip!'
      },
      {
        name: 'Emily R.',
        rating: 5,
        comment: 'Fascinating site with amazing views! The hand-cranked ferry was a fun touch. Learning about the ancient Maya civilization was the highlight of our trip.'
      }
    ]
  },
  {
    id: '3',
    title: 'ATM Cave',
    slug: 'atm-cave',
    category: 'Extreme Adventure',
    shortDescription: 'Belize\'s most famous cave expedition. Wade, swim, and climb through pristine chambers to see ancient Mayan artifacts and the Crystal Maiden skeleton.',
    longDescription: 'The ATM Cave tour is Belize\'s most iconic and unforgettable adventure! This isn\'t just a cave tour - it\'s a journey into the sacred underworld of the ancient Maya. After hiking 45 minutes through the rainforest and crossing three rivers, you\'ll swim into the cave entrance. Inside, you\'ll wade, scramble, and climb through otherworldly chambers filled with stalactites, stalagmites, and flowstone formations. The climax is the Cathedral Chamber, where you\'ll walk in socks across sacred ground to view Mayan pottery, ceremonial vessels, and human remains including the famous Crystal Maiden. The artifacts are completely intact, untouched for over 1,000 years. This is one of the most significant archaeological sites in Central America and a truly humbling experience. Note: This tour requires good physical fitness and is not recommended for claustrophobic individuals.',
    image: 'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/atm-cave-upper-skeleton.jpg',
    gallery: [
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772201/atm-cave-edited_jprno4.png',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772200/offering-cave-belize-pottery-02_1_wrfl7f.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/atm-skeleton.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/actun-tunichil-muknal-pottery.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/actun-tunichil-muknal-pots.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/actun-tunichil-muknal-skeleton.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/atm-cave-upper-skeleton.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/actun-tunichil-muknal-cave-chamber.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/atm-cave-entrance.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/actun-tunichil-muknal-skull.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/actun-tunichil-muknal-skeleton-full.jpg',
      'https://ik.imagekit.io/RWTG26/Tours%20Images/ATM%20Cave/mayan-skull.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765772197/ATM-Entrance-1_nygasg.jpg',
      'https://images.unsplash.com/photo-1667335630390-62687b685013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
    ],
    duration: '4-5 hours',
    difficulty: 'Challenging',
    groupSize: '3+',
    price: 150,
    gearProvided: [
      'Expert cave guide',
      'All safety equipment and helmets',
      'Headlamps',
      'Park entrance fees',
      'Lunch included'
    ],
    safetyInfo: [
      '40 inches height required (challenging terrain)',
      'Water shoes with good grip required',
      'Physical fitness required',
      'NO CAMERAS strictly prohibited inside cave',
      'River crossings and cave entry included',
      'Transportation can be included for an additional fee'
    ],
    highlights: [
      'Full day adventure experience',
      'See Mayan artifacts & Crystal Maiden',
      '40 inch height requirement (challenging terrain)',
    ],
    testimonials: [
      {
        name: 'Alex C.',
        rating: 5,
        comment: 'This was bucket-list worthy! Seeing the Crystal Maiden and artifacts in their original context was deeply moving. Challenging but absolutely incredible!'
      },
      {
        name: 'Jennifer B.',
        rating: 5,
        comment: 'The most adventurous thing I\'ve ever done! The caves are enormous and the history is fascinating. Worth every challenging moment!'
      }
    ]
  },
  {
    id: '6',
    title: '7 Mile Cave Kayaking',
    slug: '7-mile-cave-kayaking',
    category: 'Water Adventure',
    shortDescription: 'Paddle 7 miles through Caves Branch Cave system. Experience the longest navigable cave river in Belize with ancient Mayan ceremonial sites.',
    longDescription: 'The 7 miles Cave Branch Cave kayaking tour is one of Belize\'s most unique and peaceful adventures. Unlike the more strenuous cave tours, this experience allows you to explore at a relaxed pace while sitting comfortably in a kayak. As you paddle deeper into the cave, the outside world fades away and you\'re surrounded by the otherworldly beauty of limestone formations sculpted over millions of years. The cave extends over 7 miles into the mountain, though tours typically explore 1-2 miles depending on water levels. Your guide paddles alongside you, sharing stories of ancient Mayan ceremonies and pointing out archaeological remains. The silence is profound - interrupted only by the gentle splash of paddles and occasional echo of water dripping from stalactites. This tour is perfect for those who want a cave experience without the intense physical demands of ATM Cave.',
    image: 'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.59.08%20PM.jpeg?updatedAt=1774723930169&tr=q-90,f-auto',
    gallery: [
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.59.08%20PM.jpeg?updatedAt=1774723930169&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.41.48%20PM%20(1).jpeg?updatedAt=1774723930170&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.59.30%20PM.jpeg?updatedAt=1774723930162&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.59.25%20PM.jpeg?updatedAt=1774723930073&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.41.47%20PM.jpeg?updatedAt=1774723930011&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.41.38%20PM.jpeg?updatedAt=1774723929997&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.59.28%20PM.jpeg?updatedAt=1774723929971&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.41.36%20PM.jpeg?updatedAt=1774723929964&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.59.30%20PM%20(4).jpeg?updatedAt=1774723929961&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.59.22%20PM.jpeg?updatedAt=1774723929889&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.41.40%20PM.jpeg?updatedAt=1774723929857&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.41.35%20PM.jpeg?updatedAt=1774723929839&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.41.43%20PM.jpeg?updatedAt=1774723929795&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.59.30%20PM%20(1).jpeg?updatedAt=1774723929694&tr=q-90,f-auto',
      'https://ik.imagekit.io/belizecavekayaking/7%20Mile%20Kayaking/WhatsApp%20Image%202026-03-28%20at%2012.59.30%20PM%20(3).jpeg?updatedAt=1774723929659&tr=q-90,f-auto',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771956/WhatsApp_Image_2025-05-29_at_11.50.40_PM_2_f9axkk.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771954/WhatsApp_Image_2025-05-29_at_11.50.37_PM_kww0w7.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771952/WhatsApp_Image_2025-05-29_at_11.48.08_PM_2_dercpt.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771950/WhatsApp_Image_2025-05-29_at_11.48.09_PM_efsqmh.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771949/WhatsApp_Image_2025-05-29_at_11.48.07_PM_on0hgt.jpg',
      'https://res.cloudinary.com/dbprf7diz/image/upload/v1765771947/WhatsApp_Image_2025-05-29_at_11.48.02_PM_i1xwde.jpg'
    ],
    duration: '4-5 hours',
    difficulty: 'Moderate',
    groupSize: '2+',
    price: 145,
    gearProvided: [
      'Single or double kayaks',
      'Life jackets and helmets',
      'Headlamps',
      'Paddles and safety equipment',
      'Basic kayaking instruction',
      'Transportation from Exit to meeting point',
      'Lunch Included'
    ],
    safetyInfo: [
      'Professional cave guide included',
      'No previous kayaking experience required',
      'Water shoes or sandals with straps required',
      'Cave entrance fees included'
    ],
    highlights: [
      'Kayaking through cave system',
      'View Mayan pottery shards',
      'Headlamp provided',
      'Unique underground experience'
    ],
    testimonials: [
      {
        name: 'Rachel W.',
        rating: 5,
        comment: 'Incredible adventure! The caves are stunning and kayaking through them was an unforgettable experience. So peaceful and beautiful!'
      },
      {
        name: 'Tom H.',
        rating: 5,
        comment: 'Amazing! Even as a beginner kayaker, I felt safe and had a blast exploring the underground world. The formations are spectacular!'
      }
    ]
  }
];
