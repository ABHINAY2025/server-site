import { NextResponse } from "next/server"
import { z } from "zod"

const demoRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  bankSize: z.string(),
  role: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = demoRequestSchema.parse(body)

    // Mock response - replace with actual database logic
    console.log("Demo request received:", validatedData)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        success: true,
        message: "Demo request submitted successfully",
        data: validatedData,
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid form data", errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}

