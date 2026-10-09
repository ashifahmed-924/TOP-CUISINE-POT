"use client";

export default function CategoryRail({
  categories,
  activeId,
  onSelect,
  variant = "desktop",
}) {
  if (variant === "mobile") {
    return (
      <div className="sticky top-[68px] z-20 -mx-4 border-b border-soft-border bg-cream/95 px-4 py-3 backdrop-blur md:mx-0 lg:hidden">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto">
          {categories.map((cat) => {
            const active = cat.id === activeId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelect(cat.id)}
                aria-pressed={active}
                className={`font-micro min-h-11 shrink-0 px-3 tracking-[0.12em] uppercase ${
                  active
                    ? "bg-imperial text-cream"
                    : "border border-soft-border text-ink"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <nav
      className="sticky top-28 hidden lg:block"
      aria-label="Menu categories"
    >
      <div className="relative border-l-2 border-imperial/25 pl-5">
        <span
          className="absolute top-0 left-[-2px] h-8 w-[2px] bg-imperial transition-transform duration-300"
          style={{
            transform: `translateY(${Math.max(
              0,
              categories.findIndex((c) => c.id === activeId)
            ) * 44}px)`,
          }}
          aria-hidden="true"
        />
        <ul className="space-y-1">
          {categories.map((cat) => {
            const active = cat.id === activeId;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => onSelect(cat.id)}
                  aria-pressed={active}
                  className={`font-micro flex min-h-11 items-center tracking-[0.14em] uppercase transition-colors ${
                    active ? "text-imperial" : "text-ink/55 hover:text-ink"
                  }`}
                >
                  {cat.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
