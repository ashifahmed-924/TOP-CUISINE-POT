"use client";

import { useEffect, useState } from "react";
import { business } from "@/data/topCuisinePot";
import MobileMenu from "@/components/MobileMenu";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#charcoal-fish", label: "Charcoal Fish" },
  { href: "#claypot", label: "Claypot" },
  { href: "#location", label: "Location" },
  { href: "#hours", label: "Hours" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-soft-border bg-rice/92 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16 md:px-8">
          <a
            href="#top"
            className={`font-display text-lg leading-none tracking-tight md:text-xl ${
              scrolled ? "text-imperial" : "text-cream"
            }`}
          >
            Top Cuisine Pot
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-micro text-[0.7rem] tracking-[0.16em] uppercase transition-colors ${
                  scrolled
                    ? "text-ink/80 hover:text-imperial"
                    : "text-cream/85 hover:text-cream"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={business.telHref}
              className={`btn-primary ${scrolled ? "" : "btn-on-red"}`}
              data-cursor="GO"
            >
              Call
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </nav>

          <button
            type="button"
            className={`font-micro min-h-11 min-w-11 tracking-[0.14em] uppercase lg:hidden ${
              scrolled ? "text-imperial" : "text-cream"
            }`}
            aria-expanded={open}
            aria-controls={open ? "mobile-menu" : undefined}
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}
