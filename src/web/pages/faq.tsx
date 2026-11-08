import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { GaugeTag } from "../components/GaugeTag";
import { faqs } from "../lib/faq-data";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <Seo
        title="FAQ | Rio On Pools Tours, Belize"
        description="Answers about safety, entrance fees, best time to visit, what to bring, and booking for Rio On Pools and Caracol tours in Belize."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />

      <section className="bg-granite-deep pt-32 sm:pt-40 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-mist">
          <Reveal>
            <GaugeTag items={["FAQ", `${faqs.length} ANSWERS`]} className="text-sun" />
            <h1 className="font-display font-black uppercase text-5xl sm:text-6xl mt-4">
              Frequently Asked
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.question} delay={i * 0.03}>
              <div className="border border-granite/15">
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
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
