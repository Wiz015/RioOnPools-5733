import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-granite-deep text-mist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <span className="font-display font-black text-2xl uppercase">Rio On Pools</span>
          <p className="font-mono text-[10px] uppercase tracking-widest text-pine-light mt-2">
            Cayo District, Belize
          </p>
          <p className="font-body text-sm text-mist/70 mt-4 leading-relaxed">
            Licensed guided tours to Rio On Pools, Mountain Pine Ridge, and Caracol Maya ruins.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-sun mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 font-body text-sm text-mist/80">
            <Link to="/tours">Tours</Link>
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-sun mb-4">Legal</h4>
          <div className="flex flex-col gap-2 font-body text-sm text-mist/80">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-sun mb-4">Contact</h4>
          <div className="flex flex-col gap-3 font-body text-sm text-mist/80">
            <a href="tel:+5016390074" className="flex items-center gap-2">
              <Phone size={14} className="text-pine-light" /> +501 639-0074
            </a>
            <a href="mailto:info@rioonpools.com" className="flex items-center gap-2">
              <Mail size={14} className="text-pine-light" /> info@rioonpools.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-pine-light" /> Mountain Pine Ridge, Cayo, Belize
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-mist/10 px-4 sm:px-6 py-5 text-center font-mono text-[10px] uppercase tracking-widest text-mist/50">
        © {new Date().getFullYear()} Rio On Pools. All rights reserved.
      </div>
    </footer>
  );
}
