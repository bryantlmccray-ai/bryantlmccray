import NightBand from "@/components/NightBand";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn } from "@/components/ScrollAnimations";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import bryantHeadshot from "@/assets/bryant-headshot.jpeg";
import bryantOnair from "@/assets/bryant-onair.jpeg";
import aaccwiMark from "@/assets/aaccwi-mark.png";
import loyolaAcademyLogo from "@/assets/loyola-academy-logo.png";

const About = () => {
  const reduceMotion = useReducedMotion();
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navigation />
        
        <NightBand className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="editorial-container">
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
          </div>
        </NightBand>

        <section className="pt-16 pb-24 md:pt-20 md:pb-32">
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
                      Four-time Regional Emmy® Award Nominee. Three of those nominations came this year.
                    </p>

                    <p>
                      My WGN reporting also runs on{" "}
                      <Link
                        to="/work"
                        className="underline-offset-4 hover:underline"
                      >
                        NewsNation and Nexstar stations
                      </Link>{" "}
                      across the Midwest.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="editorial-container">
            <FadeIn>
              <div className="accent-line mb-10" />
              <p className="text-xs text-accent tracking-widest uppercase mb-4">
                Recognition
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12">
                Four Regional Emmy® nominations.
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FadeIn className="h-full">
                <motion.article
                  className="border border-border p-6 md:p-8 h-full flex flex-col"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-14 flex items-center mb-8">
                    <span className="text-xs text-muted-foreground tracking-widest uppercase">
                      NATAS Central Great Lakes
                    </span>
                  </div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-3">Nominee · 2026</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">One Traffic Stop, An Unlikely Rescue</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Crime/Justice News. WKYC, Cleveland.
                  </p>
                  <Link
                    to="/stories/one-traffic-stop-an-unlikely-rescue"
                    className="mt-auto inline-flex items-center gap-2 self-start text-sm text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.article>
              </FadeIn>
              <FadeIn delay={0.1} className="h-full">
                <motion.article
                  className="border border-border p-6 md:p-8 h-full flex flex-col"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-14 flex items-center mb-8">
                    <span className="text-xs text-muted-foreground tracking-widest uppercase">
                      NATAS Central Great Lakes
                    </span>
                  </div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-3">Nominee · 2026</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">Break in a Cold Case</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Crime/Justice News, team coverage of the arrest in the murder of Aliza Sherman. WKYC, Cleveland.
                  </p>
                  <a
                    href="https://wkycdirectorscut.blogspot.com/2026/04/wkyc-garners-27-regional-emmy.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start text-sm text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.article>
              </FadeIn>
              <FadeIn delay={0.2} className="h-full">
                <motion.article
                  className="border border-border p-6 md:p-8 h-full flex flex-col"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-14 flex items-center mb-8">
                    <span className="text-xs text-muted-foreground tracking-widest uppercase">
                      NATAS Central Great Lakes
                    </span>
                  </div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-3">Nominee · 2026</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">TikTok on the Clock as the Feed May Go Dark</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Daily News Report, single shift. WKYC, Cleveland.
                  </p>
                  <a
                    href="https://wkycdirectorscut.blogspot.com/2026/04/wkyc-garners-27-regional-emmy.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start text-sm text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.article>
              </FadeIn>
              <FadeIn delay={0.3} className="h-full">
                <motion.article
                  className="border border-border p-6 md:p-8 h-full flex flex-col"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-14 flex items-center mb-8">
                    <span className="text-xs text-muted-foreground tracking-widest uppercase">
                      NATAS Chicago/Midwest
                    </span>
                  </div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-3">Nominee · 2023</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">CBS 58 Eye on AI</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Team nomination with the CBS 58 newsroom. WDJT, Milwaukee.
                  </p>
                  <a
                    href="https://chicagoemmyonline.org/files/2023/10/2023-Chicago-Midwest-Nomination-List.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start text-sm text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.article>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="editorial-container">
            <FadeIn>
              <div className="accent-line mb-10" />
              <p className="text-xs text-accent tracking-widest uppercase mb-4">
                On Stage &amp; In Print
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Rooms I've hosted. Places that told my story.
              </h2>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-12">
                Four-time Regional Emmy® Award Nominee
              </p>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FadeIn className="h-full">
                <motion.article
                  className="border border-border p-6 md:p-8 h-full flex flex-col"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-14 flex items-center mb-8">
                    <img
                      src={aaccwiMark}
                      alt="African American Chamber of Commerce of Wisconsin"
                      className="max-h-14 max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-3">Emcee</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">2023 Breakfast of Champions</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    African American Chamber of Commerce of Wisconsin. Fiserv Forum, Milwaukee. September 27, 2023.
                  </p>
                  <a
                    href="https://www.aaccwi.org/boc2023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start text-sm text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.article>
              </FadeIn>
              <FadeIn delay={0.1} className="h-full">
                <motion.article
                  className="border border-border p-6 md:p-8 h-full flex flex-col"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-14 flex items-center mb-8">
                    <img
                      src={loyolaAcademyLogo}
                      alt="Loyola Academy"
                      className="max-h-14 max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-3">Speaker</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">Ramble 2025</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Loyola Academy's benefit for tuition assistance. Shared my story with Brittany McCray, Class of 2012. March 15, 2025.
                  </p>
                  <a
                    href="https://goramblers.myschoolapp.com/page/news-detail?pk=1560959&siteId=1102&ssl=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start text-sm text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.article>
              </FadeIn>
              <FadeIn delay={0.1} className="h-full">
                <motion.article
                  className="border border-border p-6 md:p-8 h-full flex flex-col"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-14 flex items-center mb-8">
                    <img
                      src={loyolaAcademyLogo}
                      alt="Loyola Academy"
                      className="max-h-14 max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-3">Featured</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">Portrait of a Rambler</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Loyola Academy alumni profile. Class of 2012.
                  </p>
                  <a
                    href="https://www.goramblers.org/portrait-of-a-rambler-bryant-mccray"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start text-sm text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.article>
              </FadeIn>
              <FadeIn delay={0.1} className="h-full">
                <motion.article
                  className="border border-border p-6 md:p-8 h-full flex flex-col"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-14 flex items-center mb-8">
                    <span className="text-xs text-muted-foreground tracking-widest uppercase">
                      St. Norbert College
                    </span>
                  </div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-3">Featured</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">Founder of Knight Talk</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    St. Norbert's video news service, now GreenKnightTV, started as the student show I built in 2014. Class of 2016.
                  </p>
                  <a
                    href="https://snc.edu/news/magazine/student-run-video-news-service-builds-audience-campus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start text-sm text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.article>
              </FadeIn>
              <FadeIn delay={0.1} className="h-full">
                <motion.article
                  className="border border-border p-6 md:p-8 h-full flex flex-col"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-14 flex items-center mb-8">
                    <span className="text-xs text-muted-foreground tracking-widest uppercase">
                      CBS 58
                    </span>
                  </div>
                  <p className="text-xs text-accent tracking-widest uppercase mb-3">In the news</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">Stepping with the Stars</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Won the men's competition at Milwaukee's Stepping with the Stars, raising money for Aurora at Home. June 2023.
                  </p>
                  <a
                    href="https://www.cbs58.com/news/cbs-58-reporter-bryant-mccray-wins-milwaukees-stepping-with-the-stars-mens-competition"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 self-start text-sm text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Read more <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </motion.article>
              </FadeIn>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default About;
