import { Link } from "wouter";
import type { Tour } from "../lib/tours";
import { useBookingModal } from "./provider";

export function TourCard({ tour }: { tour: Tour }) {
  const booking = useBookingModal();

  return (
    <div className="group relative rounded-2xl overflow-hidden h-[380px] sm:h-[420px] border border-mist/10">
      <img
        src={tour.image}
        alt={tour.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-granite-deep via-granite-deep/55 to-transparent" />

      <div className="absolute top-4 right-4 bg-sun text-granite-deep rounded-full px-4 py-2 text-center leading-none shadow-md">
        <span className="block font-mono text-[9px] uppercase tracking-widest">From</span>
        <span className="font-display font-black text-lg">
          {tour.price}
          <span className="font-mono text-[9px] font-normal uppercase ml-0.5">usd</span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display font-black uppercase text-xl sm:text-2xl leading-tight text-mist">
          {tour.name}
        </h3>

        <div className="flex gap-2.5 mt-4">
          <Link
            to={`/tours/${tour.slug}`}
            className="flex-1 text-center rounded-full bg-mist/15 border border-mist/30 backdrop-blur-sm text-mist font-mono text-[11px] uppercase tracking-widest py-2.5 hover:bg-mist/25 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => booking.open(tour.name)}
            className="flex-1 rounded-full bg-sun text-granite-deep font-mono text-[11px] uppercase tracking-widest py-2.5 hover:bg-sun/90 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
