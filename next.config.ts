import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "https://preview-chat-d58717bc-5193-4c12-b25e-5157c3baf3c6.space-z.ai",
    "http://preview-chat-d58717bc-5193-4c12-b25e-5157c3baf3c6.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
