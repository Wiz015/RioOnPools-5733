import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { GaugeTag } from "../components/GaugeTag";
import { MapEmbed } from "../components/MapEmbed";
import { SuccessModal } from "../components/SuccessModal";
import { sendContact } from "../lib/worker";

const emptyForm = { name: "", email: "", phone: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(emptyForm);
  const [showSuccess, setShowSuccess] = useState(false);

  const contactMutation = useMutation({
    mutationFn: sendContact,
    onSuccess: () => {
      setShowSuccess(true);
      setForm(emptyForm);
    },
  });

  return (
    <Layout>
      <Seo
        title="Contact | Rio On Pools, Cayo District, Belize"
        description="Get in touch with Rio On Pools for tour questions, group bookings, or general inquiries. Call, email, or send a message."
      />

      <section className="bg-granite-deep pt-32 sm:pt-40 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-mist">
          <Reveal>
            <GaugeTag items={["CONTACT", "GENERAL INQUIRIES"]} className="text-sun" />
            <h1 className="font-display font-black uppercase text-5xl sm:text-6xl mt-4">Get In Touch</h1>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <h2 className="font-display font-black uppercase text-2xl">Contact Details</h2>
          <div className="space-y-4 mt-6">
            <a href="tel:+5016390074" className="flex items-center gap-3 font-body text-sm">
              <Phone className="text-pine" size={18} /> +501 639-0074
            </a>
            <a href="mailto:info@rioonpools.com" className="flex items-center gap-3 font-body text-sm">
              <Mail className="text-pine" size={18} /> info@rioonpools.com
            </a>
            <span className="flex items-center gap-3 font-body text-sm">
              <MapPin className="text-pine" size={18} /> Mountain Pine Ridge, Cayo District, Belize
            </span>
          </div>
          <div className="mt-8">
            <MapEmbed className="h-[300px]" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display font-black uppercase text-2xl">Send a Message</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              contactMutation.mutate(form);
            }}
            className="space-y-4 mt-6"
          >
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-granite/30 bg-mist px-4 py-3 text-sm font-body focus:outline-none focus:border-pine"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-granite/30 bg-mist px-4 py-3 text-sm font-body focus:outline-none focus:border-pine"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-granite/30 bg-mist px-4 py-3 text-sm font-body focus:outline-none focus:border-pine"
            />
            <textarea
              required
              placeholder="Your message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-granite/30 bg-mist px-4 py-3 text-sm font-body focus:outline-none focus:border-pine resize-none"
            />
            {contactMutation.isError && (
              <p className="text-sm text-red-700">Something went wrong. Please try again or call us directly.</p>
            )}
            <button
              type="submit"
              disabled={contactMutation.isPending}
              className="w-full bg-pine text-mist font-mono text-xs uppercase tracking-widest py-4 hover:bg-pine-light transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {contactMutation.isPending && <Loader2 className="animate-spin" size={16} />}
              {contactMutation.isPending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </Reveal>
      </section>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Message Sent"
        message="Thanks for reaching out. We'll get back to you shortly."
      />
    </Layout>
  );
}
