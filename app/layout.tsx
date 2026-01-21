import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export const metadata: Metadata = {
  title: 'Quantum Data Leap - Intelligent Banking Platform',
  description:
    'Transform your banking operations with intelligent data control, liquidity management, fraud detection, and automated compliance rules.',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: { 
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* Google Analytics */}
        <Script
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
                gtag('config', 'G-70DFDL0XW8', {
                  allow_google_signals: false,
                  anonymize_ip: true
                });
              }
            `,
          }}
        />

        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>

      <body>{children}</body>
    </html>
  )
}
