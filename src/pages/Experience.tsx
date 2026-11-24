import NightBand from "@/components/NightBand";
import headshotPortrait from "@/assets/bryant-headshot.jpeg";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, X } from "lucide-react";

import galleryEmmy from "@/assets/gallery-emmy.jpeg";
import galleryInterview1 from "@/assets/gallery-interview-1.jpeg";
import galleryInterview2 from "@/assets/gallery-interview-2.jpeg";
import galleryHosting from "@/assets/gallery-hosting.jpeg";
import galleryRambleLaugh from "@/assets/gallery-ramble-laugh.jpg";
import galleryRambleWalk from "@/assets/gallery-ramble-walk.jpg";
import galleryRambleInterview from "@/assets/gallery-ramble-interview.jpg";

const galleryImages = [
  { src: galleryEmmy, alt: "At the Chicago/Midwest Emmy Awards" },
  { src: galleryInterview1, alt: "Studio interview session" },
  { src: galleryInterview2, alt: "On-stage interview at theater" },
  { src: galleryHosting, alt: "Hosting an event" },
  { src: galleryRambleInterview, alt: "Interview for Loyola Academy's Ramble 2025 film" },
  { src: galleryRambleWalk, alt: "With Brittany McCray at Loyola Academy, Ramble 2025 film" },
  { src: galleryRambleLaugh, alt: "Behind the scenes, Loyola Academy's Ramble 2025 film" },
];

const experience = [
  {
    role: "General Assignment Reporter",
    organization: "WGN-TV",
    period: "May 2026 – Present",
    description: "Breaking news, severe weather, and state and national politics for Chicago's WGN-TV.",
  },
  {
    role: "Reporter",
    organization: "WKYC",
    period: "2024 – 2025",
    description: "Breaking news, crime and courts, and community stories across Northeast Ohio.",
  },
  {
    role: "Broadcast Reporter",
    organization: "CBS 58",
    period: "2022 – 2024",
    description: "Enterprise reporting and live breaking news coverage.",
  },
  {
    role: "Producer and Broadcast Reporter",
    organization: "WFRV",
    period: "2016 – 2017",
    description: "Story development, guest coordination, and segment production.",
  },
];

type Nomination = {
  category: string;
  title: string;
  credit: string;
  videoId: string;
};

type AwardEntry = {
  title: string;
  category: string;
  year: string;
  nominations?: Nomination[];
};

const awards: AwardEntry[] = [
  {
    title: "Three Emmy Nominations",
    category: "57th Great Lakes Emmy Awards · WKYC-TV, Cleveland",
    year: "2026",
    nominations: [
      {
        category: "Crime/Justice – News",
        title: "One Traffic Stop, An Unlikely Rescue",
        credit: "Reporter",
        videoId: "kdEjhUDVZiE",
      },
      {
        category: "Crime/Justice – News",
        title: "Break in a Cold Case: Arrest in the Murder of Aliza Sherman",
        credit: "Reporter, with Kelly Salandro, Sia Nyorkor, Joshua Bailey, Bailey Lustic, Frank Macek and Matthew Lawrence",
        videoId: "oXRPe8KKv8c",
      },
      {
        category: "Daily News Report (Single Shift)",
        title: "TikTok on the Clock as the Feed May Go Dark",
        credit: "Reporter",
        videoId: "kyz0-Brc8GI",
      },
    ],
  },
  {
    title: "Emmy Nomination",
    category: "Eye on AI: Deepfake Technology",
    year: "2023",
  },
  {
    title: "Nomination Newcomer of the Year",
    category: "Greater Cleveland Association of Black Journalists (GCABJ)",
    year: "2024",
  },
];

const affiliations = [
  "National Association of Black Journalists",
  "Milwaukee Press Club",
];

const Experience = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; videoId: string } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

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

  // Same video overlay as the Work page story modal.
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
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navigation />
        
        <NightBand className="pt-32 pb-16 md:pt-40 md:pb-20" portrait={{ src: headshotPortrait, alt: "Bryant McCray", position: "center top" }}>
          <div className="editorial-container">
            <FadeIn>
              <p className="text-xs text-accent tracking-widest uppercase mb-4">
                Experience
              </p>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="font-serif text-headline text-foreground mb-6">
                Professional Background
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground max-w-xl leading-relaxed mb-10">
                Green Bay, Milwaukee, Cleveland, now Chicago. Breaking news, live shots, and the people inside the story.
              </p>
            </FadeIn>


          </div>
        </NightBand>

        <section className="py-12">
          <div className="editorial-container">
            {/* Mini Gallery */}
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-sm cursor-pointer"
                    whileHover={{ scale: 1.15, zIndex: 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-background/20"
                      whileHover={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-2 bg-background/95 backdrop-blur-sm border-border">
            <AnimatePresence>
              {selectedImage && (
                <motion.img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>

        {/* Experience Timeline */}
        <section className="py-16 border-t border-border">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-2xl text-foreground mb-10">
                Career
              </h2>
            </FadeIn>
            
            <StaggerContainer className="space-y-0">
              {experience.map((item, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="py-8 border-b border-border last:border-b-0"
                    whileHover={{ x: 10, backgroundColor: "hsl(var(--secondary) / 0.3)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid md:grid-cols-12 gap-4">
                      <div className="md:col-span-3">
                        <p className="text-sm text-muted-foreground">
                          {item.period}
                        </p>
                      </div>
                      <div className="md:col-span-9">
                        <h3 className="font-serif text-xl text-foreground mb-1">
                          {item.role}
                        </h3>
                        <p className="text-accent text-sm mb-3">
                          {item.organization}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Awards */}
        <section className="py-16 border-t border-border bg-secondary/30">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-2xl text-foreground mb-10">
                Recognition
              </h2>
            </FadeIn>
            
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <StaggerItem
                  key={index}
                  className={award.nominations ? "md:col-span-3" : ""}
                >
                  <motion.div 
                    className="py-6"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs text-accent tracking-widest uppercase mb-2">
                      {award.year}
                    </p>
                    <h3 className="font-serif text-lg text-foreground mb-1">
                      {award.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {award.category}
                    </p>

                    {award.nominations && (
                      <div className="mt-6 grid gap-8 md:grid-cols-3">
                        {award.nominations.map((nomination) => (
                          <a
                            key={nomination.videoId}
                            href={`https://www.youtube.com/watch?v=${nomination.videoId}`}
                            aria-label={`Watch: ${nomination.title}`}
                            onClick={(event) => {
                              event.preventDefault();
                              setSelectedVideo({ title: nomination.title, videoId: nomination.videoId });
                            }}
                            className="group block"
                          >
                            <div className="relative aspect-video overflow-hidden border border-border bg-secondary mb-4">
                              <img
                                src={`https://i.ytimg.com/vi/${nomination.videoId}/hqdefault.jpg`}
                                alt=""
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                            </div>
                            <p className="text-xs text-accent tracking-widest uppercase mb-1">
                              {nomination.category}
                            </p>
                            <p className="font-serif text-foreground mb-1 transition-colors group-hover:text-accent">
                              “{nomination.title}”
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {nomination.credit}
                            </p>
                            <span className="mt-3 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground">
                              <Play size={12} strokeWidth={1.5} className="text-accent" />
                              Watch
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Affiliations */}
        <section className="py-16 border-t border-border">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-2xl text-foreground mb-10">
                Affiliations
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {affiliations.map((org, index) => (
                  <motion.p 
                    key={index} 
                    className="text-muted-foreground"
                    whileHover={{ color: "hsl(var(--accent))", x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {org}
                  </motion.p>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
        {videoOverlay}
      </main>
    </PageTransition>
  );
};

export default Experience;
