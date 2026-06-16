import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import splashHighlight from "@/assets/splash-highlight.mp4.asset.json";

const Splash = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const tryUnmute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    const p = v.play();
    if (p && typeof p.then === "function") {
      p.then(() => setMuted(false)).catch(() => {
        v.muted = true;
        setMuted(true);
      });
    } else {
      setMuted(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      tryUnmute();
    } else {
      v.muted = true;
      setMuted(true);
    }
  };

  useEffect(() => {
    const onFirstInteract = () => tryUnmute();
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "pointermove",
      "keydown",
      "touchstart",
      "scroll",
      "wheel",
    ];
    events.forEach((ev) =>
      window.addEventListener(ev, onFirstInteract, { once: true, passive: true })
    );
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, onFirstInteract));
    };
  }, []);

  const handleEnter = () => {
    navigate("/home");
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
      onClick={handleEnter}
    >
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Decorative line above */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-accent mx-auto mb-12 origin-center"
        />

        {/* Name - big and bold */}
        <div className="overflow-hidden pb-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-normal tracking-tight text-foreground leading-none"
          >
            Bryant
          </motion.h1>
        </div>
        <div className="overflow-hidden pb-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-normal tracking-tight text-foreground leading-none"
          >
            McCray
          </motion.h1>
        </div>

        {/* Featured highlight video */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16 mx-auto w-full max-w-3xl relative group"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            aria-hidden
            className="absolute -inset-px rounded-sm bg-accent/30 blur-xl opacity-60"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative overflow-hidden border border-accent/40 rounded-sm shadow-2xl bg-black">
            <video
              ref={videoRef}
              src={splashHighlight.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full bg-black/60 hover:bg-black/80 text-white px-3 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur transition-colors"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{muted ? "Tap for sound" : "Sound on"}</span>
            </button>
          </div>
        </motion.div>

        {/* Clever caption */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8 md:mt-12 text-muted-foreground text-lg md:text-xl tracking-wide font-sans"
        >
          The stories that shape us. The moments that matter.
        </motion.p>

        {/* Enter CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          onClick={handleEnter}
          className="mt-12 md:mt-16 group inline-flex items-center gap-3 text-accent hover:text-accent/80 transition-colors duration-300"
        >
          <span className="text-sm uppercase tracking-[0.2em] font-sans">
            Enter
          </span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </motion.button>

        {/* Decorative line below */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-accent mx-auto mt-12 origin-center"
        />
      </div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 text-xs uppercase tracking-[0.3em] text-muted-foreground font-sans"
      >
        Click anywhere to continue
      </motion.p>
    </motion.div>
  );
};

export default Splash;
