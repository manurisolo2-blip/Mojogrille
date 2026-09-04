import type { Location, MenuItem, Category } from "@/types/mojo";
import { DEFAULT_LOCATION, locationsList } from "@/data/locations";

/**
 * Generates Schema.org Restaurant structured data for Google Rich Results.
 */
export function generateRestaurantSchema(location: Location = DEFAULT_LOCATION) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `https://mojogrille.com/#location-${location.id}`,
    name: `Mojo Grille - ${location.name}`,
    image: "https://mojogrille.com/og-image.jpg",
    url: "https://mojogrille.com",
    telephone: location.phone,
    priceRange: "$$",
    servesCuisine: ["Cuban", "Caribbean", "Latin American"],
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zipCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates?.latitude ?? 25.7654,
      longitude: location.coordinates?.longitude ?? -80.2115,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: location.id === "brickell" ? "23:00" : "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "3000",
      bestRating: "5",
      worstRating: "1",
    },
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://mojogrille.com/#menu",
        inLanguage: "en-US",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    },
  };
}

/**
 * Generates Schema.org Menu structured data for catalog items.
 */
export function generateMenuSchema(categories: Category[], menu: MenuItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Mojo Grille Cuban Kitchen Menu",
    hasMenuSection: categories
      .filter((cat) => cat.id !== "favoritos")
      .map((cat) => ({
        "@type": "MenuSection",
        name: cat.label,
        hasMenuItem: menu
          .filter((item) => item.category === cat.id)
          .map((item) => ({
            "@type": "MenuItem",
            name: item.name,
            description: item.description,
            offers: {
              "@type": "Offer",
              price: item.price.toFixed(2),
              priceCurrency: "USD",
            },
          })),
      })),
  };
}

/**
 * Generates a multi-location Schema.org graph for all Miami branches.
 */
export function generateMultiLocationRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": locationsList.map((loc) => generateRestaurantSchema(loc)),
  };
}

/**
 * Serializes restaurant and menu schemas into a string ready for <script type="application/ld+json">.
 */
export function generateRestaurantAndMenuJsonLd(
  location: Location = DEFAULT_LOCATION,
  categoryList: Category[] = [],
  menuList: MenuItem[] = [],
): string {
  const restaurant = generateRestaurantSchema(location);
  if (categoryList.length === 0 || menuList.length === 0) {
    return JSON.stringify(restaurant);
  }

  const menu = generateMenuSchema(categoryList, menuList);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [restaurant, menu],
  });
}

/**
 * Generates the full comprehensive Schema.org structured data graph
 * including all Miami restaurant branches (Little Havana, Brickell, Doral)
 * and the complete Menu catalog.
 */
export function generateFullStructuredDataGraph(
  locations: readonly Location[] = locationsList,
  categoryList: Category[] = [],
  menuList: MenuItem[] = [],
) {
  const restaurantBranches = locations.map((loc) => generateRestaurantSchema(loc));
  const menuData =
    categoryList.length > 0 && menuList.length > 0
      ? generateMenuSchema(categoryList, menuList)
      : null;

  return {
    "@context": "https://schema.org",
    "@graph": menuData ? [...restaurantBranches, menuData] : restaurantBranches,
  };
}


