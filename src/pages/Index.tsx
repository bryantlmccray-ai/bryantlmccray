import NightBand from "@/components/NightBand";
import FeaturedVideo from "@/components/FeaturedVideo";
import Seo from "@/components/Seo";
import { Caption, Dateline, Overlap } from "@/components/Editorial";
import { stillCaption } from "@/lib/storyMeta";
import { stillSrcSet, REEL_ID, REEL_TITLE, REEL_LINK, REEL_POSTER, REEL_ALT } from "@/lib/stills";
import React, { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { stories } from "@/data/stories";
import { X } from "lucide-react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
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
  still?: string;
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
    still: story.still,
    frame,
    slug,
  })),
  { key: "reel-2026", name: "Reporter Reel 2026", reporter: "Bryant McCray", date: "2026", station: "WGN-TV · WKYC-TV", market: "Chicago & Cleveland", category: "Broadcast Reel", youtubeId: REEL_ID, still: REEL_POSTER, frame: "maxres1", link: REEL_LINK },
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

// A clean still from the WGN master wins; YouTube frames are only the fallback.
const FreezeFrame = ({ id, alt, className, loading, variant = "maxresdefault", still, sizes = "100vw" }: { id: string; alt: string; className?: string; loading?: "lazy" | "eager"; variant?: string; still?: string; sizes?: string }) => (
  <img
    src={still ?? `https://img.youtube.com/vi/${id}/${variant}.jpg`}
    srcSet={stillSrcSet(still)}
    sizes={sizes}
    width={1920}
    height={1080}
    decoding="async"
    alt={alt}
    loading={loading}
    className={className}
    onError={(e) => {
      const img = e.currentTarget;
      if (!still && !img.dataset.fallback) {
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
  className = "",
}: {
  className?: string;
  label: string;
  value: string;
  scramble: boolean;
  delay: number;
  cycle: number;
}) => {
  const display = useScramble(value.toUpperCase(), scramble, delay, 500, cycle);
  return (
    <div className={`flex items-baseline justify-between gap-6 border-b border-border py-3 ${className}`}>
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground record-meta-label">{label}</span>
      <span className="text-[11px] uppercase tracking-[0.1em] text-foreground text-right tabular-nums">
        {display}
      </span>
    </div>
  );
};

const featuredWork = heroStories;

// Primary: solid square button with plain text. Secondary: underlined text links.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HeroActions = (_props: { onWatch: () => void }) => (
  <>
    <a href="mailto:bryant.l.mccray@gmail.com" className="inline-flex min-h-11 items-center text-sm text-foreground underline decoration-1 underline-offset-[3px]">
      Email me
    </a>
    <a href="/Bryant_McCray_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-foreground underline decoration-1 underline-offset-[3px]">
      Résumé (PDF)
    </a>
  </>
);

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

  // Swipe between records on touch screens; auto-advance pauses while a finger is down.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    const t = event.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    setPaused(true);
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    setPaused(false);
    if (!start) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - start.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(t.clientY - start.y)) {
      event.preventDefault();
      goTo(dx < 0 ? (displayed + 1) % records.length : (displayed - 1 + records.length) % records.length);
    }
  };


  return (
    <PageTransition>
      <Seo title="Bryant McCray | TV News Reporter, WGN-TV Chicago" description="Bryant McCray, TV news reporter at WGN-TV Chicago and four-time Regional Emmy® nominee. Watch the 2026 reporter reel." path="/" />
      <main className="min-h-[100svh] bg-background overflow-x-clip">
        <Navigation />

        {/* Reel first: the application reel is the first screen */}
        <NightBand
          aria-labelledby="home-title"
          className="night-safe-x pb-14 pt-[calc(5rem+env(safe-area-inset-top)+2rem)] md:flex md:min-h-[88svh] md:items-center md:pb-20"
        >
          <div className="wide-container relative z-10 grid w-full gap-8 md:grid-cols-12 md:items-center md:gap-12">
            <div className="md:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">TV News Reporter · WGN-TV Chicago</p>
              <h1 id="home-title" className="font-serif text-foreground mb-5" style={{ fontSize: "clamp(2.5rem, 9vw, 4.5rem)", lineHeight: 1.02 }}>
                Bryant McCray
              </h1>
              <p className="text-base md:text-lg leading-[1.6] text-muted-foreground max-w-md">
                Four-time Regional Emmy® nominee. Breaking news, politics and the people inside the story.
              </p>
              <div className="hidden md:flex mt-8 flex-wrap items-center gap-x-6 gap-y-3">{/* desktop actions */}
                <HeroActions onWatch={() => setSelectedVideo({ title: REEL_TITLE, link: REEL_LINK })} />
              </div>
            </div>
            <div className="md:col-span-7">
              <FeaturedVideo
                youtubeId={REEL_ID}
                poster="/stills/bryant-skyline-lakefront.jpg"
                alt="Bryant McCray reporting live on the Chicago lakefront with the skyline behind him."
                title={REEL_TITLE}
                loop
                onWatchWithSound={() => setSelectedVideo({ title: REEL_TITLE, link: REEL_LINK })}
              />
            </div>
            <div className="flex flex-col items-start gap-2 md:hidden [&>button]:w-full">
              <HeroActions onWatch={() => setSelectedVideo({ title: REEL_TITLE, link: REEL_LINK })} />
            </div>
          </div>
        </NightBand>

        {/* Record Hero */}
        <NightBand
          portrait={{ src: "/stills/bryant-field-nwi.jpg", alt: "Bryant McCray reporting for WGN-TV in Northwest Indiana after the August 2026 storm", position: "50% 20%" }}
          portraitPlacement="record-gap"
          onClick={openRecord}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={() => { touchStart.current = null; setPaused(false); }}
          aria-roledescription="carousel"
          aria-label="WGN-TV stories"
          className="night-safe-x relative min-h-[84svh] w-full overflow-hidden overflow-x-hidden border-t border-border pt-12 md:pt-16"
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
              <FreezeFrame id={record.youtubeId} still={record.still} variant={record.frame} alt="" loading="lazy" className="h-full w-full object-cover" />
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

          <div className="editorial-container pointer-events-none relative z-10 flex min-h-[calc(84svh-4rem)] flex-col">
            <div className="h-px w-full bg-border" />

            <div
              data-record-metadata
              className="pointer-events-auto grid cursor-pointer gap-x-16 md:grid-cols-2"
              onClick={openRecord}
            >
              <div>
                <MetaRow label="Name" value={record.name} scramble={scramble} delay={450} cycle={displayed} />
                <MetaRow className="max-sm:hidden" label="Reporter" value={record.reporter} scramble={scramble} delay={490} cycle={displayed} />
                <MetaRow label="Date" value={record.date} scramble={scramble} delay={530} cycle={displayed} />
              </div>
              <div>
                <MetaRow label="Station" value={record.station} scramble={scramble} delay={570} cycle={displayed} />
                <MetaRow className="max-sm:hidden" label="Market" value={record.market} scramble={scramble} delay={610} cycle={displayed} />
                <MetaRow className="max-sm:hidden" label="Category" value={record.category} scramble={scramble} delay={650} cycle={displayed} />
              </div>
            </div>

            <div className="flex-1" />

            {/* Index markers */}
            <div
              data-record-markers
              className="pointer-events-auto -ml-2.5 flex items-center gap-0 pb-3"
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
                  aria-current={i === displayed ? "true" : undefined}
                  className="flex h-11 min-w-11 items-center justify-center px-2.5"
                >
                  <span
                    aria-hidden
                    className={`block h-px transition-all duration-300 ${
                      i === displayed ? "w-16 bg-accent" : "w-6 record-marker-inactive"
                    }`}
                  />
                </button>
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
                  style={{ fontSize: "clamp(1.875rem, 7vw, 6.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", overflowWrap: "normal", hyphens: "manual" }}
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
          <div className="editorial-container grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
            <h2 className="font-serif text-display text-foreground mb-6">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                >
                  Bryant
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                >
                  McCray
                </motion.span>
              </span>
            </h2>

            <motion.p
              className="text-subhead text-muted-foreground mb-3"
            >
              Reporter. WGN-TV, Chicago.
            </motion.p>

            <motion.p
              className="font-serif italic text-muted-foreground mb-8"
            >
              Raised on the West Side. Reporting for the whole city now.
            </motion.p>

            <motion.p
              className="text-lg text-foreground/80 leading-relaxed max-w-xl"
            >
              I cover breaking news and politics for WGN-TV in Chicago. Four-time Regional Emmy® Award Nominee, with three of those nominations this year.
            </motion.p>
            </div>
            <Overlap
              className="lg:col-span-6 lg:mt-6"
              main={{ src: "/stills/election-night-2026.jpg", alt: "Voters at the booths on Election Day 2026 in Chicago", caption: stillCaption(stories.find((s) => s.slug === "election-night-2026")!), sizes: "(min-width: 1024px) 420px, 100vw" }}
              inset={{ src: "/stills/bryant-skyline-lakefront.jpg", alt: "Bryant McCray reporting live on the Chicago lakefront with the skyline behind him.", caption: "Live on the lakefront, Election Night 2026. WGN-TV broadcast still.", sizes: "(min-width: 640px) 200px, 75vw", className: "object-top" }}
              insetClass="sm:-mt-[13%] sm:ml-[3%] sm:w-[44%]"
            />
          </div>
        </section>

        {/* Recognition */}
        <section className="py-16 md:py-20 border-t border-border">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Four Regional Emmy® nominations.</h2>
              <table className="w-full border-b border-border text-left">
                <caption className="sr-only">Regional Emmy nominations</caption>
                <thead className="max-md:sr-only">
                  <tr className="text-sm text-muted-foreground">
                    <th scope="col" className="py-2 pr-4 font-normal">Year</th>
                    <th scope="col" className="py-2 pr-4 font-normal">Honor</th>
                    <th scope="col" className="py-2 pr-4 font-normal">Story</th>
                    <th scope="col" className="py-2 font-normal md:text-right">Station</th>
                  </tr>
                </thead>
                <tbody>
                  {recognition.map((row) => (
                    <tr key={row.story} className="border-t border-border max-md:grid max-md:gap-1 max-md:py-4 align-baseline">
                      <td className="text-sm tabular-nums text-muted-foreground md:py-4 md:pr-4">{row.year}</td>
                      <td className="text-sm text-muted-foreground md:py-4 md:pr-4">{row.chapter}, {row.category}</td>
                      <td className="md:py-4 md:pr-4">
                        {row.href ? (
                          <Link to={row.href} className="link-plain inline-block py-2.5 -my-1 font-serif text-lg text-foreground">{row.story}</Link>
                        ) : (
                          <span className="font-serif text-lg text-foreground">{row.story}</span>
                        )}
                      </td>
                      <td className="text-sm text-muted-foreground md:py-4 md:text-right">{row.station}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-6 text-sm text-muted-foreground">
                Also: emcee, AACC Wisconsin 2023 Breakfast of Champions · Featured, Loyola Academy "Portrait of a Rambler"
              </p>
              <Link to="/about" className="mt-2 inline-flex min-h-11 items-center text-sm text-foreground underline decoration-1 underline-offset-[3px]">
                Full recognition
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Featured Work Preview */}
        <section className="py-20 border-t border-border">
          <div className="editorial-container">
            <FadeIn>
              <div className="flex items-baseline justify-between gap-6 mb-6">
                <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                  Selected Work
                </h2>
                <Link to="/work" className="inline-flex min-h-11 items-center text-sm text-foreground underline decoration-1 underline-offset-[3px]">
                  All work
                </Link>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">Four stories from my first year at WGN-TV. The rest are under All work.</p>
            </FadeIn>

            <StaggerContainer className="border-b border-border">
              {featuredWork.map(({ slug, date, category, frame, story }) => (
                <StaggerItem key={slug}>
                  <Link
                    to={`/stories/${slug}`}
                    aria-label={`Read the story: ${story.headline}`}
                    className="block group py-8 border-t border-border"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <figure className="w-full md:w-72 flex-shrink-0">
                        <div className="overflow-hidden">
                        <FreezeFrame
                          id={story.youtubeId}
                          still={story.still}
                          variant={frame}
                          sizes="(min-width: 768px) 288px, 100vw"
                          alt={`Bryant McCray, WGN-TV reporter, ${story.headline}`}
                          loading="lazy"
                          className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        </div>
                        {story.still && <Caption>{stillCaption(story)}</Caption>}
                      </figure>
                      <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-2">{category} · WGN-TV · {date}</p>
                          <h3 className="link-plain-target font-serif text-2xl text-foreground mb-2">
                            {story.headline}
                          </h3>
                          <p className="text-muted-foreground max-w-lg"><Dateline {...story.dateline} />{firstSentence(story.dek)}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
        {/* Quiet CTA */}
        <FadeIn className="py-20">
          <div className="editorial-container">
            <p className="text-foreground/80 mb-5">
              Got a story, or a role I should know about? Email me.
            </p>
            <Button variant="solid" asChild>
              <a href="mailto:bryant.l.mccray@gmail.com">Get in Touch</a>
            </Button>
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
                type="button"
                aria-label="Close video"
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 z-50 p-2.5 text-muted-foreground hover:text-foreground transition-colors"
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
