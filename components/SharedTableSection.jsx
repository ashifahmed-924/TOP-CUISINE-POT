"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const labels = [
  { text: "Volcano Tofu", className: "top-[12%] left-[6%]" },
  { text: "Curry Beef", className: "top-[18%] right-[8%]" },
  { text: "Charcoal Fish", className: "bottom-[28%] left-[4%]" },
  { text: "Greens", className: "bottom-[18%] right-[10%]" },
  { text: "Calamari", className: "top-1/2 left-[2%]" },
];

export default function SharedTableSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const img = root.querySelector("[data-shared-img]");
    const labelEls = root.querySelectorAll("[data-shared-label]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { clipPath: "inset(12% 12% 12% 12%)", scale: 1.06 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );

      gsap.fromTo(
        labelEls,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 60%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="section-cream relative overflow-hidden py-12 md:py-16 lg:py-20"
      data-section-tone="cream"
    >
      <div className="mx-auto max-w-7xl px-4 text-center md:px-8 lg:text-left">
        <SectionLabel
          number="08"
          label="Shared dining"
          className="justify-center lg:justify-start"
        />
        <h2 className="font-display mx-auto mt-3 max-w-3xl text-[clamp(2rem,5.5vw,3.8rem)] leading-[0.95] lg:mx-0">
          MADE FOR
          <br />
          THE MIDDLE
          <br />
          OF THE TABLE.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink/75 lg:mx-0">
          The menu is well suited to shared dining, with claypots, seafood,
          roast meats, vegetables and larger dishes.
        </p>

        <div className="relative mx-auto mt-8 aspect-[16/10] w-full max-h-[280px] max-w-4xl overflow-hidden sm:max-h-[340px] md:mt-10 md:max-h-[400px] lg:aspect-[21/9] lg:max-h-[420px] lg:max-w-none">
          <Image
            data-shared-img
            src="/images/top-cuisine-pot/shared-table.jpg"
            alt="Multiple shared dishes arranged for the table"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 896px, 1200px"
            className="object-cover object-center"
          />
          {labels.map((label) => (
            <span
              key={label.text}
              data-shared-label
              className={`font-micro absolute hidden border border-cream/80 bg-cream/90 px-2 py-1 text-[0.62rem] tracking-[0.14em] text-imperial uppercase lg:block ${label.className}`}
            >
              {label.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
