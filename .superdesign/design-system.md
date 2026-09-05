# Nexora Admissions — editorial dark system

## Product and audience

Nexora Admissions helps Russian-speaking applicants enter universities in Austria and Hungary. The landing page must turn a complex research task into a confident first consultation, while making verified university data feel useful rather than overwhelming.

## Direction adapted from the reference

Borrow the reference's cinematic black-field rhythm, oversized tightly tracked sans display type, fixed full-width navigation, alternating editorial bands, isolated credential tiles, large single-action CTA, service-grid logic, FAQ accordion and long deliberate scroll. Do not reproduce its brand, yellow palette, copy, photos, location-specific claims, logo, or moving-industry UI.

## Visual tokens

- Page background: `#2A211D` espresso for dark story bands; `#FBF9F5` cream for data and FAQ bands; `#F7F3ED` sand for secondary light surfaces.
- Text: cream on dark; espresso on light; muted dark text `#4A3B32`.
- Verified highlight: pistachio `#DDE8C4`, used only on grant-confirmed cards, status labels, selected country tab and primary CTA focus states.
- Deadline highlight: terracotta `#E8A18B`, used only for deadline labels and compact date cards.
- Borders: `rgba(251,249,245,.18)` on dark and `rgba(42,33,29,.16)` on light.
- Typeface: Geist or another neutral grotesk for all UI and giant headlines, with a monospace font only for university metadata, dates, tags, data labels and small CAPS.
- Display scale: 72–96px desktop with `-0.06em` tracking and 0.92 line height; 42–52px mobile.
- Radius: header = 0; content bands = 0; CTA = 10px; data tiles = 16px; metadata pills = 999px.
- Motion: smooth scroll, 300ms `cubic-bezier(.16,1,.3,1)` lifts and reveals; respectful `prefers-reduced-motion` fallback.

## Page architecture

1. Full-screen dark hero with a quiet abstract academic / European city visual, then a dense promise: "Поступление в Австрию и Венгрию — без случайных решений." Two actions: program selection and diagnostic.
2. Four verified data tiles: 28 universities in the base, 2 countries, grant windows, application routes.
3. Three large method blocks: academic correspondence, finance / calendar, documents / hidden conditions.
4. University database: fixed tabs Austria / Hungary, search and precise cards showing QS, annual fee, grant / commercial windows, application fee and flagship programmes.
5. Deadline rails: Austria and Hungary as clearly separated tracks, using pistachio for grants and terracotta for commercial dates.
6. Four-stage admission route replaces the reference's service grid: audit, shortlist, applications, enrolment / visa.
7. One focused diagnostic CTA and minimalist FAQ.
8. Typographic footer with @nexora.admissions, @nexora_support and 2026/2027 data disclaimer.

## Guardrails

- Use the reference's disciplined large-type rhythm, not a literal reproduction.
- Keep espresso dominant and accents rare, functional and rectangular.
- Avoid generic gradients, neon, glassmorphism, floating blob art, tiny bento cards and excess rounded controls.
- Preserve a near-full-width, square-edged sticky navigation bar.
- All university figures must derive from `app/data.ts`; never invent rankings, prices, deadlines or grant claims.
