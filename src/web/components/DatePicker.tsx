import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  placeholder?: string;
  className?: string;
}

const CALENDAR_HEIGHT = 324; // approx rendered height of calendar

export function DatePicker({ value, onChange, minDate, placeholder = 'Select Date', className = '' }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarPos, setCalendarPos] = useState({ top: 0, bottom: 0, left: 0, right: 0, openAbove: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && !calendarRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dismiss = (event: Event) => {
      if (event.type === 'scroll' && calendarRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    };
    window.addEventListener('resize', dismiss);
    window.addEventListener('scroll', dismiss, true);
    return () => {
      window.removeEventListener('resize', dismiss);
      window.removeEventListener('scroll', dismiss, true);
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openAbove = spaceBelow < CALENDAR_HEIGHT + 16 && rect.top > spaceBelow;

      setCalendarPos({
        top: Math.max(12, Math.min(openAbove ? rect.top - CALENDAR_HEIGHT - 8 : rect.bottom + 8, window.innerHeight - CALENDAR_HEIGHT - 12)),
        bottom: window.innerHeight - rect.top + 8,
        left: Math.max(12, Math.min(rect.left, window.innerWidth - 292)),
        right: window.innerWidth - rect.right,
        openAbove,
      });
    }
    if (!isOpen) setCurrentMonth(value ? parseLocalDate(value) : new Date());
    setIsOpen(prev => !prev);
  };

  const minDateObj = (() => {
    if (minDate) {
      const [y, m, d] = minDate.split('-').map(Number);
      return new Date(y, m - 1, d);
    }
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  })();

  const parseLocalDate = (str: string) => {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const selectedDate = value ? parseLocalDate(value) : null;

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return placeholder;
    const date = parseLocalDate(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day));
    while (days.length < 42) days.push(null);
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const previousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const selectDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    onChange(`${y}-${m}-${d}`);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < minDateObj;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === new Date().toDateString();
  };

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={value ? `Tour date: ${formatDisplayDate(value)}` : "Select tour date"}
        style={{
          width: '100%',
          padding: '10px 16px',
          background: '#ffffff',
          border: '1px solid #9ca3af',
          borderRadius: '8px',
          textAlign: 'left',
          color: value ? '#111827' : '#9ca3af',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'border-color 0.2s',
          cursor: 'pointer',
          fontFamily: 'Public Sans, sans-serif',
          fontSize: '15px',
          boxSizing: 'border-box',
        }}
        onFocus={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E08A2E'; }}
        onBlur={e => { if (!isOpen) (e.currentTarget as HTMLButtonElement).style.borderColor = '#9ca3af'; }}
      >
        <span>{formatDisplayDate(value)}</span>
        <Calendar style={{ width: '18px', height: '18px', color: '#9ca3af', flexShrink: 0 }} />
      </button>

      {/* Calendar — fixed positioned, opens above or below based on available space */}
      {createPortal(<AnimatePresence>
        {isOpen && (
          <motion.div
            ref={calendarRef}
            role="dialog"
            aria-label="Choose tour date"
            onKeyDown={e => {
              if (e.key === 'Escape') { e.stopPropagation(); setIsOpen(false); buttonRef.current?.focus(); }
            }}
            initial={{ opacity: 0, y: calendarPos.openAbove ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: calendarPos.openAbove ? 4 : -4 }}
            transition={{ duration: 0.1 }}
            style={{
              position: 'fixed',
              top: calendarPos.top,
              left: calendarPos.left,
              zIndex: 99999,
              width: 'min(280px, calc(100vw - 24px))',
              maxHeight: 'calc(100dvh - 24px)',
              overflowY: 'auto',
            }}
          >
            <div style={{
              background: '#fff',
              borderRadius: '10px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
            }}>
              {/* Month header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: '#E08A2E',
              }}>
                <button
                  type="button"
                  onClick={previousMonth}
                  aria-label="Previous month"
                  style={{ padding: '4px', borderRadius: '6px', background: 'rgba(0,0,0,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <ChevronLeft style={{ width: '16px', height: '16px', color: '#10261A' }} />
                </button>
                <span style={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 700, fontSize: '14px', color: '#10261A', letterSpacing: '0.01em' }}>
                  {monthName}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                  style={{ padding: '4px', borderRadius: '6px', background: 'rgba(0,0,0,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <ChevronRight style={{ width: '16px', height: '16px', color: '#10261A' }} />
                </button>
              </div>

              <div style={{ padding: '10px 12px 12px' }}>
                {/* Day headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '6px' }}>
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#E08A2E', padding: '2px 0', fontFamily: 'Public Sans, sans-serif' }}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                  {days.map((date, index) => {
                    const disabled = isDateDisabled(date);
                    const selected = isDateSelected(date);
                    const today = isToday(date);

                    if (!date) {
                      return <div key={`empty-${index}`} style={{ width: '32px', height: '32px' }} />;
                    }

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => !disabled && selectDate(date)}
                        disabled={disabled}
                        aria-label={date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        aria-pressed={selected}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: selected ? 700 : 500,
                          border: today && !selected ? '1px solid #E08A2E' : '1px solid transparent',
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          background: selected ? '#E08A2E' : 'transparent',
                          color: disabled ? '#d1d5db' : selected ? '#10261A' : '#1e293b',
                          transition: 'background 0.15s',
                          fontFamily: 'Public Sans, sans-serif',
                        }}
                        onMouseEnter={e => { if (!disabled && !selected) (e.currentTarget as HTMLButtonElement).style.background = '#e0f9fb'; }}
                        onMouseLeave={e => { if (!disabled && !selected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </div>
  );
}
