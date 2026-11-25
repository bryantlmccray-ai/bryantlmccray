import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Helmet } from "react-helmet-async";
import { stories, type Story } from "@/data/stories";
import { syndication } from "@/data/syndication";
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

const workItems = [
  {
    title: "Reporter Reel 2026",
    category: "On-Air Segments",
    description: "Live shots and stories from WGN-TV Chicago and WKYC Cleveland. Breaking news, severe weather, and politics.",
    year: "2026",
    station: "WGN-TV · WKYC-TV",
    market: "Chicago & Cleveland",
    thumbnail: "https://img.youtube.com/vi/sKE1ZCnN0e8/hqdefault.jpg",
    link: "https://youtu.be/sKE1ZCnN0e8",
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

type CardProps = { image: string; alt: string; category: string; headline: string; dateLine: string; dek: string };

const CardBody = ({ image, alt, category, headline, dateLine, dek }: CardProps) => (
  <>
    <div className="overflow-hidden border border-border mb-5">
      <img src={image} alt={alt} loading="lazy" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <p className="text-xs text-accent tracking-widest uppercase mb-2">{category}</p>
    <h3 className="font-serif text-xl md:text-2xl text-foreground leading-snug group-hover:text-accent transition-colors duration-300 mb-2">{headline}</h3>
    <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">{dateLine}</p>
    <p className="text-sm text-muted-foreground leading-relaxed">{dek}</p>
  </>
);

const scrollTop = () => window.scrollTo({ top: 0, behavior: "instant" });

const Work = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; link: string } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const wgnStories = stories.filter((story) => story.still);
  const [lead, ...rest] = wgnStories;
  const moreWgn = workItems.filter((item) => item.station.startsWith("WGN"));
  const beforeChicago = workItems.filter((item) => !item.station.startsWith("WGN"));

  const workCard = (item: (typeof workItems)[number]) => (
    <li key={item.link}>
      <button
        type="button"
        onClick={() => setSelectedVideo({ title: item.title, link: item.link })}
        aria-label={`Watch: ${item.title}`}
        className="group block w-full text-left"
      >
        <CardBody
          image={item.thumbnail}
          alt={`Bryant McCray, ${item.station} reporter, ${item.title}`}
          category={item.category}
          headline={item.title}
          dateLine={`${item.station} · ${item.market} · ${item.year}`}
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
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-x-hidden bg-foreground/90 p-4 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.3, ease: "easeOut" }}
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            className="relative w-full max-w-4xl bg-background border border-border"
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
              className="absolute -top-10 right-0 z-50 p-2 text-primary-foreground hover:text-accent transition-colors"
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
      <main className="min-h-screen overflow-x-hidden bg-background">
        <Navigation />
        
        <header className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="editorial-container">
            <p className="text-xs text-accent tracking-widest uppercase mb-4">Work</p>
            <h1 className="font-serif text-headline text-foreground mb-6">Selected Reporting</h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Selected reporting and on-air work spanning breaking news, enterprise 
              storytelling, and community-driven journalism.
            </p>
          </div>
        </header>

        {/* Lead story */}
        {lead && (
          <section className="pb-12 md:pb-16">
            <div className="editorial-container">
              <Link to={`/stories/${lead.slug}`} onClick={scrollTop} className="group grid gap-8 border-t border-border pt-10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-7 overflow-hidden border border-border">
                  <img
                    src={storyImage(lead)}
                    alt={`From Bryant McCray's WGN-TV report: ${lead.headline}`}
                    className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="md:col-span-5">
                  <p className="text-xs text-accent tracking-widest uppercase mb-3">{STORY_CATEGORY[lead.slug] ?? "WGN-TV"}</p>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight group-hover:text-accent transition-colors duration-300 mb-4">{lead.headline}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{lead.dek}</p>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase">WGN-TV · {storyDate(lead)}</p>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Remaining WGN stories */}
        <section className="pb-16 md:pb-20">
          <div className="editorial-container">
            <ul className="grid gap-10 border-t border-border pt-10 md:grid-cols-3">
              {rest.map((story) => (
                <li key={story.slug}>
                  <Link to={`/stories/${story.slug}`} onClick={scrollTop} className="group block">
                    <CardBody
                      image={storyImage(story)}
                      alt={`From Bryant McCray's WGN-TV report: ${story.headline}`}
                      category={STORY_CATEGORY[story.slug] ?? "WGN-TV"}
                      headline={story.headline}
                      dateLine={`WGN-TV · ${storyDate(story)}`}
                      dek={firstSentence(story.dek)}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* More WGN reporting */}
        <section className="pb-16 md:pb-20">
          <div className="editorial-container">
            <p className="text-xs text-accent uppercase tracking-widest mb-6">More from WGN-TV</p>
            <ul className="grid gap-10 border-t border-border pt-10 md:grid-cols-3">
              {moreWgn.map(workCard)}
            </ul>
          </div>
        </section>

        {/* Syndication */}
        <section className="py-12 md:py-16">
          <div className="editorial-container">
            <p className="text-xs text-accent uppercase tracking-widest mb-4">Carried nationally</p>
            <p className="text-muted-foreground max-w-xl leading-relaxed mb-8">
              My WGN reporting, as published by NewsNation and Nexstar stations across the Midwest.
            </p>
            <ul className="border-t border-border">
              {syndication.map((piece) => (
                <li key={piece.url}>
                  <a
                    href={piece.url}
                    target="_blank"
                    rel="noopener"
                    className="group block border-b border-border py-6"
                  >
                    <p className="text-xs uppercase tracking-widest leading-relaxed mb-3">
                      <span className="text-accent">{piece.outlet}</span>
                      <span className="text-muted-foreground"> · {piece.scope}</span>
                    </p>
                    <h2 className="font-serif text-lg md:text-xl text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
                      {piece.headline}
                    </h2>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Before Chicago */}
        <section className="py-12 md:py-16">
          <div className="editorial-container">
            <p className="text-xs text-accent uppercase tracking-widest mb-6">Before Chicago</p>
            <ul className="grid gap-10 border-t border-border pt-10 md:grid-cols-3">
              {beforeChicago.map(workCard)}
            </ul>
          </div>
        </section>

        {/* McCray Ventures Link */}
        <div className="editorial-container pb-8">
          <Link to="/mccray-ventures" onClick={() => window.scrollTo(0, 0)} className="text-[10px] text-muted-foreground hover:text-accent transition-colors duration-300 underline-offset-2 hover:underline">
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
