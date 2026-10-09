"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return undefined;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return undefined;

    const move = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const over = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        cursor.classList.add("is-active");
        label.textContent = target.getAttribute("data-cursor") || "";
      }
    };

    const out = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        cursor.classList.remove("is-active");
        label.textContent = "";
      }
    };

    document.documentElement.classList.add("cursor-none");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span ref={labelRef} />
    </div>
  );
}
