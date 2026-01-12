import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export const metadata: Metadata = {
  title: 'Quantum Data Leap - Intelligent Banking Platform',
  description: 'Transform your banking operations with intelligent data control, liquidity management, fraud detection, and automated compliance rules.',
  generator: 'Next.js',
  keywords: ['banking', 'data management', 'fraud detection', 'compliance', 'intelligent platform', 'liquidity management'],
  authors: [{ name: 'Quantum Data Leap' }],
  robots: 'index, follow',
  icons: {
    icon: '/logos/logo.png',
  },
  alternates: {
    canonical: 'https://quantumdata leap.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quantumdataleap.com',
    title: 'Quantum Data Leap - Intelligent Banking Platform',
    description: 'Transform your banking operations with intelligent data control, liquidity management, fraud detection, and automated compliance rules.',
    siteName: 'Quantum Data Leap',
   
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Quantum Data Leap - Intelligent Banking Platform',
  //   description: 'Transform your banking operations with intelligent data control, liquidity management, fraud detection, and automated compliance rules.',
  //   creator: '@quantumdataleap',
  //   images: ['https://quantumdataleap.com/og-image.png'],
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - Consent-based loading */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-70DFDL0XW8"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics-consent"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (!window.trackingConsent) {
                window.trackingConsent = false;
              }
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              if (window.trackingConsent === true) {
                gtag('config', 'G-70DFDL0XW8', { 'allow_google_signals': false, 'anonymize_ip': true });
              }
            `,
          }}
        />
        {/* Meta Tags for SEO and Social Media */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Restrictive CSP to prevent unauthorized iframe access and cookies */}
        <meta httpEquiv="Content-Security-Policy" content="frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://*.quantumdataleap.ai; frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests" />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and Apple Touch Icon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Fonts styling */}
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
