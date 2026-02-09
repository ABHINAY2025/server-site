"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#3b094abd] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            {/* Introduction */}
            <div>
              <p className="text-base leading-relaxed">
                This privacy notice discloses the privacy practices for fisecglobal.net. This privacy notice applies solely to information collected by this website. It will notify you of the following:
              </p>
            </div>

            {/* What We Collect */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">What We Collect</h2>
              <ul className="space-y-2 list-disc list-inside text-base leading-relaxed">
                <li>What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</li>
                <li>What choices are available to you regarding the use of your data.</li>
                <li>The security procedures in place to protect the misuse of your information.</li>
                <li>How you can correct any inaccuracies in the information.</li>
              </ul>
            </div>

            {/* Information Collection */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Information Collection, Use, and Sharing</h2>
              <p className="text-base leading-relaxed">
                We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact information from you. We will not sell or rent this information to anyone.
              </p>
              <p className="text-base leading-relaxed">
                We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to fulfill a request.
              </p>
              <p className="text-base leading-relaxed">
                Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this our privacy policy.
              </p>
            </div>

            {/* Access and Control */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Your Access to and Control Over Information</h2>
              <p className="text-base leading-relaxed">
                You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:
              </p>
              <ul className="space-y-2 list-disc list-inside text-base leading-relaxed">
                <li>See what data we have about you if any.</li>
                <li>Change/correct any data we have about you.</li>
                <li>Have us delete any data we have about you.</li>
                <li>Express any concern you have about our use of your data.</li>
              </ul>
            </div>

            {/* Security */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Security</h2>
              <p className="text-base leading-relaxed">
                We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.
              </p>
              <p className="text-base leading-relaxed">
                Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way.
              </p>
              <p className="text-base leading-relaxed">
                While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information.
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-3 rounded-lg border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p className="text-base leading-relaxed">
                If you feel that we are not abiding by this privacy policy, you should contact us immediately.
              </p>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  For privacy concerns or requests, please reach out through the contact information provided on our website.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-t border-border pt-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3b094abd] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
