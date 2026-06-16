// Postbuild prerender: renders each route of the built SPA in headless Chrome
// and writes fully-populated static HTML into dist/, plus sitemap.xml.
// Runs as part of `npm run build` (see package.json).
import puppeteer from "puppeteer";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const SITE_URL = "https://www.sterk.systems";
const PORT = 4173;

// Route → output file + text markers that must ALL exist in the capture,
// so a silent or partial render fails the build instead of shipping thin HTML.
// Home markers span top, middle, and bottom of the page to catch lazy
// sections that failed to mount during the scroll passes.
const ROUTES = [
  {
    path: "/",
    out: "index.html",
    markers: ["Your Business", "Built to Convert", "Strategy to System", "Real Systems", "All rights reserved"],
  },
  { path: "/about", out: "about/index.html", markers: ["STERK"] },
  { path: "/book-a-call", out: "book-a-call/index.html", markers: ["call"] },
];

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
  let filePath = path.join(DIST, urlPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, "index.html"); // SPA fallback
  }
  res.setHeader("Content-Type", MIME[path.extname(filePath)] ?? "application/octet-stream");
  fs.createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(PORT, resolve));
console.log(`Serving dist/ on :${PORT}`);

let browser;
try {
  if (process.env.VERCEL) {
    // Vercel's build image lacks the system libraries the bundled Chrome needs.
    // @sparticuz/chromium ships a self-contained Chromium built for this exact
    // Amazon-Linux/serverless environment; drive it with puppeteer-core.
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteerCore = (await import("puppeteer-core")).default;
    browser = await puppeteerCore.launch({
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  } else {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    });
  }
} catch (err) {
  // Headless Chrome couldn't start (e.g. missing libs on a CI build image).
  // Don't brick the deploy — ship the plain SPA build and warn loudly so this
  // gets fixed. Content bugs still fail hard once Chrome is running (below).
  console.warn("\n⚠️  PRERENDER SKIPPED — could not launch headless Chrome:");
  console.warn(`    ${err.message}`);
  console.warn("    Shipping client-rendered SPA without prerendered HTML/sitemap.\n");
  server.close();
  process.exit(0);
}

const renderRoute = async (route) => {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1366, height: 900 });

    // Skip the brand loader's wait-for-hero-video phase and let app code
    // (e.g. WebGL sections) detect prerendering.
    await page.evaluateOnNewDocument(() => {
      window.__STERK_PRERENDER__ = true;
      window.__STERK_HERO_VIDEO_READY__ = true;
    });

    // Videos are heavyweight and irrelevant to the DOM capture.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (req.resourceType() === "media" || req.url().includes("video")) req.abort();
      else req.continue();
    });

    await page.goto(`http://localhost:${PORT}${route.path}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Wait until React mounted and the InitialLoader overlay unmounted.
    await page.waitForFunction(
      () => {
        const root = document.getElementById("root");
        return (
          root &&
          root.children.length > 0 &&
          !document.querySelector('[aria-label="Loading STERK.systems"]')
        );
      },
      { timeout: 30000 },
    );

    // Scroll through the page so IntersectionObserver-gated sections mount.
    // Sections extend the page as they load, so repeat until height stabilizes.
    // behavior:"instant" defeats the CSS smooth-scroll animation, which would
    // otherwise lag behind the pass loop and skip IO windows.
    const scrollAllSections = () =>
      page.evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        let prevHeight = 0;
        for (let pass = 0; pass < 10 && document.body.scrollHeight !== prevHeight; pass++) {
          prevHeight = document.body.scrollHeight;
          for (let y = 0; y <= prevHeight; y += Math.round(window.innerHeight * 0.8)) {
            window.scrollTo({ top: y, behavior: "instant" });
            await sleep(180);
          }
          window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
          await sleep(600);
        }
      });

    await scrollAllSections();
    await page.waitForNetworkIdle({ idleTime: 800, timeout: 20000 }).catch(() => {});
    // chunks that arrived during the idle wait may have grown the page again
    await scrollAllSections();
    await new Promise((r) => setTimeout(r, 1000));

    const html = await page.evaluate(() => {
      window.scrollTo(0, 0);
      document.querySelector('[aria-label="Loading STERK.systems"]')?.parentElement?.remove();
      return "<!doctype html>" + document.documentElement.outerHTML;
    });

    // A marker counts if it appears either in the raw HTML (covers text inside
    // attributes like aria-label, and per-character span headlines) or in the
    // tag-stripped text (covers phrases split by inline markup, e.g.
    // "Built to <span>Convert</span>" → "Built to Convert").
    const textContent = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    for (const marker of route.markers) {
      if (!html.includes(marker) && !textContent.includes(marker)) {
        throw new Error(`Prerender of ${route.path} missing expected content "${marker}"`);
      }
    }
    if (html.length < 20000) {
      throw new Error(`Prerender of ${route.path} suspiciously small (${html.length} bytes)`);
    }

    return html;
  } finally {
    await page.close();
  }
};

try {
  // Capture everything first, then write — the SPA fallback must keep serving
  // the original template while routes are being rendered.
  const captures = [];
  for (const route of ROUTES) {
    console.log(`Prerendering ${route.path} ...`);
    captures.push({ route, html: await renderRoute(route) });
  }

  for (const { route, html } of captures) {
    const outFile = path.join(DIST, route.out);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
    console.log(`  wrote dist/${route.out} (${(html.length / 1024).toFixed(0)} KB)`);
  }

  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
).join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);
  console.log("  wrote dist/sitemap.xml");
} finally {
  await browser.close();
  server.close();
}

console.log("Prerender complete.");
