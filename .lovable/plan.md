## Mobile section-2 cards + realistic 3D iPhone

### 1. Section-2 cards (`MobileQuietLayer.tsx`)
Currently only the first card feels tactile because `whileTap` gets eaten by horizontal scroll inertia on cards 2/3.

- Replace `whileTap` with a **manual press state** driven by `onPointerDown / Up / Cancel` (fires reliably mid-scroll).
- New **3D pushback**: `scale 0.94`, `y: 4`, `rotateX: 4°`, perspective 800, shadow squash. Spring `stiffness 420, damping 22`. Identical on all 3 cards.
- **Two-stage open**: tap → card auto-snaps to center → expands in place (scale 1.06, image zoom 1.08, soft glow ring, ~220ms) → bottom-sheet rises. Feels like the card lifts up before opening.
- One shared `PressableCard` wrapper so behavior is guaranteed identical across all three.

### 2. 3D iPhone frame (`MobileServiceWorkshop.tsx`)
Rebuild the phone so it reads as a real device, not a flat rectangle.

- **Titanium side rail** layer: vertical metallic gradient (`#e8eaed → #6b7280 → #1a1d24 → #6b7280 → #e8eaed`) with 1px specular edges.
- **Power + volume buttons** as small gradient nubs on left/right rails.
- **Curved OLED edge** via inset shadows on screen left/right.
- **Floating ground shadow** (large blurred ellipse) under the phone.
- **Live 3D tilt**: scroll-driven `rotateY ±6° / rotateX ±3°` via `useScroll`, plus `DeviceOrientationEvent` gyro parallax when available. `transform-style: preserve-3d`, `perspective: 1400`.
- **Specular sweep anchored to tilt angle** (not just time), so reflections feel light-sourced.
- Screen gets subtle inner glow + vignette to read as emissive.
- Respects `prefers-reduced-motion` (static tilt only).

### Files
- `src/components/mobile/MobileQuietLayer.tsx`
- `src/components/mobile/MobileServiceWorkshop.tsx`

Desktop untouched.