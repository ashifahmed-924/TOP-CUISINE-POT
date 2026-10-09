"use client";

import { useEffect, useState } from "react";

/**
 * Returns whether `query` matches. Always starts as `false` on both
 * server and client to avoid hydration mismatches, then updates after mount.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}
