"use client"
import { motion } from "framer-motion"
import { BarChart3, Shield, Settings, Database } from "lucide-react"

export function GettingStartedSection() {
  const buttons = [
    { label: "Liquidity Dashboard", icon: BarChart3 },
    { label: "Fraud Detection", icon: Shield },
    { label: "Rule Management", icon: Settings },
    { label: "Data Control Center", icon: Database },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-center gap-8">
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-6 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              Getting Started
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Explore QDL modules and transform your banking operations today.
            </p>
          </div>
        </div>

        <motion.div
          className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {buttons.map(({ label, icon: Icon }) => (
            <motion.div key={label} variants={itemVariants} className="w-full">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(120, 252, 214, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10 w-full transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Icon className="w-5 h-5 group-hover:text-primary transition-colors duration-300" />
                <span>{label}</span>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
