import { useLayoutEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import NightTrail from "@/components/NightTrail";

type NightBandProps = ComponentPropsWithoutRef<"section"> & {
  portrait?: { src: string; alt: string; position?: string };
  portraitPlacement?: "header" | "record-gap";
};

const NightBand = ({ children, className = "", portrait, portraitPlacement = "header", onPointerMove, onPointerLeave, ...props }: NightBandProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitAnchorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 90, damping: 24 });
  const y = useSpring(0, { stiffness: 90, damping: 24 });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = section?.querySelector<HTMLElement>(":scope > .editorial-container");
    if (!portrait || portraitPlacement !== "header" || !section || !content) return;
    let lastWidth = -1;
    let active = true;
    const preserveHeight = () => {
      const width = section.getBoundingClientRect().width;
      if (width === lastWidth) return;
      lastWidth = width;
      content.style.height = "";
      if (width < 768) return;
      // Measure the original unreserved column, then reserve portrait space without growing the band.
      content.style.paddingRight = getComputedStyle(content).paddingLeft;
      const bandStyle = getComputedStyle(section);
      const height = section.getBoundingClientRect().height - parseFloat(bandStyle.paddingTop) - parseFloat(bandStyle.paddingBottom);
      content.style.paddingRight = "";
      content.style.height = `${height}px`;
    };
    preserveHeight();
    const observer = new ResizeObserver(preserveHeight);
    observer.observe(section);
    void document.fonts.ready.then(() => {
      if (!active) return;
      lastWidth = -1;
      preserveHeight();
    });
    return () => {
      active = false;
      observer.disconnect();
      content.style.height = "";
      content.style.paddingRight = "";
    };
  }, [portrait?.src, portraitPlacement]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const anchor = portraitAnchorRef.current;
    const metadata = section?.querySelector<HTMLElement>("[data-record-metadata]");
    const markers = section?.querySelector<HTMLElement>("[data-record-markers]");
    const wordmark = section?.querySelector<HTMLElement>("[data-record-wordmark]");
    if (portraitPlacement !== "record-gap" || !section || !anchor || !metadata || !markers || !wordmark) return;
    const placePortrait = () => {
      const band = section.getBoundingClientRect();
      const top = metadata.getBoundingClientRect().bottom;
      const bottom = Math.min(markers.getBoundingClientRect().top, wordmark.getBoundingClientRect().top);
      const available = Math.max(0, bottom - top - 16);
      const width = band.width >= 1024 ? 128 : 112;
      const height = band.width >= 1024 ? 172 : 150;
      const scale = Math.min(1, available / height);
      anchor.style.visibility = band.width < 768 || width * scale < 96 ? "hidden" : "visible";
      anchor.style.top = `${top - band.top + (bottom - top - height * scale) / 2}px`;
      anchor.style.setProperty("--portrait-width", `${width * scale}px`);
      anchor.style.setProperty("--portrait-height", `${height * scale}px`);
    };
    placePortrait();
    const observer = new ResizeObserver(placePortrait);
    [section, metadata, markers, wordmark].forEach((element) => observer.observe(element));
    // Wordmark fitting changes the marker's margin without resizing the marker itself.
    const markerObserver = new MutationObserver(placePortrait);
    markerObserver.observe(markers, { attributes: true, attributeFilter: ["style"] });
    return () => {
      observer.disconnect();
      markerObserver.disconnect();
    };
  }, [portrait?.src, portraitPlacement]);

  return (
    <section
      {...props}
      ref={sectionRef}
      className={`night-band relative isolate overflow-hidden ${portrait ? `night-band--portrait ${portraitPlacement === "record-gap" ? "night-band--record-portrait" : ""}` : ""} ${className}`}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!portrait || reducedMotion || event.pointerType !== "mouse" || !window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches) return;
        const bounds = sectionRef.current?.getBoundingClientRect();
        if (!bounds) return;
        x.set((0.5 - (event.clientX - bounds.left) / bounds.width) * 12);
        y.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 12);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        x.set(0);
        y.set(0);
      }}
    >
      <NightTrail className="night-band__trail" />
      {children}
      {portrait && (
        <div ref={portraitAnchorRef} className="night-band__portrait-anchor absolute pointer-events-none">
          <motion.figure
            className="night-band__portrait overflow-hidden"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
          >
            <motion.img
              src={portrait.src}
              alt={portrait.alt}
              className="night-band__portrait-image pointer-events-auto h-full w-full object-cover"
              style={{ objectPosition: portrait.position ?? "center top", x: reducedMotion ? 0 : x, y: reducedMotion ? 0 : y, scale: 1.08 }}
            />
          </motion.figure>
        </div>
      )}
    </section>
  );
};

export default NightBand;