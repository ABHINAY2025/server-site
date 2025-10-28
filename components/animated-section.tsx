"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "transition" | "viewport"> {
  children: ReactNode
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0, id, ...props }: AnimatedSectionProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay }}
      viewport={{ once: true, margin: "-100px" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}