"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getMenuByCategory,
  menuCategories,
} from "@/data/topCuisinePot";
import CategoryRail from "@/components/Menu/CategoryRail";
import MenuGroup from "@/components/Menu/MenuGroup";
import DishPreview from "@/components/Menu/DishPreview";
import SectionLabel from "@/components/SectionLabel";
import ChinesePattern from "@/components/ChinesePattern";

const PREVIEW_LIMIT = 8;

export default function MenuSection() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const [expanded, setExpanded] = useState(false);
  const [preview, setPreview] = useState({
    item: null,
    visible: false,
    x: 0,
    y: 0,
  });

  const groups = useMemo(
    () =>
      menuCategories.map((cat) => ({
        ...cat,
        items: getMenuByCategory(cat.id),
      })),
    []
  );

  const activeGroup = useMemo(
    () => groups.find((g) => g.id === activeId) ?? groups[0],
    [groups, activeId]
  );

  const needsCollapse = activeGroup.items.length > PREVIEW_LIMIT;
  const visibleItems =
    expanded || !needsCollapse
      ? activeGroup.items
      : activeGroup.items.slice(0, PREVIEW_LIMIT);
  const hiddenCount = activeGroup.items.length - PREVIEW_LIMIT;

  useEffect(() => {
    setExpanded(false);
  }, [activeId]);

  const selectCategory = (id) => {
    setActiveId(id);
    setPreview((prev) => ({ ...prev, visible: false }));
  };

  const toggleExpanded = () => {
    if (expanded) {
      setExpanded(false);
      document.getElementById("menu")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }
    setExpanded(true);
  };

  return (
    <section
      id="menu"
      className="section-cream paper-texture relative overflow-hidden py-12 md:py-16 lg:py-20"
      data-section-tone="cream"
    >
      <ChinesePattern variant="lattice" tone="red" opacity={0.03} />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel number="05" label="Full menu" />
        <h2 className="font-display mt-3 max-w-2xl text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.95]">
          The menu book
        </h2>
        <p className="mt-3 max-w-xl text-ink/75">
          Verified dishes and prices from current public menu listings. Ask in
          store for noodle pricing and daily availability.
        </p>

        <CategoryRail
          categories={menuCategories}
          activeId={activeId}
          onSelect={selectCategory}
          variant="mobile"
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[200px_1fr]">
          <CategoryRail
            categories={menuCategories}
            activeId={activeId}
            onSelect={selectCategory}
          />

          <div key={activeId} className="menu-panel-enter">
            <MenuGroup
              id={activeGroup.id}
              label={activeGroup.label}
              items={visibleItems}
              onHover={(item, e) =>
                setPreview({
                  item,
                  visible: true,
                  x: Math.min(e.clientX + 24, window.innerWidth - 200),
                  y: Math.min(e.clientY - 40, window.innerHeight - 220),
                })
              }
              onLeave={() =>
                setPreview((prev) => ({ ...prev, visible: false }))
              }
            />

            {needsCollapse && (
              <div className="mt-8 flex flex-col items-start gap-3 border-t border-soft-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-micro text-[0.68rem] tracking-[0.16em] text-ink/50 uppercase">
                  {expanded
                    ? `Showing all ${activeGroup.items.length} dishes`
                    : `${hiddenCount} more in ${activeGroup.label}`}
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={toggleExpanded}
                  aria-expanded={expanded}
                >
                  {expanded ? "Show fewer dishes" : "See more menu items"}
                  <span className="btn-arrow" aria-hidden="true">
                    {expanded ? "↑" : "↓"}
                  </span>
                </button>
              </div>
            )}

            <p className="font-micro mt-8 text-[0.68rem] tracking-[0.14em] text-ink/45 uppercase lg:hidden">
              Browse other categories above
            </p>
          </div>
        </div>
      </div>

      <DishPreview
        item={preview.item}
        visible={preview.visible}
        x={preview.x}
        y={preview.y}
      />
    </section>
  );
}
