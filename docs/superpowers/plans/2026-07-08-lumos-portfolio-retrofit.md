# Lumos Portfolio Retrofit (Phase 1 + 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio's CSS foundation on the real Lumos design system (spacing scale, typography scale, `--_theme---*` color tokens) and rebuild `Navbar.astro` on that foundation with the reference nav's structural/interaction pattern (desktop inline links + mobile flyout, container-query switch, no dropdowns).

**Architecture:** A new `src/styles/lumos.css` (restored from this exact repo's own git history — a complete, previously-reviewed Foundation Layer was built in commits `8ba6e01..8555418` for the now-scrapped Lumos reference pages, then discarded when those pages were replaced with pasted real Webflow exports — the CSS itself is sound and generic, just never wired to portfolio branding) gets adapted with the portfolio's real color/font values and imported into `src/styles/global.css`. `Navbar.astro` is then rebuilt as two separate DOM trees (desktop/mobile) switched by the container-query breakpoint already established in `global.css`, per `lumos-design` skill section 18.

**Tech Stack:** Astro 4, vanilla CSS (`clamp()`, `color-mix()`, container queries), vanilla JS. Tailwind stays imported (untouched this plan — phase-out is per-component, starting in the follow-on Phase 3 plan).

**Spec:** `docs/superpowers/specs/2026-07-08-lumos-portfolio-retrofit-design.md`

## Global Constraints

- All work happens on the `lumos-retrofit` branch (already checked out). Do not push or merge to `main`.
- No `px` in new code — `rem`/`em` only (skill section 1). Container query breakpoints in `em` — except this project's existing breakpoints are already `px`-based (`992px`/`768px`/`480px`) and explicitly kept as-is per the spec; don't convert them to `em`.
- No hex codes anywhere in new CSS, comments, or prose — always the closest `--swatch--*`/`--_theme---*` variable (skill section 1, section 15).
- No raw `:hover`/`:focus` in CSS — use `data-trigger` + `--_trigger---on`/`--_trigger---off` (skill section 11).
- Every element needs a component class; interactive/root elements end in `_wrap` (skill section 3).
- **Scope correction from the spec:** the spec listed retiring `@media (max-width:991px){html,body{font-size:14px}}` as a Phase 1 step. That's wrong — every one of the 7 not-yet-converted components still depends on that root-font-size step for their `em`-based sizing, so removing it now would visibly resize the whole site. This plan does **not** touch that rule. Retiring it is the first task of the Phase 3 plan, once component conversion is actually underway.

---

### Task 1: Restore and adapt the Lumos Foundation Layer

**Files:**
- Create: `src/styles/lumos.css` (restored from git history, then edited)
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: nothing (this is the foundation)
- Produces (for Task 2/3 and the future Phase 3 plan to consume): `--_spacing---space--1..8`, `--_spacing---section-space--none/small/main/large/page-top`, `--_typography---font-size--display/h1-h6/text-large/text-main/text-small`, `--_typography---line-height--small/medium/large/huge`, `--_typography---letter-spacing--tight/normal`, `--_typography---font--primary-regular/medium/bold`, `--_typography---font--primary-family` (Poppins, body), `--_typography---font--heading-family` (Mortend, headings), `--_text-style---{role}-font-size/line-height/letter-spacing/margin-bottom/font-weight/text-wrap` for role = display/h1-h6/large/main/small, `--swatch--dark-900/dark-800/light-100/light-200/brand-500/brand-100..900/brand-text/accent-500/highlight-500`, `.u-theme-dark`/`.u-theme-light`/`.u-theme-brand` classes providing `--_theme---background/background-2/background-skeleton/text/heading-accent/border/button-primary--*/button-secondary--*/text-link--*/nav--background`, `--site--margin`, `--site--gutter`, `--site--column-count`, `--max-width--small/main/full`, `--radius--small/main/round`, `--border-width--main`, `--nav--height-total` (new), `--button-size--medium/large` (new), `[data-trigger]`/`[data-state]`/`.is-active` trigger/state variables, and the full `u-*` utility class set (`u-section`, `u-container`, `u-margin-trim`, `u-button-wrapper`, `u-alignment-center`, `u-heading`, `u-text`, `u-display-none`, `u-sr-only`, `u-text-style-*`, spacing/padding/gap/grid utilities).

- [ ] **Step 1: Restore the file from git history**

```bash
cd /home/tekthree/pixel-jones-portfolio-astro
git show 8555418:src/styles/lumos.css > src/styles/lumos.css
```

Verify: `wc -l src/styles/lumos.css` should report `1723`.

- [ ] **Step 2: Remove the block this project doesn't need (superseded by `global.css`'s existing, more correct `@container`-based responsive system)**

Find this exact block (it starts right after the `.u-theme-brand` closing brace) and delete it entirely — from `body {` through the closing `}` of the third `@media screen and (max-width: 479px)` block:

```css
body {
  /* Default the whole document to light mode; sections override with
     u-theme-dark / u-theme-brand as needed (not defined until a page
     actually uses them — see Task 5). */
}
body.u-theme-light,
:root {
  color-scheme: light;
}

:root {
  --_responsive---large: 1;
  --_responsive---medium: 0;
  --_responsive---small: 0;
  --_responsive---xsmall: 0;

  --flex-medium: grid; --column-medium: row; --row-medium: column; --none-medium: block; --unset-medium: unset; --relative-medium: static; --start-medium: start; --center-medium: center; --end-medium: end; --first-medium: 1; --last-medium: -1;
  --flex-small: grid; --column-small: row; --row-small: column; --none-small: block; --unset-small: unset; --relative-small: static; --start-small: start; --center-small: center; --end-small: end;
  --flex-xsmall: grid; --column-xsmall: row; --row-xsmall: column;
}

@media screen and (max-width: 991px) {
  :root {
    --_responsive---large: 0;
    --_responsive---medium: 1;
    --flex-medium: flex; --column-medium: column; --row-medium: row; --none-medium: none; --unset-medium: unset; --relative-medium: relative; --start-medium: start; --center-medium: center; --end-medium: end;
  }
}
@media screen and (max-width: 767px) {
  :root {
    --_responsive---medium: 0;
    --_responsive---small: 1;
    --flex-small: flex; --column-small: column; --row-small: row; --none-small: none; --unset-small: unset; --relative-small: relative;
  }
}
@media screen and (max-width: 479px) {
  :root {
    --_responsive---small: 0;
    --_responsive---xsmall: 1;
    --flex-xsmall: flex; --column-xsmall: column; --row-xsmall: row;
  }
}
```

Leave the `[data-trigger] { ... }` / `@media (hover: hover) { ... }` / `@media (hover: none) { ... }` / `[data-state] { ... }` / `.is-active { ... }` block immediately after it untouched — that block stays (Task 1 Step 6 removes the old, buggy duplicate of it from `global.css` instead).

- [ ] **Step 3: Replace the placeholder color swatches with the portfolio's real palette**

Find:

```css
  --swatch--transparent: transparent;
  --swatch--light-100: white;
  --swatch--light-200: #ebebeb;
  --swatch--dark-800: #2f2b2d;
  --swatch--dark-900: #1f1d1e;
  --swatch--brand-500: #c6fb50;

  --swatch--light-100-o20: color-mix(in srgb, var(--swatch--light-100) 20%, transparent);
  --swatch--dark-900-o20: color-mix(in srgb, var(--swatch--dark-900) 20%, transparent);
  --swatch--brand-100: color-mix(in srgb, var(--swatch--brand-500), white 80%);
  --swatch--brand-200: color-mix(in srgb, var(--swatch--brand-500), white 60%);
  --swatch--brand-300: color-mix(in srgb, var(--swatch--brand-500), white 40%);
  --swatch--brand-400: color-mix(in srgb, var(--swatch--brand-500), white 20%);
  --swatch--brand-600: color-mix(in srgb, var(--swatch--brand-500), black 20%);
  --swatch--brand-700: color-mix(in srgb, var(--swatch--brand-500), black 40%);
  --swatch--brand-800: color-mix(in srgb, var(--swatch--brand-500), black 60%);
  --swatch--brand-900: color-mix(in srgb, var(--swatch--brand-500), black 80%);
  --swatch--brand-text: var(--swatch--dark-900);
  --swatch--brand-text-o20: color-mix(in srgb, var(--swatch--brand-text) 20%, transparent);
```

Replace with (same variable names — every downstream `.u-theme-*` rule keeps working unmodified — plus two new swatches the portfolio needs that the demo site didn't have):

```css
  --swatch--transparent: transparent;
  --swatch--light-100: #c0b3cb;   /* was --font-light — dark theme's text color */
  --swatch--light-200: #d9cfe0;   /* was --bg-contact — light theme's page background */
  --swatch--dark-800: #070419;    /* was --ashy-black — dark theme's background-2 (footer, nav overlay) */
  --swatch--dark-900: #0c042c;    /* was --background-blue — dark theme's primary background, and light theme's text */
  --swatch--brand-500: #6d62b4;   /* was --slate-blue — primary interactive/button color */

  --swatch--light-100-o20: color-mix(in srgb, var(--swatch--light-100) 20%, transparent);
  --swatch--dark-900-o20: color-mix(in srgb, var(--swatch--dark-900) 20%, transparent);
  --swatch--brand-100: color-mix(in srgb, var(--swatch--brand-500), white 80%);
  --swatch--brand-200: color-mix(in srgb, var(--swatch--brand-500), white 60%);
  --swatch--brand-300: color-mix(in srgb, var(--swatch--brand-500), white 40%);
  --swatch--brand-400: color-mix(in srgb, var(--swatch--brand-500), white 20%);
  --swatch--brand-600: color-mix(in srgb, var(--swatch--brand-500), black 20%);
  --swatch--brand-700: color-mix(in srgb, var(--swatch--brand-500), black 40%);
  --swatch--brand-800: color-mix(in srgb, var(--swatch--brand-500), black 60%);
  --swatch--brand-900: color-mix(in srgb, var(--swatch--brand-500), black 80%);
  --swatch--brand-text: var(--swatch--light-100);
  --swatch--brand-text-o20: color-mix(in srgb, var(--swatch--brand-text) 20%, transparent);

  --swatch--accent-500: #420f6d;    /* was --submt-purple — secondary/decorative accent (dividers, nav gradient) */
  --swatch--highlight-500: #dbdd3a; /* was --highlight-yellow — heading accent */
```

- [ ] **Step 4: Repoint two theme-class properties that shouldn't follow the generic brand-swatch mapping**

In `.u-theme-dark`, find:

```css
  --_theme---heading-accent: var(--swatch--brand-500);
```

Replace with:

```css
  --_theme---heading-accent: var(--swatch--highlight-500);
```

In `.u-theme-light`, find:

```css
  --_theme---background-2: var(--swatch--light-100);
```

Replace with:

```css
  --_theme---background-2: color-mix(in srgb, var(--swatch--light-200), black 8%);
```

(`--swatch--light-100` is the dark-theme *text* color, not a light-theme surface — reusing it as `u-theme-light`'s background-2 would be darker/more saturated than the page background it's supposed to sit on top of. A generated tint off `light-200` gives a correctly-lighter card/pill surface instead.)

- [ ] **Step 5: Wire in the portfolio's real fonts**

Find:

```css
:root {
  --_typography---font--primary-family: system-ui;
  --_typography---font--primary-regular: 400;
```

Replace with:

```css
:root {
  --_typography---font--primary-family: 'Poppins', sans-serif;
  --_typography---font--heading-family: 'Mortend', sans-serif;
  --_typography---font--primary-regular: 400;
```

Then find the 10 `.u-text-style-*` rules (they start with `.u-text-style-display { font-size: var(--_text-style---display-font-size); ...`) and add `font-family: var(--_typography---font--heading-family);` to the six heading roles only (`display`, `h1`–`h6`). Find:

```css
.u-text-style-display { font-size: var(--_text-style---display-font-size); line-height: var(--_text-style---display-line-height); letter-spacing: var(--_text-style---display-letter-spacing); font-weight: var(--_text-style---display-font-weight); text-wrap: var(--_text-style---display-text-wrap); }
.u-text-style-h1 { font-size: var(--_text-style---h1-font-size); line-height: var(--_text-style---h1-line-height); letter-spacing: var(--_text-style---h1-letter-spacing); font-weight: var(--_text-style---h1-font-weight); text-wrap: var(--_text-style---h1-text-wrap); }
.u-text-style-h2 { font-size: var(--_text-style---h2-font-size); line-height: var(--_text-style---h2-line-height); letter-spacing: var(--_text-style---h2-letter-spacing); font-weight: var(--_text-style---h2-font-weight); text-wrap: var(--_text-style---h2-text-wrap); }
.u-text-style-h3 { font-size: var(--_text-style---h3-font-size); line-height: var(--_text-style---h3-line-height); letter-spacing: var(--_text-style---h3-letter-spacing); font-weight: var(--_text-style---h3-font-weight); text-wrap: var(--_text-style---h3-text-wrap); }
.u-text-style-h4 { font-size: var(--_text-style---h4-font-size); line-height: var(--_text-style---h4-line-height); letter-spacing: var(--_text-style---h4-letter-spacing); font-weight: var(--_text-style---h4-font-weight); text-wrap: var(--_text-style---h4-text-wrap); }
.u-text-style-h5 { font-size: var(--_text-style---h5-font-size); line-height: var(--_text-style---h5-line-height); letter-spacing: var(--_text-style---h5-letter-spacing); font-weight: var(--_text-style---h5-font-weight); text-wrap: var(--_text-style---h5-text-wrap); }
.u-text-style-h6 { font-size: var(--_text-style---h6-font-size); line-height: var(--_text-style---h6-line-height); letter-spacing: var(--_text-style---h6-letter-spacing); font-weight: var(--_text-style---h6-font-weight); text-wrap: var(--_text-style---h6-text-wrap); }
```

Replace with (each gains `font-family: var(--_typography---font--heading-family);`):

```css
.u-text-style-display { font-family: var(--_typography---font--heading-family); font-size: var(--_text-style---display-font-size); line-height: var(--_text-style---display-line-height); letter-spacing: var(--_text-style---display-letter-spacing); font-weight: var(--_text-style---display-font-weight); text-wrap: var(--_text-style---display-text-wrap); }
.u-text-style-h1 { font-family: var(--_typography---font--heading-family); font-size: var(--_text-style---h1-font-size); line-height: var(--_text-style---h1-line-height); letter-spacing: var(--_text-style---h1-letter-spacing); font-weight: var(--_text-style---h1-font-weight); text-wrap: var(--_text-style---h1-text-wrap); }
.u-text-style-h2 { font-family: var(--_typography---font--heading-family); font-size: var(--_text-style---h2-font-size); line-height: var(--_text-style---h2-line-height); letter-spacing: var(--_text-style---h2-letter-spacing); font-weight: var(--_text-style---h2-font-weight); text-wrap: var(--_text-style---h2-text-wrap); }
.u-text-style-h3 { font-family: var(--_typography---font--heading-family); font-size: var(--_text-style---h3-font-size); line-height: var(--_text-style---h3-line-height); letter-spacing: var(--_text-style---h3-letter-spacing); font-weight: var(--_text-style---h3-font-weight); text-wrap: var(--_text-style---h3-text-wrap); }
.u-text-style-h4 { font-family: var(--_typography---font--heading-family); font-size: var(--_text-style---h4-font-size); line-height: var(--_text-style---h4-line-height); letter-spacing: var(--_text-style---h4-letter-spacing); font-weight: var(--_text-style---h4-font-weight); text-wrap: var(--_text-style---h4-text-wrap); }
.u-text-style-h5 { font-family: var(--_typography---font--heading-family); font-size: var(--_text-style---h5-font-size); line-height: var(--_text-style---h5-line-height); letter-spacing: var(--_text-style---h5-letter-spacing); font-weight: var(--_text-style---h5-font-weight); text-wrap: var(--_text-style---h5-text-wrap); }
.u-text-style-h6 { font-family: var(--_typography---font--heading-family); font-size: var(--_text-style---h6-font-size); line-height: var(--_text-style---h6-line-height); letter-spacing: var(--_text-style---h6-letter-spacing); font-weight: var(--_text-style---h6-font-weight); text-wrap: var(--_text-style---h6-text-wrap); }
```

`large`/`main`/`small` roles are left as-is — they inherit `--_typography---font--primary-family` (Poppins) from `html`/`body` in `global.css`, which is correct (body copy is Poppins).

- [ ] **Step 6: Add nav and button-size tokens Task 2/3 will need**

Find:

```css
  --focus--width: 0.125rem;
  --focus--offset-inner: calc(var(--focus--width) * -1);
  --focus--offset-outer: 0.1875rem;
}
```

Replace with:

```css
  --focus--width: 0.125rem;
  --focus--offset-inner: calc(var(--focus--width) * -1);
  --focus--offset-outer: 0.1875rem;

  --nav--height-total: 4rem;
  --button-size--medium: 3rem;
  --button-size--large: 5rem;
}
```

- [ ] **Step 7: Wire `lumos.css` into `global.css`, extend the existing responsive-keyword blocks, remove superseded/buggy blocks**

Open `src/styles/global.css`. Find:

```css
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900|Poppins:300,400,500,600,700');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Replace with:

```css
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900|Poppins:300,400,500,600,700');

@tailwind base;
@tailwind components;
@tailwind utilities;

@import './lumos.css';
```

Next, find the now-vestigial numeric toggle block (confirmed unused anywhere in `src/components/` or `src/pages/`):

```css
  /* Numeric toggles for calc() expressions */
  --r-large: 1; --r-medium: 0; --r-small: 0; --r-xsmall: 0;
}
```

Replace with:

```css
}
```

Next, find the old, inverted trigger/state block (its `on`/`off` defaults are backwards relative to the documented Lumos convention that `lumos.css` now also defines — remove this duplicate/conflicting copy so `lumos.css`'s correct version is the only one):

```css
/* State / trigger variable system */
[data-state]  { --_state---true: 1; --_state---false: 0; }
.is-active    { --_state---true: 0; --_state---false: 1; }
[data-trigger] { --_trigger---on: 0; --_trigger---off: 1; }
@media (hover: hover) {
  [data-trigger~="hover"]:hover { --_trigger---on: 1; --_trigger---off: 0; }
}
@media (hover: none) {
  [data-trigger~="mobile"] { --_trigger---on: 0; --_trigger---off: 1; }
}
```

Replace with:

```css
```

(delete the block entirely — i.e. remove those 8 lines, leaving the surrounding blank lines collapsed to one)

Finally, extend the three existing `@container` blocks with the missing keyword variables. Find:

```css
@container (width < 992px) {
  * {
    --r-large: 0; --r-medium: 1;
    --flex-medium: flex;
    --column-medium: column;
    --row-medium: row;
    --none-medium: none;
    --unset-medium: unset;
    --relative-medium: relative;
  }
}

@container (width < 768px) {
  * {
    --r-medium: 0; --r-small: 1;
    --flex-small: flex;
    --column-small: column;
    --row-small: row;
    --none-small: none;
    --unset-small: unset;
  }
}

@container (width < 480px) {
  * {
    --r-small: 0; --r-xsmall: 1;
    --flex-xsmall: flex;
    --column-xsmall: column;
    --row-xsmall: row;
  }
}
```

Replace with:

```css
@container (width < 992px) {
  * {
    --r-large: 0; --r-medium: 1;
    --flex-medium: flex;
    --column-medium: column;
    --row-medium: row;
    --none-medium: none;
    --unset-medium: unset;
    --relative-medium: relative;
    --start-medium: start;
    --center-medium: center;
    --end-medium: end;
  }
}

@container (width < 768px) {
  * {
    --r-medium: 0; --r-small: 1;
    --flex-small: flex;
    --column-small: column;
    --row-small: row;
    --none-small: none;
    --unset-small: unset;
    --start-small: start;
    --center-small: center;
    --end-small: end;
  }
}

@container (width < 480px) {
  * {
    --r-small: 0; --r-xsmall: 1;
    --flex-xsmall: flex;
    --column-xsmall: column;
    --row-xsmall: row;
  }
}
```

(`--r-large`/`--r-medium`/etc. toggles themselves stay — they're the site's own container-scoped equivalent of `lumos.css`'s viewport-scoped `--_responsive---*`, still unused today but harmless and cheap to leave; only the truly dead top-level `--r-large: 1;...` block from Step 7's first edit is removed, since that one was flatly unused everywhere and shadowed nothing.)

- [ ] **Step 8: Verify the build**

```bash
cd /home/tekthree/pixel-jones-portfolio-astro
npx astro build
```

Expected: build succeeds with no CSS errors. Then:

```bash
npx astro dev &
sleep 3
curl -s http://localhost:4321/ | grep -o "lumos.css" | head -1
```

Expected: prints `lumos.css` (confirms the import made it into the built output). Kill the dev server after (`kill %1`).

- [ ] **Step 9: Visual no-op check**

Start `astro dev`, open the site in a browser (Playwright `browser_navigate` to `http://localhost:4321`), take a screenshot, and confirm it's visually identical to the site before this task — no component references any new token yet, so nothing should look different.

- [ ] **Step 10: Commit**

```bash
git add src/styles/lumos.css src/styles/global.css
git commit -m "feat: restore and adapt Lumos Foundation Layer for portfolio branding"
```

---

### Task 2: Navbar — desktop tree

**Files:**
- Modify: `src/components/Navbar.astro`

**Interfaces:**
- Consumes: `--_spacing---space--3/4/5`, `--_typography---font--heading-family`, `--nav--height-total`, `--site--margin`, `--radius--round`, `--border-width--main`, `--swatch--dark-900`, `.u-theme-dark` theme variables (`--_theme---text`, `--_theme---button-primary--*`), `--_trigger---on/off`, `--none-medium`/`--flex-medium` (from Task 1)
- Produces: `.navbar_desktop_wrap` (for Task 3 to sit alongside as a sibling), existing `#work`/`#about`/`#contact` anchor targets (unchanged, already defined in `About.astro`/`Work.astro`/`Contact.astro`)

- [ ] **Step 1: Replace the component with the desktop tree + preserved asset references**

Replace the full contents of `src/components/Navbar.astro` with:

```astro
---
---
<div class="navbar_component">
  <header class="navbar_desktop_wrap">
    <div class="navbar_desktop_contain">
      <div class="navbar_desktop_layout">
        <a href="/" aria-label="Home" class="navbar_logo_wrap">
          <img src="/assets/images/61ccd624703169e41884b4cf_logo3.avif" alt="Pixel Jones" class="navbar_logo_icon" />
          <div class="navbar_logo_text u-text-style-small">pixel<br>JONES</div>
        </a>

        <nav aria-label="Main" class="navbar_links_component">
          <div role="list" class="navbar_links_wrap">
            <div role="listitem" class="navbar_links_item">
              <a href="#work" class="navbar_links_link u-text-style-small">Work</a>
            </div>
            <div role="listitem" class="navbar_links_item">
              <a href="#about" class="navbar_links_link u-text-style-small">About</a>
            </div>
            <div role="listitem" class="navbar_links_item">
              <a href="#contact" class="navbar_links_link u-text-style-small">Contact</a>
            </div>
          </div>
        </nav>

        <div class="navbar_actions u-button-wrapper">
          <a href="https://linkedin.com/in/ryan-jones-54b39562" target="_blank" rel="noopener" data-trigger="hover focus" class="navbar_button">Resume</a>
        </div>
      </div>
    </div>
  </header>
</div>

<style>
.navbar_component {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar_desktop_wrap {
  display: var(--flex-medium, flex);
  flex-direction: column;
  background: linear-gradient(to bottom, color-mix(in srgb, var(--swatch--dark-900) 85%, transparent) 0%, transparent 100%);
}

.navbar_desktop_contain {
  width: 100%;
  padding-left: var(--site--margin);
  padding-right: var(--site--margin);
}

.navbar_desktop_layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--_spacing---space--4);
  min-height: var(--nav--height-total);
  padding-top: var(--_spacing---space--3);
  padding-bottom: var(--_spacing---space--3);
}

.navbar_logo_wrap {
  display: flex;
  align-items: center;
  gap: var(--_spacing---space--2);
  flex-shrink: 0;
}

.navbar_logo_icon {
  height: 3.5em;
  width: auto;
  aspect-ratio: auto;
  object-fit: contain;
}

.navbar_logo_text {
  font-family: var(--_typography---font--heading-family);
  font-weight: var(--_typography---font--primary-bold);
  color: var(--_theme---text);
  line-height: 1;
  letter-spacing: var(--_typography---letter-spacing--tight);
  text-transform: uppercase;
}

.navbar_links_component {
  display: var(--none-medium, block);
}

.navbar_links_wrap {
  display: flex;
  align-items: center;
  gap: var(--_spacing---space--5);
}

.navbar_links_item {
  display: block;
}

.navbar_links_link {
  color: color-mix(in hsl, var(--_theme---text) calc(100% * var(--_trigger---on)), var(--_theme---button-primary--background) calc(100% * var(--_trigger---off)));
  text-transform: uppercase;
  letter-spacing: var(--_typography---letter-spacing--tight);
  transition: color 200ms;
}

.navbar_actions {
  display: var(--none-medium, flex);
  flex-shrink: 0;
}

.navbar_button {
  padding: var(--_spacing---space--3) var(--_spacing---space--5);
  border-radius: var(--radius--round);
  border-width: var(--border-width--main);
  border-style: solid;
  text-transform: uppercase;
  letter-spacing: var(--_typography---letter-spacing--tight);
  background-color: color-mix(in hsl, var(--_theme---button-primary--background) calc(100% * var(--_trigger---on)), var(--_theme---button-primary--background-hover) calc(100% * var(--_trigger---off)));
  color: color-mix(in hsl, var(--_theme---button-primary--text) calc(100% * var(--_trigger---on)), var(--_theme---button-primary--text-hover) calc(100% * var(--_trigger---off)));
  border-color: color-mix(in hsl, var(--_theme---button-primary--border) calc(100% * var(--_trigger---on)), var(--_theme---button-primary--border-hover) calc(100% * var(--_trigger---off)));
  transition: all 200ms;
}
</style>
```

The `.navbar_component` wrapper carries `u-theme-dark` implicitly for now via `var(--_theme---text)` etc. resolving against `:root`-level fallbacks — Task 1 doesn't apply `.u-theme-dark` to `<body>` yet (that's a Phase 3 decision, once every component is converted and the whole page can safely wear the class). For this task, add `u-theme-dark` directly on `.navbar_component` so the nav's own tokens resolve correctly in isolation without waiting on that later decision:

Find `<div class="navbar_component">` in the file you just wrote and replace with:

```astro
<div class="navbar_component u-theme-dark">
```

- [ ] **Step 2: Verify build**

```bash
cd /home/tekthree/pixel-jones-portfolio-astro
npx astro build
```

Expected: succeeds, no errors about unknown CSS or unclosed tags.

- [ ] **Step 3: Visual check at desktop width**

Start `astro dev`, navigate Playwright to `http://localhost:4321`, resize to 1280×900, screenshot. Confirm: logo + wordmark left, Work/About/Contact links + Resume button visible in the top bar, gradient fade background behind the bar, no layout overlap with the hero section below.

Click each of the three links and confirm the page scrolls to the matching section (`#work`, `#about`, `#contact`). Click Resume and confirm it opens `linkedin.com/in/ryan-jones-54b39562` in a new tab.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "feat: rebuild navbar desktop tree on Lumos foundation"
```

---

### Task 3: Navbar — mobile tree + toggle

**Files:**
- Modify: `src/components/Navbar.astro`

**Interfaces:**
- Consumes: everything Task 2 produced (`.navbar_component`, theme tokens, spacing tokens), plus `--flex-medium`/`--none-medium` container-query keywords from Task 1
- Produces: `.navbar_mobile_wrap` sibling tree, `#navbar-mobile-toggle` / `#navbar-mobile-menu` (targeted by class + `aria-controls`, not by raw `id` selector in CSS — the `id`s exist only to satisfy `aria-controls`/`aria-labelledby` linkage, per skill section 1's accessibility requirement)

- [ ] **Step 1: Add the mobile tree as a sibling of the desktop tree**

In `src/components/Navbar.astro`, find:

```astro
      </div>
    </div>
  </header>
</div>
```

Replace with:

```astro
      </div>
    </div>
  </header>

  <header class="navbar_mobile_wrap">
    <div class="navbar_mobile_contain">
      <div class="navbar_mobile_layout">
        <a href="/" aria-label="Home" class="navbar_logo_wrap">
          <img src="/assets/images/61ccd624703169e41884b4cf_logo3.avif" alt="Pixel Jones" class="navbar_logo_icon" />
          <div class="navbar_logo_text u-text-style-small">pixel<br>JONES</div>
        </a>

        <button
          type="button"
          id="navbar-mobile-toggle"
          aria-expanded="false"
          aria-controls="navbar-mobile-menu"
          aria-label="Menu"
          class="navbar_menu_btn"
        >
          <span class="navbar_menu_line"></span>
          <span class="navbar_menu_line"></span>
        </button>
      </div>
    </div>

    <nav
      id="navbar-mobile-menu"
      aria-labelledby="navbar-mobile-toggle"
      class="navbar_mobile_menu_wrap"
    >
      <div role="list" class="navbar_mobile_menu_layout">
        <div role="listitem" class="navbar_links_item">
          <a href="#work" class="navbar_mobile_link u-text-style-h4">Work</a>
        </div>
        <div role="listitem" class="navbar_links_item">
          <a href="#about" class="navbar_mobile_link u-text-style-h4">About</a>
        </div>
        <div role="listitem" class="navbar_links_item">
          <a href="#contact" class="navbar_mobile_link u-text-style-h4">Contact</a>
        </div>
        <div role="listitem" class="navbar_links_item navbar_actions u-button-wrapper">
          <a href="https://linkedin.com/in/ryan-jones-54b39562" target="_blank" rel="noopener" data-trigger="hover focus" class="navbar_button">Resume</a>
        </div>
      </div>
    </nav>
  </header>
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".navbar_component").forEach((component) => {
    if (component.dataset.scriptInitialized) return;
    component.dataset.scriptInitialized = "true";

    const toggle = component.querySelector("#navbar-mobile-toggle");
    const menu = component.querySelector("#navbar-mobile-menu");

    toggle?.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
    });

    menu?.querySelectorAll(".navbar_mobile_link, .navbar_button").forEach((link) => {
      link.addEventListener("click", () => {
        toggle?.setAttribute("aria-expanded", "false");
      });
    });
  });
});
</script>
```

- [ ] **Step 2: Add the mobile tree's CSS**

Find the closing `</style>` tag in `src/components/Navbar.astro` and insert the following immediately before it:

```css

.navbar_mobile_wrap {
  display: var(--none-medium, none);
  flex-direction: column;
}

.navbar_mobile_contain {
  width: 100%;
  padding-left: var(--site--margin);
  padding-right: var(--site--margin);
  background: linear-gradient(to bottom, color-mix(in srgb, var(--swatch--dark-900) 85%, transparent) 0%, transparent 100%);
}

.navbar_mobile_layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--nav--height-total);
  padding-top: var(--_spacing---space--3);
  padding-bottom: var(--_spacing---space--3);
}

.navbar_menu_btn {
  display: flex;
  flex-direction: column;
  gap: var(--_spacing---space--1);
  padding: var(--_spacing---space--2);
}

.navbar_menu_line {
  display: block;
  width: 1.5em;
  height: var(--border-width--main);
  background-color: var(--_theme---text);
}

.navbar_mobile_menu_wrap {
  display: grid;
  grid-template-rows: 0fr;
  grid-template-columns: minmax(0, 1fr);
  visibility: hidden;
  opacity: 0;
  transition: grid-template-rows 400ms, opacity 400ms;
  background-color: var(--_theme---background);
}

.navbar_mobile_wrap:has(#navbar-mobile-toggle[aria-expanded="true"]) .navbar_mobile_menu_wrap {
  grid-template-rows: 1fr;
  visibility: visible;
  opacity: 1;
}

.navbar_mobile_menu_layout {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--_spacing---space--5);
  min-height: 100svh;
  padding: var(--_spacing---space--8);
}

.navbar_mobile_link {
  color: var(--_theme---text);
  text-transform: uppercase;
  letter-spacing: var(--_typography---letter-spacing--tight);
}
```

- [ ] **Step 3: Verify build**

```bash
cd /home/tekthree/pixel-jones-portfolio-astro
npx astro build
```

Expected: succeeds.

- [ ] **Step 4: Visual + interaction check at mobile width**

Start `astro dev`, navigate Playwright to `http://localhost:4321`, resize to 375×812, screenshot. Confirm: only the hamburger tree is visible (desktop links/CTA hidden), logo still present.

Click the hamburger. Confirm: `aria-expanded` flips to `"true"` (check via `browser_evaluate` or snapshot), the menu expands to fill the viewport with Work/About/Contact/Resume stacked and centered. Click "Work" and confirm the menu closes (`aria-expanded` back to `"false"`) and the page scrolls to `#work`.

Check the browser console for errors (`browser_console_messages`) — expect none.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "feat: add navbar mobile tree with accessible flyout toggle"
```

---

### Task 4: Full breakpoint sweep and checkpoint

**Files:** none (verification only)

**Interfaces:**
- Consumes: the complete `Navbar.astro` from Tasks 2–3

- [ ] **Step 1: Screenshot at all four reference widths**

Using Playwright, resize and screenshot the running `astro dev` site at each of: 320px (mobile flyout should be usable, no horizontal overflow), 768px (still mobile tree — breakpoint is 992px), 992px (desktop tree should just have kicked in), 1280px (desktop tree, generous spacing).

- [ ] **Step 2: Confirm no regressions in the rest of the page**

Scroll through the full page at 1280px and at 375px. Confirm `Hero`, `Marquee`, `About`, `Work`, `Contact`, `LogoStrip`, `SplineScene`, `Footer` all still render exactly as they did before this plan started (they weren't touched — this is confirming the new nav's `position: fixed` + `z-index: 1000` isn't covering content it shouldn't, and that `--nav--height-total` matches enough that the hero's existing top padding — which was hand-tuned to the old nav's height — still looks right; if it doesn't, that's expected and stays as a known gap for the Phase 3 plan to fix when `Hero.astro` itself gets converted, not something to patch here).

- [ ] **Step 3: Write the checkpoint summary and stop**

Do not merge `lumos-retrofit` into `main`. Report back with: screenshots at all 4 widths, confirmation that links/CTA/hamburger work, and the known Hero-padding gap from Step 2 if present. This is the checkpoint the design spec calls for before a Phase 3 plan (retrofitting the remaining 7 components) gets written.

---

## Self-Review

**Spec coverage:** Foundation Layer (spacing/typography/color/theme tokens, site tokens, responsive keyword extension) — Task 1. Navbar desktop shell + links + CTA — Task 2. Navbar mobile flyout + accessible toggle — Task 3. Verification across breakpoints + checkpoint gate before Phase 3 — Task 4. The spec's "retire the 991px font-size hack" step is deliberately *not* implemented here — see Global Constraints for why, and it's now explicitly deferred to the Phase 3 plan instead of silently dropped.

**Placeholder scan:** no TBD/TODO; every CSS/HTML/JS block above is complete, copy-pasteable code, not a description of code.

**Type/name consistency:** `.navbar_component` (Task 2) is the exact class Task 3's script queries via `document.querySelectorAll(".navbar_component")` and the exact class Task 4 visually inspects. `#navbar-mobile-toggle`/`#navbar-mobile-menu` ids introduced in Task 3 Step 1 match the ids referenced in Task 3 Step 2's CSS (`.navbar_mobile_wrap:has(#navbar-mobile-toggle[aria-expanded="true"])`) and Step 1's script (`component.querySelector("#navbar-mobile-toggle")`). `--nav--height-total`/`--button-size--medium/large` defined in Task 1 Step 6 are consumed in Task 2 Step 1's CSS. `--swatch--accent-500`/`--swatch--highlight-500` defined in Task 1 Step 3 aren't consumed by Tasks 2–3 (Navbar doesn't need the purple/yellow accents) — they're produced for the Phase 3 plan.
