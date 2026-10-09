"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RevealImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 60vw",
  priority = false,
  mode = "curtain",
}) {
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduced) return;

    const img = el.querySelector("[data-reveal-img]");
    const curtain = el.querySelector("[data-curtain]");

    const ctx = gsap.context(() => {
      if (mode === "red-wipe" && curtain) {
        gsap.fromTo(
          curtain,
          { scaleX: 1 },
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 78%" },
          }
        );
      } else if (mode === "clip-v") {
        gsap.fromTo(
          img,
          { clipPath: "inset(20% 0 20% 0)", scale: 1.08 },
          {
            clipPath: "inset(0% 0 0% 0)",
            scale: 1,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      } else if (mode === "circle") {
        gsap.fromTo(
          img,
          { clipPath: "circle(0% at 50% 50%)", scale: 1.1 },
          {
            clipPath: "circle(75% at 50% 50%)",
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      } else {
        gsap.fromTo(
          curtain,
          { scaleX: 1 },
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.05,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
        gsap.fromTo(
          img,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [reduced, mode]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <Image
        data-reveal-img
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imageClassName}`}
      />
      {(mode === "curtain" || mode === "red-wipe") && (
        <div
          data-curtain
          className={`pointer-events-none absolute inset-0 origin-left ${
            mode === "red-wipe" ? "bg-lacquer" : "bg-cream"
          }`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
