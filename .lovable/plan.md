## Mobile Case Studies — 3D Rolodex (Platinum + Ink)

Replace the scrolling case study cards on mobile with a single-viewport 3D rolodex deck. Desktop stays untouched.

### Visual direction
- Platinum + ink palette: off-white surface (`hsl 0 0% 99%`), charcoal ink text (`hsl 225 15% 12%`), hairline borders, soft ambient shadow. No pink/rose.
- Three cards stacked in true 3D space using `transform-style: preserve-3d` and `perspective` on the parent. Active card front-and-center; the two behind peek with progressively smaller scale, lower y-offset, and reduced opacity.
- Thin metallic top ribbon reduced to a single hairline accent in ink. Industry tag as a small uppercase pill.

### Interaction
- Swipe left/right (touch) or tap side peeks to rotate deck. Active card flips/rotates out on Y axis (~25°) while the next rises into place. Framer Motion `AnimatePresence` + `drag="x"` with `dragConstraints` and velocity-based commit threshold.
- Auto-advance every 6s, pauses on user interaction.
- 3 dots indicator below deck.

### Card content (per case study)
- Industry pill (Real Estate / E-commerce / Coaching)
- Big metric (e.g. "3×")
- Metric label ("More Bookings")
- One-line outcome sentence
- Hairline divider + small client descriptor

### Nav cleanup (separate from rolodex)
- Remove "Web & Apps" / "Websites & Apps" from desktop nav, mobile nav, footer, and the desktop section on Index — everywhere, per your call.

### Technical notes
- New component `src/components/MobileCaseRolodex.tsx`. Render it in the case studies section with `md:hidden`; existing desktop cards wrapped in `hidden md:grid` (or current desktop layout untouched).
- Uses `framer-motion` (already in project) — `motion.div` with `style={{ transformStyle: 'preserve-3d' }}`, parent `perspective: 1200px`.
- Stack math: index 0 → `translateZ(0) scale(1)`, index 1 → `translateY(16px) translateZ(-80px) scale(0.94) opacity(0.6)`, index 2 → `translateY(28px) translateZ(-160px) scale(0.88) opacity(0.3)`.
- Exit anim: `rotateY: -25, x: -120, opacity: 0`.
- Tokens only — `bg-background`, `text-foreground`, `border-border`, `shadow-[0_30px_60px_-30px_hsl(var(--foreground)/0.25)]`.

### Out of scope
- Desktop case study layout
- Other sections' colors
