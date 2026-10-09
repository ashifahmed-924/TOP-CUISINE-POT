"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";
import ChinesePattern from "@/components/ChinesePattern";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const words = ["FROM", "THE", "POT.", "TO", "THE", "TABLE."];

export default function IntroSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const number = root.querySelector("[data-intro-number]");
    const wordEls = root.querySelectorAll("[data-intro-word]");
    const curtain = root.querySelector("[data-intro-curtain]");
    const img = root.querySelector("[data-intro-img]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        number,
        { clipPath: "inset(100% 0 0 0)", y: 40 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 75%" },
        }
      );

      gsap.fromTo(
        wordEls,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );

      gsap.fromTo(
        curtain,
        { scaleX: 1 },
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: root, start: "top 55%" },
        }
      );

      gsap.fromTo(
        img,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 55%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="section-cream paper-texture relative overflow-hidden py-12 md:py-16 lg:py-20"
      data-section-tone="cream"
    >
      <ChinesePattern variant="cloud" tone="ink" opacity={0.03} />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel number="01" label="Introduction" />

        <div className="mt-6 grid items-start gap-5 md:mt-8 md:gap-6 lg:grid-cols-[88px_1fr_260px]">
          <div
            data-intro-number
            className="font-display hidden text-6xl leading-none text-imperial lg:block lg:text-7xl"
          >
            01
          </div>

          <h2 className="font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.95] tracking-tight">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="mr-2.5 inline-block overflow-hidden align-top md:mr-3">
                <span data-intro-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <p className="max-w-sm text-base leading-relaxed text-ink/80">
            Top Cuisine Pot in Notting Hill serves a menu spanning Malaysian and
            Cantonese-style dishes, including claypots, curries, seafood, roast
            meats and noodles.
          </p>
        </div>

        <div className="relative mt-8 aspect-[16/10] max-h-[320px] overflow-hidden sm:aspect-[21/9] sm:max-h-[360px] md:mt-10 md:max-h-[400px]">
          <Image
            data-intro-img
            src="/images/top-cuisine-pot/shared-table.jpg"
            alt="Shared table of Asian dishes"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
          <div
            data-intro-curtain
            className="absolute inset-0 origin-left bg-cream"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
