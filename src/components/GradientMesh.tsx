const prefersReducedMotion = typeof window !== "undefined"
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

const GradientMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: "radial-gradient(ellipse at 18% 18%, hsl(var(--primary) / 0.055), transparent 36%), radial-gradient(ellipse at 82% 82%, hsl(var(--accent) / 0.045), transparent 38%)",
        }}
      />
      {/* Dot grid overlay */}
      {!prefersReducedMotion && (
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      )}
    </div>
  );
};

export default GradientMesh;
