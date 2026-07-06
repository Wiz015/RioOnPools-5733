import { useParams, Link } from "wouter";
import { Check, Clock, Users, MapPin } from "lucide-react";
import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { GaugeTag } from "../components/GaugeTag";
import { useBookingModal } from "../components/provider";
import { getTourBySlug, tours } from "../lib/tours";

export default function TourDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const tour = getTourBySlug(slug ?? "");
  const booking = useBookingModal();

  if (!tour) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-32 text-center">
          <h1 className="font-display font-black uppercase text-4xl">Tour not found</h1>
          <Link to="/tours" className="font-mono text-xs uppercase tracking-widest text-pine mt-4 inline-block">
            Back to Tours
          </Link>
        </div>
      </Layout>
    );
  }

  const otherTour = tours.find((t) => t.slug !== tour.slug);

  return (
    <Layout>
      <Seo
        title={`${tour.name} | Rio On Pools`}
        description={tour.summary}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: tour.name,
          description: tour.summary,
          offers: {
            "@type": "Offer",
            price: tour.price.replace("$", ""),
            priceCurrency: "USD",
          },
        }}
      />

      <section className="relative h-[52vh] min-h-[380px] flex items-end">
        <img src={tour.image} alt={tour.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-granite-deep via-granite-deep/50 to-granite-deep/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full text-mist">
          <Reveal>
            <GaugeTag items={tour.gauge.map((g) => `${g.label} ${g.value}`)} className="text-sun" />
            <h1 className="font-display font-black uppercase text-4xl sm:text-6xl mt-4 leading-tight">
              {tour.name}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <Reveal>
            <p className="font-body text-lg text-granite leading-relaxed">{tour.summary}</p>
          </Reveal>
          {tour.description.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="font-body text-granite leading-relaxed">{p}</p>
            </Reveal>
          ))}

          <Reveal>
            <h3 className="font-display font-black uppercase text-2xl mt-10">Stops</h3>
            <div className="space-y-3 mt-4">
              {tour.stops.map((s) => (
                <div key={s.name} className="flex items-start gap-3 border border-granite/15 p-4">
                  <MapPin className="text-pine mt-0.5 shrink-0" size={16} />
                  <div>
                    <p className="font-body font-semibold text-sm">{s.name}</p>
                    <p className="font-body text-xs text-granite/70 mt-0.5">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-8 mt-10">
            <Reveal>
              <h3 className="font-display font-black uppercase text-xl">Included</h3>
              <ul className="mt-3 space-y-2">
                {tour.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 font-body text-sm text-granite">
                    <Check className="text-pine mt-0.5 shrink-0" size={15} /> {inc}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-display font-black uppercase text-xl">What to Bring</h3>
              <ul className="mt-3 space-y-2">
                {tour.bring.map((b) => (
                  <li key={b} className="flex items-start gap-2 font-body text-sm text-granite">
                    <Check className="text-sun mt-0.5 shrink-0" size={15} /> {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
              {tour.gallery.map((src, i) => (
                <img key={i} src={src} alt={`${tour.name} photo ${i + 1}`} className="w-full h-28 sm:h-36 object-cover" />
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-1">
          <Reveal>
            <div className="border border-granite/15 p-6 sm:p-8 sticky top-24">
              <span className="gauge-tag text-pine text-[11px]">PRICE</span>
              <p className="font-display font-black text-4xl mt-3">{tour.price}</p>
              <p className="font-mono text-xs text-granite/60 uppercase tracking-widest">{tour.priceNote}</p>

              <div className="flex items-center gap-2 mt-5 font-mono text-xs uppercase tracking-widest text-pine">
                <Clock size={14} /> {tour.durationHours}
              </div>
              <div className="flex items-center gap-2 mt-2 font-mono text-xs uppercase tracking-widest text-pine">
                <Users size={14} /> {tour.groupNote}
              </div>

              <button
                onClick={() => booking.open(tour.name)}
                className="w-full bg-sun text-granite-deep font-mono text-xs uppercase tracking-widest py-4 mt-6 hover:bg-sun/90 transition-colors"
              >
                Book This Tour
              </button>
              <a
                href="tel:+5016390074"
                className="w-full block text-center border border-granite/30 font-mono text-xs uppercase tracking-widest py-4 mt-3 hover:border-pine transition-colors"
              >
                Call +501 639-0074
              </a>

              {otherTour && (
                <div className="mt-8 pt-6 border-t border-granite/15">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-granite/60">Also see</p>
                  <Link to={`/tours/${otherTour.slug}`} className="font-body text-sm font-semibold text-pine mt-1 block hover:underline">
                    {otherTour.name}
                  </Link>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
