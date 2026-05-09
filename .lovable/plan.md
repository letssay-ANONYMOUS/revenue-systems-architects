# Rich UI Refresh — AI Calling Agents Section

Replaces the two placeholder card interiors in the "AI Calling Agents That Work While You Sleep" section with cinematic, on-brand mini-UIs. Everything outside the two cards stays exactly as it is (header, "How a Call Flows" pipeline, CTA link, surrounding sections).

## Scope

**Touched:** `src/pages/Index.tsx` (AI Calling section, ~lines 320–428 only) and two new components.
**Untouched:** Hero, Marquee, What We Build, Pain Points, Chatbots, Websites & Apps, Process, Footer, all routing, all copy outside the two cards, "How a Call Flows" row, the CTA link below.

## What Replaces What

### Left card — Inbound Agent
**Today:** Static header + 3 chat bubbles + 6 checkmark items.
**New:** A live calling console mockup.

- Header strip: caller avatar circle, caller name ("Incoming · +1 (415) ···"), live "00:42" call timer that ticks up while in view, small green pulsing "LIVE" dot.
- Center: animated voice waveform — 28 vertical bars in primary blue, each with its own sine-driven height loop (CSS keyframes, GPU-friendly, 2s loop, staggered phase per bar).
- Below waveform: streaming transcript that adds one line every ~1.4s (loops): caller line in muted gray on the left, AI line in primary-tinted on the right. Max 4 lines visible, oldest fades out as new arrives.
- Footer chips row: animated status chips that light up sequentially — "Listening" → "Qualifying ✓" → "Booking…" → "Confirmed ✓".
- Keeps the existing 6 feature checkmarks below as a compact 2-col grid (smaller, tighter — they become supporting context, not the main visual).

### Right card — Outbound Agent
**Today:** Static header + 7 flat tinted bars + 3 stat numbers + 6 checkmark items.
**New:** A real animated analytics panel.

- Header strip: "Campaign · Q4 Reactivation" title, small badge "Running" with pulsing dot, week selector pill ("This Week ▾" — visual only).
- Main chart: SVG line chart, 7 data points, gradient stroke (primary → accent), area fill underneath at 8% opacity, dotted gridlines. Line draws itself on scroll-in using `stroke-dasharray` + `stroke-dashoffset` transition (1.2s ease-out). Hovering data points reveals a tooltip with the day + value.
- KPI row (3 tiles): each tile has an icon, a number that counts up using the existing `CountUp` component, and a delta chip (e.g. "+12% vs last wk"). Tiles: Calls 342, Connect Rate 89%, Booked 47.
- Mini donut: small 40px donut showing connect rate 89% with animated stroke fill, sits inside the connect-rate KPI tile.
- Keeps the existing 6 feature checkmarks below as a compact 2-col grid.

## Style & Color Rules

- Cards keep their current outer shell: `rounded-2xl`, `border-border`, `hsl(var(--card))` background, existing `TiltCard` wrapper, existing padding.
- Inset panels (waveform container, transcript container, chart container, KPI tiles) use `hsl(var(--background) / 0.6)` with hairline `border-border` — nested glass-pane feel.
- Inbound accents: `hsl(var(--primary))` (the blue `#1447d4`).
- Outbound accents: `hsl(var(--accent))`.
- Typography: existing `font-display` for titles, `text-muted-foreground` for labels, ink charcoal for numbers.
- No dark mode flip, no neon, no glassmorphism. Stays inside the premium light luxury system.

## Animation Rules

- Waveform: pure CSS `@keyframes` animating `transform: scaleY()` per bar with staggered `animation-delay`. Pauses when out of view via `prefers-reduced-motion` check.
- Transcript stream: `setInterval` inside the component, capped at 4 visible lines, AnimatePresence fade+slide for entry/exit. Cleared on unmount.
- Status chips: `setInterval` advancing the active index every ~1.6s, looping.
- Call timer: `setInterval` ticking the seconds; only runs when component is in view (uses IntersectionObserver via Framer Motion's `useInView`).
- Line chart: draws once when first in view (Framer Motion `whileInView`, `once: true`).
- KPI counters: existing `CountUp` component, triggered on in-view.
- All loops respect `prefers-reduced-motion: reduce` — fall back to a static frame.

## Mobile Behavior

- Waveform reduces to 16 bars instead of 28.
- Transcript shows max 3 lines instead of 4.
- KPI row stays 3 columns but smaller numbers; donut hidden on the smallest breakpoint.
- Chart height scales down (140px mobile → 200px desktop).
- All existing mobile spacing/padding from the current cards is preserved.

## File Plan

```text
src/pages/Index.tsx
  - Replace inner content of the Inbound TiltCard (~lines 322-369) with <InboundCallingConsole />
  - Replace inner content of the Outbound TiltCard (~lines 373-426) with <OutboundAnalyticsPanel />
  - Keep card shells, headers, surrounding section unchanged

src/components/calling/InboundCallingConsole.tsx   (new)
  - Header strip (caller info, live timer, LIVE dot)
  - Waveform (28 CSS-animated bars)
  - Streaming transcript (interval-driven, AnimatePresence)
  - Sequencing status chips
  - Compact 6-item feature grid below

src/components/calling/OutboundAnalyticsPanel.tsx  (new)
  - Header strip (campaign name, Running badge, week pill)
  - SVG line chart (gradient stroke, area fill, draw-on-scroll)
  - 3 KPI tiles with CountUp + mini donut on connect-rate tile
  - Compact 6-item feature grid below
```

No new dependencies. Uses existing Framer Motion, Tailwind tokens, `CountUp`, and the existing `TiltCard` wrapper.

## Verification

1. Read both new component files back to confirm structure.
2. Open the preview at `/`, scroll to the AI Calling section.
3. Screenshot both cards in desktop viewport, verify waveform animates, transcript streams, line chart draws, KPIs count.
4. Screenshot in mobile viewport (390px), verify spacing and that nothing overflows.
5. Confirm no regressions in surrounding sections (visual diff via screenshot).

## Out of Scope (separate future passes)

- Pain Points / Missed Call section redesign
- Websites & Apps mockup replacement
- Trust marquee logo upgrade
- Section rhythm / dark band breaks
- Pushing to GitHub (will not push automatically per your request)
