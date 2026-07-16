import { Link } from "wouter";
import { Mountain, Waves, Trees, ShieldCheck, ArrowRight } from "lucide-react";
import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { GaugeTag, StatBadge } from "../components/GaugeTag";
import { TourCard } from "../components/TourCard";
import { useBookingModal } from "../components/provider";
import { getHomeTours } from "../lib/tours";

const tickerFacts = [
  "GRANITE BEDROCK / 300M+ YEARS OLD",
  "43,333 HECTARES RESERVE",
  "EST. 1944",
  "300+ BIRD SPECIES",
  "CAYO DISTRICT, BELIZE",
];

export default function Index() {
  const booking = useBookingModal();
  const homeTours = getHomeTours();

  return (
    <Layout>
      <Seo
        title="Rio On Pools | Granite Pools & Waterfalls Tours, Mountain Pine Ridge, Belize"
        description="Guided tours to Rio On Pools, Big Rock Falls, Rio Frio Cave, and Caracol Maya ruins in Belize's Mountain Pine Ridge Forest Reserve. Book your Cayo District adventure today."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Rio On Pools",
          telephone: "+501-639-0074",
          email: "info@rioonpools.com",
          areaServed: "Cayo District, Belize",
          url: "https://rioonpools.com",
        }}
      />

      {/* Hero */}
      <section className="relative h-[100dvh] min-h-[560px] flex items-end">
        <img
          src="/images/rio-on-pools-hero.jpg"
          alt="Granite pools carved by the Rio On river in Mountain Pine Ridge, Belize"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite-deep via-granite-deep/40 to-granite-deep/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 w-full text-mist">
          <Reveal delay={0.1}>
            <h1 className="font-display font-black uppercase text-5xl sm:text-7xl lg:text-8xl leading-[0.95] mt-4">
              Granite Pools.<br />Pine Ridge Wild.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body text-base sm:text-lg text-mist/80 mt-5 max-w-xl">
              Guided tours through the natural granite pools of Rio On Pools, deep inside Belize's
              Mountain Pine Ridge Forest Reserve, with a full day combo to Caracol's ancient Maya ruins.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => booking.open()}
                className="bg-sun text-granite-deep font-mono text-xs uppercase tracking-widest px-7 py-4 hover:bg-sun/90 transition-colors"
              >
                Book Tour
              </button>
              <Link
                to="/tours"
                className="border border-mist/40 text-mist font-mono text-xs uppercase tracking-widest px-7 py-4 hover:border-mist transition-colors"
              >
                View Tours
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-granite-deep text-mist py-3 overflow-hidden border-y border-mist/10">
        <div className="flex whitespace-nowrap marquee-track">
          {[...tickerFacts, ...tickerFacts, ...tickerFacts].map((fact, i) => (
            <span key={i} className="font-mono text-xs uppercase tracking-widest px-8">
              {fact}
            </span>
          ))}
        </div>
      </div>

      {/* Why Rio On Pools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative">
            <img
              src="/images/rio-on-pools-2.jpg"
              alt="Terraced granite pools at Rio On Pools, Belize"
              className="w-full h-[420px] object-cover"
            />
            <GaugeTag
              items={["GRANITE", "300M+ YRS"]}
              className="absolute -bottom-4 left-4 bg-mist text-pine"
            />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <span className="gauge-tag text-pine">WHY RIO ON POOLS</span>
          <h2 className="font-display font-black uppercase text-4xl sm:text-5xl mt-4 leading-tight">
            Rock most of Belize doesn't have
          </h2>
          <p className="font-body text-granite mt-5 leading-relaxed">
            Most of Belize sits on limestone. Rio On Pools is different. Here the river cuts across
            exposed granite, part of the ancient Maya Mountains batholith, rock hundreds of millions
            of years old and among the oldest exposed stone in Central America.
          </p>
          <p className="font-body text-granite mt-4 leading-relaxed">
            Over time the current carved a series of interconnected pools, ledges, and small cascades
            directly into the bedrock, forming natural terraces you can swim and climb between, all
            inside a rare pine forest ecosystem unlike the tropical jungle covering most of the country.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-8 border-t border-granite/15 pt-6">
            <StatBadge value="0.5 MI" label="Pool Loop" />
            <StatBadge value="26 FT" label="Elev. Gain" />
            <StatBadge value="30-45" label="Min. Drive" />
          </div>
        </Reveal>
      </section>

      {/* Tour cards */}
      <section className="bg-stone-light py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <span className="gauge-tag text-pine">TOURS — {homeTours.length}</span>
            <h2 className="font-display font-black uppercase text-4xl sm:text-5xl mt-4">
              Choose Your Tour
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {homeTours.map((tour, i) => (
              <Reveal key={tour.slug} delay={i * 0.1}>
                <TourCard tour={tour} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="flex justify-center mt-12">
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 rounded-full bg-sun text-granite-deep font-mono text-xs uppercase tracking-widest px-7 py-4 hover:bg-sun/90 transition-colors"
            >
              View All Tours <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Feature splits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 space-y-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="gauge-tag text-pine">VIEWPOINT — PINE RIDGE</span>
            <h3 className="font-display font-black uppercase text-3xl sm:text-4xl mt-4">
              A Forest That Doesn't Feel Like Belize
            </h3>
            <p className="font-body text-granite mt-4 leading-relaxed">
              Mountain Pine Ridge Forest Reserve has covered roughly 43,333 hectares since 1944, one
              of the country's oldest protected areas. At elevation the air cools and dries, open
              meadows replace tangled jungle, and long needle pine stands take over, a landscape found
              almost nowhere else in Belize.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <img src="/images/pine-ridge-1.jpg" alt="Pine forest viewpoint, Mountain Pine Ridge Reserve" className="w-full h-[340px] object-cover" />
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="lg:order-2">
            <span className="gauge-tag text-sun">SAFETY — GRANITE TERRACE</span>
            <h3 className="font-display font-black uppercase text-3xl sm:text-4xl mt-4">
              Calm Water, Real Rock, Real Rules
            </h3>
            <p className="font-body text-granite mt-4 leading-relaxed">
              The pools look gentle but currents, slick granite, and pockets of deep water are real.
              Our guides point out safe entry points, supply life vests for weaker swimmers, and ask
              that nobody dives from the rocks. We check conditions before entering, since water
              levels can rise fast after rain upstream.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="lg:order-1">
            <img src="/images/rio-on-pools-3.jpg" alt="Granite terrace pools at Rio On Pools" className="w-full h-[340px] object-cover" />
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="gauge-tag text-pine">WILDLIFE — 300+ SPECIES</span>
            <h3 className="font-display font-black uppercase text-3xl sm:text-4xl mt-4">
              Home to the Orange Breasted Falcon
            </h3>
            <p className="font-body text-granite mt-4 leading-relaxed">
              Mountain Pine Ridge shelters over 300 bird species, including the rare orange breasted
              falcon, along with ocelots, deer, and other wildlife adapted to the pine ecosystem
              rather than the broadleaf jungle found elsewhere in Belize.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <img src="/images/big-rock-falls-1.jpg" alt="Big Rock Falls, Mountain Pine Ridge Reserve" className="w-full h-[340px] object-cover" />
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-granite-deep py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <span className="gauge-tag text-sun">GALLERY</span>
            <h2 className="font-display font-black uppercase text-4xl sm:text-5xl mt-4 text-mist">
              The Reserve in Frame
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 auto-rows-[160px] sm:auto-rows-[200px]">
            {[
              { src: "/images/rio-on-pools-4.jpg", tag: ["POOL 02", "DROP 4 FT"], span: "sm:col-span-2 sm:row-span-2" },
              { src: "/images/rio-frio-cave-1.jpg", tag: ["CAVE", "WALK-THROUGH"], span: "" },
              { src: "/images/big-rock-falls-2.jpg", tag: ["FALLS", "150 FT"], span: "" },
              { src: "/images/pine-ridge-2.jpg", tag: ["VIEWPOINT", "PINE RIDGE"], span: "" },
              { src: "/images/caracol-1.jpg", tag: ["CARACOL", "CAANA 43M"], span: "" },
            ].map((img, i) => (
              <div key={i} className={`relative overflow-hidden group ${img.span}`}>
                <img src={img.src} alt={img.tag.join(" ")} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-granite-deep/90 to-transparent" />
                <span className="gauge-tag absolute bottom-2 left-2 text-xs font-bold text-mist border-mist/60 bg-granite-deep uppercase">
                  {img.tag.join(" — ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-pine text-mist py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <Reveal><StatBadge value="43,333" label="Hectares Reserve" /></Reveal>
          <Reveal delay={0.1}><StatBadge value="1944" label="Reserve Founded" /></Reveal>
          <Reveal delay={0.2}><StatBadge value="150 FT" label="Big Rock Falls" /></Reveal>
          <Reveal delay={0.3}><StatBadge value="300+" label="Bird Species" /></Reveal>
        </div>
      </section>

      {/* Feature icons row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid sm:grid-cols-4 gap-8">
        {[
          { icon: Mountain, label: "Granite Terraces" },
          { icon: Waves, label: "Natural Swimming" },
          { icon: Trees, label: "Rare Pine Forest" },
          { icon: ShieldCheck, label: "Licensed Guides" },
        ].map((f, i) => (
          <Reveal key={i} delay={i * 0.08} className="flex flex-col items-center text-center gap-3">
            <f.icon className="text-pine" size={30} />
            <span className="font-mono text-xs uppercase tracking-widest">{f.label}</span>
          </Reveal>
        ))}
      </section>

      {/* Closing CTA */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <img src="/images/caracol-2.jpg" alt="Caracol Maya ruins" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-granite-deep/90 via-granite-deep/70 to-sun/20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center text-mist">
          <Reveal>
            <span className="gauge-tag text-sun">BOOK — TODAY</span>
            <h2 className="font-display font-black uppercase text-4xl sm:text-6xl mt-4">
              Ready for the Pools?
            </h2>
            <p className="font-body text-mist/80 mt-4">
              Half day granite pools and waterfalls, or a full day combo with Caracol. Guides, transport,
              and park access included.
            </p>
            <button
              onClick={() => booking.open()}
              className="mt-8 bg-sun text-granite-deep font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-sun/90 transition-colors"
            >
              Book Your Tour
            </button>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
