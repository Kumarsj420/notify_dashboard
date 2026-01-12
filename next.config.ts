/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'images.contactout.com',
      },
      {
        protocol: 'https',
        hostname: 'threat.notifybreach.com',
      },
    ],
  },
};

module.exports = nextConfig;
