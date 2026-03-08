

## Scroll-Driven Service Showcase

### What changes

**Keep:** The "A Complete System, Not Scattered Tools" heading and the "Everything Connects" subsection (lines 306-339). Add a `CreditCard` (payment gateway) icon to the "Everything Connects" grid.

**Replace:** The bento grid (lines 279-304) with a new `ScrollShowcase` component — a sticky scroll section where the left side shows a large visual that crossfades between services as the user scrolls, and the right side cycles through service descriptions.

### ScrollShowcase component (`src/components/ScrollShowcase.tsx`)

**Mechanic:**
- Outer container height = number of services × 100vh (8 services = 800vh)
- Inner wrapper uses `position: sticky; top: 0` with a two-column layout (image left, text right)
- `useScroll` tracks progress within the outer container, maps to active service index (0–7)
- Left panel: crossfades images using `AnimatePresence` with opacity + subtle scale
- Right panel: all 8 descriptions stacked, active one highlighted with full opacity, others dimmed
- Mobile: single column — sticky image top (~40vh), descriptions scroll beneath

**8 services with outcome-focused copy:**

| # | Title | Headline | Description |
|---|-------|----------|-------------|
| 1 | Inbound AI Agent | Never Miss a Call | Answers every call, qualifies the lead, and books the appointment — while your team focuses on high-value work. |
| 2 | Outbound AI Agent | Follow Up on Autopilot | Automated outreach, follow-ups, and reactivation calls. No lead goes cold. |
| 3 | Support Chatbot | Instant Answers, 24/7 | Handles FAQs, captures leads, and routes complex issues — your website never sleeps. |
| 4 | Lead Qualification | A Digital Salesman That Never Clocks Out | Qualifies visitors, scores leads, and books meetings automatically. |
| 5 | Appointment Booking | Scheduling Without the Back-and-Forth | Syncs calendars, sends reminders, eliminates no-shows. |
| 6 | Business Website | Built to Convert, Not Just Impress | Premium sites engineered to turn visitors into paying customers. |
| 7 | Web & Mobile Apps | Custom Systems for Your Business | Applications that serve your customers and streamline your operations. |
| 8 | Workflow Automation | Connect Everything, Automate the Rest | Link your tools, automate handoffs, and eliminate repetitive busywork. |

**Visuals:** Each service gets a generated image via Nano Banana Pro (`google/gemini-3-pro-image-preview` through the Lovable AI gateway). Dark-themed UI mockup style visuals. While loading, show a skeleton shimmer with a gradient placeholder. Images cached in component state after generation.

**Image prompts** (all appended with "— ultra clean, premium dark theme, minimal UI, cinematic lighting, 16:9"):
1. AI phone dashboard with live call waveform and caller info
2. Outbound campaign dashboard with contact list and conversion metrics
3. Chat widget interface with conversation bubbles and quick replies
4. Lead scoring pipeline with qualification cards and routing flow
5. Calendar booking interface with time slots and confirmation
6. Premium business landing page preview in a browser frame
7. Mobile and web app side-by-side with clean business UI
8. Workflow automation builder with connected nodes and integrations

### Changes to Index.tsx

1. Import `ScrollShowcase` and `CreditCard` from lucide-react
2. Replace bento grid (lines 279-304) with `<ScrollShowcase />`
3. In the "Everything Connects" grid (line 313), add `{ icon: CreditCard, label: "Payments" }` to the array

### Scroll indicator

A thin vertical progress bar on the right edge of the showcase section, filling as the user scrolls through services. Provides orientation within the tall scroll container.

### Build order

1. Create `src/lib/generateServiceImages.ts` — utility to call AI gateway for image generation
2. Create `src/components/ScrollShowcase.tsx` — the full sticky scroll component
3. Update `src/pages/Index.tsx` — swap bento grid, add payment icon

