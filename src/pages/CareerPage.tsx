import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";

const careerTimeline = [
  {
    role: "Multimedia Journalist",
    org: "WKYC (NBC) — Cleveland, OH",
    period: "2024 – 2025",
    bullets: [
      "Video journalist covering community stories and regional events across Northeast Ohio.",
      "Produced daily packages for broadcast and digital platforms on tight deadlines.",
    ],
  },
  {
    role: "Broadcast Reporter",
    org: "CBS 58 — Milwaukee, WI",
    period: "2022 – 2024",
    bullets: [
      "Enterprise reporting and live breaking news coverage for top-rated newscasts.",
      "Emmy-nominated for investigative segment on AI deepfake technology.",
      "Developed long-form stories centering community voices and underserved neighborhoods.",
    ],
  },
  {
    role: "Producer & Broadcast Reporter",
    org: "WFRV (CBS) — Green Bay, WI",
    period: "2016 – 2018",
    bullets: [
      "Story development, guest coordination, and segment production.",
      "Anchored weekend shows and produced daily content across platforms.",
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
    degree: "Bachelor of Arts in Journalism",
    school: "Columbia College Chicago",
    year: "2016",
  },
];

const awards = [
  {
    title: "Emmy Nomination — Eye on AI: Deepfake Technology",
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
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
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
                Emmy-nominated journalist with a decade of experience across broadcast 
                and digital platforms. Every role sharpened the same instinct — listen first, 
                then tell the truth cleanly.
              </p>
            </FadeIn>
          </div>
        </section>

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
                    whileHover={{ x: 10, backgroundColor: "hsl(var(--secondary) / 0.3)" }}
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
                    whileHover={{ y: -8, scale: 1.02 }}
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
                    {edu.school} · {edu.year}
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
