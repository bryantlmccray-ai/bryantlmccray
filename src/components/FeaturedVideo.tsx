import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { stillSrcSet } from "@/lib/stills";

type FeaturedVideoProps = {
  youtubeId: string;
  poster: string;
  alt: string;
  title: string;
  /** Loop the muted preview (the homepage reel); story packages play through once. */
  loop?: boolean;
  /** Override "Watch with sound" (e.g. open a modal). Defaults to swapping in the full player in place. */
  onWatchWithSound?: () => void;
};

// Featured-video standard: muted inline autoplay once in view, poster until playing,
// "Watch with sound" for the full player, and no autoplay under reduced motion.
const FeaturedVideo = ({ youtubeId, poster, alt, title, loop = false, onWatchWithSound }: FeaturedVideoProps) => {
  const reduceMotion = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [inView, setInView] = useState(false);
  const [withSound, setWithSound] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(false);
    const onMessage = (event: MessageEvent) => {
      if (event.source !== playerRef.current?.contentWindow) return;
      if (!["https://www.youtube-nocookie.com", "https://youtube-nocookie.com", "https://www.youtube.com", "https://youtube.com"].includes(event.origin)) return;
      let message;
      try {
        message = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (message?.event === "infoDelivery" && message.info?.playerState === 1) {
        setPlaying(true);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [youtubeId, withSound]);

  const listenForPlayback = () => {
    playerRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening", id: youtubeId }),
      "https://www.youtube-nocookie.com",
    );
  };

  useEffect(() => {
    const el = boxRef.current;
    if (!el || inView || reduceMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, reduceMotion]);

  const base = `https://www.youtube-nocookie.com/embed/${youtubeId}`;
  const apiParams = `&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
  const mutedSrc = `${base}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0${loop ? `&loop=1&playlist=${youtubeId}` : ""}${apiParams}`;
  const soundSrc = `${base}?autoplay=1&mute=0&controls=1&playsinline=1&rel=0&modestbranding=1${apiParams}`;

  const playWithSound = () => (onWatchWithSound ? onWatchWithSound() : setWithSound(true));

  return (
    <div ref={boxRef} className="aspect-video relative overflow-hidden w-full">
      <img src={poster} srcSet={stillSrcSet(poster)} sizes="(min-width: 768px) 640px, 100vw" width={1920} height={1080} decoding="async" alt={alt} className={`pointer-events-none absolute inset-0 z-[1] w-full h-full object-cover transition-opacity duration-200 motion-reduce:transition-none ${playing ? "opacity-0" : "opacity-100"}`} />
      {withSound ? (
        <iframe
          ref={playerRef}
          onLoad={listenForPlayback}
          src={soundSrc}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : reduceMotion ? (
        <button
          type="button"
          onClick={playWithSound}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 z-10 flex items-end justify-start p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="inline-flex min-h-11 items-center gap-2 rounded-[2px] bg-primary px-4 text-sm font-medium text-primary-foreground">
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> Play with sound
          </span>
        </button>
      ) : (
        <>
          {inView && (
            <iframe
              ref={playerRef}
              onLoad={listenForPlayback}
              src={mutedSrc}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full border-0"
            />
          )}
          <button
            type="button"
            onClick={playWithSound}
            className="absolute bottom-3 left-3 z-10 inline-flex min-h-11 items-center rounded-[2px] bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Watch with sound
          </button>
        </>
      )}
    </div>
  );
};

export default FeaturedVideo;
