/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: [
      "tak.haroth.com", "nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com", "cdn.haroth.com"
    ],
    eslint: {
      ignoreDuringBuilds: true,
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = {
        onesignal: 'OneSignal',
      };
    }

    return config;
  },
};

// Export the merged configuration
module.exports = nextConfig;
