import { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
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
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";

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
    bullets: [
      "Breaking news, severe weather, and state and national politics for Chicago's WGN-TV.",
    ],
  },
  {
    role: "Reporter",
    org: "WKYC (NBC), Cleveland, OH",
    period: "2024 – 2025",
    bullets: [
      "Breaking news, crime and courts, and community stories across Northeast Ohio.",
      "Three of those stories were nominated for Great Lakes Emmys in 2026.",
    ],
  },
  {
    role: "Broadcast Reporter",
    org: "CBS 58, Milwaukee, WI",
    period: "2022 – 2024",
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
    bullets: [
      "Story development, guest booking, and segment production.",
      "Produced and reported daily for Northeast Wisconsin.",
    ],
  },
];

const skills = [
  "On-Air Delivery",
  "Enterprise Reporting",
  "Live Breaking News",
  "Video Production",
  "Digital Storytelling",
  "Audience Strategy",
  "AP Style Writing",
  "Interview Technique",
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
    title: "Emmy Nomination, Eye on AI: Deepfake Technology",
    org: "Chicago/Midwest Chapter, NATAS",
    year: "2023",
  },
  {
    title: "Newcomer of the Year Nomination",
    org: "Greater Cleveland Association of Black Journalists",
    year: "2024",
  },
];

const affiliations = [
  "National Association of Black Journalists",
  "Milwaukee Press Club",
];

const CareerPage = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  useLayoutEffect(() => {
    const previousTitle = document.title;
    document.title = "Career | Bryant McCray";
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navigation />

        {/* Hero */}
        <header className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="editorial-container">
            <FadeIn>
              <p className="text-xs text-accent tracking-widest uppercase mb-4">
                Career
              </p>
            </FadeIn>
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
        <section className="py-16 border-t border-border">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-2xl text-foreground mb-10">
                Experience
              </h2>
            </FadeIn>

            <StaggerContainer className="space-y-0">
              {careerTimeline.map((item, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="py-8 border-b border-border last:border-b-0"
                    whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.3)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid md:grid-cols-12 gap-4">
                      <div className="md:col-span-3">
                        <p className="text-sm text-muted-foreground">{item.period}</p>
                      </div>
                      <div className="md:col-span-9">
                        <h3 className="font-serif text-xl text-foreground mb-1">
                          {item.role}
                        </h3>
                        <p className="text-accent text-sm mb-3">{item.org}</p>
                        <ul className="space-y-1.5">
                          {item.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-accent"
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 border-t border-border">
          <div className="editorial-container">
            <h2 className="font-serif text-2xl text-foreground mb-10">Gallery</h2>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {galleryImages.map((image) => (
                <motion.button
                  type="button"
                  key={image.alt}
                  aria-label={`View photo: ${image.alt}`}
                  className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-sm cursor-pointer"
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-2 bg-background/95 backdrop-blur-sm border-border">
            <DialogTitle className="sr-only">{selectedImage?.alt}</DialogTitle>
            {selectedImage && (
              <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-auto max-h-[80vh] object-contain rounded-sm" />
            )}
          </DialogContent>
        </Dialog>

        {/* Skills */}
        <section className="py-16 border-t border-border bg-secondary/30">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-2xl text-foreground mb-10">
                Skills
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="text-sm text-foreground border border-border px-4 py-2 rounded-sm bg-background"
                    whileHover={{ borderColor: "hsl(var(--accent))", color: "hsl(var(--accent))" }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Awards */}
        <section className="py-16 border-t border-border">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-2xl text-foreground mb-10">
                Recognition
              </h2>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 gap-8">
              {awards.map((award, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="py-6"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs text-accent tracking-widest uppercase mb-2">
                      {award.year}
                    </p>
                    <h3 className="font-serif text-lg text-foreground mb-1">
                      {award.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{award.org}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Education */}
        <section className="py-16 border-t border-border bg-secondary/30">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-2xl text-foreground mb-10">
                Education
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              {education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-serif text-lg text-foreground mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.school}
                  </p>
                </div>
              ))}
            </FadeIn>
          </div>
        </section>

        {/* Affiliations */}
        <section className="py-16 border-t border-border">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-2xl text-foreground mb-10">
                Affiliations
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {affiliations.map((org, index) => (
                  <motion.p
                    key={index}
                    className="text-muted-foreground"
                    whileHover={{ color: "hsl(var(--accent))", x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {org}
                  </motion.p>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default CareerPage;
