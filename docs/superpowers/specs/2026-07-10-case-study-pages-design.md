# Case Study Pages — Design

## Goal

Give each of the 7 Work section projects a full case-study page, following the
structure of the reference (case-study-match.webflow.io/projects/fieldwise)
but in this site's own visual language (Mortend headings, existing palette,
Lumos fluid spacing/typography) — the reference is a structural example, not
a visual one.

## Content approach

None of the 7 projects have hard performance metrics (traffic, conversion,
revenue) on record. Rather than inventing numbers to match the reference's
"+92% qualified leads" style, each case study leads with problem → approach →
craft/process, and closes with whatever real signal exists for that specific
project — which varies:

- **Shameless**: the actual SEO indexing story (18/806 pages indexed as of
  2026-07-03), framed as ongoing work, not a win — plus the scope-discipline
  story (cut a full ticketing system to avoid chargeback liability and
  redundancy with Eventbrite)
- **Tremulant / Butterfly CFI**: the multi-year client relationship itself
  as the proof point (2021-2024 for Tremulant; ongoing brand + email/sales
  copy work for Butterfly CFI)
- **Spencer Grey / DSC Family Reunion**: shipped-and-live as the outcome,
  described concretely — what a visitor can actually do on the site today
- **Kobase / House Cleaning Records**: process-and-craft-driven story, no
  outcome claims (both are older/archived engagements with no results data)

No dollar figures for House Cleaning Records (quoted $4,500, but logged
payments only total ~$700 — unreconciled, don't cite either number without
asking Tek first).

## Technical approach

One reusable Astro dynamic route, `src/pages/work/[slug].astro`, reading
from a shared data file `src/data/caseStudies.ts` — not 7 hand-duplicated
pages, and not Astro content collections (unnecessary schema/config overhead
for 7 static entries). Matches the existing lightweight pattern `Work.astro`
already uses (a plain JS array of project objects).

`caseStudies.ts` exports an array of objects, each with:

```ts
{
  slug: string,              // 'shameless-productions'
  title: string,
  client: string,
  tag: string,                // matches Work.astro's existing tag field
  heroImage: string,
  overview: string,           // 2-3 sentences
  problem: { intro: string, bullets: string[] },
  solution: {
    intro: string,
    blocks?: { heading: string, body: string }[]  // optional sub-workstreams
  },
  timeline?: { label: string, detail: string }[],  // omitted if no solid dates
  outcome: string,            // honest framing, no fake metrics
  images?: string[],          // additional gallery images if available
}
```

`Work.astro`'s project cards become links to `/work/[slug]`. Each case study
page has a "back to work" link plus prev/next case-study nav at the bottom,
cycling through all 7 in the same order as the Work carousel.

## Page template (per case study)

1. **Hero** — project title (Mortend), tag/category, client name, full-width
   featured image
2. **Overview** — 2-3 sentence intro: who the client is, what the engagement
   covered
3. **Problem** — subheading + narrative + bullet list of the actual
   challenges found in research
4. **Solution** — narrative + optional sub-blocks for distinct workstreams
   (e.g. Shameless: Event Pages / DJ Profiles / Gallery / Merch as separate
   callouts) — only included where research actually found distinct
   workstreams
5. **Timeline** — only for projects with solid dates (Butterfly CFI,
   Shameless); omitted for the rest rather than forcing thin/fake entries
6. **Outcome** — per the content approach above; never a metrics grid
7. **Prev/next case study nav**

Sections are optional per-project based on what research actually found —
no project is forced into a section it has no real content for.

## Per-project content outline

Research already gathered (see conversation for full detail); condensed
outlines below are what implementation will expand into full page copy.

### 1. The Butterfly CFI — `butterfly-cfi`
- Tag: Branding & Identity
- Client: Jenn Sturgill, Seattle boutique flight instruction (pre-CFI-cert,
  building an audience ahead of full certification)
- Problem: cold-start audience-building; target demo underserved by typical
  flight schools (adults 30+, women, LGBTQIA+, cost/math-anxious students);
  founder's own rocky training experience as the differentiator story
- Solution: logo (butterfly + headphones, nature-meets-tech motif), full
  Webflow site (Home/About/Journey/Resources), lead magnet PDF + landing
  page, 7-email nurture sequence, sales page, one full blog post
- Timeline: kickoff ~2024-07-25, logo published 2024-11-05, marked Done
  2024-08
- Outcome: shipped to production; no traffic/conversion data. **Flag:**
  client status is Inactive in Notion — confirm thebutterflycfi.com is still
  live before publishing screenshots
- Hero image: `69d55440de29525bb5ec52a8_the_butterfly_cfi_logo_mock_up.jpg`

### 2. Spencer Grey Art — `spencer-grey-art`
- Tag: Web Design & Dev
- Client: Spencer Grey, visual artist (Seattle, cosmic/spiritual painting)
- Problem: avoid the generic-artist-portfolio-template and Etsy-craft-
  marketplace feel; wanted "raw, intimate, cinematic" studio-visit tone
  (explicit reference: roburico.com)
- Solution: custom Next.js 15 portfolio + e-commerce print store (edition
  tracking, Stripe checkout, full custom admin CMS), dual-typeface fluid
  type system, WCAG AA target, artist's-voice alt text and copywriting,
  Supabase→Neon/R2/iron-session infra migration (2026-06-15, straight infra
  swap)
- No timeline section (ongoing, first commit 2025-04-22 through present)
- Outcome: shipped and live at spencergreyart.com; no sales/traffic data
- Hero image: `69d555693be7d4ffefb2a937_spencer_grey_website_on_pixel_jones_portfolio_site.jpg`

### 3. DSC Family Reunion — `dsc-family-reunion`
- Tag: Web Design
- Client: Brandon Williams (Tek's brother), family reunion coordinator
- Note: this is the **live Astro/Vercel site** at dscfamilyreunion.com, not
  the parallel unreleased Next.js/Supabase rebuild (per Tek's direction)
- Problem: 2025 reunion site was Webflow; 2026 cruise reunion (Wonder of the
  Seas, July 31-Aug 3) needed real backend features (guestbook, family tree)
  Webflow can't do natively
- Solution: Astro 4 + Neon (guestbook) + R2 (photo uploads) + D3.js family
  tree (116 people, 7 generations, search/filter/zoom), old Webflow CSS
  ported as base style layer rather than rebuilt from scratch, GSAP/Lenis
  polish
- No timeline section (single compressed build window, June 2026)
- Outcome: shipped and live; no engagement data (guestbook usage, etc.)
- Hero image: `69d55e6c12ad0b79a8a3f9ae_dsc_family_reunion_pixel_jones.jpg`

### 4. Tremulant — `tremulant`
- Tag: Print & Poster Design
- Client: Joe Bellingham ("Monotropa"), Seattle electronic/underground music
  event series (Timbre Room, Cherry Seattle)
- Problem: recurring need for cohesive visual identity across dated event
  posters, an album cover, and a monthly evergreen poster series
- Solution: website (tremulant.space), recurring event posters adapted
  across multiple output dimensions, hand-drawn-to-digital album cover
  pipeline (sketch → Photoshop → Illustrator vector trace → color/shadow →
  oil-paint texture finish), monthly poster series ("cosmic and earthly
  elements juxtaposed, vintage textural elements")
- Timeline: 2021-2024, multi-year relationship (now inactive)
- Outcome: relationship longevity itself as the proof point (4 invoices over
  3 years); no turnout/attendance data
- Hero image: `69d55fe73960cc20e9554315_tremulant_poster_pixel_jones.jpg`

### 5. Shameless Productions — `shameless-productions`
- Tag: Web Design & Dev
- Client: Dan Recess / Shameless Productions, Seattle dance-music collective
  (founded 2003, Tek is both a resident DJ and the site's builder — insider
  voice)
- Problem: WordPress/WPBakery site didn't fit the brand; original scope was
  a full ticketing system, cut 2026-04-21 (chargeback/refund liability, and
  redundant with Eventbrite which they already use for real ticket sales)
- Solution: Partiful-style Next.js 14 rebuild — shareable event pages + RSVP
  + external payment links (no ticketing); 523 DJ profile pages for SEO;
  280+ historical events migrated; phone/OTP auth (no passwords); merch
  store; R2-backed photo gallery (4 events, 500+ photos, credited to
  photographer Manny Dan); custom dark crimson/off-white design system
- Timeline: pivoted to current scope 2026-04-21, live at simplyshameless.com
  as of last commit 2026-07-06
- Outcome: honest framing — 18/806 pages indexed in Google Search Console as
  of 2026-07-03 (725 "discovered, not indexed"), an open crawl-budget
  problem being worked, not a finished win. Pair with the scope-discipline
  story as the actual "good decision" of the project.
- Hero image: `6881dc72a12b39532697f0cd_Screenshot_2025-07-24_000936.avif`

### 6. Kobase Landing Page — `kobase`
- Tag: Web Design
- Client: Kobase, "idea marketplace for consultants/freelancers/agencies"
  ("Where Ideas Win") — 2023 engagement, since rebuilt/repositioned by the
  client independently
- Problem: standard landing-page discovery brief (splash vs. landing page,
  asset scope, animation needs)
- Solution: full Figma design + Webflow build — hero, problem/solution (with
  video), benefits, testimonials, features, pricing/membership table, FAQ,
  closing CTA; custom grid + grain background system (Illustrator), Lottie
  scroll animations, full type/color system built from scratch
- No timeline section (single 2023 engagement, July-Aug)
- Outcome: process/craft-driven story only — no outcome data, paid client
  work (invoiced alongside other 2023 projects)
- Hero image: `6881dcfee52d43ae2ba5a170_Screenshot_2025-07-24_001242.avif`

### 7. House Cleaning Records — `house-cleaning-records`
- Tag: Web Design & Dev
- Client: Kyle & Jenn (same Jenn as Butterfly CFI), Seattle house-music
  record label/event company ("HCR")
- Problem: no real online presence; needed a site that communicates label
  value and funnels DJ gig requests; discovery included market research
  against Defected/Toolroom/Dirtybird/Insomniac
- Solution: discovery/market research → Figma wireframes/mood boards → site
  map → visual design → dev with animation → SEO; dark-themed site with HCR
  Radio player and resident DJ bios
- Timeline: contracted 2022-09-27, deadline 2023-07-07, marked Done
- Outcome: shipped; no traffic/outcome data. **Do not cite a dollar figure**
  (quoted $4,500 vs ~$700 logged payments, unreconciled)
- Hero image: `6881dd39f62b061a6e246c06_Screenshot_2025-07-24_001343.avif`

## Open questions for Tek before implementation

1. Confirm thebutterflycfi.com is still live (client marked Inactive) before
   publishing Butterfly CFI screenshots/case study publicly.
2. House Cleaning Records payment discrepancy ($4,500 quoted vs ~$700
   logged) — don't want to accidentally imply either figure was the actual
   deal.
