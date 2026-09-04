import ropaVieja from "@/assets/mojo-bowl-ropa-vieja.jpg";
import cubano from "@/assets/mojo-cubano.jpg";
import tostones from "@/assets/mojo-tostones.jpg";
import polloBowl from "@/assets/mojo-pollo-bowl.jpg";
import cafecito from "@/assets/mojo-cafecito.jpg";
import catering from "@/assets/mojo-catering.jpg";

export type CategoryId =
  | "favoritos"
  | "bowls"
  | "sandwiches"
  | "sides"
  | "bebidas"
  | "catering";

export type Category = { id: CategoryId; label: string };

export const categories: Category[] = [
  { id: "favoritos", label: "🔥 Must-Tries / Favoritos" },
  { id: "bowls", label: "🥗 Bowls Criollos" },
  { id: "sandwiches", label: "🥪 Pressed Cubano Sandwiches" },
  { id: "sides", label: "🥟 Pa' Picar / Sides" },
  { id: "bebidas", label: "🥤 Cafecito & Drinks" },
  { id: "catering", label: "🎉 Party Catering" },
];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryId;
  badge?: "Popular" | "Mojo Signature" | "Fresco del día" | "Top Seller";
  sidesAllowed: boolean;
};

export const sideOptions = [
  { id: "moro", name: "Arroz Moro (Black beans & rice)", price: 0 },
  { id: "tostones", name: "Crispy Tostones con Mojo", price: 1.5 },
  { id: "yuca", name: "Yuca con Mojo de Ajo", price: 2 },
  { id: "maduros", name: "Sweet Plátanos Maduros", price: 1.75 },
];

export const menu: MenuItem[] = [
  {
    id: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    description:
      "Tender shredded beef slow-cooked in rich criollo sofrito after 24h citrus mojo marinade, over savory arroz moro with sweet maduros & fresh cilantro.",
    price: 16.95,
    image: ropaVieja,
    category: "bowls",
    badge: "Mojo Signature",
    sidesAllowed: true,
  },
  {
    id: "cubano-prensado",
    name: "El Cubano Prensado",
    description:
      "Authentic pressed Cuban sandwich with slow-roasted lechón, sweet smoked ham, melted Swiss cheese, tangy pickles & house mustard on crisp Cuban bread.",
    price: 14.95,
    image: cubano,
    category: "sandwiches",
    badge: "Popular",
    sidesAllowed: true,
  },
  {
    id: "pollo-mojo-bowl",
    name: "Chicken Fresco Bowl",
    description:
      "Charbroiled chicken thighs infused with sour orange mojo, fluffy white rice, seasoned black beans, sliced ripe avocado & pickled red onions.",
    price: 15.5,
    image: polloBowl,
    category: "bowls",
    badge: "Top Seller",
    sidesAllowed: true,
  },
  {
    id: "tostones-mojo",
    name: "Tostones con Mojo",
    description:
      "Twice-fried golden green plantains seasoned with sea salt flakes, served with our zesty garlic-lime mojo dipping sauce.",
    price: 7.25,
    image: tostones,
    category: "sides",
    badge: "Popular",
    sidesAllowed: false,
  },
  {
    id: "cafecito-pastelito",
    name: "Cafecito & Pastelito de Guayaba",
    description:
      "Authentic sweet Cuban espresso colada with golden foam, paired with a warm flaky puff pastry filled with cream cheese & sweet guava.",
    price: 5.95,
    image: cafecito,
    category: "bebidas",
    sidesAllowed: false,
  },
  {
    id: "bandeja-familiar",
    name: "Bandeja Criolla Familiar (Catering Feast)",
    description:
      "Feeds 8–10 people: Slow-roasted lechón asado, seasoned yellow rice, black beans, yuca con mojo & sweet maduros. Ready to serve con todo.",
    price: 129,
    image: catering,
    category: "catering",
    badge: "Mojo Signature",
    sidesAllowed: false,
  },
];

// "Favoritos" is a curated cross-section of the menu.
export const favoritosIds = ["ropa-vieja-bowl", "cubano-prensado", "tostones-mojo"];

export function itemsForCategory(category: CategoryId): MenuItem[] {
  if (category === "favoritos") {
    return menu.filter((item) => favoritosIds.includes(item.id));
  }
  return menu.filter((item) => item.category === category);
}

export const currency = (value: number) =>
  `$${value.toFixed(2)}`;
