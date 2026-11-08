import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { GaugeTag } from "../components/GaugeTag";
import { TourCard } from "../components/TourCard";
import { tours } from "../lib/tours";

export default function ToursPage() {
  return (
    <Layout>
      <Seo
        title="Tours | Rio On Pools, Mountain Pine Ridge & Caracol, Belize"
        description="Explore Caracol and Pine Ridge, cave tubing, Xunantunich, ATM Cave, and cave kayaking. View prices, inclusions and requirements for each tour."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://rioonpools.com/" },
            { "@type": "ListItem", position: 2, name: "Tours", item: "https://rioonpools.com/tours" },
          ],
        }}
      />

      <section className="bg-granite-deep pt-32 sm:pt-40 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-mist">
          <Reveal>
            <GaugeTag items={["TOURS", `${tours.length} OPTIONS`]} className="text-sun" />
            <h1 className="font-display font-black uppercase text-5xl sm:text-6xl mt-4">
              Our Tours
            </h1>
            <p className="font-body text-mist/70 mt-4 max-w-xl">
              Choose from Maya ruins, waterfalls, cave tubing and kayaking. Check each tour for
              prices, pickup options and what is included.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour, i) => (
            <Reveal key={tour.slug} delay={i * 0.1}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
