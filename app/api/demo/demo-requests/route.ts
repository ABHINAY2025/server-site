import { NextResponse } from "next/server"
import { z } from "zod"

const demoRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  bankSize: z.string(),
  role: z.string(),
})

const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = demoRequestSchema.parse(body)

    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...validatedData,
        timestamp: new Date().toISOString(),
      }),
    })

    return NextResponse.json(
      { success: true, message: "Demo request submitted" },
      { status: 200 }
    )
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}