# Mobile Case Studies — Liquid Glass Rolodex v2

Goal: replace the flat platinum cards with premium frosted-glass 3D cards, and tighten the layout so the section feels intentional, not generic.

## What changes visually

**Card material — liquid glass**
- Translucent surface: `bg-white/55` with `backdrop-blur-2xl` and `backdrop-saturate-150`
- Inner highlight: top-edge specular gradient (`from-white/80 via-white/20 to-transparent`) + soft bottom sheen
- Refractive border: 1px gradient border (`hsl(var(--foreground)/0.18)` → `hsl(var(--foreground)/0.04)`) via masked pseudo-layer
- Floating shadow stack: `0 40px 80px -30px hsl(foreground/0.45)` + `0 12px 30px -18px hsl(foreground/0.25)` + a faint blue tint shadow that echoes the new timeline accent
- Corner radius `rounded-[28px]` for a more device-like feel
- Very low-opacity grain for depth

**Behind-the-glass color layer**
- Each card has its own blurred gradient blob sitting behind the glass (ink, slate, blue) — that refracted color is what sells "frosted"
- Industry pill becomes a glass chip: `bg-white/40 backdrop-blur-md border border-white/60`

**3D layout refinement**
- Reduce card height 460px → ~420px so it fits one mobile viewport with breathing room
- Tighten the fan: side cards `x: ±56`, `z: -140`, `rotateY: ±18°`, `scale: 0.92`, `opacity: 0.55` — peeks feel closer, more "deck of cards"
- Active card gets a subtle idle float (`y: [0,-4,0]`, 6s loop) so the glass feels alive
- Light parallax tilt while drag-swiping (rotateY follows drag x) before the swipe commits

**Section framing (the "organized" part)**
- Small mobile-only section header above the deck:
  - Eyebrow: "CASE STUDIES" (uppercase, tracked, foreground/50)
  - Title: "Proof, not promises." (font-display)
  - One-line subhead
- Below the deck: replace plain dots with a labeled progress rail — three short segments and the active industry name underneath ("Hospitality · 1 / 3"). Reads as a real index, not a generic carousel.
- Quiet "Swipe or tap" hint that fades after first interaction.

**Background context**
- Wrap the mobile section in a soft radial backdrop (`hsl(214 60% 96%)` → transparent) so the glass actually has something to refract. Without this, frosted glass looks flat.

## Technical notes

- Rewrite `src/components/MobileCaseRolodex.tsx`. No new deps — `framer-motion` already used.
- Glass = layered divs inside each `motion.article`:
  1. colored blob (absolute, blurred, behind)
  2. glass surface (`backdrop-blur-2xl bg-white/55`)
  3. gradient border via `before:` pseudo with `mask-composite: exclude` (Tailwind arbitrary values)
  4. content
- Tokens for text/foreground; whites for the glass material itself are intentional (glass is a material, not a brand color).
- Respect `useReducedMotion`: disables idle float, drag-tilt, and auto-advance.
- Keep auto-advance (6s, pauses on interaction), tap-side-to-bring-forward, and keyboard support.
- Desktop `LiquidCaseStudyCards` untouched.

## Out of scope
- Desktop case studies
- Other sections
- New copy beyond the section header above the deck

Ready to build on approval.