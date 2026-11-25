export type Story = {
  slug: string;
  youtubeId: string;
  kicker: string;
  headline: string;
  dek: string;
  videoSrc: string;
  chapters: string[];
  metaDescription: string;
  coverage?: { outlet: string; title: string; url: string }[];
};

// Newest first; the Work page Stories list uses this order.
export const stories: Story[] = [
  {
    slug: "election-night-2026",
    youtubeId: "vEyqRmLleUk",
    kicker: "WGN NEWS · NOVEMBER 2026 · CHICAGO",
    headline: "Election Night 2026",
    dek: "From the eve of the vote to a historic result. I covered Illinois' Election Day from the preview, through the governor's race results, to a live shot on the lakefront as J.B. Pritzker won a third term.",
    videoSrc: "https://www.youtube-nocookie.com/embed/vEyqRmLleUk?rel=0",
    chapters: [
      "The preview: what was on the ballot",
      "Results: the governor's race",
      "Live on the lakefront: a historic third term",
    ],
    metaDescription: "Bryant McCray covers Illinois' 2026 Election Day for WGN-TV, from the ballot preview to the governor's race results and J.B. Pritzker's third term.",
  },
  {
    slug: "amtrak-rail-yard",
    youtubeId: "gCQBi65OJZ0",
    kicker: "WGN NEWS · 2026 · PILSEN, CHINATOWN AND BRIDGEPORT",
    headline: "Amtrak and the South Side Rail Yard",
    dek: "Amtrak plans to move its maintenance facility from the South Loop to an unused rail yard that runs through Chinatown and Bridgeport. At a packed meeting in Pilsen, residents said nobody asked them first.",
    videoSrc: "https://www.youtube-nocookie.com/embed/gCQBi65OJZ0?rel=0",
    chapters: ["The community meeting", "Live: what happens next"],
    metaDescription: "Bryant McCray reports for WGN-TV on Amtrak's plan for a rail yard through Chinatown and Bridgeport, and the Pilsen residents who say nobody asked them.",
  },
  {
    slug: "bears-stadium-fight",
    youtubeId: "AeIe9BmfADo",
    kicker: "WGN NEWS · 2026 · ARLINGTON HEIGHTS AND CHICAGO",
    headline: "The Bears Stadium Fight",
    dek: "Where the Chicago Bears build next is a fight that touches taxpayers, suburbs and the city itself. I covered the reaction in Arlington Heights and the drama around the stadium plan.",
    videoSrc: "https://www.youtube-nocookie.com/embed/AeIe9BmfADo?rel=0",
    chapters: ["Arlington Heights reacts", "Live: the stadium drama"],
    metaDescription: "Bryant McCray covers the Chicago Bears stadium fight for WGN-TV, from the reaction in Arlington Heights to the drama around the stadium plan.",
  },
  {
    slug: "nwi-storm-series",
    youtubeId: "5hQTl-y7-YQ",
    kicker: "WGN NEWS · AUGUST 2026 · MUNSTER, INDIANA",
    headline: "After the Storm: Northwest Indiana",
    dek: "A storm knocked out power to more than 300,000 people across Northwest Indiana. Over ten days I followed it from the National Guard's first cleanup in Lake County, to families waiting in the dark, to a Munster town hall where residents asked who is responsible for the poles and trees that keep failing.",
    videoSrc: "https://www.youtube-nocookie.com/embed/5hQTl-y7-YQ?rel=0",
    chapters: [
      "Live from Munster: the National Guard moves in (Aug. 13)",
      "Flood recovery: waiting for power (Aug. 13)",
      "The town hall: who answers for the poles (Aug. 21)",
    ],
    metaDescription: "Bryant McCray follows Northwest Indiana's storm recovery for WGN-TV, from National Guard cleanup to families without power and a Munster town hall.",
  },
  {
    slug: "one-traffic-stop-an-unlikely-rescue",
    youtubeId: "kdEjhUDVZiE",
    kicker: "WKYC · MAY 2025 · SPRINGFIELD TOWNSHIP, OHIO",
    headline: "One Traffic Stop, An Unlikely Rescue",
    dek: "Springfield Township police pulled a car over and found a raccoon named Chewy in the driver's seat with a meth pipe in its mouth. The video went national. I covered the stop and what happened to Chewy. The story was nominated for a 2026 Central Great Lakes Emmy in Crime/Justice News.",
    videoSrc: "https://www.youtube-nocookie.com/embed/kdEjhUDVZiE?rel=0",
    chapters: [],
    metaDescription: "Bryant McCray's Emmy-nominated WKYC report on the Springfield Township traffic stop where police found a raccoon with a meth pipe, a story that made national news.",
    coverage: [
      { outlet: "NBC News", title: "Ohio police find raccoon holding meth pipe during traffic stop", url: "https://www.nbcnews.com/news/us-news/ohio-police-find-raccoon-holding-meth-pipe-traffic-stop-rcna205508" },
      { outlet: "Fox News", title: "Pet raccoon caught with meth pipe in its mouth when cops pulled over Ohio woman", url: "https://www.foxnews.com/us/pet-raccoon-caught-meth-pipe-its-mouth-when-cops-pulled-over-ohio-woman-expect-unexpected" },
      { outlet: "WKYC", title: "Police share new details about raccoon found with meth pipe during Springfield Township traffic stop", url: "https://www.wkyc.com/article/news/crime/springfield-township-police-new-details-pet-raccoon-meth-pipe-traffic-stop-chewy/95-0358232f-a1a6-412c-bea7-24728328d949" },
      { outlet: "NATAS Central Great Lakes", title: "2026 Regional Emmy nomination, Crime/Justice - News (via WKYC)", url: "https://wkycdirectorscut.blogspot.com/2026/04/wkyc-garners-27-regional-emmy.html" },
    ],
  },
];
