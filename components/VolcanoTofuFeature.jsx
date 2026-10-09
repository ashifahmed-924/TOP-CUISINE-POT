"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatPrice, menu } from "@/data/topCuisinePot";
import ChinesePattern from "@/components/ChinesePattern";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const dish = menu.find((i) => i.id === "homemade-volcano-tofu");

export default function VolcanoTofuFeature() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const halo = root.querySelector("[data-volcano-halo]");
    const left = root.querySelector("[data-volcano-left]");
    const right = root.querySelector("[data-volcano-right]");
    const stamp = root.querySelector("[data-volcano-stamp]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        halo,
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );

      gsap.fromTo(
        left,
        { xPercent: -20, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%" },
        }
      );

      gsap.fromTo(
        right,
        { xPercent: 20, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%" },
        }
      );

      gsap.fromTo(
        stamp,
        { scale: 0.85, rotate: -8, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 68%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  if (!dish) return null;

  return (
    <section
      ref={rootRef}
      className="section-rice relative overflow-hidden py-12 md:py-16 lg:py-20"
      data-section-tone="cream"
    >
      <ChinesePattern variant="seal" tone="red" opacity={0.035} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 md:gap-10 md:px-8 lg:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px]">
          <div
            data-volcano-halo
            className="absolute inset-[8%] rounded-full bg-imperial/25 blur-[2px]"
            aria-hidden="true"
          />
          <div className="absolute inset-[16%] overflow-hidden rounded-full border-[5px] border-imperial shadow-xl">
            <Image
              src={dish.image}
              alt="Homemade Volcano Tofu"
              fill
              sizes="(max-width: 768px) 260px, 340px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="text-center lg:text-left">
          <h2 className="font-display leading-[0.85]">
            <span
              data-volcano-left
              className="block text-[clamp(3rem,11vw,6rem)] text-imperial"
            >
              VOLCANO
            </span>
            <span
              data-volcano-right
              className="mt-1 block text-[clamp(2rem,6.5vw,3.6rem)] text-ink"
            >
              TOFU
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-ink/75 lg:mx-0">
            Homemade Volcano Tofu — a featured dish often mentioned by diners at
            Top Cuisine Pot.
          </p>
          <p className="font-micro mt-5 text-xl tracking-[0.1em] text-imperial md:text-2xl">
            {formatPrice(dish.price)}
          </p>
          <div
            data-volcano-stamp
            className="font-micro mt-5 inline-block border-2 border-imperial px-4 py-2 text-[0.68rem] tracking-[0.2em] text-imperial uppercase"
          >
            Featured Dish
          </div>
        </div>
      </div>
    </section>
  );
}
