import NightTrail from "@/components/NightTrail";

/**
 * The closer. A near black, full viewport contact section whose background is
 * the interactive piece: moving the cursor paints a twinkling halftone trail
 * that glows and fades, with chromatic ripple fringes and film grain over it.
 *
 * How the shader tree works, because it is not obvious and it breaks silently.
 * ChromaFlow (id trailFlow) renders nothing. Its cursor field is sampled by
 * DotGrid (id trailDots) through the dotSize map driver, so dots only grow
 * where the cursor has recently been. DotGrid also renders nothing. Its id is
 * the maskSource on the white LinearGradient, and that is what you actually
 * see. Both invisible components must stay in the tree, and both id links must
 * stay intact: dotSize.source to trailFlow, maskSource to trailDots. Remove
 * either one and the whole effect dies with no error.
 *
 * Every shader prop below is a static literal. None of it is React state.
 */

const SOCIALS: { label: string; href: string }[] = [
  { label: "Reel", href: "https://youtu.be/3xhS6QEm7A0" },
  { label: "WGN-TV", href: "https://wgntv.com/author/bryant-mccray/" },
  { label: "YouTube", href: "https://www.youtube.com/@BryantMcNews" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bryant-mccray-018bba69" },
];

const ContactSection = () => {
  return (
    <main className="contact-closer">
      <style>{`
        .contact-closer {
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #070708;
          color: #fff;
          font-family: 'Satoshi', ui-sans-serif, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .contact-closer[data-gpu-unavailable="true"] {
          background: linear-gradient(to top right, #1e1e1f, #070708);
        }
        .contact-closer__canvas {
          position: absolute;
          inset: 0;
        }
        .contact-closer__canvas > * {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .contact-closer__invite {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 1.5rem;
          text-align: center;
        }
        .contact-closer__question {
          font-family: 'Satoshi', ui-sans-serif, system-ui, sans-serif;
          font-size: 1.5rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }
        .contact-closer__cta {
          display: inline-block;
          margin-top: 1.25rem;
          max-width: 100%;
          overflow-wrap: break-word;
          font-size: clamp(2.2rem, 7vw, 6rem);
          line-height: 1.05;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .contact-closer__cta:hover { color: rgba(255, 255, 255, 0.85); }
        .contact-closer__underline {
          display: block;
          margin: 0.5rem auto 0;
          height: 3px;
          width: 0;
          background: rgba(255, 255, 255, 0.7);
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .contact-closer__cta:hover .contact-closer__underline,
        .contact-closer__cta:focus-visible .contact-closer__underline { width: 100%; }
        .contact-closer__footer {
          position: relative;
          z-index: 10;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0 1.5rem 2.25rem;
          font-family: 'Geist Mono', ui-monospace, monospace;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
        }
        .contact-closer__socials { display: flex; gap: 1.75rem; }
        .contact-closer__socials a {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          min-width: 44px;
          justify-content: center;
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .contact-closer__socials a:hover,
        .contact-closer__socials a:focus-visible { color: #fff; }
        .contact-closer__hint { display: none; margin: 0; }
        .contact-closer__rights { margin: 0; }
        @media (min-width: 640px) {
          .contact-closer__question { font-size: 1.875rem; }
          .contact-closer__footer { padding: 0 3rem 2.25rem; }
          .contact-closer__hint { display: block; }
        }
        .reveal {
          opacity: 0;
          animation: contact-reveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--reveal-delay, 0s);
        }
        @keyframes contact-reveal {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; animation: none; }
          .contact-closer__underline { transition: none; }
        }
      `}</style>

      <NightTrail className="contact-closer__canvas" />

      <footer className="contact-closer__footer reveal" style={{ "--reveal-delay": "0.45s" } as React.CSSProperties}>
        <div className="contact-closer__socials">
          {SOCIALS.map((social) => {
            const external = social.href.startsWith("https://");
            return (
              <a key={social.label} href={social.href} target={external ? "_blank" : undefined} rel={external ? "noopener me" : undefined}>
                {social.label}
              </a>
            );
          })}
        </div>
        <p className="contact-closer__rights">
          {new Date().getFullYear()} Bryant McCray
        </p>
      </footer>
    </main>
  );
};

export default ContactSection;