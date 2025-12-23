import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { motion } from "framer-motion";
import bryantHeadshot from "@/assets/bryant-headshot.jpeg";
import bryantOnair from "@/assets/bryant-onair.jpeg";

const About = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navigation />
        
        <section className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="editorial-container">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Creative Photo Layout */}
              <FadeIn direction="left" className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative">
                  {/* Main headshot - larger, positioned at top */}
                  <motion.div 
                    className="relative z-10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="aspect-[4/5] overflow-hidden border border-border">
                      <img 
                        src={bryantHeadshot} 
                        alt="Bryant McCray - Professional Headshot"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </motion.div>
                  
                  {/* On-air photo - smaller, overlapping bottom right */}
                  <motion.div 
                    className="absolute -bottom-8 -right-4 md:-right-8 w-2/3 z-20"
                    initial={{ opacity: 0, x: 30, y: 30 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    <div className="aspect-[3/4] overflow-hidden border-4 border-background shadow-2xl">
                      <img 
                        src={bryantOnair} 
                        alt="Bryant McCray - On Air"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Decorative accent */}
                  <motion.div 
                    className="absolute -top-4 -left-4 w-24 h-24 border border-accent/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </div>
              </FadeIn>

              {/* Content */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <FadeIn>
                  <p className="text-xs text-accent tracking-widest uppercase mb-4">
                    About
                  </p>
                </FadeIn>
                
                <FadeIn delay={0.1}>
                  <h1 className="font-serif text-headline text-foreground mb-8">
                    I'm a journalist drawn to the space where people, systems, and moments collide.
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="accent-line mb-10" />
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="space-y-6 text-foreground/80 leading-relaxed">
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
                </FadeIn>

                {/* Pull Quote */}
                <FadeIn delay={0.4}>
                  <blockquote className="mt-12 pt-8 border-t border-border">
                    <p className="font-serif text-2xl md:text-3xl text-foreground italic leading-relaxed">
                      "The story isn't just what happened. It's who it happened to."
                    </p>
                  </blockquote>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 border-t border-border">
          <div className="editorial-container">
            <StaggerContainer className="grid md:grid-cols-3 gap-12">
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
                <StaggerItem key={index}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-serif text-xl text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default About;
