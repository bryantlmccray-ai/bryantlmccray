import type { ReactNode } from "react";
import { stillSrcSet } from "@/lib/stills";

/** Copper small-caps dateline that opens a dek: "MUNSTER, Ind." */
export const Dateline = ({ city, state }: { city: string; state?: string }) => (
  <span className="text-accent">
    <span className="dateline-city">{city}</span>
    {state ? `, ${state}` : ""}.{" "}
  </span>
);

export const Caption = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <figcaption className={`mt-2 text-sm leading-snug text-muted-foreground ${className}`}>{children}</figcaption>
);

type Img = { src: string; alt: string; caption: ReactNode; width?: number; height?: number; className?: string; sizes?: string; eager?: boolean };

const Photo = ({ img, imgClass }: { img: Img; imgClass: string }) => (
  <img
    src={img.src}
    srcSet={stillSrcSet(img.src)}
    sizes={img.sizes}
    alt={img.alt}
    width={img.width ?? 1920}
    height={img.height ?? 1080}
    loading={img.eager ? undefined : "lazy"}
    decoding="async"
    className={`w-full aspect-[3/2] object-cover ${imgClass} ${img.className ?? ""}`}
  />
);

/**
 * A large photo with a smaller inset laid over one bottom corner in a thin cream frame.
 * One caption line runs under the whole composition at the full width of the big photo:
 * the main caption, then the inset caption after "Inset:". From 640px the inset rises into
 * the photo by `insetClass` (negative top margin in % of width); below that it stacks under
 * the main photo, and the same single caption sits under the inset.
 */
type Shot = Omit<Img, "caption"> & { caption: string };

const sentence = (s: string) => s.trim().replace(/\.+$/, "");

export const Overlap = ({ main, inset, insetClass, side = "left", className = "", zoom = false }: {
  main: Shot; inset: Shot; insetClass: string; side?: "left" | "right"; className?: string; zoom?: boolean;
}) => (
  <div className={className}>
    <div className="overflow-hidden">
      <Photo img={main} imgClass={zoom ? "transition-transform duration-500 group-hover:scale-105" : ""} />
    </div>
    <figure className={`relative z-10 mt-6 w-3/4 ${side === "right" ? "sm:ml-auto" : "sm:mr-auto"} ${insetClass}`}>
      <div className="overflow-hidden border-4 border-background">
        <Photo img={inset} imgClass="" />
      </div>
    </figure>
    <Caption>{sentence(main.caption)}. Inset: {sentence(inset.caption)}.</Caption>
  </div>
);

/** Two-column margin layout from 1024px: a narrow note column beside the copy. */
export const Margin = ({ note, children, className = "" }: { note?: ReactNode; children: ReactNode; className?: string }) => (
  <div className={`lg:grid lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-x-10 ${className}`}>
    <div className="hidden lg:block text-xs leading-relaxed text-muted-foreground">{note}</div>
    <div className="min-w-0">{children}</div>
  </div>
);

/** Section opener used on Work, About and Career: one hairline, an old-style number, the heading. */
export const SectionHead = ({ n, children, className = "" }: { n: number; children?: ReactNode; className?: string }) => (
  <div className={`border-t border-foreground/25 pt-4 mb-8 lg:grid lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-x-10 ${className}`}>
    <span className="section-number block mb-2 lg:mb-0">{String(n).padStart(2, "0")}</span>
    <div className="min-w-0">{children}</div>
  </div>
);
