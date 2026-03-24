

## Color System Overhaul — From Template to Premium

### Diagnosis: Why It Looks Cheap

1. **Primary blue (`210 40% 65%`)** is a washed-out, mid-saturation default blue — it reads "template" not "premium"
2. **Accent purple (`260 25% 55%`)** is muddy and low-saturation — no visual punch
3. **Foreground (`40 20% 92%`)** has a warm yellowish tint that clashes with the cool blue palette — creates a dirty, unrefined feel
4. **Every icon, badge, border, and tint uses the same blue** at `/10` opacity — monotone and flat, nothing stands out
5. **The gradient (blue→purple)** is the most overused dark-theme gradient on the internet — looks like every other AI startup template
6. **Card surfaces** (`220 18% 10%`) are nearly identical to background (`220 20% 7%`) — no depth layering, everything blends into mud
7. **Red destructive** color used in the "pain points" section is too saturated and looks alarming, not premium

### New Color Direction

Shift from "generic dark AI template" to **"muted luxury with a sharp warm accent"**:

- **Background**: deeper, more neutral charcoal (less blue cast)
- **Foreground**: pure cool white (no yellow tint)
- **Primary**: refined silver-blue, slightly cooler and lighter — used for subtle UI elements
- **Accent → Warm amber/gold**: the single high-contrast color that draws the eye to CTAs, key metrics, and gradient text — differentiates from every blue-purple AI site
- **Cards**: more visible elevation with slightly lighter surfaces
- **Gradient**: silver-blue → warm amber instead of blue → purple — distinctive and premium
- **Muted tones**: properly stepped hierarchy for text (3 clear levels)

### Specific HSL Values

```text
Background:     225 15% 6%      (deeper, less blue)
Foreground:     220 10% 95%     (clean cool white)
Card:           225 12% 10%     (more visible lift)
Primary:        215 25% 60%     (refined steel blue)
Accent:         38 75% 55%      (warm amber/gold)
Muted fg:       220 8% 48%      (clear mid-gray)
Border:         225 10% 14%     (subtle but visible)
Surface elev:   225 12% 11%     (clear card lift)
Destructive:    0 45% 45%       (muted, less alarming)
Text secondary: 220 8% 55%
Text tertiary:  220 6% 35%
```

### Gradient Updates

- `--gradient-premium`: `linear-gradient(135deg, hsl(215 25% 60%), hsl(38 75% 55%))` — steel blue to gold
- `--glow-primary`: `215 30% 55%`
- `--glow-accent`: `38 60% 50%`
- Glow and shadow colors updated to match

### Files Changed

**`src/index.css`** — All CSS custom properties updated to new palette. Aurora background gradient colors adjusted. Nav glass tint stays neutral white.

**`tailwind.config.ts`** — No structural changes needed (references CSS vars).

**`src/components/GradientMesh.tsx`** — No changes needed (references CSS vars).

**`src/components/ProcessGraph.tsx`** — Accent-colored active step nodes use new amber.

**`src/pages/Index.tsx`** — Replace `text-destructive` in pain section with a muted rose (`text-red-400/70`) instead of full destructive red. All `text-primary`, `text-accent`, `bg-primary/10`, `bg-accent/10` references automatically pick up the new palette.

**`src/components/CTASection.tsx`** — No code changes needed (uses CSS vars).

**`src/components/Footer.tsx`** — No code changes needed.

### What Stays the Same

- All component structure, layout, animations, interactions
- Font families (Outfit + Inter)
- Border radius, spacing, responsive breakpoints
- The film grain, aurora, custom cursor, smooth scroll

### Build Order

1. Update CSS custom properties in `src/index.css`
2. Adjust aurora gradient stops to match new palette
3. Update pain points section in `Index.tsx` to use muted rose instead of harsh red

