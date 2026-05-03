import img1 from "@/assets/cat-l-shaped-sofa.jpg";
import img2 from "@/assets/cat-5-seater-sofa.jpg";
import img3 from "@/assets/cat-chester-bed.jpg";
import img4 from "@/assets/cat-chester-seat.jpg";
import img5 from "@/assets/cat-wooden-bed.jpg";
import img6 from "@/assets/cat-dining-set.jpg";
import img7 from "@/assets/cat-coffee-table.jpg";
import img8 from "@/assets/cat-tv-stand.jpg";
import img9 from "@/assets/featured-chester-bed.jpg";
import img10 from "@/assets/hero-living-room.jpg";
import lsTan from "@/assets/lshape-tan-velvet.jpg";
import lsOlive from "@/assets/lshape-olive-channel.jpg";
import lsCream from "@/assets/lshape-cream-corduroy.jpg";
import lsBlue from "@/assets/lshape-blue-textured.jpg";
import lsLightGrey from "@/assets/lshape-light-grey-chaise.jpg";
import lsTaupe from "@/assets/lshape-taupe-tufted.jpg";
import lsCharcoal from "@/assets/lshape-charcoal-tufted.jpg";
import lsBeige from "@/assets/lshape-beige-textured.png";
import lsDeepBlue from "@/assets/lshape-deep-blue-indoor.png";
import lsLightGreyAngled from "@/assets/lshape-light-grey-angled.png";
import lsPowderBlue from "@/assets/lshape-powder-blue-textured.png";
import lsSkyBlue from "@/assets/lshape-sky-blue-garden.png";
import lsSoftGrey from "@/assets/lshape-soft-grey-showroom.png";
import lsSteelBlue from "@/assets/lshape-steel-blue-tufted.png";
import lsWarmGreyChaise from "@/assets/lshape-warm-grey-chaise.png";
import lsIvoryChenille from "@/assets/lshape-ivory-chenille.png";
import lsStoneCorduroy from "@/assets/lshape-stone-corduroy-modular.png";
import lsOatTweed from "@/assets/lshape-oat-tweed-deep.png";
import lsPearlPopcorn from "@/assets/lshape-pearl-popcorn-chaise.png";
import lsMochaTufted from "@/assets/lshape-mocha-tufted-cup.png";
import ssBlushRolled from "@/assets/sofaset-blush-rolled-3seater.png";
import ssCharcoalStudded from "@/assets/sofaset-charcoal-studded-3piece.png";
import ssGreyTuftedMustard from "@/assets/sofaset-grey-tufted-mustard.png";
import ssPebbleGrey from "@/assets/sofaset-pebble-grey-3piece.png";
import ssIvoryRolled from "@/assets/sofaset-ivory-rolled-arm.png";
import ssPowderBluePopcorn from "@/assets/sofaset-powder-blue-popcorn.png";
import ssDenimBlueModular from "@/assets/sofaset-denim-blue-modular.png";

export type Product = {
  id: string;
  slug: string;
  name: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  original: number;
  sale: number;
  hot?: boolean;
  category: string; // category slug
  categoryName: string;
  tags: ("new" | "featured" | "top")[];
  description: string;
  attributes: { label: string; value: string }[];
  colors: string[];
};

export type Category = {
  slug: string;
  name: string;
  image: string;
  parent?: string;
};

export const categories: Category[] = [
  { slug: "l-shaped-sofas", name: "L-Shaped Sofas", image: img1, parent: "sofas" },
  { slug: "sofa-set-designs", name: "Sofa Set Designs", image: img2, parent: "sofas" },
  { slug: "chester-seats", name: "Chester Seats", image: img4, parent: "sofas" },
  { slug: "chester-beds", name: "Chester Beds", image: img3, parent: "bedroom" },
  { slug: "wooden-beds", name: "Wooden Beds", image: img5, parent: "bedroom" },
  { slug: "coffee-tables", name: "Coffee Tables", image: img7, parent: "living-room" },
  { slug: "tv-stands", name: "TV Stands", image: img8, parent: "living-room" },
  { slug: "dining-sets", name: "Dining Sets", image: img6, parent: "dining" },
];

export const parentCategories: Record<string, string> = {
  sofas: "Sofas",
  bedroom: "Bedroom",
  "living-room": "Living Room",
  dining: "Dining Table Designs",
  chairs: "Chairs",
  doors: "Doors & Frames",
};

const make = (
  id: string,
  name: string,
  image: string,
  category: string,
  original: number,
  sale: number,
  rating: number,
  tags: Product["tags"],
  hot = false,
): Product => ({
  id,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  name,
  image,
  gallery: [image, img10, img9, img7],
  rating,
  reviewCount: Math.floor(rating * 12 + 3),
  original,
  sale,
  hot,
  category,
  categoryName: categories.find((c) => c.slug === category)?.name ?? category,
  tags,
  description:
    "Crafted in our Nairobi atelier from kiln-dried hardwood and upholstered in premium European fabric. Every piece is hand-finished by master artisans for a heritage feel that lasts generations.",
  attributes: [
    { label: "Material", value: "Solid Mahogany Frame, Premium Linen Upholstery" },
    { label: "Dimensions", value: '240cm × 90cm × 85cm (W×D×H)' },
    { label: "Seating Capacity", value: "5 Persons" },
    { label: "Weight", value: "62 kg" },
    { label: "Care", value: "Dry clean upholstery; polish wood with cotton cloth" },
    { label: "Warranty", value: "5 Years Structural" },
    { label: "Made In", value: "Nairobi, Kenya" },
  ],
  colors: ["#1A1A1A", "#C9A96E", "#4A2C2A", "#B8A99A"],
});

export const products: Product[] = [
  make("1", "Classic Grey 3-Seater Sofa", img1, "l-shaped-sofas", 48500, 44000, 5, ["new", "featured"]),
  make("2", "Helsinki 7-Seater Dark Grey", img2, "sofa-set-designs", 68000, 62000, 5, ["new", "top"]),
  make("3", "6×6 White Bed With Storage Drawers", img3, "chester-beds", 58000, 56000, 4.5, ["new"]),
  make("4", "6-Seater Brown L-Shaped", img4, "l-shaped-sofas", 49000, 44500, 4, ["new", "featured"], true),
  make("5", "Austin 3-Seater Classic Sofa", img5, "sofa-set-designs", 34000, 32000, 4.5, ["new"]),
  make("6", "Snow White Sofa Bed", img6, "chester-seats", 28000, 26000, 4, ["featured"]),
  make("7", "6-Seater Black Dining Table Set", img7, "dining-sets", 74000, 68000, 4.5, ["featured", "top"]),
  make("8", "Alexandria 6-Seater Grey L", img8, "l-shaped-sofas", 47300, 43000, 4, ["featured"], true),
  make("9", "Canterbury 5×6 Chester Bed", img9, "chester-beds", 42000, 36000, 4.5, ["featured", "top"]),
  make("10", "6-Seater Black Mahogany Set", img10, "dining-sets", 74000, 68000, 5, ["featured"]),
  make("11", "Sovereign Tufted Chester Bed", img9, "chester-beds", 320000, 285000, 5, ["top"], true),
  make("12", "Heritage Mahogany Coffee Table", img7, "coffee-tables", 48000, 42000, 5, ["top", "featured"]),
  make("13", "Royal L-Shaped Velvet Sofa", img1, "l-shaped-sofas", 49500, 45000, 4.5, ["top"]),
  make("14", "Atelier Wooden King Bed", img5, "wooden-beds", 88000, 76000, 5, ["top", "new"]),
  make("15", "Manor 8-Seater Dining Suite", img6, "dining-sets", 195000, 168000, 4.5, ["top"], true),
  make("16", "Verona Floating TV Console", img8, "tv-stands", 52000, 46000, 4, ["new"]),
  make("17", "Nordic Oak Coffee Table", img7, "coffee-tables", 38000, 32000, 4.5, ["new", "featured"]),
  make("18", "Marlow Grey Chester Seat", img4, "chester-seats", 42000, 38000, 4, ["featured"]),
  make("19", "Savoy 4-Door Wooden Bed", img5, "wooden-beds", 72000, 64000, 4.5, ["featured"]),
  make("20", "Bristol Walnut TV Stand", img8, "tv-stands", 58000, 49000, 4, ["top"]),
];

// L-Shaped Sofa client photos — descriptions reflect color & style of each piece.
const lshapeSpecs = (size: string, color: string) => [
  { label: "Material", value: "High-density foam, fabric upholstery" },
  { label: "Size", value: size },
  { label: "Color", value: color },
  { label: "Frame", value: "Kiln-dried hardwood frame" },
  { label: "Warranty", value: "5 Years Structural" },
  { label: "Made In", value: "Nairobi, Kenya" },
];

const lshapeProducts: Product[] = [
  { ...make("ls-1", "6 Seater Tan Velvet L-Shaped Sofa", lsTan, "l-shaped-sofas", 48400, 44000, 4.5, ["new", "featured"]),
    attributes: lshapeSpecs("L-shape, seats 6", "Tan / Caramel"), colors: ["#A0522D", "#C9A96E", "#4A2C2A"] },
  { ...make("ls-2", "7 Seater Olive Green Channel-Tufted L-Shaped Sofa", lsOlive, "l-shaped-sofas", 49500, 45000, 5, ["new", "top"], true),
    attributes: lshapeSpecs("L-shape, seats 7", "Olive Green"), colors: ["#556B2F", "#1A1A1A", "#B8A99A"] },
  { ...make("ls-3", "7 Seater Cream Corduroy L-Shaped Sofa", lsCream, "l-shaped-sofas", 47800, 43500, 4.5, ["new", "featured"]),
    attributes: lshapeSpecs("L-shape, seats 7", "Cream / Ivory"), colors: ["#F5F0E6", "#B8A99A", "#1A1A1A"] },
  { ...make("ls-4", "6 Seater Steel Blue Textured L-Shaped Sofa", lsBlue, "l-shaped-sofas", 48600, 44500, 4, ["featured"]),
    attributes: lshapeSpecs("L-shape, seats 6–7", "Steel Blue"), colors: ["#4682B4", "#C9A96E", "#1A1A1A"] },
  { ...make("ls-5", "6 Seater Light Grey L-Shaped Sofa with Chaise", lsLightGrey, "l-shaped-sofas", 48000, 44000, 4.5, ["new"]),
    attributes: lshapeSpecs("L-shape with chaise, seats 6", "Light Grey"), colors: ["#D3D3D3", "#1A1A1A", "#B8A99A"] },
  { ...make("ls-6", "8 Seater Taupe Tufted L-Shaped Sofa", lsTaupe, "l-shaped-sofas", 49500, 45000, 5, ["top", "featured"], true),
    attributes: lshapeSpecs("L-shape, seats 7–8", "Taupe / Warm Beige"), colors: ["#B8A99A", "#4A2C2A", "#1A1A1A"] },
  { ...make("ls-7", "6 Seater Charcoal Grey Tufted L-Shaped Sofa", lsCharcoal, "l-shaped-sofas", 47300, 43000, 4.5, ["featured"]),
    attributes: lshapeSpecs("L-shape, seats 6", "Charcoal Grey"), colors: ["#36454F", "#C9A96E", "#1A1A1A"] },
  { ...make("ls-8", "6 Seater Beige Textured L-Shaped Sofa", lsBeige, "l-shaped-sofas", 47800, 43500, 4.5, ["new"]),
    attributes: lshapeSpecs("L-shape, seats 6", "Beige"), colors: ["#D9C9B0", "#4A2C2A", "#1A1A1A"] },
  { ...make("ls-9", "7 Seater Deep Blue Indoor L-Shaped Sofa", lsDeepBlue, "l-shaped-sofas", 49500, 45000, 5, ["featured", "top"]),
    attributes: lshapeSpecs("L-shape, seats 7", "Deep Navy Blue"), colors: ["#1B2A49", "#C9A96E", "#1A1A1A"] },
  { ...make("ls-10", "6 Seater Light Grey Angled L-Shaped Sofa", lsLightGreyAngled, "l-shaped-sofas", 48400, 44000, 4, ["new"]),
    attributes: lshapeSpecs("L-shape, seats 6", "Light Grey"), colors: ["#CFCFCF", "#1A1A1A", "#B8A99A"] },
  { ...make("ls-11", "6 Seater Powder Blue Textured L-Shaped Sofa", lsPowderBlue, "l-shaped-sofas", 48000, 43500, 4.5, ["new", "featured"]),
    attributes: lshapeSpecs("L-shape, seats 6", "Powder Blue"), colors: ["#B0CDE4", "#C9A96E", "#1A1A1A"] },
  { ...make("ls-12", "7 Seater Sky Blue Garden L-Shaped Sofa", lsSkyBlue, "l-shaped-sofas", 49000, 44500, 4.5, ["featured"], true),
    attributes: lshapeSpecs("L-shape, seats 7", "Sky Blue"), colors: ["#87CEEB", "#1A1A1A", "#B8A99A"] },
  { ...make("ls-13", "6 Seater Soft Grey Showroom L-Shaped Sofa", lsSoftGrey, "l-shaped-sofas", 47300, 43000, 4, ["new"]),
    attributes: lshapeSpecs("L-shape, seats 6", "Soft Grey"), colors: ["#BFBFBF", "#4A2C2A", "#1A1A1A"] },
  { ...make("ls-14", "8 Seater Steel Blue Tufted L-Shaped Sofa", lsSteelBlue, "l-shaped-sofas", 49500, 45000, 5, ["top", "featured"], true),
    attributes: lshapeSpecs("L-shape, seats 7–8", "Steel Blue"), colors: ["#4A6B82", "#C9A96E", "#1A1A1A"] },
  { ...make("ls-15", "6 Seater Warm Grey L-Shaped Sofa with Chaise & Ottoman", lsWarmGreyChaise, "l-shaped-sofas", 48400, 44000, 4.5, ["new", "featured"]),
    attributes: lshapeSpecs("L-shape with chaise & ottoman, seats 6", "Warm Grey"), colors: ["#9E9387", "#1A1A1A", "#B8A99A"] },
  { ...make("ls-16", "7 Seater Ivory Chenille L-Shaped Sofa", lsIvoryChenille, "l-shaped-sofas", 49500, 45000, 5, ["new", "top"], true),
    attributes: lshapeSpecs("L-shape, seats 7", "Ivory / Champagne"), colors: ["#F0E6D2", "#1A1A1A", "#C9A96E"] },
  { ...make("ls-17", "8 Seater Stone Corduroy Modular L-Shaped Sofa", lsStoneCorduroy, "l-shaped-sofas", 49000, 44500, 4.5, ["featured"]),
    attributes: lshapeSpecs("L-shape modular, seats 7–8", "Stone Beige"), colors: ["#C8B89A", "#4A2C2A", "#1A1A1A"] },
  { ...make("ls-18", "7 Seater Oat Tweed Deep-Seat L-Shaped Sofa", lsOatTweed, "l-shaped-sofas", 47800, 43500, 4.5, ["new"]),
    attributes: lshapeSpecs("L-shape deep-seat, seats 7", "Oat Beige"), colors: ["#BFAE93", "#1A1A1A", "#B8A99A"] },
  { ...make("ls-19", "6 Seater Pearl Popcorn L-Shaped Sofa with Chaise", lsPearlPopcorn, "l-shaped-sofas", 47300, 43000, 4, ["featured"]),
    attributes: lshapeSpecs("L-shape with chaise, seats 6", "Pearl White"), colors: ["#E8E2D5", "#4A2C2A", "#1A1A1A"] },
  { ...make("ls-20", "7 Seater Mocha Tufted L-Shaped Sofa with Cup Holder", lsMochaTufted, "l-shaped-sofas", 49500, 45000, 5, ["top", "featured"], true),
    attributes: lshapeSpecs("L-shape, seats 7", "Mocha / Warm Taupe"), colors: ["#9C8470", "#1A1A1A", "#C9A96E"] },
];

products.push(...lshapeProducts);

// Sofa Set Designs — client photos with explicit per-image pricing.
const sofaSetSpecs = (seats: string, color: string) => [
  { label: "Material", value: "High-density foam, fabric upholstery" },
  { label: "Seating Capacity", value: seats },
  { label: "Color", value: color },
  { label: "Frame", value: "Kiln-dried hardwood frame" },
  { label: "Warranty", value: "5 Years Structural" },
  { label: "Made In", value: "Nairobi, Kenya" },
];

// Original price set ~10% above sale, rounded to nearest 100.
const markUp = (sale: number, pct = 10) => Math.round((sale * (1 + pct / 100)) / 100) * 100;

const sofaSetProducts: Product[] = [
  { ...make("ss-1", "3 Seater Blush Beige Rolled-Arm Sofa", ssBlushRolled, "sofa-set-designs", markUp(50000, 10), 50000, 5, ["new", "featured"], true),
    attributes: sofaSetSpecs("3 seater", "Blush Beige"), colors: ["#D9C9B6", "#1A1A1A", "#B8A99A"] },
  { ...make("ss-2", "5 Seater Charcoal Grey Studded Sofa Set", ssCharcoalStudded, "sofa-set-designs", markUp(45000, 10), 45000, 4.5, ["new"]),
    attributes: sofaSetSpecs("5 seater (3+2)", "Charcoal Grey"), colors: ["#3A3F44", "#C9A96E", "#1A1A1A"] },
  { ...make("ss-3", "7 Seater Grey Tufted Sofa Set with Mustard Accents", ssGreyTuftedMustard, "sofa-set-designs", markUp(48000, 10), 48000, 5, ["new", "featured"]),
    attributes: sofaSetSpecs("7 seater (3+2+2)", "Light Grey with Mustard"), colors: ["#9FA4A8", "#D8932B", "#1A1A1A"] },
  { ...make("ss-4", "5 Seater Pebble Grey Modern Sofa Set", ssPebbleGrey, "sofa-set-designs", markUp(45000, 10), 45000, 4.5, ["featured"]),
    attributes: sofaSetSpecs("5 seater (3+2)", "Pebble Grey"), colors: ["#A6ADAE", "#1A1A1A", "#B8A99A"] },
  { ...make("ss-5", "5 Seater Ivory Rolled-Arm Sofa Set", ssIvoryRolled, "sofa-set-designs", markUp(48000, 10), 48000, 4.5, ["new", "featured"]),
    attributes: sofaSetSpecs("5 seater (3+2)", "Ivory White"), colors: ["#F2EBDD", "#1A1A1A", "#C9A96E"] },
  { ...make("ss-6", "5 Seater Powder Blue Popcorn-Tufted Sofa Set", ssPowderBluePopcorn, "sofa-set-designs", markUp(50000, 10), 50000, 5, ["top", "featured"], true),
    attributes: sofaSetSpecs("5 seater (3+2)", "Powder Blue"), colors: ["#B7CADB", "#1A1A1A", "#C9A96E"] },
  { ...make("ss-7", "5 Seater Denim Blue Modular Sofa Set", ssDenimBlueModular, "sofa-set-designs", markUp(50000, 10), 50000, 5, ["top"], true),
    attributes: sofaSetSpecs("5 seater (3+2) modular", "Denim Blue"), colors: ["#3F6F8E", "#1A1A1A", "#B8A99A"] },
];

products.push(...sofaSetProducts);

export const formatKsh = (n: number) =>
  `KSh ${n.toLocaleString("en-KE", { minimumFractionDigits: 0 })}`;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const navStructure = [
  { slug: "sofas", name: "Sofas", children: ["l-shaped-sofas", "sofa-set-designs", "chester-seats"] },
  { slug: "bedroom", name: "Bedroom", children: ["chester-beds", "wooden-beds"] },
  { slug: "living-room", name: "Living Room", children: ["coffee-tables", "tv-stands"] },
  { slug: "chairs", name: "Chairs", children: ["chester-seats"] },
  { slug: "dining", name: "Dining Table Designs", children: ["dining-sets"] },
  { slug: "doors", name: "Doors & Frames", children: [] },
];
