"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query without a `setState` inside an effect.
 *
 * The previous pattern (`useState(false)` + `useEffect(() => setIsMobile(...))`)
 * rendered one frame with the desktop value on every device, which is why
 * mobile cards briefly ran the desktop entrance animation and the tilt wrapper
 * mounted before being torn down. `useSyncExternalStore` gives React the
 * server value during hydration and the real value immediately after.
 */
export function useMediaQuery(query: string, serverSnapshot = false): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverSnapshot
  );
}

/** Phones and tablets: a coarse pointer, or anything below the `lg` breakpoint. */
export const COMPACT_VIEWPORT_QUERY = "(pointer: coarse), (max-width: 1023px)";

/** Phones only: a coarse pointer, or anything below the `md` breakpoint. */
export const MOBILE_VIEWPORT_QUERY = "(pointer: coarse), (max-width: 767px)";

export function useIsCompactViewport(): boolean {
  return useMediaQuery(COMPACT_VIEWPORT_QUERY);
}

export function useIsMobileViewport(): boolean {
  return useMediaQuery(MOBILE_VIEWPORT_QUERY);
}
