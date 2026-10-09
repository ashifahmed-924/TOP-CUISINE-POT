import { Noto_Serif_SC, Manrope, Space_Grotesk } from "next/font/google";
import { business } from "@/data/topCuisinePot";
import "./globals.css";

const display = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-loaded",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-loaded",
  display: "swap",
});

const micro = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-micro-loaded",
  display: "swap",
});

export const metadata = {
  title: business.seo.title,
  description: business.seo.description,
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    type: "website",
    locale: "en_AU",
  },
};

function jsonLd() {
  const dayMap = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  const to24 = (raw, isPmHint) => {
    const [h, m] = raw.split(":");
    let hour = Number(h);
    const mins = m || "00";
    if (isPmHint && hour < 12) hour += 12;
    return `${String(hour).padStart(2, "0")}:${mins}`;
  };

  const openingHoursSpecification = Object.entries(business.hours)
    .filter(([, value]) => value.toLowerCase() !== "closed")
    .map(([day]) => {
      const openMatch = business.hours[day].match(/(\d{1,2}:\d{2})\s*AM/i);
      const closeMatch = business.hours[day].match(/(\d{1,2}:\d{2})\s*PM/i);

      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[day],
        opens: openMatch ? to24(openMatch[1], false) : "11:00",
        closes: closeMatch ? to24(closeMatch[1], true) : "22:00",
      };
    });

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: business.name,
    servesCuisine: business.cuisine,
    telephone: business.phone,
    url: business.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.suburb,
      addressRegion: business.address.state,
      postalCode: business.address.postcode,
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -37.9067224,
      longitude: 145.1431918,
    },
    openingHoursSpecification,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body
        className={`${display.variable} ${body.variable} ${micro.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
