import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, X } from "lucide-react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ScrollAnimations";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import justiceThumb from "@/assets/12-years-justice-thumbnail.jpeg";

// Extract YouTube video ID from various URL formats
const getYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const records = [
  { code: "SP.24", name: "A Shared Purpose", reporter: "Bryant McCray", date: "2024", station: "WKYC-TV", market: "Cleveland", category: "Community", link: "https://www.youtube.com/watch?v=Y0PQ2o0cTZw&t=46s" },
  { code: "HS.24", name: "Healing in the Stacks", reporter: "Bryant McCray", date: "2024", station: "WKYC-TV", market: "Cleveland", category: "Community", link: "https://www.youtube.com/watch?v=ervpUsDZP1k&t=43s" },
  { code: "TY.24", name: "12 Years to Justice", reporter: "Bryant McCray", date: "2024", station: "WKYC-TV", market: "Cleveland", category: "Investigation", link: "https://www.youtube.com/watch?v=oXRPe8KKv8c" },
  { code: "RR.26", name: "Reporter Reel 2026", reporter: "Bryant McCray", date: "2026", station: "WGN-TV", market: "Chicago", category: "Broadcast Reel", link: "https://www.youtube.com/watch?v=F9po9pUJWio" },
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Small local scramble hook: resolves a string character by character.
const useScramble = (target: string, enabled: boolean, delay = 0, duration = 500, cycle = 0) => {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!enabled) {
      setDisplay(target);
      return;
    }
    let raf = 0;
    let start = 0;
    let timeout = 0;
    let lastUpdate = 0;

    const step = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      // Throttle state updates to roughly every 50ms instead of every frame.
      if (time - lastUpdate >= 50) {
        lastUpdate = time;
        const resolved = Math.floor(progress * target.length);
        const next = target
          .split("")
          .map((char, i) => {
            if (i < resolved || char === " ") return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("");
        setDisplay(next);
      }
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setDisplay(target);
      }
    };

    timeout = window.setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
    // cycle re-triggers the decode on every record change, even when the target string is unchanged.
  }, [target, enabled, delay, duration, cycle]);

  return display;
};

const MetaRow = ({
  label,
  value,
  scramble,
  delay,
  cycle,
}: {
  label: string;
  value: string;
  scramble: boolean;
  delay: number;
  cycle: number;
}) => {
  const display = useScramble(value.toUpperCase(), scramble, delay, 500, cycle);
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-3">
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <span className="text-[11px] uppercase tracking-[0.1em] text-foreground text-right tabular-nums">
        {display}
      </span>
    </div>
  );
};

const featuredWork = [
  {
    title: "A Shared Purpose",
    category: "Community",
    description: "A pastor and his wife, both activists, share not just a birthday but a lifelong mission for change.",
    link: "https://www.youtube.com/watch?v=Y0PQ2o0cTZw&t=46s",
    thumbnail: "https://img.youtube.com/vi/Y0PQ2o0cTZw/mqdefault.jpg",
    station: "WKYC-TV",
    market: "Cleveland",
    year: "2024",
  },
  {
    title: "Healing in the Stacks",
    category: "Community",
    description: "After a shooting at a Shaker Heights library, a community finds its way back together.",
    link: "https://www.youtube.com/watch?v=ervpUsDZP1k&t=43s",
    thumbnail: "https://img.youtube.com/vi/ervpUsDZP1k/mqdefault.jpg",
    station: "WKYC-TV",
    market: "Cleveland",
    year: "2024",
  },
  {
    title: "12 Years to Justice",
    category: "Investigation",
    description: "A nurse murdered in broad daylight—and 12 years later, her own divorce attorney is charged with the crime.",
    link: "https://www.youtube.com/watch?v=oXRPe8KKv8c",
    thumbnail: justiceThumb,
    station: "WKYC-TV",
    market: "Cleveland",
    year: "2024",
  },
];

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; link: string } | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const videoId = selectedVideo ? getYouTubeId(selectedVideo.link) : null;

  const [displayed, setDisplayed] = useState(0);
  const [paused, setPaused] = useState(false);
  const panel = useAnimationControls();
  const swapTimer = useRef<number>();
  const transitioning = useRef(false);
  const record = records[displayed];

  const goTo = useCallback(
    (next: number) => {
      if (next === displayed || transitioning.current) return;
      if (shouldReduceMotion) {
        setDisplayed(next);
        return;
      }
      transitioning.current = true;
      panel.set({ x: "100%" });
      panel.start({
        x: ["100%", "0%", "-100%"],
        transition: { duration: 0.9, times: [0, 0.5, 1], ease: [0.76, 0, 0.24, 1] },
      });
      swapTimer.current = window.setTimeout(() => setDisplayed(next), 450);
      window.setTimeout(() => {
        transitioning.current = false;
      }, 900);
    },
    [displayed, panel, shouldReduceMotion]
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      goTo((displayed + 1) % records.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [displayed, paused, goTo]);

  useEffect(() => () => window.clearTimeout(swapTimer.current), []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo((displayed + 1) % records.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo((displayed - 1 + records.length) % records.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedVideo({ title: record.name, link: record.link });
    }
  };

  const scramble = !shouldReduceMotion;

  const revealInitial = shouldReduceMotion ? false : { opacity: 0, y: 30 };
  const revealTransition = (delay: number, duration = 0.6) => ({
    duration: shouldReduceMotion ? 0 : duration,
    delay: shouldReduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  });

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navigation />

        {/* Record Hero */}
        <section
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative min-h-[88vh] w-full overflow-hidden pt-28 md:pt-32"
        >
          {/* Full-hero click target, below the content so the metadata and markers stay clickable */}
          <button
            type="button"
            aria-label={`Record ${record.code}, ${record.name}. Press enter to watch.`}
            onKeyDown={onKeyDown}
            onClick={() => setSelectedVideo({ title: record.name, link: record.link })}
            className="absolute inset-0 z-0 w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
          {/* Wipe panel */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden
              initial={{ x: "100%" }}
              animate={panel}
              className="pointer-events-none absolute inset-0 z-30 bg-foreground"
            />
          )}

          <div className="editorial-container relative z-10 flex min-h-[calc(88vh-7rem)] flex-col">
            <div className="h-px w-full bg-border" />

            <div
              className="grid cursor-pointer gap-x-16 md:grid-cols-2"
              onClick={() => setSelectedVideo({ title: record.name, link: record.link })}
            >
              <div>
                <MetaRow label="Name" value={record.name} scramble={scramble} delay={450} cycle={displayed} />
                <MetaRow label="Reporter" value={record.reporter} scramble={scramble} delay={490} cycle={displayed} />
                <MetaRow label="Date" value={record.date} scramble={scramble} delay={530} cycle={displayed} />
              </div>
              <div>
                <MetaRow label="Station" value={record.station} scramble={scramble} delay={570} cycle={displayed} />
                <MetaRow label="Market" value={record.market} scramble={scramble} delay={610} cycle={displayed} />
                <MetaRow label="Category" value={record.category} scramble={scramble} delay={650} cycle={displayed} />
              </div>
            </div>

            <div className="flex-1" />

            {/* Index markers */}
            <div
              className="flex items-center gap-2 pb-6"
              style={{ marginBottom: "clamp(3.5rem, 17vw, 14rem)" }}
            >
              {records.map((item, i) => (
                <button
                  key={item.code}
                  type="button"
                  aria-label={`Show record ${item.code}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    goTo(i);
                  }}
                  className={`h-px transition-all duration-300 ${
                    i === displayed ? "w-16 bg-accent" : "w-6 bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Wordmark */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden">
            <div className="editorial-container">
              <div className="relative" style={{ marginBottom: "-0.08em" }}>
                {/* Remount via key so the enter animation replays on each record change;
                    the swap is hidden under the wipe panel, so no exit animation is needed. */}
                <motion.div
                  key={record.code}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 60, skewX: "8deg" }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, x: 0, skewX: "0deg" }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.5,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="text-center font-sans text-foreground"
                  style={{
                    fontSize: "clamp(3.5rem, 17vw, 14rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.045em",
                    lineHeight: 1,
                  }}
                >
                  {record.code}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Identity band */}
        <section className="py-24 md:py-32 border-t border-border">
          <div className="editorial-container">
            <h1 className="font-serif text-display text-foreground mb-6">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={revealTransition(0.15, 1)}
                >
                  Bryant
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={revealTransition(0.3, 1)}
                >
                  McCray
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={revealInitial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={revealTransition(0.5)}
              className="text-subhead text-muted-foreground mb-3"
            >
              Journalist. Storyteller. Communication Strategist.
            </motion.p>

            <motion.p
              initial={revealInitial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={revealTransition(0.6)}
              className="font-serif italic text-muted-foreground mb-8"
            >
              The stories that shape us. The moments that matter.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={revealTransition(0.65, 0.8)}
              className="accent-line mb-8 origin-left"
            />

            <motion.p
              initial={revealInitial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={revealTransition(0.8)}
              className="text-lg text-foreground/80 leading-relaxed max-w-xl"
            >
              Four-time Emmy-nominated reporter at WGN-TV in Chicago, covering breaking news and politics.
            </motion.p>
          </div>
        </section>

        {/* Press Reel Highlight */}
        <section className="py-20 bg-secondary/50">
          <div className="editorial-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn direction="left">
                <div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-4">
                    Press Reel
                  </p>
                  <h2 className="font-serif text-headline text-foreground mb-6">
                    Reporter Reel 2026
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Seven live standups and three full stories from WGN-TV Chicago. Breaking news, severe weather, and state and national politics.
                  </p>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
                    WGN-TV · Chicago · 2026
                  </p>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Button 
                      variant="editorial" 
                      size="sm" 
                      onClick={() => setSelectedVideo({ title: "Reporter Reel 2026", link: "https://www.youtube.com/watch?v=F9po9pUJWio" })}
                      className="flex items-center gap-2"
                    >
                      Watch Reel <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </FadeIn>
              
              <FadeIn direction="right" delay={0.2}>
                <HoverLift>
                  <button 
                    onClick={() => setSelectedVideo({ title: "Reporter Reel 2026", link: "https://www.youtube.com/watch?v=F9po9pUJWio" })}
                    className="aspect-video relative group cursor-pointer overflow-hidden border border-border block w-full"
                  >
                    <motion.img 
                      src="https://img.youtube.com/vi/F9po9pUJWio/hqdefault.jpg" 
                      alt="Reporter Reel 2026 Thumbnail"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                      <motion.div 
                        className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-background transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Play className="h-6 w-6 ml-1 text-foreground" />
                      </motion.div>
                    </div>
                  </button>
                </HoverLift>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Featured Work Preview */}
        <section className="py-20 border-t border-border">
          <div className="editorial-container">
            <FadeIn>
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-serif text-headline text-foreground">
                  Selected Work
                </h2>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Button variant="accent" size="sm" asChild>
                    <Link to="/work" className="flex items-center gap-2">
                      View All <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </FadeIn>

            <StaggerContainer className="space-y-8">
              {featuredWork.map((item, index) => {
                const content = (
                  <motion.div 
                    className="flex flex-col md:flex-row md:items-start gap-6"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full md:w-40 lg:w-48 flex-shrink-0 overflow-hidden">
                      <motion.img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full aspect-video object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-accent tracking-widest uppercase mb-2">
                          {item.category}
                        </p>
                        <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">
                          {item.station} · {item.market} · {item.year}
                        </p>
                        <h3 className="font-serif text-2xl text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground max-w-lg">
                          {item.description}
                        </p>
                      </div>
                      <motion.div 
                        className="flex items-center text-muted-foreground group-hover:text-accent transition-colors duration-300"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Play className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </motion.div>
                );

                return (
                  <StaggerItem key={index}>
                    <button
                      onClick={() => setSelectedVideo({ title: item.title, link: item.link })}
                      className="block group py-8 border-b border-border last:border-b-0 cursor-pointer w-full text-left"
                    >
                      {content}
                    </button>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
        {/* Quiet CTA */}
        <FadeIn className="py-24">
          <div className="editorial-container text-center">
            <p className="text-muted-foreground mb-6">
              Available for broadcast, editorial, and documentary work.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button variant="editorial" size="sm" asChild>
                <a href="mailto:Bryant.l.mccray@gmail.com">
                  Get in Touch
                </a>
              </Button>
            </motion.div>
          </div>
        </FadeIn>

        <Footer />

        {/* Video Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl w-[90vw] p-0 bg-background border-border overflow-hidden">
            <DialogTitle className="sr-only">{selectedVideo?.title}</DialogTitle>
            <div className="relative">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 z-50 p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              {videoId && (
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={selectedVideo?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </PageTransition>
  );
};

export default Index;
