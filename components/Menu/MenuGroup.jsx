"use client";

import MenuItem from "@/components/Menu/MenuItem";

export default function MenuGroup({
  id,
  label,
  items,
  onHover,
  onLeave,
}) {
  if (!items.length) return null;

  return (
    <section id={`menu-${id}`} data-menu-group={id} className="scroll-mt-28">
      <h3 className="font-micro border-b border-imperial/30 pb-3 text-[0.72rem] tracking-[0.24em] text-imperial uppercase">
        {label}
      </h3>
      <ul>
        {items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onHover={onHover}
            onLeave={onLeave}
          />
        ))}
      </ul>
    </section>
  );
}
