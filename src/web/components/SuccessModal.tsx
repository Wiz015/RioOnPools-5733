import { CheckCircle2, X } from "lucide-react";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export function SuccessModal({
  isOpen,
  onClose,
  title = "Request received",
  message = "Thanks. Our team will confirm availability and payment details within 24 hours by phone or email.",
}: SuccessModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-granite-deep/70 px-4">
      <div className="relative w-full max-w-sm bg-mist border border-granite/20 p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-granite hover:text-pine"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <CheckCircle2 className="mx-auto text-pine" size={40} />
        <h3 className="font-display text-2xl font-black mt-4 uppercase">{title}</h3>
        <p className="font-body text-sm text-granite mt-3">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-pine text-mist font-mono text-xs uppercase tracking-widest py-3 hover:bg-pine-light transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
