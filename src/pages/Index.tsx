import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroAnimation from "@/assets/hero-animation.mp4";

const featuredWork = [
  {
    title: "When the Water Rose",
    category: "Enterprise Reporting",
    description: "A look at how one neighborhood responded to historic flooding, and what recovery really requires.",
  },
  {
    title: "The Cost of Care",
    category: "Community",
    description: "Inside the lives of family caregivers navigating an impossible system.",
  },
  {
    title: "After the Headlines",
    category: "Breaking News",
    description: "What happens to communities when the cameras leave.",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="editorial-container">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="flex-1 max-w-2xl">
              <h1 className="font-serif text-display text-foreground mb-6 opacity-start animate-fade-up">
                Bryant McCray
              </h1>
              
              <p className="text-subhead text-muted-foreground mb-8 opacity-start animate-fade-up animation-delay-100">
                Journalist. Storyteller. Observer of what actually matters.
              </p>
              
              <div className="accent-line mb-8 opacity-start animate-fade-in animation-delay-200" />
              
              <p className="text-lg text-foreground/80 leading-relaxed max-w-xl opacity-start animate-fade-up animation-delay-300">
                Emmy-nominated reporter covering culture, community, and consequence.
              </p>
            </div>
            
            <div className="w-full md:w-80 lg:w-96 opacity-start animate-fade-in animation-delay-200">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto rounded-sm"
              >
                <source src={heroAnimation} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20 border-t border-border">
        <div className="editorial-container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-headline text-foreground">
              Selected Work
            </h2>
            <Button variant="accent" size="sm" asChild>
              <Link to="/work" className="flex items-center gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-8">
            {featuredWork.map((item, index) => (
              <article 
                key={index}
                className="group py-8 border-b border-border last:border-b-0 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
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
                  <div className="flex items-center text-muted-foreground group-hover:text-accent transition-colors duration-300">
                    <Play className="h-5 w-5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Press Reel Highlight */}
      <section className="py-20 bg-secondary/50">
        <div className="editorial-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
              <Button variant="editorial" size="sm" asChild>
                <Link to="/work" className="flex items-center gap-2">
                  Watch Reel <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="aspect-video bg-foreground/5 border border-border flex items-center justify-center group cursor-pointer hover:bg-foreground/10 transition-colors duration-300">
              <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                <Play className="h-6 w-6 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet CTA */}
      <section className="py-24">
        <div className="editorial-container text-center">
          <p className="text-muted-foreground mb-6">
            Available for broadcast, editorial, and documentary work.
          </p>
          <Button variant="editorial" size="sm" asChild>
            <a href="mailto:hello@bryantmccray.com">
              Get in Touch
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
