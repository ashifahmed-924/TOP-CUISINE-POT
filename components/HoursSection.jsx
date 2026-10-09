"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/topCuisinePot";
import ChinesePattern from "@/components/ChinesePattern";
import SectionLabel from "@/components/SectionLabel";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const days = [
  ["Monday", business.hours.monday],
  ["Tuesday", business.hours.tuesday],
  ["Wednesday", business.hours.wednesday],
  ["Thursday", business.hours.thursday],
  ["Friday", business.hours.friday],
  ["Saturday", business.hours.saturday],
  ["Sunday", business.hours.sunday],
];

export default function HoursSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const dayEls = root.querySelectorAll("[data-hours-day]");
    const timeEls = root.querySelectorAll("[data-hours-time]");
    const lines = root.querySelectorAll("[data-hours-line]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dayEls,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );

      gsap.fromTo(
        timeEls,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );

      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.7,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 68%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="hours"
      ref={rootRef}
      className="section-red relative flex h-full flex-col overflow-hidden px-4 py-12 md:px-8 md:py-14 lg:py-16"
      data-section-tone="red"
    >
      <ChinesePattern variant="border" tone="cream" opacity={0.05} />
      <div className="relative flex flex-1 flex-col">
        <SectionLabel number="11" label="Hours" tone="cream" />
        <h2 className="font-display mt-3 text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[0.9]">
          COME
          <br />
          HUNGRY.
        </h2>

        <ul className="mt-7 flex-1 space-y-2.5 md:mt-8 md:space-y-3">
          {days.map(([day, hours]) => (
            <li
              key={day}
              className="grid items-end gap-2 grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[110px_1fr_auto]"
            >
              <span
                data-hours-day
                className="font-micro text-xs tracking-[0.18em] text-cream/75 uppercase sm:text-sm"
              >
                {day}
              </span>
              <span
                data-hours-line
                className="hidden h-px origin-left bg-cream/35 sm:block"
                aria-hidden="true"
              />
              <span
                data-hours-time
                className="font-display text-base text-cream sm:text-right sm:text-xl lg:text-2xl"
              >
                {hours}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-md text-sm text-cream/70 md:mt-10">
          {business.hoursNote}
        </p>
      </div>
    </section>
  );
}
