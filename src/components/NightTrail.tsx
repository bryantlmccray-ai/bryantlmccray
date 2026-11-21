import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Shader, DotGrid, ChromaFlow, LinearGradient, CursorRipples, FilmGrain } from "shaders/react";

/**
 * ChromaFlow (id trailFlow) renders nothing. Its cursor field is sampled by
 * DotGrid (id trailDots) through the dotSize map driver, so dots only grow
 * where the cursor has recently been. DotGrid also renders nothing. Its id is
 * the maskSource on the white LinearGradient, and that is what you actually
 * see. Both invisible components must stay in the tree, and both id links must
 * stay intact: dotSize.source to trailFlow, maskSource to trailDots. Remove
 * either one and the whole effect dies with no error.
 */
const NightTrail = ({ className = "" }: { className?: string }) => {
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const reducedMotion = useReducedMotion();
  // The existing closer retains its original motion; bands honor reduced motion.
  const staticBand = reducedMotion && className.includes("night-band__trail");

  return (
    <div
      className={`night-trail ${className}`}
      data-ready={ready ? "true" : "false"}
      data-gpu-unavailable={unavailable ? "true" : "false"}
      aria-hidden="true"
    >
      <Shader onReady={() => setReady(true)} onUnavailable={() => setUnavailable(true)}>
        {!staticBand && (
          <DotGrid
            id="trailDots"
            density={40}
            dotSize={{
              type: "map",
              source: "trailFlow",
              channel: "alpha",
              inputMax: 1,
              inputMin: 0,
              outputMax: 1,
              outputMin: 0,
            }}
            twinkle={0.9}
            visible={false}
          />
        )}
        {!staticBand && <ChromaFlow id="trailFlow" intensity={1.4} radius={2.9} visible={false} />}
        <LinearGradient
          colorA="#1e1e1f"
          colorB="#070708"
          colorSpace="hsl"
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
        {!staticBand && (
          <LinearGradient
            colorA="#000000"
            colorB="#ffffff"
            colorSpace="hsl"
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            maskSource="trailDots"
          />
        )}
        {!staticBand && <CursorRipples />}
        <FilmGrain strength={0.1} />
      </Shader>
    </div>
  );
};

export default NightTrail;