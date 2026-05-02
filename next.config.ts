import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // In development, proxy backend API and Socket.io to local backend (e.g. backend on port 5000).
  // In production, use same-domain routing (e.g. https://cird.co.in/api/* served by your backend).
  rewrites:
    process.env.NODE_ENV === "development"
      ? async () => [
          { source: "/api/chat", destination: "http://localhost:5001/api/chat" },
          { source: "/api/embed", destination: "http://localhost:5001/api/embed" },
          { source: "/health", destination: "http://localhost:5001/health" },
          { source: "/socket.io/:path*", destination: "http://localhost:5001/socket.io/:path*" },
        ]
      : undefined,
};

export default nextConfig;
