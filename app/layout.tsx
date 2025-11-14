import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quantum Data Leap - Intelligent Banking Platform',
  description: 'Transform your banking operations with intelligent data control, liquidity management, fraud detection, and automated compliance rules.',
  generator: 'Next.js',
  keywords: ['banking', 'data management', 'fraud detection', 'compliance', 'intelligent platform', 'liquidity management'],
  authors: [{ name: 'Quantum Data Leap' }],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
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
        {/* Meta Tags for SEO and Social Media */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
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
