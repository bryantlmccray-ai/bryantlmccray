import NightBand from "@/components/NightBand";
import headshotPortrait from "@/assets/bryant-headshot.jpeg";
import React, { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { stories } from "@/data/stories";
import { ArrowRight, Play, X } from "lucide-react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import { FadeIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/ScrollAnimations";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const ContactSection = React.lazy(() => import("@/components/ContactSection"));

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

type HeroRecord = {
  key: string;
  name: string;
  reporter: string;
  date: string;
  station: string;
  market: string;
  category: string;
  youtubeId: string;
  frame?: string;
  slug?: string;
  link?: string;
};

const HERO_ORDER: { slug: string; date: string; market: string; category: string; frame?: string }[] = [
  { slug: "nwi-storm-series", date: "August 2026", market: "Munster, Indiana", category: "Breaking News" },
  { slug: "election-night-2026", date: "November 2026", market: "Chicago", category: "Politics", frame: "maxres3" },
  { slug: "bears-stadium-fight", date: "2026", market: "Arlington Heights and Chicago", category: "Politics" },
  { slug: "amtrak-rail-yard", date: "2026", market: "Pilsen, Chinatown and Bridgeport", category: "Community" },
];

const heroStories = HERO_ORDER.map((entry) => {
  const story = stories.find((s) => s.slug === entry.slug)!;
  return { ...entry, story };
});

const records: HeroRecord[] = [
  ...heroStories.map(({ slug, date, market, category, frame, story }) => ({
    key: slug,
    name: story.headline,
    reporter: "Bryant McCray",
    date,
    station: "WGN-TV",
    market,
    category,
    youtubeId: story.youtubeId,
    frame,
    slug,
  })),
  { key: "reel-2026", name: "Reporter Reel 2026", reporter: "Bryant McCray", date: "2026", station: "WGN-TV · WKYC-TV", market: "Chicago & Cleveland", category: "Broadcast Reel", youtubeId: "sKE1ZCnN0e8", frame: "maxres1", link: "https://youtu.be/sKE1ZCnN0e8" },
];

const recognition = [
  { year: "2026", chapter: "NATAS Central Great Lakes", story: "One Traffic Stop, An Unlikely Rescue", category: "Crime/Justice News", station: "WKYC", href: "/stories/one-traffic-stop-an-unlikely-rescue" },
  { year: "2026", chapter: "NATAS Central Great Lakes", story: "Break in a Cold Case", category: "Crime/Justice News", station: "WKYC" },
  { year: "2026", chapter: "NATAS Central Great Lakes", story: "TikTok on the Clock as the Feed May Go Dark", category: "Daily News Report (single shift)", station: "WKYC" },
  { year: "2023", chapter: "NATAS Chicago/Midwest", story: "CBS 58 Eye on AI", category: "Team nomination", station: "WDJT" },
];

const firstSentence = (text: string) => {
  const match = text.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
};

// maxres freeze frame with a one-time fallback to hqdefault.
const FRAME_FALLBACK: Record<string, string> = { maxres1: "hq1", maxres2: "hq2", maxres3: "hq3" };

const FreezeFrame = ({ id, alt, className, loading, variant = "maxresdefault" }: { id: string; alt: string; className?: string; loading?: "lazy" | "eager"; variant?: string }) => (
  <img
    src={`https://img.youtube.com/vi/${id}/${variant}.jpg`}
    alt={alt}
    loading={loading}
    className={className}
    onError={(e) => {
      const img = e.currentTarget;
      if (!img.dataset.fallback) {
        img.dataset.fallback = "1";
        img.src = `https://img.youtube.com/vi/${id}/${FRAME_FALLBACK[variant] ?? "hqdefault"}.jpg`;
      }
    }}
  />
);

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
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground record-meta-label">{label}</span>
      <span className="text-[11px] uppercase tracking-[0.1em] text-foreground text-right tabular-nums">
        {display}
      </span>
    </div>
  );
};

const featuredWork = heroStories;

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

  const navigate = useNavigate();
  const openRecord = useCallback(() => {
    if (record.slug) navigate(`/stories/${record.slug}`);
    else if (record.link) setSelectedVideo({ title: record.name, link: record.link });
  }, [record, navigate]);

  // Measure the headline block so the index markers always sit above it.
  const wordmarkContainerRef = useRef<HTMLDivElement>(null);
  const [headlineHeight, setHeadlineHeight] = useState(160);

  useLayoutEffect(() => {
    const el = wordmarkContainerRef.current;
    if (!el) return;
    const measure = () => setHeadlineHeight(el.offsetHeight);
    measure();
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [record.key]);

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
      openRecord();
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
      <main className="min-h-screen bg-background overflow-x-clip">
        <Navigation />

        {/* Record Hero */}
        <NightBand
          portrait={{ src: headshotPortrait, alt: "Bryant McCray", position: "center top" }}
          portraitPlacement="record-gap"
          onClick={openRecord}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative min-h-[84vh] w-full overflow-hidden overflow-x-hidden pt-28 md:pt-32"
        >
          {/* Freeze frame behind the record; swaps under the wipe panel and cross-fades in */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <motion.div
              key={record.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
              className="absolute inset-0"
            >
              <FreezeFrame id={record.youtubeId} variant={record.frame} alt="" className="h-full w-full object-cover" />
            </motion.div>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--night-background) 0%, color-mix(in srgb, var(--night-background) 72%, transparent) 45%, color-mix(in srgb, var(--night-background) 45%, transparent) 100%)",
              }}
            />
          </div>
          {/* Full-hero click target, below the content so the metadata and markers stay clickable */}
          <button
            type="button"
            aria-label={`${record.name}, ${record.station}. Press enter to ${record.slug ? "open the story" : "watch the reel"}.`}
            onKeyDown={onKeyDown}
            onClick={openRecord}
            className="absolute inset-0 z-0 w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
          {/* Wipe panel */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden
              initial={{ x: "100%" }}
              animate={panel}
              className="pointer-events-none absolute inset-0 z-30 bg-background"
            />
          )}

          <div className="editorial-container pointer-events-none relative z-10 flex min-h-[calc(84vh-7rem)] flex-col">
            <div className="h-px w-full bg-border" />

            <div
              data-record-metadata
              className="pointer-events-auto grid cursor-pointer gap-x-16 md:grid-cols-2"
              onClick={openRecord}
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
              data-record-markers
              className="pointer-events-auto flex items-center gap-2 pb-6"
              style={{ marginBottom: `calc(${headlineHeight}px + 1.5rem)` }}
            >
              {records.map((item, i) => (
                <button
                  key={item.key}
                  type="button"
                  aria-label={`Show ${item.name}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    goTo(i);
                  }}
                  className={`h-px transition-all duration-300 ${
                    i === displayed ? "w-16 bg-accent" : "w-6 record-marker-inactive"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Headline */}
          <div data-record-wordmark className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden">
            <div className="editorial-container pb-10 md:pb-14" ref={wordmarkContainerRef}>
              {/* Remount via key so the enter animation replays on each record change;
                  the swap is hidden under the wipe panel, so no exit animation is needed. */}
              <motion.div
                key={record.key}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 60, skewX: "8deg" }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, skewX: "0deg" }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, ease: [0.76, 0, 0.24, 1] }}
              >
                <p
                  className="max-w-5xl font-serif text-foreground break-words"
                  style={{ fontSize: "clamp(2.25rem, 7vw, 6.5rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
                >
                  {record.name}
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-accent">
                  {record.slug ? "Watch the story" : "Watch the reel"} <span aria-hidden>→</span>
                </p>
              </motion.div>
            </div>
          </div>
        </NightBand>

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
              Reporter. WGN-TV, Chicago.
            </motion.p>

            <motion.p
              initial={revealInitial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={revealTransition(0.6)}
              className="font-serif italic text-muted-foreground mb-8"
            >
              Raised on the West Side. Reporting for the whole city now.
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
              I cover breaking news and politics for WGN-TV in Chicago. Four-time Regional Emmy® Award Nominee, with three of those nominations this year.
            </motion.p>
          </div>
        </section>

        {/* Recognition */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="editorial-container">
            <FadeIn>
              <p className="text-xs text-accent tracking-widest uppercase mb-4">Recognition</p>
              <h2 className="font-serif text-headline text-foreground mb-8">Four Regional Emmy® nominations.</h2>
              <ul className="border-t border-border">
                {recognition.map((row) => {
                  const inner = (
                    <>
                      <span className="text-xs tabular-nums text-muted-foreground tracking-widest md:w-12">{row.year}</span>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground md:w-56">{row.chapter}</span>
                      <span className="font-serif text-lg text-foreground flex-1 group-hover:text-accent transition-colors duration-300">{row.story}</span>
                      <span className="text-sm text-muted-foreground md:w-60">{row.category}</span>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground md:w-16 md:text-right">{row.station}</span>
                    </>
                  );
                  const cls = "group flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:gap-6";
                  return (
                    <li key={row.story} className="border-b border-border">
                      {row.href ? <Link to={row.href} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Also: emcee, AACC Wisconsin 2023 Breakfast of Champions · Featured, Loyola Academy "Portrait of a Rambler"
              </p>
              <Link to="/about" className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent hover:text-foreground transition-colors duration-300">
                Full recognition <span aria-hidden>→</span>
              </Link>
            </FadeIn>
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
                    Live shots and stories from WGN-TV Chicago and WKYC Cleveland. Breaking news, severe weather, and politics.
                  </p>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
                    WGN-TV · WKYC-TV · Chicago & Cleveland · 2026
                  </p>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Button 
                      variant="editorial" 
                      size="sm" 
                      onClick={() => setSelectedVideo({ title: "Reporter Reel 2026", link: "https://youtu.be/sKE1ZCnN0e8" })}
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
                    onClick={() => setSelectedVideo({ title: "Reporter Reel 2026", link: "https://youtu.be/sKE1ZCnN0e8" })}
                    className="aspect-video relative group cursor-pointer overflow-hidden border border-border block w-full"
                  >
                    <motion.img 
                      src="https://img.youtube.com/vi/sKE1ZCnN0e8/hqdefault.jpg" 
                      alt="Bryant McCray reporter reel 2026, WGN-TV Chicago"
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
              {featuredWork.map(({ slug, date, category, frame, story }) => (
                <StaggerItem key={slug}>
                  <Link
                    to={`/stories/${slug}`}
                    aria-label={`Read the story: ${story.headline}`}
                    className="block group py-8 border-b border-border last:border-b-0"
                  >
                    <motion.div
                      className="flex flex-col md:flex-row md:items-start gap-6"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full md:w-72 flex-shrink-0 overflow-hidden">
                        <FreezeFrame
                          id={story.youtubeId}
                          variant={frame}
                          alt={`Bryant McCray, WGN-TV reporter, ${story.headline}`}
                          loading="lazy"
                          className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-xs text-accent tracking-widest uppercase mb-2">{category}</p>
                          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">WGN-TV · {date}</p>
                          <h3 className="font-serif text-2xl text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                            {story.headline}
                          </h3>
                          <p className="text-muted-foreground max-w-lg">{firstSentence(story.dek)}</p>
                        </div>
                        <div className="flex items-center text-muted-foreground group-hover:text-accent transition-colors duration-300">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
        {/* Quiet CTA */}
        <FadeIn className="py-24">
          <div className="editorial-container text-center">
            <p className="text-muted-foreground mb-6">
              Got a story, or a role I should know about? Email me.
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

        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>

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
