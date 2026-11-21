import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn } from "@/components/ScrollAnimations";
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
                    I grew up on the West Side. Now I report on the whole city.
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="accent-line mb-10" />
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="space-y-6 text-foreground/80 leading-relaxed">
                    <p>
                      I was raised on Chicago's West Side, with Mario's Italian Ice in one hand and Italian Fiesta pizza in the other. I went to Alain Locke Charter School, then Loyola Academy up in Wilmette.
                    </p>

                    <p>
                      TV news started for me at St. Norbert College, on a student show called Knight Talk. From there it was Green Bay, then Milwaukee, then Cleveland. Now I'm home, at WGN.
                    </p>

                    <p>
                      Chicago taught me early that people don't want to be impressed. They want to be understood. So that's how I report. I show up, I listen, and I let the people in the story carry it.
                    </p>

                    <p>
                      Four Emmy nominations along the way. Three of them came this year.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default About;
