import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "ed-report"; // Replace with your exact GitHub repository name

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  images: {
    unoptimized: true,
  },
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
