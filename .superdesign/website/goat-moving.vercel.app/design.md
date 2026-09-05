---
version: "superdesign-alpha"
name: "Charcoal Field Yellow"
description: "Near-black documentary-photo system with sans display type, a single high-voltage yellow accent rationed to CTAs and stat tiles, and a full-bleed video hero."
colors:
  background: "#0C0C0C"
  surface: "#181818"
  surface-alt: "#303030"
  text-primary: "#FFFFFF"
  text-on-accent: "#000000"
  accent: "#FFE533"
  border: "#3A3A42"
typography:
  display-lg:
    fontFamily: "Geist"
    fontSize: "76px"
    fontWeight: 500
    lineHeight: "1.05"
    letterSpacing: "-1.9px"
  headline-md:
    fontFamily: "Geist"
    fontSize: "80px"
    fontWeight: 500
    lineHeight: "1.08"
    letterSpacing: "-3px"
  body-md:
    fontFamily: "Geist"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: "1.4"
  label-md:
    fontFamily: "Geist"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: "1.1"
    letterSpacing: "-1px"
  accent-mono:
    fontFamily: "Roboto Mono"
    fontWeight: 400
    role: "eyebrow labels, stat-card captions, tabular data"
spacing:
  base: "16px"
  gap: "24px"
  section-padding: "260px"
  content-max-width: "260px"
rounded:
  control: "4px"
  pill: "9999px"
  card: "16px"
  card-lg: "24px"
  card-sm: "12px"
  chip: "8px"
components:
  navbar:
    background: "transparent"
    width: "98vw, edge-to-edge with 20px side inset"
    height: "78px"
    radius-tl: "0px"
    radius-tr: "0px"
    radius-br: "0px"
    radius-bl: "0px"
  button-nav-cta:
    background: "#FFE533"
    text-color: "#000000"
    radius: "12px"
    height: "44px"
    padding: "0px 18px"
  button-primary-hero:
    background: "observed near-black translucent panel, unmeasured — approximate solid #FFE533 fill likely, ~4-8px corners"
    text-color: "#FFFFFF"
    radius: "0px"
    height: "65px"
    padding: "18px 0px"
  button-primary-midpage:
    background: "#FFE533"
    text-color: "#000000"
    radius: "12px"
    height: "64px"
    padding: "0px 32px"
  button-nav-utility:
    background: "transparent"
    text-color: "#FFFFFF"
    radius: "4px"
    height: "48px"
    padding: "14px 0px"
  card-stat:
    background: "#FFE533"
    text-color: "#000000"
    radius: "16px"
    padding: "0px"
  card-glass-panel:
    background: "radial-gradient(80% 60% at 15% 15%, rgba(255, 229, 51, 0.2), rgba(0, 0, 0, 0) 60%), linear-gradient(160deg, rgb(12, 12, 12) 0%, rgb(24, 20, 10) 100%)"
    backdrop-filter: "blur(20px)"
    radius: "0px"
    padding: "0px"
  card-flat-panel:
    background: "transparent"
    radius: "0px"
    padding: "0px"
---
# Charcoal Field Yellow
Source: https://goat-moving.vercel.app

## Overview
A dark-mode-default, documentary-photography system: near-black (`#0C0C0C`) surfaces carrying tight, condensed Geist display type and full-color action photography, with a single saturated yellow (`#FFE533`) rationed almost entirely to CTAs and a four-up stat band. This is closer to Swiss-rational structure than to aurora-gradient marketing — the grid is disciplined, the palette is two-tone (near-black + yellow) rather than multi-hue, and the yellow behaves as a semantic "verified/official" marker (licensing badges, stat tiles, CTA fills) rather than decoration.

## Composition
The first screen is a full-bleed, desaturated aerial video establishing scale and motion before any product photography appears — headline copy is entirely absent from this opening frame, letting the moving footage carry the load. A transparent, edge-to-edge navbar sits pinned atop it. Scrolling reveals a rhythm of: large low-contrast headline statement on black → full-width warm-toned action photograph (stairwell moving scene) → a dense black stat band of four yellow tiles → another warm photograph bleeding into the fold, then descending into flatter utility bands (FAQ accordion, footer). The deliberate choice is restraint: color is confined to isolated rectangles against overwhelming black, rejecting the alternative of a saturated gradient hero — this keeps the near-black pixel-field dominance (~80% combined dark values) intact and makes every yellow appearance feel like a stamp of authority rather than atmosphere.

## Colors
`#0C0C0C` is the background role, confirmed by both the 90.6% declared area and the pixel field's near-black dominance (`#181818` ~70%, `#000000` ~6%). `#FFFFFF` is the sole text-primary ink across headlines and body copy on dark grounds. `#FFE533` is the accent — used at only ~2% of declared area — and appears exclusively as: CTA fills (nav + mid-page), the four stat-tile backgrounds, and a soft radial wash (`rgba(255, 229, 51, 0.2)`) inside one glass panel. `#3A3A42` functions as a border/hairline color for subtle dividers on dark surfaces. `#303030` reads as a secondary dark surface tone one step up from the page background, used in muted textural pixel regions. Nothing else carries color: no secondary hue, no semantic red/green is visibly deployed despite tokens existing (`--color-red-400`, `--color-amber-500`) — these remain latent, unused in the visible system.

## Typography
Geist carries the entire display and body hierarchy — no serif, no italic accent is present. Display headline statements run at 76–80px, weight 500, with aggressively tight tracking (-1.9px to -3px) and near-1.0 line-height, producing dense, chiseled headline blocks rather than airy display type. A mid-weight label size (32px/500, -1px tracking) marks section labels and numeral captions. Body copy sits at 20px/400/1.4 for prose passages and drops to 16px/400 for denser UI text. Roboto Mono appears as the accent-mono family, reserved for small-caps-style eyebrow labels (stat-card captions like unit tags) and tabular figures — its fixed-width character gives the stat numerals a technical, verified-data feel that plain Geist wouldn't.

## Layout
Content is capped at a 720px measure for prose blocks despite full-bleed photography and stat bands running wider — a two-track system where reading columns stay narrow and visual/data bands go edge-to-edge. Section padding is a generous 260px, producing a slow, deliberate scroll rhythm with long black voids between photographic moments. The stat band is a strict 4-column grid, 16px gap, four equal 24%-height tiles — pure uniform card grid, no bento asymmetry. Elsewhere, flatter content rows use irregular percentage splits (23/16/14/6, 17/16/17/17, 26/15/21/25) rather than a repeating column count — these are content-driven asymmetric rows, not a formal masonry or bento system; treat each row's widths as bespoke rather than a repeating template. Radii scale from a tight 4px (utility buttons, hairline chips) up through 12px (CTA controls) to 16–24px (stat cards, glass panels) to full 9999px pill where used.

## Components
- **Navbar** — edge-to-edge square bar (98vw, 20px side inset, no rounding on any corner — TL/TR/BR/BL all 0px), 78px tall, transparent fill, sticky. Contains logo mark, 26 total interactive items across grouped dropdown menus (Services, Locations) and plain links, a phone-number text item, and a filled CTA (`#FFE533` fill, `#000000` text, 12px radius, 44px height, 18px horizontal padding). Three additional transparent nav-utility controls (text `#FFFFFF`, 4px radius, 48px height) sit beside the dropdowns.
- **Hero primary CTA** — the standalone, high-contrast button beneath the hero video is the true primary: an observed light/solid pill-or-rectangle sitting isolated on black (values not captured in measurement; approximate ~4-8px corners, treat as solid fill, do not substitute the glass nav utility spec here).
- **Hero secondary utility buttons** — two transparent, square-cornered (0px) controls at 65px height with 18px vertical padding, text `#FFFFFF`, positioned on the first screen as understated secondary actions beside the primary.
- **Mid-page primary CTA (repeated)** — solid `#FFE533` fill, `#000000` text, 12px radius, 64px height, 32px horizontal padding; the largest and most emphatic button in the body content, used at least twice mid-scroll.
- **Stat/numeral row** — four yellow (`#FFE533`) tiles in a single row, 16px radius, black numeral-and-label text, each with a small mono-style eyebrow label above an oversized figure and a lightweight caption line below; this is the signature "verified data" card family.
- **Flat panel families (multiple, transparent/borderless)** — several distinct full-width content bands with no card chrome (background transparent, radius 0px, padding 0px): one family pairs a full-bleed right-side media image with heading + body text (rows all 100% width, stacked); another pairs icon + body text in a 9-up cluster near the page end; another is a 4-up asymmetric text row (26/15/21/25 then 15/21/19 split); another is heading+body only, no media. Each reads as an editorial content strip rather than a bordered card — no shadows, no fills, photography and typography alone create the separation.
- **Glass tile-container panel** — one dark glass family: fill `radial-gradient(80% 60% at 15% 15%, rgba(255, 229, 51, 0.2), rgba(0, 0, 0, 0) 60%), linear-gradient(160deg, rgb(12, 12, 12) 0%, rgb(24, 20, 10) 100%)` with `backdrop-filter: blur(20px)`, square corners, full-width, housing a 9-tile inner arrangement across three rows (100/100/100 then 100) — used as a dropdown or feature-cluster surface, likely inside a nav flyout given its glass treatment and gradient wash.
- **FAQ accordion** — vertical list of question rows on black, plain `#FFFFFF` text with a plus-glyph toggle at each row's right edge, thin hairline dividers between rows (border color `#3A3A42`), no card background.
- **Footer** — `#0C0C0C` background, 16 text links in a flat row/column arrangement, small social icon row, copyright and legal microcopy, credit line — entirely typographic, no imagery.

## Graphics & Effects
Five distinct gradient/scrim treatments exist, each scoped to a small element rather than the page: a top-and-bottom vignette scrim (`linear-gradient(oklab(0 0 0 / 0.3) 0%, rgba(0,0,0,0) 50%, oklab(0 0 0 / 0.55) 100%)`) darkening the edges of a media panel; a radial edge-darkening vignette (`radial-gradient(90% 80%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 90%, rgba(12,12,12,0.95) 100%)`) framing a photographic block; a top/bottom fade scrim (`linear-gradient(rgba(12,12,12,0.85) 0%, rgba(12,12,12,0) 18%, rgba(12,12,12,0) 82%, rgba(12,12,12,0.9) 100%)`) for legibility over the hero video; a soft centered yellow glow (`radial-gradient(circle at 50% 40%, rgba(255,229,51,0.18) 0%, rgba(0,0,0,0) 55%)`) sitting behind a small focal element, not the full hero; and the glass-panel radial wash described above, confined to that one dropdown surface. The hero itself stays desaturated black-and-green aerial footage — color is deliberately withheld here, arriving only once warm-toned crew photography begins mid-page. Five video elements and one canvas element are the live surfaces (use a still frame of aerial or crew photography as static stand-ins). A yellow focus-ring shadow (`rgb(255,229,51) 0px 0px 0px 1px`) marks selected/focused controls; a soft elevation shadow (`rgba(0,31,77,0.15) 0px 24px 60px 0px`) lifts floating panels; a blue glow shadow (`rgba(0,102,255,0.7) 0px 0px 10px 0px`) appears on an isolated interactive accent. Backdrop blurs of `20px` and `30px` are used on glass surfaces.

## Motion
Transitions favor a springy, decelerating curve `cubic-bezier(0.16, 1, 0.3, 1)` at 300ms for transform-based hover states, a snappier `cubic-bezier(0.4, 0, 0.2, 1)` at 300ms for combined property changes, plain `ease` at 200-250ms for color and simple transform shifts. Named keyframes (`social-icon-slide-in`, `dropdown-in`, `fade-in`, `pulse-ring`, `blob-float-a`, `blob-float-b`) indicate entrance choreography for social icons and dropdown menus, a pulsing ring for emphasis, and two independent floating-blob loops for ambient background motion. Lenis-driven smooth scroll governs the page's overall scroll feel, reinforcing the slow, deliberate 260px-padded rhythm.

## Guardrails
- Never let yellow exceed isolated rectangular fills (buttons, stat tiles, focus rings) — it must not wash across backgrounds or large surfaces.
- Keep the hero video/photography desaturated or muted; reserve full warm color saturation for post-hero crew photography.
- Do not round the navbar's corners or shrink it to less than near-full viewport width — it is an edge-to-edge square bar, not a floating capsule.
- Preserve 0px-radius flat panels as borderless, shadowless typographic bands — do not add card chrome to content strips that have none.
- Keep display type tightly tracked (negative letter-spacing); loosening it breaks the chiseled headline character.
- Do not substitute the nav CTA or glass-panel specs for the hero's primary button — its values are observed/approximate, not measured, and must stay distinct.