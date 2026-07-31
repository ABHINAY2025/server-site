"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Label + control + hint + error, wired together correctly.
 *
 * Error state is carried by colour AND icon AND text. The previous form
 * signalled errors with `text-destructive` alone — against a token that was
 * never defined, so the messages rendered in the same colour as the labels
 * beside them (WCAG 1.4.1).
 */

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: (props: {
    id: string
    "aria-invalid": boolean
    "aria-describedby": string | undefined
  }) => React.ReactNode
  className?: string
}

export function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="ml-0.5 text-destructive">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>

      {hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}

      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-start gap-1.5 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}

/** Text input styled from tokens, with error state reflected from aria-invalid. */
export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-md border border-input bg-card px-3",
      // 16px on mobile prevents iOS zoom-on-focus.
      "text-base sm:text-sm",
      "text-foreground placeholder:text-subtle",
      "transition-colors duration-micro",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive",
      className
    )}
    {...props}
  />
))
TextInput.displayName = "TextInput"

/** Native select — lighter than a custom listbox and correct by default. */
export const SelectInput = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-11 w-full appearance-none rounded-md border border-input bg-card px-3",
      "text-base sm:text-sm",
      "text-foreground",
      "bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-9",
      "transition-colors duration-micro",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive",
      className
    )}
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236F807D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
    }}
    {...props}
  >
    {children}
  </select>
))
SelectInput.displayName = "SelectInput"

/**
 * Honeypot. Visually hidden and removed from the tab order, so no real user
 * ever encounters it — bots fill every field they find.
 */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="company_website">Company website</label>
      <input
        id="company_website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  )
}
