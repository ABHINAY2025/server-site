/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build gates re-enabled. Suppressing these is how an undefined
  // `--destructive` token and a dead stylesheet reached production.
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  compress: true,
  generateEtags: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,

  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'lucide-react',
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value:
              'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // googletagmanager must be allowlisted or the analytics tag in
              // app/layout.tsx is refused by our own policy — which is why
              // this site had no traffic data at all.
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://drive.google.com https://www.youtube.com",
              "frame-src 'self' https://drive.google.com https://www.youtube.com https://www.youtube-nocookie.com",
              "child-src https://drive.google.com https://www.youtube.com",
              "media-src https://drive.google.com https://*.googleusercontent.com",
              "img-src 'self' data: https:",
              "style-src 'self' 'unsafe-inline'",
              // The measurement beacon posts to these origins; `'self'` alone
              // blocked it independently of the script-src refusal above.
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig