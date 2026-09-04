import type { Location, LocationId } from "@/types/mojo";

/**
 * Mojo Grille Official Store Locations in Miami, FL.
 */
export const LOCATIONS: Record<LocationId, Location> = {
  "little-havana": {
    id: "little-havana",
    name: "Little Havana",
    slug: "little-havana",
    phone: "+1-305-555-0123",
    phoneRaw: "13055550123",
    address: {
      street: "1234 SW 8th St",
      city: "Miami",
      state: "FL",
      zipCode: "33135",
      fullAddress: "1234 SW 8th St, Little Havana, Miami, FL 33135",
    },
    coordinates: {
      latitude: 25.7654,
      longitude: -80.2115,
    },
    hours: "Mon–Sun · 11:00 AM – 10:00 PM",
    isPrimary: true,
  },
  brickell: {
    id: "brickell",
    name: "Brickell",
    slug: "brickell",
    phone: "+1-305-555-0124",
    phoneRaw: "13055550124",
    address: {
      street: "901 S Miami Ave",
      city: "Miami",
      state: "FL",
      zipCode: "33130",
      fullAddress: "901 S Miami Ave, Brickell, Miami, FL 33130",
    },
    coordinates: {
      latitude: 25.7645,
      longitude: -80.1936,
    },
    hours: "Mon–Sun · 11:00 AM – 11:00 PM",
    isPrimary: false,
  },
  doral: {
    id: "doral",
    name: "Doral",
    slug: "doral",
    phone: "+1-305-555-0125",
    phoneRaw: "13055550125",
    address: {
      street: "8400 NW 36th St",
      city: "Doral",
      state: "FL",
      zipCode: "33166",
      fullAddress: "8400 NW 36th St, Doral, FL 33166",
    },
    coordinates: {
      latitude: 25.809,
      longitude: -80.334,
    },
    hours: "Mon–Sun · 11:00 AM – 10:00 PM",
    isPrimary: false,
  },
};

export const locationsList: readonly Location[] = [
  LOCATIONS["little-havana"],
  LOCATIONS["brickell"],
  LOCATIONS["doral"],
];

export const DEFAULT_LOCATION_ID: LocationId = "little-havana";
export const DEFAULT_LOCATION: Location = LOCATIONS[DEFAULT_LOCATION_ID];

/**
 * Resolves a location input (Location object, LocationId, or display name)
 * to a validated Location entity. Falls back to DEFAULT_LOCATION.
 */
export function resolveLocation(input?: LocationId | Location | string | null): Location {
  if (!input) return DEFAULT_LOCATION;

  if (
    typeof input === "object" &&
    input !== null &&
    "id" in input &&
    typeof input.id === "string" &&
    Object.hasOwn(LOCATIONS, input.id)
  ) {
    return input;
  }

  if (typeof input === "string") {
    // Exact ID match with prototype pollution safety
    if (Object.hasOwn(LOCATIONS, input)) {
      return LOCATIONS[input as LocationId];
    }
    // Slugified match (e.g. "Little Havana" -> "little-havana")
    const slug = input.toLowerCase().trim().replace(/\s+/g, "-");
    if (Object.hasOwn(LOCATIONS, slug)) {
      return LOCATIONS[slug as LocationId];
    }
    // Case-insensitive name match
    const byName = locationsList.find(
      (l) => l.name.toLowerCase() === input.toLowerCase().trim(),
    );
    if (byName) return byName;
  }

  return DEFAULT_LOCATION;
}

export function getLocationById(id: LocationId): Location | undefined {
  return Object.hasOwn(LOCATIONS, id) ? LOCATIONS[id] : undefined;
}

