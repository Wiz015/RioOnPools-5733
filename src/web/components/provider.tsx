import { createContext, useContext, useState, useCallback } from "react";
import { BookingModal } from "./BookingModal";

interface ProviderProps {
  children: React.ReactNode;
}

type BookingModalContextType = {
  open: (tourName?: string) => void;
  close: () => void;
};

const BookingModalContext = createContext<BookingModalContextType | null>(null);

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error("useBookingModal must be used within Provider");
  return ctx;
}

export function Provider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultTour, setDefaultTour] = useState<string | undefined>(undefined);

  const open = useCallback((tourName?: string) => {
    setDefaultTour(tourName);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <BookingModalContext.Provider value={{ open, close }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={close} defaultTour={defaultTour} />
    </BookingModalContext.Provider>
  );
}
