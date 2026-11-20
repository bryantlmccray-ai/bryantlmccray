import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { writingSamples } from "@/data/writing";

const Writing = () => {
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
        <section className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="editorial-container">
            <h1 className="font-serif text-display text-foreground mb-6">Writing</h1>
            <p className="text-muted-foreground leading-relaxed mb-16">
              Print adaptations of my WGN-TV reporting.
            </p>
            <ol className="divide-y divide-border">
              {writingSamples.map((sample) => (
                <li key={sample.slug} className="py-10 first:pt-0 last:pb-0">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    {sample.date}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl leading-snug mb-4 break-words">
                    <Link to={`/writing/${sample.slug}`} className="text-foreground hover:text-accent transition-colors duration-300">
                      {sample.head}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{sample.dek}</p>
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