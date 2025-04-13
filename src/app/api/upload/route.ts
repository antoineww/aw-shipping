import { NextResponse } from "next/server"
import { fileStore, csvReadAndParse, dbStore } from "@/utils/data"


export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const buffer = await fileStore(file)
    const records = csvReadAndParse(buffer)
    const insertedCount = dbStore(records)

    return NextResponse.json({
      message: "File uploaded and processed successfully",
      recordsGiven: records.length,
      recordsProcessed: insertedCount,
    })
  } catch (error) {
    console.error("Error processing file:", error)
    return NextResponse.json(
      { error: "Error processing file" },
      { status: 500 }
    )
  }
}
