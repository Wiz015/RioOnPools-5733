import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'booking' | 'contact';
  title?: string;
  message?: string;
}

export function SuccessModal({ isOpen, onClose, type = 'booking', title, message }: SuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    const ownsScrollLock = previous !== 'hidden';
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(onClose, 5000);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      if (ownsScrollLock) document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '32px 28px 28px',
              maxWidth: '360px',
              width: '100%',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close success message"
              style={{
                position: 'absolute', top: '12px', right: '12px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#9ca3af', display: 'flex', padding: '4px',
              }}
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 220 }}
              style={{ display: 'inline-flex', marginBottom: '16px' }}
            >
              <CheckCircle size={48} style={{ color: '#E08A2E' }} />
            </motion.div>

            {/* Title */}
            <h2 id="success-title" style={{
              fontFamily: 'Public Sans, sans-serif', fontWeight: 800,
              fontSize: '1.35rem', color: '#111827', margin: '0 0 10px',
            }}>
              {title ?? (type === 'booking' ? 'Booking Request Sent!' : 'Message Received!')}
            </h2>

            {/* Body */}
            <p style={{
              fontFamily: 'Public Sans, sans-serif', color: '#6b7280',
              fontSize: '0.88rem', lineHeight: '1.65', margin: '0 0 8px',
            }}>
              {message ?? (type === 'booking'
                ? "We'll confirm availability within 24 hours. Check your email for a confirmation."
                : "Thanks for reaching out! Our team will get back to you within 24 hours.")}
            </p>

            {/* Urgent */}
            <p style={{
              fontFamily: 'Public Sans, sans-serif', color: '#9ca3af',
              fontSize: '0.78rem', margin: '0 0 24px',
            }}>
              Urgent? Call{' '}
              <a href="tel:+5016390074" style={{ color: '#E08A2E', textDecoration: 'none', fontWeight: 600 }}>
                +501 639-0074
              </a>
            </p>

            {/* Button */}
            <button
              onClick={onClose}
              style={{
                background: '#E08A2E', color: '#10261A', border: 'none',
                borderRadius: '8px', padding: '10px 28px',
                fontFamily: 'Public Sans, sans-serif', fontWeight: 700,
                fontSize: '0.85rem', letterSpacing: '0.05em',
                textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
