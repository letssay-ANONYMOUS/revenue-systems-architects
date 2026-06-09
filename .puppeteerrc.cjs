const path = require("path");

// Keep Chrome inside node_modules so CI build caches (e.g. Vercel) retain it
// across builds instead of re-downloading ~150MB every deploy.
module.exports = {
  cacheDirectory: path.join(__dirname, "node_modules", ".cache", "puppeteer"),
};
