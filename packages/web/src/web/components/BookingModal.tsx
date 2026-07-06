import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { sendBooking } from "../lib/worker";
import { tours } from "../lib/tours";
import { SuccessModal } from "./SuccessModal";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultTour?: string;
};

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  tour: "",
  date: "",
  guests: "2",
  message: "",
};

export function BookingModal({ isOpen, onClose, defaultTour }: BookingModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({ ...emptyForm, tour: defaultTour ?? tours[0].name });
    }
  }, [isOpen, defaultTour]);

  const bookingMutation = useMutation({
    mutationFn: sendBooking,
    onSuccess: () => {
      setShowSuccess(true);
      onClose();
    },
  });

  if (!isOpen && !showSuccess) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate(form);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-granite-deep/70 px-4 py-8 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-mist border border-granite/20 p-6 sm:p-8 my-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-granite hover:text-pine"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <span className="gauge-tag text-pine">BOOKING — REQUEST</span>
            <h3 className="font-display text-3xl font-black uppercase mt-3">
              Book Your Tour
            </h3>
            <p className="font-body text-sm text-granite mt-2">
              No payment now. Submit your details and we confirm availability within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-granite/30 bg-mist px-4 py-3 text-sm font-body focus:outline-none focus:border-pine"
                />
                <select
                  required
                  value={form.tour}
                  onChange={(e) => setForm({ ...form, tour: e.target.value })}
                  className="w-full border border-granite/30 bg-mist px-4 py-3 text-sm font-body focus:outline-none focus:border-pine"
                >
                  {tours.map((t) => (
                    <option key={t.slug} value={t.name}>
                      {t.shortName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-granite/30 bg-mist px-4 py-3 text-sm font-body focus:outline-none focus:border-pine"
                />
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full border border-granite/30 bg-mist px-4 py-3 text-sm font-body focus:outline-none focus:border-pine"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} guest{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Anything else we should know? (optional)"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full border border-granite/30 bg-mist px-4 py-3 text-sm font-body focus:outline-none focus:border-pine resize-none"
              />
              {bookingMutation.isError && (
                <p className="text-sm text-red-700">
                  Something went wrong. Please try again or call +501 639-0074.
                </p>
              )}
              <button
                type="submit"
                disabled={bookingMutation.isPending}
                className="w-full bg-sun text-granite-deep font-mono text-xs uppercase tracking-widest py-4 hover:bg-sun/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {bookingMutation.isPending && <Loader2 className="animate-spin" size={16} />}
                {bookingMutation.isPending ? "Sending..." : "Send Booking Request"}
              </button>
            </form>
          </div>
        </div>
      )}
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
}
