import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getMediaQueryList(): MediaQueryList | null {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return null;
  }
  return window.matchMedia(QUERY);
}

function subscribe(onChange: () => void): () => void {
  const mql = getMediaQueryList();
  if (!mql) return () => {};
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return getMediaQueryList()?.matches ?? false;
}

function getServerSnapshot(): boolean {
  // The server cannot know the preference; assume full motion and let the
  // client correct on hydration.
  return false;
}

/**
 * Reactive `prefers-reduced-motion: reduce`. Re-renders when the user flips
 * the OS setting mid-session.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * One-shot read for imperative code (GSAP setup inside effects) where a
 * subscription would be overkill.
 */
export function prefersReducedMotion(): boolean {
  return getSnapshot();
}
