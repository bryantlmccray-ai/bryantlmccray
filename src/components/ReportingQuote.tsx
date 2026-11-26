import { Caption } from "@/components/Editorial";
import { stillSrcSet } from "@/lib/stills";

type ReportingQuoteProps = {
  quote: string;
  attribution: string;
  href?: string;
  photo?: { src: string; alt: string; caption: string };
  photoRight?: boolean;
  photoAfterOnMobile?: boolean;
  extraLarge?: boolean;
};

/** Published voices with scene captions kept distinct from speaker attribution. */
const ReportingQuote = ({ quote, attribution, href, photo, photoRight = false, photoAfterOnMobile = false, extraLarge = false }: ReportingQuoteProps) => (
  <div className={`grid min-w-0 gap-7 border-y border-border py-8 md:gap-10 md:py-12 ${photo ? "md:grid-cols-2 md:items-center" : ""}`}>
    {photo && <figure className={`press-photo min-w-0 ${photoRight ? "md:order-2" : "md:order-none"} ${photoAfterOnMobile ? "order-2" : ""}`}>
      <img src={photo.src} srcSet={stillSrcSet(photo.src)} sizes="(min-width: 768px) 560px, calc(100vw - 48px)" width={1920} height={1080} alt={photo.alt} loading="lazy" decoding="async" className="block aspect-video w-full object-cover" />
      <Caption>{photo.caption}</Caption>
    </figure>}
    <blockquote className={`press-quote min-w-0 ${photoRight ? "md:order-1" : ""}`}>
      <p className={`font-serif leading-[1.12] text-foreground text-[32px] ${extraLarge ? "md:text-[64px]" : "md:text-[44px]"}`}>“{quote}”</p>
      <cite className="mt-5 block font-sans text-sm leading-relaxed not-italic text-muted-foreground">
        {href ? <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">{attribution}</a> : attribution}
      </cite>
    </blockquote>
  </div>
);

export default ReportingQuote;