"use client";

import Image from "next/image";

export default function DishPreview({ item, visible, x, y }) {
  if (!item) return null;

  return (
    <div
      className={`pointer-events-none fixed z-40 hidden w-44 overflow-hidden border border-soft-border bg-cream shadow-xl transition-opacity duration-200 lg:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ left: x, top: y }}
      aria-hidden="true"
    >
      <div className="relative aspect-square">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="176px"
          className="object-cover"
        />
      </div>
      <p className="font-micro truncate px-2 py-2 text-[0.62rem] tracking-[0.12em] text-imperial uppercase">
        {item.name}
      </p>
    </div>
  );
}
