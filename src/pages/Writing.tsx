import { useLayoutEffect } from "react";
import Seo from "@/components/Seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import type { WritingSample } from "@/data/writing";
import { writingFront, writingTopics } from "@/lib/writingFront";
import { stillSrcSet } from "@/lib/stills";

const WritingItem = ({ sample, lead = false, rail = false }: { sample: WritingSample; lead?: boolean; rail?: boolean }) => (
  <article data-writing-slug={sample.slug} className="min-w-0">
    <p className="text-xs uppercase tracking-widest text-accent mb-3">{writingTopics[sample.slug]}</p>
    <h2 className={`font-serif text-foreground leading-[1.08] mb-4 ${lead ? "text-[32px] md:text-[44px] lg:text-[48px]" : rail ? "text-2xl" : "text-[22px]"}`}>
      {sample.pdf ? (
        <a href={sample.pdf} target="_blank" rel="noopener noreferrer" className="link-plain inline-block min-h-11">{sample.head}</a>
      ) : sample.head}
    </h2>
    {sample.slug === "illinois-ai-safety-law" && (
      <img src="/stills/ai-safety-law.jpg" srcSet={stillSrcSet("/stills/ai-safety-law.jpg")} sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw" width={1920} height={1080} alt="From Bryant McCray's WGN-TV report on the Illinois AI safety law" loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover mb-4" />
    )}
    <p className={`leading-relaxed text-foreground/80 ${lead ? "font-serif text-xl" : "text-base"}`}>{sample.dek}</p>
    <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs leading-relaxed text-muted-foreground">
      <span className="uppercase tracking-widest">By Bryant McCray</span>
      <span>{sample.date}</span>
      {sample.pdf && <span>PDF</span>}
    </p>
  </article>
);

const Writing = () => {
  const { lead, rail, remaining } = writingFront();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <PageTransition>
      <Seo title="Writing | Bryant McCray, Reporter, Chicago" description="WGN-TV stories by Bryant McCray, rewritten for the page: Chicago politics, transit, schools and neighborhoods." path="/writing" />
      <main className="min-h-[100svh] bg-background">
        <Navigation />
        <header className="pt-28 pb-10 md:pt-32 md:pb-12">
          <div className="wide-container">
            <div className="border-t-[3px] border-foreground pt-1"><div className="border-t border-foreground" /></div>
            <h1 className="font-serif text-[56px] md:text-[80px] leading-none text-foreground py-6">Writing</h1>
            <div className="grid gap-2 border-y border-border py-3 text-sm text-muted-foreground md:grid-cols-3 md:items-center">
              <span>Chicago</span>
              <span className="md:text-center">Adapted from WGN-TV reporting</span>
              <span className="md:text-right">Updated November 2026</span>
            </div>
            <p className="font-serif text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-[75ch] mt-6">
              My WGN stories, rewritten for the page. On air, a story has to fit the time it gets. Here it keeps the numbers and the context that didn't make the cut.
            </p>
          </div>
        </header>
        <section className="pb-24 md:pb-32">
          <div className="wide-container">
            <div className="grid border-t border-border lg:grid-cols-3">
              {lead && <div className="py-8 lg:col-span-2 lg:pr-10"><WritingItem sample={lead} lead /></div>}
              <div className="divide-y divide-border lg:border-l lg:border-border lg:pl-7">
                {rail.map((sample) => <div key={sample.slug} className="border-t border-border py-8 lg:border-t-0"><WritingItem sample={sample} rail /></div>)}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {remaining.map((sample) => (
                <div key={sample.slug} className="min-w-0 border-t border-border py-8 md:px-6 md:[&:nth-child(2n)]:border-l lg:[&:nth-child(2n)]:border-l-0 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n)]:border-l">
                  <WritingItem sample={sample} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Writing;