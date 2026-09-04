import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { generateRestaurantSchema, generateMenuSchema } from "../lib/seo";
import { locationsList } from "../data/locations";
import { categories, menu } from "../data/menu";
import { SmoothScroll } from "../components/mojo/SmoothScroll";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mojo Grille | Authentic Cuban Kitchen & Bowls in Miami" },
      {
        name: "description",
        content:
          "Artisanal Cuban bowls, freshly pressed Cubano sandwiches, and party catering in Miami. Marinated 24h in citrus mojo. Fast takeout & delivery al momento.",
      },
      {
        name: "keywords",
        content:
          "Cuban food Miami, Cuban restaurant Little Havana, lechón asado, Cuban bowls, cubano sandwich, ropa vieja, catering Miami, cafecito cubano, mojo criollo, Brickell Cuban food, Doral takeout",
      },
      { name: "theme-color", content: "#D95327" },
      { name: "author", content: "Mojo Grille Cuban Kitchen" },

      // OpenGraph Metadata
      { property: "og:title", content: "Mojo Grille | Authentic Cuban Kitchen & Bowls in Miami" },
      {
        property: "og:description",
        content:
          "Artisanal Cuban bowls, freshly pressed Cubano sandwiches, and party catering in Miami. Marinated 24h in citrus mojo. Fast takeout & delivery al momento.",
      },
      { property: "og:url", content: "https://mojogrille.com/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Mojo Grille Cuban Kitchen" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "es_US" },
      { property: "og:image", content: "https://mojogrille.com/og-image.jpg" },
      {
        property: "og:image:alt",
        content: "Mojo Grille Cuban Kitchen - Authentic Cuban Bowls & Pressed Sandwiches in Miami",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },

      // Twitter Card Metadata
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mojo Grille | Authentic Cuban Kitchen & Bowls in Miami" },
      {
        name: "twitter:description",
        content:
          "Artisanal Cuban bowls, freshly pressed Cubano sandwiches, and party catering in Miami. Marinated 24h in citrus mojo. Fast takeout & delivery al momento.",
      },
      { name: "twitter:image", content: "https://mojogrille.com/og-image.jpg" },
      { name: "twitter:image:alt", content: "Mojo Grille Cuban Kitchen Miami" },

      // Local Geo Meta for Miami
      { name: "geo.region", content: "US-FL" },
      { name: "geo.placename", content: "Miami, Florida" },
      { name: "geo.position", content: "25.7654;-80.2115" },
      { name: "ICBM", content: "25.7654, -80.2115" },
    ],
    links: [
      { rel: "canonical", href: "https://mojogrille.com/" },
      { rel: "alternate", href: "https://mojogrille.com/", hrefLang: "x-default" },
      { rel: "alternate", href: "https://mojogrille.com/", hrefLang: "en-us" },
      { rel: "alternate", href: "https://mojogrille.com/", hrefLang: "es-us" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const schemaOrgGraph = {
    "@context": "https://schema.org",
    "@graph": [
      ...locationsList.map((loc) => generateRestaurantSchema(loc)),
      generateMenuSchema(categories, menu),
    ],
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgGraph) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <SmoothScroll>
        <Outlet />
      </SmoothScroll>
    </QueryClientProvider>
  );
}
