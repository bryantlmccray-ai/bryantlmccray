import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

// Proof never fades: these wrappers render content at full opacity on load.
// The props are kept so existing call sites compile unchanged.
export const FadeIn = ({ children, className = "" }: FadeInProps) => (
  <div className={className}>{children}</div>
);

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer = ({ children, className = "" }: StaggerContainerProps) => (
  <div className={className}>{children}</div>
);

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => (
  <div className={className}>{children}</div>
);

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export const HoverScale = ({ 
  children, 
  scale = 1.02,
  className = "" 
}: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
}

export const HoverLift = ({ children, className = "" }: HoverLiftProps) => {
  return (
    <motion.div
      className={className}
    >
      {children}
    </motion.div>
  );
};
