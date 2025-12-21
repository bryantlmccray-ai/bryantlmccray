import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="editorial-container">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Portrait */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-[4/5] bg-foreground/5 border border-border">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-serif text-6xl text-foreground/20">BM</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <p className="text-xs text-accent tracking-widest uppercase mb-4 opacity-start animate-fade-in">
                About
              </p>
              
              <h1 className="font-serif text-headline text-foreground mb-8 opacity-start animate-fade-up animation-delay-100">
                I'm a journalist drawn to the space where people, systems, and moments collide.
              </h1>

              <div className="accent-line mb-10 opacity-start animate-fade-in animation-delay-200" />

              <div className="space-y-6 text-foreground/80 leading-relaxed opacity-start animate-fade-up animation-delay-300">
                <p>
                  My work centers on clarity over noise and empathy over spectacle. Whether 
                  covering breaking news or long-form stories, I approach reporting with 
                  the same goal: to make complex realities understandable without stripping 
                  them of their humanity.
                </p>

                <p>
                  I've worked in local and regional newsrooms, covering everything from 
                  community resilience to cultural shifts shaping how we live. I believe 
                  good journalism doesn't shout. It listens first.
                </p>
              </div>

              {/* Pull Quote */}
              <blockquote className="mt-12 pt-8 border-t border-border opacity-start animate-fade-up animation-delay-400">
                <p className="font-serif text-2xl md:text-3xl text-foreground italic leading-relaxed">
                  "The story isn't just what happened. It's who it happened to."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-t border-border">
        <div className="editorial-container">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Clarity",
                description: "Making the complex accessible without sacrificing nuance or depth.",
              },
              {
                title: "Empathy",
                description: "Every story is about people. Treating subjects with dignity shapes better journalism.",
              },
              {
                title: "Patience",
                description: "The best stories reveal themselves to those willing to listen longer.",
              },
            ].map((value, index) => (
              <div key={index}>
                <h3 className="font-serif text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
