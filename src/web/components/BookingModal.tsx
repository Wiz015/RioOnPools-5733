import { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { tours } from '../lib/tours';
import { DatePicker } from './DatePicker';
import { SuccessModal } from './SuccessModal';
import { sendBooking } from '../lib/worker';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTour?: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 16px',
  background: '#ffffff',
  border: '1px solid #9ca3af',
  borderRadius: '8px',
  color: '#111827',
  fontSize: '16px', // 16px prevents iOS Safari zoom-on-focus
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Public Sans, sans-serif',
  transition: 'border-color 0.2s',
};

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  tour: '',
  date: '',
  guests: '1',
  message: '',
};

export function BookingModal({ isOpen, onClose, defaultTour }: BookingModalProps) {
  const [form, setForm] = useState({ ...initialForm, tour: defaultTour ?? '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const pending = useRef(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Keep latest onClose in a ref so the scroll-lock effect doesn't re-run
  // when the parent passes an inline function.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const close = () => { if (!pending.current) onClose(); };
  const localToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm, tour: defaultTour ?? '' });
      setError('');
      setSuccess(false);
    }
  }, [isOpen, defaultTour]);

  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    const previousFocus = document.activeElement as HTMLElement | null;

    // Lock background scroll (also works on iOS Safari)
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    // Focus the dialog itself (not an input) so the mobile keyboard
    // only opens when the user taps a field.
    const raf = requestAnimationFrame(() => {
      modalRef.current?.focus({ preventScroll: true });
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !pending.current) onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', onKey);
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  const set = (k: keyof typeof initialForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending.current) return;
    setError('');
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.tour || !form.date) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.date < localToday()) {
      setError('Please select today or a future date.');
      return;
    }
    pending.current = true;
    setLoading(true);
    try {
      await sendBooking({ ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim(), guests: Number(form.guests) });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed. Please try again.');
    } finally {
      pending.current = false;
      setLoading(false);
    }
  };

  if (success) {
    return (
      <SuccessModal isOpen={success} onClose={() => { setSuccess(false); onClose(); }} type="booking" />
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)',
              zIndex: 9000,
            }}
          />

          {/* Centering wrapper */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9001,
              pointerEvents: 'none',
              padding: '12px',
            }}
          >
            {/* Scrollable on short screens; calendar is rendered outside the panel. */}
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '440px',
                maxHeight: 'calc(100dvh - 24px)',
                overflow: 'hidden',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
                display: 'flex',
                flexDirection: 'column',
                pointerEvents: 'auto',
                outline: 'none',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f3f4f6',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <h2
                  id="booking-title"
                  style={{
                    fontFamily: 'Public Sans, sans-serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#111827',
                    margin: 0,
                  }}
                >
                  Book Your Adventure
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close booking"
                  disabled={loading}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                    color: '#6b7280',
                    cursor: 'pointer',
                  }}
                >
                  <X style={{ width: '16px', height: '16px' }} />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                style={{
                  padding: '16px 16px 20px',
                  overflowY: 'auto',
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                  minHeight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {/* First + Last Name */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => set('firstName', e.target.value)}
                    required
                    placeholder="First Name *"
                    style={inputStyle}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#E08A2E'; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#9ca3af'; }}
                  />
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => set('lastName', e.target.value)}
                    required
                    placeholder="Last Name *"
                    style={inputStyle}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#E08A2E'; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#9ca3af'; }}
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  required
                  placeholder="Email Address *"
                  style={inputStyle}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#E08A2E'; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#9ca3af'; }}
                />

                {/* Phone */}
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  required
                  placeholder="Phone Number *"
                  style={inputStyle}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#E08A2E'; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#9ca3af'; }}
                />

                {/* Tour select */}
                <div style={{ position: 'relative' }}>
                  <select
                    value={form.tour}
                    onChange={e => set('tour', e.target.value)}
                    required
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      paddingRight: '40px',
                      cursor: 'pointer',
                      color: form.tour ? '#111827' : '#9ca3af',
                    }}
                    onFocus={e => { (e.target as HTMLSelectElement).style.borderColor = '#E08A2E'; }}
                    onBlur={e => { (e.target as HTMLSelectElement).style.borderColor = '#9ca3af'; }}
                  >
                    <option value="">Select Tour *</option>
                    {tours.map(t => (
                      <option key={t.id} value={t.title} style={{ color: '#111827' }}>
                        {t.title} — ${t.price} USD
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '18px',
                      height: '18px',
                      color: '#9ca3af',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Date + Guests */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <DatePicker
                    value={form.date}
                    onChange={d => set('date', d)}
                    minDate={localToday()}
                    placeholder="Date *"
                  />
                  <div style={{ position: 'relative' }}>
                    <select
                      value={form.guests}
                      onChange={e => set('guests', e.target.value)}
                      style={{
                        ...inputStyle,
                        appearance: 'none',
                        paddingRight: '40px',
                        cursor: 'pointer',
                        color: '#111827',
                      }}
                      onFocus={e => { (e.target as HTMLSelectElement).style.borderColor = '#E08A2E'; }}
                      onBlur={e => { (e.target as HTMLSelectElement).style.borderColor = '#9ca3af'; }}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>
                          {n} Guest{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '18px',
                        height: '18px',
                        color: '#9ca3af',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Message — proper height */}
                <textarea
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  rows={3}
                  placeholder="Message, special requests, or questions..."
                  style={{
                    ...inputStyle,
                    resize: 'none',
                    lineHeight: '1.6',
                    minHeight: '80px',
                  }}
                  onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#E08A2E'; }}
                  onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#9ca3af'; }}
                />

                {/* Error */}
                {error && (
                  <div role="alert" style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#dc2626',
                    fontSize: '0.82rem',
                    fontFamily: 'Public Sans, sans-serif',
                  }}>
                    <AlertCircle style={{ width: '15px', height: '15px', flexShrink: 0 }} />
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '9px 24px',
                    background: loading ? '#7de8f0' : '#E08A2E',
                    color: '#10261A',
                    border: 'none',
                    borderRadius: '8px',
                    fontFamily: 'Public Sans, sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#00A8B8'; }}
                  onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#E08A2E'; }}
                >
                  {loading
                    ? <><Loader2 className="animate-spin" style={{ width: '16px', height: '16px' }} /> Sending...</>
                    : 'Submit Booking Request'}
                </button>

                {/* Footer */}
                <p
                  style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    textAlign: 'center',
                    margin: 0,
                    fontFamily: 'Public Sans, sans-serif',
                  }}
                >
                  Need help? Contact us at{' '}
                  <a
                    href="mailto:info@rioonpools.com"
                    style={{ color: '#E08A2E', fontWeight: 600, textDecoration: 'none' }}
                  >
                    info@rioonpools.com
                  </a>
                  {' '}or{' '}
                  <a
                    href="tel:+5016390074"
                    style={{ color: '#E08A2E', fontWeight: 600, textDecoration: 'none' }}
                  >
                    +501 639-0074
                  </a>
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
