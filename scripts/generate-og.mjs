// One-time generator for public/og-cover.png (1200x630 social card).
// Run: node scripts/generate-og.mjs
import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import path from "node:path";

const outPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/og-cover.png");

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Inter:wght@400;500&display=swap');
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: 'Outfit', sans-serif;
    background:
      radial-gradient(ellipse at 78% 18%, rgba(47,116,255,0.28), transparent 46%),
      radial-gradient(ellipse at 12% 86%, rgba(20,71,212,0.34), transparent 52%),
      linear-gradient(135deg, #0a1322 0%, #07101f 55%, #050914 100%);
    color: #f7f9fc;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 96px; position: relative;
  }
  .grid {
    position: absolute; inset: 0; opacity: 0.10;
    background-image: linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  .chip {
    display: inline-flex; align-items: center; gap: 12px;
    border: 1px solid rgba(255,255,255,0.22);
    background: rgba(255,255,255,0.07);
    border-radius: 999px; padding: 12px 26px;
    font-size: 21px; font-weight: 600; letter-spacing: 0.22em;
    text-transform: uppercase; color: rgba(247,249,252,0.82);
    width: fit-content; backdrop-filter: blur(10px);
  }
  .dot { width: 11px; height: 11px; border-radius: 999px; background: #2f74ff; box-shadow: 0 0 18px rgba(47,116,255,0.9); }
  h1 { font-size: 118px; font-weight: 800; letter-spacing: -0.045em; line-height: 0.98; margin-top: 38px; }
  h1 .accent { color: #5e93ff; }
  p { font-family: 'Inter', sans-serif; font-size: 31px; color: rgba(247,249,252,0.74); margin-top: 30px; font-weight: 400; letter-spacing: 0.01em; }
  .glow { position: absolute; right: -130px; top: -130px; width: 460px; height: 460px; border-radius: 999px;
    background: radial-gradient(circle, rgba(47,116,255,0.36), transparent 64%); filter: blur(8px); }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="chip"><span class="dot"></span>AI Automation Agency · UAE</div>
  <h1>STERK<span class="accent">.systems</span></h1>
  <p>AI calling agents · Chatbots · Automation · Websites</p>
</body>
</html>`;

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: outPath, type: "png" });
await browser.close();
console.log(`Wrote ${outPath}`);
