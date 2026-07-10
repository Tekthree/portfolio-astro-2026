export interface CaseStudyBlock {
  heading: string;
  body: string;
}

export interface CaseStudyTimelineEntry {
  label: string;
  detail: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tag: string;
  heroImage: string;
  overview: string;
  problem: {
    intro: string;
    bullets: string[];
  };
  solution: {
    intro: string;
    blocks?: CaseStudyBlock[];
  };
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
    timeline: [
      { label: 'Jul 2024', detail: 'Kickoff' },
      { label: 'Aug 2024', detail: 'Site and brand shipped' },
      { label: 'Nov 2024', detail: 'Logo published to social' },
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
    outcome:
      'Live at spencergreyart.com, running on Next.js, Neon, and Cloudflare R2 after a mid-project infrastructure migration off Supabase.',
  },
  {
    slug: 'dsc-family-reunion',
    title: 'DSC Family Reunion',
    client: 'Brandon Williams',
    tag: 'Web Design',
    heroImage: '/assets/images/69d55e6c12ad0b79a8a3f9ae_dsc_family_reunion_pixel_jones.jpg',
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
    outcome:
      'Live at dscfamilyreunion.com ahead of the July 2026 cruise, with the guestbook and family tree both fully interactive.',
  },
  {
    slug: 'tremulant',
    title: 'Tremulant',
    client: 'Joe Bellingham',
    tag: 'Print & Poster Design',
    heroImage: '/assets/images/69d55fe73960cc20e9554315_tremulant_poster_pixel_jones.jpg',
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
    timeline: [
      { label: '2021', detail: 'Relationship begins' },
      { label: '2021–2024', detail: 'Recurring posters, album art, monthly series' },
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
    timeline: [
      { label: 'Apr 2026', detail: 'Scope cut from full ticketing to Partiful-style RSVP' },
      { label: 'Jul 2026', detail: 'Live at simplyshameless.com' },
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
    outcome:
      'Shipped in 2023 as a paid landing-page engagement — the craft and structure are the story here; no launch metrics were tracked on this one.',
  },
  {
    slug: 'house-cleaning-records',
    title: 'House Cleaning Records',
    client: 'Kyle & Jenn',
    tag: 'Web Design & Dev',
    heroImage: '/assets/images/6881dd39f62b061a6e246c06_Screenshot_2025-07-24_001343.avif',
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
    timeline: [
      { label: 'Sep 2022', detail: 'Contracted' },
      { label: 'Jul 2023', detail: 'Delivered' },
    ],
    outcome:
      'Shipped a dark-themed label site built around booking DJs attached to HCR — the discovery-first process is the throughline worth telling here.',
  },
];
