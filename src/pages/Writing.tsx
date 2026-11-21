import NightBand from "@/components/NightBand";
import onairPortrait from "@/assets/bryant-onair.jpeg";
import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { writingSamples } from "@/data/writing";
import { motion, useReducedMotion } from "framer-motion";
import { WritingCover } from "@/components/WritingMedia";

const Writing = () => {
  const reducedMotion = useReducedMotion();
  useLayoutEffect(() => {
    const previousTitle = document.title;
    document.title = "Writing | Bryant McCray";
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navigation />
        <NightBand className="pt-32 pb-16 md:pt-40 md:pb-20" portrait={{ src: onairPortrait, alt: "Bryant McCray on air for WGN-TV", position: "center 20%" }}>
          <div className="editorial-container">
            <h1 className="font-serif text-display text-foreground mb-6">Writing</h1>
            <p className="text-muted-foreground leading-relaxed">
              My WGN stories, rewritten for the page.
            </p>
          </div>
        </NightBand>
        <section className="pt-16 pb-24 md:pt-20 md:pb-32">
          <div className="editorial-container">
            <ol className="divide-y divide-border">
              {writingSamples.map((sample, index) => (
                <motion.li
                  key={sample.slug}
                  className={`py-14 first:pt-0 last:pb-0 grid items-center gap-10 md:gap-16 ${index % 2 === 0 ? "md:grid-cols-[minmax(0,1fr)_260px]" : "md:grid-cols-[260px_minmax(0,1fr)]"}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 22, delay: (index % 3) * 0.06 }}
                >
                  <div className={`order-first ${index % 2 === 0 ? "md:order-last" : "md:order-first"}`}>
                    <WritingCover sample={sample} />
                  </div>
                  <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    {sample.date}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl leading-snug mb-4 break-words">
                    <Link to={`/writing/${sample.slug}`} className="text-foreground hover:text-accent transition-colors duration-300">
                      {sample.head}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{sample.dek}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Writing;