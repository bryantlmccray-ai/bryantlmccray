import { ExternalLink, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const articles = [
  {
    id: 1,
    title: "The Hidden Cost of Progress: Inside the Silicon Valley Labor Crisis",
    category: "Investigation",
    date: "December 2024",
    publication: "National Times",
    excerpt: "An in-depth investigation revealing the working conditions of contract workers in major tech companies...",
    featured: true,
  },
  {
    id: 2,
    title: "Climate Refugees: Stories from the Frontlines",
    category: "Feature",
    date: "November 2024",
    publication: "Global Report",
    excerpt: "Following families displaced by climate change across three continents...",
    featured: true,
  },
  {
    id: 3,
    title: "The Digital Divide in Rural America",
    category: "Long-form",
    date: "October 2024",
    publication: "The Weekly",
    excerpt: "How internet access inequality is shaping educational outcomes...",
    featured: false,
  },
  {
    id: 4,
    title: "Voices of Change: Youth Activism in 2024",
    category: "Profile",
    date: "September 2024",
    publication: "National Times",
    excerpt: "Profiles of young leaders reshaping political discourse...",
    featured: false,
  },
];

const WorkSection = () => {
  return (
    <section id="work" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-accent font-semibold tracking-widest uppercase mb-3">
            Featured Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Stories That Make an Impact
          </h2>
          <p className="text-muted-foreground text-lg">
            A selection of my most significant investigative pieces and feature articles 
            that have driven conversation and change.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Card 
              key={article.id}
              className={`group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-card bg-card border-border overflow-hidden ${
                article.featured ? 'md:col-span-1' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground italic">
                    {article.publication}
                  </span>
                  <span className="text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read Article <ExternalLink className="h-4 w-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
