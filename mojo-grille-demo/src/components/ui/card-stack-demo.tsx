"use client";

import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Mojo Slow-Roasted Lechón",
    description: "24-hour sour orange & garlic live-fire roast",
    imageSrc: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    href: "https://www.google.com/maps/place/Mojo+Grille+Cuban+Kitchen/@25.8231985,-80.2430227,17z/data=!3m1!5s0x88d9b0dba01bba4f:0x7eb1c5ecaaf581ac!4m8!3m7!1s0x88d9b1962e47381b:0x801c01a9757d037c!8m2!3d25.8231937!4d-80.2404478!9m1!1b1!16s%2Fg%2F11tjhpc09g?entry=ttu",
  },
  {
    id: 2,
    title: "Plancha Pressed Cubano",
    description: "Cast-iron plancha pressed to crispy golden perfection",
    imageSrc: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80",
    href: "https://www.google.com/maps/place/Mojo+Grille+Cuban+Kitchen/@25.8231985,-80.2430227,17z/data=!3m1!5s0x88d9b0dba01bba4f:0x7eb1c5ecaaf581ac!4m8!3m7!1s0x88d9b1962e47381b:0x801c01a9757d037c!8m2!3d25.8231937!4d-80.2404478!9m1!1b1!16s%2Fg%2F11tjhpc09g?entry=ttu",
  },
  {
    id: 3,
    title: "Slow-Braised Ropa Vieja",
    description: "Shredded flank steak stewed with sweet bell peppers and wine",
    imageSrc: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    href: "https://www.google.com/maps/place/Mojo+Grille+Cuban+Kitchen/@25.8231985,-80.2430227,17z/data=!3m1!5s0x88d9b0dba01bba4f:0x7eb1c5ecaaf581ac!4m8!3m7!1s0x88d9b1962e47381b:0x801c01a9757d037c!8m2!3d25.8231937!4d-80.2404478!9m1!1b1!16s%2Fg%2F11tjhpc09g?entry=ttu",
  },
  {
    id: 4,
    title: "Golden Crispy Tostones",
    description: "Twice-fried green plantains smashed and seasoned with sea salt",
    imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    href: "https://www.google.com/maps/place/Mojo+Grille+Cuban+Kitchen/@25.8231985,-80.2430227,17z/data=!3m1!5s0x88d9b0dba01bba4f:0x7eb1c5ecaaf581ac!4m8!3m7!1s0x88d9b1962e47381b:0x801c01a9757d037c!8m2!3d25.8231937!4d-80.2404478!9m1!1b1!16s%2Fg%2F11tjhpc09g?entry=ttu",
  },
  {
    id: 5,
    title: "Authentic Miami Cafecito",
    description: "High-octane espresso shot with whipped espumita froth",
    imageSrc: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    href: "https://www.google.com/maps/place/Mojo+Grille+Cuban+Kitchen/@25.8231985,-80.2430227,17z/data=!3m1!5s0x88d9b0dba01bba4f:0x7eb1c5ecaaf581ac!4m8!3m7!1s0x88d9b1962e47381b:0x801c01a9757d037c!8m2!3d25.8231937!4d-80.2404478!9m1!1b1!16s%2Fg%2F11tjhpc09g?entry=ttu",
  },
];

export function CardStackDemoPage() {
  return (
    <div className="w-full bg-cream-bg py-12">
      <div className="mx-auto w-full max-w-5xl p-8">
        <CardStack
          items={items}
          initialIndex={0}
          autoAdvance
          intervalMs={3200}
          pauseOnHover
          showDots
        />
      </div>
    </div>
  );
}

export default CardStackDemoPage;
