# Footer Scheduler — Design Spec

**Date:** 2026-07-16
**Status:** Approved, ready for implementation plan

## Problem

The current footer (`src/components/Footer.astro`) has no way for a visitor to book time directly — only an email link and phone number. Reference: a Designjoy screenshot showing a dark, two-column "book a call" section (headline on the left, a Cal.com inline calendar/time-picker on the right, transitioning to a booking form once a time is picked).

## Goal

Add a new "book a call" section above the existing footer, using a free-tier Cal.com inline embed, styled to match the site's dark Lumos theme. Existing footer content (contact pills, version/local-time/socials row) stays unchanged below it.

## Non-goals

- Not replacing or redesigning the existing `Footer.astro` content.
- Not using Cal.com's paid Booker Atom / Platform API (white-labeling isn't needed — free tier's small Cal.com badge is acceptable).
- Not building a custom calendar/availability UI — Cal.com's own embed handles the calendar → time-slots → form transition internally.
- Not setting up the actual Cal.com account/event type as part of this work — Tek does that separately and swaps in the real event slug.

## Design

### 1. Component & placement

New component `src/components/Scheduler.astro`, inserted into the page (wherever `<Footer />` is currently used) directly above `<Footer />`.

### 2. Layout

- **Desktop (>991px):** two-column flex/grid layout inside a full-width dark section (`background-color: var(--swatch--dark-800)`, matching Footer's bg so the two sections read as one continuous dark block).
  - Left column: headline + subhead, vertically centered, `max-width` similar to Footer's `.footer-title-wrap` (54.2em).
  - Right column: Cal.com inline embed container, fixed height ~600px (`min-height: 37.5em` responsive via existing clamp pattern if one fits, otherwise a plain px/em value), rounded corners to match site card conventions.
- **Tablet/Mobile (≤991px):** stacks to single column — copy first, embed below, full width. Follow the same breakpoints already used in `Footer.astro` (991px, 767px, 479px) for consistency.

### 3. Copy

- Headline: "Let's work together" (`u-text-style-h1`, same class as current Footer headline)
- Subhead: "Book a quick 15-min intro call to see if we're a fit." (new, primary font family, muted color similar to `.footer-meta-label` treatment but not uppercase)

### 4. Cal.com integration

- Cal.com's official **Inline Embed** snippet (`embed.js` loader + `Cal("inline", { elementOrSelector, calLink, config })`).
- `calLink` placeholder: `"pixel-jones/15min"` — Tek swaps this for the real link once the Cal.com account + event type exist. Leave a clear inline comment marking it as a placeholder.
- Embed config:
  - `theme: "dark"`
  - `layout: "month_view"` (matches the reference's calendar-grid + slot-list layout)
  - `styles.branding.brandColor` → `#6d62b4` (`--swatch--brand-500`)
- Script loads via a `<script>` tag scoped to this component (Astro component script, not global), following the pattern already used for the local-time script in `Footer.astro`.

### 5. Styling / tokens

Reuse existing Lumos tokens, no new ones introduced:
- `--swatch--dark-800` (section/embed background)
- `--swatch--light-100` (headline/subhead text)
- `--swatch--brand-500` (Cal.com brand color, CTA accents)
- `--_spacing---section-space--large` / `--_spacing---section-space--main` (vertical section padding, matching Footer's existing padding pattern)
- `--_typography---font--heading-family` / `--_typography---font--primary-family`
- Existing responsive breakpoints (991px / 767px / 479px) and the `--column-small` custom-property flip pattern already used in `Footer.astro`'s mobile styles.

### 6. Error handling / edge cases

- If the Cal.com script fails to load (network issue, ad blocker), the embed container should not collapse to zero height — give it a min-height via CSS so the section still holds its layout shape even with an empty embed slot. No custom fallback UI needed (out of scope — low-traffic personal portfolio, not worth the complexity).

## Open items for Tek (not blocking implementation)

- Create free Cal.com account + 15-min event type, then replace the placeholder `calLink` in `Scheduler.astro`.
- Confirm final subhead copy wording once live (current copy is a reasonable default, not precious).
