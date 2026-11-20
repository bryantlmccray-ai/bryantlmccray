# Architecture rules

- Writing pages read the ordered samples from `src/data/writing.ts` and own their PageTransition, shared Navigation and Footer, document titles, and immediate scroll reset, so print copy remains separate from presentation without changing other pages.
- Writing PDFs and images are served from `public/writing` at their supplied paths; WritingMedia owns pointer motion and disables it on mobile and reduced motion, keeping uploaded assets and interaction separate from final copy.