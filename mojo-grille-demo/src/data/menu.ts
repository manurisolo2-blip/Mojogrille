import ropaVieja from "@/assets/mojo-bowl-ropa-vieja.jpg";
import cubano from "@/assets/mojo-cubano.jpg";
import tostones from "@/assets/mojo-tostones.jpg";
import polloBowl from "@/assets/mojo-pollo-bowl.jpg";
import cafecito from "@/assets/mojo-cafecito.jpg";
import catering from "@/assets/mojo-catering.jpg";

import type {
  Category,
  CategoryId,
  MenuItem,
  BadgeType,
  SideOption,
} from "@/types/mojo";

// Re-export type contracts for seamless module interoperability
export type { Category, CategoryId, MenuItem, BadgeType, SideOption };

export const categories: Category[] = [
  { id: "favoritos", label: "Must-Tries / Favoritos" },
  { id: "bowls", label: "Bowls Criollos" },
  { id: "sandwiches", label: "Pressed Cubano Sandwiches" },
  { id: "sides", label: "Pa' Picar / Sides" },
  { id: "bebidas", label: "Cafecito & Drinks" },
  { id: "catering", label: "Party Catering" },
];

export const sideOptions: SideOption[] = [
  { id: "moro", name: "Arroz Moro (Black beans & rice)", price: 0, isIncluded: true },
  { id: "tostones", name: "Crispy Tostones con Mojo", price: 1.5 },
  { id: "yuca", name: "Yuca con Mojo de Ajo", price: 2 },
  { id: "maduros", name: "Sweet Plátanos Maduros", price: 1.75 },
];

export const menu: MenuItem[] = [
  // --- Bowls Criollos ---
  {
    id: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    description:
      "Tender shredded flank steak slow cooked in rich criollo sofrito with bell peppers, onions & Spanish olives after 24h citrus mojo marinade, over savory arroz moro with sweet maduros & fresh cilantro.",
    price: 16.95,
    image: ropaVieja,
    category: "bowls",
    badge: "Mojo Signature",
    sidesAllowed: true,
    featured: true,
  },
  {
    id: "lechon-asado-bowl",
    name: "Lechón Asado al Mojo Criollo",
    description:
      "Authentic slow roasted pork shoulder marinated for 24 hours in our signature sour orange, garlic & oregano mojo criollo, crisped on the plancha with sweet caramelized onions over moro rice.",
    price: 15.95,
    image: ropaVieja,
    category: "bowls",
    badge: "Mojo Signature",
    sidesAllowed: true,
    featured: true,
  },
  {
    id: "pollo-mojo-bowl",
    name: "Mojo Chicken Bowl (Chicken Fresco)",
    description:
      "Charbroiled tender chicken thighs infused with sour orange mojo, served over fluffy white rice, seasoned black beans, sliced ripe Hass avocado & pickled red onions.",
    price: 15.5,
    image: polloBowl,
    category: "bowls",
    badge: "Top Seller",
    sidesAllowed: true,
    featured: true,
  },
  {
    id: "vaca-frita-bowl",
    name: "Vaca Frita Criolla Bowl",
    description:
      "Crispy seared shredded flank steak flash-fried al sartén with caramelized Spanish onions, fresh lime juice and garlic mojo, served with tender black beans and arroz blanco.",
    price: 17.5,
    image: ropaVieja,
    category: "bowls",
    badge: "Popular",
    sidesAllowed: true,
  },

  // --- Pressed Cubano Sandwiches ---
  {
    id: "cubano-prensado",
    name: "Cuban Sandwich Tradicional (El Cubano Prensado)",
    description:
      "Authentic pressed Cuban sandwich with slow roasted lechón asado, sweet smoked ham, melted Swiss cheese, tangy dill pickles & yellow mustard on crusty buttered Cuban bread.",
    price: 14.95,
    image: cubano,
    category: "sandwiches",
    badge: "Mojo Signature",
    sidesAllowed: true,
    featured: true,
  },
  {
    id: "media-noche",
    name: "Media Noche Especial",
    description:
      "The legendary Havana midnight sandwich: 24h mojo roasted pork, sweet cured ham, Swiss cheese and pickles, pressed hot on soft, slightly sweet egg challah bread.",
    price: 14.5,
    image: cubano,
    category: "sandwiches",
    badge: "Popular",
    sidesAllowed: true,
  },
  {
    id: "pan-con-lechon",
    name: "Pan con Lechón al Mojo",
    description:
      "Heaping portion of succulent pulled mojo roast pork smothered in hot grilled mojo onions and house garlic reduction on warm pressed Cuban baguette.",
    price: 13.95,
    image: cubano,
    category: "sandwiches",
    badge: "Fresco del día",
    sidesAllowed: true,
  },

  // --- Pa' Picar / Sides ---
  {
    id: "tostones-mojo",
    name: "Crispy Tostones con Mojo",
    description:
      "Twice fried golden green plantain discs smashed and crisped to order, sprinkled with sea salt flakes and served with our zesty garlic lime mojo dipping sauce.",
    price: 7.25,
    image: tostones,
    category: "sides",
    badge: "Popular",
    sidesAllowed: false,
    featured: true,
  },
  {
    id: "yuca-con-mojo",
    name: "Yuca con Mojo de la Casa",
    description:
      "Tender boiled cassava root steeped in warm sizzling garlic mojo criollo, sweet sautéed Spanish onions, and fresh key lime juice.",
    price: 6.95,
    image: tostones,
    category: "sides",
    badge: "Mojo Signature",
    sidesAllowed: false,
  },
  {
    id: "platanos-maduros",
    name: "Sweet Plátanos Maduros",
    description:
      "Golden caramelized sweet ripe plantains, pan fried to sweet melting tenderness with crispy caramelized outer edges.",
    price: 6.5,
    image: tostones,
    category: "sides",
    badge: "Fresco del día",
    sidesAllowed: false,
  },
  {
    id: "arroz-moro",
    name: "Arroz Moro Tradicional",
    description:
      "Cuban black beans and long-grain white rice cooked together with smoked pork, cumin, oregano, and sweet bell pepper criollo sofrito.",
    price: 5.95,
    image: tostones,
    category: "sides",
    sidesAllowed: false,
  },

  // --- Cafecito & Drinks / Postres ---
  {
    id: "cafecito-cubano",
    name: "Cafecito Cubano (Colada al Estilo Miami)",
    description:
      "Iconic Miami Cuban espresso brewed dark and whipped vigorously with demerara sugar to create a rich, velvety golden espumita. Served with sharing cups.",
    price: 4.25,
    image: cafecito,
    category: "bebidas",
    badge: "Mojo Signature",
    sidesAllowed: false,
    featured: true,
  },
  {
    id: "cafecito-pastelito",
    name: "Cafecito & Pastelito de Guayaba",
    description:
      "Authentic sweet Cuban espresso colada with golden foam, paired with a warm flaky puff pastry filled with cream cheese & sweet tropical guava.",
    price: 5.95,
    image: cafecito,
    category: "bebidas",
    badge: "Popular",
    sidesAllowed: false,
  },
  {
    id: "flan-tradicional",
    name: "Flan Tradicional de la Abuela",
    description:
      "Silky smooth Cuban egg custard baked fresh daily with a deep amber caramel glaze, subtle vanilla bean, and a hint of fresh lime zest.",
    price: 6.5,
    image: cafecito,
    category: "bebidas",
    badge: "Top Seller",
    sidesAllowed: false,
  },
  {
    id: "batido-mamey",
    name: "Batido de Mamey Fresco",
    description:
      "Classic Miami milkshake blended with ripe mamey sapote fruit, chilled whole milk, sweet condensed milk, and crushed ice.",
    price: 6.25,
    image: cafecito,
    category: "bebidas",
    badge: "Fresco del día",
    sidesAllowed: false,
  },

  // --- Party Catering ---
  {
    id: "bandeja-familiar",
    name: "Bandeja Criolla Familiar (Catering Feast)",
    description:
      "Feeds 8 to 10 people: Slow roasted lechón asado, seasoned yellow rice, black beans, yuca con mojo & sweet maduros. Ready to serve con todo for celebrations.",
    price: 129,
    image: catering,
    category: "catering",
    badge: "Mojo Signature",
    sidesAllowed: false,
    featured: true,
  },
  {
    id: "cubano-party-platter",
    name: "Cuban Sandwich Party Platter (12 Quarters)",
    description:
      "Twelve 4 inch pressed Cuban sandwich portions and Media Noches served with garlic mojo and house cilantro dipping sauce. Perfect for events and corporate gatherings.",
    price: 89,
    image: catering,
    category: "catering",
    badge: "Popular",
    sidesAllowed: false,
  },
];

// "Favoritos" is a curated cross-section of the menu.
export const favoritosIds = [
  "ropa-vieja-bowl",
  "cubano-prensado",
  "lechon-asado-bowl",
  "pollo-mojo-bowl",
  "tostones-mojo",
  "cafecito-cubano",
];

export function itemsForCategory(category: CategoryId): MenuItem[] {
  if (category === "favoritos") {
    return menu.filter((item) => favoritosIds.includes(item.id));
  }
  return menu.filter((item) => item.category === category);
}

export function getItemById(id: string): MenuItem | undefined {
  return menu.find((item) => item.id === id);
}

export const currency = (value: number) => `$${value.toFixed(2)}`;
export const formatPrice = currency;

