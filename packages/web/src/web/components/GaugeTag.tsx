type GaugeTagProps = {
  items: string[];
  className?: string;
};

export function GaugeTag({ items, className = "" }: GaugeTagProps) {
  return (
    <span className={`gauge-tag text-[11px] sm:text-xs uppercase ${className}`}>
      {items.join(" — ")}
    </span>
  );
}

type StatBadgeProps = {
  value: string;
  label: string;
  className?: string;
};

export function StatBadge({ value, label, className = "" }: StatBadgeProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="font-display text-4xl sm:text-5xl font-black leading-none">
        {value}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-widest mt-2 opacity-70">
        {label}
      </span>
    </div>
  );
}
