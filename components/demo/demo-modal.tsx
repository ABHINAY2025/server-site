"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DemoForm } from "@/components/demo/demo-form"

/**
 * Modal variant. Renders the same `DemoForm` as /demo — one implementation,
 * two surfaces — so validation, error handling and the success state can
 * never drift between them.
 *
 * Radix Dialog handles focus trapping and restores focus to the trigger on
 * close.
 */
export function DemoModal({
  open,
  onOpenChange,
  defaultModule,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultModule?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Request a demo</DialogTitle>
          <DialogDescription>
            Thirty minutes on the product, not a slide deck. We reply within
            one business day.
          </DialogDescription>
        </DialogHeader>

        <DemoForm
          defaultModule={defaultModule}
          onSuccess={() => {
            // Leave the confirmation on screen; the user closes when ready.
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
