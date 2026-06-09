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

// Route → output file + a text marker that must exist in the capture,
// so a silent render failure fails the build instead of shipping empty HTML.
const ROUTES = [
  { path: "/", out: "index.html", marker: "Your Business" },
  { path: "/about", out: "about/index.html", marker: "STERK" },
  { path: "/book-a-call", out: "book-a-call/index.html", marker: "call" },
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

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
});

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
    await page.evaluate(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      let prevHeight = 0;
      for (let pass = 0; pass < 6 && document.body.scrollHeight !== prevHeight; pass++) {
        prevHeight = document.body.scrollHeight;
        for (let y = 0; y <= prevHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await sleep(140);
        }
        window.scrollTo(0, document.body.scrollHeight);
        await sleep(500);
      }
    });
    await page.waitForNetworkIdle({ idleTime: 600, timeout: 10000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 600));

    const html = await page.evaluate(() => {
      window.scrollTo(0, 0);
      document.querySelector('[aria-label="Loading STERK.systems"]')?.parentElement?.remove();
      return "<!doctype html>" + document.documentElement.outerHTML;
    });

    if (!html.includes(route.marker)) {
      throw new Error(`Prerender of ${route.path} missing expected content "${route.marker}"`);
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
