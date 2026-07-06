import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { useBookingModal } from "./provider";

const links = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const booking = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? "bg-mist border-b border-granite/15 shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20">
        <Link to="/" className="flex flex-col leading-none">
          <span
            className={`font-display font-black text-xl sm:text-2xl uppercase tracking-tight ${
              solid ? "text-granite-deep" : "text-mist"
            }`}
          >
            Rio On Pools
          </span>
          <span
            className={`font-mono text-[9px] uppercase tracking-widest ${
              solid ? "text-pine" : "text-mist/80"
            }`}
          >
            Mountain Pine Ridge, Belize
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                solid ? "text-granite-deep hover:text-pine" : "text-mist hover:text-sun"
              } ${location === l.href ? (solid ? "text-pine" : "text-sun") : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+5016390074"
            className={`flex items-center gap-1.5 font-mono text-xs ${
              solid ? "text-granite-deep" : "text-mist"
            }`}
          >
            <Phone size={13} /> +501 639-0074
          </a>
          <button
            onClick={() => booking.open()}
            className="bg-sun text-granite-deep font-mono text-xs uppercase tracking-widest px-5 py-2.5 hover:bg-sun/90 transition-colors"
          >
            Book Tour
          </button>
        </div>

        <button
          className={`lg:hidden ${solid ? "text-granite-deep" : "text-mist"}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-mist border-t border-granite/15 w-full">
          <div className="flex flex-col px-4 sm:px-6 py-4 gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="font-mono text-sm uppercase tracking-widest text-granite-deep py-1"
              >
                {l.label}
              </Link>
            ))}
            <a href="tel:+5016390074" className="flex items-center gap-2 font-mono text-sm text-granite-deep">
              <Phone size={14} /> +501 639-0074
            </a>
            <button
              onClick={() => booking.open()}
              className="bg-sun text-granite-deep font-mono text-xs uppercase tracking-widest px-5 py-3 w-full"
            >
              Book Tour
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
