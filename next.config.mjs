/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Source art tops out at ~1920px, so the 2048/3840 candidates only ever
    // re-encode the same pixels. Dropping them shortens every `srcset` in the
    // HTML without changing which file a browser actually picks.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // The optimizer previously re-validated every derivative after 4 hours.
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firstgulfbusiness.ae',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  experimental: {
    // Barrel-file tree shaking: pull only the icons/motion primitives actually
    // imported instead of the whole package entry point.
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  async headers() {
    // Files under `public/` are served with `max-age=0` by default, so every
    // repeat visit re-validates each logo and photo. These names are stable,
    // and `stale-while-revalidate` still lets a replacement roll out.
    return [
      {
        source: '/:all*(webp|png|jpg|jpeg|svg|ico|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
