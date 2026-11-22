import { useLayoutEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import NightBand from "@/components/NightBand";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const chapters = [
  "Live from Munster: the National Guard moves in (Aug. 13)",
  "Flood recovery: waiting for power (Aug. 13)",
  "The town hall: who answers for the poles (Aug. 21)",
];

const NwiStormStory = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const siteDescription = document.head.querySelector<HTMLMetaElement>('meta[name="description"]:not([data-rh])');
    siteDescription?.remove();
    return () => {
      if (siteDescription) document.head.appendChild(siteDescription);
    };
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>After the Storm: Northwest Indiana | Bryant McCray</title>
        <meta name="description" content="Bryant McCray follows Northwest Indiana's storm recovery for WGN-TV, from National Guard cleanup to families without power and a Munster town hall." />
      </Helmet>
      <main className="min-h-screen bg-background">
        <Navigation />
        <article>
          <NightBand className="pt-32 pb-16 md:pt-40 md:pb-20">
            <header className="editorial-container">
              <p className="text-xs text-accent uppercase tracking-widest leading-relaxed mb-5">
                WGN NEWS · AUGUST 2026 · MUNSTER, INDIANA
              </p>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-6">
                After the Storm: Northwest Indiana
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                A storm knocked out power to more than 300,000 people across Northwest Indiana. Over ten days I followed it from the National Guard's first cleanup in Lake County, to families waiting in the dark, to a Munster town hall where residents asked who is responsible for the poles and trees that keep failing.
              </p>
            </header>
          </NightBand>
          <section className="py-12 md:py-16">
            <div className="editorial-container">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/5hQTl-y7-YQ?rel=0"
                  title="After the Storm: Northwest Indiana"
                  className="w-full h-full border-0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <ol aria-label="Story chapters" className="mt-8 divide-y divide-border border-y border-border">
                {chapters.map((chapter, index) => (
                  <li key={chapter} className="flex gap-5 py-4 text-sm leading-relaxed">
                    <span className="text-accent tabular-nums shrink-0">{index + 1}.</span>
                    <span className="text-foreground">{chapter}</span>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
                Reported by Bryant McCray. WGN-TV Chicago.
              </p>
              <Link to="/work" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-300 mt-12">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Work
              </Link>
            </div>
          </section>
        </article>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default NwiStormStory;