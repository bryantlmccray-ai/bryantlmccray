import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { writingSamples } from "@/data/writing";
import { WritingCover } from "@/components/WritingMedia";

// Photographs from Bryant's own WGN masters, shown in place of the PDF cover.
const WRITING_STILLS: Record<string, { src: string; alt: string }> = {
  "illinois-ai-safety-law": { src: "/stills/ai-safety-law.jpg", alt: "From Bryant McCray's WGN-TV report on the Illinois AI safety law" },
};

const Writing = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <PageTransition>
      <Seo title="Writing | Bryant McCray, Reporter, Chicago" description="WGN-TV stories by Bryant McCray, rewritten for the page: Chicago politics, transit, schools and neighborhoods." path="/writing" />
      <main className="min-h-[100svh] bg-background">
        <Navigation />
        <header className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="editorial-container">
            <h1 className="font-serif text-display text-foreground mb-6">Writing</h1>
            <p className="text-muted-foreground leading-relaxed">
              My WGN stories, rewritten for the page.
            </p>
          </div>
        </header>
        <section className="pt-16 pb-24 md:pt-20 md:pb-32">
          <div className="editorial-container">
            <ol className="divide-y divide-border">
              {writingSamples.map((sample, index) => (
                <li
                  key={sample.slug}
                  className={`py-14 first:pt-0 last:pb-0 grid items-center gap-10 md:gap-16 ${index % 2 === 0 ? "md:grid-cols-[minmax(0,1fr)_260px]" : "md:grid-cols-[260px_minmax(0,1fr)]"}`}
                >
                  <div className={`order-first ${index % 2 === 0 ? "md:order-last" : "md:order-first"}`}>
                    {WRITING_STILLS[sample.slug] ? (
                      <Link to={`/writing/${sample.slug}`} className="group block w-full max-w-[320px] md:w-[260px] md:mx-0 overflow-hidden">
                        <img
                          src={WRITING_STILLS[sample.slug].src}
                          alt={WRITING_STILLS[sample.slug].alt}
                          loading="lazy"
                          className="block w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    ) : (
                      <WritingCover sample={sample} />
                    )}
                  </div>
                  <div className="min-w-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    {sample.date} · Adapted from WGN-TV reporting
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl leading-snug mb-4 break-words">
                    <Link to={`/writing/${sample.slug}`} className="link-plain text-foreground">
                      {sample.head}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{sample.dek}</p>
                  </div>
                </li>
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