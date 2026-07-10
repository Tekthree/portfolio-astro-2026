# Case Study Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give each of the 7 Work section projects a full case-study page at `/work/[slug]`, built from one shared template and a single data file, following the structure agreed in `docs/superpowers/specs/2026-07-10-case-study-pages-design.md`.

**Architecture:** One typed data file (`src/data/caseStudies.ts`) holds all 7 projects' content. One shared layout component (`src/components/CaseStudyLayout.astro`) renders hero/overview/problem/solution/timeline/outcome/prev-next-nav from that data, reusing two concrete patterns ported from `src/pages/lumos-example-components.astro`'s vendor CSS (the eyebrow label, the aspect-ratio image wrapper) plus the arrow-button pattern already ported into `Contact.astro`. One Astro dynamic route (`src/pages/work/[slug].astro`) wires data → layout via `getStaticPaths`. `Work.astro`'s cards become links into this route.

**Tech Stack:** Astro 4 (existing site), no new dependencies. No test framework exists in this repo — verification is via `npm run dev` + Playwright navigation/screenshot, matching how every other page in this codebase has been verified this session. There is no automated test suite to extend.

## Global Constraints

- No invented metrics — outcome copy must match what's in the design spec's per-project outlines exactly; do not add numbers that aren't there.
- Visual style follows the existing site (Mortend headings via `--_typography---font--heading-family`, existing swatch tokens, Lumos fluid spacing/typography clamps) — the reference site and `lumos-example-components.astro` are structural/component references only, not literal visual copies.
- Every new fluid size value must use the existing `--_spacing---space--N` / `--_typography---font-size--*` tokens already defined in `src/styles/lumos.css` — do not hand-roll new clamp() formulas unless no existing token fits.
- Do not cite a dollar figure for House Cleaning Records (payment records don't reconcile — $4,500 quoted vs ~$700 logged).
- Butterfly CFI case study copy should not claim the site is currently live (client status is Inactive) — describe the work in past tense without an "visit the live site" type CTA for that one project specifically.

---

### Task 1: Case study data file

**Files:**
- Create: `src/data/caseStudies.ts`

**Interfaces:**
- Produces: `export interface CaseStudy { slug, title, client, tag, heroImage, overview, problem: { intro, bullets }, solution: { intro, blocks? }, timeline?, outcome, images? }` and `export const caseStudies: CaseStudy[]` — Task 3's dynamic route and Task 2's layout component both import `caseStudies` and the `CaseStudy` type from this exact path.

- [ ] **Step 1: Create the data file with the full type and all 7 entries**

```ts
// src/data/caseStudies.ts

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
```

- [ ] **Step 2: Verify the file has no TypeScript errors**

Run: `cd /home/tekthree/pixel-jones-portfolio-astro && npx astro check 2>&1 | grep -i "caseStudies" || echo "no errors referencing caseStudies.ts"`
Expected: `no errors referencing caseStudies.ts` (astro check may report unrelated pre-existing warnings elsewhere in the project — only care about this file)

- [ ] **Step 3: Commit**

```bash
cd /home/tekthree/pixel-jones-portfolio-astro
git add src/data/caseStudies.ts
git commit -m "feat: add case study content data for all 7 projects"
```

---

### Task 2: Shared case study layout component

**Files:**
- Create: `src/components/CaseStudyLayout.astro`

**Interfaces:**
- Consumes: `CaseStudy` type and shape from Task 1 (`src/data/caseStudies.ts`)
- Produces: default-exported Astro component accepting props `{ study: CaseStudy, prevSlug: string | null, nextSlug: string | null }` — Task 3's `[slug].astro` route imports this as `import CaseStudyLayout from '../../components/CaseStudyLayout.astro'` and renders `<CaseStudyLayout study={study} prevSlug={prevSlug} nextSlug={nextSlug} />`.

This component is used **inside** `BaseLayout`/`Navbar`/`Footer` (those wrap it in the page, per Task 3) — it only renders the `<main>` content between them, same division of responsibility as `About.astro`/`Work.astro`/`Contact.astro` already have relative to `index.astro`.

- [ ] **Step 1: Write the component**

```astro
---
// src/components/CaseStudyLayout.astro
import type { CaseStudy } from '../data/caseStudies';

interface Props {
  study: CaseStudy;
  prevSlug: string | null;
  nextSlug: string | null;
}

const { study, prevSlug, nextSlug } = Astro.props;
---

<section class="cs-sec u-theme-light">
  <div class="cs-container">

    <!-- eyebrow + hero -->
    <div class="cs-eyebrow">
      <span class="cs-eyebrow-marker" aria-hidden="true"></span>
      <span class="cs-eyebrow-text">{study.tag} · {study.client}</span>
    </div>
    <h1 class="cs-title">{study.title}</h1>

    <div class="cs-hero-image-wrap">
      <img src={study.heroImage} alt={study.title} class="cs-hero-image" loading="eager" />
    </div>

    <!-- overview -->
    <p class="cs-overview">{study.overview}</p>

    <!-- problem -->
    <div class="cs-block">
      <div class="cs-eyebrow">
        <span class="cs-eyebrow-marker" aria-hidden="true"></span>
        <span class="cs-eyebrow-text">Problem</span>
      </div>
      <p class="cs-block-intro">{study.problem.intro}</p>
      <ul class="cs-bullets">
        {study.problem.bullets.map(bullet => <li>{bullet}</li>)}
      </ul>
    </div>

    <!-- solution -->
    <div class="cs-block">
      <div class="cs-eyebrow">
        <span class="cs-eyebrow-marker" aria-hidden="true"></span>
        <span class="cs-eyebrow-text">Solution</span>
      </div>
      <p class="cs-block-intro">{study.solution.intro}</p>
      {study.solution.blocks && (
        <div class="cs-solution-grid">
          {study.solution.blocks.map(block => (
            <div class="cs-solution-card">
              <h3 class="cs-solution-card-heading">{block.heading}</h3>
              <p class="cs-solution-card-body">{block.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>

    <!-- timeline (optional) -->
    {study.timeline && (
      <div class="cs-block">
        <div class="cs-eyebrow">
          <span class="cs-eyebrow-marker" aria-hidden="true"></span>
          <span class="cs-eyebrow-text">Timeline</span>
        </div>
        <ul class="cs-timeline">
          {study.timeline.map(entry => (
            <li class="cs-timeline-item">
              <span class="cs-timeline-label">{entry.label}</span>
              <span class="cs-timeline-detail">{entry.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    <!-- outcome -->
    <div class="cs-block">
      <div class="cs-eyebrow">
        <span class="cs-eyebrow-marker" aria-hidden="true"></span>
        <span class="cs-eyebrow-text">Outcome</span>
      </div>
      <p class="cs-block-intro">{study.outcome}</p>
    </div>

    <!-- prev/next nav -->
    <nav class="cs-nav" aria-label="Other case studies">
      {prevSlug ? (
        <a href={`/work/${prevSlug}`} class="cs-nav-link cs-nav-prev">
          <span class="cs-nav-arrow" aria-hidden="true">
            <svg viewBox="0 0 66 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 2L50 34.9999L17 68" stroke="currentColor" stroke-width="6"/>
            </svg>
          </span>
          <span>Previous project</span>
        </a>
      ) : <span />}
      <a href="/#work" class="cs-nav-back">All work</a>
      {nextSlug ? (
        <a href={`/work/${nextSlug}`} class="cs-nav-link cs-nav-next">
          <span>Next project</span>
          <span class="cs-nav-arrow cs-nav-arrow-next" aria-hidden="true">
            <svg viewBox="0 0 66 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 2L50 34.9999L17 68" stroke="currentColor" stroke-width="6"/>
            </svg>
          </span>
        </a>
      ) : <span />}
    </nav>

  </div>
</section>

<style>
.cs-sec {
  padding-top: var(--_spacing---section-space--page-top);
  padding-bottom: var(--_spacing---section-space--large);
}

.cs-container {
  max-width: var(--max-width--small);
  margin: 0 auto;
  padding-left: var(--site--margin);
  padding-right: var(--site--margin);
}

/* eyebrow — ported from lumos-example-components.astro's
   .u-eyebrow-wrapper/-layout/-marker/-text (vendor CSS lines ~814-838):
   a vertical bar + small caps label, used above every section heading. */
.cs-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--_spacing---space--3);
  margin-bottom: var(--_spacing---space--4);
}

.cs-eyebrow-marker {
  width: var(--border-width--main);
  align-self: stretch;
  background-color: currentColor;
  flex: none;
}

.cs-eyebrow-text {
  font-family: var(--_typography---font--primary-family);
  font-size: var(--_typography---font-size--text-small);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--swatch--muted-500);
}

.cs-title {
  font-family: var(--_typography---font--heading-family);
  font-size: var(--_typography---font-size--display);
  color: var(--swatch--heading-dark);
  text-transform: uppercase;
  margin: 0 0 var(--_spacing---space--6);
  line-height: 1;
}

/* image wrapper — ported from lumos-example-components.astro's
   .u-image-wrapper aspect-ratio technique (vendor CSS line ~737): a
   position:relative wrapper with a fixed aspect-ratio, image absolutely
   filling it via object-fit. Reused here at 16/9 for the hero. */
.cs-hero-image-wrap {
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: clip;
  border-radius: var(--radius--main);
  margin-bottom: var(--_spacing---space--7);
}

.cs-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
  display: block;
}

.cs-overview {
  font-family: var(--_typography---font--primary-family);
  font-size: var(--_typography---font-size--text-large);
  color: var(--_theme---text);
  opacity: 0.85;
  max-width: 36em;
  margin: 0 0 var(--_spacing---section-space--small);
}

.cs-block {
  margin-bottom: var(--_spacing---section-space--small);
}

.cs-block-intro {
  font-family: var(--_typography---font--primary-family);
  font-size: var(--_typography---font-size--text-main);
  color: var(--_theme---text);
  opacity: 0.85;
  max-width: 40em;
  margin: 0 0 var(--_spacing---space--4);
}

.cs-bullets {
  display: flex;
  flex-direction: column;
  gap: var(--_spacing---space--3);
  margin: 0;
  padding-left: var(--_spacing---space--5);
  max-width: 40em;
}

.cs-bullets li {
  font-family: var(--_typography---font--primary-family);
  font-size: var(--_typography---font-size--text-main);
  color: var(--_theme---text);
  opacity: 0.7;
}

.cs-solution-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--_spacing---space--5);
}

.cs-solution-card {
  background-color: var(--bg-stats);
  border-radius: var(--radius--main);
  padding: var(--_spacing---space--5);
}

.cs-solution-card-heading {
  font-family: var(--_typography---font--heading-family);
  font-size: var(--_typography---font-size--h6);
  text-transform: uppercase;
  color: var(--swatch--heading-dark);
  margin: 0 0 var(--_spacing---space--3);
}

.cs-solution-card-body {
  font-family: var(--_typography---font--primary-family);
  font-size: var(--_typography---font-size--text-small);
  color: var(--_theme---text);
  opacity: 0.7;
  margin: 0;
}

.cs-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  max-width: 30em;
}

.cs-timeline-item {
  display: flex;
  justify-content: space-between;
  gap: var(--_spacing---space--4);
  padding: var(--_spacing---space--3) 0;
  border-bottom: var(--border-width--main) solid var(--_theme---border);
  font-family: var(--_typography---font--primary-family);
  font-size: var(--_typography---font-size--text-small);
}

.cs-timeline-label {
  font-weight: 600;
  color: var(--swatch--heading-dark);
  flex: none;
}

.cs-timeline-detail {
  color: var(--_theme---text);
  opacity: 0.7;
  text-align: right;
}

/* prev/next nav — reuses the same circular arrow-button pattern already
   ported into Contact.astro's .stream-btn (itself ported from
   lumos-example-components.astro's .button_arrow_wrap/.button_arrow_element). */
.cs-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--_spacing---space--6);
  border-top: var(--border-width--main) solid var(--_theme---border);
}

.cs-nav-link {
  display: inline-flex;
  align-items: center;
  gap: var(--_spacing---space--3);
  font-family: var(--_typography---font--primary-family);
  font-size: var(--_typography---font-size--text-main);
  font-weight: 600;
  color: var(--swatch--heading-dark);
  text-decoration: none;
}

.cs-nav-back {
  font-family: var(--_typography---font--primary-family);
  font-size: var(--_typography---font-size--text-small);
  color: var(--_theme---text);
  opacity: 0.55;
  text-decoration: underline;
}

.cs-nav-arrow {
  width: 1.2rem;
  aspect-ratio: 1;
  display: block;
  transform: rotate(180deg);
}

.cs-nav-arrow-next {
  transform: none;
}

.cs-nav-arrow svg {
  width: 100%;
  display: block;
  stroke-width: 8;
}

@media screen and (max-width: 767px) {
  .cs-solution-grid { grid-template-columns: 1fr; }
  .cs-title { font-size: var(--_typography---font-size--h1); }
}
</style>
```

- [ ] **Step 2: Verify the component has no TypeScript/Astro errors**

Run: `cd /home/tekthree/pixel-jones-portfolio-astro && npx astro check 2>&1 | grep -i "CaseStudyLayout" || echo "no errors referencing CaseStudyLayout.astro"`
Expected: `no errors referencing CaseStudyLayout.astro`

- [ ] **Step 3: Commit**

```bash
cd /home/tekthree/pixel-jones-portfolio-astro
git add src/components/CaseStudyLayout.astro
git commit -m "feat: add shared case study page layout component"
```

---

### Task 3: Dynamic route

**Files:**
- Create: `src/pages/work/[slug].astro`

**Interfaces:**
- Consumes: `caseStudies` array and `CaseStudy` type from Task 1 (`src/data/caseStudies.ts`), `CaseStudyLayout` component from Task 2 (`src/components/CaseStudyLayout.astro`), and the same `BaseLayout`/`Navbar`/`Footer`/design-grain wrapping pattern `src/pages/index.astro` already uses.

- [ ] **Step 1: Read index.astro to confirm the exact wrapping pattern**

Run: `cat /home/tekthree/pixel-jones-portfolio-astro/src/pages/index.astro`
Expected output (already known from this session, confirm it hasn't changed):
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import Marquee from '../components/Marquee.astro';
import About from '../components/About.astro';
import Work from '../components/Work.astro';
import Contact from '../components/Contact.astro';
import LogoStrip from '../components/LogoStrip.astro';
import SplineScene from '../components/SplineScene.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout>
  <!-- fixed grain overlay -->
  <div class="design-grain"></div>
  <Navbar />
  <main>
    <Hero />
    <Marquee />
    <About />
    <Work />
    <Contact />
    <LogoStrip />
    <SplineScene />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Write the dynamic route**

```astro
---
// src/pages/work/[slug].astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Navbar from '../../components/Navbar.astro';
import Footer from '../../components/Footer.astro';
import CaseStudyLayout from '../../components/CaseStudyLayout.astro';
import { caseStudies } from '../../data/caseStudies';

export function getStaticPaths() {
  return caseStudies.map((study, i) => ({
    params: { slug: study.slug },
    props: {
      study,
      prevSlug: i > 0 ? caseStudies[i - 1].slug : null,
      nextSlug: i < caseStudies.length - 1 ? caseStudies[i + 1].slug : null,
    },
  }));
}

const { study, prevSlug, nextSlug } = Astro.props;
---

<BaseLayout
  title={`${study.title} — Pixel Jones`}
  description={study.overview}
>
  <div class="design-grain"></div>
  <Navbar />
  <main>
    <CaseStudyLayout study={study} prevSlug={prevSlug} nextSlug={nextSlug} />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 3: Start the dev server and verify all 7 routes build**

Run:
```bash
cd /home/tekthree/pixel-jones-portfolio-astro
(npm run dev > /tmp/casestudy-dev.log 2>&1 &)
sleep 4
for slug in butterfly-cfi spencer-grey-art dsc-family-reunion tremulant shameless-productions kobase house-cleaning-records; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4321/work/$slug")
  echo "$slug: $code"
done
```
Expected: all 7 lines show `200`

- [ ] **Step 4: Visually verify one page renders correctly**

Use Playwright: navigate to `http://localhost:4321/work/shameless-productions`, take a screenshot, confirm hero image, eyebrow labels, problem bullets, solution cards, timeline, outcome text, and prev/next nav all render without layout breakage.

- [ ] **Step 5: Stop the dev server**

Run: `pkill -f "astro dev"`

- [ ] **Step 6: Commit**

```bash
cd /home/tekthree/pixel-jones-portfolio-astro
git add src/pages/work/
git commit -m "feat: add /work/[slug] dynamic route for case study pages"
```

---

### Task 4: Link Work section cards to case studies

**Files:**
- Modify: `src/components/Work.astro:2-38` (projects array — add `slug` matching Task 1's data), `src/components/Work.astro:53-62` (card markup — wrap in link)

**Interfaces:**
- Consumes: slugs must exactly match `src/data/caseStudies.ts` slugs from Task 1 (`butterfly-cfi`, `spencer-grey-art`, `dsc-family-reunion`, `tremulant`, `shameless-productions`, `kobase`, `house-cleaning-records`).

- [ ] **Step 1: Read the current projects array and card markup**

Run: `sed -n '1,65p' /home/tekthree/pixel-jones-portfolio-astro/src/components/Work.astro`

- [ ] **Step 2: Add a `slug` field to every project entry**

In `src/components/Work.astro`, change the `projects` array (currently plain objects with `title`/`src`/`tag`) to add a `slug` field to each entry matching Task 1's data exactly:

```ts
const projects = [
  {
    title: 'The Butterfly CFI',
    src: '/assets/images/69d55440de29525bb5ec52a8_the_butterfly_cfi_logo_mock_up.jpg',
    tag: 'Branding & Identity',
    slug: 'butterfly-cfi',
  },
  {
    title: 'Spencer Grey Art',
    src: '/assets/images/69d555693be7d4ffefb2a937_spencer_grey_website_on_pixel_jones_portfolio_site.jpg',
    tag: 'Web Design & Dev',
    slug: 'spencer-grey-art',
  },
  {
    title: 'DSC Family Reunion',
    src: '/assets/images/69d55e6c12ad0b79a8a3f9ae_dsc_family_reunion_pixel_jones.jpg',
    tag: 'Web Design',
    slug: 'dsc-family-reunion',
  },
  {
    title: 'Tremulant',
    src: '/assets/images/69d55fe73960cc20e9554315_tremulant_poster_pixel_jones.jpg',
    tag: 'Print & Poster Design',
    slug: 'tremulant',
  },
  {
    title: 'Shameless Productions',
    src: '/assets/images/6881dc72a12b39532697f0cd_Screenshot_2025-07-24_000936.avif',
    tag: 'Web Design & Dev',
    slug: 'shameless-productions',
  },
  {
    title: 'Kobase Landing Page',
    src: '/assets/images/6881dcfee52d43ae2ba5a170_Screenshot_2025-07-24_001242.avif',
    tag: 'Web Design',
    slug: 'kobase',
  },
  {
    title: 'House Cleaning Records',
    src: '/assets/images/6881dd39f62b061a6e246c06_Screenshot_2025-07-24_001343.avif',
    tag: 'Web Design & Dev',
    slug: 'house-cleaning-records',
  },
];
```

- [ ] **Step 3: Wrap each card in a link to its case study**

Find the card markup (currently `<li class="splide__slide work-card" data-trigger="hover"> ... </li>` with the image/blur/overlay/info children directly inside the `<li>`). Wrap the existing inner content in an `<a>` so the whole card is clickable, keeping `work-card` on the `<li>` for the Splide/carousel CSS and adding a new `work-card-link` class on the `<a>` that fills the card:

```astro
{projects.map(proj => (
  <li class="splide__slide work-card" data-trigger="hover">
    <a href={`/work/${proj.slug}`} class="work-card-link">
      <img src={proj.src} alt={proj.title} class="work-card-img" loading="lazy" />
      <div class="work-card-blur"></div>
      <div class="work-card-overlay"></div>
      <div class="work-card-info">
        <p class="work-card-tag">{proj.tag}</p>
        <h5 class="work-card-title">{proj.title}</h5>
      </div>
    </a>
  </li>
))}
```

- [ ] **Step 4: Add `.work-card-link` CSS so the anchor doesn't break the existing card layout**

Add this rule to `Work.astro`'s `<style>` block, right after the existing `.work-card { ... }` rule:

```css
.work-card-link {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  color: inherit;
  text-decoration: none;
}
```

- [ ] **Step 5: Start the dev server and verify cards link correctly**

Run:
```bash
cd /home/tekthree/pixel-jones-portfolio-astro
(npm run dev > /tmp/casestudy-dev2.log 2>&1 &)
sleep 4
curl -s http://localhost:4321/ | grep -o 'href="/work/[a-z-]*"' | sort -u
```
Expected: 7 unique `href="/work/..."` lines, one per slug from Step 2.

- [ ] **Step 6: Visually verify the hover/click interaction still works**

Use Playwright: navigate to `http://localhost:4321/#work`, hover a card (confirm the existing scale/blur hover effect from `data-trigger="hover"` still fires — this depends on the site-wide `--_trigger---on` hover system already in place, unaffected by adding a link, but confirm visually), then click it and confirm it navigates to the right `/work/[slug]` page.

- [ ] **Step 7: Stop the dev server**

Run: `pkill -f "astro dev"`

- [ ] **Step 8: Commit**

```bash
cd /home/tekthree/pixel-jones-portfolio-astro
git add src/components/Work.astro
git commit -m "feat: link Work section cards to their case study pages"
```

---

### Task 5: Full visual verification pass

**Files:** None modified — verification only.

- [ ] **Step 1: Start the dev server**

```bash
cd /home/tekthree/pixel-jones-portfolio-astro
(npm run dev > /tmp/casestudy-final.log 2>&1 &)
sleep 4
```

- [ ] **Step 2: Screenshot every case study page at desktop width (1440px)**

Use Playwright: for each of the 7 slugs, navigate to `http://localhost:4321/work/[slug]`, set viewport to 1440x900, take a full-page screenshot. Confirm for each: hero image loads, eyebrow/title render, problem bullets present, solution cards present (or absent cleanly where a project has no `blocks`), timeline present only for butterfly-cfi/tremulant/shameless-productions/house-cleaning-records (per Task 1 data — the other 3 have no `timeline` field and should show no timeline section), outcome text present, prev/next nav present and pointing to the correct neighboring slugs (first project has no prev, last has no next).

- [ ] **Step 3: Screenshot one case study page at mobile width (375px)**

Use Playwright: navigate to `http://localhost:4321/work/shameless-productions`, set viewport to 375x812, screenshot. Confirm the solution grid drops to a single column (per the `@media (max-width: 767px)` rule in Task 2) and nothing overflows horizontally.

- [ ] **Step 4: Verify the House Cleaning Records and Butterfly CFI constraints from Global Constraints**

Read the rendered outcome text on `/work/house-cleaning-records` and confirm no dollar figure appears. Read `/work/butterfly-cfi` and confirm no "visit the live site" type link/CTA appears and the copy reads in past tense.

- [ ] **Step 5: Stop the dev server**

Run: `pkill -f "astro dev"`

- [ ] **Step 6: Report to Tek**

No commit needed for this task (verification only) — summarize what was checked and flag anything that looked wrong for a follow-up fix.
