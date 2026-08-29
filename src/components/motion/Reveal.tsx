import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Masked line that clips upward into place. */
export function LineReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={reduced ? { opacity: 0 } : { y: "108%" }}
        animate={reduced ? { opacity: 1 } : { y: 0 }}
        transition={{ duration: reduced ? 0.15 : 0.55, ease: EASE, delay: reduced ? 0 : delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Fade + rise on mount. */
export function Rise({
  children,
  delay = 0,
  className,
  y = 12,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.15 : 0.4, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

/** Fade + rise once the element scrolls into view. */
export function ScrollReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

/** Accent rule that draws itself in when it enters the viewport. */
export function DrawRule({ delay = 0, className }: { delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`h-px w-full origin-left bg-accent ${className ?? ""}`}
      initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
      whileInView={reduced ? { opacity: 1 } : { scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0.15 : 0.5, ease: EASE, delay }}
    />
  );
}
