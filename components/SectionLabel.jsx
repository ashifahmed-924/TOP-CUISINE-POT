export default function SectionLabel({ number, label, tone = "ink", className = "" }) {
  const color =
    tone === "cream"
      ? "text-cream/80"
      : tone === "gold"
        ? "text-gold"
        : "text-ink/70";

  return (
    <div
      className={`font-micro flex items-center gap-3 text-[0.68rem] tracking-[0.22em] uppercase ${color} ${className}`}
    >
      <span className="tabular-nums">{number}</span>
      <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
