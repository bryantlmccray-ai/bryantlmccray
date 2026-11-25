import { useRef, useState, type PointerEvent } from "react";
import { motion, useMotionTemplate, useReducedMotion, useSpring } from "framer-motion";
import { FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { WritingSample } from "@/data/writing";

const spring = { stiffness: 260, damping: 30, mass: 0.45 };

export const WritingCover = ({ sample }: { sample: WritingSample }) => {
  const reducedMotion = useReducedMotion();
  const mobile = useIsMobile();
  const interactive = !reducedMotion && !mobile;
  const [hovered, setHovered] = useState(false);
  const cueRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const shadowX = useSpring(0, spring);
  const shadowY = useSpring(8, spring);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const shadow = useMotionTemplate`${shadowX}px ${shadowY}px 24px var(--writing-paper-shadow)`;

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!interactive) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - bounds.left;
    const py = event.clientY - bounds.top;
    const nx = Math.max(-1, Math.min(1, px / bounds.width * 2 - 1));
    const ny = Math.max(-1, Math.min(1, py / bounds.height * 2 - 1));
    rotateX.set(-ny * 6);
    rotateY.set(nx * 6);
    shadowX.set(-nx * 10);
    shadowY.set(8 - ny * 10);
    const cue = cueRef.current;
    if (!cue) return;
    const cx = px + 8 + cue.offsetWidth <= bounds.width ? px + 8 : px - 8 - cue.offsetWidth;
    const cy = py + 8 + cue.offsetHeight <= bounds.height ? py + 8 : py - 8 - cue.offsetHeight;
    x.set(Math.max(0, Math.min(cx, bounds.width - cue.offsetWidth)));
    y.set(Math.max(0, Math.min(cy, bounds.height - cue.offsetHeight)));
  };

  return (
    <a
      href={sample.pdf}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read PDF: ${sample.head}`}
      className="writing-cover relative block w-full max-w-[320px] md:w-[260px] mx-auto md:mx-0 aspect-[17/22] [perspective:1000px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onPointerEnter={(event) => { setHovered(true); move(event); }}
      onPointerMove={move}
      onPointerLeave={() => {
        setHovered(false);
        rotateX.set(0); rotateY.set(0); shadowX.set(0); shadowY.set(8);
      }}
      onPointerDown={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-card"
        style={{ boxShadow: shadow }}
        animate={{ y: interactive && hovered ? -6 : 0, scale: interactive && hovered ? 1.02 : 1, opacity: !interactive && hovered ? 0.85 : 1 }}
        transition={interactive ? { type: "spring", ...spring } : { duration: 0.15 }}
      >
        <img src={`/writing/covers/${sample.slug}.jpg?v=2`} alt={`First page of ${sample.head}`} loading="lazy" className="block w-full h-full object-cover" />
      </motion.div>
      {interactive && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            ref={cueRef}
            aria-hidden="true"
            className="absolute left-0 top-0 inline-flex w-max items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary-foreground mix-blend-exclusion"
            style={{ x, y }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <FileText className="h-4 w-4" />
            <span>Read PDF</span>
          </motion.div>
        </div>
      )}
    </a>
  );
};

export const WritingFrame = ({ sample }: { sample: WritingSample }) => {
  const reducedMotion = useReducedMotion();
  const mobile = useIsMobile();
  const interactive = !reducedMotion && !mobile;
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  if (!sample.frame) return null;

  return (
    <div
      className="writing-frame relative ml-auto w-[70%] aspect-video overflow-hidden mb-10"
      onPointerMove={(event) => {
        if (!interactive) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(-Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)) * 12);
        y.set(-Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)) * 12);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.img src={`${sample.frame}?v=2`} alt={sample.head} className="w-full h-full object-cover" style={{ x: interactive ? x : 0, y: interactive ? y : 0, scale: interactive ? 1.1 : 1 }} />
    </div>
  );
};