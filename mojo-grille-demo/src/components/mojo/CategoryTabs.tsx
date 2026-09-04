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
    <div className="sticky top-[58px] sm:top-[64px] z-30 border-b border-[#EAE5DC] bg-[#FAF8F5]/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl">
        <div
          role="tablist"
          aria-label="Menu Categories"
          className="no-scrollbar flex gap-2.5 overflow-x-auto px-4 py-3 sm:px-6"
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
                  "shrink-0 rounded-full border px-4 py-2 font-sans text-sm transition-all duration-200 " +
                  (isActive
                    ? "border-[#D95327] bg-[#D95327] font-bold text-white shadow-sm"
                    : "border-[#EAE5DC] bg-white font-medium text-[#78716C] hover:border-[#D6CFBF] hover:bg-[#F4EFEA] hover:text-[#1C1917]")
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
