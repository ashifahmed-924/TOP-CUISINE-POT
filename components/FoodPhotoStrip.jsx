"use client";

import { useMemo } from "react";
import Image from "next/image";
import { gallery } from "@/data/topCuisinePot";
import SectionLabel from "@/components/SectionLabel";
import CircularGallery from "@/components/CircularGallery";
import SwipeCarousel from "@/components/SwipeCarousel";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function FoodPhotoStrip() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const items = useMemo(
    () =>
      gallery.map((shot) => ({
        image: shot.src,
        text: shot.caption,
      })),
    []
  );

  return (
    <section
      className="section-charcoal relative overflow-hidden py-12 md:py-14 lg:py-16"
      data-section-tone="charcoal"
    >
      <div className="mx-auto mb-5 flex max-w-7xl items-end justify-between px-4 md:mb-6 md:px-8">
        <div>
          <SectionLabel number="06" label="Photo story" tone="cream" />
          <h2 className="font-display mt-2 text-3xl text-cream md:text-4xl">
            Heat, broth, share
          </h2>
        </div>
        {isDesktop && (
          <p className="font-micro max-w-[11rem] text-right text-[0.65rem] tracking-[0.18em] text-cream/50 uppercase">
            Drag or scroll to orbit the table
          </p>
        )}
      </div>

      {!isDesktop ? (
        <div className="px-4 md:px-8">
          <SwipeCarousel
            ariaLabel="Food photo story"
            mobileOnly={false}
            tone="cream"
            trackClassName="gap-3"
          >
            {gallery.map((shot) => (
              <figure key={shot.id} className="overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="86vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="font-micro mt-2 text-[0.68rem] tracking-[0.18em] text-cream/70 uppercase">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </SwipeCarousel>
        </div>
      ) : (
        <div className="relative h-[380px] w-full xl:h-[440px]">
          <CircularGallery
            items={items}
            bend={1}
            textColor="#f4e8d1"
            borderRadius={0.05}
            scrollEase={0.05}
            scrollSpeed={2}
            font='600 28px "Space Grotesk", system-ui, sans-serif'
          />
        </div>
      )}
    </section>
  );
}
