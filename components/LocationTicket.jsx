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

export default function LocationTicket() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ticket = root.querySelector("[data-ticket]");
    const blocks = root.querySelectorAll("[data-map-block]");
    const lines = root.querySelectorAll("[data-ticket-line]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ticket,
        { rotate: -4, y: 60, opacity: 0 },
        {
          rotate: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );

      gsap.fromTo(
        blocks,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 75%" },
        }
      );

      gsap.fromTo(
        lines,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.45,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 65%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="location"
      ref={rootRef}
      className="section-cream relative flex h-full flex-col overflow-hidden px-4 py-12 md:px-8 md:py-14 lg:py-16"
      data-section-tone="cream"
    >
      <ChinesePattern variant="lattice" tone="ink" opacity={0.03} />

      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        <div
          data-map-block
          className="absolute top-[12%] left-[8%] h-20 w-28 bg-sand/80"
        />
        <div
          data-map-block
          className="absolute top-[30%] right-[10%] h-28 w-20 bg-imperial/10"
        />
        <div
          data-map-block
          className="absolute bottom-[18%] left-[14%] h-16 w-36 bg-gold/15"
        />
        <div
          data-map-block
          className="absolute right-[18%] bottom-[28%] h-24 w-24 bg-lacquer/10"
        />
      </div>

      <div className="relative flex flex-1 flex-col">
        <SectionLabel number="10" label="Location" />
        <h2 className="font-display mt-3 text-3xl md:text-4xl">
          Find the pot
        </h2>

        <div
          data-ticket
          className="relative mt-7 w-full max-w-none flex-1 bg-cream text-ink shadow-[0_24px_60px_rgba(43,28,23,0.18)] md:mt-8 lg:max-w-md"
        >
          <div
            className="absolute inset-y-0 left-0 w-4 bg-lacquer"
            style={{
              backgroundImage:
                "radial-gradient(circle at 0 50%, transparent 5px, #F4E8D1 5.5px)",
              backgroundSize: "12px 16px",
              backgroundColor: "#7C1418",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-0 w-4"
            style={{
              backgroundImage:
                "radial-gradient(circle at 100% 50%, transparent 5px, #F4E8D1 5.5px)",
              backgroundSize: "12px 16px",
              backgroundColor: "#7C1418",
            }}
            aria-hidden="true"
          />

          <div className="border border-imperial/30 px-6 py-6 md:px-8 md:py-8">
            <p
              data-ticket-line
              className="font-display text-2xl text-imperial md:text-3xl"
            >
              {business.name}
            </p>
            <div className="my-5 border-t border-dashed border-imperial/35" />
            <p data-ticket-line className="font-micro tracking-[0.18em] uppercase">
              Shop C1
            </p>
            <p data-ticket-line className="font-display mt-2 text-xl md:text-2xl">
              662–678 Blackburn Rd
            </p>
            <p data-ticket-line className="mt-2 text-base md:text-lg">
              Notting Hill VIC 3168
            </p>
            <div className="my-5 border-t border-dashed border-imperial/35" />
            <p
              data-ticket-line
              className="font-micro text-lg tracking-[0.12em] text-imperial md:text-xl"
            >
              {business.phoneDisplay}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-cursor="GO"
              >
                Get Directions
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a href={business.telHref} className="btn-primary" data-cursor="GO">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
