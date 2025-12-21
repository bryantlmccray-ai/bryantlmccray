import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const experience = [
  {
    role: "Broadcast Reporter",
    organization: "Regional News Network",
    period: "2021 – Present",
    description: "Enterprise reporting, live breaking news coverage, and daily anchor segments.",
  },
  {
    role: "Multimedia Journalist",
    organization: "Local ABC Affiliate",
    period: "2018 – 2021",
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
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="editorial-container">
          <p className="text-xs text-accent tracking-widest uppercase mb-4 opacity-start animate-fade-in">
            Experience
          </p>
          
          <h1 className="font-serif text-headline text-foreground mb-6 opacity-start animate-fade-up animation-delay-100">
            Professional Background
          </h1>
          
          <p className="text-muted-foreground max-w-xl leading-relaxed opacity-start animate-fade-up animation-delay-200">
            Emmy-nominated reporter with experience across broadcast and digital platforms. 
            Skilled in on-air delivery, enterprise reporting, and audience-centered storytelling.
          </p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 border-t border-border">
        <div className="editorial-container">
          <h2 className="font-serif text-2xl text-foreground mb-10">
            Career
          </h2>
          
          <div className="space-y-0">
            {experience.map((item, index) => (
              <div 
                key={index}
                className="py-8 border-b border-border last:border-b-0"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 border-t border-border bg-secondary/30">
        <div className="editorial-container">
          <h2 className="font-serif text-2xl text-foreground mb-10">
            Recognition
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="py-6">
                <p className="text-xs text-accent tracking-widest uppercase mb-2">
                  {award.year}
                </p>
                <h3 className="font-serif text-lg text-foreground mb-1">
                  {award.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {award.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-16 border-t border-border">
        <div className="editorial-container">
          <h2 className="font-serif text-2xl text-foreground mb-10">
            Affiliations
          </h2>
          
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {affiliations.map((org, index) => (
              <p key={index} className="text-muted-foreground">
                {org}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Experience;
