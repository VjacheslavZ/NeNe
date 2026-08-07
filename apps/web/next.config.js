/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/trpc'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${process.env.API_URL}/uploads/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: process.env.BACKEND_PROTOCOL,
        hostname: process.env.BACKEND_HOST,
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STORAGE_URL,
      },
    ],
  },
};

export default nextConfig;
