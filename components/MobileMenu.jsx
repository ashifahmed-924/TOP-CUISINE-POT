"use client";

import { useEffect } from "react";
import { business } from "@/data/topCuisinePot";
import ChinesePattern from "@/components/ChinesePattern";

export default function MobileMenu({ open, onClose, links }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-[60] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/50"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 flex w-[min(88vw,360px)] flex-col bg-lacquer text-cream">
        <ChinesePattern variant="lattice" tone="cream" opacity={0.04} />
        <div className="relative z-10 flex items-center justify-between border-b border-cream/20 px-5 py-5">
          <span className="font-display text-xl">Top Cuisine Pot</span>
          <button
            type="button"
            className="font-micro min-h-11 tracking-[0.14em] uppercase"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <nav className="relative z-10 flex flex-1 flex-col gap-2 px-5 py-8" aria-label="Mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display border-b border-cream/15 py-4 text-3xl"
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="relative z-10 space-y-3 border-t border-cream/20 px-5 py-6">
          <a href={business.telHref} className="btn-primary btn-on-red w-full">
            Call {business.phoneDisplay}
          </a>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-on-red w-full"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}
