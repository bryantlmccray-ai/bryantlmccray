import { useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { CREDIT, writingSamples } from "@/data/writing";
import NotFound from "./NotFound";
import { WritingFrame } from "@/components/WritingMedia";

const WritingStory = () => {
  const { slug } = useParams();
  const index = writingSamples.findIndex((sample) => sample.slug === slug);
  const sample = writingSamples[index];
  const previous = writingSamples[index - 1];
  const next = writingSamples[index + 1];

  useLayoutEffect(() => {
    const previousTitle = document.title;
    if (sample) document.title = `${sample.head} | Bryant McCray`;
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => { document.title = previousTitle; };
  }, [sample]);

  if (!sample) return <NotFound />;

  return (
    <PageTransition>
      <main className="min-h-[100svh] bg-background">
        <Navigation />
        <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-8">
          <article className="max-w-[680px] mx-auto">
            <Link to="/writing" className="inline-block text-sm text-muted-foreground hover:text-accent transition-colors duration-300 mb-10">
              Writing
            </Link>
            <WritingFrame sample={sample} />
            <header className="mb-10">
              <h1 className="font-serif text-headline text-foreground leading-tight break-words mb-6">{sample.head}</h1>
              <p className="italic text-muted-foreground text-lg leading-relaxed mb-6">{sample.dek}</p>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 mb-4">
                <div>
                  <p className="text-sm text-foreground">By Bryant McCray | {sample.date}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">Adapted from my WGN-TV report.</p>
                </div>
                {sample.pdf && (
                  <a href={sample.pdf} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300 underline underline-offset-4">
                    Download PDF
                  </a>
                )}
              </div>
              <p className="text-xs italic text-muted-foreground leading-relaxed">{CREDIT}</p>
            </header>
            {sample.youtubeId != null && (
              <div className="aspect-video mb-10">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${sample.youtubeId}`}
                  title={sample.head}
                  loading="lazy"
                  className="w-full h-full border-0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed break-words">
              {sample.body.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
            </div>
            <nav aria-label="More writing samples" className="mt-16 pt-8 border-t border-border grid sm:grid-cols-2 gap-8">
              <div>
                {previous && (
                  <Link to={`/writing/${previous.slug}`} className="text-muted-foreground hover:text-accent transition-colors duration-300">
                    <span className="block text-xs uppercase tracking-widest mb-3">Previous</span>
                    <span className="font-serif text-lg leading-snug">{previous.head}</span>
                  </Link>
                )}
              </div>
              <div className="sm:text-right">
                {next && (
                  <Link to={`/writing/${next.slug}`} className="text-muted-foreground hover:text-accent transition-colors duration-300">
                    <span className="block text-xs uppercase tracking-widest mb-3">Next</span>
                    <span className="font-serif text-lg leading-snug">{next.head}</span>
                  </Link>
                )}
              </div>
            </nav>
          </article>
        </section>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default WritingStory;