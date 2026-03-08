import { motion } from "framer-motion";

const GradientMesh = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-[0.07]"
      style={{ background: "hsl(var(--primary))" }}
    />
    <motion.div
      animate={{
        x: [0, -60, 40, 0],
        y: [0, 30, -50, 0],
        scale: [1, 0.8, 1.15, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] rounded-full blur-[120px] opacity-[0.06]"
      style={{ background: "hsl(var(--accent))" }}
    />
    <motion.div
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -20, 40, 0],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-[0.04]"
      style={{ background: "hsl(var(--primary))" }}
    />
    {/* Dot grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  </div>
);

export default GradientMesh;
