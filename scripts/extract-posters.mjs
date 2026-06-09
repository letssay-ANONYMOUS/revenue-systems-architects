// One-time generator for video poster images in public/posters/.
// Grabs the first frame of each hero/CTA video via canvas.
// Run: node scripts/extract-posters.mjs
import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/posters");
const BASE = "https://nqxbucqfvofuhipafqrh.supabase.co/storage/v1/object/public/Website%20videos%20bucket";

const VIDEOS = [
  { file: "hero-section-loop-edited-20260522-175107.mp4", out: "hero-poster.jpg" },
  { file: "hero-section-loop-mobile-h264-960w-20260523.mp4", out: "hero-poster-mobile.jpg" },
  { file: "cta-section-loop-edited-20260522-175107.mp4", out: "cta-poster.jpg" },
  { file: "cta-section-loop-mobile-h264-960w-20260523.mp4", out: "cta-poster-mobile.jpg" },
];

fs.mkdirSync(OUT_DIR, { recursive: true });
const browser = await puppeteer.launch();
const page = await browser.newPage();

for (const { file, out } of VIDEOS) {
  const dataUrl = await page.evaluate(async (src) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.src = src;
    await new Promise((resolve, reject) => {
      video.addEventListener("loadeddata", resolve, { once: true });
      video.addEventListener("error", () => reject(new Error("video load failed")), { once: true });
      video.load();
    });
    video.currentTime = 0.04;
    await new Promise((resolve) => video.addEventListener("seeked", resolve, { once: true }));
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.72);
  }, `${BASE}/${file}`);

  const buffer = Buffer.from(dataUrl.split(",")[1], "base64");
  fs.writeFileSync(path.join(OUT_DIR, out), buffer);
  console.log(`Wrote public/posters/${out} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

await browser.close();
