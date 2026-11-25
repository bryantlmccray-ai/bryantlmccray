export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  organization: string;
};

// Real, attributed quotes only. The About page hides the section while this is empty.
export const testimonials: Testimonial[] = [];
