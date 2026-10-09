"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ribbonItems } from "@/data/topCuisinePot";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function FoodRibbon() {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    const ctx = gsap.context(() => {
      const width = track.scrollWidth / 2;
      gsap.to(track, {
        x: -width,
        duration: 38,
        ease: "none",
        repeat: -1,
      });
    }, track);

    return () => ctx.revert();
  }, [reduced]);

  const items = [...ribbonItems, ...ribbonItems];

  return (
    <section
      className="section-cream relative overflow-hidden border-y border-soft-border py-3"
      aria-label="Menu categories ribbon"
      data-section-tone="cream"
    >
      <div ref={trackRef} className="flex w-max items-center gap-6 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="font-micro flex items-center gap-6">
            <span className="text-[0.78rem] tracking-[0.28em] text-imperial uppercase">
              {item}
            </span>
            <span className="text-imperial/50" aria-hidden="true">
              •
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
