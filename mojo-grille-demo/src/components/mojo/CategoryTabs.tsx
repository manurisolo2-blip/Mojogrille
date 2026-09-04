import { categories, type CategoryId } from "@/data/menu";

export function CategoryTabs({
  active,
  onChange,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}) {
  return (
    <div className="sticky top-[92px] z-30 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
          {categories.map((cat) => {
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange(cat.id)}
                className={
                  "shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors " +
                  (isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-muted-foreground hover:bg-muted")
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
