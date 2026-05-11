## Two effects from your video, applied cleanly

**1. Stacked card deck (replaces the current "rising cards" under the hero)**
Cards become a sticky deck. Each card slides up into the viewport as you scroll, lands at center with a subtle rotation, then the next card slides up over it — previous cards stay visible underneath, peeking out with their tilt. Same content as today (Calls captured / Bookings lifted / Admin reduced), only the motion changes.

**2. B&W liquid-glass band reveal (new section between hero-deck and DarkStageShowcase)**
Three horizontal glass bands stack vertically and slide up from below in a staggered sequence as you scroll, like blinds closing upward. Pure black & white liquid-glass styling (frosted dark surfaces, inner highlights, soft sheen). Easy to upgrade to refractive 3D liquid glass later without changing structure.

Nothing else on the page is touched.

## Implementation

### Part 1 — Stacked deck

File: `src/pages/Index.tsx` → rewrite `HeroScrollTransition` and `RisingShowcaseCard`.

- Section height `~360vh`, one sticky `100dvh` stage inside
- Cards rendered absolutely-centered, stacked in z-order
- Per-card scroll range: card N active in `[N/3, (N+1)/3]` of `scrollYProgress`
- Card animation in its range:
  - `y`: `70vh → 0`
  - `scale`: `0.92 → 1`
  - `rotate`: locked tilt per card (`-3°`, `+2°`, `-2°`)
  - `opacity`: `0 → 1`
- Once landed, card stays pinned; next card slides up on top, slightly offset down so previous tilt peeks
- `useSpring` (stiffness 90, damping 28, mass 0.5, restDelta 0.001) wrapping `scrollYProgress` for smoothness
- All transforms GPU-only (`transform-gpu`, `will-change: transform`)
- Headline ("The quiet layer…") fades in/out as today
- Off-brand orange grid overlay removed; keeps the existing glass card styling

### Part 2 — Band reveal

New file: `src/components/BandReveal.tsx`. Inserted in `Index.tsx` between `<HeroScrollTransition />` and `<DarkStageShowcase />`.

- Section height `~220vh`, sticky `100dvh` inner stage
- 3 bands stacked vertically, each `33.34dvh`
- Each band starts at `y: 100%`, slides to its slot
- Stagger: band 1 `[0, 0.35]`, band 2 `[0.18, 0.55]`, band 3 `[0.36, 0.75]`
- Spring smoothing on `scrollYProgress` (same constants as above)
- Band content (placeholders, swappable any time):
  - 01 — "Answers" / "AI inbound that picks up every call"
  - 02 — "Automates" / "Workflows that run while you sleep"
  - 03 — "Accelerates" / "Web & apps engineered to convert"

B&W liquid-glass styling per band:
- Surface: `rgba(12,14,18,0.78)` + `backdrop-filter: blur(28px) saturate(140%)`
- Inner highlight: `inset 0 1px 0 rgba(255,255,255,0.18)`
- Bottom hairline: `inset 0 -1px 0 rgba(255,255,255,0.06)`
- Top sheen: `linear-gradient(180deg, rgba(255,255,255,0.10), transparent 40%)`
- FilmGrain (existing component) at low opacity for depth
- Serif white headline, `white/55` eyebrow, no color

### Performance & safety

- Both sections `hidden md:block` — mobile keeps a static fallback (cards as the existing grid; band reveal omitted)
- One `useScroll` per section, springs reused across children
- No layout thrash: only `transform` + `opacity` animated
- No new dependencies

### Final page order

```text
Hero
HeroScrollTransition  (sticky stacked deck)
BandReveal            (NEW — B&W liquid glass)
DarkStageShowcase
Pain points grid
… rest of page
```

### Files touched

- `src/pages/Index.tsx` — rewrite `HeroScrollTransition` + `RisingShowcaseCard`; insert `<BandReveal />`
- `src/components/BandReveal.tsx` — new

No other files, copy, or sections modified.