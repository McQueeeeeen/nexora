<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# High-End Web Interface Architecture & Design Standards

## 1. Fluid Layout & Typography (Continuous Scaling)
- Always use `clamp()` for `h1`, `h2`, numbers, and major section paddings to ensure seamless scaling between mobile (320px–480px), tablet (768px–1024px), laptop (1280px–1440px), and ultrawide (1920px+).
- Primary headings must have negative letter spacing (`-0.04em` to `-0.06em`), `font-weight: 500`, and `text-wrap: balance` for optical symmetry.
- Body copy must use `text-wrap: pretty` to eliminate orphans.

## 2. Pure CSS Grid Accordions & Dropdowns (Zero-JS Layout Shift)
- Implement collapsible menus and accordions using `grid-template-rows: 0fr -> 1fr` with `cubic-bezier(0.32, 0.72, 0, 1)`.
- Never poll element heights (`scrollHeight`) in JavaScript when animating menus.


## 4. Tactile Micro-Interactions & Dual-Row Flip CTA
- Primary CTA buttons should implement dual-row text flipping or staggered character transitions (`transition-delay: calc(var(--i) * 18ms)`).
- Touch targets must be >= `44px` with `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent`.
- Isolate `:hover` transforms using `@media (hover: hover) and (pointer: fine)` to prevent sticky hover states on touch screens.

## 5. Viewport & Safe Area Resilience
- Fullscreen sections must use `100dvh` (Dynamic Viewport Height).
- Background SVGs and canvas animations must use `preserveAspectRatio="xMidYMid slice"` to prevent letterboxing on vertical mobile screens.
- Respect Safe Area insets (`env(safe-area-inset-*)`) in containers, floating bars, and fixed navbars.
