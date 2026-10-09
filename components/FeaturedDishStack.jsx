"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  formatPrice,
  signatureStack,
} from "@/data/topCuisinePot";
import SectionLabel from "@/components/SectionLabel";
import ChinesePattern from "@/components/ChinesePattern";
import SwipeCarousel from "@/components/SwipeCarousel";
import useMediaQuery from "@/hooks/useMediaQuery";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function priceLabel(items) {
  if (!items?.length) return null;
  if (items.length === 1) return formatPrice(items[0].price);
  return items.map((item) => `${item.name.split(" ")[0]} ${formatPrice(item.price)}`).join(" · ");
}

function SignatureCard({ panel }) {
  return (
    <article className="h-full overflow-hidden border border-soft-border bg-cream">
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={panel.image}
          alt={panel.title}
          fill
          sizes="(max-width: 1024px) 86vw, 400px"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <p className="font-micro text-[0.62rem] tracking-[0.2em] text-imperial uppercase">
          {panel.eyebrow}
        </p>
        <h3 className="font-display mt-2 text-2xl leading-tight">{panel.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{panel.copy}</p>
        {panel.items.length > 1 ? (
          <ul className="mt-4 space-y-2">
            {panel.items.map((item) => (
              <li
                key={item.id}
                className="font-micro flex justify-between gap-3 border-b border-soft-border py-1.5 text-xs tracking-[0.06em] text-ink/80"
              >
                <span className="leading-snug">{item.name}</span>
                <span className="shrink-0 text-imperial">{formatPrice(item.price)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-micro mt-4 text-sm tracking-[0.08em] text-imperial">
            {priceLabel(panel.items)}
          </p>
        )}
      </div>
    </article>
  );
}

export default function FeaturedDishStack() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || !isDesktop) return;

    const panels = root.querySelectorAll("[data-stack-panel]");

    const ctx = gsap.context(() => {
      panels.forEach((panel, index) => {
        const photo = panel.querySelector("[data-stack-photo]");
        const wipe = panel.querySelector("[data-stack-wipe]");
        const menuWipe = panel.querySelector("[data-menu-wipe]");
        const menuRows = panel.querySelectorAll("[data-menu-row]");
        const text = panel.querySelector("[data-stack-text]");
        const price = panel.querySelectorAll("[data-stack-price]");
        const mask = panel.querySelector("[data-stack-mask]");

        // Panel 1 (Charcoal): image clip reveal
        if (index === 0 && photo) {
          gsap.fromTo(
            photo,
            { clipPath: "inset(18% 0 18% 0)", scale: 1.08 },
            {
              clipPath: "inset(0% 0 0% 0)",
              scale: 1,
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 70%" },
            }
          );
        }

        // Panel 2 (Volcano): solid wipe off image + menu items wipe in
        if (index === 1) {
          if (wipe) {
            gsap.fromTo(
              wipe,
              { scaleX: 1 },
              {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1,
                ease: "power3.inOut",
                scrollTrigger: { trigger: panel, start: "top 72%" },
              }
            );
          }

          if (menuWipe) {
            gsap.fromTo(
              menuWipe,
              { scaleX: 1 },
              {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1,
                ease: "power3.inOut",
                scrollTrigger: { trigger: panel, start: "top 72%" },
              }
            );
          }

          if (menuRows.length) {
            gsap.fromTo(
              menuRows,
              { y: 18, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: panel, start: "top 68%" },
              }
            );
          }
        }

        // Panel 3 (overlay): text + mask
        if (index === 2 && mask && text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 70%" },
            }
          );
          gsap.fromTo(
            mask,
            { opacity: 0.25, scale: 1.08 },
            {
              opacity: 0.08,
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: { trigger: panel, start: "top 70%" },
            }
          );
        }

        if (price.length && index !== 1) {
          gsap.fromTo(
            price,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 68%" },
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, isDesktop]);

  return (
    <section
      ref={rootRef}
      className="section-rice relative"
      data-section-tone="cream"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-7xl px-4 pt-12 md:px-8 md:pt-16">
        <SectionLabel number="02" label="Signature dishes" />
        <h2
          id="featured-heading"
          className="font-display mt-3 text-3xl md:text-4xl lg:text-5xl"
        >
          From the centre of the table
        </h2>
      </div>

      {!isDesktop ? (
        <div className="mt-8 px-4 pb-10 md:px-8">
          <SwipeCarousel
            ariaLabel="Signature dishes"
            mobileOnly={false}
            trackClassName="gap-4"
          >
            {signatureStack.map((panel) => (
              <SignatureCard key={panel.id} panel={panel} />
            ))}
          </SwipeCarousel>
        </div>
      ) : (
        <div className="mt-6">
          {signatureStack.map((panel) => {
            const isOverlay = panel.layout === "overlay";
            const imageLeft = panel.layout === "image-left";
            const isVolcano = panel.id === "stack-volcano";

            return (
              <article
                key={panel.id}
                data-stack-panel
                className={`relative ${
                  isOverlay
                    ? "flex min-h-[420px] items-end xl:min-h-[480px]"
                    : "grid lg:grid-cols-2"
                }`}
              >
                {isOverlay ? (
                  <>
                    <div className="absolute inset-0">
                      <Image
                        src={panel.image}
                        alt={panel.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-ink/45" />
                      <div data-stack-mask className="absolute inset-0">
                        <ChinesePattern variant="seal" tone="cream" opacity={0.12} />
                      </div>
                    </div>
                    <div
                      data-stack-text
                      className="relative z-10 m-8 max-w-lg bg-cream p-8 text-ink xl:m-10 xl:p-10"
                    >
                      <p className="font-micro text-[0.68rem] tracking-[0.22em] text-imperial uppercase">
                        {panel.eyebrow}
                      </p>
                      <h3 className="font-display mt-3 text-4xl xl:text-5xl">
                        {panel.title}
                      </h3>
                      <p className="mt-3 text-ink/80">{panel.copy}</p>
                      <p
                        data-stack-price
                        className="font-micro mt-5 text-xl tracking-[0.08em] text-imperial"
                      >
                        {priceLabel(panel.items)}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`relative aspect-[4/3] xl:aspect-auto xl:min-h-[480px] ${
                        imageLeft ? "order-1" : "order-1 lg:order-2"
                      }`}
                    >
                      <div data-stack-photo className="absolute inset-0">
                        <Image
                          src={panel.image}
                          alt={panel.title}
                          fill
                          sizes="50vw"
                          className="object-cover"
                        />
                      </div>
                      {isVolcano && (
                        <div
                          data-stack-wipe
                          className="absolute inset-0 origin-left bg-lacquer"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div
                      className={`relative flex flex-col justify-center overflow-hidden px-10 py-10 xl:px-14 xl:py-12 ${
                        imageLeft
                          ? "order-2 bg-cream"
                          : "order-2 bg-lacquer text-cream lg:order-1"
                      }`}
                    >
                      {isVolcano && (
                        <div
                          data-menu-wipe
                          className="absolute inset-0 z-20 origin-left bg-lacquer"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative z-10">
                        <p
                          className={`font-micro text-[0.68rem] tracking-[0.22em] uppercase ${
                            imageLeft ? "text-imperial" : "text-cream/70"
                          }`}
                        >
                          {panel.eyebrow}
                        </p>
                        <h3 className="font-display mt-3 text-4xl leading-tight xl:text-5xl">
                          {panel.title}
                        </h3>
                        <p
                          className={`mt-4 max-w-md text-base leading-relaxed ${
                            imageLeft ? "text-ink/80" : "text-cream/85"
                          }`}
                        >
                          {panel.copy}
                        </p>
                        {panel.items.length > 1 ? (
                          <ul className="mt-5 space-y-2">
                            {panel.items.map((item) => (
                              <li
                                key={item.id}
                                data-menu-row={isVolcano ? "" : undefined}
                                className="font-micro flex justify-between gap-4 border-b border-current/20 py-2 text-sm tracking-[0.06em]"
                              >
                                <span>{item.name}</span>
                                <span data-stack-price>{formatPrice(item.price)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p
                            data-stack-price
                            className={`font-micro mt-6 text-2xl tracking-[0.08em] ${
                              imageLeft ? "text-imperial" : "text-gold"
                            }`}
                          >
                            {priceLabel(panel.items)}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
