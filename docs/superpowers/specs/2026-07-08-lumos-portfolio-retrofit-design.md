# Lumos Portfolio Retrofit — Design

**Date:** 2026-07-08
**Repo:** `/home/tekthree/pixel-jones-portfolio-astro/`
**Branch:** `lumos-retrofit`

## Why

The portfolio shipped in June with a hand-built responsive/token system that partially anticipated Lumos (the container-query keyword-variable pattern in `global.css` already matches Lumos's shape). Since then the Lumos design system itself was built out properly — a real Foundation Layer pattern, a token architecture, and two reference pages (`lumos-styleguide.astro`, `lumos-example-components.astro`, pasted directly from the real Lumos Webflow demo site) — captured in the `lumos-design` skill (`.claude/skills/lumos-design/SKILL.md`).

This retrofit brings the portfolio itself onto that real system: proper spacing/typography scale, the `--_theme---*` color-token architecture, the Lumos responsive-variable/container-query breakpoint pattern throughout, and a navbar rebuilt on the reference nav's structural/interaction pattern (not its dropdown content, which the portfolio doesn't need).

## Constraints

- `main` auto-deploys to Vercel on push. All work happens on the `lumos-retrofit` branch; nothing merges to `main` until the phase that introduced it has been verified locally.
- The portfolio's current visual design was pixel-matched against the original Webflow reference (`reference/webflow.html`/`.css`). This retrofit is an intentional exception to "preserve pixel fidelity" — the whole point is to adopt Lumos's real spacing/type scale even where that shifts current sizes.
- Two existing reference pages (`lumos-styleguide.astro`, `lumos-example-components.astro`) and `public/lumos-vendor/` are out of scope — they're ported Lumos demo-site content for study, not part of the portfolio, and use their own vendor CSS entirely separate from `global.css`.

## Phase 1 — Foundation Layer (`src/styles/global.css`)

**Viewport bounds:** `--site--viewport-min: 20; --site--viewport-max: 90;` (rem-equivalent, 320px–1440px) — every fluid value below is a `clamp()` built from these via the formula in skill section 0.

**Spacing scale:** `--_spacing---space--1` through `--8`, plus `--_spacing---section-space--none/small/main/large/page-top`, using the real production values documented in skill section 16 (not re-derived — used as-is).

**Typography scale:** the skill assumes one "primary" font family; this project has two (Mortend for headings/display, Poppins for body). Documented deviation: define `--_typography---font--heading` (Mortend) and `--_typography---font--body` (Poppins), and apply the real fluid font-size/line-height/letter-spacing/margin-bottom values from skill section 16 per role (`display`, `h1`–`h6`, `large`, `main`, `small`), with `--_typography---font--heading` used for `display`/`h1`–`h6` and `--_typography---font--body` for `large`/`main`/`small`. Font-weight tokens: `--_typography---font--primary-regular` (400), `--_typography---font--primary-medium` (500, Poppins only — Mortend has no 500 weight, falls back to its own 400/800), `--_typography---font--primary-bold` (Mortend 800 / Poppins 700 depending on which family the token is applied within).

**Color swatches** — existing hues kept as bases rather than force-derived from one root color, to avoid shifting hues that were pixel-matched from the original design:

| Swatch | Base (current token) | Hex |
|---|---|---|
| `--swatch--dark-500` | `--background-blue` | `#0c042c` |
| `--swatch--dark-900` | `--ashy-black` | `#070419` |
| `--swatch--light-500` | `--font-light` | `#c0b3cb` |
| `--swatch--brand-500` | `--submt-purple` | `#420f6d` |
| `--swatch--accent-500` | `--slate-blue` | `#6d62b4` |
| `--swatch--highlight-500` | `--highlight-yellow` | `#dbdd3a` |

`--swatch--light` family also absorbs `bg-contact` (`#d9cfe0`), `bg-stats` (`#c7bbd0`), `stat-divider-color` (`#baaac8`), `faq-border` (`#9c8aaf`), `label-plum` (`#5a337a`) — currently 5 separate hand-picked hex values that are all tints/shades of the same light plum family. These become `color-mix()`-generated steps off `--swatch--light-500` (or a dedicated `--swatch--light-contact-500` if the mix can't reproduce all 5 closely enough — decided during implementation, not guessed here).

Any swatch step Lumos needs but doesn't exist yet (hover backgrounds, `background-2`, borders, skeleton loaders) is generated via `color-mix()` per skill section 17 — never hand-picked.

**Theme tokens:** two theme classes.
- `u-theme-dark` — the site's default/current aesthetic. `--_theme---background: var(--swatch--dark-500)`, `--_theme---text: var(--swatch--light-500)`, `--_theme---heading-accent: var(--swatch--highlight-500)`, button/link variables built from `--swatch--accent-500` (primary button, matching the current CTA color) and `--swatch--brand-500` (secondary/outline).
- `u-theme-light` — the Contact section's existing lighter panel (a real, already-present second visual context, not an invented one). Background from the consolidated `--swatch--light` family above.

**Site tokens:** `--site--margin`, `--site--gutter`, `--site--column-count: 12`, `--radius--small/main/round`, `--border-width--main`, `--max-width--small/main/full` — real values from skill section 16.

**Responsive variables:** the container-query keyword system already in `global.css` (`--flex-medium`, `--column-medium`, etc., at the existing 991/767/479px breakpoints) stays as-is — it already matches skill section 0's documented breakpoints. Add the missing keyword set: `--start-*/--center-*/--end-*/--first-*/--last-*` per breakpoint.

**Retired:** `@media (max-width: 991px) { html, body { font-size: 14px } }`. This root-font-size step predates the fluid `clamp()` system; keeping it would double-scale any `rem` value once the real scale is in, since the new tokens already handle fluidity via viewport width, not root font-size.

**Verification:** `astro build` succeeds, dev server renders the current site unchanged (nothing consumes the new tokens yet — this phase is additive only).

## Phase 2 — Navbar (`src/components/Navbar.astro`)

Two separate DOM trees (desktop / mobile), switched via container query, per skill section 18 — not one tree repositioned by CSS.

**Desktop (≥992px):** fixed bar, logo + wordmark left (existing asset, existing `pixel JONES` wordmark), `Work / About / Contact` inline links (scrolling to existing `#work`/`#about`/`#contact` anchors — `#contact` is newly linked from nav, the section already exists), Resume CTA button right (external LinkedIn link, opens new tab), styled with the button-primary token pattern (skill section 8) built on `--swatch--accent-500`. Keeps the current gradient-fade-on-scroll background treatment, re-tokened onto `--_theme---*` variables instead of hardcoded `color-mix(in srgb, var(--ashy-black)...)`.

**Mobile (<992px):** hamburger button → full-screen flyout overlay, same 3 links + Resume button. Accessibility fix bundled in: the current toggle has no `aria-expanded`/`aria-controls`/keyboard handling — the rebuild adds real `aria-expanded` state on the toggle button and `aria-controls` linking it to the overlay, consistent with skill section 1's accessibility requirements.

No dropdown/mega-menu machinery (skill section 18's dropdown pattern) — not needed for 3 flat links.

**Verification:** visual check at 320/768/1280px via Playwright, confirm hamburger open/close, confirm all 4 links (Work/About/Contact/Resume) navigate correctly, confirm no console errors. Checkpoint with Tek before continuing to Phase 3.

## Phase 3 — Remaining components

`Hero.astro`, `Marquee.astro`, `About.astro`, `Work.astro`, `Contact.astro`, `LogoStrip.astro`, `SplineScene.astro`, `Footer.astro` — retrofitted one at a time, in that DOM order. Per component:

- Replace hardcoded spacing (`em`/`px` margins, gaps, padding) with `--_spacing---*` tokens.
- Replace hardcoded `font-family`/`font-size`/`line-height`/`letter-spacing` with the typography-scale role tokens established in Phase 1.
- Replace color tokens with the new `--swatch--*`/`--_theme---*` names (same visual colors, new architecture).
- Replace any component-local `@media` with the Lumos responsive-variable pattern (skill section 10), matching Phase 1's breakpoints.
- Remove that component's Tailwind utility classes as it converts (`Work.astro`'s carousel and any other Tailwind-class usage found during implementation).
- `Contact.astro` gets `u-theme-light` applied (it's the one section using the lighter panel background).

No new component-level design decisions — mechanical application of Phase 1/2's established tokens and patterns. Existing JS behavior (marquee animation, work-carousel scroll-snap, footer local-time script) is preserved as-is; only markup/CSS conventions change, not runtime behavior, except where a component's interactive pattern conflicts with a Lumos anti-pattern (e.g. raw `:hover` in CSS instead of `data-trigger`) — flagged and fixed per-component during implementation.

**Verification:** same visual-check pattern per component, one at a time, before that component's commit lands.

## Out of scope

- `lumos-styleguide.astro`, `lumos-example-components.astro`, `public/lumos-vendor/` — untouched, remain as reference-only.
- Any new pages, sections, or content beyond what currently exists.
- Dropdown/mega-menu nav components.
- `reference/webflow.html`/`.css` — historical reference, untouched.
