import type { ComponentPropsWithoutRef } from "react";
import NightTrail from "@/components/NightTrail";

const NightBand = ({ children, className = "", ...props }: ComponentPropsWithoutRef<"section">) => (
  <section {...props} className={`night-band relative isolate overflow-hidden ${className}`}>
    <NightTrail className="night-band__trail" />
    {children}
  </section>
);

export default NightBand;