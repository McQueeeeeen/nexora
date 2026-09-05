# GOAT Movers

## Business Context
- **Type/Industry:** Local and long-distance moving services, Pacific Northwest (Vancouver WA, Portland OR).
- **What they do:** Licensed, insured residential, commercial, and full-service packing moves at $125/hr with same-day quotes.
- **Target audience:** Homeowners, renters, and business relocations across I-5 corridor; busy professionals, families, last-minute movers.
- **Page goal:** Generate quote requests; establish trust via licensing, 850+ reviews, and transparent flat-rate pricing.

# Page Layout & Structure

### Hero
Large-format background video/image (white moving truck, I-5 highway, forest backdrop, 1.79:1 ratio) filling viewport edge-to-edge, centered single-line H1 in yellow text with tight negative letter-spacing: "Your move, handled from the first box to the last." No secondary CTA or form in hero; calls user down the page. Minimal text overlay; truck is the focal asset.

### Header / Navigation
Fixed horizontal nav, transparent dark overlay. GOAT MOVERS logo (yellow + dark gray) left-aligned. 5 text links in white (Services dropdown, Locations dropdown, Reviews, FAQ, Contacts). Right side: phone number (360-524-0846) in white + primary CTA button "Get a free quote" in yellow with rounded corners (pill-style), not sticky-to-scroll, positioned top-right. Hamburger icon for mobile collapse.

### Primary CTA / Input
Positioned mid-page (after service cards). Centered h2: "Make the next move the easy one." Button below in yellow, text "Get a free quote" — same styling as nav CTA. Single action; no form fields visible on page.

### Service Blocks ×4
Bento grid, 2 columns, 4 equal cells (1×1 each). Labels "SERVICE 01"–"SERVICE 04" in yellow (small caps, all-caps). Service headings (h2): Local Moving, Long Distance, Commercial Moving, Full-Service Packing. Each with 2–3-line body copy in dark gray. Left-aligned text, no images; near-black background. Service 03 and 04 shift text color slightly lighter for contrast. Single column stacked on mobile.

### Credentials & Social Proof Block
Vertical stack: short heading "Ready when you are" (h2) + 3-line credential summary (yellow + white text mixed): "DOT #4232069 USDOT registered · Licensed OR · WA · Fully bonded & insured · Moves 3,000+ Completed in PNW · Reviews 850+ Verified 5-star ratings" + blockquote (white text, serif italic): testimonial from Priya Shah (Beaverton), dark gray label below. All on near-black background.

### Process / Steps Section
3 steps: "Step 01: We Show Up Ready", "Step 02: We Pack & Load", "Step 03: Delivery & Setup" — h3 each, single-column vertical stack with body text in dark gray. No images; text-driven. Minimal spacing between steps.

### FAQ Accordion
Heading h2: "Frequently Asked Questions". 8 collapsible buttons (light gray background, dark gray text, pill-shaped corners, expand/collapse icon right-aligned). All buttons stack vertically, full-width. Expanded state reveals paragraph text in dark gray + small icon (monochrome, left of text). Default collapsed state.

### Quote CTA Carousel / Variant Buttons
4 horizontal button-like cards below FAQ (or before, after credentials): "Quote 1", "Quote 2", "Quote 3", "Quote 4" — simple label buttons in dark gray outline (not filled), pill-rounded. User scrolls or taps to reveal variations.

### Footer
Single-line stub: dark gray background, white text, centered logo + copyright + links (Privacy, Terms, Sitemap).

---

**Notable patterns:** 
- Color alternation: near-black backgrounds dominate (90.6%); yellow accent used sparingly on primary CTA, labels, headings (~2% coverage). White text on dark creates contrast; dark gray text on near-black for secondary.
- Grid: 4-column system; service blocks compress to 2-col, then 1-col on smaller screens.
- Image ratios: hero 1.79:1; supporting thumbnails 2.00:1 and 1.65:1 (landscape, not dominant).
- Fixed nav header; hero does not scroll under it.
- Accordion state change (collapsed → expanded); :focus-visible rings on all interactive elements.
- Rounded corners on buttons (8–16px pill radius); subtle shadows on cards.
- No transitions listed; respects prefers-reduced-motion.