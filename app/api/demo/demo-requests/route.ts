import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import path from "path"
import { z } from "zod"

// Validation schema
const demoRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  bankSize: z.string(),
  role: z.string(),
})

// File path for local storage
const dataDir = path.join(process.cwd(), "data")
const filePath = path.join(dataDir, "demoRequests.json")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = demoRequestSchema.parse(body)

    // Ensure "data" directory exists
    await mkdir(dataDir, { recursive: true })

    // Read existing data or initialize new array
    let existingData = []
    try {
      const file = await readFile(filePath, "utf-8")
      existingData = JSON.parse(file)
    } catch {
      existingData = []
    }

    // Add new record
    const newEntry = { ...validatedData, createdAt: new Date().toISOString() }
    existingData.push(newEntry)

    // Write back to file
    await writeFile(filePath, JSON.stringify(existingData, null, 2))

    return NextResponse.json(
      { success: true, message: "Demo request saved", data: newEntry },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid form data", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Internal server error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
