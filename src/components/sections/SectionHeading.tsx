import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  overline?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({
  overline,
  title,
  titleAccent,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={cn(
      "mb-10 md:mb-16",
      align === "center" && "text-center",
      className
    )}
  >
    {overline && (
      <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-primary mb-3 md:mb-4 font-medium">
        {overline}
      </p>
    )}
    <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl leading-[1.1] max-w-3xl">
      {title}
      {titleAccent && (
        <>
          {" "}
          <span className="gradient-text">{titleAccent}</span>
        </>
      )}
    </h2>
    {subtitle && (
      <p className="text-sm md:text-base text-muted-foreground max-w-xl mt-3 md:mt-5 leading-relaxed">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
