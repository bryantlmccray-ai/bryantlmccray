import { useState } from "react";
import { Play } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const categories = [
  "All",
  "Breaking News",
  "Enterprise Reporting",
  "Culture & Community",
  "On-Air Segments",
];

const workItems = [
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
    title: "After the Headlines",
    category: "Breaking News",
    description: "What happens to communities when the cameras leave.",
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
  {
    title: "Storm Coverage",
    category: "Breaking News",
    description: "Live field reporting during severe weather events.",
    year: "2023",
  },
];

const Work = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredWork = activeCategory === "All" 
    ? workItems 
    : workItems.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="editorial-container">
          <p className="text-xs text-accent tracking-widest uppercase mb-4 opacity-start animate-fade-in">
            Work
          </p>
          
          <h1 className="font-serif text-headline text-foreground mb-6 opacity-start animate-fade-up animation-delay-100">
            Selected Reporting
          </h1>
          
          <p className="text-muted-foreground max-w-xl leading-relaxed opacity-start animate-fade-up animation-delay-200">
            Selected reporting and on-air work spanning breaking news, enterprise 
            storytelling, and community-driven journalism.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-y border-border sticky top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="editorial-container">
          <div className="flex flex-wrap gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="py-16">
        <div className="editorial-container">
          <div className="space-y-0">
            {filteredWork.map((item, index) => (
              <article 
                key={index}
                className="group py-10 border-b border-border cursor-pointer"
              >
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  {/* Thumbnail */}
                  <div className="md:col-span-4">
                    <div className="aspect-video bg-foreground/5 border border-border flex items-center justify-center group-hover:bg-foreground/10 transition-colors duration-300">
                      <Play className="h-8 w-8 text-foreground/30 group-hover:text-accent transition-colors duration-300" />
                    </div>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Work;
