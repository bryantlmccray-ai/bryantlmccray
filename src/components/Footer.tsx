import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="pt-20 pb-[calc(5rem+env(safe-area-inset-bottom))] border-t border-border">
      <div className="editorial-container">
        <div className="flex flex-col items-center text-center">
          <p className="text-muted-foreground text-sm mb-6 max-w-md">
            Email is the fastest way to reach me.
          </p>
          <Button variant="editorial" size="sm" asChild>
            <a href="mailto:bryant.l.mccray@gmail.com" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
          </Button>
          
          <div className="mt-16 pt-8 border-t border-border w-full">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Bryant McCray. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
