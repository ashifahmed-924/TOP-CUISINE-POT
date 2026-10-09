export default function BrandMark({ className = "", tone = "cream" }) {
  const color = tone === "red" ? "text-imperial" : "text-cream";

  return (
    <div className={`font-display leading-[0.9] tracking-tight ${color} ${className}`}>
      <div>TOP</div>
      <div>CUISINE</div>
      <div>POT</div>
    </div>
  );
}
