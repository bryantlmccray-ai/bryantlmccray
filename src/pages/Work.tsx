import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, useSpring } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn } from "@/components/ScrollAnimations";
import justiceThumb from "@/assets/12-years-justice-thumbnail.jpeg";
import pressReelThumbnail from "@/assets/press-reel-thumbnail.png";
import hazardousRoadsThumb from "@/assets/hazardous-roads-thumbnail.jpg";

const StoryWall = lazy(() => import("@/components/StoryWall"));

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
const categories = [
  "All",
  "Breaking News",
  "Investigation",
  "Enterprise Reporting",
  "Culture & Community",
  "On-Air Segments",
];

const workItems = [
  {
    title: "Reporter Reel 2026",
    category: "On-Air Segments",
    description: "Seven live standups and three full stories from WGN-TV Chicago. Breaking news, severe weather, and state and national politics.",
    year: "2026",
    station: "WGN-TV",
    market: "Chicago",
    thumbnail: "https://img.youtube.com/vi/F9po9pUJWio/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=F9po9pUJWio",
  },
  {
    title: "SWAT Officer Shot in Albany Park",
    category: "Breaking News",
    description: "A Chicago SWAT officer is shot during an operation on the northwest side, and a quiet residential block wakes up to an army of first responders.",
    year: "2026",
    station: "WGN-TV",
    market: "Chicago",
    thumbnail: "https://img.youtube.com/vi/hjqzhQUIyt8/mqdefault.jpg",
    link: "https://youtu.be/hjqzhQUIyt8",
  },
  {
    title: "Four Dead in a West Englewood Fire",
    category: "Breaking News",
    description: "Two children and two adults die after a fire tears through a South Paulina home. A son stands outside what is left of his parents' house.",
    year: "2026",
    station: "WGN-TV",
    market: "Chicago",
    thumbnail: "https://img.youtube.com/vi/PItaO0WWoXA/mqdefault.jpg",
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
    thumbnail: "https://img.youtube.com/vi/KVdYVU2TNJU/mqdefault.jpg",
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
    description: "A nurse murdered in broad daylight—and 12 years later, her own divorce attorney is charged with the crime.",
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
    description: "A heartwarming look at what it means to come home—and the people who make it possible.",
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

type StoryThumbnailProps = {
  thumbnail: string;
  title: string;
  videoOpen: boolean;
};

const StoryThumbnail = ({ thumbnail, title, videoOpen }: StoryThumbnailProps) => {
  const [hovered, setHovered] = useState(false);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 24, mass: 0.45 });
  const y = useSpring(0, { stiffness: 260, damping: 24, mass: 0.45 });

  useEffect(() => {
    if (!hovered) return;

    let frame = 0;
    const positionCue = () => {
      const surface = surfaceRef.current;
      const cue = cueRef.current;
      if (surface && cue) {
        const bounds = surface.getBoundingClientRect();
        const cueWidth = cue.offsetWidth;
        const cueHeight = cue.offsetHeight;
        const pointerX = pointerRef.current.x - bounds.left;
        const pointerY = pointerRef.current.y - bounds.top;
        const offset = 8;
        const nextX = pointerX + offset + cueWidth <= bounds.width
          ? pointerX + offset
          : pointerX - offset - cueWidth;
        const nextY = pointerY + offset + cueHeight <= bounds.height
          ? pointerY + offset
          : pointerY - offset - cueHeight;

        x.set(Math.max(0, Math.min(nextX, bounds.width - cueWidth)));
        y.set(Math.max(0, Math.min(nextY, bounds.height - cueHeight)));
      }
      frame = window.requestAnimationFrame(positionCue);
    };

    frame = window.requestAnimationFrame(positionCue);
    return () => window.cancelAnimationFrame(frame);
  }, [hovered, x, y]);

  const moveCue = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
  };

  return (
    <div
      ref={surfaceRef}
      className="aspect-video border border-border overflow-hidden relative"
      onPointerEnter={(event) => {
        setHovered(true);
        moveCue(event);
      }}
      onPointerMove={moveCue}
      onPointerLeave={() => {
        setHovered(false);
      }}
      onPointerDown={() => {
        setHovered(false);
      }}
    >
      <motion.div className="absolute inset-0" whileHover={{ scale: 1.02 }}>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-300" />
      </motion.div>
      <motion.div
        ref={cueRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 inline-flex w-max max-w-full items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary-foreground mix-blend-exclusion"
        style={{ x, y }}
        animate={{ opacity: hovered && !videoOpen ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.15, ease: "easeOut" }}
      >
        <Play className="h-4 w-4 fill-current" />
        <span>Play</span>
      </motion.div>
    </div>
  );
};


const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; link: string } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const filteredWork = activeCategory === "All" 
    ? workItems 
    : workItems.filter(item => item.category === activeCategory);

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
      <main className="min-h-screen overflow-x-hidden bg-background">
        <Navigation />
        
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="editorial-container">
            <FadeIn>
              <p className="text-xs text-accent tracking-widest uppercase mb-4">
                Work
              </p>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="font-serif text-headline text-foreground mb-6">
                Selected Reporting
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground max-w-xl leading-relaxed">
                Selected reporting and on-air work spanning breaking news, enterprise 
                storytelling, and community-driven journalism.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="story-wall-section">
          <style>{`
            @media (max-width: 767px) {
              .story-wall-section { display: none; }
            }
          `}</style>
          <div className="editorial-container">
            <Suspense fallback={null}>
              <StoryWall
                stories={filteredWork}
                onSelect={(story) => setSelectedVideo({ title: story.title, link: story.link })}
                fallback={null}
              />
            </Suspense>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 border-y border-border sticky top-20 bg-background/95 backdrop-blur-sm z-40">
          <div className="editorial-container">
            <div className="flex flex-wrap gap-6">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-sm transition-colors duration-300 relative ${
                    activeCategory === category
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Work Grid */}
        {/* NOTE: If a category with no items is added back, render the empty state outside the AnimatePresence wrapper and only mount the animated list when filteredWork.length > 0. */}
        <section className="py-16">
          <div className="editorial-container">
            <div className="space-y-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredWork.map((item, index) => (

                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => setSelectedVideo({ title: item.title, link: item.link })}
                        className="group block py-10 border-b border-border cursor-pointer w-full text-left"
                      >
                        <motion.div 
                          className="grid md:grid-cols-12 gap-6 items-start"
                          whileHover={{ x: 10 }}
                        >
                          {/* Thumbnail */}
                          <div className="md:col-span-4">
                            <StoryThumbnail
                              thumbnail={item.thumbnail}
                              title={item.title}
                              videoOpen={selectedVideo !== null}
                            />
                          </div>

                          {/* Content */}
                          <div className="md:col-span-8">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-4 mb-2">
                                  <p className="text-xs text-accent tracking-widest uppercase">
                                    {item.category}
                                  </p>
                                </div>
                                <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">
                                  {item.station} · {item.market} · {item.year}
                                </p>

                                <h2 className="font-serif text-2xl text-foreground group-hover:text-accent transition-colors duration-300 mb-3">
                                  {item.title}
                                </h2>
                                <p className="text-muted-foreground max-w-lg">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
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
