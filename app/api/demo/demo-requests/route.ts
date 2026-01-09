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

// Google Apps Script webhook URL - Replace with your deployed script URL
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || ""

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

    // Send to Google Sheets via Apps Script
    if (GOOGLE_APPS_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: validatedData.name,
            email: validatedData.email,
            bankSize: validatedData.bankSize,
            role: validatedData.role,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (googleError) {
        console.error("Error sending to Google Sheets:", googleError)
        // Continue anyway - local data is still saved
      }
    }

    return NextResponse.json(
      { success: true, message: "Demo request saved", data: newEntry },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors)
      return NextResponse.json(
        { success: false, message: "Invalid form data", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Internal server error:", error)
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    )
  }
}
