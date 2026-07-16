import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { GaugeTag, StatBadge } from "../components/GaugeTag";
import { MapEmbed } from "../components/MapEmbed";
import { faqs } from "../lib/faq-data";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

function Accordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {faqs.slice(0, 5).map((f, i) => (
        <div key={f.question} className="border border-granite/15">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left px-5 py-4 font-body font-semibold text-sm"
          >
            {f.question}
            <ChevronDown className={`shrink-0 ml-3 transition-transform ${open === i ? "rotate-180 text-pine" : ""}`} size={18} />
          </button>
          {open === i && (
            <p className="font-body text-sm text-granite px-5 pb-4 leading-relaxed">{f.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <Layout>
      <Seo
        title="About | Geology, History & Safety at Rio On Pools, Belize"
        description="Learn about the granite geology, Mountain Pine Ridge Forest Reserve history, and safety guidance for visiting Rio On Pools in Cayo District, Belize."
      />

      <section className="bg-granite-deep pt-32 sm:pt-40 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-mist">
          <Reveal>
            <GaugeTag items={["ABOUT", "GEOLOGY & HISTORY"]} className="text-sun" />
            <h1 className="font-display font-black uppercase text-5xl sm:text-6xl mt-4">
              Granite, Forest, and a Long History
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <img src="/images/rio-on-pools-hero.jpg" alt="Granite pools at Rio On Pools" className="w-full h-[420px] object-cover" />
        </Reveal>
        <Reveal delay={0.1}>
          <span className="gauge-tag text-pine">GEOLOGY</span>
          <h2 className="font-display font-black uppercase text-3xl sm:text-4xl mt-4">
            Granite in a Limestone Country
          </h2>
          <p className="font-body text-granite mt-4 leading-relaxed">
            Most of Belize sits on limestone. Rio On Pools is a geological outlier, cut into exposed
            granite that is part of the Maya Mountains batholith, rock hundreds of millions of years
            old and among the oldest exposed stone in Central America.
          </p>
          <p className="font-body text-granite mt-4 leading-relaxed">
            Over time the river carved a series of named and numbered pool terraces at different
            elevations, connected by small drops and slides. The full loop is an easy hike, about
            half a mile with roughly 26 feet of elevation gain, typically 30 to 60 minutes at a
            relaxed pace.
          </p>
        </Reveal>
      </section>

      <section className="bg-stone-light py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="gauge-tag text-pine">RESERVE HISTORY</span>
            <h2 className="font-display font-black uppercase text-3xl sm:text-4xl mt-4">
              Protected Since 1944
            </h2>
            <p className="font-body text-granite mt-4 leading-relaxed">
              Mountain Pine Ridge Forest Reserve is one of Belize's oldest protected areas, covering
              roughly 43,333 hectares (about 300 square miles). Entrance is through a gatehouse where
              visitors sign in, heading toward the Douglas Da Silva forest station on roads that turn
              to compact dirt in sections.
            </p>
            <p className="font-body text-granite mt-4 leading-relaxed">
              Beyond Rio On Pools, the reserve holds Rio Frio Cave, a large walk-through limestone
              cavern needing no climbing gear, Big Rock Falls, a roughly 150 foot waterfall on the
              Privassion River with its own swimming hole, and Thousand Foot Falls, the tallest
              waterfall in Central America, viewable only from a lookout.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <StatBadge value="43,333" label="Hectares" />
              <StatBadge value="1944" label="Founded" />
              <StatBadge value="300+" label="Bird Species" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img src="/images/pine-ridge-2.jpg" alt="Pine forest, Mountain Pine Ridge Reserve" className="w-full h-[420px] object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="lg:order-2">
          <span className="gauge-tag text-sun">SAFETY</span>
          <h2 className="font-display font-black uppercase text-3xl sm:text-4xl mt-4">
            Calm Looking Water, Real Hazards
          </h2>
          <p className="font-body text-granite mt-4 leading-relaxed">
            Rio On Pools looks gentle from the trail, but currents, slippery granite, and pockets of
            deep water are real, and there have been drowning incidents from unsupervised, self guided
            swims. We are not raising this to scare visitors away, just to be direct about it.
          </p>
          <p className="font-body text-granite mt-4 leading-relaxed">
            On our guided tours, guides point out safer entry points, provide life vests for weaker
            swimmers, ask that nobody dives off the rocks, and ask parents and guardians to closely
            supervise children. We also check current conditions before entering, since water levels
            can rise quickly after rain upstream.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:order-1">
          <img src="/images/rio-on-pools-3.jpg" alt="Granite pool terrace, Rio On Pools" className="w-full h-[380px] object-cover" />
        </Reveal>
      </section>

      <section className="bg-granite-deep py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal>
            <span className="gauge-tag text-sun">FAQ</span>
            <h2 className="font-display font-black uppercase text-4xl mt-4 text-mist">Common Questions</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <Accordion />
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <Reveal>
          <span className="gauge-tag text-pine">LOCATION</span>
          <h2 className="font-display font-black uppercase text-3xl sm:text-4xl mt-4">Find Us</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <MapEmbed className="h-[420px]" />
        </Reveal>
      </section>
    </Layout>
  );
}
