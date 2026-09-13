# Add the Home contact closer

## Changes
- Install the `shaders` package and build a dedicated Home-only contact component using imports from `shaders/react`.
- Render the requested six-layer shader tree in the exact order and preserve both invisible driver linkages.
- Add the full-viewport contact copy, real email destination, footer links, current-year copyright, typography, underline interaction, and staggered reveal.
- Replace only the existing Footer instance on the Home page with the new contact closer. Keep the shared Footer component and every other page unchanged.
- Add the requested Satoshi and Geist Mono font connections and stylesheets to the document head.
- Provide a safe plain-background fallback when WebGPU is unavailable, with all contact content and links still usable.

## Technical details
- Keep all shader props as static literals with no reactive bindings.
- Scope the contact styling to the new component, including the reveal keyframes and reduced-motion override.
- Use the React package subpath and do not exclude `shaders` from Vite dependency optimization.
- Keep the section isolated, full viewport height, clipped horizontally, and accessible while the shader layer remains decorative.

## Verification
- Confirm the canvas mount, WebGPU availability, invisible driver ids, and both driver references.
- Confirm all three reveal nodes finish at full opacity with no transform after 1.5 seconds.
- Confirm the CTA email destination and centered underline growth before and after hover.
- Confirm no horizontal overflow at 390px.
- Capture the 1470px-wide contact closer after moving the pointer across its center, and confirm the project build is clean.
