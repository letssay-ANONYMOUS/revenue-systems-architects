# Mobile Home — Round 2 Polish

Goal: push the mobile home page from "good" to "Awwwards-grade phone experience." Focus on density, motion realism, tactility, and visual storytelling. Desktop untouched.

## 1. Hero (mobile-only upgrades)
- Tighten headline to fit on one screen above the fold (no scroll to see CTA).
- Add a subtle **scroll-linked parallax** on the headline (drifts up + fades) and a **floating glass status pill** ("● Live · 12 calls handled today") that animates in after the headline.
- Replace the long sub-paragraph with **2 short kinetic lines** that swap every 3s (revenue-focused).
- Primary CTA becomes a **liquid-glass button** matching the new sticky bar (same material language).

## 2. MobileDiagnostic — make it feel alive
- Add a **morphing "Before → After" toggle** inside each card (swipe left/right on the visual to flip states with a fluid mask wipe, not just fade).
- Animated **metric counter** (counts up from 0 → target when card enters view).
- **Haptic-feel tap** on tabs (spring + tiny scale + soft shadow press).
- Tab indicator gets a **moving glow trail** (gradient that lags 80ms behind).
- Add a "Next →" affordance so users know to swipe between items inside a tab.

## 3. MobileServiceWorkshop — phone mockup density
- Increase phone frame realism: **dynamic island, status bar, rounded bezel highlight, subtle reflection sweep**.
- Each scene gets **one extra micro-detail**:
  - Call: live waveform pulsing with audio-style bars + caller name typing in
  - Chat: typing indicator, then message lands with a soft bounce, then "Booked ✓" toast
  - Web: Lighthouse score animates 0→100 with a green ring sweep, plus a fake browser scroll
- Add **scene labels with progress** ("Scene 2 of 3 · Chat") and a tap-to-pause/play.
- Allow **swipe left/right** to switch scenes manually (currently auto-only).

## 4. New mobile section: "Proof Strip"
Replace the stat-card row with a **horizontal auto-scrolling marquee** of 5 metrics + 3 client logos, pausing on touch. Single line, full bleed, no scroll cost.

## 5. Transition cards (RisingShowcase) — mobile variant
- Currently desktop-tuned 3D 3-up. On mobile, render as a **vertical stack of 3 liquid-glass cards** that rise + tilt-in on scroll (one at a time), each with the shimmer sweep preserved. Tap opens a **bottom-sheet detail** (same as MobileQuietLayer's sheet) instead of the desktop modal.

## 6. Sticky CTA bar — minor polish
- Add a **thin animated gradient hairline** on top edge (breathing).
- Add **safe-area padding** for iPhone home indicator.
- Subtle **icon (phone) on the left** that pulses every 6s.

## 7. Global mobile polish
- **Section dividers**: add a 1px gradient hairline + soft glow between sections so the page reads as chapters, not a wall.
- **Scroll-snap** on the main sections so each one centers cleanly.
- **Reduce motion** respect: wrap heavy effects in `prefers-reduced-motion` checks.
- Lazy-mount Workshop + Diagnostic visuals via `IntersectionObserver` for first-paint speed.

## Files to touch
- `src/pages/Index.tsx` — hero mobile branch, mobile transition stack, proof strip, dividers
- `src/components/mobile/MobileDiagnostic.tsx` — swipe flip, counters, glow trail
- `src/components/mobile/MobileServiceWorkshop.tsx` — scene density, manual swipe, pause control
- `src/components/mobile/StickyMobileCTA.tsx` — hairline + safe area + pulse icon
- New: `src/components/mobile/MobileProofStrip.tsx`
- New: `src/components/mobile/MobileTransitionStack.tsx`
- New: `src/components/mobile/MobileHeroExtras.tsx` (status pill + kinetic sub-lines)

## Out of scope
- Desktop layout (zero changes)
- Copy rewrites beyond hero sub-lines
- Backend / data work

Approve and I'll build it in one pass.
