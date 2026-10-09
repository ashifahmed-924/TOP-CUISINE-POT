"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Mobile/tablet horizontal swipe with snap + dot indicators.
 * Hidden on `lg`+ when `mobileOnly` is true (default).
 */
export default function SwipeCarousel({
  children,
  className = "",
  trackClassName = "",
  slideClassName = "",
  ariaLabel = "Carousel",
  mobileOnly = true,
  showDots = true,
  tone = "imperial",
}) {
  const dotActive =
    tone === "cream" ? "w-6 bg-cream" : "w-6 bg-imperial";
  const dotIdle =
    tone === "cream"
      ? "w-2 bg-cream/35 hover:bg-cream/55"
      : "w-2 bg-imperial/30 hover:bg-imperial/50";

  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  // Flatten nested arrays (e.g. `{items.map(...)}` + sibling) into one slide each
  const slides = Children.toArray(children).filter(Boolean);
  const count = slides.length;

  const syncIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return;
    const slideWidth = track.children[0].getBoundingClientRect().width;
    if (!slideWidth) return;
    const next = Math.round(track.scrollLeft / slideWidth);
    setIndex(Math.max(0, Math.min(count - 1, next)));
  }, [count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncIndex);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncIndex);
    syncIndex();

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncIndex);
    };
  }, [syncIndex]);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track?.children[i]) return;
    track.children[i].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    setIndex(i);
  };

  const wrapperClass = mobileOnly ? `lg:hidden ${className}` : className;

  return (
    <div className={wrapperClass}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className={`hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 [-webkit-overflow-scrolling:touch] ${trackClassName}`}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className={`shrink-0 snap-center [&>*]:h-full [&>*]:w-full ${
              slideClassName ||
              "w-[min(86vw,22rem)] sm:w-[min(70vw,24rem)]"
            }`}
          >
            {slide}
          </div>
        ))}
      </div>

      {showDots && count > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active ? dotActive : dotIdle
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
