"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatPrice, noodleBoard } from "@/data/topCuisinePot";
import ChinesePattern from "@/components/ChinesePattern";
import SectionLabel from "@/components/SectionLabel";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function DishItem({ dish, nameClassName = "text-xl" }) {
  return (
    <li className="overflow-hidden border-b border-soft-border pb-3">
      <div data-noodle-name>
        <p className={`font-display text-imperial ${nameClassName}`}>{dish.name}</p>
        <p className="font-micro mt-1 text-sm tracking-[0.1em] text-ink/60">
          {formatPrice(dish.price)}
        </p>
      </div>
    </li>
  );
}

function FavouritesNote({ nameClassName = "text-lg", className = "" }) {
  return (
    <li className={`overflow-hidden border-b border-soft-border pb-3 ${className}`}>
      <div data-noodle-name>
        <p className={`font-display text-ink/70 ${nameClassName}`}>
          Fish soup favourites
        </p>
        <p className="mt-1 text-sm text-ink/55">
          Mentioned often in public diner feedback.
        </p>
      </div>
    </li>
  );
}

export default function NoodleSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const names = root.querySelectorAll("[data-noodle-name]");
    const photos = root.querySelectorAll("[data-noodle-photo]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        names,
        { clipPath: "inset(0 0 100% 0)", y: 16 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );

      gsap.fromTo(
        photos,
        { scale: 1.04 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 68%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="section-rice paper-texture relative overflow-hidden py-12 md:py-16 lg:py-20"
      data-section-tone="cream"
    >
      <ChinesePattern variant="cloud" tone="ink" opacity={0.035} />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center xl:text-left">
          <SectionLabel
            number="07"
            label="Noodles & broth"
            className="justify-center xl:justify-start"
          />
          <h2 className="font-display mt-3 text-[clamp(2.2rem,6vw,4rem)] leading-[0.95]">
            BOWLS,
            <br />
            NOODLES,
            <br />
            BROTH.
          </h2>
        </div>

        {/* Mobile + tablet: stacked on phone, image | menu on tablet */}
        <div className="mt-8 grid items-center gap-8 md:mt-10 md:grid-cols-2 md:gap-10 xl:hidden">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden md:aspect-[4/5] md:max-w-none">
            <Image
              data-noodle-photo
              src="/images/top-cuisine-pot/laksa.jpg"
              alt="Noodle bowl with broth"
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <ul className="grid gap-4 text-left">
            {noodleBoard.map((dish) => (
              <DishItem
                key={dish.id}
                dish={dish}
                nameClassName="text-xl md:text-2xl"
              />
            ))}
            <FavouritesNote nameClassName="text-lg md:text-xl" />
          </ul>
        </div>

        {/* Desktop: dishes | photo | dishes */}
        <div className="relative mt-10 hidden items-center gap-8 xl:grid xl:grid-cols-[1fr_minmax(220px,320px)_1fr]">
          <ul className="space-y-5">
            {noodleBoard.slice(0, 2).map((dish) => (
              <li key={dish.id} className="overflow-hidden">
                <div data-noodle-name>
                  <p className="font-display text-2xl text-imperial xl:text-3xl">
                    {dish.name}
                  </p>
                  <p className="font-micro mt-1 text-sm tracking-[0.1em] text-ink/60">
                    {formatPrice(dish.price)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden">
            <Image
              data-noodle-photo
              src="/images/top-cuisine-pot/laksa.jpg"
              alt="Noodle bowl with broth"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>

          <ul className="space-y-5 text-right">
            {noodleBoard.slice(2).map((dish) => (
              <li key={dish.id} className="overflow-hidden">
                <div data-noodle-name>
                  <p className="font-display text-2xl text-imperial xl:text-3xl">
                    {dish.name}
                  </p>
                  <p className="font-micro mt-1 text-sm tracking-[0.1em] text-ink/60">
                    {formatPrice(dish.price)}
                  </p>
                </div>
              </li>
            ))}
            <li className="overflow-hidden">
              <div data-noodle-name>
                <p className="font-display text-xl text-ink/70 xl:text-2xl">
                  Fish soup favourites
                </p>
                <p className="mt-1 text-sm text-ink/55">
                  Mentioned often in public diner feedback.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
