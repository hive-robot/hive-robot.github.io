import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export as a fully static site for GitHub Pages
  output: 'export',
  images: {
    // GitHub Pages doesn't support Next/Image optimization
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    typedRoutes: false,
  },
};

export default withContentlayer(nextConfig);
