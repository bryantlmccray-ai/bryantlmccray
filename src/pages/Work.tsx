import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Helmet } from "react-helmet-async";
import Seo from "@/components/Seo";
import { stories, type Story } from "@/data/stories";
import { syndication } from "@/data/syndication";
import { stillSrcSet, REEL_LINK, REEL_TITLE } from "@/lib/stills";
import justiceThumb from "@/assets/12-years-justice-thumbnail.jpeg";
import pressReelThumbnail from "@/assets/press-reel-thumbnail.png";
import hazardousRoadsThumb from "@/assets/hazardous-roads-thumbnail.jpg";


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

const workItems: { title: string; category: string; description: string; year: string; station: string; market: string; thumbnail: string; link: string; alt?: string }[] = [
  {
    title: REEL_TITLE,
    category: "On-Air Segments",
    description: "Live shots and stories from WGN-TV Chicago and WKYC Cleveland. Breaking news, severe weather, and politics.",
    year: "2026",
    station: "WGN-TV · WKYC-TV",
    market: "Chicago & Cleveland",
    thumbnail: "/stills/reporter-reel-2026.jpg",
    alt: "Bryant McCray reporting live for WGN-TV in West Englewood",
    link: REEL_LINK,
  },
  {
    title: "One Traffic Stop, An Unlikely Rescue",
    category: "Culture & Community",
    description: "A traffic stop, a raccoon, and a meth pipe. Nominated for a 2026 Great Lakes Emmy in Crime/Justice News.",
    year: "2025",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/kdEjhUDVZiE/hqdefault.jpg",
    link: "https://youtu.be/kdEjhUDVZiE",
  },
  {
    title: "Four Dead in a West Englewood Fire",
    category: "Breaking News",
    description: "Two children and two adults die after a fire tears through a South Paulina home. A son stands outside what is left of his parents' house.",
    year: "2026",
    station: "WGN-TV",
    market: "Chicago",
    thumbnail: "/stills/englewood-fire.jpg",
    link: "https://youtu.be/PItaO0WWoXA",
  },
  {
    title: "Flash Flooding in Dolton",
    category: "Breaking News",
    description: "Live at 144th and State, walking viewers through four feet of standing water as a tow truck pulls stranded cars out.",
    year: "2026",
    station: "WGN-TV",
    market: "Chicago",
    thumbnail: "https://img.youtube.com/vi/z13ABz3426A/mqdefault.jpg",
    link: "https://youtu.be/z13ABz3426A",
  },
  {
    title: "Pritzker Signs the Nation's Toughest AI Safety Law",
    category: "Enterprise Reporting",
    description: "Illinois takes on the frontier AI companies with mandatory audits, whistleblower protections, and penalties up to three million dollars. What Senate Bill 315 actually does.",
    year: "2026",
    station: "WGN-TV",
    market: "Chicago",
    thumbnail: "/stills/ai-safety-law.jpg",
    link: "https://youtu.be/KVdYVU2TNJU",
  },
  {
    title: "The U.S. and Iran Reach a Deal",
    category: "Enterprise Reporting",
    description: "A deal to reopen the passage that carries one fifth of the world's oil, and the 60 day clock on the question nobody has solved yet.",
    year: "2026",
    station: "WGN-TV",
    market: "Chicago",
    thumbnail: "https://img.youtube.com/vi/Cdb3Ld1Hpfc/mqdefault.jpg",
    link: "https://youtu.be/Cdb3Ld1Hpfc",
  },
  {
    title: "The Bears, Chicago, and the Indiana Question",
    category: "Enterprise Reporting",
    description: "The governor points to years of fumbles. A suburban Republican drafts his own bill. Inside the fight to keep the Bears from crossing state lines.",
    year: "2026",
    station: "WGN-TV",
    market: "Chicago",
    thumbnail: "https://img.youtube.com/vi/-Wcr1Zvmvfc/mqdefault.jpg",
    link: "https://youtu.be/-Wcr1Zvmvfc",
  },
  {
    title: "12 Years to Justice",
    category: "Investigation",
    description: "A nurse murdered in broad daylight, and 12 years later, her own divorce attorney is charged with the crime.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: justiceThumb,
    link: "https://www.youtube.com/watch?v=oXRPe8KKv8c",
  },
  {
    title: "Deputy-Involved Shooting at Staples",
    category: "Breaking News",
    description: "Breaking coverage of a fatal deputy-involved shooting in a Staples parking lot, with live reporting from the scene.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/YsZdpk5RJ3w/mqdefault.jpg",
    link: "https://youtu.be/YsZdpk5RJ3w",
  },
  {
    title: "Shots Fired in Wooster",
    category: "Breaking News",
    description: "Breaking coverage of an officer-involved shooting that shook a quiet Ohio community.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/MHjfBwxI8OM/mqdefault.jpg",
    link: "https://youtu.be/MHjfBwxI8OM",
  },
  {
    title: "Double Shooting at Apartment Complex",
    category: "Breaking News",
    description: "Breaking coverage as a man and woman are shot at a local apartment complex, with police investigating the scene.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/3knlPCluuCI/mqdefault.jpg",
    link: "https://youtu.be/3knlPCluuCI",
  },
  {
    title: "Tragedy in the Skies",
    category: "Breaking News",
    description: "A fatal plane crash in Tuscarawas County leaves investigators searching for answers.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/o4EkSIXOqlI/mqdefault.jpg",
    link: "https://youtu.be/o4EkSIXOqlI",
  },
  {
    title: "The TikTok Question",
    category: "Enterprise Reporting",
    description: "As a potential ban looms, exploring what's at stake for creators, businesses, and national security.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/kyz0-Brc8GI/mqdefault.jpg",
    link: "https://youtu.be/kyz0-Brc8GI",
  },
  {
    title: "A Shared Purpose",
    category: "Culture & Community",
    description: "A pastor and his wife, both activists, share not just a birthday but a lifelong mission for change.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/Y0PQ2o0cTZw/mqdefault.jpg",
    link: "https://www.youtube.com/watch?v=Y0PQ2o0cTZw",
  },
  {
    title: "Healing in the Stacks",
    category: "Culture & Community",
    description: "After a shooting at a Shaker Heights library, a community finds its way back together.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/ervpUsDZP1k/mqdefault.jpg",
    link: "https://www.youtube.com/watch?v=ervpUsDZP1k",
  },
  {
    title: "Home for the Holidays",
    category: "Culture & Community",
    description: "A heartwarming look at what it means to come home, and the people who make it possible.",
    year: "2023",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/ADHN2dIr-ZA/mqdefault.jpg",
    link: "https://youtu.be/ADHN2dIr-ZA",
  },
  {
    title: "After the Storm",
    category: "Culture & Community",
    description: "How one community rallied together to help Hurricane Helene victims rebuild their lives.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/ss6WG4hkhUw/mqdefault.jpg",
    link: "https://youtu.be/ss6WG4hkhUw",
  },
  {
    title: "Whiteout in Northeast Ohio",
    category: "Culture & Community",
    description: "Live coverage as a winter storm blankets the region, bringing hazardous roads and community resilience.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: hazardousRoadsThumb,
    link: "https://youtu.be/W_MycGns4b4",
  },
  {
    title: "Downtown Cleveland Comes Alive",
    category: "Culture & Community",
    description: "A look at a bustling Friday night in downtown Cleveland as residents and visitors fill the streets.",
    year: "2023",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: "https://img.youtube.com/vi/Q5GPykcqaAE/mqdefault.jpg",
    link: "https://youtu.be/Q5GPykcqaAE",
  },
  {
    title: "On-Air Highlights",
    category: "On-Air Segments",
    description: "A collection of on-air segments showcasing breaking news coverage, enterprise reporting, and community-driven storytelling.",
    year: "2024",
    station: "WKYC-TV",
    market: "Cleveland",
    thumbnail: pressReelThumbnail,
    link: "https://www.youtube.com/watch?v=popbs1y_L9A",
  },
];

const STORY_CATEGORY: Record<string, string> = {
  "nwi-storm-series": "Breaking News",
  "election-night-2026": "Politics",
  "bears-stadium-fight": "Politics",
  "amtrak-rail-yard": "Community",
};

// "WGN NEWS · NOVEMBER 2026 · CHICAGO" -> "November 2026"
const storyDate = (story: Story) => {
  const part = story.kicker.split("·")[1]?.trim() ?? "";
  return part.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

const firstSentence = (text: string) => {
  const match = text.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
};

const storyImage = (story: Story) => story.still ?? `https://i.ytimg.com/vi/${story.youtubeId}/hqdefault.jpg`;

// One row of an editorial list: date and text left, small photo right, hairline above.
type RowProps = { index?: number; image: string; alt: string; meta: string; headline: string; dek: string };

const ListRow = ({ index, image, alt, meta, headline, dek }: RowProps) => (
  <div className="flex gap-5 py-6 md:gap-8">
    {index !== undefined && <span className="w-6 shrink-0 pt-1 text-sm tabular-nums text-muted-foreground">{String(index).padStart(2, "0")}</span>}
    <div className="min-w-0 flex-1">
      <p className="text-sm text-muted-foreground mb-1">{meta}</p>
      <h3 className="link-plain-target font-serif text-xl md:text-2xl text-foreground leading-snug mb-1">{headline}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-[60ch]">{dek}</p>
    </div>
    <div className="w-24 shrink-0 overflow-hidden md:w-40">
      <img src={image} srcSet={stillSrcSet(image)} sizes="160px" width={1920} height={1080} alt={alt} loading="lazy" decoding="async" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
  </div>
);

const scrollTop = () => window.scrollTo({ top: 0, behavior: "instant" });

const Work = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; link: string } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const wgnStories = stories.filter((story) => story.still);
  // Lead with range: one hard-news story beside one people story.
  const PAIR = [
    { slug: "election-night-2026", label: "Hard news" },
    { slug: "nwi-storm-series", label: "People" },
  ];
  const pair = PAIR.map((p) => ({ ...p, story: wgnStories.find((s) => s.slug === p.slug) })).filter((p): p is { slug: string; label: string; story: Story } => !!p.story);
  const rest = wgnStories.filter((s) => !PAIR.some((p) => p.slug === s.slug));
  const moreWgn = workItems.filter((item) => item.station.startsWith("WGN"));
  const beforeChicago = workItems.filter((item) => !item.station.startsWith("WGN"));

  const workRow = (item: (typeof workItems)[number]) => (
    <li key={item.link} className="border-t border-border">
      <button
        type="button"
        onClick={() => setSelectedVideo({ title: item.title, link: item.link })}
        aria-label={`Watch: ${item.title}`}
        className="group block w-full text-left"
      >
        <ListRow
          image={item.thumbnail}
          alt={item.alt ?? `Bryant McCray, ${item.station} reporter, ${item.title}`}
          meta={`${item.year} · ${item.station}, ${item.market}`}
          headline={item.title}
          dek={item.description}
        />
      </button>
    </li>
  );

  const videoId = selectedVideo ? getYouTubeId(selectedVideo.link) : null;

  useEffect(() => {
    if (!selectedVideo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedVideo(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedVideo]);

  const videoOverlay = typeof document !== "undefined" && createPortal(
    <AnimatePresence>
      {selectedVideo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={selectedVideo.title}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-x-hidden bg-foreground/90 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.3, ease: "easeOut" }}
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            className="relative w-full max-w-4xl bg-background"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            transition={reduceMotion
              ? { duration: 0.2, ease: "easeOut" }
              : { type: "spring", stiffness: 280, damping: 28, mass: 0.8 }}
            onAnimationComplete={() => closeButtonRef.current?.focus({ preventScroll: true })}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close video"
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 z-50 p-2.5 text-primary-foreground hover:text-accent transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            {videoId && (
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );

  return (
    <PageTransition>
      <Seo title="Work | Bryant McCray, TV Reporter, Chicago" description="Breaking news, politics and community stories reported by Bryant McCray for WGN-TV Chicago, WKYC Cleveland and CBS 58 Milwaukee." path="/work" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: syndication.map((piece, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "NewsArticle",
                headline: piece.headline,
                url: piece.url,
                publisher: { "@type": "Organization", name: piece.outlet },
                author: {
                  "@type": "Person",
                  "@id": "https://bryantmccray.com/#bryant",
                  name: "Bryant McCray",
                },
              },
            })),
          }).replace(/</g, "\\u003c")}
        </script>
      </Helmet>
      <main className="min-h-[100svh] overflow-x-hidden bg-background">
        <Navigation />
        
        <header className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="editorial-container">
            <h1 className="font-serif text-headline text-foreground mb-6">Selected Reporting</h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Selected reporting and on-air work spanning breaking news, enterprise 
              storytelling, and community-driven journalism.
            </p>
          </div>
        </header>

        {/* Lead pair: hard news and people */}
        <section className="pb-12 md:pb-16">
          <div className="editorial-container">
            <ul className="grid gap-10 border-t border-border pt-10 md:grid-cols-2">
              {pair.map(({ slug, label, story }) => (
                <li key={slug}>
                  <Link to={`/stories/${slug}`} onClick={scrollTop} className="group block">
                    <div className="overflow-hidden mb-5">
                      <img
                        src={storyImage(story)}
                        srcSet={stillSrcSet(storyImage(story))}
                        sizes="(min-width: 768px) 420px, 100vw"
                        width={1920}
                        height={1080}
                        decoding="async"
                        alt={`From Bryant McCray's WGN-TV report: ${story.headline}`}
                        className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{label} · WGN-TV · {storyDate(story)}</p>
                    <h2 className="link-plain-target font-serif text-2xl md:text-3xl text-foreground leading-tight mb-2">{story.headline}</h2>
                    <p className="text-base text-muted-foreground leading-[1.6]">{firstSentence(story.dek)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Remaining WGN stories: numbered list */}
        <section className="pb-16 md:pb-20">
          <div className="editorial-container">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">More WGN stories</h2>
            <ol className="border-b border-border">
              {rest.map((story, i) => (
                <li key={story.slug} className="border-t border-border">
                  <Link to={`/stories/${story.slug}`} onClick={scrollTop} className="group block">
                    <ListRow
                      index={i + 1}
                      image={storyImage(story)}
                      alt={`From Bryant McCray's WGN-TV report: ${story.headline}`}
                      meta={`${STORY_CATEGORY[story.slug] ?? "WGN-TV"} · WGN-TV · ${storyDate(story)}`}
                      headline={story.headline}
                      dek={firstSentence(story.dek)}
                    />
                  </Link>
                </li>
              ))}
              {moreWgn.map(workRow)}
            </ol>
          </div>
        </section>

        {/* Syndication */}
        <section className="py-12 md:py-16">
          <div className="editorial-container">
            <h2 className="font-serif text-2xl text-foreground mb-4">Carried nationally</h2>
            <p className="text-muted-foreground max-w-xl leading-relaxed mb-8">
              My WGN reporting, as published by NewsNation and Nexstar stations across the Midwest.
            </p>
            <ul className="border-b border-border">
              {syndication.map((piece) => (
                <li key={piece.url}>
                  <a
                    href={piece.url}
                    target="_blank"
                    rel="noopener"
                    className="group block border-t border-border py-6"
                  >
                    <p className="text-sm text-muted-foreground mb-2">{piece.outlet} · {piece.scope}</p>
                    <h3 className="link-plain-target font-serif text-lg md:text-xl text-foreground leading-snug">
                      {piece.headline}
                    </h3>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Before Chicago */}
        <section className="py-12 md:py-16">
          <div className="editorial-container">
            <h2 className="font-serif text-2xl text-foreground mb-4">Before Chicago</h2>
            <ul className="border-b border-border">
              {beforeChicago.map((item) => (
                <li key={item.link} className="border-t border-border">
                  <button
                    type="button"
                    onClick={() => setSelectedVideo({ title: item.title, link: item.link })}
                    aria-label={`Watch: ${item.title}`}
                    className="group grid w-full gap-1 py-4 text-left md:grid-cols-12 md:items-baseline md:gap-6"
                  >
                    <span className="text-sm tabular-nums text-muted-foreground md:col-span-2">{item.year}</span>
                    <span className="link-plain-target font-serif text-lg text-foreground md:col-span-7">{item.title}</span>
                    <span className="text-sm text-muted-foreground md:col-span-3 md:text-right">{item.station}, {item.market}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* McCray Ventures Link */}
        <div className="editorial-container pb-8">
          <Link to="/mccray-ventures" onClick={() => window.scrollTo(0, 0)} className="inline-flex min-h-11 items-center text-[11px] text-muted-foreground hover:text-accent transition-colors duration-300 underline-offset-2 hover:underline">
            McCray Ventures, LLC
          </Link>
        </div>

        <Footer />
        {videoOverlay}
      </main>
    </PageTransition>
  );
};

export default Work;
