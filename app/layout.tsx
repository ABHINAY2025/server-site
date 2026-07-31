import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export const metadata: Metadata = {
  title: {
    default: 'Quantum Data Leap — The intelligence layer for modern banking',
    template: '%s · Quantum Data Leap',
  },
  description:
    'Real-time payments, fraud defence, liquidity control and automated compliance on one platform. QDL runs against the core banking systems you already have.',
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
    // suppressHydrationWarning is required by next-themes, which sets the
    // theme class on <html> before React hydrates.
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Reveal animations start at opacity:0 and are released by an
            IntersectionObserver. Without JS there is nothing to release
            them, so the content must be shown unconditionally. */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[data-reveal],.qdl-enter,.qdl-stream{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>

        {/* Analytics. These were being refused by our own CSP until
            googletagmanager.com was allowlisted in next.config.mjs. */}
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
      </head>

      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
