import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";

const experience = [
  {
    role: "Broadcast Reporter",
    organization: "CBS 58",
    period: "2022 – 2024",
    description: "Enterprise reporting and live breaking news coverage.",
  },
  {
    role: "Multimedia Journalist",
    organization: "WKYC",
    period: "2024 – 2025",
    description: "Solo video journalist covering community stories and regional events.",
  },
  {
    role: "Associate Producer",
    organization: "Morning News Program",
    period: "2016 – 2018",
    description: "Story development, guest coordination, and segment production.",
  },
];

const awards = [
  {
    title: "Emmy Nomination",
    category: "Outstanding Enterprise Reporting",
    year: "2024",
  },
  {
    title: "Regional Press Award",
    category: "Best Breaking News Coverage",
    year: "2023",
  },
  {
    title: "Journalism Excellence Award",
    category: "Community Reporting",
    year: "2022",
  },
];

const affiliations = [
  "National Association of Black Journalists",
  "Society of Professional Journalists",
  "Investigative Reporters and Editors",
];

const Experience = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <Navigation />
        
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="editorial-container">
            <FadeIn>
              <p className="text-xs text-accent tracking-widest uppercase mb-4">
                Experience
              </p>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="font-serif text-headline text-foreground mb-6">
                Professional Background
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-muted-foreground max-w-xl leading-relaxed">
                Emmy-nominated reporter with experience across broadcast and digital platforms. 
                Skilled in on-air delivery, enterprise reporting, and audience-centered storytelling.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-16 border-t border-border">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-2xl text-foreground mb-10">
                Career
              </h2>
            </FadeIn>
            
            <StaggerContainer className="space-y-0">
              {experience.map((item, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="py-8 border-b border-border last:border-b-0"
                    whileHover={{ x: 10, backgroundColor: "hsl(var(--secondary) / 0.3)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid md:grid-cols-12 gap-4">
                      <div className="md:col-span-3">
                        <p className="text-sm text-muted-foreground">
                          {item.period}
                        </p>
                      </div>
                      <div className="md:col-span-9">
                        <h3 className="font-serif text-xl text-foreground mb-1">
                          {item.role}
                        </h3>
                        <p className="text-accent text-sm mb-3">
                          {item.organization}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Awards */}
        <section className="py-16 border-t border-border bg-secondary/30">
          <div className="editorial-container">
            <FadeIn>
              <h2 className="font-serif text-2xl text-foreground mb-10">
                Recognition
              </h2>
            </FadeIn>
            
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
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
                    <p className="text-sm text-muted-foreground">
                      {award.category}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
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

export default Experience;
