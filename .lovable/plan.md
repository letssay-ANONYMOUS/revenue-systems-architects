# Pain Points Section: Split-Card Redesign with 6 Animated Micro-UIs

Replace the flat 3×2 grid in the "Every Missed Call Is a Missed Sale" section with diagonal split cards, each containing a unique animated mini-UI on the "fix" side that visually demonstrates the transformation.

## Visual structure (per card)

```text
┌─────────────────────────────────┐
│  [icon] Missed calls            │  ← pain side: muted, line-through, faint red wash
│  - - - - - - - - - - - - - - -  │  ← hairline diagonal divider (~115°)
│  [icon] AI answers every call   │  ← fix label: ink, primary blue accent
│                                 │
│  ┌───────────────────────────┐  │
│  │   [animated micro-UI]     │  │  ← ~80px tall, unique per card, loops
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

Card stays inside `TiltCard` + `SectionReveal`, keeps `rounded-2xl`, `border-border`, `hsl(var(--card))` bg. Pain row uses existing strikethrough styling. Fix row gains a small inset surface beneath it that holds the micro-UI.

## The 6 micro-UIs (all pure SVG/CSS, no images, no new deps)

| # | Card | Micro-UI behavior |
|---|---|---|
| 1 | Missed calls → AI answers | Inbound call ring with pulsing concentric circles, "Answered · 0.4s" label fades in |
| 2 | Slow responses → Instant voice & chat | Two chat bubbles: typing dots → "Sent" check, with a tiny "<1s" timestamp |
| 3 | No-show chaos → Automated reminders | Mini calendar row with 3 slots; SMS ping icons fly out → slots flip to green check |
| 4 | Weak web presence → Premium conversion site | Lighthouse-style score dial: counts 32 → 98, ring fills from red arc to primary |
| 5 | Manual admin → Automated workflows | 4 workflow nodes connected by lines; pulse travels through them, each lights up sequentially |
| 6 | Fragmented tools → One connected system | 5 small app dots scattered → snap into a hub-and-spoke with lines drawing between them |

Each loops on a 3–4s cycle. All use `whileInView` (once: true) for entry, then a single CSS or framer-motion loop. Reduced-motion: freeze on the final "fixed" frame.

## Style rules

- Pain side: `text-muted-foreground`, opacity reduced, `bg-destructive/4` wash on top half only
- Fix side: full ink, primary blue accents on micro-UI strokes/fills
- Diagonal divider: 1px gradient from `destructive/20` → `primary/30` at ~115° (replaces current horizontal divider)
- Card hover: pain side dims to 40%, fix micro-UI plays one accelerated cycle
- Card height equalizes via `h-full` + flex column

## Mobile (≤md)

- Keep 2-column grid (matches current layout)
- Micro-UI shrinks to ~56px tall
- Diagonal divider reverts to horizontal hairline (cleaner at small sizes)
- Animations still play (CSS-only, cheap)

## Files

- **New:** `src/components/painpoints/PainPointCard.tsx` — wraps the split layout, takes `pain`, `solution`, `icon`, and a `visual` slot
- **New:** `src/components/painpoints/visuals/` — 6 small components: `MissedCallVisual.tsx`, `InstantReplyVisual.tsx`, `RemindersVisual.tsx`, `LighthouseVisual.tsx`, `WorkflowNodesVisual.tsx`, `ConnectedToolsVisual.tsx`
- **Edit:** `src/pages/Index.tsx` — replace lines ~275–300 (the `painPoints.map` block) with new card + visual mapping
- **Edit:** `src/index.css` — add 2–3 small `@keyframes` (pulse-ring, draw-line, dial-fill) + reduced-motion guards

## Out of scope

- Section heading, section spacing, surrounding sections — untouched
- No new dependencies (Framer Motion + Tailwind cover everything)
- No copy changes to the 6 pain/solution pairs
