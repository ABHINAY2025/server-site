"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { cn } from "@/lib/utils"

interface FeaturePill {
  label: string
  description: string
}

interface ModuleCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: FeaturePill[]
  delay?: number
  className?: string
}

export function ModuleCard({
  icon,
  title,
  description,
  features,
  delay = 0,
  className,
}: ModuleCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          "group relative rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-[#FF6B9A]/30 hover:shadow-lg h-full flex flex-col overflow-hidden",
          className
        )}
      >
        {/* Background Icon Accent */}
        <motion.div
          animate={{ opacity: isHovered ? 0.15 : 0.08 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-4 -right-4 text-gray-300"
          style={{ pointerEvents: "none" }}
        >
          <div className="text-7xl opacity-20">{icon}</div>
        </motion.div>

        {/* Gradient overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF6B9A]/5 via-transparent to-transparent"
          style={{ pointerEvents: "none" }}
        />

        {/* Left Icon Badge */}
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-all flex-shrink-0 relative z-10"
          style={{
            background: "linear-gradient(135deg, #FF6B9A 0%, #7B5CF6 100%)",
            color: "white",
          }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-gray-900 relative z-10">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-xs leading-snug text-gray-600 relative z-10 flex-grow">
          {description}
        </p>

        {/* Feature Pills - Compact */}
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {features.slice(0, 3).map((feature, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + index * 0.1 }}
                  className="inline-flex cursor-help items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:border-[#FF6B9A] hover:bg-[#FF6B9A]/10"
                >
                  {feature.label}
                </motion.span>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs text-xs">
                <p>{feature.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </motion.div>
    </TooltipProvider>
  )
}

