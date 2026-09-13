import { useState } from "react";
import {
  Shader,
  DotGrid,
  ChromaFlow,
  LinearGradient,
  CursorRipples,
  FilmGrain,
} from "shaders/react";

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

const CONTACT_EMAIL = "Bryant.l.mccray@gmail.com";

const SOCIALS: { label: string; href: string }[] = [
  { label: "Reel", href: "https://www.youtube.com/watch?v=F9po9pUJWio" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

const ContactSection = () => {
  // Shader.onUnavailable fires at most once when this browser or GPU cannot run
  // the canvas. It writes nothing to the console, so the fallback is ours to
  // draw. The section is already near black, so we only deepen the corner
  // gradient in CSS and let the content layer carry the section on its own.
  const [gpuUnavailable, setGpuUnavailable] = useState(false);

  return (
    <main className="contact-closer" data-gpu-unavailable={gpuUnavailable ? "true" : "false"}>
      <style>{`
        .contact-closer {
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          min-height: 100dvh;
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
          color: rgba(255, 255, 255, 0.4);
        }
        .contact-closer__socials { display: flex; gap: 1.75rem; }
        .contact-closer__socials a {
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

      <div className="contact-closer__canvas" aria-hidden="true">
        <Shader onUnavailable={() => setGpuUnavailable(true)}>
          <DotGrid
            id="trailDots"
            density={40}
            dotSize={{
              type: "map",
              source: "trailFlow",
              channel: "alpha",
              inputMax: 1,
              inputMin: 0,
              outputMax: 1,
              outputMin: 0,
            }}
            twinkle={0.9}
            visible={false}
          />
          <ChromaFlow id="trailFlow" intensity={1.4} radius={2.9} visible={false} />
          <LinearGradient
            colorA="#1e1e1f"
            colorB="#070708"
            colorSpace="hsl"
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          />
          <LinearGradient
            colorA="#000000"
            colorB="#ffffff"
            colorSpace="hsl"
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            maskSource="trailDots"
          />
          <CursorRipples />
          <FilmGrain strength={0.1} />
        </Shader>
      </div>

      <section className="contact-closer__invite">
        <h2 className="contact-closer__question reveal" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          Got a story?
        </h2>
        <a
          className="contact-closer__cta reveal"
          style={{ "--reveal-delay": "0.25s" } as React.CSSProperties}
          href={`mailto:${CONTACT_EMAIL}`}
        >
          Contact me
          <span className="contact-closer__underline" />
        </a>
      </section>

      <footer className="contact-closer__footer reveal" style={{ "--reveal-delay": "0.45s" } as React.CSSProperties}>
        <div className="contact-closer__socials">
          {SOCIALS.map((social) => (
            <a key={social.label} href={social.href}>
              {social.label}
            </a>
          ))}
        </div>
        <p className="contact-closer__rights">
          {new Date().getFullYear()} Bryant McCray
        </p>
        <p className="contact-closer__hint">( move your cursor )</p>
      </footer>
    </main>
  );
};

export default ContactSection;