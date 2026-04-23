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
  make("1", "Classic Grey 3-Seater Sofa", img1, "l-shaped-sofas", 36000, 32000, 5, ["new", "featured"]),
  make("2", "Helsinki 7-Seater Dark Grey", img2, "sofa-set-designs", 68000, 62000, 5, ["new", "top"]),
  make("3", "6×6 White Bed With Storage Drawers", img3, "chester-beds", 58000, 56000, 4.5, ["new"]),
  make("4", "6-Seater Brown L-Shaped", img4, "l-shaped-sofas", 64000, 58000, 4, ["new", "featured"], true),
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
