const SUPABASE_MEDIA_BASE =
  (import.meta.env.VITE_SUPABASE_MEDIA_BASE as string | undefined)?.replace(/\/$/, "") ||
  "https://nqxbucqfvofuhipafqrh.supabase.co/storage/v1/object/public/Website%20videos%20bucket";
const SUPABASE_IMAGE_BASE =
  (import.meta.env.VITE_SUPABASE_IMAGE_BASE as string | undefined)?.replace(/\/$/, "") ||
  "https://nqxbucqfvofuhipafqrh.supabase.co/storage/v1/object/public/Website%20images%20bucket";

const mediaUrl = (filename: string) => `${SUPABASE_MEDIA_BASE}/${filename}`;
const imageUrl = (filename: string) => `${SUPABASE_IMAGE_BASE}/${filename}`;

export const HERO_VIDEO_SOURCES = [
  mediaUrl("hero-section-loop-edited-20260522-175107.mp4"),
];

export const HERO_VIDEO_MOBILE_SOURCES = [
  mediaUrl("hero-section-loop-mobile-h264-960w-20260523.mp4"),
  ...HERO_VIDEO_SOURCES,
];

export const CTA_VIDEO_SOURCES = [
  mediaUrl("cta-section-loop-edited-20260522-175107.mp4"),
];

export const CTA_VIDEO_MOBILE_SOURCES = [
  mediaUrl("cta-section-loop-mobile-h264-960w-20260523.mp4"),
  ...CTA_VIDEO_SOURCES,
];

// First-frame posters served from /public so videos paint immediately.
export const VIDEO_POSTERS = {
  hero: "/posters/hero-poster.jpg",
  heroMobile: "/posters/hero-poster-mobile.jpg",
  cta: "/posters/cta-poster.jpg",
  ctaMobile: "/posters/cta-poster-mobile.jpg",
} as const;

export const SITE_IMAGES = {
  logo: imageUrl("sterk-logo.jpg"),
  callsCaptured: imageUrl("calls-captured-card.jpg"),
  bookingsLifted: imageUrl("bookings-lifted-card.jpg"),
  adminReduced: imageUrl("admin-reduced-card.jpg"),
  realEstateWebsite: imageUrl("real-estate-website-card.jpg"),
  cafeWebsite: imageUrl("cafe-website-card.jpg"),
  clinicWebsite: imageUrl("clinic-website-card.jpg"),
  phoneRealEstateWebsite: imageUrl("phone-real-estate-website.jpg"),
  phoneCafeWebsite: imageUrl("phone-cafe-website.jpg"),
  phoneClinicWebsite: imageUrl("phone-clinic-website.jpg"),
} as const;
