import { useLayoutEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import NightBand from "@/components/NightBand";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

import NotFound from "@/pages/NotFound";
import { stories } from "@/data/stories";

const StoryPage = () => {
  const { slug } = useParams();
  const story = stories.find((item) => item.slug === slug);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const siteDescription = document.head.querySelector<HTMLMetaElement>('meta[name="description"]:not([data-rh])');
    siteDescription?.remove();
    return () => {
      if (siteDescription) document.head.appendChild(siteDescription);
    };
  }, [slug]);

  if (!story) return <NotFound />;

  return (
    <PageTransition>
      <Helmet>
        <title>{`${story.headline} | Bryant McCray`}</title>
        <meta name="description" content={story.metaDescription} />
        {story.coverage && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: story.headline,
              description: story.metaDescription,
              url: `https://bryantmccray.com/stories/${story.slug}`,
              author: {
                "@type": "Person",
                "@id": "https://bryantmccray.com/#bryant",
                name: "Bryant McCray",
              },
              citation: story.coverage.map((item) => item.url),
            }).replace(/</g, "\\u003c")}
          </script>
        )}
      </Helmet>
      <main className="min-h-screen bg-background">
        <Navigation />
        <article>
          <NightBand className="pt-32 pb-16 md:pt-40 md:pb-20">
            <header className="editorial-container">
              <p className="text-xs text-accent uppercase tracking-widest leading-relaxed mb-5">
                {story.kicker}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight text-foreground mb-6">
                {story.headline}
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                {story.dek}
              </p>
            </header>
          </NightBand>
          <section className="py-12 md:py-16">
            <div className="editorial-container">
              <div className="aspect-video w-full">
                <iframe
                  src={story.videoSrc}
                  title={story.headline}
                  className="w-full h-full border-0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              {story.chapters.length > 0 && (
                <ol aria-label="Story chapters" className="mt-8 divide-y divide-border border-y border-border">
                {story.chapters.map((chapter, index) => (
                  <li key={chapter} className="flex gap-5 py-4 text-sm leading-relaxed">
                    <span className="text-accent tabular-nums shrink-0">{index + 1}.</span>
                    <span className="text-foreground">{chapter}</span>
                  </li>
                ))}
                </ol>
              )}
              {story.coverage && (
                <section className="mt-8" aria-labelledby="coverage-heading">
                  <h2 id="coverage-heading" className="text-xs text-accent uppercase tracking-widest leading-relaxed mb-5">
                    The story in the national news
                  </h2>
                  <ul className="divide-y divide-border border-y border-border">
                    {story.coverage.map((item) => (
                      <li key={item.url} className="py-4">
                        <p className="text-xs text-accent uppercase tracking-widest leading-relaxed mb-2">{item.outlet}</p>
                        <a href={item.url} target="_blank" rel="noopener" className="text-sm text-foreground leading-relaxed hover:text-accent transition-colors duration-300">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
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

export default StoryPage;