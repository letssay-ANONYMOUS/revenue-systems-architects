const nodes = [
  { x: 15, y: 20 },
  { x: 85, y: 18 },
  { x: 12, y: 78 },
  { x: 88, y: 80 },
  { x: 50, y: 12 },
];

const ConnectedToolsVisual = () => (
  <div className="relative h-full w-full">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
      {nodes.map((n, i) => (
        <line
          key={i}
          x1="50" y1="50"
          x2={n.x} y2={n.y}
          stroke="hsl(var(--primary))"
          strokeOpacity="0.35"
          strokeWidth="0.4"
          strokeDasharray="60"
          strokeDashoffset="60"
          style={{ animation: `pp-draw 2s ease-out ${i * 0.15}s forwards` }}
        />
      ))}
    </svg>
    {nodes.map((n, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary/70"
        style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)" }}
      />
    ))}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]" />
  </div>
);

export default ConnectedToolsVisual;
