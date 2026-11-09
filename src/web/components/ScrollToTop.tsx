import { useLayoutEffect } from "react";
import { useLocation } from "wouter";

/** Start every page at the top, including browser back/forward navigation. */
export function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    // Run before paint and bypass smooth scrolling so the old position isn't shown.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}