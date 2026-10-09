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

export default function HeroPoster() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panel = root.querySelector("[data-poster]");
    const lines = root.querySelectorAll("[data-title-line]");
    const photos = root.querySelectorAll("[data-hero-photo]");
    const seal = root.querySelector("[data-seal]");
    const cta = root.querySelector("[data-hero-cta]");
    const meta = root.querySelectorAll("[data-hero-meta]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([panel, lines, photos, seal, cta, meta], {
          opacity: 1,
          clearProps: "transform,clipPath",
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        panel,
        { scaleY: 0.94, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.65, transformOrigin: "top center" }
      )
        .fromTo(
          photos,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          lines,
          { clipPath: "inset(0 0 100% 0)", y: 16 },
          { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.45"
        )
        .fromTo(
          seal,
          { scale: 0.6, rotate: -8, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 0.08, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          cta,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          meta,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 },
          "-=0.15"
        );

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (window.matchMedia("(min-width: 768px)").matches) {
            gsap.set(panel, { rotate: -1 + p * 1.5 });
          }
          photos.forEach((photo) => gsap.set(photo, { yPercent: -6 * p }));
          gsap.set(seal, { rotate: 8 * p });
          if (lines[0]) gsap.set(lines[0], { xPercent: -2 * p });
          if (lines[1]) gsap.set(lines[1], { xPercent: 1 * p });
          if (lines[2]) gsap.set(lines[2], { xPercent: -1 * p });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="section-red relative overflow-hidden"
      data-section-tone="red"
    >
      <ChinesePattern variant="lattice" tone="cream" opacity={0.035} scale={1.2} />

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-10 md:grid md:grid-cols-[minmax(0,1fr)_minmax(240px,0.72fr)] md:items-center md:gap-6 md:px-8 md:py-14 lg:gap-8 lg:py-16">
        {/* Unified poster — image lives inside the card on mobile */}
        <div
          data-poster
          className="relative z-10 w-full overflow-hidden bg-cream text-ink shadow-[0_20px_50px_rgba(0,0,0,0.28)] md:rotate-[-1deg]"
        >
          <ChinesePattern variant="border" tone="red" opacity={0.06} />

          {/* Mobile-only: image as top of the same card */}
          <div
            data-hero-photo
            className="relative aspect-[16/10] w-full overflow-hidden md:hidden"
          >
            <Image
              src="/images/top-cuisine-pot/shared-table.jpg"
              alt="Shared Asian dishes for the table"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream/40 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 px-5 py-5 sm:px-7 sm:py-6 md:px-9 md:py-8 lg:px-10 lg:py-9">
            <p className="font-micro text-[0.65rem] tracking-[0.28em] text-imperial uppercase sm:text-[0.68rem]">
              Notting Hill · Melbourne
            </p>

            <div
              data-seal
              className="pointer-events-none absolute top-6 right-4 hidden h-24 w-24 border-[3px] border-imperial p-2 opacity-[0.08] rotate-[-6deg] lg:block"
              aria-hidden="true"
            >
              <div className="flex h-full w-full flex-col items-center justify-center border border-imperial font-display text-center text-[0.65rem] leading-tight text-imperial">
                <span>TOP</span>
                <span>CUISINE</span>
                <span>POT</span>
              </div>
            </div>

            <h1 className="font-display mt-2.5 text-[clamp(2.4rem,11vw,5rem)] leading-[0.88] tracking-[-0.03em] text-ink md:mt-4">
              <span className="block overflow-hidden">
                <span data-title-line className="block">
                  TOP
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-title-line className="block text-cinnabar">
                  CUISINE
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-title-line className="block">
                  POT
                </span>
              </span>
            </h1>

            <p className="font-micro mt-2.5 text-[0.68rem] tracking-[0.2em] text-brown uppercase md:mt-4 md:text-[0.72rem] md:tracking-[0.22em]">
              {business.tagline}
            </p>

            <div
              data-hero-cta
              className="mt-4 flex flex-row flex-wrap items-center gap-x-5 gap-y-3 md:mt-6"
            >
              <a href="#menu" className="btn-primary" data-cursor="MENU">
                Explore the Menu
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a
                href="#location"
                className="btn-secondary w-fit"
                data-cursor="GO"
              >
                Find Us
              </a>
            </div>

            <div className="mt-4 flex flex-col gap-1.5 border-t border-soft-border pt-3.5 text-sm md:mt-6 md:flex-row md:justify-between md:gap-2 md:pt-4">
              <p data-hero-meta className="max-w-xs text-[0.9rem] leading-snug text-ink/80 md:text-sm">
                {business.address.streetShort}
                <span className="md:hidden">
                  , {business.address.suburb}
                </span>
                <span className="hidden md:inline">
                  {" "}
                  · {business.address.suburb} {business.address.state}{" "}
                  {business.address.postcode}
                </span>
              </p>
              <a
                data-hero-meta
                href={business.telHref}
                className="font-micro tracking-[0.08em] text-imperial"
              >
                {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Desktop-only: separate tall photo beside the poster */}
        <div
          data-hero-photo
          className="relative z-20 hidden aspect-[3/4] max-h-[520px] w-full overflow-hidden shadow-2xl md:block"
        >
          <Image
            src="/images/top-cuisine-pot/shared-table.jpg"
            alt="Shared Asian dishes for the table"
            fill
            priority
            sizes="36vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 ring-1 ring-cream/30" />
        </div>
      </div>
    </section>
  );
}
