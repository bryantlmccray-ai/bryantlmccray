import React, { Suspense, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import NightBand from "@/components/NightBand";
import FeaturedVideo from "@/components/FeaturedVideo";
import ReportingQuote from "@/components/ReportingQuote";
import Seo from "@/components/Seo";
import { Caption, Dateline, PublicationNameplate, DoubleRule, Byline, Margin, PageFlag, Folio } from "@/components/Editorial";
import { stillCaption, storyDate, storyStation } from "@/lib/storyMeta";
import { stillSrcSet, REEL_ID, REEL_TITLE, REEL_LINK } from "@/lib/stills";
import { stories } from "@/data/stories";
import { writingSamples } from "@/data/writing";
import { newestWriting, writingTopics, writingPhotos } from "@/lib/writingFront";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import { FadeIn } from "@/components/ScrollAnimations";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const ContactSection = React.lazy(() => import("@/components/ContactSection"));
const writingDesk = newestWriting();
const voices = [
  { slug: "bud-billiken-97", quote: "We are feeding a community.", attribution: "Lindsay, a vendor at the Bud Billiken Parade, August 2026." },
  { slug: "markham-storm-relief", quote: "Oh, this is horrible. We haven't been hit like this.", attribution: "Early Walker, Markham, after the July 2026 storms." },
  { slug: "save-a-lot-closures", quote: "It's the same old story, to be honest with you.", attribution: "John Kali Mwindaja, a West Side resident, on the Save A Lot closures, July 2026." },
  { slug: "ford-city-mall-closes", quote: "Just crazy to see such a huge building shut down for the final time.", attribution: "Ethan Donaldson, a shopper, on Ford City Mall closing, June 2026." },
];
const beat = [
  { slug: "nwi-storm-series", category: "Breaking News" },
  { slug: "election-night-2026", category: "Politics" },
  { slug: "amtrak-rail-yard", category: "Community" },
  { slug: "bears-stadium-fight", category: "Politics" },
].flatMap(entry => {
  const story = stories.find(story => story.slug === entry.slug);
  return story ? [{ ...entry, story }] : [];
});

const recognition = [
  { year: "2026", chapter: "NATAS Central Great Lakes", story: "One Traffic Stop, An Unlikely Rescue", category: "Crime/Justice News", station: "WKYC", href: "/stories/one-traffic-stop-an-unlikely-rescue" },
  { year: "2026", chapter: "NATAS Central Great Lakes", story: "Break in a Cold Case", category: "Crime/Justice News", station: "WKYC" },
  { year: "2026", chapter: "NATAS Central Great Lakes", story: "TikTok on the Clock as the Feed May Go Dark", category: "Daily News Report (single shift)", station: "WKYC" },
  { year: "2023", chapter: "NATAS Chicago/Midwest", story: "CBS 58 Eye on AI", category: "Team nomination", station: "WDJT" },
];

const HeroActions = () => <>
  <a href="mailto:bryant.l.mccray@gmail.com" className="font-sans text-base md:text-lg text-foreground underline underline-offset-4 decoration-1 min-h-11 inline-flex items-center hover:decoration-accent">Email me</a>
  <a href="/Bryant_McCray_Resume.pdf" target="_blank" rel="noopener noreferrer" className="font-sans text-base md:text-lg text-foreground underline underline-offset-4 decoration-1 min-h-11 inline-flex items-center hover:decoration-accent">Résumé (PDF)</a>
</>;

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; link: string } | null>(null);
  const videoId = selectedVideo?.link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
  useLayoutEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  return (
    <PageTransition>
      <Seo title="Bryant McCray | TV News Reporter, WGN-TV Chicago" description="Bryant McCray, TV news reporter at WGN-TV Chicago and four-time Regional Emmy® nominee. Watch the 2026 reporter reel." path="/" />
      <main className="min-h-[100svh] bg-background overflow-x-clip newspaper-page">
        <Navigation />
        {/* Reel first: the application reel is the first screen */}
        <NightBand
          aria-labelledby="home-title"
          className="night-safe-x pb-14 pt-[calc(5rem+env(safe-area-inset-top)+2rem)] md:flex md:min-h-[88svh] md:items-center md:pb-20"
        >
          <div className="wide-container relative z-10 grid w-full gap-8 md:grid-cols-12 md:items-center md:gap-12">
            <div className="md:col-span-5">
              <PageFlag>Home · The beat</PageFlag>
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">TV News Reporter · WGN-TV Chicago</p>
              <h1 id="home-title" className="font-serif text-[36px] md:text-[44px] lg:text-[52px] leading-[1.06] text-foreground mb-5" >
                People don't want to be impressed. They want to be understood.
              </h1>
              <p className="text-base md:text-lg leading-[1.6] text-muted-foreground max-w-md">
                Bryant McCray. Four-time Regional Emmy® nominee.
              </p>
              <div className="hidden md:flex mt-8 flex-wrap items-center gap-x-6 gap-y-3">{/* desktop actions */}
                <HeroActions />
              </div>
            </div>
            <div className="md:col-span-7">
              <FeaturedVideo
                youtubeId={REEL_ID}
                poster="/stills/bryant-skyline-lakefront.jpg"
                alt="Bryant McCray reporting live on the Chicago lakefront with the skyline behind him."
                title={REEL_TITLE}
                loop
                onWatchWithSound={() => setSelectedVideo({ title: REEL_TITLE, link: REEL_LINK })}
              />
            </div>
            <div className="flex items-center justify-start gap-x-6 md:hidden">
              <HeroActions />
            </div>
          </div>
        </NightBand>

        <div className="wide-container pt-12 md:pt-16">
          <PublicationNameplate center="Bryant McCray, WGN-TV" />
        </div>

        <section className="py-12 md:py-16" aria-labelledby="voices-title">
          <div className="wide-container">
            <h2 id="voices-title" className="mb-8 font-serif text-3xl md:text-4xl text-foreground">In their words.</h2>
            <div className="space-y-8 md:space-y-12">
              {voices.map((voice, index) => {
                const sample = writingSamples.find(sample => sample.slug === voice.slug);
                const opening = sample?.body[0]?.split(" | ")[0];
                return <Margin key={voice.slug} note={[opening, sample?.date, "WGN-TV"].filter(Boolean).join(" · ")}><ReportingQuote {...voice} href={sample?.pdf} photo={writingPhotos[voice.slug]} photoRight={index === 1} extraLarge={index > 1} /></Margin>;
              })}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16" aria-labelledby="beat-title">
          <div className="wide-container">
            <div className="mb-6 flex items-baseline justify-between gap-6">
              <h2 id="beat-title" className="font-serif text-3xl md:text-4xl text-foreground">The beat.</h2>
              <Link to="/work" className="inline-flex min-h-11 items-center text-sm text-foreground underline underline-offset-[3px]">All work</Link>
            </div>
            <div className="border-b border-border">
              {beat.map(({ slug, category, story }, index) => <Margin key={slug} note={`${story.dateline.city}${story.dateline.state ? `, ${story.dateline.state}` : ""} · ${storyDate(story)} · ${storyStation(story)}`}><article data-home-story={slug} className="grid min-w-0 gap-7 border-t border-border py-8 md:grid-cols-2 md:items-center md:gap-10 md:py-12">
                <figure className={`press-photo min-w-0 ${index % 2 ? "md:order-2" : ""}`}>
                  <img src={story.still} srcSet={stillSrcSet(story.still)} sizes="(min-width: 768px) 560px, calc(100vw - 48px)" width={1920} height={1080} alt={`From Bryant McCray's WGN-TV report: ${story.headline}`} loading="lazy" decoding="async" className="block aspect-video w-full object-cover" />
                  <Caption>{stillCaption(story)}</Caption>
                </figure>
                <div className={`min-w-0 ${index % 2 ? "md:order-1" : ""}`}>
                  <p className="mb-3 text-xs uppercase tracking-widest text-accent">{category}</p>
                  <h3 className="mb-5 font-serif text-[32px] md:text-[40px] leading-[1.1] text-foreground"><Link to={`/stories/${slug}`} className="link-plain inline-block min-h-11">{story.headline}</Link></h3>
                  <p className="font-serif text-xl leading-relaxed text-foreground/80"><Dateline {...story.dateline} />{story.dek}</p>
                </div>
              </article></Margin>)}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="wide-container grid gap-8 border-t border-border pt-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center md:gap-12 md:pt-12">
            <figure className="press-photo min-w-0 md:max-w-sm">
              <picture>
                <source type="image/webp" srcSet="/stills/bryant-rain-portrait-800.webp 800w, /stills/bryant-rain-portrait-1200.webp 1200w" sizes="(min-width: 768px) 384px, calc(100vw - 48px)" />
                <img src="/stills/bryant-rain-portrait.jpg" width={1206} height={1608} alt="Bryant McCray in a WGN hat and rain jacket, holding a WGN microphone." loading="lazy" decoding="async" className="block w-full aspect-[4/5] object-cover object-top" />
              </picture>
              <Caption>Reporting during storm coverage for WGN-TV, July 2026.</Caption>
            </figure>
            <div className="min-w-0">
              <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.12] text-foreground">From the West Side to WGN.</h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/80">I cover breaking news and politics for WGN-TV in Chicago.</p>
              <Link to="/about" className="mt-5 inline-flex min-h-11 items-center text-sm text-foreground underline underline-offset-[3px]">More about me</Link>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="py-16 md:py-20">
          <div className="wide-container">
            <DoubleRule />
            <FadeIn className="pt-6">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Four Regional Emmy® nominations.</h2>
              <table className="w-full border-b border-border text-left">
                <caption className="sr-only">Regional Emmy nominations</caption>
                <thead className="max-md:sr-only">
                  <tr className="text-sm text-muted-foreground">
                    <th scope="col" className="py-2 pr-4 font-normal">Year</th>
                    <th scope="col" className="py-2 pr-4 font-normal">Honor</th>
                    <th scope="col" className="py-2 pr-4 font-normal">Story</th>
                    <th scope="col" className="py-2 font-normal md:text-right">Station</th>
                  </tr>
                </thead>
                <tbody>
                  {recognition.map((row) => (
                    <tr key={row.story} className="border-t border-border max-md:grid max-md:gap-1 max-md:py-4 align-baseline">
                      <td className="text-sm tabular-nums text-muted-foreground md:py-4 md:pr-4">{row.year}</td>
                      <td className="text-sm text-muted-foreground md:py-4 md:pr-4">{row.chapter}, {row.category}</td>
                      <td className="md:py-4 md:pr-4">
                        {row.href ? (
                          <Link to={row.href} className="link-plain inline-block py-2.5 -my-1 font-serif text-lg text-foreground">{row.story}</Link>
                        ) : (
                          <span className="font-serif text-lg text-foreground">{row.story}</span>
                        )}
                      </td>
                      <td className="text-sm text-muted-foreground md:py-4 md:text-right">{row.station}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 md:py-20 border-t border-border">
          <div className="wide-container">
            <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">From the Writing desk</h2>
              <Link to="/writing" className="inline-flex min-h-11 items-center text-sm text-foreground underline underline-offset-[3px]">All writing</Link>
            </div>
            <div className="grid md:grid-cols-3">
              {writingDesk.map((sample) => {
                const photo = writingPhotos[sample.slug];
                return <article key={sample.slug} data-writing-desk={sample.slug} className="min-w-0 border-t border-border py-8 md:px-6 md:[&:not(:first-child)]:border-l">
                  {photo && <figure className="press-photo mb-5">
                    <img src={photo.src} srcSet={stillSrcSet(photo.src)} sizes="(min-width: 768px) 360px, 100vw" width={1920} height={1080} loading="lazy" decoding="async" alt={photo.alt} className="w-full aspect-[3/2] object-cover" />
                    <Caption>{photo.caption}</Caption>
                  </figure>}
                  <p className="text-xs uppercase tracking-widest text-accent mb-3">{writingTopics[sample.slug]}</p>
                  <h3 className="font-serif text-2xl text-foreground leading-snug">
                    {sample.pdf ? <a href={sample.pdf} target="_blank" rel="noopener noreferrer" className="link-plain inline-block min-h-11">{sample.head}</a> : sample.head}
                  </h3>
                  <Byline date={sample.date} />
                </article>;
              })}
            </div>
          </div>
        </section>
        {/* Quiet CTA */}
        <FadeIn className="py-20">
          <div className="wide-container">
            <p className="text-foreground/80 mb-5">
              Got a story, or a role I should know about? Email me.
            </p>
            <Button variant="solid" asChild>
              <a href="mailto:bryant.l.mccray@gmail.com">Get in Touch</a>
            </Button>
          </div>
        </FadeIn>

        <Folio page="Home" />
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>

        {/* Video Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl w-[90vw] p-0 bg-background border-border overflow-hidden">
            <DialogTitle className="sr-only">{selectedVideo?.title}</DialogTitle>
            <div className="relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close video"
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 z-50 h-11 w-11 bg-background text-muted-foreground hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </Button>
              {videoId && (
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={selectedVideo?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </PageTransition>
  );
};

export default Index;
