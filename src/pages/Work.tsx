import { useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn } from "@/components/ScrollAnimations";
import justiceThumb from "@/assets/12-years-justice-thumbnail.jpeg";
import pressReelThumbnail from "@/assets/press-reel-thumbnail.png";
import hazardousRoadsThumb from "@/assets/hazardous-roads-thumbnail.jpg";

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
    title: "12 Years to Justice",
    category: "Investigation",
    description: "A nurse murdered in broad daylight—and 12 years later, her own divorce attorney is charged with the crime.",
    year: "2024",
    thumbnail: justiceThumb,
    link: "https://www.youtube.com/watch?v=oXRPe8KKv8c",
  },
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
    title: "The TikTok Question",
    category: "Enterprise Reporting",
    description: "As a potential ban looms, exploring what's at stake for creators, businesses, and national security.",
    year: "2024",
    thumbnail: "https://img.youtube.com/vi/kyz0-Brc8GI/mqdefault.jpg",
    link: "https://youtu.be/kyz0-Brc8GI",
  },
  {
    title: "A Shared Purpose",
    category: "Culture & Community",
    description: "A pastor and his wife, both activists, share not just a birthday but a lifelong mission for change.",
    year: "2024",
    thumbnail: "https://img.youtube.com/vi/Y0PQ2o0cTZw/mqdefault.jpg",
    link: "https://www.youtube.com/watch?v=Y0PQ2o0cTZw",
  },
  {
    title: "Healing in the Stacks",
    category: "Culture & Community",
    description: "After a shooting at a Shaker Heights library, a community finds its way back together.",
    year: "2024",
    thumbnail: "https://img.youtube.com/vi/ervpUsDZP1k/mqdefault.jpg",
    link: "https://www.youtube.com/watch?v=ervpUsDZP1k",
  },
  {
    title: "Home for the Holidays",
    category: "Culture & Community",
    description: "A heartwarming look at what it means to come home—and the people who make it possible.",
    year: "2023",
    thumbnail: "https://img.youtube.com/vi/ADHN2dIr-ZA/mqdefault.jpg",
    link: "https://youtu.be/ADHN2dIr-ZA",
  },
  {
    title: "After the Storm",
    category: "Culture & Community",
    description: "How one community rallied together to help Hurricane Helene victims rebuild their lives.",
    year: "2024",
    thumbnail: "https://img.youtube.com/vi/ss6WG4hkhUw/mqdefault.jpg",
    link: "https://youtu.be/ss6WG4hkhUw",
  },
  {
    title: "Whiteout in Northeast Ohio",
    category: "Culture & Community",
    description: "Live coverage as a winter storm blankets the region, bringing hazardous roads and community resilience.",
    year: "2024",
    thumbnail: hazardousRoadsThumb,
    link: "https://youtu.be/W_MycGns4b4",
  },
  {
    title: "On-Air Highlights",
    category: "On-Air Segments",
    description: "A collection of on-air segments showcasing breaking news coverage, enterprise reporting, and community-driven storytelling.",
    year: "2024",
    thumbnail: pressReelThumbnail,
    link: "https://www.youtube.com/watch?v=popbs1y_L9A",
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
                  {filteredWork.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block py-10 border-b border-border cursor-pointer"
                      >
                        <motion.div 
                          className="grid md:grid-cols-12 gap-6 items-start"
                          whileHover={{ x: 10 }}
                        >
                          {/* Thumbnail */}
                          <div className="md:col-span-4">
                            <motion.div 
                              className="aspect-video border border-border overflow-hidden relative"
                              whileHover={{ scale: 1.02 }}
                            >
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
                        </motion.div>
                      </a>
                    </motion.div>
                  ))}
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
