"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { feedbackThemes } from "@/data/topCuisinePot";
import SectionLabel from "@/components/SectionLabel";
import ChinesePattern from "@/components/ChinesePattern";
import SwipeCarousel from "@/components/SwipeCarousel";
import useMediaQuery from "@/hooks/useMediaQuery";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PAGE_SIZE = 3;

function FeedbackCard({ item, index, accent = false }) {
  if (accent) {
    return (
      <article
        data-stamp
        className="flex h-full min-h-[120px] items-center justify-center border-[3px] border-imperial bg-imperial p-3 text-cream sm:min-h-[160px] sm:p-6 md:min-h-[180px]"
      >
        <p className="font-display text-center text-xl leading-none sm:text-3xl md:text-4xl">
          FOOD
          <br />
          FIRST.
        </p>
      </article>
    );
  }

  return (
    <article
      data-stamp
      className={`h-full min-h-[120px] border-[3px] border-imperial p-3 text-imperial sm:min-h-[160px] sm:p-5 md:min-h-[180px] md:p-6 ${
        index % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"
      }`}
    >
      <p className="font-display text-sm leading-snug sm:text-lg md:text-xl lg:text-2xl">
        {item.text}
      </p>
    </article>
  );
}

function FeedbackGrid({ cards }) {
  return (
    <div className="mt-10 grid grid-cols-3 gap-3 md:gap-4">
      {cards.map((card) =>
        card.accent ? (
          <FeedbackCard key={card.key} accent />
        ) : (
          <FeedbackCard
            key={card.key}
            item={card.item}
            index={card.index}
          />
        )
      )}
    </div>
  );
}

export default function FeedbackWall() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const isTabletUp = useMediaQuery("(min-width: 768px)");

  const cards = useMemo(
    () => [
      ...feedbackThemes.map((item, index) => ({
        key: item.id,
        item,
        index,
        accent: false,
      })),
      { key: "accent", accent: true },
    ],
    []
  );

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < cards.length; i += PAGE_SIZE) {
      chunks.push(cards.slice(i, i + PAGE_SIZE));
    }
    return chunks;
  }, [cards]);

  useEffect(() => {
    const root = rootRef.current;
    // Stamp reveal on tablet/desktop grid only — mobile pages stay visible
    if (!root || reduced || !isTabletUp) return;

    const ctx = gsap.context(() => {
      const stamps = root.querySelectorAll("[data-stamp]");
      if (!stamps.length) return;

      gsap.fromTo(
        stamps,
        { scale: 0.85, opacity: 0, rotation: (i) => (i % 2 === 0 ? -3 : 3) },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced, isTabletUp]);

  return (
    <section
      ref={rootRef}
      className="section-rice relative overflow-hidden py-12 md:py-16 lg:py-20"
      data-section-tone="cream"
    >
      <ChinesePattern variant="seal" tone="red" opacity={0.03} />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionLabel number="09" label="Customer feedback themes" />
        <h2 className="font-display mt-3 text-3xl md:text-4xl lg:text-5xl">
          What diners keep returning to
        </h2>
        <p className="mt-2 max-w-xl text-sm text-ink/65">
          Paraphrased themes from public diner feedback — not fabricated quotes.
        </p>

        {isTabletUp ? (
          <FeedbackGrid cards={cards} />
        ) : (
          <div className="mt-8">
            <SwipeCarousel
              ariaLabel="Customer feedback themes"
              mobileOnly={false}
              trackClassName="gap-0"
              slideClassName="w-full min-w-full snap-start"
            >
              {pages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className="grid w-full grid-cols-3 gap-2"
                >
                  {page.map((card) =>
                    card.accent ? (
                      <FeedbackCard key={card.key} accent />
                    ) : (
                      <FeedbackCard
                        key={card.key}
                        item={card.item}
                        index={card.index}
                      />
                    )
                  )}
                </div>
              ))}
            </SwipeCarousel>
          </div>
        )}
      </div>
    </section>
  );
}
