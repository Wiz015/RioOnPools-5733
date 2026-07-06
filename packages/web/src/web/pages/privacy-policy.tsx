import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { GaugeTag } from "../components/GaugeTag";

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <Seo
        title="Privacy Policy | Rio On Pools"
        description="How Rio On Pools collects, uses, and protects information submitted through booking and contact forms."
      />
      <section className="bg-granite-deep pt-32 sm:pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-mist">
          <GaugeTag items={["LEGAL", "PRIVACY"]} className="text-sun" />
          <h1 className="font-display font-black uppercase text-4xl sm:text-5xl mt-4">Privacy Policy</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-6 font-body text-sm text-granite leading-relaxed">
        <p>Last updated July 2026.</p>
        <p>
          Rio On Pools ("we", "us") operates rioonpools.com. This policy explains what information we
          collect through the site and how it is used.
        </p>
        <h2 className="font-display font-black uppercase text-xl text-granite-deep mt-8">Information We Collect</h2>
        <p>
          When you submit a booking request or contact form, we collect the information you provide,
          including name, email address, phone number, tour preference, date, guest count, and any
          message you include.
        </p>
        <h2 className="font-display font-black uppercase text-xl text-granite-deep mt-8">How We Use It</h2>
        <p>
          We use this information only to respond to booking requests and inquiries, confirm
          availability, arrange payment separately, and communicate with you about your tour.
        </p>
        <h2 className="font-display font-black uppercase text-xl text-granite-deep mt-8">How Forms Are Processed</h2>
        <p>
          Booking and contact form submissions are sent directly to our operations team through a
          secure server side process. We do not sell or share your information with third parties for
          marketing purposes.
        </p>
        <h2 className="font-display font-black uppercase text-xl text-granite-deep mt-8">Contact</h2>
        <p>
          Questions about this policy can be sent to info@rioonpools.com or by calling +501 639-0074.
        </p>
      </section>
    </Layout>
  );
}
