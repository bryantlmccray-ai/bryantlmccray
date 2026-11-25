import { useLayoutEffect } from "react";
import { Helmet } from "react-helmet-async";

const SITE = "https://bryantmccray.com";
const IMAGE = `${SITE}/stills/bryant-field-action.jpg`;
const STATIC_SELECTORS = [
  'meta[name="description"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'link[rel="canonical"]',
];

type SeoProps = { title: string; description: string; path: string };

// Per-route head. The static index.html tags stay for non-JS crawlers; on the client
// they are lifted out while a route owns its own, so each tag appears once.
const Seo = ({ title, description, path }: SeoProps) => {
  useLayoutEffect(() => {
    const removed = Array.from(document.head.querySelectorAll<HTMLElement>(STATIC_SELECTORS.map((s) => `${s}:not([data-rh])`).join(",")));
    removed.forEach((el) => el.remove());
    return () => removed.forEach((el) => document.head.appendChild(el));
  }, [path]);

  const url = `${SITE}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:image:width" content="1620" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:image:alt" content="Bryant McCray reporting for WGN-TV beside a tree that fell on a car during a storm" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@BryantMcNews" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={IMAGE} />
    </Helmet>
  );
};

export default Seo;
