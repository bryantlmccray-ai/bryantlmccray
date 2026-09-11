# Remove splash and rebuild homepage introduction

## Changes
- Route `/` directly to the existing homepage, redirect `/home` back to `/`, remove the splash import, and delete the retired splash page.
- Check the source folder for any remaining links or navigation calls targeting `/home` and point them to `/` without changing other routes.
- Rework only the homepage introduction into a two-line masked name reveal, followed by the existing subhead, restored tagline, accent rule, and Emmy text in one staggered sequence.
- Replace the introduction video with the 2026 splash reel, preserving the existing two-column layout and desktop right-edge bleed.
- Carry over the reel's border, soft accent glow, autoplay/loop/inline playback, first-interaction sound attempt, and manual sound toggle.
- Respect reduced-motion preferences by rendering introduction content in its final position and opacity without transform animations.
- Leave the Press Reel, Selected Work, contact prompt, footer, modal, design tokens, type scale, and all other routes unchanged.

## Technical details
- Use React Router's `Navigate` for the legacy `/home` redirect.
- Keep a single semantic `h1`, with block spans providing the two clipped animation masks.
- Use Framer Motion's reduced-motion hook to disable initial and animated transforms when requested.
- Import the existing reel asset metadata and source the video from its `url` field.

## Verification
- Confirm no `/home` links or navigation calls remain except the redirect route.
- Confirm the retired splash page is deleted and no longer imported.
- Check the live homepage at desktop and mobile sizes, including the sound control and reduced-motion rendering.
- Confirm the project build remains healthy.
