"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChinesePattern from "@/components/ChinesePattern";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const words = ["GOOD", "FOOD.", "BIG", "TABLE.", "HOT", "POT."];

export default function RedInterlude() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const wordEls = root.querySelectorAll("[data-interlude-word]");
    const pattern = root.querySelector("[data-interlude-pattern]");

    const ctx = gsap.context(() => {
      wordEls.forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          el,
          { xPercent: fromLeft ? -40 : 40, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      gsap.fromTo(
        pattern,
        { scale: 1 },
        {
          scale: 1.03,
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
      className="section-red relative overflow-hidden py-14 md:py-16 lg:py-20"
      data-section-tone="red"
    >
      <div data-interlude-pattern className="absolute inset-0">
        <ChinesePattern variant="lattice" tone="cream" opacity={0.05} scale={1.3} />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center md:px-8">
        <h2 className="font-display text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] text-cream">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="mx-1.5 inline-block overflow-hidden md:mx-2">
              <span data-interlude-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h2>

        <div className="mx-auto mt-8 max-w-xs border border-cream/35 p-4 md:mt-10 md:p-5">
          <ChinesePattern variant="border" tone="cream" opacity={0.15} />
          <p className="font-micro relative z-10 text-[0.68rem] tracking-[0.28em] text-cream/80 uppercase">
            Notting Hill
            <br />
            Melbourne
          </p>
        </div>
      </div>
    </section>
  );
}
