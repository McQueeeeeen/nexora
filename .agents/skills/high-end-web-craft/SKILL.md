---
name: high-end-web-craft
description: High-end web interface design and engineering guide. Use when building or polishing modern interactive landing pages, fluid typography with clamp(), pure CSS grid accordions, tactile flip buttons, simulated UI product showcases, canvas/SVG viewport scaling, and quiet luxury aesthetic systems.
---

# High-End Web Interface Architecture & Craft Guide

This guide establishes the architectural standards for creating top-tier, tactile, and visually stunning web interfaces that feel like state-of-the-art digital products.

---

## 1. Fluid Typography & Continuous Scaling Matrix

Never rely on abrupt discrete breakpoints for major titles and numbers. Use mathematical continuous scaling with `clamp()`.

```css
/* Hero H1 */
font-size: clamp(2.5rem, 4vw, 4.5rem);
line-height: 1.05;
letter-spacing: -0.06em;
font-weight: 500;
text-wrap: balance;

/* Section Headings H2 */
font-size: clamp(2rem, 3.2vw, 3.75rem);
line-height: 1.1;
letter-spacing: -0.05em;
font-weight: 500;
text-wrap: balance;

/* Step / Metric Numbers */
font-size: clamp(2.75rem, 4.2vw, 5rem);
letter-spacing: -0.06em;
font-family: var(--font-mono), monospace;
font-weight: 500;

/* Section Vertical Paddings */
padding-top: clamp(4rem, 6.25vw, 7.5rem);
padding-bottom: clamp(4rem, 6.25vw, 7.5rem);

/* Paragraphs */
text-wrap: pretty;
```

---

## 2. Zero-JS Layout Accordions & Dropdowns (Pure CSS Grid)

Never measure `scrollHeight` or `getBoundingClientRect()` in JavaScript to animate accordion/menu expansion. Use CSS Grid row interpolation:

```html
<div class="expandable-wrapper" data-open="true">
  <div class="expandable-inner">
    <!-- Dynamic content of any height -->
  </div>
</div>
```

```css
.expandable-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}

.expandable-wrapper[data-open="true"],
.expandable-wrapper.is--open {
  grid-template-rows: 1fr;
}

.expandable-inner {
  overflow: hidden;
  min-height: 0;
}
```

---

## 3. Dual-Row Interactive Flip Buttons (Tactile CTA)

Primary calls-to-action should implement dual-row character flipping for high-end tactile feedback:

```html
<a class="flip-btn" href="#action">
  <span class="flip-btn__inner">
    <span class="flip-btn__row flip-btn__row--top">
      <span class="flip-btn__ch" style="--i:0">G</span>
      <span class="flip-btn__ch" style="--i:1">e</span>
      <span class="flip-btn__ch" style="--i:2">t</span>
      <span class="flip-btn__ch" style="--i:3">&nbsp;</span>
      <span class="flip-btn__ch" style="--i:4">S</span>
      <span class="flip-btn__ch" style="--i:5">t</span>
      <span class="flip-btn__ch" style="--i:6">a</span>
      <span class="flip-btn__ch" style="--i:7">r</span>
      <span class="flip-btn__ch" style="--i:8">t</span>
      <span class="flip-btn__ch" style="--i:9">e</span>
      <span class="flip-btn__ch" style="--i:10">d</span>
    </span>
    <span class="flip-btn__row flip-btn__row--dup" aria-hidden="true">
      <span class="flip-btn__ch" style="--i:0">G</span>
      <span class="flip-btn__ch" style="--i:1">e</span>
      <span class="flip-btn__ch" style="--i:2">t</span>
      <span class="flip-btn__ch" style="--i:3">&nbsp;</span>
      <span class="flip-btn__ch" style="--i:4">S</span>
      <span class="flip-btn__ch" style="--i:5">t</span>
      <span class="flip-btn__ch" style="--i:6">a</span>
      <span class="flip-btn__ch" style="--i:7">r</span>
      <span class="flip-btn__ch" style="--i:8">t</span>
      <span class="flip-btn__ch" style="--i:9">e</span>
      <span class="flip-btn__ch" style="--i:10">d</span>
    </span>
  </span>
</a>
```

```css
.flip-btn {
  display: inline-flex;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
.flip-btn__inner {
  display: inline-flex;
  flex-direction: column;
  height: 1.4em;
  overflow: hidden;
}
.flip-btn__row {
  display: inline-flex;
  transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
}
.flip-btn__ch {
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
  transition-delay: calc(var(--i) * 18ms);
}
.flip-btn:hover .flip-btn__row {
  transform: translateY(-1.4em);
}
```

---

## 4. Rich Interactive Product Showcases & UI Simulations

Instead of flat screenshots or passive stock photography, build live simulated interfaces for explaining core features:
- **Device Frames**: Realistic iPhone / iPad / MacBook frames with aspect ratios (`346 / 702`).
- **Laser / Scan Beams**: Gradient sweep lines (`background: linear-gradient(...)`) simulating active AI or automated workflows.
- **Volumetric Floating Badges**: Rounded pills with `backdrop-filter: blur(8px)` and soft drop shadows.
- **Dynamic Sheets**: Live calculation sheets with smooth stagger entrances (`animation: sheet-up 0.5s ease both`).

---

## 5. Viewport, SVG & Safe Area Resilience

1. **Dynamic Viewport Height**: Always use `100dvh` for fullscreen containers to prevent jumping when mobile browser URL bars collapse.
2. **SVG Aspect Ratio**: Full-bleed background maps and animations must use `preserveAspectRatio="xMidYMid slice"`.
3. **Safe Area Insets**:
   ```css
   padding-top: env(safe-area-inset-top, 0);
   padding-bottom: env(safe-area-inset-bottom, 0);
   padding-left: max(16px, env(safe-area-inset-left, 16px));
   padding-right: max(16px, env(safe-area-inset-right, 16px));
   ```
4. **Touch Target Sizing**:
   - Minimum `44px` height/width.
   - Separate hover transforms with `@media (hover: hover) and (pointer: fine)` so cards don't stay sticky-lifted on mobile phones.
   - Set `font-size: 16px` on all inputs to stop iOS Safari from auto-zooming.

---

## 6. Quiet Luxury & Tech-Minimalist Color Harmony

- **Deep Espresso Ground**: `#120D0B` (Hero & flagship cards) / `#1D1613` (Dark surfaces).
- **Warm Paper Canvas**: `#FBF9F5` (Main background).
- **Ink Typography**: `#2A211D` (High contrast text) / `rgba(42,33,29,0.7)` (Secondary).
- **Caramel Gold Crema Accents**: `#C88242` (Primary interactive) / `#E5B87A` (Luminous on dark backgrounds).
- **Film Grain Overlay**: SVG fractal noise at `opacity: 0.04 - 0.05` for physical, non-sterile rendering.
