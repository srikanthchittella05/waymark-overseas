import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Phones and other machines on this LAN open the Mac by IP or Bonjour name.
  allowedDevOrigins: ["192.168.0.6", "cvss-macbook-air.local", "CVSs-MacBook-Air.local"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
