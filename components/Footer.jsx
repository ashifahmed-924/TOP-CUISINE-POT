import { business } from "@/data/topCuisinePot";
import ChinesePattern from "@/components/ChinesePattern";
import BrandMark from "@/components/BrandMark";

const socialLinks = [
  {
    id: "facebook",
    label: "Facebook",
    href: business.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: business.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm5 2.8A4.2 4.2 0 1 1 7.8 12 4.2 4.2 0 0 1 12 7.8zm0 2A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 6.3a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
      </svg>
    ),
  },
  {
    id: "twitter",
    label: "Twitter",
    href: business.social.twitter,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M18.2 3H21l-6.6 7.5L22 21h-5.6l-4.4-5.7L7 21H4.2l7-8L2 3h5.7l4 5.2L18.2 3zm-1 16.2h1.6L7 4.7H5.3l11.9 14.5z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    href: business.social.youtube,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.7 4.6 12 4.6 12 4.6s-6.7 0-8.4.5A3 3 0 0 0 1.5 7.2 31.5 31.5 0 0 0 1 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.7.5 8.4.5 8.4.5s6.7 0 8.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 23 12a31.5 31.5 0 0 0-.5-4.8zM10 15.2V8.8L15.5 12 10 15.2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="section-red relative overflow-hidden" data-section-tone="red">
      <div className="h-px w-full bg-gold/70" aria-hidden="true" />
      <ChinesePattern variant="lattice" tone="cream" opacity={0.035} />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:gap-10 md:px-8 md:py-12">
        <div>
          <BrandMark className="text-3xl md:text-4xl" />
          <div className="mt-5 flex items-center gap-2.5">
            {socialLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center border border-cream/35 text-cream transition-colors hover:border-gold hover:text-gold"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-xl text-cream">Visit</p>
          <p className="mt-3 max-w-xs leading-relaxed text-cream/80">
            {business.address.street}
            <br />
            {business.address.suburb} {business.address.state}{" "}
            {business.address.postcode}
          </p>
        </div>

        <div>
          <a
            href={business.telHref}
            className="font-display text-2xl text-cream transition-colors hover:text-gold"
          >
            {business.phoneDisplay}
          </a>
          <nav className="font-micro mt-5 flex flex-wrap gap-5 text-[0.72rem] tracking-[0.18em] text-cream/75 uppercase">
            <a href="#menu" className="hover:text-cream">
              Menu
            </a>
            <a href="#location" className="hover:text-cream">
              Location
            </a>
            <a href="#hours" className="hover:text-cream">
              Hours
            </a>
          </nav>
        </div>
      </div>

      <div className="relative border-t border-cream/15 px-4 py-5 md:px-8">
        <p className="font-micro text-center text-[0.68rem] tracking-[0.16em] text-cream/55 uppercase">
          © 2026 {business.name}
        </p>
      </div>
    </footer>
  );
}
