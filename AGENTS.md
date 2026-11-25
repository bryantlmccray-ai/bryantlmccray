# Architecture rules

- Writing pages read the ordered samples from `src/data/writing.ts` and own their PageTransition, shared Navigation and Footer, document titles, and immediate scroll reset, so print copy remains separate from presentation without changing other pages.
- Writing PDFs and images are served from `public/writing` at their supplied paths; WritingMedia owns pointer motion and disables it on mobile and reduced motion, keeping uploaded assets and interaction separate from final copy.
- NightTrail owns the shared shader tree and unavailable fallback; NightBand is used only for the Home record hero (ContactSection renders NightTrail directly); every other page opens with a plain cream header so evidence reads first.
- NightBand owns the optional absolute desktop portrait; record-gap placement measures metadata, markers, and wordmark to shrink or hide it without changing hero layout.
- Keep the cream navigation bar across dark and light sections for stable contrast without scroll-driven theme changes.
- Broadcast stories render through one StoryPage at /stories/:slug fed by src/data/stories.ts (newest first, also drives the Work Stories list); it owns the NightBand header, privacy-enhanced video, nonempty chapters, optional coverage links and citation JSON-LD, scroll reset and Helmet metadata with site-description dedupe, keeping story-specific additions data-driven.

- Story imagery prefers `still` (clean frames in public/stills) over YouTube frames everywhere a story is pictured, so pages show photographs rather than screen grabs.
- FadeIn/StaggerContainer/StaggerItem are plain pass-through wrappers: text, cards and timelines never animate in on scroll; motion is limited to the Home hero, image hover zoom and ContactSection.
- Experience is merged into /career (/experience redirects); testimonials live in src/data/testimonials.ts and render on About only when non-empty.
