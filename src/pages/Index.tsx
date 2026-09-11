import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Volume2, VolumeX, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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
import splashHighlight from "@/assets/splash-reel-2026.mp4.asset.json";
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
  const [muted, setMuted] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const videoId = selectedVideo ? getYouTubeId(selectedVideo.link) : null;

  const tryUnmute = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.then === "function") {
      playAttempt.then(() => setMuted(false)).catch(() => {
        video.muted = true;
        setMuted(true);
      });
    } else {
      setMuted(false);
    }
  };

  const toggleMute = (event: React.MouseEvent) => {
    event.stopPropagation();
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.muted) {
      tryUnmute();
    } else {
      video.muted = true;
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
    events.forEach((event) =>
      window.addEventListener(event, onFirstInteract, { once: true, passive: true })
    );
    return () => {
      events.forEach((event) => window.removeEventListener(event, onFirstInteract));
    };
  }, []);

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
        
        {/* Hero Section */}
        <section className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
          <div className="editorial-container">
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-0">
              <div className="w-full md:w-[44%] lg:w-[48%] md:flex-none max-w-2xl z-10">
                <h1 className="font-serif text-display text-foreground mb-6">
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={revealTransition(0.15, 1)}
                    >
                      Bryant
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={revealTransition(0.3, 1)}
                    >
                      McCray
                    </motion.span>
                  </span>
                </h1>
                
                <motion.p 
                  initial={revealInitial}
                  animate={{ opacity: 1, y: 0 }}
                  transition={revealTransition(0.5)}
                  className="text-subhead text-muted-foreground mb-3"
                >
                  Journalist. Storyteller. Communication Strategist.
                </motion.p>

                <motion.p
                  initial={revealInitial}
                  animate={{ opacity: 1, y: 0 }}
                  transition={revealTransition(0.6)}
                  className="font-serif italic text-muted-foreground mb-8"
                >
                  The stories that shape us. The moments that matter.
                </motion.p>
                
                <motion.div 
                  initial={shouldReduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={revealTransition(0.65, 0.8)}
                  className="accent-line mb-8 origin-left" 
                />
                
                <motion.p 
                  initial={revealInitial}
                  animate={{ opacity: 1, y: 0 }}
                  transition={revealTransition(0.8)}
                  className="text-lg text-foreground/80 leading-relaxed max-w-xl"
                >
                  Four-time Emmy-nominated reporter at WGN-TV in Chicago, covering breaking news and politics.
                </motion.p>
              </div>
              
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={revealTransition(0.4, 1.2)}
                className="w-full md:w-[600px] lg:w-[750px] md:-mr-32 lg:-mr-48 relative group"
              >
                <motion.div
                  aria-hidden
                  className="absolute -inset-px rounded-sm bg-accent/30 blur-xl opacity-60"
                  animate={shouldReduceMotion ? undefined : { opacity: [0.4, 0.7, 0.4] }}
                  transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative overflow-hidden border border-accent/40 rounded-sm shadow-2xl bg-foreground">
                  <video
                    ref={heroVideoRef}
                    src={splashHighlight.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-[115%] max-w-none -ml-[7.5%] block transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-background/5" />
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full bg-foreground/60 hover:bg-foreground/80 text-background px-3 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur transition-colors"
                  >
                    {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{muted ? "Tap for sound" : "Sound on"}</span>
                  </button>
                </div>
              </motion.div>
            </div>
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
