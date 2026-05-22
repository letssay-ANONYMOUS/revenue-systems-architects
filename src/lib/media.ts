const SUPABASE_MEDIA_BASE =
  (import.meta.env.VITE_SUPABASE_MEDIA_BASE as string | undefined)?.replace(/\/$/, "") ||
  "https://nqxbucqfvofuhipafqrh.supabase.co/storage/v1/object/public/Website%20videos%20bucket";

const mediaUrl = (filename: string) => `${SUPABASE_MEDIA_BASE}/${filename}`;

export const HERO_VIDEO_SOURCES = [
  mediaUrl("hero-section-loop-edited-20260522-175107.mp4"),
];

export const CTA_VIDEO_SOURCES = [
  mediaUrl("cta-section-loop-edited-20260522-175107.mp4"),
];
