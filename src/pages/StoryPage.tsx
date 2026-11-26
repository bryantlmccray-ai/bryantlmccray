import { useLayoutEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import FeaturedVideo from "@/components/FeaturedVideo";
import Seo from "@/components/Seo";
import { stillSrcSet } from "@/lib/stills";

import NotFound from "@/pages/NotFound";
import { stories } from "@/data/stories";

const StoryPage = () => {
  const { slug } = useParams();
  const story = stories.find((item) => item.slug === slug);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!story) return <NotFound />;

  return (
    <PageTransition>
      <Seo title={`${story.headline} | Bryant McCray, WGN-TV`} description={story.metaDescription} path={`/stories/${story.slug}`} />
      <Helmet>
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
      <main className="min-h-[100svh] bg-background">
        <Navigation />
        <article>
          <div className="pt-32 pb-10 md:pt-40 md:pb-12">
            <header className="editorial-container">
              <p className="text-xs text-accent uppercase tracking-widest leading-relaxed mb-5">
                {story.kicker}
              </p>
              <h1 className="font-serif text-foreground mb-6 text-balance" style={{ fontSize: "clamp(1.875rem, 6.5vw, 3rem)", lineHeight: 1.12, overflowWrap: "normal", hyphens: "manual" }}>
                {story.headline}
              </h1>
              <p className="text-muted-foreground text-base leading-[1.6] max-w-[65ch]">
                {story.dek}
              </p>
            </header>
            {story.still && (
              <div className="editorial-container mt-10">
                <img
                  src={story.still}
                  srcSet={stillSrcSet(story.still)}
                  sizes="(min-width: 896px) 832px, 100vw"
                  decoding="async"
                  alt={`From Bryant McCray's WGN-TV report: ${story.headline}`}
                  width={1920}
                  height={1080}
                  className="w-full aspect-[3/2] md:aspect-[16/9] object-cover"
                />
              </div>
            )}
          </div>
          <section className="py-12 md:py-16">
            <div className="editorial-container">
              <FeaturedVideo
                key={story.slug}
                youtubeId={story.youtubeId}
                poster={story.still ?? `https://i.ytimg.com/vi/${story.youtubeId}/maxresdefault.jpg`}
                alt={`From Bryant McCray's WGN-TV report: ${story.headline}`}
                title={story.headline}
              />
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
                        <a href={item.url} target="_blank" rel="noopener" className="link-plain inline-block py-2 text-sm text-foreground leading-relaxed">
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
              <Link to="/work" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })} className="link-plain inline-flex min-h-11 items-center text-sm text-foreground mt-12">
                All work
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