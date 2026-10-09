const colors = {
  cream: '#FFF8E7',
  orange: '#FF9F1C',
  beige: '#D8C7AD',
  green: '#A8C37B',
  white: '#FFFFFF',
  charcoal: '#292725',
  brown: '#3B2A20',
};

// Add each supplied photo as a static require when the image files are available.
const images = {
  logo: require('./assets/images/logo.png'),
  hero: require('./assets/images/ultimate.jpg'),
  reasonAdventure: require('./assets/images/hiking.jpg'),
  reasonSafety: require('./assets/images/ziplining-gear.jpg'),
  reasonExplore: require('./assets/images/kayaking.jpg'),
  about: require('./assets/images/about us.jpg'),
  familyMain: require('./assets/images/family.jpg'),
  family1: require('./assets/images/hero.jpg'),
  family2: require('./assets/images/lunch.jpg'),
  family3: require('./assets/images/corporate.jpg'),
  ultimateMain: require('./assets/images/hiking.jpg'),
  ultimate1: require('./assets/images/about us.jpg'),
  ultimate2: require('./assets/images/mountain.jpg'),
  ultimate3: require('./assets/images/ultimate-kayaking.jpg'),
  ziplineMain: require('./assets/images/family.jpg'),
  zipline1: require('./assets/images/ziplining-gear.jpg'),
  zipline2: null,
  zipline3: null,
  kayakingMain: require('./assets/images/hero.jpg'),
  kayaking1: require('./assets/images/kayaking.jpg'),
  kayaking2: require('./assets/images/lunch.jpg'),
  kayaking3: require('./assets/images/hiking-gear.jpg'),
  corporateMain: require('./assets/images/corporate.jpg'),
  corporate1: require('./assets/images/mountain.jpg'),
  corporate2: require('./assets/images/kayaking-gear.jpg'),
  corporate3: require('./assets/images/about us.jpg'),
  rockClimbing: require('./assets/images/rock-climbing.jpg'),
  map: null,
};

export type PackageId = 'family' | 'ultimate' | 'ziplining' | 'kayaking' | 'corporate' | 'rock';
export type MenuRoute = 'home' | 'about' | 'adventures' | 'advice' | 'booking' | 'contacts';

type PackageData = {
  name: string;
  detailTitle?: string;
  priceCents: number | null;
  tagline: string;
  description: string;
  listTagline: string;
  listImage: number;
  gallery: number[];
  includes: string[];
  specs: string[];
  tags: string[];
};

const packages: Record<PackageId, PackageData> = {
  family: {
    name: 'Family Explorer',
    priceCents: 150000,
    tagline: 'Where family time meets the great outdoors.',
    description: 'Explore nature, tackle fun challenges, spot wildlife and enjoy games that get everyone involved. From little explorers to the big ones, the Family Explorer Package is all about getting outside, having fun and creating those "remember when we..." moments together.',
    listTagline: 'Easy-going time outside for the whole family.',
    listImage: images.familyMain,
    gallery: [images.familyMain, images.family1, images.family2, images.family3],
    includes: ['Nature walking', 'Obstacle course', 'Picnic area', 'Family games', 'Guided wildlife spotting'],
    specs: ['4 to 5 hours', '6 years +', 'Easy to moderate', '4-10 people'],
    tags: ['Family friendly', 'Outdoors'],
  },
  ultimate: {
    name: 'Ultimate Adventure',
    detailTitle: 'Ultimate Adventure Day',
    priceCents: 150000,
    tagline: 'One day. Four adventures. One unforgettable escape.',
    description: 'When you can have a little bit of each adventure, why pick just one? The Ultimate Adventure Day is designed for people who want to explore new places, spend the day outside and keep the thrill going throughout the morning and afternoon. Hike through nature, fly through the trees, paddle across the water and refuel with a well-deserved lunch.',
    listTagline: 'A bigger day with more room to explore.',
    listImage: images.ultimateMain,
    gallery: [images.ultimateMain, images.ultimate1, images.ultimate2, images.ultimate3],
    includes: ['Guided hiking trail', 'Ziplining', 'Kayaking', 'Lunch', 'Safety briefing and equipment'],
    specs: ['Full day', '12 years +', 'Moderate', '4-15 people'],
    tags: ['Full day', 'Multi-activity'],
  },
  ziplining: {
    name: 'Ziplining',
    detailTitle: 'Ziplining Adventure',
    priceCents: 75000,
    tagline: 'Deep breath. Big leap. Great story.',
    description: 'Ready to see the forest from a whole new angle? Get your adrenaline going as you zip through the trees with beautiful views all around you. Our instructors will take you through everything you need to know before you take that first step. After that, it is just you, the zipline and the rush.',
    listTagline: 'A high-flying way to see the outdoors.',
    listImage: images.ziplineMain,
    gallery: [images.ziplineMain, images.zipline1],
    includes: ['Safety briefing', 'Equipment hires', 'Professional instructors'],
    specs: ['1 to 2 hours', '10 years +', 'Easy to moderate', '2-12 people'],
    tags: ['Aerial', 'Adventure'],
  },
  kayaking: {
    name: 'Kayaking',
    detailTitle: 'Kayaking Experience',
    priceCents: 75000,
    tagline: 'Go with the flow.',
    description: 'Leave the noise behind and let the water set the pace. Explore scenic rivers and lakes by kayak while enjoying the fresh air and surrounding scenery. Whether you are trying kayaking for the first time or simply looking for a different way to experience the outdoors, this is your invitation to go with the flow.',
    listTagline: 'A water-level view of the landscape.',
    listImage: images.kayakingMain,
    gallery: [images.kayakingMain, images.kayaking1, images.kayaking2, images.kayaking3],
    includes: ['Kayak and paddle', 'Safety equipment', 'Guided route'],
    specs: ['2 to 3 hours', '12 years +', 'Moderate', '2-10 people'],
    tags: ['On the water', 'Outdoors'],
  },
  corporate: {
    name: 'Corporate Adventures',
    detailTitle: 'Corporate Team Challenge',
    priceCents: 150000,
    tagline: 'Where teamwork leaves the meeting room.',
    description: 'Forget the usual team-building activities. Get your team outside and give them challenges that actually require communication, creativity and a little friendly competition. From obstacle courses to raft building and leadership challenges, this is about working together, having fun and discovering what your team can do.',
    listTagline: 'Bring your team together outside the office.',
    listImage: images.corporateMain,
    gallery: [images.corporateMain, images.corporate1, images.corporate2, images.corporate3],
    includes: ['Team obstacle course', 'Orienteering challenge', 'Raft-building activity', 'Leadership exercises', 'Team awards'],
    specs: ['Full day', '18 years +', 'Moderate', '8-30 people'],
    tags: ['Teams', 'Groups'],
  },
  rock: {
    name: 'Rock Climbing',
    priceCents: 75000,
    tagline: 'Find your next hold.',
    description: 'A climbing experience for guests who want a hands-on challenge. Ask about supervision, equipment, experience level and participant requirements.',
    listTagline: 'A focused challenge on the rock face.',
    listImage: images.rockClimbing,
    gallery: [images.rockClimbing],
    includes: ['Equipment and supervision details to be confirmed'],
    specs: ['To be confirmed', 'Ask before booking', 'Requirements apply', 'Contact for availability'],
    tags: ['Climbing', 'Challenge'],
  },
};

type FeeQuote = {
  subtotal: number;
  discountPercent: number;
  discount: number;
  vat: number;
  total: number;
};

const bookingIds: PackageId[] = ['family', 'ultimate', 'ziplining', 'kayaking', 'corporate', 'rock'];

function calculateFees(ids: PackageId[]): FeeQuote {
  const subtotal = ids.reduce((total, id) => total + (packages[id].priceCents ?? 0), 0);
  const discountPercent = ids.length >= 4 ? 15 : ids.length === 3 ? 10 : ids.length === 2 ? 5 : 0;
  const discount = Math.round(subtotal * discountPercent / 100);
  const vat = Math.round((subtotal - discount) * 15 / 100);
  return { subtotal, discountPercent, discount, vat, total: subtotal - discount + vat };
}

function formatMoney(cents: number | null) {
  if (typeof cents !== 'number' || !Number.isInteger(cents)) return 'Rate on request';
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(cents / 100);
}

export default {
  colors,
  images,
  packages,
  bookingIds,
  listIds: bookingIds,
  detailIds: bookingIds,
  defaultBookingIds: [],
  business: 'Adventure Escape SA brings people together through outdoor experiences across South Africa.',
  reasons: [
    { title: 'Adventure for every pace', text: 'Choose an experience that suits your day, your group and your appetite for a challenge.', image: images.reasonAdventure },
    { title: 'Safety comes first', text: 'Get clear activity requirements and safety information from the team before you book.', image: images.reasonSafety },
    { title: 'A reason to explore', text: 'Trade the usual routine for fresh air, new views and time well spent outside.', image: images.reasonExplore },
  ],
  about: {
    goals: 'Create welcoming outdoor experiences that make it easier for people to explore, connect and try something new.',
    vision: 'More people finding confidence, connection and joy in the outdoors.',
    mission: 'Help guests choose an adventure that fits their group, then make the planning clear and straightforward.',
    history: 'Adventure Escape SA is building a place for outdoor discovery. Add the company’s verified history here when it is available.',
  },
  advice: {
    title: 'Plan a day that fits',
    heading: 'Before you head out',
    text: 'Activity availability, age limits, equipment, weather requirements and group rates can vary. Contact the team to confirm these details before travelling.',
  },
  contact: {
    phone: '+27 72 717 7448',
    phoneUrl: 'tel:+27727177448',
    email: 'info@adventurescape.co.za',
    address: 'Adventure Escape SA, 36 Bamberry Rd, Belthorn Estate, Cape Town, 7780',
    hours: ['Mon - Sat: 08:00 - 5:00 pm', 'Sun & Public Holidays: 08:00 - 3:00 pm'],
    socials: ['Facebook', 'Instagram', 'TikTok'],
  },
  menu: [
    { route: 'home', label: 'Home' },
    { route: 'about', label: 'About us' },
    { route: 'adventures', label: 'Adventures' },
    { route: 'advice', label: 'Details' },
    { route: 'booking', label: 'Total fees' },
    { route: 'contacts', label: 'Contacts' },
  ] as { route: MenuRoute; label: string }[],
  calculateFees,
  formatMoney,
};