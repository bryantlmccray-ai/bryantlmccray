import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen hero-gradient flex items-center justify-center relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-semibold tracking-widest uppercase mb-4 opacity-0 animate-fade-up">
            Investigative Journalist
          </p>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 opacity-0 animate-fade-up animation-delay-200">
            Uncovering Truth,
            <br />
            <span className="text-gradient">One Story at a Time</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 font-light opacity-0 animate-fade-up animation-delay-400">
            Award-winning journalist with 10+ years of experience covering politics, 
            social justice, and human interest stories that matter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up animation-delay-600">
            <Button variant="hero" size="lg" asChild>
              <a href="#work">View My Work</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#work" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
