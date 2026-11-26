import Seo from "@/components/Seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn } from "@/components/ScrollAnimations";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
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
      <main className="min-h-[100svh] bg-background">
        <Navigation />
        
        <header className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="editorial-container">
            <FadeIn delay={0.1}>
              <h1 className="font-serif text-headline text-foreground mb-8">
                I grew up on the West Side. Now I report on the whole city.
              </h1>
            </FadeIn>
          </div>
        </header>

        <section className="pt-4 pb-24 md:pt-8 md:pb-32">
          <div className="editorial-container">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 max-md:overflow-x-clip">
              {/* Creative Photo Layout */}
              <FadeIn direction="left" className="lg:col-span-7 order-1">
                <div className="relative">
                  <div className="overflow-hidden">
                    <img
                      src="/stills/bryant-field-action.jpg"
                      alt="Bryant McCray reporting for WGN-TV beside a tree that fell on a car during a storm"
                      width={1620}
                      height={1080}
                      className="w-full aspect-[3/2] object-cover object-left"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-1/3 overflow-hidden border-4 border-background">
                    <img
                      src="/stills/bryant-field-westside.jpg"
                      alt="Bryant McCray reporting live for WGN-TV on Chicago's West Side"
                      width={1920}
                      height={1080}
                      loading="lazy"
                      className="w-full aspect-[3/2] object-cover"
                    />
                  </div>
                </div>
              </FadeIn>

              {/* Content */}
              <div className="lg:col-span-5 order-2">

                <FadeIn delay={0.3}>
                  <div className="space-y-6 text-foreground/80 leading-relaxed">
                    <p>
                      I was raised on Chicago's West Side, with Mario's Italian Ice in one hand and Italian Fiesta pizza in the other. I went to Alain Locke Charter School, then Loyola Academy up in Wilmette.
                    </p>

                    <p>
                      TV news started for me at St. Norbert College, on a student show called Knight Talk. From there it was Green Bay, then Milwaukee, then Cleveland. Now I'm home, at WGN.
                    </p>

                    <p>
                      Chicago taught me early that people don't want to be impressed. They want to be understood. So that's how I report. I show up, I listen, and I let the people in the story carry it.
                    </p>

                    <p>
                      Four-time Regional Emmy® Award Nominee. Three of those nominations came this year.
                    </p>

                    <p>
                      My WGN reporting also runs on{" "}
                      <Link
                        to="/work"
                        className="link-plain underline"
                      >
                        NewsNation and Nexstar stations
                      </Link>{" "}
                      across the Midwest.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="editorial-container">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
              Four Regional Emmy® nominations.
            </h2>
            <ul className="border-b border-border">
              {RECOGNITION.map((row) => (
                <li key={row.story} className="grid gap-1 border-t border-border py-5 md:grid-cols-12 md:items-baseline md:gap-6">
                  <span className="text-sm tabular-nums text-muted-foreground md:col-span-1">{row.year}</span>
                  <span className="text-sm text-muted-foreground md:col-span-3">{row.honor}</span>
                  <span className="md:col-span-6">
                    <ItemLink href={row.href} className="font-serif text-xl text-foreground">{row.story}</ItemLink>
                    <span className="block text-sm text-muted-foreground mt-1">{row.detail}</span>
                  </span>
                  <span className="text-sm text-muted-foreground md:col-span-2 md:text-right">{row.station}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {testimonials.length > 0 && (
          <section className="pb-20 md:pb-28">
            <div className="editorial-container">
              <h2 className="font-serif text-2xl text-foreground mb-6">What colleagues say</h2>
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
          <div className="editorial-container">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              Rooms I've hosted. Places that told my story.
            </h2>
            <ul className="border-b border-border">
              {APPEARANCES.map((item) => (
                <li key={item.title} className="flex gap-5 border-t border-border py-6">
                  <div className="w-14 shrink-0 pt-1">
                    {item.logo && <img src={item.logo} alt={item.logoAlt} width={56} height={56} loading="lazy" decoding="async" className="h-auto max-h-12 w-14 object-contain object-left" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">{item.label} · {item.org}</p>
                    <ItemLink href={item.href} className="font-serif text-xl text-foreground">{item.title}</ItemLink>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-[60ch]">{item.detail}</p>
                  </div>
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
