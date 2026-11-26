import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/career", label: "Career" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => location.pathname.startsWith(href);

  useEffect(() => setIsOpen(false), [location.pathname]);

  // Full-screen sheet: lock body scroll, trap focus, Escape closes and focus returns to the menu button.
  useEffect(() => {
    if (!isOpen) return;
    const sheet = sheetRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(sheet?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const button = menuButtonRef.current;
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      button?.focus();
    };
  }, [isOpen]);

  return (
    <nav aria-label="Main" className="fixed top-0 left-0 right-0 z-50 bg-background pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="editorial-container">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center font-serif text-xl tracking-tight text-foreground hover:text-accent transition-colors duration-300"
          >
            Bryant McCray
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`inline-flex min-h-11 items-center px-2 text-sm tracking-wide transition-colors duration-300 ${
                  isActive(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden inline-flex h-11 w-11 -mr-2.5 items-center justify-center text-foreground"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isOpen && createPortal(
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="md:hidden fixed inset-0 z-[60] flex flex-col bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
        >
          <div className="editorial-container w-full">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="inline-flex min-h-11 items-center font-serif text-xl tracking-tight text-foreground">
                Bryant McCray
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 -mr-2.5 items-center justify-center text-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <ul className="editorial-container w-full mt-6 border-t border-border">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-border">
                <Link
                  to={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`flex min-h-16 items-center justify-between font-serif text-3xl ${
                    isActive(link.href) ? "text-accent" : "text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && <span className="text-[11px] font-sans uppercase tracking-widest">Current</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>,
        document.body,
      )}
    </nav>
  );
};

export default Navigation;
