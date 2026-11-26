import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import galleryEmmy from "@/assets/gallery-emmy.jpeg";
import galleryInterview1 from "@/assets/gallery-interview-1.jpeg";
import galleryInterview2 from "@/assets/gallery-interview-2.jpeg";
import galleryHosting from "@/assets/gallery-hosting.jpg";
import galleryRambleLaugh from "@/assets/gallery-ramble-laugh.jpg";
import galleryRambleWalk from "@/assets/gallery-ramble-walk.jpg";
import galleryRambleInterview from "@/assets/gallery-ramble-interview.jpg";
import galleryWgnEnglewood from "@/assets/gallery-wgn-englewood.jpg";
import galleryWgnLakefront from "@/assets/gallery-wgn-lakefront.jpg";
import { Margin, SectionHead, PageFlag } from "@/components/Editorial";
import Seo from "@/components/Seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { stillSrcSet } from "@/lib/stills";

const galleryImages = [
  { src: galleryWgnEnglewood, alt: "Live for WGN-TV on the West Englewood fire" },
  { src: galleryWgnLakefront, alt: "Live from the lakefront for WGN-TV on the Illinois governor's race" },
  { src: galleryEmmy, alt: "At the Chicago/Midwest Emmy Awards" },
  { src: galleryInterview1, alt: "Studio interview session" },
  { src: galleryInterview2, alt: "On-stage interview at theater" },
  { src: galleryHosting, alt: "Hosting an event" },
  { src: galleryRambleInterview, alt: "Interview for Loyola Academy's Ramble 2025 film" },
  { src: galleryRambleWalk, alt: "With Brittany McCray at Loyola Academy, Ramble 2025 film" },
  { src: galleryRambleLaugh, alt: "Behind the scenes, Loyola Academy's Ramble 2025 film" },
];

const careerTimeline = [
  {
    role: "General Assignment Reporter",
    org: "WGN-TV, Chicago, IL",
    period: "May 2026 – Present",
    photos: [
      { src: "/stills/bryant-skyline-lakefront.jpg", caption: "Live on the lakefront, Election Night 2026. WGN-TV broadcast still.", alt: "Bryant McCray reporting live on the Chicago lakefront." },
    ],
    bullets: [
      "Breaking news, severe weather, and state and national politics for Chicago's WGN-TV.",
    ],
  },
  {
    role: "Reporter",
    org: "WKYC (NBC), Cleveland, OH",
    period: "2024 – 2025",
    photos: [
      { src: "/stills/career-wkyc-anchor.jpg", caption: "Anchoring at WKYC Studios, Cleveland. WKYC broadcast still.", alt: "Bryant McCray at the WKYC anchor desk." },
      { src: "/stills/career-wkyc-field-v2.jpg", caption: "In the field after Hurricane Helene. WKYC broadcast still.", alt: "Bryant McCray reporting in the field for WKYC." },
    ],
    bullets: [
      "Breaking news, crime and courts, and community stories across Northeast Ohio.",
      "Three of those stories were nominated for Great Lakes Emmys in 2026.",
    ],
  },
  {
    role: "Broadcast Reporter",
    org: "CBS 58, Milwaukee, WI",
    period: "2022 – 2024",
    photos: [
      { src: "/stills/career-cbs58-live-v2.jpg", caption: "Live breaking news, Milwaukee. CBS 58 broadcast still, restored from archival video.", alt: "Bryant McCray reporting live at night for CBS 58." },
      { src: "/stills/career-cbs58-field-v2.jpg", caption: "Reporting in Milwaukee. CBS 58 broadcast still, restored from archival video.", alt: "Bryant McCray reporting outside a Boys and Girls Club for CBS 58." },
    ],
    bullets: [
      "Live breaking news and enterprise reporting in Milwaukee.",
      "Emmy nomination for Eye on AI, a story on deepfake technology.",
      "Long-form stories from neighborhoods that don't usually get the camera.",
    ],
  },
  {
    role: "Producer & Broadcast Reporter",
    org: "WFRV (CBS), Green Bay, WI",
    period: "2016 – 2017",
    photos: [
      { src: "/stills/career-wfrv-phone.jpg", caption: "A stand-up shot on a phone, Green Bay. WFRV still, restored from archival video.", alt: "A phone showing Bryant McCray recording a stand-up." },
      { src: "/stills/career-wfrv-snow-v2.jpg", caption: "Live in the snow, Green Bay. WFRV still, restored from archival video.", alt: "Bryant McCray reporting live in winter gear for WFRV." },
    ],
    bullets: [
      "Story development, guest booking, and segment production.",
      "Produced and reported daily for Northeast Wisconsin.",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Science in Mass Communication",
    school: "St. Norbert College",
  },
];

const awards = [
  {
    title: "Three Emmy Nominations",
    org: "57th Great Lakes Emmy Awards · WKYC-TV, Cleveland",
    year: "2026",
  },
  {
    title: "Newcomer of the Year Nomination",
    org: "Greater Cleveland Association of Black Journalists",
    year: "2024",
  },
  {
    title: "Emmy Nomination, CBS 58 Eye on AI",
    org: "Chicago/Midwest Chapter, NATAS",
    year: "2023",
  },
];

const affiliations = [
  "National Association of Black Journalists",
  "Milwaukee Press Club",
];

const CareerPage = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <PageTransition>
      <Seo title="Career | Bryant McCray, TV Reporter" description="Bryant McCray's career in TV news: WGN-TV Chicago, WKYC Cleveland, CBS 58 Milwaukee and WFRV Green Bay." path="/career" />
      <main className="min-h-[100svh] bg-background newspaper-page">
        <Navigation />

        {/* Hero */}
        <header className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="editorial-container">
            <PageFlag>Career · Record</PageFlag>
            <FadeIn delay={0.1}>
              <h1 className="font-serif text-headline text-foreground mb-6">
                Where I've Been
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground max-w-xl leading-relaxed">
                Ten years since my first newsroom. Green Bay, Milwaukee, Cleveland, Chicago. Every stop taught me the same thing. Listen first, then tell it straight.
              </p>
            </FadeIn>
          </div>
        </header>

        {/* Timeline */}
        <section className="py-16">
          <div className="editorial-container">
            <SectionHead n={1}><h2 className="font-serif text-3xl md:text-4xl text-foreground">Experience</h2></SectionHead>

            <StaggerContainer className="space-y-0">
              {careerTimeline.map((item, index) => (
                <StaggerItem key={index}>
                  <div className="border-t border-border">
                  <Margin note={<div className="pt-9"><span className="block">{item.period}</span><span className="block">{item.org.split(",")[0]}</span></div>}>
                  <div className="py-8">
                    <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                      <div className="min-w-0">
                        <p className="hidden md:block xl:hidden text-sm text-muted-foreground mb-4">{item.period}</p>
                        <h3 className="font-serif text-xl text-foreground mb-1">
                          {item.role}
                        </h3>
                        <p className="text-foreground text-sm mb-3">{item.org}</p>
                        <ul className="space-y-1.5">
                          {item.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="text-muted-foreground text-sm leading-relaxed"
                            >
                              {b}
                            </li>
                          ))}
                          {index === 0 && (
                            <>
                              <li className="text-muted-foreground text-sm leading-relaxed">My reporting also runs on NewsNation and on Nexstar stations across the Midwest.</li>
                              <li className="text-muted-foreground text-sm leading-relaxed">Some of my stories are rewritten for the page under <Link to="/writing" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })} className="link-plain inline-flex min-h-11 items-center">Writing</Link>.</li>
                            </>
                          )}
                        </ul>
                      </div>
                      <div className="order-first grid min-w-0 gap-6 md:order-last">
                        {item.photos.map((photo) => (
                          <figure key={photo.src} className="press-photo min-w-0">
                            <img src={photo.src} srcSet={stillSrcSet(photo.src)} sizes="(min-width: 1280px) 590px, (min-width: 768px) 55vw, 100vw" alt={photo.alt} width={1920} height={1280} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover object-center" />
                            <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">{photo.caption}</figcaption>
                          </figure>
                        ))}
                      </div>
                    </div>
                  </div>
                  </Margin>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16">
          <div className="editorial-container">
            <SectionHead n={2}><h2 className="font-serif text-2xl text-foreground">Gallery</h2></SectionHead>
            <Margin>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {galleryImages.map((image) => (
                <button
                  type="button"
                  key={image.alt}
                  aria-label={`View photo: ${image.alt}`}
                  className="group relative w-20 h-20 md:w-24 md:h-24 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.src} alt={image.alt} width={96} height={96} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </button>
              ))}
            </div>
            </Margin>
          </div>
        </section>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-2 bg-background border-0 rounded-none">
            <DialogTitle className="sr-only">{selectedImage?.alt}</DialogTitle>
            {selectedImage && (
              <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-auto max-h-[80vh] object-contain" />
            )}
          </DialogContent>
        </Dialog>

        {/* Awards */}
        <section className="py-16">
          <div className="editorial-container">
            <SectionHead n={3}><h2 className="font-serif text-2xl text-foreground">Recognition</h2></SectionHead>

            <ul className="border-b border-border">
              {awards.map((award, index) => (
                <li key={index} className="border-t border-border">
                <Margin note={<div className="pt-6 tabular-nums">{award.year}</div>}>
                <div className="grid gap-1 py-5 md:grid-cols-12 md:gap-4">
                  <span className="text-sm tabular-nums text-muted-foreground md:col-span-3 lg:hidden">{award.year}</span>
                  <span className="md:col-span-9 lg:col-span-12">
                    <span className="block font-serif text-lg text-foreground">{award.title}</span>
                    <span className="block text-sm text-muted-foreground">{award.org}</span>
                  </span>
                </div>
                </Margin>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="py-16">
          <div className="editorial-container">
            <SectionHead n={4}><h2 className="font-serif text-2xl text-foreground">Education</h2></SectionHead>
            <Margin>
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-serif text-lg text-foreground mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.school}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Founded Knight Talk, the student news show that became GreenKnightTV. Class of 2016.</p>
                </div>
              ))}
            </Margin>
          </div>
        </section>

        {/* Affiliations */}
        <section className="py-16">
          <div className="editorial-container">
            <SectionHead n={5}><h2 className="font-serif text-2xl text-foreground">Affiliations</h2></SectionHead>
            <Margin>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {affiliations.map((org, index) => (
                  <p key={index} className="text-muted-foreground">{org}</p>
                ))}
              </div>
            </Margin>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default CareerPage;
