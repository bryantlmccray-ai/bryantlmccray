# Architecture rules

- Writing pages read the ordered samples from `src/data/writing.ts` and own their PageTransition, shared Navigation and Footer, document titles, and immediate scroll reset, so print copy remains separate from presentation without changing other pages.
- Writing PDFs and images are served from `public/writing` at their supplied paths; WritingMedia owns pointer motion and disables it on mobile and reduced motion, keeping uploaded assets and interaction separate from final copy.
- NightTrail owns the shared shader tree and unavailable fallback; NightBand scopes dark header colors and readiness, leaving reading sections and the contact closer independent.
- NightBand owns optional absolute desktop portraits; headers reserve text space and preserve original height, while record-gap placement measures metadata, markers, and wordmark to shrink or hide portraits without changing hero layout.
- Keep the cream navigation bar across dark and light sections for stable contrast without scroll-driven theme changes.
- Broadcast stories render through one StoryPage at /stories/:slug fed by src/data/stories.ts (newest first, also drives the Work Stories list); it owns the NightBand header, privacy-enhanced video, nonempty chapters, optional coverage links and citation JSON-LD, scroll reset and Helmet metadata with site-description dedupe, keeping story-specific additions data-driven.
