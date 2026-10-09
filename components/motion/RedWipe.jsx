"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RedWipe({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const wipe = el.querySelector("[data-wipe]");
    const content = el.querySelector("[data-wipe-content]");

    const ctx = gsap.context(() => {
      gsap.set(content, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      tl.to(wipe, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.9,
        ease: "power3.inOut",
      }).to(
        content,
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.25"
      );
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div data-wipe-content>{children}</div>
      <div
        data-wipe
        className="pointer-events-none absolute inset-0 origin-right bg-lacquer"
        aria-hidden="true"
      />
    </div>
  );
}
