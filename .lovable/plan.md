

## Plan: Fix Missing Chatbot Section Content, Add Colors to Websites & Apps, Electrify Timeline Line

### What's Wrong

1. **Chatbot section left side missing**: The screenshot shows the left column (title, description, feature list) of the "Chatbots & Automation" section is not visible. The content exists in code (lines 560-578 of Index.tsx) but is likely not rendering visually — possibly due to the `SectionReveal` animation not triggering when the section loads via `LazySection`. The combination of `LazySection` (which defers rendering) + `SectionReveal` (which uses `whileInView`) can cause the content to never animate in if the viewport intersection timing conflicts.

2. **Websites & Apps section needs color**: The section (lines 640-734) is mostly monochrome — needs accent colors on the mockup elements and service cards.

3. **Timeline line needs yellow/zap effect**: The ProcessGraph vertical line currently uses a `primary → accent` gradient. User wants it more yellow and with a flashing/pulsing "zap" effect.

---

### Changes

#### 1. Fix Chatbot Section — Ensure Left Content Renders

**File: `src/pages/Index.tsx`** (lines 555-638)

- Wrap the left-side content (`SectionReveal` around lines 560-578) with a fallback that doesn't depend on intersection timing. Either:
  - Remove the outer `SectionReveal` on the left column and use a simpler fade-in, OR
  - Add `amount: 0.1` to the `SectionReveal` viewport config to make it trigger earlier
- Most likely fix: the `lg:grid-cols-2` grid's left column isn't intersecting because the chatbot card on the right is taller and the left content scrolls past. Add `items-center` if missing, and ensure the `SectionReveal` triggers with a lower threshold.

#### 2. Add Colors to Websites & Apps Section

**File: `src/pages/Index.tsx`** (lines 640-734)

- Add color accents to the phone/desktop mockup wireframes — use `bg-primary/20`, `bg-accent/20` for placeholder blocks
- Add subtle colored borders or icon tints to the 6 service cards (alternate between `primary` and `accent` colors for icons and hover states)
- Add a subtle gradient glow behind the mockups section

#### 3. Make Timeline Line Yellow & Flashing

**File: `src/components/ProcessGraph.tsx`**

- Change the animated fill gradient from `primary → accent` to a warm yellow/gold: `hsl(45, 100%, 55%)` to `hsl(38, 90%, 45%)`
- Add a CSS `@keyframes` pulsing glow animation on the line — a box-shadow that pulses between bright and dim yellow
- Add the animation class to the `motion.div` fill element
- Update dot border color to match the yellow/gold

**File: `src/index.css`**

- Add a `@keyframes zap-pulse` animation:
  ```css
  @keyframes zap-pulse {
    0%, 100% { box-shadow: 0 0 8px hsl(45 100% 55% / 0.4); }
    50% { box-shadow: 0 0 20px hsl(45 100% 55% / 0.8), 0 0 40px hsl(45 100% 55% / 0.3); }
  }
  ```

### Technical Details

- The chatbot section fix targets the `SectionReveal` / `LazySection` interaction — the left column's animation likely never fires because by the time `LazySection` mounts it, it's already in view and `whileInView` with `once: true` + negative margin misses it
- Timeline color changes use inline styles to avoid conflicts with CSS variable system
- The zap pulse uses CSS animation (not framer-motion) for performance

