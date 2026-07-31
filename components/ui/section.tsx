import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Owns page width, gutters and vertical rhythm for every section on the site.
 *
 * Previously each section hand-rolled `max-w-7xl` with its own padding scale
 * (and the FAQ used `px-5` where its neighbours used `px-4 sm:px-6 lg:px-8`),
 * so section edges did not align down the page. Width is now decided in one
 * place and nowhere else.
 */

const SPACING = {
  none: "",
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-28 lg:py-32",
} as const

const WIDTH = {
  // Matches the `container` screen in tailwind.config.ts
  default: "max-w-[1200px]",
  narrow: "max-w-4xl",
  prose: "max-w-prose",
} as const

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "header" | "footer" | "article"
  spacing?: keyof typeof SPACING
  width?: keyof typeof WIDTH
  /** Applies to the outer full-bleed element, e.g. a contrasting band. */
  bleedClassName?: string
}

export function Section({
  as: Tag = "section",
  spacing = "md",
  width = "default",
  className,
  bleedClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn("w-full", SPACING[spacing], bleedClassName)} {...props}>
      <div
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          WIDTH[width],
          className
        )}
      >
        {children}
      </div>
    </Tag>
  )
}

/**
 * Standard section heading block: eyebrow, heading, lede.
 * Takes an explicit heading level so pages control document outline rather
 * than each section picking its own (the homepage previously ran
 * h1 -> h2 -> h3 -> h3 -> h2, misrepresenting the page structure).
 */
interface SectionHeaderProps {
  eyebrow?: string
  title: React.ReactNode
  lede?: React.ReactNode
  level?: 2 | 3
  align?: "left" | "center"
  className?: string
  id?: string
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  level = 2,
  align = "left",
  className,
  id,
}: SectionHeaderProps) {
  const Heading = level === 2 ? "h2" : "h3"

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-eyebrow uppercase text-primary">{eyebrow}</span>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-balance text-foreground",
          level === 2 ? "text-h2" : "text-h3"
        )}
      >
        {title}
      </Heading>
      {lede ? (
        <p
          className={cn(
            "text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" ? "max-w-2xl" : "max-w-prose"
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  )
}
