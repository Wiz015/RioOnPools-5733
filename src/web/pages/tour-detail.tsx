import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'wouter';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users, CheckCircle, AlertCircle, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { getTourBySlug } from '../lib/tours';
import { useBookingModal } from '../components/provider';
import { Layout } from '../components/Layout';
import { Seo } from '../components/Seo';

 
export default function TourDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const tour = getTourBySlug(slug ?? '');
 
  const booking = useBookingModal();
  const [heroSlide, setHeroSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bookingCardRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
 
  // JS-driven desktop sticky CTA (avoids native `position: sticky`, which silently
  // breaks if any ancestor — layout wrapper, global CSS — has `overflow` set to
  // anything other than `visible`). `position: fixed` only cares about ancestor
  // `transform`, not `overflow`, so this is robust regardless of upstream styles.
  const STICKY_TOP_OFFSET = 80;
  const columnRef = useRef<HTMLDivElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);
  const [ctaPosition, setCtaPosition] = useState<{
    mode: 'static' | 'fixed' | 'bottom';
    left?: number;
    width?: number;
  }>({ mode: 'static' });
 
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
 
  useEffect(() => {
    if (!tour) return;
    window.scrollTo(0, 0);
    setHeroSlide(0);
    setLightboxIdx(0);
    setLightboxOpen(false);

  }, [tour]);
 
  // Sticky CTA visibility
  // Desktop: watch booking card going out of view
  // Mobile: show after scrolling past 300px (card not rendered)
  useEffect(() => {
    if (!isMobile) {
      const observer = new IntersectionObserver(
        ([entry]) => setStickyVisible(!entry.isIntersecting),
        { threshold: 0.1 }
      );
      if (bookingCardRef.current) observer.observe(bookingCardRef.current);
      return () => observer.disconnect();
    } else {
      const handleScroll = () => setStickyVisible(window.scrollY > 100);
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, tour]);
 
  // Desktop CTA positioning — recompute on every scroll/resize while on desktop.
  // 'static'  -> column hasn't scrolled up to the offset yet, card sits in normal flow
  // 'fixed'   -> column top has passed the offset, card pins to the viewport
  // 'bottom'  -> column is running out of room, card sticks to the column's bottom
  //              edge instead of overshooting past the rest of the content
  useEffect(() => {
    if (isMobile) return;
 
    const recompute = () => {
      const column = columnRef.current;
      const card = ctaCardRef.current;
      if (!column || !card) return;
 
      const colRect = column.getBoundingClientRect();
      const cardHeight = card.offsetHeight;
 
      if (colRect.top > STICKY_TOP_OFFSET) {
        setCtaPosition({ mode: 'static' });
      } else if (colRect.bottom - cardHeight < STICKY_TOP_OFFSET) {
        setCtaPosition({ mode: 'bottom' });
      } else {
        setCtaPosition({ mode: 'fixed', left: colRect.left, width: colRect.width });
      }
    };
 
    recompute();
    window.addEventListener('scroll', recompute, { passive: true });
    window.addEventListener('resize', recompute);
    return () => {
      window.removeEventListener('scroll', recompute);
      window.removeEventListener('resize', recompute);
    };
  }, [isMobile, tour]);
 
  const gallery = tour ? [tour.image, ...(tour.gallery || [])].filter((v, i, a) => a.indexOf(v) === i) : [];
 
  // Auto-advance hero slider
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (gallery.length <= 1) return;
    autoRef.current = setInterval(() => {
      setHeroSlide(s => (s + 1) % gallery.length);
    }, 4500);
  }, [gallery.length]);
 
  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [startAuto]);
 
  const goSlide = (dir: 1 | -1) => {
    setHeroSlide(s => (s + dir + gallery.length) % gallery.length);
    startAuto();
  };
 
  // Lightbox keyboard nav
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setLightboxIdx(i => (i + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setLightboxIdx(i => (i - 1 + gallery.length) % gallery.length);
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, gallery.length]);
 
  if (!tour) {
    return (
      <Layout><div style={{ background: 'var(--paper)', minHeight: '100vh', paddingTop: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'Public Sans, sans-serif', color: '#2c4a3b', marginBottom: '16px' }}>Tour Not Found</h1>
        <Link to="/tours">
          <button style={{ background: '#d98f46', color: '#f4f1e8', border: 'none', padding: '13px 30px', borderRadius: '999px', cursor: 'pointer', fontFamily: 'Public Sans, sans-serif', fontWeight: 700 }}>View All Tours</button>
        </Link>
      </div></Layout>
    );
  }
 
 
  return (
    <Layout>
      <Seo title={`${tour.title} | Rio On Pools, Belize`} description={tour.shortDescription}
        jsonLd={{ "@context": "https://schema.org", "@type": "TouristTrip", name: tour.title,
          description: tour.shortDescription, image: tour.image,
          url: `https://rioonpools.com/tours/${tour.slug}`,
          offers: { "@type": "Offer", price: tour.price, priceCurrency: "USD" } }} />
    <div className="tour-detail" style={{ background: 'var(--paper)' }} itemScope itemType="https://schema.org/Product">
 
      {/* ════════════════════════════════════════════════════════════════
          HERO — full-width image slider with dot indicators
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: 'clamp(480px, 70vh, 720px)', overflow: 'hidden' }}>
        {/* Slides */}
        <AnimatePresence mode="sync">
          <motion.img
            key={heroSlide}
            src={gallery[heroSlide]}
            alt={`${tour.title} — slide ${heroSlide + 1}`}
            itemProp="image"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </AnimatePresence>
 
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,74,59,0.92) 0%, rgba(44,74,59,0.3) 50%, rgba(44,74,59,0.5) 100%)', pointerEvents: 'none' }} />
 
        {/* Prev / Next arrows — only if multiple images */}
        {gallery.length > 1 && (
          <>
            <button onClick={() => goSlide(-1)} style={{ position: 'absolute', left: 'clamp(12px, 2vw, 28px)', top: '50%', transform: 'translateY(-50%)', zIndex: 4, background: 'rgba(44,74,59,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(44,74,59,0.85)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(44,74,59,0.55)'; }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => goSlide(1)} style={{ position: 'absolute', right: 'clamp(12px, 2vw, 28px)', top: '50%', transform: 'translateY(-50%)', zIndex: 4, background: 'rgba(44,74,59,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(44,74,59,0.85)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(44,74,59,0.55)'; }}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
 
        {/* Hero content — bottom left */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(24px, 4vw, 48px)', zIndex: 3 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 itemProp="name" style={{ fontFamily: 'Big Shoulders Display, sans-serif', textTransform: 'uppercase', fontWeight: 600, fontSize: 'clamp(1.6rem, 3.8vw, 3rem)', color: 'white', lineHeight: '1.05', marginBottom: '16px', letterSpacing: '-0.01em' }}>
              {tour.title}
            </h1>
 
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', fontFamily: 'Public Sans, sans-serif' }}>
                <Clock size={14} /> {tour.duration}
              </div>
              {tour.groupSize && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', fontFamily: 'Public Sans, sans-serif' }}>
                  <Users size={14} /> {tour.groupSize}
                </div>
              )}
              <div style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'white' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontFamily: 'Public Sans, sans-serif', marginRight: '4px' }}>From</span>
                ${tour.price} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.45)', fontFamily: 'Public Sans, sans-serif' }}>USD/person</span>
              </div>
            </div>
          </div>
        </div>
 
        {/* Dot indicators */}
        {gallery.length > 1 && (
          <div style={{ position: 'absolute', bottom: '20px', right: 'clamp(20px, 4vw, 48px)', zIndex: 4, display: 'flex', flexWrap: 'wrap', maxWidth: '180px', gap: '6px', alignItems: 'center' }}>
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => { setHeroSlide(i); startAuto(); }}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === heroSlide ? '22px' : '7px',
                  height: '7px',
                  borderRadius: '100px',
                  background: i === heroSlide ? 'white' : 'rgba(255,255,255,0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
        )}
      </section>
 
      {/* ════════════════════════════════════════════════════════════════
          BODY — two-column layout
      ════════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(32px, 5vw, 60px) clamp(20px, 4vw, 40px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.35fr) minmax(260px, 420px)', gap: 'clamp(28px, 4vw, 52px)' }}>
 
          {/* ── LEFT COLUMN ── */}
          <div style={{ minWidth: 0 }}>
 
            {/* About this tour */}
            <section style={{ marginBottom: '36px' }}>
              <h2 style={{ fontFamily: 'Big Shoulders Display, sans-serif', textTransform: 'uppercase', fontWeight: 600, fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: '#2c4a3b', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(44,74,59,0.15)' }}>
                About This Tour
              </h2>
              <p itemProp="description" style={{ fontFamily: 'Public Sans, sans-serif', color: 'rgba(44,74,59,0.77)', lineHeight: '1.85', fontSize: '0.95rem' }}>
                {tour.description_detail}
              </p>
            </section>
 
            {/* Highlights */}
            {tour.highlights && (
              <section style={{ marginBottom: '36px' }}>
                <h2 style={{ fontFamily: 'Big Shoulders Display, sans-serif', textTransform: 'uppercase', fontWeight: 600, fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: '#2c4a3b', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(44,74,59,0.15)' }}>
                  Tour Highlights
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {tour.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'var(--paper-deep)', borderRadius: '10px', padding: '14px 16px' }}>
                      <CheckCircle size={15} style={{ color: '#d98f46', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontFamily: 'Public Sans, sans-serif', color: 'rgba(44,74,59,0.82)', fontSize: '0.875rem', lineHeight: '1.5' }}>{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
 
            {/* What's Included */}
            {tour.included && (
              <section style={{ marginBottom: '36px' }}>
                <h2 style={{ fontFamily: 'Big Shoulders Display, sans-serif', textTransform: 'uppercase', fontWeight: 600, fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: '#2c4a3b', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(44,74,59,0.15)' }}>
                  What's Included
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                  {tour.included.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'var(--paper-deep)', borderRadius: '10px', padding: '14px 16px' }}>
                      <CheckCircle size={15} style={{ color: '#22c55e', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontFamily: 'Public Sans, sans-serif', color: 'rgba(44,74,59,0.82)', fontSize: '0.875rem', lineHeight: '1.5' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
 
            {/* Requirements */}
            {tour.requirements && (
              <section style={{ marginBottom: '36px' }}>
                <h2 style={{ fontFamily: 'Big Shoulders Display, sans-serif', textTransform: 'uppercase', fontWeight: 600, fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: '#2c4a3b', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(44,74,59,0.15)' }}>
                  Requirements
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tour.requirements.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <AlertCircle size={15} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontFamily: 'Public Sans, sans-serif', color: 'rgba(44,74,59,0.77)', fontSize: '0.875rem', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
 
            {/* Image Gallery / Lightbox Trigger */}
            {gallery.length > 1 && (
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{ fontFamily: 'Big Shoulders Display, sans-serif', textTransform: 'uppercase', fontWeight: 600, fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: '#2c4a3b', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(44,74,59,0.15)' }}>
                  Photo Gallery
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {gallery.slice(0, 4).map((src, i) => {
                    const isLast = i === 3 && gallery.length > 4;
                    return (
                      <motion.button
                        key={i}
                        onClick={() => { setLightboxIdx(i); setLightboxOpen(true); }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: 'relative', padding: 0, border: 'none', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', aspectRatio: '4/3', background: 'var(--paper-deep)' }}
                        aria-label={`View photo ${i + 1}`}
                      >
                        <img src={src} alt={`${tour.title} photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: isLast ? 'brightness(0.35)' : 'none' }} />
                        {isLast ? (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#ffffff', lineHeight: 1 }}>+{gallery.length - 4}</span>
                            <span style={{ fontFamily: 'Public Sans, sans-serif', fontSize: '0.7rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>photos</span>
                          </div>
                        ) : (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,74,59,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(44,74,59,0.45)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(44,74,59,0)'; }}
                          >
                            <ZoomIn size={20} style={{ color: '#ffffff', opacity: 0.85 }} />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </section>
            )}
 

          </div>
 
          {/* ── RIGHT COLUMN — sticky booking card (desktop only) ── */}
          {!isMobile && <div ref={columnRef} style={{ position: 'relative' }}>
            <motion.div
              ref={(node: HTMLDivElement | null) => {
                ctaCardRef.current = node;
                bookingCardRef.current = node;
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={
                ctaPosition.mode === 'fixed'
                  ? { position: 'fixed', top: STICKY_TOP_OFFSET, left: ctaPosition.left, width: ctaPosition.width, zIndex: 30 }
                  : ctaPosition.mode === 'bottom'
                  ? { position: 'absolute', bottom: 0, left: 0, width: '100%' }
                  : { position: 'relative' }
              }
            >
 
              {/* Price card */}
              <div style={{ background: 'var(--paper-deep)', border: '1px solid rgba(44,74,59,0.22)', borderRadius: '18px', padding: '28px', marginBottom: '16px' }}>
                <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="price" content={String(tour.price)} />
                  <meta itemProp="priceCurrency" content="USD" />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 800, fontSize: '2.8rem', color: '#2c4a3b', lineHeight: 1 }}>${tour.price}</span>
                    <span style={{ fontFamily: 'Public Sans, sans-serif', color: 'rgba(44,74,59,0.52)', fontSize: '0.82rem' }}>USD / person</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', paddingTop: '14px', borderTop: '1px solid rgba(44,74,59,0.19)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(44,74,59,0.62)', fontSize: '0.82rem', fontFamily: 'Public Sans, sans-serif' }}>
                    <Clock size={13} /> {tour.duration}
                  </div>
                  {tour.groupSize && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(44,74,59,0.62)', fontSize: '0.82rem', fontFamily: 'Public Sans, sans-serif' }}>
                      <Users size={13} /> {tour.groupSize}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => booking.open(tour.title)}
                  style={{
                    width: '100%', padding: '15px',
                    background: '#d98f46', color: '#2c4a3b',
                    border: 'none',
                    borderRadius: '10px',
                    fontFamily: 'Public Sans, sans-serif', fontSize: '0.9rem', fontWeight: 800,
                    letterSpacing: '0.09em', textTransform: 'uppercase',
                    cursor: 'pointer', marginBottom: '12px',
                    transition: 'background 0.2s, transform 0.15s',
                    boxShadow: '0 8px 28px rgba(224,138,46,0.25)',
                  }}
                  onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#F2A13D'; b.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#d98f46'; b.style.transform = 'scale(1)'; }}
                  aria-label={`Book ${tour.title}`}
                >
                  Book This Tour
                </button>
                {/* <p style={{ textAlign: 'center', color: 'rgba(44,74,59,0.42)', fontSize: '0.72rem', fontFamily: 'Public Sans, sans-serif', margin: 0 }}>
                  No payment now — confirm first, pay later
                </p> */}
              </div>
 
              {/* Contact quick links */}
              <div style={{ background: 'var(--paper-deep)', border: '1px solid rgba(44,74,59,0.19)', borderRadius: '14px', padding: '18px 20px' }}>
                <p style={{ fontFamily: 'Public Sans, sans-serif', color: 'rgba(44,74,59,0.52)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Questions?</p>
                <a href="tel:+5016390074" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(44,74,59,0.82)', textDecoration: 'none', fontFamily: 'Public Sans, sans-serif', fontSize: '0.875rem', marginBottom: '10px', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#d98f46'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(44,74,59,0.82)'; }}
                >
                  <Clock size={13} style={{ opacity: 0.5 }} /> +501 639-0074
                </a>
                <a href="https://wa.me/5016390074" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(44,74,59,0.82)', textDecoration: 'none', fontFamily: 'Public Sans, sans-serif', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#d98f46'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(44,74,59,0.82)'; }}
                >
                  <Users size={13} style={{ opacity: 0.5 }} /> WhatsApp us
                </a>
              </div>
            </motion.div>
          </div>}
        </div>
      </div>
 
      {/* ════════════════════════════════════════════════════════════════
          BOTTOM CTA — light section
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--paper-deep)', padding: 'clamp(56px, 8vw, 88px) clamp(20px, 5vw, 60px)', marginTop: '20px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Big Shoulders Display, sans-serif', textTransform: 'uppercase', fontWeight: 600, fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#2c4a3b', marginBottom: '14px' }}>
            Ready to Go?
          </h2>
          <p style={{ fontFamily: 'Public Sans, sans-serif', color: 'rgba(44,74,59,0.65)', lineHeight: '1.75', marginBottom: '32px', fontSize: '0.95rem' }}>
            Call{' '}
            <a href="tel:+5016390074" style={{ color: '#2c4a3b', fontWeight: 700, textDecoration: 'none', borderBottom: '1.5px solid rgba(44,74,59,0.25)' }}>+501 639-0074</a>{' '}
            or send a booking request. We'll confirm availability and pickup details.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => booking.open(tour.title)}
              style={{
                background: '#2c4a3b', color: 'white', border: 'none',
                borderRadius: '10px',
                padding: '15px 36px',
                fontFamily: 'Public Sans, sans-serif', fontSize: '0.85rem',
                fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase',
                cursor: 'pointer',
                paddingRight: '44px',
                transition: 'background 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#d98f46'; b.style.color = '#2c4a3b'; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#2c4a3b'; b.style.color = 'white'; }}
            >
              Book {tour.title}
            </button>
            <Link to="/tours">
              <button
                style={{
                  background: 'transparent', color: 'rgba(44,74,59,0.7)',
                  border: '1.5px solid rgba(44,74,59,0.2)',
                  borderRadius: '10px',
                  padding: '14px 30px',
                  fontFamily: 'Public Sans, sans-serif', fontSize: '0.85rem',
                  fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = '#2c4a3b'; b.style.color = '#2c4a3b'; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(44,74,59,0.2)'; b.style.color = 'rgba(44,74,59,0.7)'; }}
              >
                View All Tours
              </button>
            </Link>
          </div>
        </div>
      </section>
 
      {/* ════════════════════════════════════════════════════════════════
          STICKY MOBILE CTA — fixed bottom bar (mobile only)
      ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stickyVisible && isMobile && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', bottom: 0, left: 0, right: 0,
              background: '#2c4a3b',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              padding: '14px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
              zIndex: 50,
              backdropFilter: 'blur(20px)',
            }}
          >
            <div>
              <div style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'white', lineHeight: 1 }}>
                ${tour.price} <span style={{ fontFamily: 'Public Sans, sans-serif', fontSize: '0.68rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>USD/person</span>
              </div>
              <div style={{ fontFamily: 'Public Sans, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>{tour.duration}</div>
            </div>
            <button
              onClick={() => booking.open(tour.title)}
              style={{
                background: '#d98f46', color: '#2c4a3b', border: 'none',
                borderRadius: '8px',
                padding: '9px 22px',
                fontFamily: 'Public Sans, sans-serif', fontSize: '0.78rem',
                fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: '0 4px 20px rgba(224,138,46,0.3)',
              }}
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* ════════════════════════════════════════════════════════════════
          LIGHTBOX
      ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Close */}
            <button aria-label="Close photo viewer" onClick={() => setLightboxOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
              <X size={20} />
            </button>
 
            {/* Prev */}
            {gallery.length > 1 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + gallery.length) % gallery.length); }} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
                <ChevronLeft size={24} />
              </button>
            )}
 
            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIdx}
                src={gallery[lightboxIdx]}
                alt={`${tour.title} — photo ${lightboxIdx + 1}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: 'min(90vw, 1100px)', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px' }}
              />
            </AnimatePresence>
 
            {/* Next */}
            {gallery.length > 1 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % gallery.length); }} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
                <ChevronRight size={24} />
              </button>
            )}
 
            {/* Counter */}
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Public Sans, sans-serif', color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
              {lightboxIdx + 1} / {gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
 
      
    </div>
    </Layout>
  );
}