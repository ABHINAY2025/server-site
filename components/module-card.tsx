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
          "group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10",
          className
        )}
      >
        {/* Border glow on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-xl"
        />

        {/* Icon with hover animation */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20"
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="mb-3 text-2xl font-semibold text-card-foreground">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + index * 0.1 }}
                  className="inline-flex cursor-help items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5"
                >
                  {feature.label}
                </motion.span>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>{feature.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </motion.div>
    </TooltipProvider>
  )
}

