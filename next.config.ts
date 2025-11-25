import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add your allowedDevOrigins here
  allowedDevOrigins: [
    'local-origin.dev',  // Add your valid origins
    '196.190.220.43',    // Include your current IP or domain as needed
    '*.local-origin.dev'
  ],
  // Any other config options you want to include
};

export default nextConfig;
