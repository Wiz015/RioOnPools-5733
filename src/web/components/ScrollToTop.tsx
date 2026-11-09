import { useLayoutEffect, useRef } from "react";
import { useLocation } from "wouter";

/** Start every page at the top, including browser back/forward navigation. */
export function ScrollToTop() {
  const [location] = useLocation();
  const frame = useRef<number | null>(null);

  const cancelReset = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  };

  const reset = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Explicitly reset the document scroller as well as the viewport.
    const scroller = document.scrollingElement;
    if (scroller) {
      scroller.scrollTop = 0;
      scroller.scrollLeft = 0;
    }
  };

  const resetAfterRender = () => {
    cancelReset();
    frame.current = requestAnimationFrame(() => {
      reset();
      frame.current = requestAnimationFrame(() => {
        reset();
        frame.current = null;
      });
    });
  };

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    // Same-route links don't trigger a location change. Handle those too,
    // without interfering with downloads, external links or anchor links.
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute("download")) return;
      if (link.target && link.target !== "_self") return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || url.hash) return;
      if (url.pathname !== window.location.pathname || url.search !== window.location.search) return;
      resetAfterRender();
    };

    // A click, touch or scroll intention after navigation must win over our
    // scheduled reset; never keep forcing the visitor back to the top.
    const cancelOnInput = () => cancelReset();
    document.addEventListener("click", onClick);
    window.addEventListener("wheel", cancelOnInput, { passive: true });
    window.addEventListener("touchstart", cancelOnInput, { passive: true });
    window.addEventListener("keydown", cancelOnInput);
    return () => {
      cancelReset();
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", cancelOnInput);
      window.removeEventListener("touchstart", cancelOnInput);
      window.removeEventListener("keydown", cancelOnInput);
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    // Reset before paint, then after the new DOM has settled. A single early
    // reset can be overridden by layout/focus changes during navigation.
    reset();
    resetAfterRender();
    return cancelReset;
  }, [location]);

  return null;
}