import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { GaugeTag } from "../components/GaugeTag";

export default function TermsOfServicePage() {
  return (
    <Layout>
      <Seo
        title="Terms of Service | Rio On Pools"
        description="Terms and conditions for booking guided tours with Rio On Pools in Cayo District, Belize."
      />
      <section className="bg-granite-deep pt-32 sm:pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-mist">
          <GaugeTag items={["LEGAL", "TERMS"]} className="text-sun" />
          <h1 className="font-display font-black uppercase text-4xl sm:text-5xl mt-4">Terms of Service</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-6 font-body text-sm text-granite leading-relaxed">
        <p>Last updated July 2026.</p>
        <h2 className="font-display font-black uppercase text-xl text-granite-deep mt-8">Booking Requests</h2>
        <p>
          Submitting a form on this site is a booking request, not a confirmed reservation. Our team
          confirms availability and payment arrangements separately, typically within 24 hours.
          Payment is not collected through this website.
        </p>
        <h2 className="font-display font-black uppercase text-xl text-granite-deep mt-8">Tour Conduct and Safety</h2>
        <p>
          Guests must follow guide instructions at all times, particularly around Rio On Pools, where
          currents, slippery granite, and deep water present real risk. Life vests are provided for
          weaker swimmers and must be worn if instructed by the guide. Diving from rocks is not
          permitted. Parents and guardians are responsible for supervising children.
        </p>
        <h2 className="font-display font-black uppercase text-xl text-granite-deep mt-8">Cancellations</h2>
        <p>
          Cancellation and rescheduling terms are communicated at the time of booking confirmation and
          may vary by tour, weather, and group size, especially for the Caracol combo which requires a
          2 person minimum.
        </p>
        <h2 className="font-display font-black uppercase text-xl text-granite-deep mt-8">Liability</h2>
        <p>
          Outdoor activities including swimming, hiking, and climbing carry inherent risk. Guests
          participate at their own risk and are expected to disclose relevant health or swimming
          ability concerns to their guide before the tour begins.
        </p>
        <h2 className="font-display font-black uppercase text-xl text-granite-deep mt-8">Contact</h2>
        <p>Questions about these terms can be sent to info@rioonpools.com or +501 639-0074.</p>
      </section>
    </Layout>
  );
}
