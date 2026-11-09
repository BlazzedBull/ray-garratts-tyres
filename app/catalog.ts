export type TyreProduct = {
  id: string;
  slug: string;
  name: string;
  family: "P ZERO" | "CINTURATO" | "SCORPION";
  vehicle: "Car" | "SUV" | "Car & SUV";
  use: "Performance" | "Touring" | "All terrain" | "All season" | "Electric";
  season: "Summer" | "All season";
  image: string;
  strapline: string;
  description: string;
  sizes: string[];
  technologies: string[];
  benefits: { title: string; copy: string }[];
  badge?: string;
};

export const tyreProducts: TyreProduct[] = [
  {
    id: "pzero-pz5",
    slug: "p-zero-pz5",
    name: "P ZERO™ (PZ5)",
    family: "P ZERO",
    vehicle: "Car & SUV",
    use: "Performance",
    season: "Summer",
    image: "/media/pzero.png",
    strapline: "Superior performance chosen by leading car makers.",
    description: "The latest P ZERO generation is engineered for high-performance cars and SUVs, with a focus on precise handling, wet braking and consistent performance.",
    sizes: ["225/40 R18", "235/40 R19", "245/35 R20", "275/35 R21", "315/30 R22"],
    technologies: ["ELECT™", "PNCS™", "RUN FLAT", "SEAL INSIDE™"],
    benefits: [
      { title: "Control", copy: "Tread geometry developed to support lateral stability and confident handling." },
      { title: "Wet confidence", copy: "A performance-focused layout designed for braking and control in wet conditions." },
      { title: "Refined drive", copy: "Progressive sipes and groove geometry help reduce pattern noise." },
    ],
    badge: "NEW GENERATION",
  },
  {
    id: "pzero-e",
    slug: "p-zero-e",
    name: "P ZERO™ E",
    family: "P ZERO",
    vehicle: "Car & SUV",
    use: "Electric",
    season: "Summer",
    image: "/media/pzero.png",
    strapline: "Ultra-high performance for premium electrified vehicles.",
    description: "P ZERO E combines performance and eco-safety priorities for high-end electric and plug-in vehicles, with selected sizes featuring Pirelli mobility technologies.",
    sizes: ["235/45 R18", "245/45 R19", "255/40 R20", "275/40 R21", "285/35 R22", "305/35 R23"],
    technologies: ["ELECT™", "RUNFORWARD™", "PNCS™"],
    benefits: [
      { title: "Electric ready", copy: "Developed for the torque, weight and acoustic demands of electrified vehicles." },
      { title: "Mobility", copy: "Selected RunForward fitments can maintain mobility after a loss of pressure." },
      { title: "Comfort", copy: "Selected PNCS fitments are designed to reduce tyre noise inside the cabin." },
    ],
    badge: "ELECTRIC",
  },
  {
    id: "pzero-as-plus",
    slug: "p-zero-all-season-plus",
    name: "P ZERO™ ALL SEASON PLUS",
    family: "P ZERO",
    vehicle: "Car",
    use: "All season",
    season: "All season",
    image: "/media/pzero.png",
    strapline: "Performance control with year-round versatility.",
    description: "An ultra-high-performance all-season tyre for drivers seeking a balance of control, comfort and versatility across changing conditions.",
    sizes: ["215/50 R17", "225/45 R18", "235/40 R19", "245/40 R19", "275/35 R20"],
    technologies: ["ALL SEASON", "M+S"],
    benefits: [
      { title: "Year-round control", copy: "Siping and circumferential grooves support grip and water evacuation." },
      { title: "Dry performance", copy: "Outer blocks are shaped for cornering response and dry grip." },
      { title: "Cabin comfort", copy: "Variable tread block sizing helps manage pattern noise." },
    ],
  },
  {
    id: "cinturato-p7",
    slug: "cinturato-p7",
    name: "CINTURATO P7™ (P7C2)",
    family: "CINTURATO",
    vehicle: "Car",
    use: "Touring",
    season: "Summer",
    image: "/media/cinturato.png",
    strapline: "Confidence and comfort for the premium commute.",
    description: "A high-performance touring tyre focused on wet performance, mileage, rolling resistance and a quiet everyday drive.",
    sizes: ["205/55 R16", "215/55 R17", "225/45 R18", "235/45 R18", "245/40 R19"],
    technologies: ["ELECT™", "RUN FLAT", "SEAL INSIDE™"],
    benefits: [
      { title: "Safety", copy: "Groove shapes and chamfer design focus on wet braking and aquaplaning resistance." },
      { title: "Efficiency", copy: "A flat profile supports regular wear and reduced rolling resistance." },
      { title: "Comfort", copy: "An optimised pitch sequence helps reduce road noise." },
    ],
    badge: "TOURING",
  },
  {
    id: "scorpion-verde",
    slug: "scorpion-verde",
    name: "SCORPION VERDE™",
    family: "SCORPION",
    vehicle: "SUV",
    use: "Touring",
    season: "Summer",
    image: "/media/scorpion.png",
    strapline: "Comfort and confidence for road-focused SUVs.",
    description: "A road tyre for SUVs and crossovers, developed for a composed drive with comfort, dependable road manners and efficient everyday performance.",
    sizes: ["215/65 R16", "225/60 R17", "235/55 R18", "255/50 R19", "275/45 R20"],
    technologies: ["SUV", "ROAD"],
    benefits: [
      { title: "SUV comfort", copy: "A road-focused pattern built around a quiet and composed drive." },
      { title: "Everyday confidence", copy: "Balanced performance for commuting, touring and longer family journeys." },
      { title: "Efficient travel", copy: "Designed with regular wear and rolling efficiency in mind." },
    ],
  },
  {
    id: "scorpion-atr",
    slug: "scorpion-atr",
    name: "SCORPION™ ATR",
    family: "SCORPION",
    vehicle: "SUV",
    use: "All terrain",
    season: "Summer",
    image: "/media/scorpion.png",
    strapline: "Tenacious off road. Comfortable back on it.",
    description: "A versatile all-terrain tyre with a self-cleaning tread pattern, reinforced construction and road manners designed for comfort and control.",
    sizes: ["205/75 R15", "225/75 R16", "245/65 R17", "255/60 R18", "265/70 R18"],
    technologies: ["ALL TERRAIN", "M+S", "ELECT™"],
    benefits: [
      { title: "Robust", copy: "A reinforced carcass and sidewall area are designed to resist damage." },
      { title: "Traction", copy: "Wide shoulder blocks support traction and braking on changing surfaces." },
      { title: "Self-cleaning", copy: "Curved central grooves help maintain traction away from sealed roads." },
    ],
    badge: "ALL TERRAIN",
  },
];

export const getTyreBySlug = (slug: string) => tyreProducts.find((product) => product.slug === slug);
