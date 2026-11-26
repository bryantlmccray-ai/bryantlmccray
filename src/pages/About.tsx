import Seo from "@/components/Seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SectionHead, PublicationNameplate, Byline, Margin, PageFlag } from "@/components/Editorial";
import { testimonials } from "@/data/testimonials";
import aaccwiMark from "@/assets/aaccwi-mark.png";
import loyolaAcademyLogo from "@/assets/loyola-academy-logo.png";

// Titles are the links: internal routes use Link, outside pages open in a new tab, no icons.
const ItemLink = ({ href, className = "", children }: { href?: string; className?: string; children: ReactNode }) => {
  if (!href) return <span className={className}>{children}</span>;
  const cls = `link-plain inline-block py-2.5 -my-1 ${className}`;
  return href.startsWith("/") ? (
    <Link to={href} className={cls}>{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  );
};

const RECOGNITION = [
  { year: "2026", honor: "Regional Emmy® nominee, NATAS Central Great Lakes", story: "One Traffic Stop, An Unlikely Rescue", detail: "Crime/Justice News.", station: "WKYC, Cleveland", href: "/stories/one-traffic-stop-an-unlikely-rescue" },
  { year: "2026", honor: "Regional Emmy® nominee, NATAS Central Great Lakes", story: "Break in a Cold Case", detail: "Crime/Justice News, team coverage of the arrest in the murder of Aliza Sherman.", station: "WKYC, Cleveland", href: "https://wkycdirectorscut.blogspot.com/2026/04/wkyc-garners-27-regional-emmy.html" },
  { year: "2026", honor: "Regional Emmy® nominee, NATAS Central Great Lakes", story: "TikTok on the Clock as the Feed May Go Dark", detail: "Daily News Report, single shift.", station: "WKYC, Cleveland", href: "https://wkycdirectorscut.blogspot.com/2026/04/wkyc-garners-27-regional-emmy.html" },
  { year: "2023", honor: "Regional Emmy® nominee, NATAS Chicago/Midwest", story: "CBS 58 Eye on AI", detail: "Team nomination with the CBS 58 newsroom.", station: "WDJT, Milwaukee", href: "https://chicagoemmyonline.org/files/2023/10/2023-Chicago-Midwest-Nomination-List.pdf" },
];

const APPEARANCES: { logo?: string; logoAlt?: string; label: string; org: string; title: string; detail: string; href: string }[] = [
  { logo: aaccwiMark, logoAlt: "African American Chamber of Commerce of Wisconsin", label: "Emcee", org: "AACC Wisconsin", title: "2023 Breakfast of Champions", detail: "African American Chamber of Commerce of Wisconsin. Fiserv Forum, Milwaukee. September 27, 2023.", href: "https://www.aaccwi.org/boc2023" },
  { logo: loyolaAcademyLogo, logoAlt: "Loyola Academy", label: "Speaker", org: "Loyola Academy", title: "Ramble 2025", detail: "Loyola Academy's benefit for tuition assistance. Shared my story with Brittany McCray, Class of 2012. March 15, 2025.", href: "https://goramblers.myschoolapp.com/page/news-detail?pk=1560959&siteId=1102&ssl=1" },
  { logo: loyolaAcademyLogo, logoAlt: "Loyola Academy", label: "Featured", org: "Loyola Academy", title: "Portrait of a Rambler", detail: "Loyola Academy alumni profile. Class of 2012.", href: "https://www.goramblers.org/portrait-of-a-rambler-bryant-mccray" },
  { label: "Featured", org: "St. Norbert College", title: "Founder of Knight Talk", detail: "St. Norbert's video news service, now GreenKnightTV, started as the student show I built in 2014. Class of 2016.", href: "https://snc.edu/news/magazine/student-run-video-news-service-builds-audience-campus" },
  { label: "In the news", org: "CBS 58", title: "Stepping with the Stars", detail: "Won the men's competition at Milwaukee's Stepping with the Stars, raising money for Aurora at Home. June 2023.", href: "https://www.cbs58.com/news/cbs-58-reporter-bryant-mccray-wins-milwaukees-stepping-with-the-stars-mens-competition" },
];

const About = () => {
  return (
    <PageTransition>
      <Seo title="About Bryant McCray | TV Reporter, Chicago" description="Bryant McCray grew up on Chicago's West Side and now reports for WGN-TV. Four-time Regional Emmy® nominee." path="/about" />
      <main className="min-h-[100svh] bg-background newspaper-page">
        <Navigation />
        
        <header className="pt-28 pb-10 md:pt-32 md:pb-12">
          <div className="wide-container">
            <PageFlag>About · Profile</PageFlag>
            <PublicationNameplate title="About" center="Reporter, WGN-TV" />
          </div>
        </header>

        <section className="pb-20 md:pb-28">
          <div className="wide-container">
            <h2 className="font-serif text-[32px] md:text-[44px] lg:text-[48px] leading-[1.08] text-foreground mb-6">
              I grew up on the West Side. Now I report on the whole city.
            </h2>
            <Margin note="WGN-TV · Chicago · November 2026"><div className="grid gap-y-10 lg:grid-cols-5">
              <article className="min-w-0 lg:col-span-3 lg:pr-10">
                <figure className="press-photo mb-8">
                  <picture>
                    <source type="image/webp" srcSet="/stills/bryant-rain-portrait-800.webp 800w, /stills/bryant-rain-portrait-1200.webp 1200w" sizes="(min-width: 1024px) 760px, 100vw" />
                    <img src="/stills/bryant-rain-portrait.jpg" alt="Bryant McCray in a WGN hat and rain jacket, holding a WGN microphone." width={1206} height={1608} loading="eager" fetchPriority="high" decoding="async" className="block w-full aspect-[4/5] object-cover object-top" />
                  </picture>
                  <figcaption className="mt-2 text-sm text-muted-foreground">Reporting during storm coverage for WGN-TV, July 2026.</figcaption>
                </figure>
                <Byline date="November 2026" />
                <p className="mt-1 text-sm text-muted-foreground">WGN-TV · Chicago · Since 2026</p>
                <div className="mt-6 space-y-6 font-serif text-xl text-foreground/80 leading-relaxed max-w-[65ch]">
                  <p className="first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-[64px] first-letter:leading-[0.85]">
                    I was raised on Chicago's West Side, with Mario's Italian Ice in one hand and Italian Fiesta pizza in the other. I went to Alain Locke Charter School, then Loyola Academy up in Wilmette.
                  </p>
                  <p>
                    TV news started for me at St. Norbert College, on a student show called Knight Talk. From there it was Green Bay, then Milwaukee, then Cleveland. Now I'm home, at WGN.
                  </p>
                  <blockquote className="press-quote hanging-quote border-y border-border py-5">
                    <p className="text-2xl md:text-[32px] leading-snug">Chicago taught me early that people don't want to be impressed. They want to be understood.</p>
                    <cite className="mt-3 block font-sans text-sm not-italic text-muted-foreground">Bryant McCray</cite>
                  </blockquote>
                  <p>
                    So that's how I report. I show up, I listen, and I let the people in the story carry it.
                  </p>
                  <p>
                    Four Regional Emmy® nominations so far, three of them this year for my work in Cleveland. One of those started with a traffic stop that turned up a raccoon and a meth pipe.
                  </p>
                </div>
              </article>
              <aside className="min-w-0 border-t border-border pt-8 lg:col-span-2 lg:border-t-0 lg:border-l lg:pl-7 lg:pt-0">
                <h2 className="font-serif text-3xl text-foreground mb-3">Honors</h2>
                <p className="font-serif text-xl text-foreground mb-5">Four Regional Emmy® nominations.</p>
                <ul className="border-b border-border">
                  {RECOGNITION.map((row) => (
                    <li key={row.story} className="border-t border-border py-5">
                      <p className="text-sm text-muted-foreground mb-2">{row.year} · {row.station}</p>
                      <ItemLink href={row.href} className="font-serif text-xl text-foreground min-h-11">{row.story}</ItemLink>
                      <p className="text-base text-muted-foreground mt-2 leading-relaxed">{row.honor}</p>
                      <p className="text-base text-muted-foreground mt-1 leading-relaxed">{row.detail}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-b border-border py-6">
                  <h2 className="font-serif text-2xl text-foreground mb-3">Also carried on</h2>
                  <p className="text-base text-foreground/80 leading-relaxed">
                    My WGN reporting also runs on{" "}
                    <Link to="/work" className="link-plain underline">NewsNation and Nexstar stations</Link>{" "}
                    across the Midwest.
                  </p>
                </div>
                <a href="mailto:bryant.l.mccray@gmail.com" className="mt-4 inline-flex min-h-11 items-center text-base text-foreground underline underline-offset-[3px]">Get in Touch</a>
              </aside>
            </div>
          </Margin></div>
        </section>

        {testimonials.length > 0 && (
          <section className="pb-20 md:pb-28">
            <div className="editorial-container">
              <SectionHead n={3}><h2 className="font-serif text-2xl text-foreground">What colleagues say</h2></SectionHead>
              <div className="border-b border-border">
                {testimonials.map((t) => (
                  <figure key={`${t.name}-${t.organization}`} className="border-t border-border py-8">
                    <blockquote className="font-serif text-xl text-foreground leading-relaxed mb-4">"{t.quote}"</blockquote>
                    <figcaption className="text-sm text-muted-foreground">
                      <span className="text-foreground">{t.name}</span>, {t.title}, {t.organization}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="pb-24 md:pb-32">
          <div className="wide-container">
            <div className="border-t border-border pt-6 mb-8">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                Rooms I've hosted. Places that told my story.
              </h2>
            </div>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3">
              {APPEARANCES.map((item) => (
                <li key={item.title} className="min-w-0 border-t border-border py-8 md:px-6 md:[&:nth-child(2n)]:border-l lg:[&:nth-child(2n)]:border-l-0 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n)]:border-l">
                  <p className="text-xs uppercase tracking-widest text-accent mb-3">{item.label}</p>
                  {item.logo && <img src={item.logo} alt={item.logoAlt} width={56} height={56} loading="lazy" decoding="async" className="mb-3 h-auto max-h-12 w-14 object-contain object-left" />}
                  <p className="text-sm text-muted-foreground mb-1">{item.org}</p>
                  <ItemLink href={item.href} className="font-serif text-2xl text-foreground min-h-11">{item.title}</ItemLink>
                  <p className="text-base text-muted-foreground leading-relaxed mt-3">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default About;
