import { categories, type CategoryId } from "@/data/menu";

export function CategoryTabs({
  active,
  onChange,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}) {
  const handleSelect = (id: CategoryId) => {
    onChange(id);
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      const rect = menuEl.getBoundingClientRect();
      if (rect.top < 0 || rect.top > 200) {
        menuEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="sticky top-[52px] sm:top-[58px] z-30 border-b border-charred-iron/15 bg-toasted-cream/90 backdrop-blur-md py-2.5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          role="tablist"
          aria-label="Menu Categories"
          className="no-scrollbar flex items-center justify-start sm:justify-center gap-2 overflow-x-auto p-1.5 rounded-full bg-surface-sand/80 border border-charred-iron/15 shadow-xs"
        >
          {categories.map((cat) => {
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isActive}
                type="button"
                onClick={() => handleSelect(cat.id)}
                className={
                  "relative shrink-0 rounded-full px-5 py-2 font-sans text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 focus:outline-none " +
                  (isActive
                    ? "bg-[#D95327] text-white shadow-md shadow-[#D95327]/30 scale-[1.02]"
                    : "text-[#1C1917] hover:text-[#D95327] hover:bg-[#FAF8F5]")
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

export default CategoryTabs;
