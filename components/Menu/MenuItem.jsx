"use client";

import { formatPriceShort } from "@/data/topCuisinePot";

export default function MenuItem({
  item,
  onHover,
  onLeave,
}) {
  return (
    <li
      className="group relative border-b border-soft-border"
      onMouseEnter={(e) => onHover?.(item, e)}
      onMouseLeave={() => onLeave?.()}
      data-cursor="MENU"
    >
      <div className="relative flex min-h-11 items-baseline gap-3 py-4 md:gap-5 md:py-5">
        <span className="font-micro w-12 shrink-0 text-[0.68rem] tracking-[0.14em] text-imperial/70">
          {item.code}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <h4 className="font-display text-lg leading-snug transition-transform duration-300 group-hover:translate-x-2 md:text-xl">
              {item.name}
            </h4>
            <span className="menu-dotted hidden min-w-[40px] flex-1 self-center md:block" />
            <span className="font-micro shrink-0 text-sm tracking-[0.08em] text-imperial transition-colors duration-300 group-hover:text-gold md:text-base">
              {formatPriceShort(item.price)}
            </span>
          </div>
          {item.chineseName && (
            <p className="mt-1 text-sm text-ink/55">{item.chineseName}</p>
          )}
        </div>
      </div>
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-imperial transition-all duration-300 group-hover:w-full"
        aria-hidden="true"
      />
    </li>
  );
}
