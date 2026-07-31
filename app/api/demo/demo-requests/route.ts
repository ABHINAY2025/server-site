import { NextResponse } from "next/server"
import { z } from "zod"

const demoRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  institution: z.string().min(2),
  role: z.string().min(1),
  module: z.string().optional(),
  // Honeypot: a real user never fills this — it is visually hidden and
  // removed from the tab order. Bots fill every field they find.
  //
  // Deliberately unconstrained: a `.max(0)` here would fail schema validation
  // and return a 400, which tells a bot exactly which field tripped it. The
  // value is inspected after parsing instead, and answered with a 200.
  company_website: z.string().optional(),
})

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

// Naive in-memory rate limit. Enough to stop casual spam on a public
// unauthenticated write; see the spec's backend recommendations for the
// durable version (this resets on deploy and is per-instance).
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const entry = hits.get(ip)

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again shortly." },
      { status: 429 }
    )
  }

  let validatedData: z.infer<typeof demoRequestSchema>

  try {
    validatedData = demoRequestSchema.parse(await request.json())
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Please check the highlighted fields." },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: "We couldn't read that request." },
      { status: 400 }
    )
  }

  // Silently accept honeypot hits — a 200 keeps bots from probing for the
  // rejection signal, and no lead is recorded.
  if (validatedData.company_website) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.error("GOOGLE_APPS_SCRIPT_URL is not configured — lead dropped.")
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't submit your request. Please email us and we'll respond the same day.",
      },
      { status: 500 }
    )
  }

  try {
    const upstream = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: validatedData.name,
        email: validatedData.email,
        institution: validatedData.institution,
        role: validatedData.role,
        module: validatedData.module ?? "",
        timestamp: new Date().toISOString(),
      }),
    })

    // Previously unchecked. A non-2xx from Apps Script — quota, revoked
    // deployment, script error — still returned `{ success: true }` and the
    // visitor saw a confirmation while the lead was discarded.
    if (!upstream.ok) {
      console.error(
        `Lead write failed upstream: ${upstream.status} ${upstream.statusText}`,
        { email: validatedData.email }
      )
      return NextResponse.json(
        {
          success: false,
          message:
            "We couldn't submit your request. Please email us and we'll respond the same day.",
        },
        { status: 502 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Demo request submitted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Lead write threw:", error, { email: validatedData.email })
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't submit your request. Please email us and we'll respond the same day.",
      },
      { status: 502 }
    )
  }
}
