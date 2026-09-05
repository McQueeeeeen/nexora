# Extractable components

## Page-local primitives

- `Pill` in `app/page.tsx`
  - Category: basic
  - Description: compact status badge for grants, dates, and metadata.
  - Extractable props: `kind`, `children`.
  - Hardcoded: rounded pill geometry and Nexora palette.

- `Price` in `app/page.tsx`
  - Category: basic
  - Description: pricing card with features and CTA.
  - Extractable props: `name`, `price`, `text`, `points`, `featured`.
  - Hardcoded: card border, typography and hover lift.
