# Architecture rules

- Writing pages read the ordered samples from `src/data/writing.ts` and own their PageTransition, shared Navigation and Footer, document titles, and immediate scroll reset, so print copy remains separate from presentation without changing other pages.
- Writing PDFs and images are served from `public/writing` at their supplied paths; WritingMedia owns pointer motion and disables it on mobile and reduced motion, keeping uploaded assets and interaction separate from final copy.
- NightTrail owns the shared shader tree and unavailable fallback; NightBand is used only on Home (reel-first opening band, then the record slideshow) and ContactSection renders NightTrail directly; every other page opens with a plain cream header so evidence reads first.
- NightBand owns the optional absolute desktop portrait; record-gap placement measures metadata, markers, and wordmark to shrink or hide it without changing hero layout.
- Keep the cream navigation bar across dark and light sections for stable contrast without scroll-driven theme changes.
- Broadcast stories render through one StoryPage at /stories/:slug fed by src/data/stories.ts (newest first, also drives the Work Stories list); it owns the NightBand header, privacy-enhanced video, nonempty chapters, optional coverage links and citation JSON-LD, scroll reset and Helmet metadata with site-description dedupe, keeping story-specific additions data-driven.

- Story imagery prefers `still` (clean frames in public/stills) over YouTube frames everywhere a story is pictured, so pages show photographs rather than screen grabs.
- FadeIn/StaggerContainer/StaggerItem are plain pass-through wrappers: text, cards and timelines never animate in on scroll; motion is limited to the Home hero, image hover zoom and ContactSection.
- Experience is merged into /career (/experience redirects); testimonials live in src/data/testimonials.ts and render on About only when non-empty.
- Per-route head tags go through src/components/Seo.tsx, which lifts the static index.html description/og/twitter/canonical tags while a route owns its own, so each tag appears once yet non-JS crawlers keep a fallback.
- Stills in public/stills ship pre-generated -800.webp and -1600.webp siblings; use stillSrcSet() from src/lib/stills.ts for srcset, with the JPG as src fallback. The reel ID and title live in the same module so one change updates every reel reference.
- Mobile hit areas are at least 44px, hover zoom is disabled under (hover: none), heights use svh, and fixed or full-bleed elements pad with env(safe-area-inset-*); the mobile menu is a portal so the nav's backdrop blur cannot clip it.
- Editorial lists over cards: items are separated by a single top hairline with no outer border, panel, shadow or rounding; titles are the links (.link-plain, underline on hover/focus only), primary actions use the square `solid` button variant and secondary actions are underlined text, and accent eyebrows appear only in the Home opening band and on story pages; copper datelines (from Story.dateline) are the one accent allowed in story items.

- Layering primitives live in src/components/Editorial.tsx (Overlap, Caption, Dateline, Margin, SectionHead) and still captions come from src/lib/storyMeta.ts, so captions use only story data and Work, About and Career share one section and margin-note treatment.
- Paper grain is a background-image on main.bg-background in index.css, so it sits under text and dark bands cover it.
