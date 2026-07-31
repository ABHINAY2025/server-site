"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  TextInput,
  SelectInput,
  HoneypotField,
} from "@/components/ui/field"
import { MODULES, ROLES } from "@/lib/site-config"

const FREE_MAILBOX = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
])

const schema = z.object({
  email: z
    .string()
    .min(1, "Enter your work email so we can route your request.")
    .email("That doesn't look like a valid email address.")
    .refine(
      (value) => !FREE_MAILBOX.has(value.split("@")[1]?.toLowerCase() ?? ""),
      "Please use your work email — we can't route free mailbox domains."
    ),
  name: z.string().min(2, "Enter your full name."),
  institution: z.string().min(2, "Tell us which institution you're with."),
  role: z.string().min(1, "Select the closest match to your role."),
  module: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export function DemoForm({
  defaultModule,
  onSuccess,
}: {
  defaultModule?: string
  onSuccess?: () => void
}) {
  const [status, setStatus] = React.useState<"idle" | "pending" | "done">("idle")
  const [formError, setFormError] = React.useState<string | null>(null)
  const successRef = React.useRef<HTMLHeadingElement | null>(null)

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    // Validate on blur, never on keystroke — errors that appear while the
    // user is still typing read as the form arguing with them.
    mode: "onBlur",
    defaultValues: { module: defaultModule ?? "" },
  })

  React.useEffect(() => {
    if (status === "done") successRef.current?.focus()
  }, [status])

  const onSubmit = async (values: FormValues) => {
    setStatus("pending")
    setFormError(null)

    try {
      const res = await fetch("/api/demo/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const payload = await res.json().catch(() => null)

      if (!res.ok || !payload?.success) {
        setFormError(
          payload?.message ??
            "We couldn't submit your request. Please try again."
        )
        setStatus("idle")
        return
      }

      setStatus("done")
      onSuccess?.()
    } catch {
      setFormError(
        "We couldn't reach our servers. Check your connection and try again."
      )
      setStatus("idle")
    }
  }

  // Move focus to the first invalid field so a keyboard user is not left
  // guessing why nothing happened.
  const onInvalid = (fieldErrors: typeof errors) => {
    const first = Object.keys(fieldErrors)[0] as keyof FormValues | undefined
    if (first) setFocus(first)
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-start gap-4">
        <span
          className="inline-flex size-11 items-center justify-center rounded-full bg-success-wash text-success"
          aria-hidden="true"
        >
          <CheckCircle2 className="size-6" />
        </span>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="text-h3 text-foreground focus:outline-none"
        >
          Request received
        </h2>
        <p className="text-muted-foreground">
          We'll reply within one business day to arrange a time. Your security
          pack is on its way to the address you gave us.
        </p>
        <Button asChild variant="secondary">
          <Link href="/#platform">Keep exploring the platform</Link>
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      className="flex flex-col gap-5"
    >
      <HoneypotField />

      {/* Work email first: it is the field that qualifies the lead, and
          asking it first sets the expectation that this is a business
          conversation. */}
      <Field
        id="email"
        label="Work email"
        required
        error={errors.email?.message}
      >
        {(a11y) => (
          <TextInput
            {...a11y}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@yourbank.com"
            {...register("email")}
          />
        )}
      </Field>

      <Field id="name" label="Full name" required error={errors.name?.message}>
        {(a11y) => (
          <TextInput
            {...a11y}
            autoComplete="name"
            placeholder="Alex Mensah"
            {...register("name")}
          />
        )}
      </Field>

      <Field
        id="institution"
        label="Institution"
        required
        error={errors.institution?.message}
      >
        {(a11y) => (
          <TextInput
            {...a11y}
            autoComplete="organization"
            placeholder="Bank name"
            {...register("institution")}
          />
        )}
      </Field>

      <Field id="role" label="Your role" required error={errors.role?.message}>
        {(a11y) => (
          <SelectInput {...a11y} defaultValue="" {...register("role")}>
            <option value="" disabled>
              Select the closest match
            </option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </SelectInput>
        )}
      </Field>

      <Field
        id="module"
        label="What would you like to see?"
        hint="Optional — we'll tailor the session around it."
        error={errors.module?.message}
      >
        {(a11y) => (
          <SelectInput {...a11y} {...register("module")}>
            <option value="">The whole platform</option>
            {MODULES.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name}
              </option>
            ))}
          </SelectInput>
        )}
      </Field>

      {formError ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive-wash p-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            {formError} You can also email{" "}
            <a href="mailto:hello@quantumdataleap.ai" className="underline">
              hello@quantumdataleap.ai
            </a>
            .
          </span>
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <Button type="submit" size="lg" block pending={status === "pending"}>
          {status === "pending" ? "Sending" : "Request a demo"}
          {status === "pending" ? null : (
            <ArrowRight className="size-4" aria-hidden="true" />
          )}
        </Button>
        <p className="text-xs text-subtle">
          No obligation. We reply within one business day.
        </p>
      </div>
    </form>
  )
}
