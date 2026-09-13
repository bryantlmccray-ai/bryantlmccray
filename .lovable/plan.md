# Add the Work page story wall

## Scope
- Install Three.js, React Three Fiber 8, and Drei 9 for the existing React 18 app.
- Keep the existing React type packages at major version 18, which is already correctly aligned.
- Create `StoryWall.tsx` exactly from the supplied source.
- Lazy-load the wall on the Work page above the category filter, pass the filtered stories, reuse the current video overlay, and hide the wall below 768px with CSS.
- Preserve the existing story list and all other pages unchanged.

## Verification
- Confirm a clean build and inspect the latest diagnostics.
- At 1440px, verify the canvas, scene mesh count, card hover caption, matching video overlay, and existing list, then capture a screenshot.
- At 390px, verify the wall is hidden and there is no horizontal scrolling.

## Technical details
- Use `three`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122`, and Three.js types.
- Add only the minimal lazy import, `Suspense` wrapper, responsive wrapper styles, and `Story` compatibility needed in `Work.tsx`.
