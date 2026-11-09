import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Verification builds use an isolated directory, never the live dev cache.
  distDir: process.env.WAYMARK_BUILD_DIR || ".next",
  cacheComponents: true,
  partialPrefetching: true,
  // Phones and other machines on this LAN open the Mac by IP or Bonjour name.
  allowedDevOrigins: ["192.168.0.6", "cvss-macbook-air.local", "CVSs-MacBook-Air.local"],
  turbopack: {
    rules: {
      // This is the only source entry named globals.css. The basename selector
      // also matches when Turbopack chooses a different project-relative root.
      // Never rename *.module.css to global CSS: their class exports disappear.
      "globals.css": {
        condition: { not: "foreign" },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
