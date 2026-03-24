

## Navbar Layout Refactor — Only Links Get the Frosted Pill

### Problem
Currently the entire navbar (logo + links + CTA) morphs into the frosted pill, stretching it too wide and looking unsatisfying.

### Solution
Split the navbar into three independent elements on a full-width bar:
1. **Logo** — stays fixed far left, always visible, no pill
2. **Nav links** — center of the bar, these are the ONLY element that gets the frosted glass pill treatment on scroll
3. **Book a Call** — stays fixed far right, always visible, no pill

### Layout structure (desktop)
```text
|  Logo          [  Home · AI Calling · ... · About  ]          Book a Call  |
|  (far left)         (center, frosted pill on scroll)           (far right) |
```

### Technical changes — `src/components/Navbar.tsx`

1. **Outer nav**: full-width flex bar with `justify-between`, always transparent, fixed padding — no morphing on the outer container
2. **Logo** (left): no style changes on scroll, stays white text
3. **Center links wrapper**: this div gets the `nav-glass` class, `max-width`, `border-radius`, and all the existing morph transitions when `scrolled` is true. Starts as transparent with no border-radius, morphs into a compact frosted pill containing only the 6 nav links
4. **Book a Call** (right): stays in place, no style changes on scroll
5. Keep the same `SCROLL_ENTER`/`SCROLL_EXIT` thresholds and 700ms cubic-bezier transitions — just move them from the outer shell to the center links wrapper
6. Mobile: no changes needed (hamburger menu is unaffected)

