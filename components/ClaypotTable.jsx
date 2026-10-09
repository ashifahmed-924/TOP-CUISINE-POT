"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { claypotTable, formatPriceShort } from "@/data/topCuisinePot";
import ChinesePattern from "@/components/ChinesePattern";
import SectionLabel from "@/components/SectionLabel";
import SwipeCarousel from "@/components/SwipeCarousel";
import useMediaQuery from "@/hooks/useMediaQuery";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const positions = [
  "top-[8%] left-1/2 -translate-x-1/2",
  "top-[28%] right-[2%]",
  "bottom-[22%] right-[6%]",
  "bottom-[8%] left-1/2 -translate-x-1/2",
  "bottom-[22%] left-[6%]",
  "top-[28%] left-[2%]",
];

export default function ClaypotTable() {
  const rootRef = useRef(null);
  const markerRef = useRef(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [active, setActive] = useState(0);
  const dishes = useMemo(() => claypotTable, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-clay-title]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || reduced) return;

    const angle = (360 / dishes.length) * active - 90;
    const rad = (angle * Math.PI) / 180;
    const radius = 46;
    const x = 50 + Math.cos(rad) * radius;
    const y = 50 + Math.sin(rad) * radius;

    gsap.to(marker, {
      left: `${x}%`,
      top: `${y}%`,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active, dishes.length, reduced]);

  return (
    <section
      id="claypot"
      ref={rootRef}
      className="section-red relative overflow-hidden py-12 md:py-16 lg:py-20"
      data-section-tone="red"
    >
      <ChinesePattern variant="lattice" tone="cream" opacity={0.04} />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel number="03" label="Claypot" tone="cream" />
        <h2 className="font-display mt-3 text-[clamp(2.4rem,7vw,5rem)] leading-[0.9]">
          <span data-clay-title className="block">
            THE
          </span>
          <span data-clay-title className="block">
            CLAYPOT
          </span>
          <span data-clay-title className="block text-gold">
            TABLE
          </span>
        </h2>

        {isDesktop ? (
        <div className="relative mx-auto mt-10 aspect-square max-w-2xl lg:mt-12 xl:max-w-3xl">
          <div className="absolute inset-[8%] rounded-full border border-cream/35" />
          <div className="absolute inset-[18%] overflow-hidden rounded-full border border-gold/40 bg-brown">
            {dishes.map((dish, i) => (
              <div
                key={dish.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="420px"
                  className="object-cover"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-ink/20" />
          </div>

          <div
            ref={markerRef}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(185,146,78,0.25)]"
            style={{ left: "50%", top: "4%" }}
            aria-hidden="true"
          />

          {dishes.map((dish, i) => {
            const isActive = i === active;
            return (
              <button
                key={dish.id}
                type="button"
                className={`absolute z-10 max-w-[160px] border px-3 py-2 text-left transition-colors xl:max-w-[180px] ${
                  positions[i]
                } ${
                  isActive
                    ? "border-cream bg-cream text-imperial"
                    : "border-cream/40 bg-lacquer/80 text-cream hover:border-cream"
                }`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="VIEW"
              >
                <span className="font-micro block text-[0.62rem] tracking-[0.14em] uppercase">
                  {dish.name}
                </span>
                <span className="mt-1 block text-sm">{formatPriceShort(dish.price)}</span>
              </button>
            );
          })}
        </div>
        ) : (
        <div className="mt-8">
          <SwipeCarousel
            ariaLabel="Claypot dishes"
            mobileOnly={false}
            trackClassName="gap-3"
            tone="cream"
          >
            {dishes.map((dish) => (
              <article
                key={dish.id}
                className="overflow-hidden border border-cream/35 bg-lacquer/40"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="86vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 px-4 py-4">
                  <h3 className="font-display text-lg leading-tight text-cream">
                    {dish.name}
                  </h3>
                  <span className="font-micro shrink-0 tracking-[0.08em] text-gold">
                    {formatPriceShort(dish.price)}
                  </span>
                </div>
              </article>
            ))}
          </SwipeCarousel>
        </div>
        )}
      </div>
    </section>
  );
}
