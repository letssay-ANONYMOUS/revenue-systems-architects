# Real 3D Liquid Glass Timeline (Mobile-First)

The current timeline reads as flat pink. We replace it with a sculpted glass-and-chrome system that has actual depth, real lighting, and chromatic refraction — not a tinted gradient. Mobile is the primary target since most viewers are on phones.

## Palette reset (away from "cheap pink")

Drop the rose/pink dominance. New palette is premium neutral glass with a faint cool→warm refraction only as edge light:

- Spine + orbs base: clear glass on a soft platinum background
  - Glass body: `rgba(255,255,255,0.55)` over `hsl(225 15% 96%)`
  - Inner shadow ink: `hsl(225 20% 18% / 0.18)`
  - Specular highlight: pure white
- Refraction (used sparingly, only at edges/rim):
  - Cool edge: `hsl(210 90% 70% / 0.35)`
  - Warm edge: `hsl(28 95% 70% / 0.30)`
  - Violet caustic: `hsl(265 70% 70% / 0.25)`
- Active accent (replaces the pink bloom): liquid mercury — white core → cool blue rim → warm amber underlight. No pink.

Result: looks like polished glass on marble, with a subtle prism kiss on the rim — premium, not candy.

## True 3D construction (not flat gradients)

Spine becomes a real cylinder, not a div:

- Inline SVG cylinder with 3 stops across X to fake roundness:
  `0% dark edge → 18% mid → 50% bright highlight → 82% mid → 100% dark edge`
- Top + bottom elliptical caps (SVG ellipses) so the tube has actual ends.
- Behind it: a soft drop shadow offset 6px right + blurred 18px = real contact shadow on the page.
- Liquid fill is a second cylinder masked to the scroll height, with its own internal highlight stripe and a slow vertical gradient pan for the "liquid moving" feel.

Orbs become real spheres:

- Each orb is an SVG `<circle>` stack:
  1. Contact shadow ellipse below (blur 8, dy 6) — grounds the orb in 3D
  2. Sphere base: radial gradient with light source at top-left (28%, 22%)
  3. Terminator shadow: dark crescent on the bottom-right inside the sphere
  4. Bounce light: subtle warm rim at bottom-left from the "marble" surface
  5. Specular hot spot: tiny white highlight near top-left
  6. Fresnel rim: 1px ring with chromatic split (cool top, warm bottom) at very low opacity
- This is what makes a sphere read as 3D: top-left key light, bottom-right terminator, bottom bounce, rim light. Pure CSS gradients alone can't do it convincingly — SVG with stacked filters can.

Cards become floating glass slabs with depth cues:

- Multi-layer shadow: tight dark contact shadow (`0 2px 4px / 0.12`) + medium ambient (`0 12px 28px / 0.10`) + wide soft (`0 40px 80px / 0.08`). This stack is what makes objects feel lifted off the page.
- Edge highlight on top + left (light source consistency with orb).
- Terminator shadow on bottom + right edge (1px inset dark line).
- Backdrop blur 24px with 0.55 white tint, NOT 0.78 — let the background show through so it reads as glass, not frosted plastic.
- Subtle inner reflection of the orb's color near the edge closest to the spine (tiny radial gradient in the corner) — sells the "glass reflecting glass" effect.

## Mobile-first behavior (390px primary)

The current mobile spine is at `left-5` with cards crammed to the right. We rework it specifically for phones:

- Spine slightly thicker on mobile (8px tube vs current 6px) so the cylinder shading actually reads.
- Orbs scale down to 32px but keep all 6 lighting layers.
- Cards span `calc(100vw - 64px)` with the spine inset 24px from the left, leaving the orb centered on the spine and the card overlapping the spine slightly with a notched left edge — looks like the card is threaded onto the rod (real 3D relationship).
- Each card has a small 3D entrance: starts at `rotateY: -12deg` (hinged on the spine) and settles to 0. Reads as a card swinging into place on the rod.
- Active orb on mobile gets a single subtle scale pulse + rim brighten (no ripple, no shimmer) to keep it cheap on GPU.
- Drop tilt-on-mouse entirely on coarse pointers.
- Reduced motion: keep the static 3D look (the lighting), drop animations only.

## Animation upgrades (kept tasteful)

- Liquid fill: vertical gradient pan 6s loop, only on the filled portion.
- Active orb bloom: scale 1 → 1.18 → 1.04 with a synchronized rim-light intensity bump (no pink halo explosion).
- Card entrance (mobile): `rotateY` swing 12deg → 0 + opacity, 500ms, easeOut.
- Card entrance (desktop): keep current `y/rotateX` reveal, add a one-shot specular sweep across the surface when activated.
- Scroll-linked light source: the page-wide light position shifts very slightly with scroll so highlights on all orbs move together — sells that they share a real environment.

## Technical details

- File: `src/components/ProcessGraph.tsx` — full rewrite. Spine + orbs become inline SVG components (`<Spine />`, `<Orb />`).
- `src/index.css` — replace `pg-liquid-fill`, `pg-glass-tube`, `pg-card-sheen`, `pg-ripple` with the new neutral palette versions; add `pg-liquid-mercury` keyframe (slow gradient pan), `pg-rim-pulse` for active orb rim.
- Remove the rose/pink hex values (`#eac0d7`, `rgba(247,227,239,...)`, etc.) entirely. New colors are platinum white + cool/warm/violet only as low-opacity rim accents.
- No new dependencies. Keep Framer Motion + `useScroll` + per-step `useTransform` setup.
- Mobile branch checks `(pointer: coarse)` once at mount to skip mouse-tilt wiring.

## Non-goals

- No copy changes.
- No layout changes outside the timeline.
- No change to surrounding sections' background.

## Acceptance

- On a 390px phone: spine reads as a real glass rod with a contact shadow; orbs read as 3D spheres with visible top-left light + bottom-right shadow; cards feel threaded onto the rod and swing into view.
- No dominant pink. Color reads as platinum glass with subtle prism rim only.
- Active state pulses cleanly without GPU jank.
- Desktop keeps tilt + sheen; mobile drops them.
