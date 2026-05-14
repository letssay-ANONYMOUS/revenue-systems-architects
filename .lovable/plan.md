# Liquid Glass 3D Process Timeline

Reimagine `ProcessGraph.tsx` so the spine, nodes, and cards feel like sculpted liquid glass — with depth, refraction, and motion that responds to scroll.

## Visual direction

- **Spine as a glass tube**, not a flat line:
  - Layered SVG: outer blurred aura, inner translucent tube with highlight + inner shadow, plus a flowing gradient "liquid" that fills as you scroll.
  - Subtle iridescent shimmer (slow gradient pan) along the filled portion.
- **Nodes as 3D glass orbs**:
  - Multi-layer: outer halo, refraction ring, glass sphere with top specular highlight + bottom caustic glow.
  - Inactive = frosted/clear. Active = liquid pearl with rose/violet inner light. Past = settled, soft glow.
  - Scroll-driven scale + rotation on the highlight to mimic a moving light source.
- **Cards as floating glass slabs**:
  - Thicker frosted backdrop-blur, layered inset highlights (top + bottom), rim light border, soft contact shadow.
  - Hover: lift + parallax tilt (mouse-tracked, very subtle), highlight follows cursor.
  - Icon tile becomes a tiny matching glass chip.

## Animation upgrades

- **Liquid fill**: spine fill height bound to scroll progress with a spring (already used) but the gradient inside also pans vertically on a slow loop for a liquid feel.
- **Active node bloom**: as scroll crosses a node, orb scales 1 → 1.4 → 1, halo expands, a single soft caustic ripple emits outward (CSS-only, one-shot via key based on activeIndex).
- **Card entrance**: from `y: 40, rotateX: 8deg, opacity: 0, scale: 0.96` → settled, staggered per row. Uses `transform-gpu` and `perspective` on parent for real 3D.
- **Scroll-linked light sweep**: a faint diagonal highlight slides across each card once when it activates.
- **Reduced motion**: respect `prefers-reduced-motion` — drop tilt, ripple, and shimmer; keep fade-in.

## Technical details

- File: `src/components/ProcessGraph.tsx` (full refactor) + small additions in `src/index.css` for keyframes (`liquid-shimmer`, `caustic-ripple`, `light-sweep`).
- Keep current Framer Motion + `useScroll` setup. Add:
  - `useTransform` for per-step active progress to drive orb scale, halo opacity, ripple trigger.
  - A lightweight mouse-tilt hook (local, ~20 lines) used on cards; disabled on touch + reduced motion.
- Spine becomes an absolutely-positioned SVG (`<svg>` with `<defs>` for gradients + filters: gaussian blur for aura, feSpecularLighting optional but likely overkill — use layered divs/SVG instead for perf).
- All colors via existing semantic tokens + the current `timelineCore/Glass/Edge/Aura/Ink` palette extended with one violet accent for the liquid gradient.
- Mobile (per project rules): keep single-column layout, drop tilt + ripple, keep orb bloom and liquid fill (cheap).

## Non-goals

- No copy/content changes (steps stay as-is).
- No layout restructuring of surrounding sections.
- No new dependencies.

## Acceptance

- Spine reads as a glass tube with visible depth, not a flat gradient bar.
- Nodes look like 3D pearls/orbs with specular highlights.
- Active node visibly "blooms" as you scroll past it.
- Cards feel like floating glass slabs with hover tilt on desktop.
- Smooth on mobile (390px), no jank, reduced-motion respected.
