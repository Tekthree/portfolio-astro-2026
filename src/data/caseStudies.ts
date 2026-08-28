export interface CaseStudyBlock {
  heading: string;
  body: string;
}

export interface CaseStudyTimelineEntry {
  label: string;
  detail: string;
}

export interface CaseStudyGalleryImage {
  src: string;
  alt: string;
}

/* Grouped so the stack reads as decisions ("Data: Neon, R2") rather than an
   undifferentiated pile of logos. Only list what the project actually uses —
   every entry here was verified against the repo's package.json or the live
   site, never assumed from the project type. */
export interface CaseStudyStackGroup {
  label: string;
  items: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tag: string;
  heroImage: string;
  /* Outbound link to the actual live site, rendered near the top of the case
     study. Omitted (not guessed) where no live URL is confirmed -- Kobase is
     an older/archived landing-page engagement with no documented live URL. */
  websiteUrl?: string;
  overview: string;
  problem: {
    intro: string;
    bullets: string[];
  };
  /* Image slider rendered right after the Problem section — placeholder
     screenshots for now (see each project's comment below), to be swapped
     for real curated images later. */
  galleryAfterProblem?: CaseStudyGalleryImage[];
  /* Full-page design comp, shown in a browser frame that scrolls internally.
     Only worth it where the whole page is the deliverable. */
  fullPage?: { src: string; srcSmall?: string; alt: string };
  stack?: CaseStudyStackGroup[];
  solution: {
    intro: string;
    blocks?: CaseStudyBlock[];
  };
  /* The "how", kept separate from the Solution narrative on purpose. Solution
     says what was built and why it mattered to the client; craft says how it
     works and what the interface decisions were. Mixing them made both vague. */
  craft?: CaseStudyBlock[];
  /* Second slider, after the Solution section — same placeholder status. */
  galleryAfterSolution?: CaseStudyGalleryImage[];
  timeline?: CaseStudyTimelineEntry[];
  outcome: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'butterfly-cfi',
    title: 'The Butterfly CFI',
    client: 'Jenn Sturgill',
    tag: 'Branding & Identity',
    heroImage: '/assets/images/69d55440de29525bb5ec52a8_the_butterfly_cfi_logo_mock_up.jpg',
    websiteUrl: 'https://www.thebutterflycfi.com',
    overview:
      "The Butterfly CFI is a Seattle flight school built around a different kind of student: adults starting later, women, LGBTQIA+ pilots, and anyone who's been burned by a bad instructor or intimidated by the math. Jenn was building the brand and audience before her CFI certification was even finalized.",
    problem: {
      intro:
        "Jenn needed a brand and a site that could build an audience before she had anything to sell — no aircraft, no bookings yet, just the promise of a different kind of instruction.",
      bullets: [
        'No brand identity yet, and the target audience is underserved by typical flight-school marketing',
        "Jenn's own rocky path through flight training (inconsistent instructors, being used for logbook hours) needed to become the differentiator, not a liability",
        'Had to warm an audience months ahead of being able to actually teach anyone',
      ],
    },
    galleryAfterProblem: [
      { src: '/assets/images/case-study-temp/butterfly-cfi/shot-1.jpg', alt: 'The Butterfly CFI site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/butterfly-cfi/shot-2.jpg', alt: 'The Butterfly CFI site — placeholder screenshot' },
    ],
    stack: [
      { label: 'Platform', items: ['Webflow'] },
      { label: 'Delivery', items: ['Cloudflare'] },
      { label: 'Marketing', items: ['Lead-magnet PDF', 'Single-CTA landing page', '7-email nurture sequence'] },
    ],
    solution: {
      intro:
        'Built the brand from the ground up, then wrapped it in a full pre-launch marketing system instead of just a website.',
      blocks: [
        {
          heading: 'Brand & Logo',
          body: 'A white butterfly built from headphone shapes — nature and tech in one negative-space mark, monochromatic and deliberately not cartoonish.',
        },
        {
          heading: 'Website',
          body: "A Webflow site (Home, About/Founder, What Sets Us Apart, Start Your Aviation Journey, Learning Resources) built around Jenn's own training story as the trust signal.",
        },
        {
          heading: 'Lead Generation',
          body: 'A lead-magnet PDF ("From Dreams to Wings"), a single-CTA landing page, and a 7-email nurture sequence built on a value-first framework — welcome/story, cost breakdown, learning-style mismatch, community, a student success story, and a consultation CTA.',
        },
      ],
    },
    galleryAfterSolution: [
      { src: '/assets/images/case-study-temp/butterfly-cfi/shot-3.jpg', alt: 'The Butterfly CFI site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/butterfly-cfi/shot-4.jpg', alt: 'The Butterfly CFI site — placeholder screenshot' },
    ],
    timeline: [
      { label: 'Jul 2024', detail: 'Kickoff' },
      { label: 'Aug 2024', detail: 'Site and brand shipped' },
      { label: 'Nov 2024', detail: 'Logo published to social' },
    ],
    craft: [
      {
        heading: 'A mark that reads at favicon size',
        body: "The logo is a white butterfly whose wings are formed from headphone shapes, so nature and instruction sit in one negative-space mark. It is monochromatic and deliberately not illustrative, because a flight instructor's brand ends up on a business card, a social avatar, and a browser tab, and a detailed mark stops being legible at every one of those sizes.",
      },
      {
        heading: 'Site architecture built around trust, not services',
        body: "The page structure opens on the founder's own training story. A service list is the obvious move and the wrong one here, because the audience is people who were burned by a previous instructor or talked out of flying entirely. Home, About and Founder, What Sets Us Apart, Start Your Aviation Journey, and Learning Resources are ordered as an objection-handling sequence: who you are, why you are different, and only then what to do next.",
      },
      {
        heading: 'One call to action per page',
        body: "The lead-magnet landing page carries a single action and nothing else, no navigation competing for the click. The seven-email sequence that follows is ordered by objection: welcome and story, what it really costs, why a learning-style mismatch is usually the real problem, community, a student's outcome, and only then a consultation ask.",
      },
    ],
    outcome:
      "The full system — brand, site, lead magnet, and email sequence — shipped to production ahead of Jenn's certification, giving her an audience to launch to instead of starting from zero.",
  },
  {
    slug: 'spencer-grey-art',
    title: 'Spencer Grey Art',
    client: 'Spencer Grey',
    tag: 'Web Design & Dev',
    heroImage: '/assets/images/69d555693be7d4ffefb2a937_spencer_grey_website_on_pixel_jones_portfolio_site.jpg',
    websiteUrl: 'https://spencergreyart.com',
    overview:
      'Spencer Grey is a Seattle painter whose work draws on a cosmic, spiritual sensibility. The brief was a full artist portfolio and print store that felt nothing like a template.',
    problem: {
      intro:
        'The default options for an artist site — a generic portfolio template or an Etsy-style craft marketplace — would have flattened the work.',
      bullets: [
        'Needed to avoid the plain-grid-plus-headshot look of most artist portfolio templates',
        'Needed to avoid reading as a craft marketplace',
        'Wanted a "raw, intimate, cinematic" studio-visit feel instead',
      ],
    },
    galleryAfterProblem: [
      { src: '/assets/images/case-study-temp/spencer-grey-art/shot-1.jpg', alt: 'Spencer Grey Art site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/spencer-grey-art/shot-2.jpg', alt: 'Spencer Grey Art site — placeholder screenshot' },
    ],
    stack: [
      { label: 'Framework', items: ['Next.js 15 (App Router)', 'React', 'TypeScript'] },
      { label: 'Data', items: ['Neon (serverless Postgres)', 'Cloudflare R2'] },
      { label: 'Auth', items: ['iron-session (cookie-based)'] },
      { label: 'Commerce', items: ['Stripe'] },
      { label: 'Type', items: ['Cardinal Fruit', 'Suisse Intl'] },
      { label: 'Hosting', items: ['Vercel'] },
    ],
    solution: {
      intro:
        'A custom Next.js build instead of a page builder, with a full commerce layer underneath a deliberately quiet design.',
      blocks: [
        {
          heading: 'Store & Admin',
          body: 'Edition tracking, Stripe checkout, and a full custom admin CMS for managing artwork, collections, and orders — built rather than bolted onto a template.',
        },
        {
          heading: 'Design System',
          body: 'A dual-typeface fluid type system, full-bleed dark imagery, and near-zero copy — five stated design principles: the work commands the frame, intimacy over polish, black as gallery wall, earn the collector\'s patience, and every word of copy earns its place.',
        },
        {
          heading: 'Voice',
          body: "Alt text and copy written in Spencer's own voice — specific material descriptions, not generic \"artwork image\" filler.",
        },
      ],
    },
    galleryAfterSolution: [
      { src: '/assets/images/case-study-temp/spencer-grey-art/shot-3.jpg', alt: 'Spencer Grey Art site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/spencer-grey-art/shot-4.jpg', alt: 'Spencer Grey Art site — placeholder screenshot' },
    ],
    craft: [
      {
        heading: 'Migrating off Supabase mid-project',
        body: "The store originally ran on Supabase for all three of database, auth, and file storage. That is convenient until the subscription is the largest line item on a small artist store. It moved to Neon for Postgres, iron-session for auth, and Cloudflare R2 for images, which removed the recurring cost entirely. The migration ran as two scripts: one to build the schema, one to move the data and re-upload every image into R2 under its own prefix. Three collections, eight artworks, ten content rows, eleven orders, and a blog post came across without downtime.",
      },
      {
        heading: 'Auth without an identity provider',
        body: "There is exactly one admin. Standing up a full identity provider for one person is the kind of decision that quietly adds a dependency, a bill, and an outage you do not control. Admin auth is an encrypted iron-session cookie instead, which is a few dozen lines and no third party in the login path.",
      },
      {
        heading: 'Design rules that decide arguments in advance',
        body: "The build runs on five written principles: the work commands the frame, intimacy over polish, black as gallery wall, earn the collector's patience, and every word of copy earns its place. They exist so layout questions have an answer before anyone debates them. In practice that produced a full-bleed 16/7 hero with the call to action tucked bottom-left so it never sits on top of the painting, a cream and near-black palette instead of pure white, and near-zero body copy anywhere near the work.",
      },
      {
        heading: 'Alt text as writing, not compliance',
        body: "Every image describes its real materials and subject in the artist's own register. The default is a filename or the phrase artwork image. That is an accessibility requirement and a search signal at the same time, and it is the difference between a screen reader describing a painting and announcing a placeholder.",
      },
    ],
    outcome:
      'Live at spencergreyart.com, running on Next.js, Neon, and Cloudflare R2 after a mid-project infrastructure migration off Supabase.',
  },
  {
    slug: 'dsc-family-reunion',
    title: 'DSC Family Reunion',
    client: 'Brandon Williams',
    tag: 'Web Design',
    heroImage: '/assets/images/69d55e6c12ad0b79a8a3f9ae_dsc_family_reunion_pixel_jones.jpg',
    websiteUrl: 'https://dscfamilyreunion.com',
    overview:
      "DSC Family Reunion is the site for a multi-generational family reunion — a Royal Caribbean cruise in 2026 for the Deal, Shepherd, Coleman, and Penland families. Built for Tek's brother Brandon, who coordinates the event.",
    problem: {
      intro:
        "The 2025 reunion's site was built in Webflow, which was fine for static info but couldn't support what the 2026 cruise reunion needed.",
      bullets: [
        'Needed a real guestbook with photo uploads, not a form plugin',
        'Needed an interactive family tree spanning 7 generations and 116 people',
        'Webflow could not support either without third-party workarounds',
      ],
    },
    galleryAfterProblem: [
      { src: '/assets/images/case-study-temp/dsc-family-reunion/shot-1.jpg', alt: 'DSC Family Reunion site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/dsc-family-reunion/shot-2.jpg', alt: 'DSC Family Reunion site — placeholder screenshot' },
    ],
    stack: [
      { label: 'Framework', items: ['Astro 4', '@astrojs/vercel'] },
      { label: 'Data', items: ['Neon (serverless Postgres)', 'Cloudflare R2'] },
      { label: 'Visualization', items: ['D3'] },
      { label: 'Motion', items: ['GSAP', 'Lenis'] },
      { label: 'Hosting', items: ['Vercel'] },
    ],
    solution: {
      intro:
        'Rebuilt on Astro with a real backend underneath, while keeping the visual identity the family already recognized.',
      blocks: [
        {
          heading: 'Guestbook',
          body: 'Neon-backed guestbook with Cloudflare R2 photo uploads, portrait/landscape-aware card layout.',
        },
        {
          heading: 'Family Tree',
          body: '116 people across 7 generations and 4 family branches, rendered with D3 — drag, zoom, expand/collapse, search, and per-family filtering.',
        },
        {
          heading: 'Visual Continuity',
          body: "The old Webflow CSS was ported forward as the base style layer instead of rebuilt from scratch, so the site the family already knew didn't change identity, just capability.",
        },
      ],
    },
    galleryAfterSolution: [
      { src: '/assets/images/case-study-temp/dsc-family-reunion/shot-3.jpg', alt: 'DSC Family Reunion site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/dsc-family-reunion/shot-4.jpg', alt: 'DSC Family Reunion site — placeholder screenshot' },
    ],
    craft: [
      {
        heading: 'The family tree is the whole engineering problem',
        body: "116 people across seven generations and four family branches does not fit on a screen, and it does not fit in a static image either. It renders with D3 as an interactive graph: drag to pan, zoom, expand and collapse a branch, search by name, and filter to one of the four families. The interaction design matters more than the rendering here, because the default state of a tree that size is an unreadable wall. It opens collapsed and lets people walk their own branch.",
      },
      {
        heading: 'Photo uploads that do not touch the server',
        body: "The guestbook takes photos from phones at a family event, which means large files over bad connections. Uploads never proxy through the app. The browser requests a short-lived presigned URL and sends the file straight to Cloudflare R2. The server only ever handles the resulting record. It never touches the bytes. Cards render portrait or landscape aware, so a vertical phone photo is not letterboxed into a horizontal frame.",
      },
      {
        heading: 'Keeping the site the family already recognized',
        body: "The 2025 reunion site was Webflow. Rebuilding on Astro could have meant a visual reset, and for an audience that is largely not technical, a site that suddenly looks like a different site reads as the wrong link. The existing Webflow CSS was ported forward as the base style layer instead of being rebuilt, so the identity stayed put and only the capability changed.",
      },
      {
        heading: 'Motion that stays out of the way',
        body: "GSAP handles reveals and Lenis smooths the scroll, both tuned well down. On a site people open to find a date and a hotel, animation that delays information is a cost, not a feature.",
      },
    ],
    outcome:
      'Live at dscfamilyreunion.com ahead of the July 2026 cruise, with the guestbook and family tree both fully interactive.',
  },
  {
    slug: 'tremulant',
    title: 'Tremulant',
    client: 'Joe Bellingham',
    tag: 'Print & Poster Design',
    heroImage: '/assets/images/69d55fe73960cc20e9554315_tremulant_poster_pixel_jones.jpg',
    websiteUrl: 'https://tremulant-2dd0f2a0e36f3f54c2f91acc0cc8d.webflow.io/',
    overview:
      'Tremulant is a Seattle underground electronic music series run by Joe Bellingham, hosting shows at Timbre Room and Cherry Seattle with a rotating lineup of touring and local acts.',
    problem: {
      intro:
        'A recurring event series needs a visual identity that holds together across dozens of one-off pieces — posters, an album cover, a monthly series — without repeating itself.',
      bullets: [
        'Every show needed its own poster, adapted across multiple output dimensions',
        'The label needed an album cover built from a hand-drawn concept, not a stock template',
        'The brand needed an evergreen piece — a monthly poster series — to stay visible between events',
      ],
    },
    galleryAfterProblem: [
      { src: '/assets/images/case-study-temp/tremulant/shot-1.jpg', alt: 'Tremulant site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/tremulant/shot-2.jpg', alt: 'Tremulant site — placeholder screenshot' },
    ],
    stack: [
      { label: 'Platform', items: ['Webflow'] },
      { label: 'Interaction', items: ['Splide', 'Lottie'] },
      { label: 'Print & artwork', items: ['Photoshop', 'Illustrator'] },
    ],
    solution: {
      intro:
        'A multi-year design relationship built around one recognizable visual language, applied differently every time.',
      blocks: [
        {
          heading: 'Event Posters',
          body: 'Recurring, dated posters for individual shows, each adapted to every output size the event needed.',
        },
        {
          heading: 'Album Art',
          body: "A full hand-drawn-to-digital pipeline for the label's album cover: sketch, Photoshop cleanup, Illustrator vector trace, color and shadow pass, then an oil-paint texture finish.",
        },
        {
          heading: 'Monthly Poster',
          body: 'An ongoing series built around "cosmic and earthly elements juxtaposed, vintage textural elements" — the throughline across every other piece.',
        },
      ],
    },
    galleryAfterSolution: [
      { src: '/assets/images/case-study-temp/tremulant/shot-3.jpg', alt: 'Tremulant site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/tremulant/shot-4.jpg', alt: 'Tremulant site — placeholder screenshot' },
    ],
    timeline: [
      { label: '2021', detail: 'Relationship begins' },
      { label: '2021–2024', detail: 'Recurring posters, album art, monthly series' },
    ],
    craft: [
      {
        heading: 'Hand-drawn to vector, deliberately',
        body: "The album cover started on paper and ran a full pipeline from there: pencil sketch, Photoshop cleanup, an Illustrator vector trace, a colour and shadow pass, then an oil-paint texture finish over the top. Tracing a real drawing keeps the line weight irregular in a way vector tools do not produce on their own, and the texture pass puts back the surface that vectorising strips out.",
      },
      {
        heading: 'One system, many output sizes',
        body: "Each show poster gets adapted across every dimension the event needs, print, square social, and vertical story, which is a different job from exporting one artwork at three sizes. Composition gets rebuilt per ratio so the type hierarchy survives the crop. A poster laid out for print becomes an unreadable square otherwise.",
      },
      {
        heading: 'A throughline across four years of one-offs',
        body: "Cosmic and earthly elements juxtaposed against vintage textural treatments is the constant, applied differently every time. That is what lets dozens of independent pieces still read as one series without any of them repeating another.",
      },
    ],
    outcome:
      'A four-year working relationship across posters, album art, and a website — the kind of repeat engagement that only happens when the work keeps landing.',
  },
  {
    slug: 'shameless-productions',
    title: 'Shameless Productions',
    client: 'Dan Recess',
    tag: 'Web Design & Dev',
    heroImage: '/assets/images/6881dc72a12b39532697f0cd_Screenshot_2025-07-24_000936.avif',
    websiteUrl: 'https://simplyshameless.com',
    overview:
      "Shameless Productions is a Seattle underground dance music collective running since 2003 — Deck'd Out, Reverie Society, Club Yes, and more. Tek has handled their design and digital presence since 2017, and DJs under their banner as a resident.",
    problem: {
      intro:
        "The old site was a stock WordPress build that didn't match the brand, and the original plan for the rebuild would have made things worse before they got better.",
      bullets: [
        "WordPress/WPBakery didn't fit an underground event brand's identity",
        "The first rebuild plan was a full ticketing system — Stripe checkout, box office POS, QR scanning — which meant taking on refund and chargeback liability the brand didn't need",
        'That plan also competed directly with Eventbrite, which Shameless already uses for real ticket sales',
      ],
    },
    galleryAfterProblem: [
      { src: '/assets/images/case-study-temp/shameless-productions/shot-1.jpg', alt: 'Shameless Productions site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/shameless-productions/shot-2.jpg', alt: 'Shameless Productions site — placeholder screenshot' },
    ],
    stack: [
      { label: 'Framework', items: ['Next.js 14', 'React 18', 'TypeScript'] },
      { label: 'Data', items: ['Neon (serverless Postgres)', 'Cloudflare R2'] },
      { label: 'Commerce', items: ['Stripe'] },
      { label: 'Messaging', items: ['Twilio'] },
      { label: 'Interface', items: ['Radix UI', 'Tailwind CSS', 'Embla Carousel', 'Lucide'] },
      { label: 'Testing', items: ['Jest', 'Testing Library', 'Playwright'] },
      { label: 'Hosting', items: ['Vercel'] },
    ],
    solution: {
      intro:
        'Cut the ticketing system entirely partway through and rebuilt around a simpler, Partiful-style scope instead.',
      blocks: [
        {
          heading: 'Event Pages',
          body: 'Shareable event pages with RSVP and a "Pay Cover" link out to Venmo, Cash App, or Eventbrite — no payment processing or liability taken on directly.',
        },
        {
          heading: 'DJ Profiles',
          body: '523 individual DJ profile pages built for SEO, sourced and deduplicated from a roster spreadsheet, the Resident Advisor API, SoundCloud, and Instagram.',
        },
        {
          heading: 'Gallery & Merch',
          body: 'An R2-backed photo gallery across 4 events and 500+ photos (shot by Manny Dan), plus a Stripe-backed merch store — the only real payment processing on the whole site.',
        },
      ],
    },
    galleryAfterSolution: [
      { src: '/assets/images/case-study-temp/shameless-productions/shot-3.jpg', alt: 'Shameless Productions site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/shameless-productions/shot-4.jpg', alt: 'Shameless Productions site — placeholder screenshot' },
    ],
    timeline: [
      { label: 'Apr 2026', detail: 'Scope cut from full ticketing to Partiful-style RSVP' },
      { label: 'Jul 2026', detail: 'Live at simplyshameless.com' },
    ],
    craft: [
      {
        heading: 'Deciding not to build a ticketing system',
        body: "The original scope was full ticketing: box office, QR scanning, ticket inventory, the lot. It got cut. What the events actually needed was an RSVP with a suggested cover amount, and building a ticketing platform to compete with Eventbrite would have meant owning payment disputes and door scanning for a promoter who already had both solved. Scope moved to RSVP plus payment links plus merch, which removed an entire class of failure and shipped months sooner. The Pay Cover button pointing at Eventbrite or a payment link is the design, not a placeholder.",
      },
      {
        heading: 'Uploads bypass the app entirely',
        body: "Event photography arrives in bulk and at full resolution. The browser requests a short-lived presigned URL and pushes files directly to Cloudflare R2 over the S3 API, so a gallery import never occupies a serverless function or counts against its execution limits. The app stores references, not bytes.",
      },
      {
        heading: 'Primitives instead of a component kit',
        body: "The interface is built on Radix primitives with Tailwind on top, with no prebuilt component library underneath. Radix supplies the behavior nobody should be reimplementing, focus trapping, keyboard handling, and correct ARIA on dialogs and toasts, while leaving the appearance completely open. For an events brand with a strong visual identity, a component kit would have meant fighting its defaults on every screen.",
      },
      {
        heading: 'It has tests, which is the unusual part',
        body: "Jest and Testing Library cover the unit and component layer, Playwright drives the real browser flows. Most freelance builds this size have no tests at all, and the reason to have them here is that events have hard dates. A regression discovered on the night of a show is a different category of problem than one found on a Tuesday.",
      },
    ],
    outcome:
      "Live and running, with one honest number worth naming: as of early July 2026, only 18 of 806 pages are indexed in Google Search Console — a crawl-budget problem still being worked, not a finished win. The scope-discipline call (cutting ticketing before it became a liability) is the actual result worth pointing at here.",
  },
  {
    slug: 'kobase',
    title: 'Kobase',
    client: 'Kobase',
    tag: 'Web Design',
    heroImage: '/assets/images/6881dcfee52d43ae2ba5a170_Screenshot_2025-07-24_001242.avif',
    overview:
      '"Where Ideas Win" — Kobase pitched itself as a first-of-its-kind idea marketplace for consultants, freelancers, and agencies. The brief was a landing page built to sell that pitch.',
    problem: {
      intro:
        'A landing page for a brand-new category needs to explain what it is and sell membership in the same breath.',
      bullets: [
        "No existing visual identity to build from — everything (grid, grain texture, type scale, components) had to be built from scratch",
        'Needed to carry a full narrative arc — problem, solution, benefits, proof, pricing — without losing the reader',
      ],
    },
    galleryAfterProblem: [
      { src: '/assets/images/case-study/kobase/shot-1.jpg', alt: 'Kobase hero section: the Where Ideas Win headline over a grain-textured grid, beside a layered contour illustration' },
      { src: '/assets/images/case-study/kobase/shot-2.jpg', alt: 'Kobase explainer graphic showing how the idea marketplace works' },
    ],
    fullPage: {
      src: '/assets/images/case-study/kobase/fullpage-1400.jpg',
      srcSmall: '/assets/images/case-study/kobase/fullpage-1100.jpg',
      alt: 'The complete Kobase landing page, top to bottom: hero, explainer, the three-step onboarding, benefits, testimonials, features, membership pricing, FAQ, and closing call to action.',
    },
    stack: [
      { label: 'Design', items: ['Figma', 'Illustrator'] },
      { label: 'Build', items: ['Webflow'] },
      { label: 'Motion', items: ['Lottie (scroll-triggered)'] },
    ],
    solution: {
      intro:
        'A full landing page built section by section in Figma, then in Webflow, with a custom visual system underneath.',
      blocks: [
        {
          heading: 'Structure',
          body: 'Hero, problem/solution with video, three core benefits, testimonials, features, a membership pricing table, FAQ, and a closing CTA.',
        },
        {
          heading: 'Visual System',
          body: 'A custom grid and grain-texture background built in Illustrator, Lottie scroll animations, and a full color and type system built from nothing.',
        },
      ],
    },
    galleryAfterSolution: [
      { src: '/assets/images/case-study/kobase/shot-3.jpg', alt: 'Kobase page section showing the custom illustration set and type scale in use' },
      { src: '/assets/images/case-study/kobase/shot-4.jpg', alt: 'Kobase onboarding steps: subscribe, get matched with a team, and receive creative work' },
    ],
    craft: [
      {
        heading: 'Building a visual system from nothing',
        body: "There was no existing brand to work from, so the grid, type scale, colour system, and component set were all built before a single section was designed. The grid is a 1440px twelve-column system with 15px gutters, written out as its own stylesheet so the layout rules existed as code and not just as guides in a design file. That order matters on a page this long: deciding spacing and type relationships once, up front, is what keeps nine stacked sections from drifting into nine different-looking pages.",
      },
      {
        heading: 'Grain as the thing holding it together',
        body: "A custom grain texture and a faint grid pattern sit under the whole page, both built in Illustrator, alongside a bespoke illustration set drawn for the four onboarding steps. On a landing page for a category nobody has heard of, flat colour reads as generic template, and the texture is what gives an otherwise clean layout a surface and a point of view.",
      },
      {
        heading: 'A narrative arc, not a feature list',
        body: "Sections are ordered as an argument: hero, the problem with a supporting video, three core benefits, testimonials, features, membership pricing, FAQ, and a closing call to action. A new category has to be explained before it can be sold, so proof sits deliberately between the benefit claim and the price. After the price is too late.",
      },
      {
        heading: 'Motion tied to scroll position',
        body: "The hero animation was built in After Effects and exported to Lottie, so it ships as vector JSON that stays sharp at any size and weighs a fraction of a video file. It fires on scroll, never on a loop. On a page this long, always-running animation competes with reading, and tying motion to scroll means each section animates once, when someone arrives at it.",
      },
    ],
    outcome:
      'Shipped in 2023 as a paid landing-page engagement. Every asset was original: the logo marks, the illustration set, the grain and grid textures, the twelve-column stylesheet, and the After Effects source for the hero animation. The craft and structure are the story here, no launch metrics were tracked on this one.',
  },
  {
    slug: 'house-cleaning-records',
    title: 'House Cleaning Records',
    client: 'Kyle & Jenn',
    tag: 'Web Design & Dev',
    heroImage: '/assets/images/6881dd39f62b061a6e246c06_Screenshot_2025-07-24_001343.avif',
    websiteUrl: 'https://www.housecleaningrecords.com',
    overview:
      'House Cleaning Records is a Seattle house-music label and event company run by Kyle and Jenn, built around deep, groovy, west-coast house.',
    problem: {
      intro:
        'A new label with no real online presence, competing for attention against established names in the genre.',
      bullets: [
        'No site to point people to for gig requests or credibility',
        'Needed to position against established house labels like Defected, Toolroom, Dirtybird, and Insomniac',
      ],
    },
    galleryAfterProblem: [
      { src: '/assets/images/case-study-temp/house-cleaning-records/shot-1.jpg', alt: 'House Cleaning Records site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/house-cleaning-records/shot-2.jpg', alt: 'House Cleaning Records site — placeholder screenshot' },
    ],
    stack: [
      { label: 'Platform', items: ['Webflow'] },
      { label: 'Audio', items: ['HTML5 Audio', 'Live stream endpoint'] },
      { label: 'Interaction', items: ['Splide', 'Swiper'] },
      { label: 'Custom code', items: ['Webflow Embed (radio bar)'] },
    ],
    solution: {
      intro:
        'Started with real competitive research before touching design, then built a site meant to funnel bookings.',
      blocks: [
        {
          heading: 'Discovery',
          body: 'Market research against established house-music labels to define where HCR fit before any design work started.',
        },
        {
          heading: 'Build',
          body: 'Figma wireframes and mood boards, a full site map, visual design, and a dark-themed build with an HCR Radio player and resident DJ bios — built to funnel gig requests, not just look good.',
        },
      ],
    },
    galleryAfterSolution: [
      { src: '/assets/images/case-study-temp/house-cleaning-records/shot-3.jpg', alt: 'House Cleaning Records site — placeholder screenshot' },
      { src: '/assets/images/case-study-temp/house-cleaning-records/shot-4.jpg', alt: 'House Cleaning Records site — placeholder screenshot' },
    ],
    timeline: [
      { label: 'Sep 2022', detail: 'Contracted' },
      { label: 'Jul 2023', detail: 'Delivered' },
    ],
    craft: [
      {
        heading: 'A persistent radio bar inside a page builder',
        body: "The station needed audio that keeps playing while people move around the site, which is not something Webflow does natively. The bar is a native Designer component for structure and styling, with a single Embed carrying the audio logic. Keeping roughly twenty style classes as real Designer elements means the client can restyle it without touching JavaScript, which is the difference between a feature they own and a feature they have to call someone about.",
      },
      {
        heading: 'Play state as a class on the document',
        body: "No animated element tracks the audio object. Playback toggles a single class on the html element. Anything on the page can then react to it in pure CSS. That is how the turntable record on the homepage spins only while audio is playing, without the homepage and the nav bar needing to know about each other.",
      },
      {
        heading: 'Motion that carries information',
        body: "The live indicator pulses via a keyframed box-shadow, so at a glance it reads as broadcasting. The track title scrolls as a marquee only when it overflows its container, because permanently scrolling text is an accessibility problem and a distraction when it is not needed. Both are decoration doing a job.",
      },
      {
        heading: 'Reduced motion actually respected',
        body: "A prefers-reduced-motion block disables the spinning record, the pulsing dot, and the marquee outright. Slowing them down is not the same thing. For anyone with a vestibular sensitivity, a continuously rotating element on every page is the exact thing that setting exists to stop, and honoring it is a few lines that most builds skip.",
      },
    ],
    outcome:
      'Shipped a dark-themed label site built around booking DJs attached to HCR — the discovery-first process is the throughline worth telling here.',
  },
];
