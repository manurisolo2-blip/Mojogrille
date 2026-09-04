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
  { id: "favoritos", label: "🔥 Favoritos" },
  { id: "bowls", label: "🥗 Bowls" },
  { id: "sandwiches", label: "🥪 Sándwiches Cubanos" },
  { id: "sides", label: "🥟 Pa' Picar / Sides" },
  { id: "bebidas", label: "🥤 Bebidas & Café" },
  { id: "catering", label: "🎉 Catering" },
];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryId;
  badge?: "Popular" | "Mojo Signature" | "Fresco del día";
  sidesAllowed: boolean;
};

export const sideOptions = [
  { id: "moro", name: "Arroz moro", price: 0 },
  { id: "tostones", name: "Tostones crujientes", price: 1.5 },
  { id: "yuca", name: "Yuca con mojo de ajo", price: 2 },
  { id: "maduros", name: "Plátanos maduros", price: 1.75 },
];

export const menu: MenuItem[] = [
  {
    id: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    description:
      "Carne mechada deshebrada tras 24h de marinado en mojo cítrico, sobre arroz moro, con maduros caramelizados y cilantro fresco.",
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
      "Pan cubano prensado al momento, lechón asado, jamón dulce, suizo derretido, pepinillos y mostaza de la casa.",
    price: 14.95,
    image: cubano,
    category: "sandwiches",
    badge: "Popular",
    sidesAllowed: true,
  },
  {
    id: "pollo-mojo-bowl",
    name: "Pollo al Mojo Bowl",
    description:
      "Muslos de pollo asados al carbón con mojo de naranja agria, arroz blanco, frijoles negros, aguacate y cebolla encurtida.",
    price: 15.5,
    image: polloBowl,
    category: "bowls",
    badge: "Fresco del día",
    sidesAllowed: true,
  },
  {
    id: "tostones-mojo",
    name: "Tostones con Mojo",
    description:
      "Plátano verde doblemente frito, sal marina en escamas y salsa de ajo con lima recién exprimida.",
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
      "Cortadito espumoso colado a la cubana y pastelito hojaldrado de guayaba, horneado cada mañana.",
    price: 5.95,
    image: cafecito,
    category: "bebidas",
    sidesAllowed: false,
  },
  {
    id: "bandeja-familiar",
    name: "Bandeja Criolla Familiar",
    description:
      "Para 8–10 personas: lechón asado, arroz amarillo, frijoles negros, yuca con mojo y maduros. Catering listo para servir.",
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
