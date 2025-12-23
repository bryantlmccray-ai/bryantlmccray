import { useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn } from "@/components/ScrollAnimations";

const categories = [
  "All",
  "Breaking News",
  "Enterprise Reporting",
  "Culture & Community",
  "On-Air Segments",
];

const workItems = [
  {
    title: "Shots Fired in Wooster",
    category: "Breaking News",
    description: "Breaking coverage of an officer-involved shooting that shook a quiet Ohio community.",
    year: "2024",
    thumbnail: "https://img.youtube.com/vi/MHjfBwxI8OM/mqdefault.jpg",
    link: "https://youtu.be/MHjfBwxI8OM",
  },
  {
    title: "Tragedy in the Skies",
    category: "Breaking News",
    description: "A fatal plane crash in Tuscarawas County leaves investigators searching for answers.",
    year: "2024",
    thumbnail: "https://img.youtube.com/vi/o4EkSIXOqlI/mqdefault.jpg",
    link: "https://youtu.be/o4EkSIXOqlI",
  },
  {
    title: "When the Water Rose",
    category: "Enterprise Reporting",
    description: "A look at how one neighborhood responded to historic flooding, and what recovery really requires.",
    year: "2024",
  },
  {
    title: "The Cost of Care",
    category: "Culture & Community",
    description: "Inside the lives of family caregivers navigating an impossible system.",
    year: "2024",
  },
  {
    title: "Election Night Coverage",
    category: "On-Air Segments",
    description: "Live reporting from polling locations across the region.",
    year: "2024",
  },
  {
    title: "The Vanishing Middle",
    category: "Enterprise Reporting",
    description: "How rising costs are reshaping neighborhood demographics.",
    year: "2023",
  },
  {
    title: "First Responders",
    category: "Culture & Community",
    description: "Profiles of the people who show up when others need help most.",
    year: "2023",
  },
  {
    title: "Morning Briefing",
    category: "On-Air Segments",
    description: "Daily news anchor segments covering regional and national stories.",
    year: "2023",
  },
];

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredWork = activeCategory === "All" 
    ? workItems 
    : workItems.filter(item => item.category === activeCategory);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
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
                  {filteredWork.map((item, index) => {
                    const content = (
                      <div className="grid md:grid-cols-12 gap-6 items-start">
                        {/* Thumbnail */}
                        <div className="md:col-span-4">
                          <motion.div 
                            className="aspect-video bg-foreground/5 border border-border flex items-center justify-center group-hover:bg-foreground/10 transition-colors duration-300 overflow-hidden relative"
                            whileHover={{ scale: 1.02 }}
                          >
                            {item.thumbnail ? (
                              <>
                                <img 
                                  src={item.thumbnail} 
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                                  <motion.div 
                                    className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    <Play className="h-5 w-5 ml-0.5 text-foreground" />
                                  </motion.div>
                                </div>
                              </>
                            ) : (
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 15 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Play className="h-8 w-8 text-foreground/30 group-hover:text-accent transition-colors duration-300" />
                              </motion.div>
                            )}
                          </motion.div>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-8">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-4 mb-2">
                                <p className="text-xs text-accent tracking-widest uppercase">
                                  {item.category}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                  {item.year}
                                </span>
                              </div>
                              <h2 className="font-serif text-2xl text-foreground group-hover:text-accent transition-colors duration-300 mb-3">
                                {item.title}
                              </h2>
                              <p className="text-muted-foreground max-w-lg">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block py-10 border-b border-border cursor-pointer"
                          >
                            <motion.div whileHover={{ x: 10 }}>
                              {content}
                            </motion.div>
                          </a>
                        ) : (
                          <article className="group py-10 border-b border-border cursor-pointer">
                            <motion.div whileHover={{ x: 10 }}>
                              {content}
                            </motion.div>
                          </article>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Work;
