"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RevealText({
  as: Tag = "div",
  children,
  className = "",
  type = "lines",
  delay = 0,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      if (type === "words") {
        const words = el.querySelectorAll("[data-word]");
        gsap.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
            },
          }
        );
      } else if (type === "mask") {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            delay,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [reduced, type, delay]);

  if (type === "words" && typeof children === "string") {
    return (
      <Tag ref={ref} className={className}>
        {children.split(" ").map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden">
            <span data-word className="inline-block">
              {word}&nbsp;
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
