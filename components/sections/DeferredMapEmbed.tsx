"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Mounts the Google Maps iframe only once it is close to the viewport.
 *
 * `loading="lazy"` on the iframe is not enough here: the embed still opens
 * during the initial load and pulls ~470KB of third-party script, which is what
 * pushed FCP on /contact to 4.4s while every other route sat under 2.1s.
 *
 * The placeholder occupies the same box as the iframe (the parent fixes the
 * height and the iframe is 100%/100% inside it), so nothing moves when the
 * real embed swaps in, and the generous root margin means it has mounted long
 * before the map scrolls into view.
 */
export default function DeferredMapEmbed(
  props: React.IframeHTMLAttributes<HTMLIFrameElement>
) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const node = holderRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (shouldMount) {
    return <iframe {...props} />;
  }

  return <div ref={holderRef} aria-hidden="true" className={props.className} />;
}
