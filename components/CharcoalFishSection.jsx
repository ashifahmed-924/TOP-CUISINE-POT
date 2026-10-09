"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { charcoalFish, formatPrice } from "@/data/topCuisinePot";
import ChinesePattern from "@/components/ChinesePattern";
import SectionLabel from "@/components/SectionLabel";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CharcoalFishSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const bg = root.querySelector("[data-charcoal-bg]");
    const photo = root.querySelector("[data-charcoal-photo]");
    const line = root.querySelector("[data-charcoal-line]");
    const prices = root.querySelectorAll("[data-charcoal-price]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { backgroundColor: "#7C1418" },
        {
          backgroundColor: "#1A1411",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        photo,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 65%" },
        }
      );

      gsap.fromTo(
        prices,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 60%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="charcoal-fish"
      ref={rootRef}
      className="relative overflow-hidden py-12 md:py-16 lg:py-20"
      data-section-tone="dark"
    >
      <div data-charcoal-bg className="absolute inset-0 bg-charcoal" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 20%, rgba(185,146,78,0.12), transparent 45%), radial-gradient(ellipse at 70% 80%, rgba(165,28,32,0.18), transparent 40%)",
        }}
        aria-hidden="true"
      />
      <ChinesePattern variant="cloud" tone="cream" opacity={0.025} />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[minmax(0,1fr)_minmax(160px,200px)] md:items-start md:gap-x-8 md:gap-y-8 md:px-8 lg:grid-cols-[1.05fr_0.85fr] lg:items-center lg:gap-10">
        <div>
          <SectionLabel number="04" label="Charcoal Fish Pot" tone="cream" />
          <h2 className="font-display mt-4 text-[clamp(2.4rem,7vw,4.8rem)] leading-[0.9] text-cream">
            CHARCOAL
            <br />
            FISH POT
          </h2>
          <p className="mt-4 max-w-md text-cream/75">
            Built around whole fish and bold pot-style flavours.
          </p>

          <div
            data-charcoal-line
            className="mt-6 hidden h-20 w-px origin-top bg-cream/70 lg:block"
            aria-hidden="true"
          />
        </div>

        <ul className="space-y-3 md:col-span-2 md:row-start-2 md:space-y-4 lg:col-span-1 lg:col-start-1">
          {charcoalFish.map((item) => (
            <li
              key={item.id}
              data-charcoal-price
              className="flex items-end justify-between gap-4 border-b border-cream/20 pb-3"
            >
              <span className="font-display text-lg text-cream md:text-xl lg:text-2xl">
                {item.name.replace(" Charcoal Fish Pot", "")}
              </span>
              <span className="font-micro tracking-[0.1em] text-gold">
                {formatPrice(item.price)}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden md:col-start-2 md:row-start-1 md:mx-0 md:max-w-[200px] lg:row-span-2 lg:max-w-none lg:aspect-[3/4] lg:self-center">
          <Image
            data-charcoal-photo
            src="/images/top-cuisine-pot/charcoal-fish.jpg"
            alt="Charcoal fish pot style seafood dish"
            fill
            sizes="(max-width: 768px) 240px, (max-width: 1024px) 200px, 38vw"
            className="object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-cream/20" />
        </div>
      </div>
    </section>
  );
}
