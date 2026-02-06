'use client'

import { motion } from 'framer-motion'
import { Lock, CheckCircle2 } from 'lucide-react'

const features = [
  'Military-grade AES-256 encryption for data at rest',
  'TLS 1.3 encryption for data in transit',
  'HIPAA and GDPR compliance certifications',
  'Regular security audits and penetration testing',
  'Multi-factor authentication (MFA) support',
  'Comprehensive compliance and regulatory reporting',
]

export default function EnhancedSecurityPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl" style={{background: "linear-gradient(135deg, rgba(255, 107, 154, 0.1), rgba(123, 92, 246, 0.1))"}}>
          <Lock className="h-8 w-8" style={{background: "linear-gradient(135deg, #FF6B9A, #7B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}} />
        </div>
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Enhanced Security</h1>
        <p className="text-lg text-muted-foreground">
          Bank-level encryption and compliance standards protecting your data
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-2xl font-semibold">Security Features</h2>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0" style={{background: "linear-gradient(135deg, #FF6B9A, #7B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}} />
              <span className="text-foreground">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-2xl font-semibold">Our Security Approach</h2>
        <p className="text-muted-foreground">
          We implement defense-in-depth security architecture with multiple layers of protection. Your data is encrypted at every level, from transmission to storage, with continuous monitoring and threat detection systems in place.
        </p>
      </div>

      {/* <div className="space-y-4 rounded-lg border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6">
        <h2 className="text-2xl font-semibold">Protect Your Data</h2>
        <p className="text-muted-foreground">
          Rest assured knowing your sensitive banking data is protected by enterprise-grade security.
        </p>
        <button className="mt-4 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Schedule a Demo
        </button>
      </div> */}
    </motion.div>
  )
}
