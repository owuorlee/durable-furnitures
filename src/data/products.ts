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
  make("8", "Alexandria 6-Seater Grey L", img8, "l-shaped-sofas", 60000, 56000, 4, ["featured"], true),
  make("9", "Canterbury 5×6 Chester Bed", img9, "chester-beds", 42000, 36000, 4.5, ["featured", "top"]),
  make("10", "6-Seater Black Mahogany Set", img10, "dining-sets", 74000, 68000, 5, ["featured"]),
  make("11", "Sovereign Tufted Chester Bed", img9, "chester-beds", 320000, 285000, 5, ["top"], true),
  make("12", "Heritage Mahogany Coffee Table", img7, "coffee-tables", 48000, 42000, 5, ["top", "featured"]),
  make("13", "Royal L-Shaped Velvet Sofa", img1, "l-shaped-sofas", 145000, 128000, 4.5, ["top"]),
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
  { ...make("ls-1", "6 Seater Tan Velvet L-Shaped Sofa", lsTan, "l-shaped-sofas", 51000, 47500, 4.5, ["new", "featured"]),
    attributes: lshapeSpecs("L-shape, seats 6", "Tan / Caramel"), colors: ["#A0522D", "#C9A96E", "#4A2C2A"] },
  { ...make("ls-2", "7 Seater Olive Green Channel-Tufted L-Shaped Sofa", lsOlive, "l-shaped-sofas", 98000, 89000, 5, ["new", "top"], true),
    attributes: lshapeSpecs("L-shape, seats 7", "Olive Green"), colors: ["#556B2F", "#1A1A1A", "#B8A99A"] },
  { ...make("ls-3", "7 Seater Cream Corduroy L-Shaped Sofa", lsCream, "l-shaped-sofas", 79000, 72000, 4.5, ["new", "featured"]),
    attributes: lshapeSpecs("L-shape, seats 7", "Cream / Ivory"), colors: ["#F5F0E6", "#B8A99A", "#1A1A1A"] },
  { ...make("ls-4", "6 Seater Steel Blue Textured L-Shaped Sofa", lsBlue, "l-shaped-sofas", 65000, 58500, 4, ["featured"]),
    attributes: lshapeSpecs("L-shape, seats 6–7", "Steel Blue"), colors: ["#4682B4", "#C9A96E", "#1A1A1A"] },
  { ...make("ls-5", "6 Seater Light Grey L-Shaped Sofa with Chaise", lsLightGrey, "l-shaped-sofas", 71000, 64000, 4.5, ["new"]),
    attributes: lshapeSpecs("L-shape with chaise, seats 6", "Light Grey"), colors: ["#D3D3D3", "#1A1A1A", "#B8A99A"] },
  { ...make("ls-6", "8 Seater Taupe Tufted L-Shaped Sofa", lsTaupe, "l-shaped-sofas", 120000, 109000, 5, ["top", "featured"], true),
    attributes: lshapeSpecs("L-shape, seats 7–8", "Taupe / Warm Beige"), colors: ["#B8A99A", "#4A2C2A", "#1A1A1A"] },
  { ...make("ls-7", "6 Seater Charcoal Grey Tufted L-Shaped Sofa", lsCharcoal, "l-shaped-sofas", 58000, 53000, 4.5, ["featured"]),
    attributes: lshapeSpecs("L-shape, seats 6", "Charcoal Grey"), colors: ["#36454F", "#C9A96E", "#1A1A1A"] },
];

products.push(...lshapeProducts);

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
