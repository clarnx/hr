/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: [
      "tak.haroth.com", "nextjspics.s3.ap-south-1.amazonaws.com", "img.haroth.com", "cdn.haroth.com"
    ]
  },
}

// const withSitemap = require('next-sitemap');

// module.exports = withSitemap({
//   sitemap: {
//     path: '/sitemap.xml',
//     exclude: [],
//   },
//   // Other Next.js configurations...
// });

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = {
        onesignal: 'OneSignal',
      };
    }

    return config;
  },
};


module.exports = nextConfig
