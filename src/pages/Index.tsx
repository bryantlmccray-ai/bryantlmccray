import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, X } from "lucide-react";
import { motion } from "framer-motion";
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
import heroAnimation from "@/assets/hero-animation.mp4";
import pressReelThumbnail from "@/assets/press-reel-thumbnail.png";
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
  },
  {
    title: "Healing in the Stacks",
    category: "Community",
    description: "After a shooting at a Shaker Heights library, a community finds its way back together.",
    link: "https://www.youtube.com/watch?v=ervpUsDZP1k&t=43s",
    thumbnail: "https://img.youtube.com/vi/ervpUsDZP1k/mqdefault.jpg",
  },
  {
    title: "12 Years to Justice",
    category: "Investigation",
    description: "A nurse murdered in broad daylight—and 12 years later, her own divorce attorney is charged with the crime.",
    link: "https://www.youtube.com/watch?v=oXRPe8KKv8c",
    thumbnail: justiceThumb,
  },
];

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; link: string } | null>(null);
  const videoId = selectedVideo ? getYouTubeId(selectedVideo.link) : null;

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
          <div className="editorial-container">
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-0">
              <div className="flex-1 max-w-2xl z-10">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-display text-foreground mb-6"
                >
                  Bryant McCray
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-subhead text-muted-foreground mb-8"
                >
                  Journalist. Storyteller. Communication Strategist.
                </motion.p>
                
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="accent-line mb-8 origin-left" 
                />
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-lg text-foreground/80 leading-relaxed max-w-xl"
                >
                  Emmy-nominated reporter covering culture, community, and local change.
                </motion.p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full md:w-[600px] lg:w-[750px] md:-mr-32 lg:-mr-48 overflow-hidden"
              >
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-[115%] max-w-none -ml-[7.5%]"
                >
                  <source src={heroAnimation} type="video/mp4" />
                </video>
              </motion.div>
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
                    On-Air Highlights
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    A collection of on-air segments showcasing breaking news coverage, 
                    enterprise reporting, and community-driven storytelling.
                  </p>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Button 
                      variant="editorial" 
                      size="sm" 
                      onClick={() => setSelectedVideo({ title: "On-Air Highlights", link: "https://www.youtube.com/watch?v=popbs1y_L9A" })}
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
                    onClick={() => setSelectedVideo({ title: "On-Air Highlights", link: "https://www.youtube.com/watch?v=popbs1y_L9A" })}
                    className="aspect-video relative group cursor-pointer overflow-hidden border border-border block w-full"
                  >
                    <motion.img 
                      src={pressReelThumbnail} 
                      alt="Press Reel Thumbnail"
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
