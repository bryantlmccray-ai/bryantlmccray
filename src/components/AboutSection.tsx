import { Award, BookOpen, Mic, Users } from "lucide-react";

const stats = [
  { icon: BookOpen, value: "500+", label: "Articles Published" },
  { icon: Award, value: "12", label: "Journalism Awards" },
  { icon: Mic, value: "50+", label: "Speaking Events" },
  { icon: Users, value: "1M+", label: "Readers Reached" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-5xl font-bold text-primary">JD</span>
                  </div>
                  <p className="text-muted-foreground italic">
                    "The truth is rarely pure and never simple."
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-accent font-semibold tracking-widest uppercase mb-3">
              About Me
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Dedicated to Journalism That Matters
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-10">
              <p>
                With over a decade in investigative journalism, I've dedicated my career 
                to stories that expose injustice and amplify unheard voices. My work has 
                appeared in major publications including The National Times, Global Report, 
                and The Weekly.
              </p>
              <p>
                I specialize in long-form investigative pieces covering politics, social 
                justice, environmental issues, and technology's impact on society. My 
                approach combines rigorous research with deeply human storytelling.
              </p>
              <p>
                When I'm not chasing a story, I mentor young journalists and speak at 
                universities about the importance of ethical reporting in the digital age.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 bg-secondary rounded-lg hover:shadow-soft transition-shadow duration-300"
                >
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <p className="font-serif text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
