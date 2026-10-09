"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/topCuisinePot";
import ChinesePattern from "@/components/ChinesePattern";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTA() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const pot = root.querySelector("[data-cta-pot]");
    const clouds = root.querySelector("[data-cta-clouds]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pot,
        { yPercent: 35, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );

      gsap.fromTo(
        clouds,
        { xPercent: -4 },
        {
          xPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="section-rice relative overflow-hidden py-14 md:py-16 lg:py-20"
      data-section-tone="cream"
    >
      <div data-cta-clouds className="absolute inset-0">
        <ChinesePattern variant="cloud" tone="red" opacity={0.05} scale={1.4} />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,6.5vw,4.5rem)] leading-[0.92]">
            WHAT&apos;S
            <br />
            GOING IN
            <br />
            THE POT?
          </h2>
          <p className="mt-4 max-w-md text-ink/75">
            Explore the menu or visit Top Cuisine Pot in Notting Hill.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#menu" className="btn-primary" data-cursor="MENU">
              Explore Menu
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-cursor="GO"
            >
              Get Directions
            </a>
            <a href={business.telHref} className="btn-secondary" data-cursor="GO">
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>

        <div
          data-cta-pot
          className="relative mx-auto aspect-[5/4] w-full max-w-sm overflow-hidden lg:ml-auto lg:max-w-md"
        >
          <Image
            src="/images/top-cuisine-pot/hero-pot.jpg"
            alt="Restaurant dining atmosphere"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
