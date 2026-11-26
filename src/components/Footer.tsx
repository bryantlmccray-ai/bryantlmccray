import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Folio } from "@/components/Editorial";

const Footer = () => {
  const { pathname } = useLocation();
  const page = pathname.startsWith("/stories/") ? "Story" : pathname.startsWith("/writing/") ? "Writing" : ({ "/work": "Work", "/writing": "Writing", "/about": "About", "/career": "Career" }[pathname] ?? "Home");
  return (
    <>
    <Folio page={page} />
    <footer className="pt-20 pb-[calc(5rem+env(safe-area-inset-bottom))] border-t border-border">
      <div className="editorial-container">
        <div className="flex flex-col items-start">
          <p className="text-muted-foreground text-sm mb-6 max-w-md">
            Email is the fastest way to reach me.
          </p>
          <Button variant="solid" asChild>
            <a href="mailto:bryant.l.mccray@gmail.com">Get in Touch</a>
          </Button>
          
          <div className="mt-16 pt-8 border-t border-border w-full">
            <p className="text-sm text-muted-foreground mb-2">
              Written and reported by Bryant McCray in Chicago. Last updated November 2026.
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Bryant McCray. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
